param (
    [int]$Delay = 5, # delay seconds
    [switch]$Enter, # append ENTER key
    [switch]$Raw, # raw mode, don't escape special characters
    [switch]$Mask, # mask password
    [switch]$Password # mask + append ENTER key
)
$ErrorActionPreference = 'Stop'
$text = Get-Clipboard -TextFormatType Text
$disp = $text
$maxLen = 256
if ($Password) {
    $Mask = $true
    $Enter = $true
}
if ($mask -and $disp.Length -gt 2) {
    $disp= $disp.Substring(0,1) + ('*' * $disp.Length) + $disp.Substring($disp.Length - 1)
}
if ($disp.Length -gt $maxLen) {
    $disp = $disp.Substring(0, $maxLen) + '...'
}

Write-Host "Get Text from Clipboard:"
Write-Host $disp -ForegroundColor Cyan
Write-Host
$waitSecs = $Delay;
$progressTitle = "Paste Countdown"
for ($i = $waitSecs; $i -gt 0; $i--) {
    Write-Progress -Activity $progressTitle -Status "$i seconds..." -PercentComplete ($i / $waitSecs * 100)
    Start-Sleep -Seconds 1
    $host.UI.RawUI.CursorPosition.X = 0
}
Write-Progress $progressTitle -Completed 
$lines = $text.Split("`n") 
Add-Type -AssemblyName System.Windows.Forms
for ($i = 0; $i -lt $lines.Length; $i++) {
    $keys = $lines[$i]
    if (-not $Raw) {
        $keys = [regex]::Replace($keys, "[+^%~()\{\}]", { param ($m) return "{" + $m.Value + "}" })
        $keys = $keys.Replace("`r", '')
        $keys = $keys.Replace("`t", "{TAB}")
    }
    [System.Windows.Forms.SendKeys]::SendWait($keys)
    Start-Sleep -Milliseconds 100
    if ($i -lt ($lines.Length - 1) -and !$Raw) {
        [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    }
}
if ($Enter) {
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
}