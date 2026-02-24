const net = require('net');
const { spawn } = require('child_process');
const path = require('path');

const startPort = parseInt(process.env.PORT, 10) || 3000;
const maxPort = startPort + 10;

function checkPort(port){
  // Try IPv6 (::) first because server may bind to IPv6 by default
  return new Promise((resolve) => {
    const tryBind = (host, cb) => {
      const tester = net.createServer()
        .once('error', (err) => { cb(err, false); })
        .once('listening', () => {
          tester.once('close', () => { cb(null, true); }).close();
        })
        .listen(port, host);
    };

    tryBind('::', (err, ok) => {
      if(ok) return resolve(true);
      // If IPv6 bind failed for reasons other than EADDRINUSE, try IPv4
      tryBind('0.0.0.0', (err2, ok2) => {
        resolve(!!ok2);
      });
    });
  });
}

async function findFreePort(){
  for(let p = startPort; p <= maxPort; p++){
    // eslint-disable-next-line no-await-in-loop
    const free = await checkPort(p);
    if(free) return p;
  }
  return null;
}

(async ()=>{
  const port = await findFreePort();
  if(!port){
    console.error('Nenhuma porta livre encontrada entre', startPort, 'e', maxPort);
    process.exit(1);
  }
  console.log('Iniciando server em porta', port);
  const env = Object.assign({}, process.env, { PORT: String(port) });
  const proc = spawn(process.execPath, [path.join(__dirname,'server.js')], { env, stdio: 'inherit' });
  proc.on('exit', (code, sig) => process.exit(code));
})();
