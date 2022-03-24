import { check } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


//Test setup
export let options = {
  vus: 10,
  duration: '10s'
};

//Load test setup
/*export let options = {
  thresholds: {
    "http_req_duration": ["p(95)<1000"]
   },
  stages: [
      { duration: '5s', target: 5 }, // simulate ramp-up of traffic from 1 to 100 users over 5 seconds.
      { duration: '10s', target: 5 }, // stay at 5 users for 10 seconds.
      { duration: '5s', target: 0 }, // ramp-down to 0 users.
  ]
};*/


export default function () {
  let res = http.get('http://test.k6.io/');
  console.log(res.status)
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body contains text match': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
    
  });
  
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    //'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
  };
}
