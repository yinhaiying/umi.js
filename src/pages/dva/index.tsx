import React, { FC, useEffect } from 'react';
import { ConnectProps, connect } from 'umi';
import { Dispatch } from 'redux';

import { devModelState } from '../models/dev';
interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  dev: devModelState;
}
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
