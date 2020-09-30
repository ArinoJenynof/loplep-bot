module.exports = {
    name: 'shioriko',
    execute(msg,args){
        msg.channel.send('UwU',
            {
                file: './assets/shioriko.jpg'
            }
        )
    }
};