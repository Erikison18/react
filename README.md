# obc-react

asiainfo obc FE react 方案

## 开发环境

* [download](node https://nodejs.org/en/download/) - node^8.10.0、npm^6.0.0

### 安装依赖

```
//到达你的项目目录
cd project

//安装依赖
npm install

```

### 运行

```
//启动
$ npm start

//发布
$ npm run build

//测试
$ npm run test
```

### 项目结构
```
project
	├── config
	│		├──	paths.js
	│		└──	webpack.config.custom.js
	├── public
	│		├──	index.html
	│		└──	manifest.json
	├── scripts
	├── src
	│		├──	components
	│		│		├──	common
	│		│		├──	layout
	│		│		└──	...other component
	│		├──	public
	│		│		├──	js
	│		│		├──	style
	│		│		└──	img
	│		├──	redux	
	│		│		├──	action
	│		│		├──	middleware
	│		│		├──	reducers
	│		│		├──	config.js
	│		│		├──	createStore.js
	│		│		└──	localstorageStatesConfig.js
	│		├──	App.js
	│		└──	index.js
	├── .babelrc
	└── .gitignore		
```

### 项目结构说明

- `config` create-react-app 默认配置和自定义配置
	- `paths.js` 路径相关配置
	- `webpack.config.custom.js` 自定义webpack配置
- `public` create-react-app 公共资源目录(非应用逻辑开发公共资源目录)
	- `index.html` 
	- `manifest.json` 资源映射
- `scripts` create-react-app 启动相关
- `src` 应用逻辑开发目录
	- `components` 组件
	- `public` 公共资源目录
	- `redux` react-redux
		- `action` redux action 样板代码编写目录
		- `middleware` redux 自定义中间件目录
		- `reducers` redux reducers 样板代码编写目录
		- `config.js` redux 相关配置
		- `createStore.js` 创建redux store 入口
		- `localstorageStatesConfig.js` 统一管理处理标注的redux state 存储到localstorage配置文件
		
### 开发约定
1. webpack配置功能的新增在 `project/config/webpack.config.custom.js` 下进行。
2. 有路径更改或者发布位置改变的在 `project/config/paths.js` 中 resolveApp 方法中进行配置，在非特殊情况下不去改动配置逻辑。
3. 应用逻辑开发的公共资源在 `project/src/public` 下，而非 `project/public` 下。
4. 公共components开发目录在 `project/src/components/common`。
5. 组件开发需带上 `prop-types` 进行类型管控。
5. 第三方components插入到自定义目标组件children components下进行管理。
6. 不同布局类型的页面入口统一从 `project/src/components/layout` 开始。
7. action、reducers模版代码统一redux-action工具编写。
8. 需要进行本地存储localstorage的，通过redux state统一在 `project/src/redux/localstorageStatesConfig.js` 中进行配置。
9. 子路由components通过 `@common/routerLoadable/routerLoadable.jsx` 做分片处理，统一页面的加载状态展示。
10. 异步请求使用统一归纳到 `异步action` 中，采用 `redux-promise-middleware` 的方案，为页面增加progress-bar状态。

### 相关文档

* [create-react-app](https://github.com/facebook/create-react-app)
* [react](https://reactjs.org/)
* [react-loadable](https://github.com/jamiebuilds/react-loadable)
* [antd](https://ant.design/index-cn)
* [react-router-dom4](https://reacttraining.com/react-router/web/example/basic)
* [react-redux](https://cn.redux.js.org/docs/react-redux/)
* [redux-actions](https://redux-actions.js.org/introduction)
* [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)
* [react-redux-loading-bar](https://github.com/mironov/react-redux-loading-bar)
* [redux-localstorage-simple](https://github.com/kilkelly/redux-localstorage-simple)
* [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

### 技术栈脑图
* [fetch](../er.png)
	
	
	
	

	
	