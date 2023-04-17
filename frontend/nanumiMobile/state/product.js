import {atom} from 'recoil';
import {Data} from '../constants';

export const productState = atom({
  key: 'productState',
  default: Data,
});
