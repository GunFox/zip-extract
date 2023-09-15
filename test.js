import zipExtract from 'zip-extract'
import axios from 'axios'

zipExtract.loadZip('xxxx/ziptest/test.zip').then(() => {
    axios('xxx/images/image3.png').then(res => {
        console.log(res)
    })

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'image/jpeg');
    var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

    var myRequest = new Request('xxxxx/ziptest/images/image3.png');
    fetch(myRequest,myInit).then(function(response) {
        console.log('response1', response)
        return response.blob()
    }).then(function (response) {
        console.log(response)
    })

    var myRequest1 = new Request('xxxxxxxxx/ziptest/image3.png');
    fetch(myRequest1,myInit).then(function(response) {
        console.log('response2', response)
        return response.blob()
    }).then(function (response) {
        console.log(response)
    })
    

    const img = document.createElement('img')
    img.src = 'xxxxxxxxx/ziptest/image3.png'
    img.onload = function() {
        console.log('image load', img.src)
    }
    document.body.appendChild(img)
    img.setAttribute('src', 'xxxxxxxxx/ziptest/images/image1.png')
    
}) 