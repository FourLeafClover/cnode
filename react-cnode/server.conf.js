module.exports = {
    version: '1.0.0',
    ssh: {
        host: '47.97.172.44', //可以配置多台服务器
        port: 22,
        username: 'root',
        password: 'kjt-frank-2018'
    },
    remoteDir: `/usr/local/nginx/html/`,
    commands: [
        `rm -rf /usr/local/nginx/html/`
    ]
};