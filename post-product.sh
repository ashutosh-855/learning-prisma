#!/bin/bash

curl -X POST http://localhost:3000/organization/2333535 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Greate Product",
    "content": "This is really great",
    "rating": 4,
    "productId": 2
  }'
