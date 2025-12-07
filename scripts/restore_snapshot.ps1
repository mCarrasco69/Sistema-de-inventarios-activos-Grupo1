#!/usr/bin/env pwsh
param(
    [string]$Name
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root
if (-not (Test-Path -Path ".snapshots")) { Write-Error "No snapshots found (.snapshots directory is missing)."; exit 1 }
if ($Name) {
    $zip = Join-Path -Path ".snapshots" -ChildPath $Name
} else {
    $latest = Get-ChildItem -Path ".snapshots" -Filter 'snapshot_*.zip' | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $latest) { Write-Error "No snapshots found in .snapshots."; exit 1 }
    $zip = $latest.FullName
}
if (-not (Test-Path -Path $zip)) { Write-Error "Snapshot not found: $zip"; exit 1 }
Write-Host "Restoring from snapshot: $zip"
Write-Host "Esto sobrescribirá archivos en el proyecto. ¿Continuar? (y/n)"
$ans = Read-Host
if ($ans -ne 'y') { Write-Host 'Abortado.'; exit 0 }
$temp = Join-Path -Path $root -ChildPath '.restore_temp'
if (Test-Path $temp) { Remove-Item -Path $temp -Recurse -Force }
New-Item -ItemType Directory -Path $temp | Out-Null
Expand-Archive -Path $zip -DestinationPath $temp -Force
# Copy files from temp into project root (overwrite)
Get-ChildItem -Path $temp -Recurse | ForEach-Object {
    $rel = $_.FullName.Substring($temp.Length).TrimStart('\','/')
    if (-not $rel) { return }
    $dest = Join-Path -Path $root -ChildPath $rel
    if ($_.PSIsContainer) {
        if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
    } else {
        $parent = Split-Path -Parent $dest
        if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent | Out-Null }
        Copy-Item -Path $_.FullName -Destination $dest -Force
    }
}
Remove-Item -Path $temp -Recurse -Force
Write-Host "Restauración completada desde: $zip"
