# umi project

## 快速开始
```
yarn 安装
yarn start 启动
```

## dva的使用

### 编写UI组件
```javascript
import React, { FC } from 'react';
import { ConnectProps, connect } from 'umi';
import { Dispatch } from 'redux';
interface PageProps extends ConnectProps {
  dispatch: Dispatch;
}
const IndexPage: FC<PageProps> = () => {
  return (
    <>
      <div>dva的使用</div>
    </>
  );
};
```
创建一个组件IndexPage,他是一个函数式组件，类型为FC(Function Component),他的参数继承自ConnectProps。


### 定义model
```javascript
const devModel: devModelType = {
  namespace: 'dev',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload, callback }, { put, call }) {
      const response = yield call(getList, payload);
      yield put({
        type: 'listInfo',
        payload: response.data.data,
      });
    },
  },
  reducers: {
    listInfo(state, action) {
      console.log('reducer:', action);
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
```
一个Model由四个部分组成：namespace,state,effects,reducers。
其中namespace是命名空间，通常是文件名称。每个model都必须有一个命名空间，如果没有应该会默认以文件名为命名空间。
state:是我们需要在所有组件中使用的state的值。可以是简单的类型，如果有多个状态，可以是一个对象。
effects:副作用，通常是用于接口请求，然后传递给reducer处理。通常是调用service里面的方法,type:是一个reducer函数，payload是获取到接口返回的参数。
```javascript
    *getList({ payload, callback }, { put, call }) {
      const response = yield call(getList, payload);
      yield put({
        type: 'listInfo',
        payload: response.data.data,
      });
    },
```
reducer:是一个函数，接收两个参数state和action。其中state是原来的state,action.payload含有更新后的state。
```javascript
    listInfo(state, action) {
      console.log('reducer:', action);
      return {
        ...state,
        list: action.payload,
      };
    },
```


### connect连接组件和model
connect的作用是将组件和models结合在一起。将models中的state绑定到组件的props中。并提供一些额外的功能，譬如dispatch。

connect方法接收一个函数，返回一个函数。
第一个函数会注入全部的models，因此对一个参数是model的命名空间，需要返回一个新的对象，这个对象就是你想要从model中获取的值。
```javascript
const IndexPage: FC<PageProps> = ({ dev, dispatch }) => {
  const { list } = dev;
  useEffect(() => {
    dispatch({ type: 'dev/getList' });
  }, []);
  return (
    <>
      {JSON.stringify(list)}
      <div>dva的使用</div>
    </>
  );
};

export default connect(({ dev }: { dev: devModelState }) => {
  return {
    dev,
  };
})(IndexPage);
```
然后使用useEffect获取数据：通过ConnectProps中的disptch方法进行分发：他的参数是一个对象，其中type的值是：命名空间/effect函数。
effect函数是你想要通过接口获取的数据。
```javascript
  useEffect(() => {
    dispatch({ type: 'dev/getList' });
  }, []);

```
