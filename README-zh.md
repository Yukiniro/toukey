# Toukey

`Toukey` 是一个简单、高效的键盘事件库。

## 安装

```shell
npm i toukey
```

## 使用

### 基本使用

```javascript
import { subscribe } from 'toukey';

subscribe('space', () => {
  console.log('space');
});
```

### 取消事件监听

`subscribe` 接口会返回一个函数，调用该函数可以取消当前的事件监听。

```javascript
import { subscribe } from 'toukey';

const unsubscribe = subscribe('space', () => {
  console.log('space');
});

unsubscribe();
```

### 多个事件监听

使用 `toukey` 时可以一次性创建多个事件监听。

```javascript
import { subscribe } from 'toukey';

subscribe('space, a', () => {
  console.log('space or a');
});
```

### 组合键

通过 `'+'` 可以监听组合键，也可以自定义组合键分隔符。

```javascript
import { subscribe } from 'toukey';

subscribe('ctrl+a', () => {
  console.log('ctrl+a');
});
```

### 空间

在调用时可以第三个参数可以指定事件的作用空间。`"default"` 是默认空间。

```javascript
import { subscribe, setScope } from 'toukey';

const defaultHandler = () => {
  console.log('space in default');
};

const subHandler = () => {
  console.log('space in sub');
};

subscribe('space', defaultHandler, 'default');
subscribe('space', subHandler, { scope: 'sub' });
```

#### setScope

可以通过 `setScope` 接口设置当前有效地空间。

```javascript
import { setScope } from 'toukey';

setScope('sub');
```

#### getScope

可以通过 `getScope` 接口获取当前有效地空间。

```javascript
import { getScope } from 'toukey';

console.log(getScope());
```

#### deleteScope

可以通过 `deleteScope` 接口删除指定空间。

```javascript
import { deleteScope } from 'toukey';

deleteScope('main');
```

#### 特殊空间 *

如果指定 `scope` 为 `"*"` 的话，该监听函数会无视 `scope` 的设置。

```javascript
import { subscribe, setScope } from 'toukey';

const handler = () => {
  console.log('space in default');
};

const subHandler = () => {
  console.log('space in sub');
};

subscribe('space', defaultHandler, '*');
subscribe('space', subHandler, 'sub');
setScope('sub');
```

### keydown and keyup

在调用时可以第三个参数可以指定事件的类型

```javascript
import { subscribe, setScope } from 'toukey';

const downHandler = () => {
  console.log('space keydown');
};

const upHandler = () => {
  console.log('space keyup');
};

subscribe('space', downHandler, {'keydown'});
subscribe('space', upHandler, {'keyup'});
```