const elementProxy = function() {
    if (window._elementProxy) return;
    Element.prototype.setAttribute = (function(fn) {
        return function() {
            if (arguments[0] === 'src') {
                const url = arguments[1]
                if (window._zipdata && window._zipdata.find(url)) {
                    const buf = window._zipdata.get(url)
                    const newSrc = URL.createObjectURL(new Blob([buf]))
                    arguments[1] = newSrc
                    const oldFn = this.onload || function() {}
                    this.onload = function() {
                        URL.revokeObjectURL(newSrc)
                        oldFn()
                    }
                }
            }
            return fn.apply(this, arguments)
        }

    })(Element.prototype.setAttribute);

    (function(elements) {
        elements.forEach(([element, attr]) => {
            const oSrc = Object.getOwnPropertyDescriptor(element.prototype, attr)
            oSrc.set = (function(fn) {
                return function(value, ...o) {
                    if (window._zipdata && window._zipdata.find(value)) {
                        const buf = window._zipdata.get(value)
                        const link = URL.createObjectURL(new Blob([buf]))
                        const oldFn = this.onload || function() {}
                        this.onload = function() {
                            URL.revokeObjectURL(link)
                            oldFn()
                        }
                        return fn.call(this, link, ...o)
                    }
                    return fn.call(this, value, ...o)
                }
            })(oSrc.set)
            Object.defineProperty(element.prototype, attr, oSrc)
        })
    })([
        [HTMLScriptElement, 'src'],
        [HTMLImageElement, 'src'],
        [HTMLLinkElement, 'href']
    ]);
    window._elementProxy = true;
}

export default elementProxy