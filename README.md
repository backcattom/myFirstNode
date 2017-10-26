一边工作，一边把这个小项目跟了下来，感谢scott的无私奉献
我是最近才开始有计划学习node的，翻看文档，只了解到http、fs模块，然后开始跟着写项目
node工作流方式、bower、mongodb、版本锁定是完全不懂的

跟完这个项目后：
1、对node npm的工作流程有一定的了解，使用npm安装模块

2、express是对http模块进行封装的框架，可以用来写后端路由和数据请求

3、mongodb的安装和启动，设置目录

4、使用mongoose模块对mongodb操作，有模式schema、模型model和文档三个步骤

5、前端版本控制工具bower，使用npm安装bower，使用bower安装bootstrap等前端框架

6、jade模版引擎语法

7、前后端版本锁定 前端： bower init   后端：npm init


项目准备：

前端：bootstrap

后端：node、mongodb 需要下载安装

npm模块：express（http框架）、bower(静态资源管理工具)、mongoose（用来操作mongodb的js模块）、jade（模版引擎）、underscore（JavaScript 工具库）、body-parser（4.0后从express分离 请求体解析中间件，可以处理json、raw二进制stream、文本text()、URL-encoded）、moment（moment格式化时间模块）

关于body-parser:可以查看http://blog.csdn.net/yanyang1116/article/details/54847560

入口文件 app.js(配置路由、连接数据库)

前端模版：views

public 静态资源或库

schememas mongodb数据库模式配置

models 模型输出

如何下载并运行这个项目：

1、下载并安装git

2、在某个盘新建文件夹down，进入到down这个文件夹以后，右键Git Bash Here

3、运行 git clone https://github.com/backcattom/myFirstNode.git 开始下载项目

4、下载完成后，进入到 down/myFirstNode/文件夹

5、看到bower.json和package.json 里面是项目运行的依赖库和对应的版本，需要下载安装

6、运行npm install 下载安装

7、项目用到了数据库，运行需要mongodb，所以需要本地安装mongodb，并开启服务， 如何安装和运行mongodb（下载mongodb，选择自定义安装，目录短一点好，cd进入到安装目录的bin文件，运行mongod，即可开启mongodb服务）

8、运行node app.js 即可运行项目
