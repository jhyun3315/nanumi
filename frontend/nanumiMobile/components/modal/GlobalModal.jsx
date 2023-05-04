import React from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from '../../state/modal';
import TransactionCompleteModal from './TransactionCompleteModal';
import MatchingUserModal from './MatchingUserModal';
import WithdrawalModal from './WithdrawalModal';
import HomeCategoryModal from './HomeCategoryModal';
import CreateCategoryModal from './CreateCategoryModal';
import SuccessDontaionModal from './SuccessDontaionModal';
import OneButtonModal from './OneButtonModal';
import TwoButtonModal from './TwoButtonModal';

const MODAL_TYPES = {
  TransactionCompleteModal: 'TransactionCompleteModal',
  MatchingUserModal: 'MatchingUserModal',
  WithdrawalModal: 'WithdrawalModal',
  HomeCategoryModal: 'HomeCategoryModal',
  CreateCategoryModal: 'CreateCategoryModal',
  SuccessDontaionModal: 'SuccessDontaionModal',
  OneButtonModal: 'OneButtonModal',
  TwoButtonModal: 'TwoButtonModal',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.TransactionCompleteModal]: TransactionCompleteModal,
  [MODAL_TYPES.MatchingUserModal]: MatchingUserModal,
  [MODAL_TYPES.WithdrawalModal]: WithdrawalModal,
  [MODAL_TYPES.HomeCategoryModal]: HomeCategoryModal,
  [MODAL_TYPES.CreateCategoryModal]: CreateCategoryModal,
  [MODAL_TYPES.SuccessDontaionModal]: SuccessDontaionModal,
  [MODAL_TYPES.OneButtonModal]: OneButtonModal,
  [MODAL_TYPES.TwoButtonModal]: TwoButtonModal,
};

const GlobalModal = () => {
  const [modal] = useRecoilState(modalState);
  if (!modal?.modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];
  return ModalComponent ? (
    <ModalComponent
      {...modal?.modalProps}
      callback={modal?.callback}
      args={modal?.args}
    />
  ) : null;
};

export default GlobalModal;
