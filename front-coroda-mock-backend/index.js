const jsonServer = require('json-server');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();
const cors = require('cors');
const PORT = 3001;
const program = require('commander');

server.use(jsonServer.bodyParser);
server.use(function(req,res,next){
    setTimeout(next, 500);
});
server.use(middlewares);
server.use(cors());

require("./router")(server);

program
    .option('-p, --proxy','Use mock server like api gateway')
    .action(function(dir,cmd){
        process.env.proxy = cmd && cmd.proxy ? true : false;
    });
program.parse(process.argv);

server.listen(PORT, () => {
    console.log('*************************************');
    console.log('*** TESIS Mock Backend is running ***');
    console.log('*** TESIS                         ***');
    console.log(`*** PORT: ${PORT}                 ***`);
    console.log('*************************************');
});
