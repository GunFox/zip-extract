### ZIP-EXTRACT

Zip资源提取，在发起请求时拦截，通过名称比对，检测zip包中是否存在，存在就返回该资源，不存在发起请求

支持
XMLHttpReqeust,
Fetch,
setAttribute,
script.src,
img.src,
link.href,
六种资源加载方式劫持

可以通过window._zipdata查看zip数据

使用示例：

```js
import zipExtract from 'zip-extract'

zipExtract.loadZip('xxxxxxxx/test1.zip').then(() => {
    /*
        window._zipdata = {
            files: {
                'main.js': arraybuffer,
                'image3.png': arraybuffer,
                'test.js': arraybuffer,
                'test.css': arraybuffer,
                'test.jpng': arraybuffer
            },
            get: function(path) { return arraybuffer },
            find: function(path) { return Boolean },
        }
    */

    const xhr = new window.XMLHttpRequest()
    xhr.open('get', 'xxxxxxxx/main.js')
    xhr.onloadend = function() {
        if(xhr.readyState === 4) {
            console.log(xhr.responseText)
            console.log(xhr.response)
        }
    }
    xhr.send(null)

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'image/jpeg');
    var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

    var myRequest = new Request('xxxxxxxx/image3.png');
    fetch(myRequest,myInit).then(function(response) {
        console.log('response1', response)
        return response.blob()
    }).then(function (response) {
        console.log(response)
    })

    const script = document.createElement('script')
    script.src = 'xxxxxxxx/test.js'
    document.body.appendChild(script)
    

    const img = document.createElement('img')
    img.src = 'xxxxxxxx/test.jpg'
    document.body.appendChild(img)

    const link = document.createElement('link')
    link.href = 'xxxxxxxx/test.css'
    link.rel="stylesheet"
    document.head.appendChild(link)

    const image1 = document.createElement('img')
    document.body.appendChild(image1)
    image1.setAttribute('src', 'xxxxxxxx/test.jpg')
}) 
```
