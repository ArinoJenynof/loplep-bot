module.exports = {
    name: 'shioriko',
    usage: "--shioriko",
    cooldown: 10,
    execute: (message) => {
        msg.channel.send('UwU',
            {
                file: './assets/shioriko.jpg'
            }
        )
    }
};