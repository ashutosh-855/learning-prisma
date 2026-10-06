curl -X POST http://localhost:3000/setting/eb96453a-b46c-40e0-a1a9-286b1749fb99/1c62a0ca-72bc-4635-bec4-e52f9e2ff3cb \
  -H "Content-Type: application/json" \
  -d '{
    "timezone": "Asia/Kolkata",
    "language": "en",
    "emailNotification": true,
    "smsNotification": false
  }'