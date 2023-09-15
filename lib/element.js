const elementProxy = function() {
    if (window._elementProxy) return
    Element.prototype.setAttribute = (function(fn) {
        return function() {
            if (arguments[0] === 'src') {
                const url = arguments[1]
                console.log('setAttribute', arguments[1])
                if (window._zipdata && window._zipdata.find(url)) {
                    const buf = window._zipdata.get(url)
                    const newSrc = URL.createObjectURL(new Blob([buf]))
                    arguments[1] = newSrc
                    const oldFn = this.onload || function() {}
                    this.onload = function() {
                        URL.revokeObjectURL(newSrc)
                        console.log('revokeObjectURL')
                        oldFn()
                    }
                }
            }
            return fn.apply(this, arguments)
        }

    })(Element.prototype.setAttribute)
    window._elementProxy = true
}

export default elementProxy