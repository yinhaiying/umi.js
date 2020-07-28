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


### connect连接组件和model
connect的作用是将组件和models结合在一起。将models中的state绑定到组件的props中。并提供一些额外的功能，譬如dispatch。

connect方法接收一个函数，返回一个函数。
第一个函数会注入全部的models，需要返回一个新的对象，挑选该组件所需要的models
```javascript
export default connect((user,login,global={},loading) => {
    currentUser: user.currentUser,
    collapsed:global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices
})(IndexPage)

```
