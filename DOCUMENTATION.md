<a name="Connection"></a>

## Connection
**Kind**: global class  
**Emits**: <code>event:created</code>  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>string</code> \| <code>number</code> | 
| from | <code>string</code> \| <code>number</code> | 
| to | <code>string</code> \| <code>number</code> | 

<a name="new_Connection_new"></a>

### new $gkQH$export$Connection([options])
Creates a connection object

**Returns**: [<code>Connection</code>](#Connection) - Returns `Connection`  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options |
| [options.id] | <code>function</code> \| <code>string</code> \| <code>number</code> |  |
| [options.from] | <code>string</code> \| <code>number</code> |  |
| [options.to] | <code>string</code> \| <code>number</code> |  |

**Example**  
```js
let connection = new Connection();
```
**Example**  
```js
let connection = new Connection({
 from: 0,
 to: 1
});
```
