<!-- Shields -->
<div align="center">

[![Stars][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

<!-- Project Logo & Title -->
<br />
<div align="center">
  <a href="https://github.com/Salafite/AI-Skills">
    <img src="https://img.icons8.com/fluency/96/github.png" alt="Logo" width="96" height="96">
  </a>

  <h1 align="center">AI Skills</h1>

  <p align="center">
    A curated collection of AI-powered skills, workflows, and automation templates for modern development.
    <br />
    <a href="https://github.com/Salafite/AI-Skills"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Salafite/AI-Skills">View Demo</a>
    ·
    <a href="https://github.com/Salafite/AI-Skills/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/Salafite/AI-Skills/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

## About The Project

**AI Skills** is a curated collection of **25 AI-powered skills** for AI coding assistants like [Google Antigravity](https://github.com/google/anthropic), [Codex CLI](https://github.com/openai/codex), [Grok Build](https://x.ai), and others. Each skill is a self-contained `SKILL.md` file that teaches your AI assistant specialized workflows — from code review and architecture refactoring to generating images with ComfyUI.

Key highlights:
- 🤖 **25 Ready-to-Use Skills** — Drop into any `.agents/skills/` directory and go.
- 🛡️ **6 Quality Guards** — Automated review for code, tests, docs, WordPress, and WooCommerce.
- 🔀 **6 Delegate Skills** — Farm out tasks to Codex, Grok, Kimi, OpenCode, AGY, or a local LLM.
- 🎨 **3 Design Skills** — Frontend design, UI polish, and architecture visualization.
- 🔄 **Automation & Workflow** — Loop execution, Finn CI/CD pipeline, and ComfyUI generation.

### Skills Catalog

#### 🛡️ Code Quality Guards

| Skill | Description |
|---|---|
| [`clean-code-guard`](skills/clean-code-guard/) | Review production code using Clean Code, SOLID, DRY, KISS, and YAGNI principles |
| [`clean-architecture-guard`](skills/clean-architecture-guard/) | Restructure spaghetti code + enforce SOLID with zero hallucinations |
| [`test-guard`](skills/test-guard/) | Review test code against universal testing rules before shipping |
| [`docs-guard`](skills/docs-guard/) | Review documentation for accuracy against source code |
| [`wp-guard`](skills/wp-guard/) | Review WordPress plugins, themes, and blocks for security and best practices |
| [`woo-guard`](skills/woo-guard/) | Review WooCommerce extensions for HPOS compatibility and CRUD discipline |

#### 🔀 Delegate Skills

| Skill | Description |
|---|---|
| [`agy-delegate`](skills/agy-delegate/) | Delegate tasks to Google Antigravity CLI as a background implementer |
| [`codex-delegate`](skills/codex-delegate/) | Delegate tasks to OpenAI Codex CLI |
| [`grok-delegate`](skills/grok-delegate/) | Delegate tasks to Grok Build CLI |
| [`kimi-delegate`](skills/kimi-delegate/) | Delegate tasks to Kimi Code CLI |
| [`opencode-delegate`](skills/opencode-delegate/) | Delegate tasks to OpenCode CLI |
| [`local-ai-delegate`](skills/local-ai-delegate/) | Delegate to a local llama.cpp model via HTTP API |

#### 🎨 Design & Frontend

| Skill | Description |
|---|---|
| [`frontend-design`](skills/frontend-design/) | Distinctive, intentional visual design guidance for new UI |
| [`impeccable`](skills/impeccable/) | Redesign, polish, audit, and perfect any frontend interface |
| [`archify`](skills/archify/) | Create architecture, workflow, and sequence diagrams as explorable HTML |

#### 🔄 Automation & Workflow

| Skill | Description |
|---|---|
| [`code-refactorer`](skills/code-refactorer/) | Restructure working code to clean layered architecture |
| [`llm-council`](skills/llm-council/) | Run decisions through a council of 5 AI advisors (Karpathy method) |
| [`loop`](skills/loop/) | Autonomous interval execution and goal-driven metric audits |
| [`finn-spec`](skills/finn-spec/) | Interactive interview to draft build-ready Linear issues |
| [`finn-build`](skills/finn-build/) | Claim agent-ready issues from Linear, implement, and open PRs |
| [`finn-review`](skills/finn-review/) | Review open PRs against linked Linear issues |
| [`comfy_local`](skills/comfy_local/) | Generate images and videos via local ComfyUI server |
| [`comfy_workflows`](skills/comfy_workflows/) | Proven workflow recipes for ComfyUI (Z-Image Turbo, LTX, Wan) |

#### 📝 Documentation & Templates

| Skill | Description |
|---|---|
| [`best-readme-template`](skills/best-readme-template/) | Create stunning, shield-badged README documents |
| [`guard-skills`](skills/guard-skills/) | Shared guard skill resources and templates |

### Built With

[![Markdown][markdown-shield]][markdown-url]
[![Git][git-shield]][git-url]
[![GitHub][github-shield]][github-url]

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- **Git** installed on your machine
  ```sh
  git --version
  ```
- An **AI coding assistant** that supports skills (e.g., Google Antigravity, Cursor, Windsurf)

### Installation

1. **Clone** the repository
   ```sh
   git clone https://github.com/Salafite/AI-Skills.git
   ```

2. **Copy the skills you need** into your project's `.agents/skills/` directory
   ```sh
   # Copy a single skill
   cp -r AI-Skills/skills/clean-code-guard your-project/.agents/skills/

   # Or copy all skills at once
   cp -r AI-Skills/skills/* your-project/.agents/skills/
   ```

3. **Verify** the skill is loaded by your AI assistant — it will automatically detect `SKILL.md` files in the `.agents/skills/` directory.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Usage

### Copy a Single Skill

```sh
# Copy the clean-code-guard into your project
cp -r skills/clean-code-guard /path/to/your-project/.agents/skills/
```

### Copy All Skills

```sh
# Copy the entire skills library
cp -r skills/* /path/to/your-project/.agents/skills/
```

### Use in Your AI Assistant

Once installed, simply reference the skill by name in your AI assistant:
- *"Review this code using clean-code-guard"*
- *"Create a README using best-readme-template"*
- *"Delegate this task to Codex"*
- *"Run the LLM council on this architecture decision"*

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Roadmap

- [x] Initial repository setup
- [x] Add comprehensive README
- [x] Add 25 AI skill files
- [ ] Add more AI skill definitions
- [ ] Create GitHub Actions integration workflows
- [ ] Add skill testing and validation framework
- [ ] Include skill authoring guide and templates

See the [open issues](https://github.com/Salafite/AI-Skills/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Contact

**Salafite** — [@Salafite](https://github.com/Salafite)

Project Link: [https://github.com/Salafite/AI-Skills](https://github.com/Salafite/AI-Skills)

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Acknowledgments

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) — The template that inspired this README structure.
- [Img Shields](https://shields.io) — For the beautiful badges.
- [GitHub Pages](https://pages.github.com) — For free static site hosting.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[stars-shield]: https://img.shields.io/github/stars/Salafite/AI-Skills.svg?style=for-the-badge
[stars-url]: https://github.com/Salafite/AI-Skills/stargazers
[forks-shield]: https://img.shields.io/github/forks/Salafite/AI-Skills.svg?style=for-the-badge
[forks-url]: https://github.com/Salafite/AI-Skills/network/members
[issues-shield]: https://img.shields.io/github/issues/Salafite/AI-Skills.svg?style=for-the-badge
[issues-url]: https://github.com/Salafite/AI-Skills/issues
[license-shield]: https://img.shields.io/github/license/Salafite/AI-Skills.svg?style=for-the-badge
[license-url]: https://github.com/Salafite/AI-Skills/blob/main/LICENSE
[git-shield]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[github-shield]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/
[markdown-shield]: https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white
[markdown-url]: https://www.markdownguide.org/
