# vue-cli4-pc-template

### 多环境变量 

&emsp;&emsp;通过在 package.json 里的 scripts 配置项中添加--mode xxx 来选择不同环境

&emsp;&emsp;只有以 VUE_APP 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，代码中可以通过 process.env.VUE_APP_BASE_API 访问

&emsp;&emsp;NODE_ENV 和 BASE_URL 是两个特殊变量，在代码中始终可用

##### 配置

&emsp;&emsp;在项目根目录中新建.env, .env.production, .env.analyz 等文件

- .env

&emsp;&emsp;serve 默认的本地开发环境配置

```javascript
/* NODE_ENV 开发环境 URL */
NODE_ENV = "development"

/* BASE_URL 网站 URL */
BASE_URL = ""

/* VUE_APP_PUBLIC_PATH 部署应用包时的基本 URL */
VUE_APP_PUBLIC_PATH = ""

/* VUE_APP_API Api接口 URL */
VUE_APP_API = ""
```

- .env.production

&emsp;&emsp;build 默认的环境配置（正式服务器）

```javascript
NODE_ENV = "production"
BASE_URL = ""
VUE_APP_PUBLIC_PATH = ""
VUE_APP_API = ""
```

- .env.test

&emsp;&emsp;自定义 build 环境配置（测试服务器）

```javascript
NODE_ENV = "production"
BASE_URL = ""
VUE_APP_PUBLIC_PATH = ""
VUE_APP_API = ""
```

&emsp;&emsp;修改 package.json

```javascript
"scripts": {
  "build": "vue-cli-service build",
  "test": "vue-cli-service build --mode test"
}
```
 



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
