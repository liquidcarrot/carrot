## Functions

<dl>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a JSON representation of the network</p>
</dd>
<dt><a href="#toGraph">toGraph(element, [options])</a></dt>
<dd><p><strong>BROWSER ONLY</strong></p>
<p>Creates a graph of the network using <a href="https://www.npmjs.com/package/vis-network"><code>vis-network</code></a> on the given DOMElement
or DOMElement ID.</p>
</dd>
</dl>

<a name="toJSON"></a>

## toJSON() ⇒ <code>Object</code>
Returns a JSON representation of the network

**Kind**: global function  
<a name="toGraph"></a>

## toGraph(element, [options])
**BROWSER ONLY**

Creates a graph of the network using [`vis-network`](https://www.npmjs.com/package/vis-network) on the given DOMElement
or DOMElement ID.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>string</code> \| <code>DOMElement</code> | DOMElement, or ID, where graph will ported into |
| [options] | <code>Object</code> | `vis-network` options - [learn more](https://visjs.github.io/vis-network/docs/network/#options) |

