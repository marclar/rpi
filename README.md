# rpi

Publish valid JSON messages to the topic "rpi".

### Gmail

To send via Gmail, use the format: 
```
{
    "ctrl": "gmail",
    "action": "send",
    "body": {
        "to": "user@domain.com",
        "subject": "hihihihi",
        "text": "hi again"
    }
}
```