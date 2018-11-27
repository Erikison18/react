//高德api
export const AMapAsync=()=>loadScript('https://webapi.amap.com/maps?v=1.4.8&key=99d77e072f09ea55969ce6b5f1593609','AMap');

//高德可视化api
export const LocaAsync=()=>loadScript('https://webapi.amap.com/loca?v=1.2.0&key=99d77e072f09ea55969ce6b5f1593609','Loca');

//加载脚本
function loadScript(
    //请求脚本url地址
    url,
    //脚本加载后的全局变量名
    className
){

    return new Promise(function(resolve,reject){

        //如果已加载过该jsdk
        if(window[className]){
            return resolve(window[className])
        }

        let script = document.createElement('script');

        script.charset = 'utf-8';
        script.src = url;
        document.head.appendChild(script);

        script.onload = function(){
            resolve(window[className]);
        };
        script.onerror = function(e){
            reject(e);
        }

    });

}