import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-ionicons';
import {COLORS, FONTS, SIZES, assets} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {userState} from '../state/user';

const Header = () => {
  const navigation = useNavigation();
  const [user] = useRecoilState(userState);

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Text
          style={
            styles.text
          }>{`${user?.si} ${user?.gugun}  ${user?.dong}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Icon name="search" color={COLORS.primary} size={32} />
          </Pressable>
          <View style={styles.personIcon}>
            <Image
              source={{uri: user?.userProfileUrl}}
              resizeMode="contain"
              style={styles.personImage}
            />
            {/* tier 있으면 tier image 들어갈곳 */}
            <Image
              source={assets.badge}
              resizeMode="contain"
              style={styles.badgeImage}
            />
          </View>
        </View>
      </View>
      <View style={{marginVertical: SIZES.font}}>
        <Text style={styles.greetingText}>
          안녕하세요. {user?.nickname}님👋
        </Text>
        <Text style={styles.headerText}>원하는 물건을 찾아보세요</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    padding: SIZES.font,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  personIcon: {
    flexDirection: 'row',
    width: 36,
    height: 36,
    marginLeft: SIZES.base,
    borderRadius: SIZES.extraLarge,
  },

  personImage: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.extraLarge,
  },

  badgeImage: {
    position: 'absolute',
    width: 15,
    height: 15,
    bottom: -1,
    right: -1,
  },

  greetingText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },

  headerText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
});
