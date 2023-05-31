require('module-alias/register');
const Variables = require('./services/variables');
const Envs = require('./config/envs');
const Server = require('./config/express');

// There should be one server instance for each worker
const start = async () => {
  await Variables.setup();
  const server = Server.setup();
  const port = Envs.get('port');
  server.listen(port, async () => {
    console.log(`Server – listening on ${port}`);
  });
  return server;
};

start();

