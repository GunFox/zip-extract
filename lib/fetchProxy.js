const proxyFetch = function() {
    if (!window._proxyFetch) {
        const oldFetch = window.fetch
        window.fetch = function(request, options) {
            if (window._zipdata && window._zipdata.find(request.url)) {
                const buf = window._zipdata.get(request.url)
                const res = new Response(new Blob([buf]), {
                    status: 200,
                    statusText: 'ZIP Response 1',
                })
                return Promise.resolve(res)
            } 
            return oldFetch(request, options)
        }
        window.fetch.prototype._oldFetch = oldFetch
        window._proxyFetch = true
    }
}

export default proxyFetch