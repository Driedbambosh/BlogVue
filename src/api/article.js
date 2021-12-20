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

// 文章评论
export function sendArticleComment(data) {
  return request({
    url: 'article/comment',
    method: 'post',
    data
  })
}

// 获取文章评论
export function getArticleComment(params) {
  return request({
    url: 'article/getArticleComment',
    method: 'get',
    params
  })
}