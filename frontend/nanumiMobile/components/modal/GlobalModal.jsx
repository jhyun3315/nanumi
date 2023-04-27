import React from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from '../../state/modal';
import BlockUserModal from './BlockUserModal';
import ChatExitModal from './ChatExitModal';
import TransactionCompleteModal from './TransactionCompleteModal';

const MODAL_TYPES = {
  BlockUserModal: 'BlockUserModal',
  ChatExitModal: 'ChatExitModal',
  TransactionCompleteModal: 'TransactionCompleteModal',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.BlockUserModal]: BlockUserModal,
  [MODAL_TYPES.ChatExitModal]: ChatExitModal,
  [MODAL_TYPES.TransactionCompleteModal]: TransactionCompleteModal,
};

const GlobalModal = () => {
  const [modal] = useRecoilState(modalState);
  if (!modal?.modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];
  return ModalComponent ? <ModalComponent /> : null;
};

export default GlobalModal;
