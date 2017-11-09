import originJSONP from 'jsonp'

export default function jsonp(url, data) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    originJSONP(url, null, (err, data) => {
        if (!err) {
            return data
        } else {
            return err;
        }
    })
}

function param(data) {
    let url = '';
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(data[k])}`
    }

    return url ? url.substring(1) : ''
}