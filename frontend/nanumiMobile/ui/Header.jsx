import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES, assets} from '../constants';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TextInput />
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
      <View style={{marginVertical: SIZES.font}}>
        <Text style={styles.greetingText}>안녕하세요. OOO님👋</Text>
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

  personIcon: {
    width: 45,
    height: 45,
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
