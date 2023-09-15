import ajaxProxy from '@lazyduke/ajax-proxy'

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
                    const { responseType } = xhr
                    if (!responseType || responseType === 'text' || responseType === 'json') {
                        xhr.responseText = window._zipdata.get(xhr.url)
                    } else {
                        xhr.response = window._zipdata.get(xhr.url)
                    }
                    xhr.readState = xhr.DONE
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
            readState: {
                setter: true,
                getter: function(value, xhr) {
                    return xhr._readState || value
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