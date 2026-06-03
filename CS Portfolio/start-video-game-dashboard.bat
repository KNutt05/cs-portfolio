@echo off
title Video Game Data Display Server
cd /d "C:\Users\kpnut\OneDrive\Documents\Video game data display"
echo Starting Video Game Data Display...
echo.
echo Keep this window open while presenting.
echo Portfolio link: http://localhost:3000
echo.
start "" powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000'"
"C:\Users\kpnut\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js
echo.
echo Server stopped. Press any key to close.
pause >nul
