# Documentation

- [Install](#install)
- [Browser](#browser)
- [Config](#config)
- [JSON-RPC](#jsonrpc)
- [Database API](#api)
    - [Subscriptions](#subscriptions)
    - [Tags](#tags)
    - [Blocks and transactions](#blocks-and-transactions)
    - [Globals](#globals)
    - [Keys](#keys)
    - [Accounts](#accounts)
    - [Market](#market)
    - [Authority / validation](#authority--validation)
    - [Votes](#votes)
    - [Content](#content)
    - [Witnesses](#witnesses)
- [Login API](#login)
- [Follow API](#follow-api)
- [Broadcast API](#broadcast-api)
- [Broadcast](#broadcast)
- [Auth](#auth)
- [Formatter](#formatter)

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Install
```
$ npm install smoke --save
```

# Browser
```html
<script src="./smoke.min.js"></script>
<script>
smoke.api.getAccounts(['indica'], function(err, response){
    console.log(err, response);
});
</script>
```

## Config

### set
```js
smoke.config.set('address_prefix','SMK');
```

### get
```js
smoke.config.get('chain_id');
```

## JSON-RPC
Here is how to activate JSON-RPC transport:
```js
smoke.api.setOptions({ url: 'https://rpc.smoke.io' });
```

 - - - - - - - - - - - - - - - - - -
# API
- - - - - - - - - - - - - - - - - -
## Subscriptions
- - - - - - - - - - - - - - - - - -
### Set Subscribe Callback
```js
smoke.api.setSubscribeCallback(callback, clearFilter, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Pending Transaction Callback
```js
smoke.api.setPendingTransactionCallback(cb, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Block Applied Callback
```js
smoke.api.setBlockAppliedCallback(cb, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Cancel All Subscriptions
```js
smoke.api.cancelAllSubscriptions(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Tags
- - - - - - - - - - - - - - - - - -
### Get Trending Tags
Returns a list of the currently trending tags in descending order by value.
```js
smoke.api.getTrendingTags(afterTag, limit, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|afterTag|The name of the last tag to begin from|String|Use the empty string `''` to start the list. Subsequent calls can use the last tag name|
|limit|The maximum number of tags to return|Integer||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
smoke.api.getTrendingTags('', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { name: '', total_payouts: '37610793.383 SMOKE', net_votes: 4211122, top_posts: 411832, comments: 1344461, trending: '5549490701' },
  { name: 'life', total_payouts: '8722947.658 SMOKE', net_votes: 1498401, top_posts: 127103, comments: 54049, trending: '570954588' } ]
```

Using the Result:
```js
// Extract tags from the result into an array of tag name strings
var f = result.map(function(item) { return item.name; });
console.log(f);

// Get the last tag for subsequent calls to `getTrendingTags`
//   or use: f[f.length - 1]   if you used the extraction code above.
var lastKnownTag = result[result.length - 1].name;

// Use the last known tag to get the next group of tags
smoke.api.TrendingTags(lastKnownTag, 2, function(err, result) {
  console.log(err, result);
});
```

See also: [getTrendingCategories](#get-trending-categories)
- - - - - - - - - - - - - - - - - -
### Get Discussions By Created
```js
smoke.api.getDiscussionsByCreated(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Active
```js
smoke.api.getDiscussionsByActive(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Cashout
```js
smoke.api.getDiscussionsByCashout(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Payout
```js
smoke.api.getDiscussionsByPayout(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Votes
```js
smoke.api.getDiscussionsByVotes(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Children
```js
smoke.api.getDiscussionsByChildren(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Hot
```js
smoke.api.getDiscussionsByHot(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Feed
```js
smoke.api.getDiscussionsByFeed(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Blog
```js
smoke.api.getDiscussionsByBlog(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Comments
```js
smoke.api.getDiscussionsByComments(query, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Comment Discussions By Payout
Gets the recent comments (not posts) ordered by their pending payout.

```js
smoke.api.getCommentDiscussionsByPayout(query, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|query|object|an object containing different options for querying, like 'limit' and 'tag'|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var query = { limit : 3, tag : "smoke" };
smoke.api.getCommentDiscussionsByPayout(query, function(err, data) {
	console.log(err, data);
});

// NOTE! The default limit is 0. Not setting a limit will get you an empty result.
```

Return Example:
```js
// the result is an array of big objects representing the comments

 [ { /* ommited for simplicity */ },
   { /* ommited for simplicity */ },
   { /* ommited for simplicity */ } ]
```
- - - - - - - - - - - - - - - - - -
### Get Post Discussions By Payout
Gets the recent posts ordered by their pending payout.

```js
smoke.api.getPostDiscussionsByPayout(query, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|query|object|an object containing different options for querying, like 'limit' and 'tag'|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var query = { limit : 3, tag : "collorchallenge" };
smoke.api.getPostDiscussionsByPayout(query, function(err, data) {
	console.log(err, data);
});

// NOTE! The default limit is 0. Not setting a limit will get you an empty result.
```

Return Example:
```js
// the result is an array of big objects representing the comments

 [ { /* ommited for simplicity */ },
   { /* ommited for simplicity */ },
   { /* ommited for simplicity */ } ]
```
- - - - - - - - - - - - - - - - - -
## Blocks and transactions
- - - - - - - - - - - - - - - - - -
### Get Block Header
```js
smoke.api.getBlockHeader(blockNum, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Block
```js
smoke.api.getBlock(blockNum, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Ops In Block
Gets all operations in a given block

```js
smoke.api.getOpsInBlock(blockNum, onlyVirtual, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|blockNum|number|A positive number|
|onlyVirtual|bool|'false' to get all operations. 'true' to only get virtual operations|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getOpsInBlock(10000001, false, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { trx_id: '4b688c13940fd5b4bb11356286ef12061f71976c',
    block: 10000001,
    trx_in_block: 0,
    op_in_trx: 0,
    virtual_op: 0,
    timestamp: '2017-03-08T17:34:24',
    op: [ 'vote', [Object] ] },
  { trx_id: 'a450debc8332c3b27935b3307891dfc509669edc',
    block: 10000001,
    trx_in_block: 2,
    op_in_trx: 0,
    virtual_op: 0,
    timestamp: '2017-03-08T17:34:24',
    op: [ 'vote', [Object] ] } ]

```
- - - - - - - - - - - - - - - - - -
### Get State
Gets a lot of information about the state of `path`

```js
smoke.api.getStateWith(path, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|path|string| like "/@username". This is the extension from the Smoke URL. It can be used on users, posts, comments, comments-by-user, replies-to-user and so on|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getState("/@username", function(err, data) {
	console.log(err, data);
});

// Here are some valid calls:

smoke.api.getState("/@username", function(err, data) { console.log(data); });

smoke.api.getState("/@username/permlink-of-post", function(err, data) { console.log(data); });

smoke.api.getState("/@username/comments", function(err, data) { console.log(data); });

smoke.api.getState("/@username/recent-replies", function(err, data) { console.log(data); });

smoke.api.getState("/trending", function(err, data) { console.log(data); });

smoke.api.getState("/trending/collorchallenge", function(err, data) { console.log(data); });

// and others....
```

Return Example:
```js
// The result is huge, and can have many variations depending on what you are getting the state of. It can't be documented briefly. Here is some basic information:
{	accounts: {username: {...}}
	content: {
		username/permlink1: {...},
		username/permlink2: {...},
		username/permlink3: {...} …}
	current_route:"/@username"
	discussion_idx: {...}
	error:""
	pow_queue: []
	props: {...}
	tag_idx: { trending: [...] }
	tags:{...}
	witness_schedule: {...}
	witnesses: {...}	}
```
- - - - - - - - - - - - - - - - - -
### Get State With Options

```js
smoke.api.getStateWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { path : "/@username"} where the path is an extension from a Smoke URL. It can be used on users, posts, comments, comments-by-user, replies-to-user and so on|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getStateWith({ path : "/@username" }, function(err, data) {
	console.log(err, data);
});
```
See `smoke.api.getState` for more examples...
- - - - - - - - - - - - - - - - - -
### Get Trending Categories
```js
smoke.api.getTrendingCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Best Categories
```js
smoke.api.getBestCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Active Categories
```js
smoke.api.getActiveCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Recent Categories
```js
smoke.api.getRecentCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Globals
- - - - - - - - - - - - - - - - - -
### Get Config
```js
smoke.api.getConfig(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Dynamic Global Properties
```js
smoke.api.getDynamicGlobalProperties(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Chain Properties
```js
smoke.api.getChainProperties(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Feed Entries
Gets the posts in the feed of a user.
The feed displays posts of followed users, as well as what they resmokeed.

```js
smoke.api.getFeedEntries(account, entryId, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a smoke username|
|entryId|number|the post id from which to start counting. Write '0' to start from newest post|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getFeedEntries("username", 0, 2, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { author: 'otherusername',
    permlink: 'permlink',
    reblog_by: [ 'resmokebot' ], 	//full when post is in feed because it's resmokeed
    reblog_on: '2018-02-11T18:42:54',
    entry_id: 10260 },
  { author: 'otherusername',
    permlink: 'permlink',
    reblog_by: [  ], 				// false when post is in feed because user follows it's author
    reblog_on: '2018-02-11T18:39:24',
    entry_id: 10259 } ]
```
- - - - - - - - - - - - - - - - - -
### Get Feed History
```js
smoke.api.getFeedHistory(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Version
Gets the version of the Smoke blockchain you are connected to.

```js
smoke.api.getVersion(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getVersion(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ blockchain_version: '0.19.2',
  smoke_revision: '07be64314ce9d277eb7da921b459c993c2e2412c',
  fc_revision: '8dd1fd1ec0906509eb722fa7c8d280d59bcca23d' }
```
- - - - - - - - - - - - - - - - - -
### Get Hardfork Version
Gets the current hardfork version of the SMOKE blockchain.
```js
smoke.api.getHardforkVersion(function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
'0.19.0'
```
This returns a string and not JSON.

See also: [getNextScheduledHardfork](#get-next-scheduled-hardfork), [getConfig](#get-config)

- - - - - - - - - - - - - - - - - -
### Get Next Scheduled Hardfork
```js
smoke.api.getNextScheduledHardfork(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Keys
- - - - - - - - - - - - - - - - - -
### Get Key References
```js
smoke.api.getKeyReferences(key, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Accounts
- - - - - - - - - - - - - - - - - -
### Get Accounts
```js
smoke.api.getAccounts(names, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account References
```js
smoke.api.getAccountReferences(accountId, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Lookup Account Names
```js
smoke.api.lookupAccountNames(accountNames, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Lookup Accounts
```js
smoke.api.lookupAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account Count
```js
smoke.api.getAccountCount(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account History
```js
smoke.api.getAccountHistory(account, from, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Owner History
```js
smoke.api.getOwnerHistory(account, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Recovery Request
```js
smoke.api.getRecoveryRequest(account, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account Bandwidth
Get the bandwidth of the `account`.
The bandwidth is the limit of data that can be uploaded to the blockchain.
To have bigger bandwidth - power up your smoke.

```js
smoke.api.getAccountBandwidth(account, bandwidthType, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a smoke username|
|bandwidthType|number|This is a value from an enumeration of predefined values. '1' is for the "Forum" bandwidth|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
const forumBandwidthType = 1;

smoke.api.getAccountBandwidth("username", forumBandwidthType, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ id: 23638,
  account: 'username',
  type: 'forum',
  average_bandwidth: 260815714,
  lifetime_bandwidth: '125742000000',
  last_bandwidth_update: '2018-02-07T22:30:42' }
```
- - - - - - - - - - - - - - - - - -
### Get Account Bandwidth With Options
Get the bandwidth of the user specified in the options.

```js
smoke.api.getAccountBandwidthWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { account: "username", bandwidthType: 1 } where bandwidthType is the value of an enumeration. 1 is "forum" and 2 is "market". They represent the bandwidths for posting and trading respectively|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var options = {
	account: "username",
	bandwidthType: 2
}
smoke.api.getAccountBandwidthWith(options, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ id: 23675,
  account: 'username',
  type: 'market',
  average_bandwidth: 2608157142,
  lifetime_bandwidth: '94940000000',
  last_bandwidth_update: '2018-02-07T22:30:42' }
```
- - - - - - - - - - - - - - - - - -
### Get Account Reputations
Gets the reputation points of `limit` accounts with names most similar to `lowerBoundName`.

```js
smoke.api.getAccountReputations(lowerBoundName, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|lowerBoundName|string|a smoke username query|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getAccountReputations("username", 2, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ { account: 'username', reputation: '26727073581' },
   { account: 'username-taken', reputation: 0 } ]
```
- - - - - - - - - - - - - - - - - -
## Authority / validation
- - - - - - - - - - - - - - - - - -
### Get Transaction Hex
```js
smoke.api.getTransactionHex(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Transaction
```js
smoke.api.getTransaction(trxId, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Required Signatures
```js
smoke.api.getRequiredSignatures(trx, availableKeys, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Potential Signatures
```js
smoke.api.getPotentialSignatures(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Verify Authority
```js
smoke.api.verifyAuthority(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Verify Account Authority
```js
smoke.api.verifyAccountAuthority(nameOrId, signers, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Tags Used By Author
Gets tags used by a smoke user. Most users have no tags yet, but some do.

```js
smoke.api.getTagsUsedByAuthor(author, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|author|string|a smoke username|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getTagsUsedByAuthor("good-karma", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ [ 'challenge', 0 ] ]
```
- - - - - - - - - - - - - - - - - -
## Votes
- - - - - - - - - - - - - - - - - -
### Get Active Votes
```js
smoke.api.getActiveVotes(author, permlink, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Account Votes
```js
smoke.api.getAccountVotes(voter, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Content
- - - - - - - - - - - - - - - - - -
### Get Content
```js
smoke.api.getContent(author, permlink, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Content Replies
```js
smoke.api.getContentReplies(author, permlink, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Discussions By Author Before Date
```js
smoke.api.getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Reblogged By
Gives a list of the users that reblogged (resmokeed) a given post

```js
smoke.api.getRebloggedBy(author, permlink, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|author|string|a smoke username|
|permlink|string|a permalink of comment or post|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getRebloggedBy("author", "example-permlink", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ 'author',
  'user1',
  'user2',
  'user3',
  'user4' ]
```
- - - - - - - - - - - - - - - - - -
### Get Replies By Last Update
```js
smoke.api.getRepliesByLastUpdate(startAuthor, startPermlink, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Witnesses
- - - - - - - - - - - - - - - - - -
### Get Witnesses
```js
smoke.api.getWitnesses(witnessIds, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Witness By Account
Returns information about a witness with the given `accountName`.
```js
smoke.api.getWitnessByAccount(accountName, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|accountName|The account name of the witness to query|String||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|

See also:
- - - - - - - - - - - - - - - - - -
### Get Witnesses By Vote
```js
smoke.api.getWitnessesByVote(from, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Lookup Witness Accounts
```js
smoke.api.lookupWitnessAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Witness Count
```js
smoke.api.getWitnessCount(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Active Witnesses
```js
smoke.api.getActiveWitnesses(function(err, result) {
  console.log(err, result);
});

```
- - - - - - - - - - - - - - - - - -
### Get Witness Schedule
Gets some general information about the witnesses.

```js
smoke.api.getWitnessSchedule(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getWitnessSchedule(function(err, data) {
  console.log(err,data);
}
```

Return Example:
```js
{ id: 0,
  current_virtual_time: '292589412128104496649868821',
  next_shuffle_block_num: 19756485,
  current_shuffled_witnesses: '31797..................00000000',
  num_scheduled_witnesses: 21,
  top19_weight: 1,
  timeshare_weight: 5,
  miner_weight: 1,
  witness_pay_normalization_factor: 25,
  median_props:
   { account_creation_fee: '0.100 SMOKE',
     maximum_block_size: 65536},
  majority_version: '0.19.2',
  max_voted_witnesses: 20,
  max_miner_witnesses: 0,
  max_runner_witnesses: 1,
  hardfork_required_witnesses: 17 }
```
- - - - - - - - - - - - - - - - - -
### Get Miner Queue
```js
smoke.api.getMinerQueue(function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Login API
- - - - - - - - - - - - - - - - - -
### Login

/!\ It's **not safe** to use this method with your username and password. This method always return `true` and is only used internally with empty values to enable broadcast.

```js
smoke.api.login('', '', function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Api By Name
```js
smoke.api.getApiByName(apiName, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
## Follow API
The follower API queries information about follow relationships between accounts. The API is read-only and does not create changes on the blockchain.

- - - - - - - - - - - - - - - - - -
### Get Followers
Returns an alphabetical ordered array of the accounts that are following a particular account.

```js
smoke.api.getFollowers(following, startFollower, followType, limit, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|following|The followers of which account|String|No leading @ symbol|
|startFollower|Start the list from which follower?|String|No leading @symbol. Use the empty string `''` to start the list. Subsequent calls can use the name of the last follower|
|followType|??|??|Set to 0 or 'blog' - either works|
|limit|The maximum number of followers to return|Integer||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
smoke.api.getFollowers('ned', '', 'blog', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { follower: 'a-0-0', following: 'ned', what: [ 'blog' ] },
  { follower: 'a-0-0-0-1abokina', following: 'ned', what: [ 'blog' ] } ]
```

Using the Result:
```js
// Extract followers from the result into an array of account name strings
var f = result.map(function(item) { return item.follower; });
console.log(f);

// Get the last follower for subsequent calls to getFollowers
//   or use: f[f.length - 1]   if you used the extraction code above.
var lastKnownFollower = result[result.length - 1].follower;

// Use the last known follower to get the next group of followers
smoke.api.getFollowers('ned', lastKnownFollower, 'blog', 2, function(err, result) {
  console.log(err, result);
});
```

See also: [getFollowing](#get-following), [getFollowCount](#get-follow-count)


- - - - - - - - - - - - - - - - - -
### Get Following
Returns an alphabetical ordered Array of the accounts that are followed by a particular account.
```js
smoke.api.getFollowing(follower, startFollowing, followType, limit, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|follower|The account to get the following for|String|No leading @ symbol|
|startFollowing|Start the list at which followed account?|String|No leading @symbol. Use the empty string `''` to start the list|
|followType|??|??|Set to 0 or 'blog' - either works|
|limit|The maximum number of items to return|Integer||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
smoke.api.getFollowing('dan', '', 'blog', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { follower: 'dan', following: 'dantheman', what: [ 'blog' ] },
  { follower: 'dan', following: 'krnel', what: [ 'blog' ] } ]
```

Using the Result:
```js
// Extract followed accounts from the result into an array of account name strings
var f = result.map(function(item) { return item.following; });
```
See the usage examples for [getFollowers](#get-followers) because the behaviour is very similar.


See also: [getFollowers](#get-followers), [getFollowCount](#get-follow-count)


- - - - - - - - - - - - - - - - - -
### Get Follow Count
```js
smoke.api.getFollowCount(account, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|account|The name for get the follow ccount for|String|No leading @ symbol|
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
smoke.api.getFollowCount('ned', function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
{ account: 'ned', follower_count: 16790, following_count: 913 }
```


See also: [getFollowers](#get-followers), [getFollowing](#get-following)


- - - - - - - - - - - - - - - - - -
## Broadcast API
- - - - - - - - - - - - - - - - - -
### Broadcast Block With Options
Broadcast a new block on the smoke blockchain.

```js
smoke.api.broadcastBlockWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { b: blockObject } where blockObject contains the information on the block you are trying to broadcast|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var options = {
    b: {
        previous:"0000000000000000000000000000000000000000",
        timestamp:"1970-01-01T00:00:00",
        witness:"",
        transaction_merkle_root:"0000000000000000000000000000000000000000",
        extensions:[],
        witness_signature:
            "00000000000000000000000000000000000000000000000000000000000000000"+
            "00000000000000000000000000000000000000000000000000000000000000000",
        transactions: []
    }
};

smoke.api.broadcastBlockWith(options, function(err, data) {
	console.log(err, data);
});
```
- - - - - - - - - - - - - - - - - -
### Broadcast Transaction Synchronous
```js
smoke.api.broadcastTransactionSynchronous(trx, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Broadcast Block
```js
smoke.api.broadcastBlock(b, function(err, result) {
  console.log(err, result);
});
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Broadcast
The `smoke.broadcast` methods cause permanent changes on the blockchain.
- - - - - - - - - - - - - - - - - -
### Account Create
```js
smoke.broadcast.accountCreate(wif, fee, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Account Update
```js
smoke.broadcast.accountUpdate(wif, account, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Account Witness Vote
```js
smoke.broadcast.accountWitnessVote(wif, account, witness, approve, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Challenge Authority
```js
smoke.broadcast.challengeAuthority(wif, challenger, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Change Recovery Account
```js
smoke.broadcast.changeRecoveryAccount(wif, accountToRecover, newRecoveryAccount, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Comment
```js
smoke.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Comment Options
```js
smoke.broadcast.commentOptions(wif, author, permlink, maxAcceptedPayout, percentSmokeDollars, allowVotes, allowCurationRewards, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Comment Payout
```js
smoke.broadcast.commentPayout(wif, author, permlink, payout, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Comment Reward
```js
smoke.broadcast.commentReward(wif, author, permlink, sbdPayout, vestingPayout, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Convert
```js
smoke.broadcast.convert(wif, owner, requestid, amount, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Curate Reward
```js
smoke.broadcast.curateReward(wif, curator, reward, commentAuthor, commentPermlink, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Custom
```js
smoke.broadcast.custom(wif, requiredAuths, id, data, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Custom Binary
```js
smoke.broadcast.customBinary(wif, id, data, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Custom Json
```js
smoke.broadcast.customJson(wif, requiredAuths, requiredPostingAuths, id, json, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Delete Comment
```js
smoke.broadcast.deleteComment(wif, author, permlink, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Escrow Dispute
```js
smoke.broadcast.escrowDispute(wif, from, to, agent, who, escrowId, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Escrow Release
```js
smoke.broadcast.escrowRelease(wif, from, to, agent, who, receiver, escrowId, sbdAmount, smokeAmount, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Escrow Transfer
```js
smoke.broadcast.escrowTransfer(wif, from, to, agent, escrowId, sbdAmount, smokeAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Escrow
```js
smoke.api.getEscrow(from, escrowId, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|from|string|a smoke username|
|escrowId|number|id of the specific escrow transfer|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getEscrow("username", 23456789, function(err, data) {
	console.log(err, data);
});
```
- - - - - - - - - - - - - - - - - -
### Fill Vesting Withdraw
```js
smoke.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Get Withdraw Routes
Gets withdraw routes (smoke power withdraws).

```js
smoke.api.getWithdrawRoutes(account, withdrawRouteType, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a smoke username|
|withdrawRouteType|number|a number representing a value from an enumeration. Must be 0, 1 or 2|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.api.getWithdrawRoutes("username", 1, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { from_account: 'username',
    to_account: 'receiver',
    percent: 10000,
    auto_vest: false } ]
```
- - - - - - - - - - - - - - - - - -
### Prove Authority
```js
smoke.broadcast.proveAuthority(wif, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Recover Account
```js
smoke.broadcast.recoverAccount(wif, accountToRecover, newOwnerAuthority, recentOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Reset Account
Changes the `current_reset_account` of the `account` to a new `reset_account`

```js
smoke.broadcast.setResetAccount(wif, account, current_reset_account, reset_account, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Use < smoke.auth.toWif(user, pass, type) >|
|account|string|a smoke username|
|current_reset_account|string|a smoke username|
|reset_account|string|a smoke username|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
smoke.broadcast.setResetAccount(wif, "username", "oldresetaccount", "newresetaccount", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 AssertException
	`false: Set Reset Account Operation is currently disabled.`
```
- - - - - - - - - - - - - - - - - -
### Request Account Recovery
```js
smoke.broadcast.requestAccountRecovery(wif, recoveryAccount, accountToRecover, newOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Escrow Approve
```js
smoke.broadcast.escrowApprove(wif, from, to, agent, who, escrowId, approve, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Set Withdraw Vesting Route
```js
smoke.broadcast.setWithdrawVestingRoute(wif, fromAccount, toAccount, percent, autoVest, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Transfer
Transfers assets, such as SMOKE or SMOKE, from one account to another.
```js
smoke.broadcast.transfer(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take asset from|String|No leading @ symbol|
|to|Account name to place asset into|String|No leading @ symbol|
|amount|Amount of of asset to transfer|String|"X.XXX ASSET" must have 3 decimal places. e.g. "5.150 SMOKE"|
|function()|Your callback|function||

See also: [transferToVesting](#transfer-to-vesting)
- - - - - - - - - - - - - - - - - -
### Transfer To Vesting
Vests SMOKE into SMOKE POWER. This method supports powering up one account from another.
```js
smoke.broadcast.transferToVesting(wif, from, to, amount, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take SMOKE from|String|No leading @ symbol|
|to|Account name to vest SMOKE POWER into|String|No leading @ symbol. Can be the same account as `to`|
|amount|Amount of SMOKE to vest/power up|String|"X.XXX SMOKE" must have 3 decimal places. e.g. "25.100 SMOKE". Must be denominated in SMOKE|
|function()|Your callback|function||

See also: [transfer](#transfer)
- - - - - - - - - - - - - - - - - -
### Vote
```js
smoke.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Withdraw Vesting
```js
smoke.broadcast.withdrawVesting(wif, account, vestingShares, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Witness Update
```js
smoke.broadcast.witnessUpdate(wif, owner, url, blockSigningKey, props, fee, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Fill Vesting Withdraw
```js
smoke.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Comment Payout
```js
smoke.broadcast.commentPayout(wif, author, permlink, payout, function(err, result) {
  console.log(err, result);
});
```
- - - - - - - - - - - - - - - - - -
### Multisig
You can use multisignature to broadcast an operation.
```js
smoke.broadcast.send({
  extensions: [],
  operations: [
    ['vote', {
      voter: 'guest123',
      author: 'fabien',
      permlink: 'test',
      weight: 1000
    }]
  ]}, [privPostingWif1, privPostingWif2], (err, result) => {
  console.log(err, result);
});
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Auth
- - - - - - - - - - - - - - - - - -
### Verify
```js
smoke.auth.verify(name, password, auths);
```
- - - - - - - - - - - - - - - - - -
### Generate Keys
```js
smoke.auth.generateKeys(name, password, roles);
```
- - - - - - - - - - - - - - - - - -
### Get Private Keys
```js
smoke.auth.getPrivateKeys(name, password, roles);
```
- - - - - - - - - - - - - - - - - -
### Is Wif
```js
smoke.auth.isWif(privWif);
```
- - - - - - - - - - - - - - - - - -
### To Wif
```js
smoke.auth.toWif(name, password, role);
```
- - - - - - - - - - - - - - - - - -
### Wif Is Valid
```js
smoke.auth.wifIsValid(privWif, pubWif);
```
- - - - - - - - - - - - - - - - - -
### Wif To Public
```js
smoke.auth.wifToPublic(privWif);
```
- - - - - - - - - - - - - - - - - -
### Sign Transaction
```js
smoke.auth.signTransaction(trx, keys);
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Formatter
- - - - - - - - - - - - - - - - - -
### Amount
Formats number and currency to the valid way for sending (for example - it trims the number's floating point remainer to 3 digits only).

```js
smoke.formatter.amount(_amount, asset);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|_amount|number|A positive number|
|asset|string|The name of a smoke asset (smoke)|


Call Example:
```js
smoke.formatter.amount(53.442346, "SMOKE");
```

Return Example:
```js
 "53.442 SMOKE"
```
- - - - - - - - - - - - - - - - - -
### Vesting Smoke
Converts the vests of `account` into the number of Smoke they represent.

```js
smoke.formatter.vestingSmoke(account, gprops, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|object|a smoke user object|
|groups|object|the properties object of the state of "/@username"|


Call Example:
```js
smoke.api.getAccounts(["username"], function(e1, accounts) {
  smoke.api.getState("/@username", function (e2, state) {        
	  var vestingSmoke = smoke.formatter.vestingSmoke(accounts[0], state.props);
  });
});
```

Return Example:
```js
 7.42431235
```
- - - - - - - - - - - - - - - - - -
### Number With Commas
Formats a big number, by adding a comma on every 3 digits.
Attention - only works on strings. No numbers can be passed directly.

```js
smoke.formatter.numberWithCommas(x);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|x|string|Number to format as string|


Call Example:
```js
smoke.formatter.numberWithCommas(53304432342.432.toString());
// or
smoke.formatter.numberWithCommas("53304432342.432");
```

Return Example:
```js
 "53,304,432,342.432"
```
- - - - - - - - - - - - - - - - - -
### Comment Permlink
```js
var parentAuthor = 'ned';
var parentPermlink = 'a-selfie';
var commentPermlink = smoke.formatter.commentPermlink(parentAuthor, parentPermlink);
console.log(commentPermlink);
// => 're-ned-a-selfie-20170621t080403765z'
```
- - - - - - - - - - - - - - - - - -
### Reputation
```js
var reputation = smoke.formatter.reputation(3512485230915);
console.log(reputation);
// => 56
```
- - - - - - - - - - - - - - - - - -
### Vest To Smoke
```js
var smokePower = smoke.formatter.vestToSmoke(vestingShares, totalVestingShares, totalVestingFundSmoke);
console.log(smokePower);
```

- - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - -
# Utils
- - - - - - - - - - - - - - - - - -
### Validate Username
```js
var isValidUsername = smoke.utils.validateAccountName('test1234');
console.log(isValidUsername);
// => 'null'

var isValidUsername = smoke.utils.validateAccountName('a1');
console.log(isValidUsername);
// => 'Account name should be longer.'
```
- - - - - - - - - - - - - - - - - -
### Camel Case
Formats a string with '_' characters to follow the CamelCase notation instead.

```js
smoke.utils.camelCase(str);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|str|string|the string will be converted to camelCase like "exampleString"|


Call Example:
```js
smoke.utils.camelCase("example_string");
```

Return Example:
```js
"exampleString"
```
