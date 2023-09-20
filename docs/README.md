常用monorepo pnpm命令

-w，--workspace-root

在根目录执行命令，比如在根目录安装依赖，那么这个依赖可以在所有的packages中使用

-F <package_name>，--filter <package_name>

在过滤的指定包运行命令，我们可以通过下面的命令在指定的package安装依赖，这个依赖只可以该package中使用

取消某个依赖的安装
```
pnpm remove axios

pnpm remove axios --filter  @monorepo/demo

```

** 安装项目内互相依赖

在任意目录将 @mono/components安装到@mono/demo里面

pnpm add @mono/components@* --filter @mono/demo

或在当前项目安装@mono/components依赖项

pnpm add @mono/components@*
```
"dependencies": {
    "@mono/components": "workspace:*",
    "vue": "^3.3.4"
},
```
monorepo 往往是一个整体的项目，所以我们需要同时执行多个指令，在 pnpm 中，可以通过-C进行配置：这条命令的含义就是同时运行服务端和前端代码。
```
"scripts": {
    "start": "pnpm -C ./packages/server start:server & pnpm -C ./packages/web dev",
  }
```
如果经过了 git 合码后，项目的依赖变化比较大，可以配置一条 clean 指令：
```
"scripts": {
    "clean": "rm -rf node_modules **/*/node_modules",
  }
```


需要被@mono引用的文件就需要配置package.json文件

结构1：
```
├── packages
|  ├── vue-demo1
|  ├── vue-demo2
|  └── vue-demo3
├── package.json
├── lerna.jspn
```


结构2：
```
├── packages
|  ├── pkg1
|  |   ├── package.json
|  ├── pkg2
|  |   ├── package.json
├── package.json
├── lerna.jspn
```
