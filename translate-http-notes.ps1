$path = '1.HTTP-AND-CORS/html_notes/notes.html'
$html = [System.IO.File]::ReadAllText((Join-Path (Get-Location) $path)
)

$protected = New-Object System.Collections.Generic.List[string]
$html = [regex]::Replace($html, '(?is)<(pre|script|style)\b.*?</\1\s*>', {
  param($m)
  $protected.Add($m.Value)
  "@@PROTECTED$($protected.Count - 1)@@"
})

function Translate([string]$value) {
  $trimmed = $value.Trim()
  if ($trimmed.Length -eq 0 -or $trimmed -notmatch '[A-Za-z]{2}') { return $value }
  if ($trimmed -match '^(https?://|[A-Za-z0-9_./:-]+$)' -and $trimmed -notmatch '\s') { return $value }
  $leading = $value.Substring(0, $value.IndexOf($trimmed))
  $trailing = $value.Substring($value.IndexOf($trimmed) + $trimmed.Length)
  $query = [uri]::EscapeDataString($trimmed)
  for ($attempt = 0; $attempt -lt 3; $attempt++) {
    try {
      $result = Invoke-RestMethod -Uri "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=it&dt=t&q=$query" -Method Get
      $translated = (($result[0] | ForEach-Object { $_[0] }) -join '')
      if ($translated) { return $leading + $translated + $trailing }
    } catch { Start-Sleep -Milliseconds 250 }
  }
  return $value
}

# Translate text nodes and selected human-readable attributes, leaving markup and protected code intact.
$html = [regex]::Replace($html, '(?is)(aria-label|title|content)=("[^"]*"|''[^'']*'')', {
  param($m)
  $quote = $m.Groups[2].Value.Substring(0, 1)
  $text = $m.Groups[2].Value.Substring(1, $m.Groups[2].Value.Length - 2)
  "$($m.Groups[1].Value)=$quote$(Translate ([System.Net.WebUtility]::HtmlDecode($text)))$quote"
})
$html = [regex]::Replace($html, '(?is)(?<=^|>)([^<]+)(?=<|$)', {
  param($m)
  $text = $m.Value
  if ($text -match '^\s*(?:[{}]|[;/]|--|#|[0-9.]+\s*$)') { return $text }
  Translate ([System.Net.WebUtility]::HtmlDecode($text))
})

for ($i = 0; $i -lt $protected.Count; $i++) {
  $html = $html.Replace("@@PROTECTED$i@@", $protected[$i])
}
$html = $html.Replace('<html lang="en">', '<html lang="it">')
[System.IO.File]::WriteAllText((Join-Path (Get-Location) $path), $html, [System.Text.UTF8Encoding]::new($false))