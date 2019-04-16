//高德api
export const AMapAsync=({plugin}={})=>{

    plugin = plugin && plugin instanceof Array ? plugin.join(','):'';

    return setCallBackLoadScript(`https://webapi.amap.com/maps?v=1.4.8&key=99d77e072f09ea55969ce6b5f1593609&plugin=${plugin}`,'AMap','AMapOnLoad')

};
//高德可视化api
export const LocaAsync=()=>loadScript('https://webapi.amap.com/loca?v=1.2.0&key=99d77e072f09ea55969ce6b5f1593609','Loca');

//百度地图下载脚本
export const BMapAsync=()=> setCallBackLoadScript('https://api.map.baidu.com/api?v=2.0&ak=19d4aa4182c4809347bbf96f0820dc69&s=1','BMap','baiduApiInit');
export const BDrawAsync=()=>loadScript('https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js','BMapLib');
export const HeatAsync=()=>loadScript('https://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js','Heatmap');

//按官方异步加载需要回调参数的脚本下载函数
function setCallBackLoadScript(
    //请求脚本url地址
    url,
    //脚本加载后的全局变量名
    className,
    //异步加载callBackName
    loadCallBackName
){

    return new Promise(function(resolve,reject){

        //如果已加载过该jsdk
        if(window[className]){
            return resolve(window[className])
        }

        url+=`&callback=${loadCallBackName}`;

        window[loadCallBackName] = function(){
            resolve(window[className]);
        }

        createScript(url);

    });
}


//加载一般脚本
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

        let script = createScript(url);

        script.onload = function(){
            resolve(window[className]);
        };
        script.onerror = function(e){
            reject(e);
        }

    });

}

//创建script标签
function createScript(url){

    let script = document.createElement('script');

    script.charset = 'utf-8';
    script.src = url;
    document.head.appendChild(script);

    return script

}

function parseObjectPath(stringPath){

    return stringPath.split('.').reduce(function(prev,currentString){

        prev[currentString]={};

        return prev[currentString]

    },window);

}




