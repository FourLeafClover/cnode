module.exports = {
    version: '1.0.0',
    ssh: [{
        host: '47.97.172.44', //可以配置多台服务器
        port: 22,
        username: 'root',
        password: 'XXXXXXXXXXXXX'
    }],
    remoteDir: `/usr/local/apache-tomcat-9.0.5/webapps/cnode/`,
    commands: [
        `rm -rf /usr/local/apache-tomcat-9.0.5/webapps/cnode/`
    ]
};