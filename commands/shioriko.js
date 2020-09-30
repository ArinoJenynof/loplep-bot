module.exports = {
    name: 'shioriko',
    usage: "--shioriko",
    cooldown: 10,
    execute(msg,args){
        msg.channel.send('UwU',
            {
                file: './assets/shioriko.jpg'
            }
        )
    }
};