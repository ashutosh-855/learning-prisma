#!/bin/bash

curl -X POST http://localhost:3000/user/5f8b9011-a7f4-469c-81a5-243e6dedd2df/a038c9d1-fa05-40db-bd75-4dd48718dfe6 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ayush",
    "email": "ayush@admin.com",
    "password": "1234567890",
    "Role": "ADMIN"
  }'