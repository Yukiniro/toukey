# Toukey

![npm](https://img.shields.io/npm/v/toukey)
![GitHub](https://img.shields.io/github/license/yukiniro/toukey)
![npm bundle size](https://img.shields.io/bundlephobia/min/toukey)

`Toukey` is a simple and efficient keyboard events library. That's [toukey's](https://toukey.vercel.app/) doc site.

## Install

```shell
npm i toukey --save
```

or

```shell
pnpm add toukey --save
```

## Use

### Browser

You could download and link **toukey.js** in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/browse/toukey/dist/) | [jsDelivr](https://www.jsdelivr.com/package/npm/toukey)

```javascript
<script src="https://unpkg.com/toukey/dist/toukey.umd.min.js"></script>
<script>
  toukey.subscribe('space', function() {
    console.log('space');
  });
</script>
```

### React

It is easy to use with react.

```javascript
import { useEffect } from "react";
import { subscribe } from "toukey";

function App() {
  useEffect(() => {
    return subscribe("scope", () => {
      console.log("scope");
    });
  });

  return <div>hello world</div>;
}
```

And here is a library named [react-toukey-hook](https://github.com/Yukiniro/react-toukey-hook) which build with toukey for react hook.

### Basic Use

```javascript
import * as Toukey from "toukey";

const handler = () => console.log("handler");

// subscribe
Toukey.on("scope", handler);

// unsubscribe
Toukey.off("scope", handler);
```

```javascript
import { subscribe } from "toukey";

const unsubsribe = subscribe("scope", () => {
  console.log("scope");
});
```
