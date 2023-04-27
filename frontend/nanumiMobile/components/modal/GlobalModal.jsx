import React from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from '../../state/modal';
import BlockModal from './BlockModal';
import ChatExitModal from './ChatExitModal';

const MODAL_TYPES = {
  BlockModal: 'BlockModal',
  ChatExitModal: 'ChatExitModal',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.BlockModal]: BlockModal,
  [MODAL_TYPES.ChatExitModal]: ChatExitModal,
};

const GlobalModal = () => {
  const [modal] = useRecoilState(modalState);
  if (!modal?.modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];
  return ModalComponent ? <ModalComponent /> : null;
};

export default GlobalModal;
