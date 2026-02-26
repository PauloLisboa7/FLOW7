const https = require('https');
const data = JSON.stringify({
  email: 'test123@example.com',
  password: '123456',
  returnSecureToken: true
});

const apiKey = 'AIzaSyDc0FNYmKztYLpvCdt-lMaIGOJyaq1P-Sk';
const options = {
  hostname: 'identitytoolkit.googleapis.com',
  path: `/v1/accounts:signUp?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('status', res.statusCode);
    console.log('body', body);
  });
});
req.on('error', (e) => console.error('error', e));
req.write(data);
req.end();
