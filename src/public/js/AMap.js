

export function AMapAsync(){

    return new Promise(function(resolve,reject){

        let url = 'https://webapi.amap.com/maps?v=1.4.8&key=99d77e072f09ea55969ce6b5f1593609';
        let jsapi = document.createElement('script');

        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);

        jsapi.onload = function(){
            resolve(window.AMap);
        }
        jsapi.onerror  = function(e){
            reject(e);
        }

    });

}


export function LocaAsync(){

    return new Promise(function(resolve,reject){

        let url = 'https://webapi.amap.com/loca?v=1.2.0&key=99d77e072f09ea55969ce6b5f1593609';
        let jsapi = document.createElement('script');

        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);

        jsapi.onload = function(){
            resolve(window.Loca);
        }
        jsapi.onerror  = function(e){
            reject(e);
        }

    });

}