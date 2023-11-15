# Toukey

`Toukey` 是一个简单、高效的键盘事件库。这里是 [toukey](https://toukey.vercel.app/) 的文档网站 [toukey's]。

## 安装

```shell
npm i toukey
```

## 使用

### 浏览器

你可以在浏览器中通过 [UNPKG](https://unpkg.com/browse/toukey/dist/) | [jsDelivr](https://www.jsdelivr.com/package/npm/toukey) 这些 `cdn` 进行使用。

```javascript
<script src="https://unpkg.com/toukey/dist/toukey.umd.min.js"></script>
<script>
  toukey.subscribe('space', function() {
    console.log('space');
  });
</script>
```

### React

在 react 也很容易。

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

这里有一个基于 `toukey` 制作的 react hook 的库 [react-toukey-hook](https://github.com/Yukiniro/react-toukey-hook)。

### 基本使用

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
