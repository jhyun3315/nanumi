import {useRecoilState} from 'recoil';
import {modalState} from './../state/modal';

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const showModal = ({modalType, modalProps, callback}) => {
    setModal({modalType, modalProps, callback});
  };

  const hideModal = () => {
    setModal(null);
  };

  return {modal, setModal, showModal, hideModal};
};
