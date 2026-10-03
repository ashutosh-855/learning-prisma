#!/bin/bash

curl -X POST http://localhost:3000/user/eb96453a-b46c-40e0-a1a9-286b1749fb99/012e50b3-eebd-4642-9a9c-d483aae7e9cc \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ayush",
    "email": "ayush@admin.com",
    "Role": "ADMIN"
  }'