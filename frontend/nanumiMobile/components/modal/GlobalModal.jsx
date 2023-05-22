import React from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from '../../state/modal';
import TransactionCompleteModal from './TransactionCompleteModal';
import MatchingUserModal from './MatchingUserModal';
import HomeCategoryModal from './HomeCategoryModal';
import CreateCategoryModal from './CreateCategoryModal';
import OneButtonModal from './OneButtonModal';
import TwoButtonModal from './TwoButtonModal';

const MODAL_TYPES = {
  TransactionCompleteModal: 'TransactionCompleteModal',
  MatchingUserModal: 'MatchingUserModal',
  HomeCategoryModal: 'HomeCategoryModal',
  CreateCategoryModal: 'CreateCategoryModal',
  OneButtonModal: 'OneButtonModal',
  TwoButtonModal: 'TwoButtonModal',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.TransactionCompleteModal]: TransactionCompleteModal,
  [MODAL_TYPES.MatchingUserModal]: MatchingUserModal,
  [MODAL_TYPES.HomeCategoryModal]: HomeCategoryModal,
  [MODAL_TYPES.CreateCategoryModal]: CreateCategoryModal,
  [MODAL_TYPES.OneButtonModal]: OneButtonModal,
  [MODAL_TYPES.TwoButtonModal]: TwoButtonModal,
};

const GlobalModal = () => {
  const [modal] = useRecoilState(modalState);
  if (!modal?.modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];
  return ModalComponent ? <ModalComponent {...modal?.modalProps} /> : null;
};

export default GlobalModal;
