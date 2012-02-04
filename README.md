Route based initialization for JavaScript

Example Usage:

```javascript
Routr
.bind("/", function() {
		console.log("index");
})
.bind("/home", function() {
		console.log("home");
})
.bind("/home/news", function() {
		console.log("home news");
}, true)
.bind("/home/news/new", function() {
		console.log("home news new");
}, true)
.run();
```
