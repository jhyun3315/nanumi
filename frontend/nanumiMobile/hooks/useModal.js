import {useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from './../state/modal';

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const showModal = ({modalType, modalProps}) => {
    setModal({modalType, modalProps});
  };

  const hideModal = () => {
    setModal({
      modalType: null,
      modalProps: {
        visible: false,
      },
    });
  };

  return useMemo(
    () => ({modal, setModal, showModal, hideModal}),
    [modal, setModal],
  );
};
