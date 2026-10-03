curl -X POST http://localhost:3000/organization/1c62a0ca-72bc-4635-bec4-e52f9e2ff3cb \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC Hospital",
    "staffCount": 50,
    "address": "Delhi",
    "website": "https://abchospital.com",
    "email": "contact@abchospital.com"
  }'