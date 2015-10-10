# require
A CommonJS module loader for the web.

## example
Step 1: install dependencies
```
npm install
npm start
```

Step 2: open example at:
http://127.0.0.1:8080/example/

## Usage
```
<script src-entry="./path/to/main/file"></script>
```
or
```
requireLoad('./path/to/main/file')
```

## More
CommonJS modules are loaded using XMLHttpRequest, so please pay attention to the case of cross origin.
