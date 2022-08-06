import request from '../request'

export function getLabel(params) {
    return request({
        url: '/label/',
        method: 'get',
        params
    })
}
