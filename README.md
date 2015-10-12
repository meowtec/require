# require
A CommonJS module loader for the web.

CommonJS 模块化(Nodejs 使用的模块规范)加载器。

## example
Step 1: install dependencies
```
npm install
npm start
```

Step 2: open example at:  
http://127.0.0.1:8080/example/

[online demo](http://meowtec.github.io/demo/require/example/)

## Usage
```
<script src-entry="./path/to/main/file"></script>
```
or
```
requireLoad('./path/to/main/file')
```

## More
CommonJS modules are loaded using XMLHttpRequest, so pay attention to the case of cross origin.  
Please use webpack or gulp to pack your CommonJS modules.

CommonJS 模块加载器的实现使用了 Ajax，因此对于部署在其他服务器上的静态资源，可能加载不了。  
开发这个项目的目的主要是学习和娱乐，在生产环境，还得使用 webpack 之类的工具打包发布。
