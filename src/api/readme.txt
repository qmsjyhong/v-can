请求管理文件夹

index.js包含公共请求方法,请求拦截,公共错误处理方法等

api.js对所有后台接口名进行管理

请求示例
fetchPostData: async function () {
  let params = {}
  const res = await http.post(api.right, params)
  if (res.data.success) {
    alert('请求成功')
  }
}

fetchGetData: async function () {
  let params = {}
  const res = await http.get(api.right, params)
  if (res.data.success) {
    alert('请求成功')
  }
}