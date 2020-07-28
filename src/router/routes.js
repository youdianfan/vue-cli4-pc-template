// 添加新的路由应遵循目录结构

const routeOptions = [
	{
		path: '/',
		name: 'home',
	}
]
routeOptions.push({
	path: '*',
	name: 'error',
})

const routes = routeOptions.map(route => {
	if (!route.component) {
		route = {
			...route,
			component: resolve => require([`@/views/${route.name}/${route.name}.vue`], resolve)
		}
	}
	return route
})

export default routes
