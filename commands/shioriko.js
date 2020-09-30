module.exports = {
    name: 'shioriko',
    usage: "--shioriko",
    execute(msg,args){
        msg.channel.send('UwU',
            {
                file: './assets/shioriko.jpg'
            }
        )
    }
};