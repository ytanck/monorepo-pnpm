常用monorepo pnpm命令
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
