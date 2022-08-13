const { spawn } = require('node:child_process');
///\x1b[31m ${command}: is not a valid command\x1b[0m
// const ls = spawn('echo', ['', '\033[31;5;7mTitle of the Program\033[0m']);
const ls = spawn('echo', ['', '\x1b[5m\x1b[31m INVALID: is not a valid command\x1b[0m\x1b[0m']);

ls.stdout.on('data', (data) => {
  console.log(`${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
})
