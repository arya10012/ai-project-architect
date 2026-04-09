$apiKey = "AIzaSyAGa-4wlqf2cFgY4pRPbS0ZTUpUnQm77X4"
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey"
$body = @{
    contents = @(
        @{ parts = @( @{ text = "say hi" } ) }
    )
} | ConvertTo-Json -Depth 5 -Compress

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error details:"
    Write-Host $_.Exception.Response
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host $reader.ReadToEnd()
}


