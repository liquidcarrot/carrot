# `nodemon` Configurations

### `src`

```javascript
{
  "watch": ["src"], // only watch for changes in `src/` directory
  "ext": "ts js", // only watch for changes to `.ts` (i.e. TypeScript) & `.js` (i.e. JavaScript) files
  "verbose": true, // detailed stack tracing
  "delay": 1000, // 1 second debounce delay
  "exec": "ts-node -T", // use typescript
  "events": {
    "start": "echo starting"
  }
}
```
