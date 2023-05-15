import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {Alert, Dimensions, SafeAreaView} from 'react-native';
import {
  ChatHeader,
  ChatProductInfo,
  renderBubble,
  renderLoading,
  renderSend,
} from './ChatInfo';
import {ChatOptions} from './ChatOptions';
import {COLORS, FONTS, SIZES} from '../../constants';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';
import {useModal} from '../../hooks/useModal';
import {
  requestGetDetailProduct,
  requestGetMatchingId,
  requsetCompleteTransaction,
  requsetEvaluationTransaction,
} from '../../api/product';
import {Fallback} from '../../ui/Fallback';
import {useQuery} from '@tanstack/react-query';
import GlobalModal from '../modal/GlobalModal';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {requestGetTop20ChatLog} from '../../api/chat';
import {requestBlockUser} from '../../api/user';
import {convertDate} from '../../util/formatDate';
import {decodeJson} from './../../util/decodeBinaryData';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ErrorModal from '../modal/ErrorModal';
import DataErrorModal from '../modal/DataErrorModal';

const {width} = Dimensions.get('window');

const ChatDetail = ({
  navigation,
  productId,
  chatRoomId,
  opponentId,
  isBlocked,
}) => {
  const {showModal, hideModal} = useModal();
  const [user] = useRecoilState(userState);
  const client = useRef(null);
  const [transformChatData, setTransformChatData] = useState([]);
  // 차단 시 연결끊음, 연결이 끊어져있을 때는 메시지를 못보내도록
  const [isDisconnect, setIsDisconnet] = useState(true);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '55%'], []);

  const chatLogQuery = useMemo(() => ['chatLog', chatRoomId], [chatRoomId]);
  const productQuery = useMemo(() => ['product', productId], [productId]);
  const matchingQuery = useMemo(
    () => ['matchId', productId, user.userId, opponentId],
    [productId, user.userId, opponentId],
  );

  const {
    data: chatLogData,
    isLoading: chatLogIsLoading,
    error: chatLogError,
    refetch: chatLogRefetch,
  } = useQuery(chatLogQuery, () => requestGetTop20ChatLog(chatRoomId));

  const {data, isLoading, error, refetch} = useQuery(productQuery, () =>
    requestGetDetailProduct(productId),
  );

  const {
    data: matchingData,
    isLoading: matchingLoading,
    error: matchingError,
    refetch: matchingRefetch,
  } = useQuery(matchingQuery, () =>
    requestGetMatchingId(opponentId, productId, user.userId),
  );

  const subscribe = () => {
    if (client.current) {
      client.current.subscribe(`/sub/chat/room/${chatRoomId}`, message => {
        const receivedChatTransform = decodeJson(message._binaryBody);
        setTransformChatData(prevChatData => {
          const newChatData = [
            {
              _id: receivedChatTransform?._id,
              text: receivedChatTransform?.message,
              createdAt: convertDate(receivedChatTransform?.sendTime),
              user: {
                _id: receivedChatTransform?.sender,
                name: receivedChatTransform?.senderName,
                // avatar: receivedChatTransform?.senderAvatarUrl,
              },
            },
            ...prevChatData,
          ];
          return newChatData;
        });
      });
    }
  };

  const disconnect = () => {
    if (client.current && client.current.connected) {
      setIsDisconnet(true);
      client.current.deactivate();
    }
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () =>
        new SockJS(`https://k8b103.p.ssafy.io/api/ws-stomp`),

      onConnect: () => {
        setIsDisconnet(false);
        subscribe();
      },

      onDisconnect: () => {
        disconnect();
      },
    });

    client.current.activate();
  };

  const handleBlockUser = async () => {
    const data = {
      targetId: opponentId,
    };

    const response = await requestBlockUser(user.userId, data);
    if (response.code === 200) {
      disconnect();
      hideModal();
    } else if (response.code === 400) {
      hideModal();
      Alert.alert('존재하지 않는 유저입니다');
    } else {
      Alert.alert('알 수 없는 에러 발생');
    }
  };

  const handleRefetch = () => {
    refetch();
    chatLogRefetch();
    matchingRefetch();
  };

  const handleCloseAndBack = () => {
    hideModal();
  };

  const handleCloseBottomModal = () => {
    bottomSheetModalRef.current?.close();
  };

  // 거래 평가 API
  const handleEvaluationTransaction = async (starPoint, rating, content) => {
    const data = {
      starPoint: starPoint,
      rating: rating,
      content: content,
    };
    const response = await requsetEvaluationTransaction(
      matchingData?.result,
      user.userId,
      data,
    );

    if (response.code === 200) {
      disconnect();
      hideModal();
      navigation.navigate('BottomTabs', {screen: 'ChatList'});
    } else if (response.code === 400) {
      Alert.alert('오류', '존재하지 않는 유저이거나 채팅입니다.', [
        {
          text: '확인',
          onPress: () => {
            hideModal();
          },
          style: 'cancel',
        },
      ]);
    }
  };

  const handleCompleteTransaction = async () => {
    const response = await requsetCompleteTransaction(
      productId,
      data?.result?.userId,
      data?.result?.userId !== user.userId ? user.userId : opponentId,
    );
    return response;
  };

  const handleOpenBlockUserModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'TwoButtonModal',
        modalProps: {
          title: '차단하기',
          content:
            '차단시 상대방과의 거래가 취소되고 서로의 게시글을 확인하거나 채팅을 할 수 없어요. 차단하실래요?',
          visible: true,
          onConfirm: handleBlockUser,
          onCancel: hideModal,
        },
      });
    }, 300);
  };

  const handleOpenChatExitModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'TwoButtonModal',
        modalProps: {
          title: '채팅방 나가기',
          content:
            '채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수없어요. 채팅방에서 나가시겠어요?',
          visible: true,
          onConfirm: () => {
            hideModal();
            navigation.goBack();
          },
          onCancel: hideModal,
        },
      });
    }, 300);
  };

  const handleOpenTransactionCompleteModal = async () => {
    handleCloseBottomModal();
    const response = await handleCompleteTransaction();

    if (response.code === 200) {
      setTimeout(() => {
        hideModal();
        showModal({
          modalType: 'TransactionCompleteModal',
          modalProps: {
            visible: true,
            onConfirm: handleEvaluationTransaction,
          },
        });
      }, 300);
    } else if (response.code === 400) {
      Alert.alert('알수없는 에러 발생');
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSend = newMessage => {
    const transformMessage = {
      type: 'TALK',
      roomId: chatRoomId,
      sender: user.userId,
      message: newMessage[0].text,
    };

    if (client.current && client.current.connected) {
      client.current.publish({
        destination: '/pub/chat/message',
        headers: {},
        body: JSON.stringify(transformMessage),
      });
    } else {
      console.warn('STOMP client is not connected');
    }
  };

  const renderBackDrop = useCallback(props => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
        pressBehavior="close"
      />
    );
  }, []);

  useEffect(() => {
    connect();
    return () => {
      client.current.deactivate();
    };
  }, []);

  useEffect(() => {
    if (chatLogData) {
      setTransformChatData(
        chatLogData.map(message => ({
          _id: message._id,
          text: message.message,
          createdAt: convertDate(message.sendTime),
          user: {
            _id: message.sender,
            name: message.senderName,
          },
        })),
      );
    }
  }, [chatLogData]);

  if (data?.code === 404)
    return <DataErrorModal handlePress={handleCloseAndBack} />;
  if (isLoading || chatLogIsLoading || matchingLoading) return <Fallback />;
  if (error || chatLogError || matchingError)
    return <ErrorModal handlePress={handleRefetch} />;

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <GlobalModal />
        <BottomSheetModalProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <ChatHeader
              navigation={navigation}
              handlePresentModalPress={handlePresentModalPress}
            />
            <ChatProductInfo data={data?.result} />
            <GiftedChat
              messages={transformChatData}
              onSend={newMessage => handleSend(newMessage)}
              placeholder={
                isDisconnect || isBlocked
                  ? '메시지를 보낼 수 없습니다'
                  : '메시지를 입력해주세요...'
              }
              user={{_id: user.userId}}
              renderBubble={renderBubble}
              renderSend={renderSend}
              textInputProps={{
                style: {
                  color: COLORS.primary,
                  width: '90%',
                  marginLeft: SIZES.base,
                },
                editable: isDisconnect || isBlocked ? false : true,
              }}
              scrollToBottom
              renderLoading={renderLoading}
            />
          </SafeAreaView>

          <BottomSheetModal
            isBackDropDismisByPress={true}
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackDrop}
            animationConfigs={{
              duration: 200,
            }}>
            <ChatOptions
              sellerId={data?.result?.userId}
              navigation={navigation}
              opponentId={opponentId}
              handleCloseBottomModal={handleCloseBottomModal}
              handleOpenBlockUserModal={handleOpenBlockUserModal}
              handleOpenChatExitModal={handleOpenChatExitModal}
              handleOpenTransactionCompleteModal={
                handleOpenTransactionCompleteModal
              }
            />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default ChatDetail;
