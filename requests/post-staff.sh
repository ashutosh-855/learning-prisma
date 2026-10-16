curl -X POST \
  "http://localhost:3000/staff/5f8b9011-a7f4-469c-81a5-243e6dedd2df" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMjM3OWNmZS03N2RhLTQ4MWYtOGY0Ny00MDc0MDY3Y2QwYTYiLCJyb2xlIjoiQURNSU4iLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3OTE3OTg5MDQsImV4cCI6MTc5MTc5OTgwNH0.lIvzxSU7Bo76oTcQxMNuwfx209Tlpz21vrDBfRiq_e4" \
  -d '{
    "name": "jay",
    "email": "jay@gmail.com",
    "experience": "5 years",
    "designation": "visor"
  }'