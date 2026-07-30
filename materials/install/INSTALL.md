# Install cheat-sheet — LiftOff Summer

Projected at the start of session. Full instructions below; if you just need
the commands, see [QUICK-REFERENCE.md](./QUICK-REFERENCE.md).

You need: **Node.js (LTS)**, **Git**, **VS Code**, **Claude Code**, **pnpm**.

---

## 1. Node.js (LTS)

**Windows:**
```
winget install OpenJS.NodeJS.LTS
```

**Mac:**
```
brew install node@22
```
(No Homebrew? Install it first from https://brew.sh, or use https://nvm.sh)

**Verify (both):**
```
node -v
```
Should print `v22.x.x` or higher.

---

## 2. Git

**Windows:**
```
winget install Git.Git
```

**Mac:**
```
brew install git
```
(Or accept the Xcode Command Line Tools prompt if one appears.)

**Verify (both):**
```
git --version
```

---

## 3. VS Code

**Windows:**
```
winget install Microsoft.VisualStudioCode
```

**Mac:**
```
brew install --cask visual-studio-code
```

---

## 4. pnpm

**Windows & Mac (same command):**
```
npm install -g pnpm
```

**Verify:**
```
pnpm -v
```

---

## 5. Claude Code

**Windows & Mac (same command):**
```
npm install -g @anthropic-ai/claude-code
```

Then launch it and sign in:
```
claude
```

---

## Troubleshooting

- **"command not found" right after install (Windows or Mac):** close and
  reopen your terminal — installers update PATH, but open terminals don't see it.
- **PowerShell won't run scripts (Windows):** if you see an "execution policy"
  error, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` in an admin
  PowerShell window.
- **Mac asks to install Xcode Command Line Tools:** accept it — Git and some
  npm packages need it. This can take a few minutes on a slow connection.
- **`pnpm` or `claude` not found after `npm install -g`:** check `npm config
  get prefix` is on your PATH; on Mac with Homebrew's Node this is usually
  automatic.

If you're still stuck after 5 minutes, set your `STATUS.md` to 🔴 and flag it —
don't burn the whole session on a toolchain issue.
