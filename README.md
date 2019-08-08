
# Parrot-Factory #

Parrot-Factory，WebUnion 自制工厂，支持生成雪碧图等功能。

## 雪碧图的生成 ##

首先在"/public"目录下，以"sprite-编号"规则命名目录，将 PNG 图片放置其中，然后执行`npm run build`命令打包生成雪碧图资源即可，把雪碧图资源迁移到自己项目之后，就可以在页面中用"icon-图标名"的形式引用图标了。
