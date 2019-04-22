const path = require('path');
const homepage = require('./paths').servedPath;
module.exports = {
    //本地开发设置iconfont cdn 地址 注意每次ui修改iconfont后都会生成最新的cdn地址，记得及时替换。
    iconFontCDNUrl:'//at.alicdn.com/t/font_639300_3fp1riujcg5.css',
    //发布时iconfont位置
    proIconFontDirectory:path.join(homepage,'/iconfont'),
    //iconfont生成文件名
    iconfontFileName:'iconfont',
    //请求前缀
    fetchPrefix:''
}

/*
待新增功能：
1、分发es6版本前端资源
2、reduce index 自动生成
*/