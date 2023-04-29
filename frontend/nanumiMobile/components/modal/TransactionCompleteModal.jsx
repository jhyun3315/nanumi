import React, {useState, useRef, useMemo} from 'react';
import {
  Modal,
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, SIZES, assets} from '../../constants';
import {RectButton} from '../../ui/Button';
import {useModal} from '../../hooks/useModal';
import Icon from 'react-native-ionicons';

const {width, height} = Dimensions.get('window');

const STARS = 5;

const GRADE = [
  {badge: assets.time, id: 1, desc: '시간 약속'},
  {badge: assets.kindness, id: 2, desc: '친절'},
  {badge: assets.manner, id: 3, desc: '매너'},
  {badge: assets.fast, id: 4, desc: '빠른응답'},
  {badge: assets.good, id: 5, desc: '좋은상품'},
  {badge: assets.again, id: 6, desc: '재거래의향'},
];

const TransactionCompleteModal = () => {
  const {showModal, hideModal} = useModal();
  const [starPoint, setStarPoint] = useState(5);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState([]);
  const animation = useRef(new Animated.Value(1)).current;

  console.log(rating);
  const handleStarPoint = star => {
    setStarPoint(star);
  };

  const handleRate = gradeId => {
    if (rating.includes(gradeId)) {
      setRating(rating.filter(id => id !== gradeId));
    } else {
      setRating([...rating, gradeId]);
    }
  };

  const renderGradeButton = grade => {
    const buttonColor = rating.includes(grade.id)
      ? COLORS.disable
      : COLORS.lightGray;

    return (
      <View
        key={grade.id}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: SIZES.small,
        }}>
        <Pressable
          key={grade.id}
          style={[styles.badgeButton, {backgroundColor: buttonColor}]}
          onPress={() => handleRate(grade.id)}>
          <Image source={grade.badge} style={styles.badgeImage} />
        </Pressable>
        <Text style={styles.badgeText}>{grade.desc}</Text>
      </View>
    );
  };

  const animateScale = animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1],
  });

  const animateWobble = animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ['0deg', '-3deg', '3deg', '0deg'],
  });

  const animationStyle = {
    transform: [{scale: animateScale}, {rotate: animateWobble}],
    opacity: animateOpacity,
  };

  const handleAnimate = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(1);
    });
  };

  const stars = useMemo(() => {
    return Array.from({length: STARS}, (_, i) => (
      <Pressable
        key={i + 1}
        onPress={() => {
          handleStarPoint(i + 1), handleAnimate();
        }}>
        <Animated.View style={i + 1 <= starPoint ? animationStyle : null}>
          <Icon
            name={i + 1 <= starPoint ? 'star' : 'star-outline'}
            color={COLORS.yellow}
            size={48}
            style={{marginHorizontal: 6}}
          />
        </Animated.View>
      </Pressable>
    ));
  }, [starPoint, handleAnimate]);

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <Pressable style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={event => event.stopPropagation()}>
          <KeyboardAvoidingView style={styles.modal}>
            <ScrollView style={{width: width}}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.transactionContainer}>
                  <Text style={styles.text}>거래평가</Text>
                </View>

                <View style={styles.starsContainer}>{stars}</View>
                <View style={styles.badgeContainer}>
                  {GRADE.map(grade => renderGradeButton(grade))}
                </View>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    placeholder="내용을 입력해주세요"
                    placeholderTextColor={COLORS.primary}
                    multiline={true}
                    style={styles.textArea}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <RectButton
                    minWidth={120}
                    fontSize={FONTS.font}
                    handlePress={hideModal}>
                    완료
                  </RectButton>
                  <RectButton
                    minWidth={120}
                    fontSize={FONTS.font}
                    backgroundColor={COLORS.primary}
                    handlePress={hideModal}>
                    다음에 할게요
                  </RectButton>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};
export default TransactionCompleteModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width,
    height: height,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    padding: SIZES.extraLarge,
    alignItems: 'center',
  },
  transactionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.extraLarge * 2,
  },
  text: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: SIZES.large,
  },
  subText: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.font,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.large,
  },
  starButton: {
    marginHorizontal: SIZES.base,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    flexWrap: 'wrap',
    marginBottom: SIZES.large,
  },
  badgeButton: {
    backgroundColor: COLORS.disable,
    width: SIZES.extraLarge * 4,
    height: SIZES.extraLarge * 4,
    borderRadius: SIZES.extraLarge * 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.base * 2.5,
  },
  badgeImage: {
    width: SIZES.extraLarge * 2.5,
    height: SIZES.extraLarge * 2.5,
  },
  badgeText: {
    marginTop: SIZES.base,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.font,
  },
  buttonContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textAreaContainer: {
    width: width / 1.1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.small,
    height: height / 6.5,
    marginBottom: SIZES.base * 2,
  },
  textArea: {
    fontFamily: FONTS.light,
    fontSize: SIZES.font,
    color: COLORS.primary,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.base * 1.5,
    textAlignVertical: 'top',
    height: '100%',
  },
});
