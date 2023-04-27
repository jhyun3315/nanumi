import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
import {BackHeader} from '../../ui/BackHeader';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';

const options = [
  '비매너 사용자예요',
  '욕설을 해요',
  '성희롱을 해요',
  '거래 관련 신고',
  '다른 문제가 있어요',
];

const Report = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOption);
  const handleOptionPress = option => {
    setSelectedOption(option);
    // 신고 처리 로직
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
        <RectButton>신고하기</RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.large,
  },
  optionsContainer: {
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
  },
  option: {
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  selectedOption: {
    backgroundColor: COLORS.violet,
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
