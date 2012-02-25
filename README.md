### Routr - Route specific initialization for JavaScript

Routr is a lightweight JS library for route specific initialization functions. 

In a modern website with lots of routes, running all the JS initialization code irrespective of route is slow and inefficient. Whereas plenty of solutions are available for apps that rely on hashbangs (#) in their routes, not many are available for "traditional" routes. Hence Routr.

Please note that this is only client side routing and NOT server side!

You can see a demo [here](http://iambot.net/demo/routr/)

#### Installation

Include the JS in the head section of your html

```html
<script src="routr.js"></script>
```

#### Usage

1) Initialize your global path prefix if your application is not in the root directory. Ex: If your app runs at http://example.com/app/ then set the root to /app

```javascript
Routr.root("/app");
```

2) Add routes by calling the Routr.bind() method. This method takes 4 arguments:

<table>
	<tr>
		<th>Argument</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Route</td>
		<td>String/RegExp</td>
		<td>The route to bind to. Can be a string like "/home" or a RegExp object like /home/ (without the quotes)</td>
	</tr>
	<tr>
		<td>Callback</td>
		<td>Function</td>
		<td>The callback function for the route. Put all your initialization code in here</td>
	</tr>
	<tr>
		<td>Chaining</td>
		<td>Boolean</td>
		<td>If true, matches and executes all the parent routes as well. For example if chaining is set to true for the route "/group/home", then the route "/group" is run as well</td>
	</tr>
	<tr>
		<td>Parameters</td>
		<td>Array</td>
		<td>The parameter names as an array. If using RegExp in the route, then the matched parameters will be available in the callback method. Please look at the example for more details</td>
	</tr>
</table>

3. Add optional common before and after callback functions which are run for every route (if necessary)

```javascript
Routr
.before(function() {
	console.log("I will be run before the callback for every matched route");
})
.after(function() {
	console.log("And I will be run after the callback for every matched route");
});
```

4. Run the app by calling Routr.run();

#### Example

```javascript
Routr
	.bind("/", function() {
		console.log("index");
	})
	.bind("home", function() {
		console.log("home");
	})
	.bind("/group", function() {
		console.log("group");
	})
	.bind(/\/group\/(\w+)\/(\d+)/, function() {
		// The params defined will be available in this scope
		console.log("group "+this.group+", "+this.id);
	}, true, ['group','id'] );

	Routr.run();
```

