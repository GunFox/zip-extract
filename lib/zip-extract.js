import JSZip, { file } from "jszip";
import JSZipUtils from 'jszip-utils';
import ajaxProxy from './xhr'
import fetchProxy from './fetch'
import elementProxy from "./element";

(function(window) {
    if (!window._zipdata) {
        window._zipdata = {}
        window._zipdata.files = {}
        window._zipdata.find = function(url) {
            const path = url.split('?')?.[0]??'' 
            
            let isExist = false
            for(let name in this.files) {
                if (path.endsWith(name)) {
                    isExist = true
                    break;
                }
            }
            return isExist
        }
        window._zipdata.get = function(url, type) {
            const path = url.split('?')?.[0]??''
            let result = null
            for(let name in this.files) {
                if (path.endsWith(name)) {
                    result = this.files[name]
                    break
                }
            }
            return result
        }
    }
    if ('XMLHttpRequest' in window) ajaxProxy()
    if ('fetch' in window) fetchProxy()
    elementProxy()
})(window)

const loadZip = async function(url) {
    const reg = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/
    if (!url || !reg.test(url) || !url.endsWith('.zip')) {
        console.error('Invalid zip link')
        return Promise.reject('Invalid zip link')
    }
    try {
        const zip = await JSZipUtils.getBinaryContent(url).then(JSZip.loadAsync)
        for (let key in zip.files) {
            const file = zip.files[key]
            if (!file.dir) {
                const arraybuffer = await zip.file(file.name).async('arraybuffer')
                window._zipdata.files[file.name] = arraybuffer
            }
        }
        return Promise.resolve()
    } catch(e) {
        return Promise.reject(e)
    }
}

export default {
    loadZip
}