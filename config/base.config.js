const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CryptoJS = require('crypto-js');
const SpritesmithPlugin = require('webpack-spritesmith');
const spriteSourcePath = path.resolve(__dirname, './../sprites');
const spriteStorePath = path.resolve(__dirname, './../dist');
const spriteSource = fs.readdirSync(spriteSourcePath);
const spriteConfig = [];

spriteSource.forEach(function (item) {
    const itemPath = path.resolve(spriteSourcePath, './' + item);
    const isDir = fs.statSync(itemPath).isDirectory();
    const md5 = CryptoJS.MD5(item);

    md5.sigBytes = 4;

    const key = md5.toString();
    const image = path.resolve(spriteStorePath, './images/' + key + '.png');
    const css = path.resolve(spriteStorePath, './style/' + key + '.scss');

    if (isDir && (item.indexOf('sprite') >= 0)) {
        spriteConfig.push({
            // 目标小图标
            src: {
                cwd: itemPath,
                glob: '*.png',
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: image,
                css: css,
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: './../images/' + key + '.png',
            },
            spritesmithOptions: {
                algorithm: 'top-down',
            },
        });
    }
});

/**
 * 设置打包基本配置
 * @type {Object} webpack基本配置对象
 */
const webpackConfig = {
    mode: 'production',
    entry: {
        bundle: [
            path.resolve(__dirname, './../src/entry.js'),
        ],
    },
    plugins: [],
};

// 雪碧图插件
spriteConfig.forEach(function (item) {
    webpackConfig.plugins.push(new SpritesmithPlugin(item));
});

module.exports = webpackConfig;
