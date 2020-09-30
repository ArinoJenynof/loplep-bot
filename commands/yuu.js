module.exports = {
    name: 'yuu',
    usage: "--yuu",
    execute(msg,args){
        msg.channel.send('UwU',
            {
                file: './assets/yuu.png'
            }
        )
    }
};