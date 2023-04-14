import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-ionicons';
import {COLORS, FONTS, SIZES, assets} from '../constants';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TextInput />
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
              source={assets.person01}
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
        <Text style={styles.greetingText}>안녕하세요. OOO님👋</Text>
        <Text style={styles.headerText}>원하는 물건을 찾아보세요</Text>
      </View>

      {/* <View style={{marginTop: SIZES.font}}>
        <View
          style={{
            width: '100%',
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.font,
          }}>
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              marginRight: SIZES.base,
            }}
          />
          <TextInput placeholder="검색" style={{flex: 1}} />
        </View>
      </View> */}
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

  personIcon: {
    flexDirection: 'row',
    width: 36,
    height: 36,
    marginLeft: SIZES.base,
  },

  personImage: {
    width: '100%',
    height: '100%',
  },

  badgeImage: {
    position: 'absolute',
    width: 15,
    height: 15,
    bottom: 0,
    right: 0,
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
