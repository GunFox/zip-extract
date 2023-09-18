### ZIP-EXTRACT

Zip资源提取，在发起请求时拦截，检测zip包中是否存在，存在就返回该资源，不存在发起请求

支持
XMLHttpReqeust,
Fetch,
setAttribute,
script.src,
img.src,
link.href,
六种资源加载方式劫持

可以通过window._zipdata查看zip数据

```js
window._zipdata = {
    files: {}, // 所有zip文件列表
    find: (path) {}, // 通过文件链接匹配file数据，有return true, 无 return false
    get: (path) {} // 通过文件链接匹配file数据，有return arraybuffer, 无 return null
}
```