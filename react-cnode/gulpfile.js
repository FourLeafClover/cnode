var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
//载入配置文件
var config = require('./server.conf');
var sshConfig = config.ssh;
//打开ssh通道
var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});

console.log(sshConfig);

gulp.task('default', ['deployFile'], function () {});

/**
 * 上传文件
 */
gulp.task('deployFile', ['execSSH'], () => {
    return gulp
        .src(['./build/**'])
        .pipe(gulpSSH.dest(config.remoteDir));
});

/**
 * 执行命令
 */
gulp.task('execSSH', () => {
    console.log('删除服务器上现有文件...');
    return gulpSSH.shell(config.commands, {
            filePath: 'commands.log'
        })
        .pipe(gulp.dest('logs'));
});