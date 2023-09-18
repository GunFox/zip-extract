import ajaxProxy from '@lazyduke/ajax-proxy'
import getMimeType from './mime'
const injectAjax = function() {
    if (!window._proxyAjax) {
        ajaxProxy.proxyAjax({
            open(data, xhr) {
                xhr.url = data[1]
                return false
            },
            send(data, xhr) { 
                if (window._zipdata && window._zipdata.find(xhr.url)) {
                    xhr.status = 200
                    const file = window._zipdata.get(xhr.url)
                    xhr.responseText = file
                    xhr.response = file
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType(getMimeType(xhr.url))
                    }
                    xhr.responseType = 'arraybuffer'
                    xhr.readyState = xhr.DONE
                    xhr.statusText = 'DONE'
                    if (xhr.onloadend) {
                        xhr.onloadend()
                        xhr.dispatchEvent(new Event('onloadend'))
                    }
                    if (xhr.onreadystatechange) {
                        xhr.onreadystatechange()
                        xhr.dispatchEvent(new Event('onreadystatechange'))
                    }
                    return true
                }
            },
            status: {
                setter: true,
                getter: function(value, xhr) {
                    return xhr._status || value
                }
            },
            readyState: {
                setter: true,
                getter: function(value, xhr) {
                    return xhr._readyState || value
                }
            },
            response: {
                setter: true,
                getter: function(value, xhr) {
                    return xhr._response || value
                }
            },
            responseText: {
                setter: true,
                getter: function(value, xhr) {
                    return xhr._responseText || value
                }
            },
            statusText: {
                setter: true,
                getter: function(value, xhr) {
                    return xhr._statusText || value
                }
            }
        })
        window._proxyAjax = true
    }
}

export default injectAjax