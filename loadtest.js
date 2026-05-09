import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 }, // Ramp up to 50 users over 30 seconds
    { duration: '1m', target: 100 }, // Ramp up to 100 users over 1 minute
    { duration: '30s', target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // Test GET /
  let response = http.get(`${BASE_URL}/`);
  check(response, {
    'GET / status is 200': (r) => r.status === 200,
    'GET / response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Test POST /login
  response = http.post(`${BASE_URL}/login`, JSON.stringify({ user: 'testuser' }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'POST /login status is 200': (r) => r.status === 200,
    'POST /login has token': (r) => r.json().token !== undefined,
  });

  // Test GET /eval with valid code
  response = http.get(`${BASE_URL}/eval?code=2%2B2`);
  check(response, {
    'GET /eval valid status is 200': (r) => r.status === 200,
    'GET /eval valid response is 4': (r) => r.body === '4',
  });

  // Simulate some think time
  sleep(1);
}