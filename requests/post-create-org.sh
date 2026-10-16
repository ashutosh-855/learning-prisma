curl -X POST http://localhost:3000/organization/a038c9d1-fa05-40db-bd75-4dd48718dfe6 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC Hospital",
    "address": "Delhi",
    "website": "https://abchospital.com",
    "email": "contact@abchospital.com"
  }'