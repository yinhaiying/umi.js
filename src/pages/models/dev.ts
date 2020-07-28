import { getList } from '../service/dev';
import { Effect } from 'dva';
import { Reducer } from 'redux';
export interface devModelState {
  list: any[];
}

export interface devModelType {
  namespace: string;
  state: devModelState;
  effects: {
    getList: Effect;
  };
  reducers: {
    listInfo: Reducer;
  };
}
const devModel: devModelType = {
  namespace: 'dev',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload, callback }, { put, call }) {
      console.log('请求前：');
      const response = yield call(getList, payload);
      console.log('请求后:', response.data.data);
      yield put({
        type: 'listInfo',
        payload: response.data.data,
      });
    },
  },
  reducers: {
    listInfo(state, action) {
      console.log('reducer:', state);
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default devModel;
