const concurrently = require('concurrently')

const args = process.argv.slice(2).join(' ')

concurrently(
  [
    { command: 'npm:dev:server', prefixColor: 'blue', name: 'server' },
    { command: 'npm:dev:client -- ' + args, prefixColor: 'magenta', name: 'client' }
  ],
  {
    killOthers: ['failure', 'success']
  }
)