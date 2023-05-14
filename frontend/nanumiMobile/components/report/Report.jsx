import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {BackHeader} from '../../ui/BackHeader';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';
import {requestReportUser} from '../../api/user';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';

const options = [
  '비매너 사용자예요',
  '욕설을 해요',
  '성희롱을 해요',
  '거래 관련 신고',
  '다른 문제가 있어요',
];

const Report = ({navigation, opponentId}) => {
  const [user] = useRecoilState(userState);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  const handleReportUser = async () => {
    const data = {
      reportedId: opponentId,
      content: selectedOption,
    };
    const response = await requestReportUser(user.userId, data);
    if (response.code === 200) {
      Alert.alert(
        '신고가 완료되었습니다.',
        '',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } else if (response.code === 400) {
      Alert.alert('신고에 실패했습니다.');
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedOption === item;

    return (
      <Pressable
        style={[styles.option, isSelected && styles.selectedOption]}
        onPress={() => handleOptionPress(item)}>
        <Text
          style={[styles.optionText, isSelected && styles.selectedOptionText]}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.base,
      }}>
      <BackHeader navigation={navigation}>신고하기</BackHeader>
      <View style={styles.container}>
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={item => item}
          contentContainerStyle={styles.optionsContainer}
        />
        <RectButton handlePress={handleReportUser}>신고하기</RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: SIZES.large,
  },
  optionsContainer: {
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.large,
  },
  option: {
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  selectedOption: {
    backgroundColor: COLORS.red,
  },
  optionText: {
    fontFamily: FONTS.light,
    fontSize: SIZES.font,
    color: COLORS.primary,
    textAlign: 'center',
  },
  selectedOptionText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
export default Report;
