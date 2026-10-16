curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "ayush@admin.com",
  "password": "1234567890"
}'