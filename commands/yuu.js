module.exports = {
    name: 'yuu',
    usage: "--yuu",
    cooldown: 10,
    execute(msg,args){
        msg.channel.send('UwU',
            {
                file: './assets/yuu.png'
            }
        )
    }
};