curl -X POST http://localhost:3000/user/root \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ashutosh",
    "email":"ashutosh@root.com",
    "Role": "ROOT"
  }'