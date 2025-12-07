#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'
# Create a zip snapshot of the project (excluding node_modules, .git and .snapshots)
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root
if (-not (Test-Path -Path ".snapshots")) { New-Item -ItemType Directory -Path ".snapshots" | Out-Null }
$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$zip = Join-Path -Path ".snapshots" -ChildPath "snapshot_$timestamp.zip"
Write-Host "Creating snapshot: $zip"
$files = Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $_.FullName -notmatch "\\\.git\\" -and $_.FullName -notmatch "\\\bnode_modules\\b" -and $_.FullName -notmatch "\\\.snapshots\\"
}
if (-not $files) { Write-Error "No files found to archive."; exit 1 }
Compress-Archive -Path ($files | ForEach-Object { $_.FullName }) -DestinationPath $zip -Force
Write-Host "Snapshot creado en: $zip"
Write-Host "Para restaurarlo más tarde ejecuta: .\scripts\restore_snapshot.ps1 -Name "$(Split-Path $zip -Leaf)""
