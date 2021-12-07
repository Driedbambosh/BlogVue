import request from '../request'

// 文章列表 
export function getArticles(params) {
  return request({
    url: 'article/',
    method: 'get',
    params
  })
}

// 文章详情
export function getArticle(params) {
  return request({
    url: 'article/getArticle',
    method: 'get',
    params
  })
}