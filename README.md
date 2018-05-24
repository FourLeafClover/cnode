### React-CNODE项目介绍

   1. 此项目基于Create React App+Redux++Antd-mobile,主要使用webpack构建项目,gulp-ssh用于自动发布文件包到服务器。
   
   2. 服务器使用的阿里云的centos服务器,挂在到nginx环境上。

## 指令介绍   

* 安装依赖包：npm install 
* 本地运行: npm run start
* 本地编译: npm run build
* 部署到服务器:npm run delpoy
* 因为IOS手机里面JS加载完毕才渲染界面,所以为了保证IOS初次加载动画效果,请发布前将build下的index.html中
引用mian.hash.js加上async属性<script type="text/javascript" async='async' src="/static/js/main.7856a4d9.js"></script>

### [demo](http://www.intelligenttech.top/#/)

![](https://images2018.cnblogs.com/blog/657942/201805/657942-20180523165730911-1904066823.png)   

### VUE-CNODE项目介绍

   1. 此项目基于Vue+Webpack+Gulp-ssh,主要使用webpack构建项目,gulp-ssh用于自动发布文件包到服务器。
   2. 服务器使用的阿里云的centos服务器,挂在到tomcat+nginx环境上。

### 指令介绍

* 安装依赖包：npm install 
* 本地运行: npm run start
* 部署到服务器: npm run d_prd(因为个人项目,没有测试环境,我也只内置了dev和prd两个环境)
* /buld/deploy.conf.prd 文件的ssh里面配置服务器的ip地址和账号密码,如果有多台服务器可以在里面配置多个.

  
    module.exports = {
    
        version: '1.0.0',
        
        ssh: [{
        
            host: '47.97.172.44',
            
            port: 22,
            
            username: 'root',
            
            password: 'xxxx'
            
        }],
        remoteDir: `/usr/local/apache-tomcat-9.0.5/webapps/cnode/`,
        commands: [
            `rm -rf /usr/local/apache-tomcat-9.0.5/webapps/cnode/`
        ]
    };
 

### [demo](http://www.intelligenttech.top/cnode/)

  因为使用的better-scroll,better-scroll首页的滚动翻页,PC端只能通过鼠标上下拖动来加载下一页，请不要滚动鼠标滚轮，或者拖动浏览器右边滚动条。否则无法加载下一页。mobile管一直都是通过滑动屏幕来实现的所以没有该问题。建议扫描二维码来查看效果。

![](https://images2018.cnblogs.com/blog/657942/201805/657942-20180523165652795-1262030106.png)   

### 有问题反馈

  在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流。

* email: zc_smile@outlook.com
* 博客园: [@我有一颗四叶草](http://www.cnblogs.com/FourLeafCloverZc/)


### 商业合作

  本人目前就职于成都某海淘公司,业余时间可接前端项目,如果贵公司已经有了完整的后台接口,又需要开发移动站点的欢迎联系我,我可以利用业余时间帮贵公司完成项目。
  
