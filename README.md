<p align="center">
  node-expresss-mongodb
</p>

<p align="center">
	<a href="https://github.com/vuejs/vue">
		<img src="https://img.shields.io/badge/vue-2.5.2-blue.svg" alt="vue">
	</a>
	<a href="https://github.com/ElemeFE/element">
		<img src="https://img.shields.io/badge/element----ui-2.3.2-blue.svg" alt="element-ui">
	</a>
	<a href="https://github.com/BiYuqi/node-expresss-mongodb/blob/master/LICENSE">
		<img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
	</a>
</p>

> 基于vue2.x + element-ui + node + express + mongodb 前后端分离的简约商品管理,主要练习文件上传，接口编写，发布服务等


## Download

``` bash
#  download
git clone https://github.com/BiYuqi/node-expresss-mongodb.git

cd node-expresss-mongodb
# install dependencies
npm install

# local start web-page
npm run dev

# local start server
npm i supervisor -g
npm run app
```
## server架构
```html
server
  ---common 公用模块
  ---config 系统配置
  ---constrollers 业务逻辑
  ---middleware 中间件
  ---models 数据模型(db)
  ---routes 路由api
  ---upload 上传文件目录
  ---app.js 项目入口
```
```js
// server主要依赖
express
body-parser
cookie-parser
multer
mongoose
connect-mongo
jsonwebtoken
ioredis
qn
```

## 下载并安装Mongodb
<a href="https://www.mongodb.com/download-center#community">请自行安装下载MongoDB</a> <br/>

**window平台注意事项：**

MongoDB的数据存储在data目录的db目录下，但是这个目录在安装过程不会自动创建，所以你需要手动创建data目录，并在data目录中创建db目录。
比如我的mongodb安装在了D盘，那么在安装目录创建上述文件夹比如D:\data\db

**mac平台安装：**
以下如果安装失败，请在命令前加sudo
```js
// sudo brew install mongodb
// 安装mongodb
brew install mongodb
// 创建数据库
mkdir -p /data/db
```


## 启动Mongodb
> 以下平台具体命令有先后执行顺序

**MAC**

打开 terminal 或者 iterm2 打开两个tab

* 一个输入 mongod 回车
* 一个输入 mongo 回车

**Window**

在你的安装目录D:\Program Files\MongoDB\Server\4.0\bin下,分别执行(双击)
* mongod.exe
* mongo.exe

<hr />

#### 项目中启动node server && 前端代码
本地node服务端接口，server文件夹
* 为本地node服务，本地npm run dev后，需要在server目录 node app 来启动本地服务，以便登录正常进行
* 开发环境建议使用supervisor app 来启动服务，可以实时调试node，热更新
* 以下为src/utils/request.js文件配置
```js
// node 服务暴露出的接口地址
const BASE_URL = 'http://localhost:7085'
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 20000
})
```
<hr />

## 注意事项
* 项目使用npm i 安装依赖后，你npm run dev 可能会报错，这个时候需要 npm i node-sass sass-loader -D 来解决依赖问题
* supervisor 必须全局安装才可以 npm i supervisor -g
* 如果不是在server目录下启动 supervisor app 会导致上传文件目录报错，具体可进server/routes/upload.js进行修改(暂不建议修改)

### TODO
- [x] 拆分api,增加controllers模块
- [x] 接口查询已支持分页模糊查询
- [x] jwt鉴权初步实现
- [ ] 图片上传，服务器支持七牛
- [ ] 尝试分片上传，分类上传
- [ ] redis实践数据缓存，接口缓存

