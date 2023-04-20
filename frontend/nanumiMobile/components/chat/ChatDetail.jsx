import React, {useCallback, useRef, useMemo} from 'react';
import {SafeAreaView} from 'react-native';
import {ChatHeader, ChatInput, MessagesList} from './ChatInfo';
import {ChatOptions} from './ChatOptions';
import {COLORS} from '../../constants';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ChatDetail = ({navigation}) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  });

  // bottomModal이 움직일 떄 동작하는 함수 필요시 사용할듯

  // const handleSheetChanges = useCallback(index => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderBackDrop = useCallback(props => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        enableTouchThrough={true}
        pressBehavior="close"
      />
    );
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
          <ChatHeader
            navigation={navigation}
            handlePresentModalPress={handlePresentModalPress}
          />
          <MessagesList />
          <ChatInput />
        </SafeAreaView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackDrop}>
          <ChatOptions />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ChatDetail;
