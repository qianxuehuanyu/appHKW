# 开发配置
1. 直接用weex-toolkit开发单页面比较方便，有引用内容时出错
2. 尝试用webpack-dev-server热重载，总是有问题。
3. 暂时使用webpack --watch开发。使用live-reload浏览器插件实现热重载。
4. weex页面宽度为750px，会根据设备宽度等比换算，浏览器选用手机模式时宽度错误，选择responsive，50%大小。

# 启动命令
1. 在当前目录启动两个shell，分别执行npm run dev和npm run serve，手动打开浏览器localhost:12580
2. sublime text执行live-reload命令，同时选中浏览器插件。

# 问题
1. index.html在项目根目录，本地图片开发时使用相对路径，打包时存在路径问题。
2. weex使用多页面性能比较好，首页导航栏跳转时存在导航栏刷新问题，后期看实际情况考虑首页四个页面是否合并成一个。