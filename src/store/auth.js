import config from "../api/config"

export function ULWF(obj){
    (async function(){
        await fetch(config.baseUrl + '/login', {method: 'POST', body: JSON.stringify(obj)}).then(result => result.json()).then(result => console.log(result))
    })()
}