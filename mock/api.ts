export default {
  // 支持值为 Object 和 Array
  'GET /api/users': {
    code: 0,
    message: '成功',
    data: [
      { title: 'title1', content: 'mock第一条数据' },
      { title: 'title2', content: 'mock第二条数据' },
      { title: 'title3', content: 'mock第三条数据' },
    ]
  },
  // GET 可忽略
  '/api/users/1': { id: 1 },
}
