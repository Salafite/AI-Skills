import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = path.join(ROOT, 'skill', 'scripts', 'serve-question.mjs');

function startServer(payload, extraArgs = []) {
  const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
  const payloadPath = path.join(dir, 'q.json');
  writeFileSync(payloadPath, JSON.stringify(payload));
  const child = spawn(process.execPath, [SCRIPT, '--payload', payloadPath, '--no-open', '--timeout', '30', ...extraArgs], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return new Promise((resolve, reject) => {
    let out = '';
    const timer = setTimeout(() => reject(new Error(`no URL in output: ${out}`)), 10000);
    child.stdout.on('data', (chunk) => {
      out += chunk;
      const match = out.match(/QUESTION URL: (http:\/\/127\.0\.0\.1:\d+\/)/);
      if (match) { clearTimeout(timer); resolve({ child, url: match[1], read: () => out }); }
    });
  });
}

const PAYLOAD = {
  title: 'Choose the visual world',
  question: 'The roll assigned Fillmore Handbill.',
  options: [
    { id: 'assigned', label: 'Fillmore Handbill', kicker: 'THE ROLL', lineage: '1966-71 psychedelic handbills' },
    { id: 'challenger-1', label: 'Teletext Service', body: 'block-mosaic broadcast pages' },
  ],
  reroll: true,
  steer: true,
};

describe('serve-question', () => {
  it('serves the page, records the answer, prints ANSWER, exits 0', async () => {
    const { child, url, read } = await startServer(PAYLOAD);
    const html = await (await fetch(url)).text();
    assert.match(html, /Fillmore Handbill/);
    assert.match(html, /THE ROLL/);
    assert.match(html, /Re-roll/);
    const post = await fetch(`${url}answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ optionId: 'assigned', steer: 'warmer palette' }),
    });
    assert.equal(post.status, 200);
    const code = await new Promise((resolve) => child.on('exit', resolve));
    assert.equal(code, 0);
    assert.match(read(), /ANSWER: \{"optionId":"assigned","steer":"warmer palette"\}/);
  });

  it('re-roll answers round-trip with their own id', async () => {
    const { child, url, read } = await startServer(PAYLOAD);
    await fetch(`${url}answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ optionId: 'reroll', steer: '' }),
    });
    const code = await new Promise((resolve) => child.on('exit', resolve));
    assert.equal(code, 0);
    assert.match(read(), /"optionId":"reroll"/);
  });

  it('start/wait cycle: daemonize, poll WAITING, then collect the answer', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
    const payloadPath = path.join(dir, 'q.json');
    writeFileSync(payloadPath, JSON.stringify(PAYLOAD));
    const run = (args) => new Promise((resolve) => {
      const child = spawn(process.execPath, [SCRIPT, ...args], { cwd: dir, stdio: ['ignore', 'pipe', 'ignore'] });
      let out = '';
      child.stdout.on('data', (chunk) => { out += chunk; });
      child.on('exit', (code) => resolve({ code, out }));
    });
    const started = await run(['--start', '--payload', payloadPath, '--no-open', '--key', 'tk']);
    assert.equal(started.code, 0);
    const url = started.out.match(/QUESTION URL: (\S+)/)?.[1];
    assert.ok(url, started.out);
    const waiting = await run(['--wait', '--key', 'tk', '--poll', '1']);
    assert.equal(waiting.code, 3);
    await fetch(`${url}answer`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ optionId: 'assigned', steer: '' }) });
    const collected = await run(['--wait', '--key', 'tk', '--poll', '5']);
    assert.equal(collected.code, 0);
    assert.match(collected.out, /"optionId":"assigned"/);
  });

  it('headless detection spares the modes that never open a browser', async () => {
    // Only the blocking serve path auto-opens a URL. --wait polls a daemon
    // that is already running, --stop kills one, --schema just prints text,
    // so a headless environment must not turn any of them into exit 2: the
    // documented flow polls --wait while it exits 3, and new-work.md tells
    // the agent to read --schema first.
    const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
    const payloadPath = path.join(dir, 'q.json');
    writeFileSync(payloadPath, JSON.stringify(PAYLOAD));
    const headlessEnv = { ...process.env, CI: '1' };
    delete headlessEnv.IMPECCABLE_QUESTION_FORCE;
    const run = (args) => new Promise((resolve) => {
      const child = spawn(process.execPath, [SCRIPT, ...args], { cwd: dir, env: headlessEnv, stdio: ['ignore', 'pipe', 'ignore'] });
      let out = '';
      child.stdout.on('data', (chunk) => { out += chunk; });
      child.on('exit', (code) => resolve({ code, out }));
    });

    const schema = await run(['--schema']);
    assert.equal(schema.code, 0, `--schema under CI must print, got ${schema.code}: ${schema.out}`);

    const started = await run(['--start', '--payload', payloadPath, '--no-open', '--key', 'hk']);
    assert.equal(started.code, 0, started.out);
    try {
      const waiting = await run(['--wait', '--key', 'hk', '--poll', '1']);
      assert.equal(waiting.code, 3, `--wait under CI must report WAITING, got ${waiting.code}: ${waiting.out}`);
    } finally {
      const stopped = await run(['--stop', '--key', 'hk']);
      assert.equal(stopped.code, 0, `--stop under CI must kill the daemon, got ${stopped.code}: ${stopped.out}`);
    }
  });

  it('headless detection still blocks the path that would open a browser', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
    const payloadPath = path.join(dir, 'q.json');
    writeFileSync(payloadPath, JSON.stringify(PAYLOAD));
    const headlessEnv = { ...process.env, CI: '1' };
    delete headlessEnv.IMPECCABLE_QUESTION_FORCE;
    const code = await new Promise((resolve) => {
      const child = spawn(process.execPath, [SCRIPT, '--payload', payloadPath], { cwd: dir, env: headlessEnv, stdio: 'ignore' });
      child.on('exit', resolve);
    });
    assert.equal(code, 2);
  });

  it('rejects an empty payload', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'serve-question-'));
    const payloadPath = path.join(dir, 'q.json');
    writeFileSync(payloadPath, JSON.stringify({ options: [] }));
    const code = await new Promise((resolve) => {
      const child = spawn(process.execPath, [SCRIPT, '--payload', payloadPath, '--no-open'], { stdio: 'ignore' });
      child.on('exit', resolve);
    });
    assert.equal(code, 1);
  });
});
