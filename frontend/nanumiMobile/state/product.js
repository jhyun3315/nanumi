import {atom} from 'recoil';

export const productState = atom({
  key: 'productState',
  default: {
    data: [],
    error: null,
    isLoading: true,
    hasNextPage: false,
    isFetchingNextPage: false,
  },
});
