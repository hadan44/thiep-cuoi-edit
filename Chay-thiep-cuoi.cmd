@echo off
cd /d "%~dp0"
where node >nul 2>nul
if not errorlevel 1 (
  node server.cjs 4173 --open
) else if exist "%LOCALAPPDATA%\..\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  "%LOCALAPPDATA%\..\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.cjs 4173 --open
) else if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.cjs 4173 --open
) else (
  echo Can cai Node.js de chay che do tu dong luu file.
)
pause
