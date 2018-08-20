<p align="center">
  Vue-admin-template
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

> 基于vue2.x + element-ui + node + express + mongodb 的简约商品管理,主要练习文件上传，接口编写，发布


### 本地跑项目

``` bash
#  download
git clone https://github.com/BiYuqi/node-expresss-mongodb.git

cd node-expresss-mongodb
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### 本地起服务
本地node服务端接口，server文件夹
* 为本地node服务，本地npm run dev后，需要在server目录 node app 来启动本地服务，以便登录正常进行
* 开发环境建议使用supervisor app 来启动服务，可以实时调试node，热更新
* 以下为src/utils/request.js文件配置
```js
// 接口配置
const BASE_URL = 'http://localhost:7085'
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 20000
})
```

### 连接MongoDB
<a href="http://www.runoob.com/mongodb/mongodb-window-install.html">请自行安装下载mongodb</a>
<a href="http://www.runoob.com/mongodb/mongodb-connections.html">连接mongodb</a>

### 问题
项目使用np i 安装依赖后，你npm run dev 可能会报错，这个时候需要 npm i node-sass sass-loader -D 来解决依赖问题
