@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  if exist "C:\Users\33187\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "PATH=C:\Users\33187\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
)
node "%~dp0node_modules\npm\bin\npm-cli.js" %*
exit /b %ERRORLEVEL%
