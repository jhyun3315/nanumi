import React from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from '../../state/modal';
import BlockUserModal from './BlockUserModal';
import ChatExitModal from './ChatExitModal';
import TransactionCompleteModal from './TransactionCompleteModal';
import MatchingUserModal from './MatchingUserModal';
import LogoutModal from './LogoutModal';
const MODAL_TYPES = {
  BlockUserModal: 'BlockUserModal',
  ChatExitModal: 'ChatExitModal',
  TransactionCompleteModal: 'TransactionCompleteModal',
  MatchingUserModal: 'MatchingUserModal',
  LogoutModal: 'LogoutModal',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.BlockUserModal]: BlockUserModal,
  [MODAL_TYPES.ChatExitModal]: ChatExitModal,
  [MODAL_TYPES.TransactionCompleteModal]: TransactionCompleteModal,
  [MODAL_TYPES.MatchingUserModal]: MatchingUserModal,
  [MODAL_TYPES.LogoutModal]: LogoutModal,
};

const GlobalModal = () => {
  const [modal] = useRecoilState(modalState);
  if (!modal?.modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];
  return ModalComponent ? <ModalComponent {...modal?.modalProps} /> : null;
};

export default GlobalModal;
