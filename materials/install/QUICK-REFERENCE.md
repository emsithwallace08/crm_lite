# Quick reference — install commands

Full explanations: [INSTALL.md](./INSTALL.md). This is just copy-paste.

| Tool | Windows | Mac |
|---|---|---|
| Node LTS | `winget install OpenJS.NodeJS.LTS` | `brew install node@22` |
| Git | `winget install Git.Git` | `brew install git` |
| VS Code | `winget install Microsoft.VisualStudioCode` | `brew install --cask visual-studio-code` |
| pnpm | `npm install -g pnpm` | `npm install -g pnpm` |
| Claude Code | `npm install -g @anthropic-ai/claude-code` | `npm install -g @anthropic-ai/claude-code` |

Verify everything:
```
node -v
git --version
pnpm -v
claude --version
```
