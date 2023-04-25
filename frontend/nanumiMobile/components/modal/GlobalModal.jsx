import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {modalState} from '../../state/modal';
import BlockModal from './BlockModal';

const MODAL_TYPES = {
  BlockModal: 'BlockModal',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.BlockModal]: BlockModal,
};

const GlobalModal = () => {
  const {modalType, modalProps} = useRecoilValue(modalState);

  if (!modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];
  return <ModalComponent {...modalProps} />;
};

export default GlobalModal;
