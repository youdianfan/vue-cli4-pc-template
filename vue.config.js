const path = require("path")
const resolve = dir => path.join(__dirname, dir)
const proxyConfig = require("./proxyConfig.js")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

const Time = new Date().getTime()
let extractConfig = false
if (process.env.NODE_ENV === "production") {
	// css文件加上hash,时间戳防止缓存
	extractConfig = {
		filename: 'css/[name]_[hash:8]' + Time + '.css',
		chunkFilename: 'css/[name]_[hash:8]' + Time + '.css'
	}
}


module.exports = {
	publicPath: process.env.VUE_APP_PUBLIC_PATH,// 默认'/' 部署应用包时的基本 URL
	// outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
	// assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	css: {
		extract: extractConfig, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
	},
	devServer: {
		host: '0.0.0.0',
		port: 8899, // 配置端口
		open: true, // 自动开启浏览器
		compress: true, // 一切服务都启用 gzip 压缩
		proxy: proxyConfig, // 代理
	},
	chainWebpack: config => {
		// 打包单js文件加上时间戳
		config.output.filename('js/[name]_[hash:8]' + Time + '.js').end()
		config.output.chunkFilename('js/[id]_[hash:8]' + Time + '.js').end()
		// 添加别名
		config.resolve.alias
			.set("@", resolve("src"))
			.set("@assets", resolve("src/assets"))
			.set("@components", resolve("src/components"))
			.set("@router", resolve("src/router"))
			.set("@store", resolve("src/store"))
			.set("@views", resolve("src/views"))
			.set("@utils", resolve("src/utils"))
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			const plugins = []
			plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							warnings: false,
							drop_console: true,
							drop_debugger: false,
							pure_funcs: ["console.log"] //移除console
						}
					},
					sourceMap: false,
					parallel: true
				})
			)
			plugins.push(
				new CompressionWebpackPlugin({
					filename: "[path].gz[query]",
					algorithm: "gzip",
					test: /\.js$|\.html$|.\css/, //匹配文件名
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false //不删除源文件
				})
			)
			config.plugins = [...config.plugins, ...plugins]
		}
	}
}
