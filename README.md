# Smoke.js
Smoke.js is a JavaScript API for the Smoke blockchain

# Documentation

- [Install](https://github.com/smokenetwork/smoke-js/tree/master/doc#install)
- [Browser](https://github.com/smokenetwork/smoke-js/tree/master/doc#browser)
- [Config](https://github.com/smokenetwork/smoke-js/tree/master/doc#config)
- [Database API](https://github.com/smokenetwork/smoke-js/tree/master/doc#api)
    - [Subscriptions](https://github.com/smokenetwork/smoke-js/tree/master/doc#subscriptions)
    - [Tags](https://github.com/smokenetwork/smoke-js/tree/master/doc#tags)
    - [Blocks and transactions](https://github.com/smokenetwork/smoke-js/tree/master/doc#blocks-and-transactions)
    - [Globals](https://github.com/smokenetwork/smoke-js/tree/master/doc#globals)
    - [Keys](https://github.com/smokenetwork/smoke-js/tree/master/doc#keys)
    - [Accounts](https://github.com/smokenetwork/smoke-js/tree/master/doc#accounts)
    - [Authority / validation](https://github.com/smokenetwork/smoke-js/tree/master/doc#authority--validation)
    - [Votes](https://github.com/smokenetwork/smoke-js/tree/master/doc#votes)
    - [Content](https://github.com/smokenetwork/smoke-js/tree/master/doc#content)
    - [Witnesses](https://github.com/smokenetwork/smoke-js/tree/master/doc#witnesses)
- [Login API](https://github.com/smokenetwork/smoke-js/tree/master/doc#login)
- [Follow API](https://github.com/smokenetwork/smoke-js/tree/master/doc#follow-api)
- [Broadcast API](https://github.com/smokenetwork/smoke-js/tree/master/doc#broadcast-api)
- [Broadcast](https://github.com/smokenetwork/smoke-js/tree/master/doc#broadcast)
- [Auth](https://github.com/smokenetwork/smoke-js/tree/master/doc#auth)


Here is full documentation:
https://github.com/smokenetwork/smoke-js/tree/master/doc

## Browser
```html
<script src="./smoke.min.js"></script>
<script>
smoke.api.getAccounts(['TECNOSGIRL', 'JACKDUB'], function(err, response){
    console.log(err, response);
});
</script>
```

## Webpack
[Please have a look at the webpack usage example](https://github.com/smokenetwork/smoke-js/blob/master/examples/webpack-example).

## Server
## Install
```
$ npm install @smokenetwork/smoke-js --save
```

## WebSockets
`wss://rpc.smoke.io`

## Examples
### Broadcast Vote
```js
var smoke = require('@smokenetwork/smoke-js');

var wif = smoke.auth.toWif(username, password, 'posting');
smoke.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
smoke.api.getAccounts(['TECNOSGIRL', 'JACKDUB'], function(err, result) {
	console.log(err, result);
});
```

### Get State
```js
smoke.api.getState('/trends/funny', function(err, result) {
	console.log(err, result);
});
```

### Reputation Formatter
```js
var reputation = smoke.formatter.reputation(user.reputation);
console.log(reputation);
```

## Contributions
Patches are welcome! Please run the tests before opening a pull request and make sure that you are passing all of them.

## Issues
When you find issues, please report them!

## License
MIT
