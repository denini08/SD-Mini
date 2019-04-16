const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const key = 'SDéTop';


class Balancer{
    constructor(){
        this.filhos = [];

        this.ininicializarServerUdp();
    }

    getServidor(){
      return new Promise((resolve, reject) =>{
        this.getRandomInt(0, this.filhos.length).then((posicao) =>{
          resolve(this.filhos[posicao]);
        })
      })
    }

    getRandomInt(min, max) {
      return new Promise((resolve, reject) =>{
        min = Math.ceil(min);
        max = Math.floor(max);
        resolve(Math.floor(Math.random() * (max - min)) + min);
      })
    }

    ininicializarServerUdp(){
        server.on('error', (err) => {
            console.log(`error no servidor UDP:\n${err.stack}`);
            server.close();
          });
          
          server.on('message', (msgBuffer, rinfo) => {
            console.log(`Nova mensagem:  ${msgBuffer} de ${rinfo.address}:${rinfo.port}`);
            let msgString = `${msgBuffer}`;
            let mensgens = msgString.split(' PORTA:')
            if( mensgens[0] === key){
                console.log(`Novo filho: ${rinfo.address}`)
                this.filhos.push({ ip: rinfo.address, port: mensgens[1]});
                console.log(`Total filhos:  [ ${JSON.stringify(this.filhos)} ]`)
            }
          });
          
          server.on('listening', () => {
            const address = server.address();
            server.addMembership('230.185.192.108')
            console.log(`servidor ouvindo em ${address.address}:${address.port}`);
          });
          
          server.bind(41234);
          // Prints: server listening 0.0.0.0:41234          
    }

}

module.exports = Balancer;