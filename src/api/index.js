import request from '@/utils/request'

export function getName(params) {
	return request({
		url: '/api/xxxx',
		method: 'get',
		params: params
	})
}

export function postName(data) {
	return request({
		url: '/api/xxxx',
		method: 'post',
		data: data
	})
}

export function uploadFile(data) {
	return request({
		url: '/api/xxxx',
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: data
	})
}
