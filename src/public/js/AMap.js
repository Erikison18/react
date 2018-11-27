

export function AMapAsync(){

    return new Promise(function(resolve,reject){

        let url = 'https://webapi.amap.com/maps?v=1.4.8&key=99d77e072f09ea55969ce6b5f1593609&callback=onLoad';
        let jsapi = document.createElement('script');

        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);

        window.onLoad  = function(res){
            console.log(res);
            // resolve(AMap);
        }

        jsapi.onError  = function(e){
            reject(e);
        }

    });

}