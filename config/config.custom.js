const paths = require('./paths');
const path = require('path');

module.exports = {
    //本地开发设置iconfont cdn 地址
    iconFontCDNUrl:'//at.alicdn.com/t/font_639300_3fp1riujcg5.css',
    //发布时iconfont位置
    proIconFontDirectory:path.join(paths.appSrc, 'public', '/other/iconfont'),
    //iconfont生成文件名
    iconfontFileName:'iconfont'
}

