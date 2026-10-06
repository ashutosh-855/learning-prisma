#!/bin/bash

curl -X POST http://localhost:3000/staff/eb96453a-b46c-40e0-a1a9-286b1749fb99/1c62a0ca-72bc-4635-bec4-e52f9e2ff3cb \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul",
    "email": "rahul@gmail.com",
    "experience": "5 years",
    "designation": "Advisor"
  }'