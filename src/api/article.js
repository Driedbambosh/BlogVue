import request from '../request'

export function getArticle() {
  return request({
    url: 'my-blog/article/',
    method: 'get',
  })
}

