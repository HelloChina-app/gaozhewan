$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$nodeDir = Join-Path $root ".tools\node-v24.16.0-win-x64"
$env:Path = "$nodeDir;$env:Path"

Set-Location $root
& (Join-Path $nodeDir "npm.cmd") run start -- -p 3000
