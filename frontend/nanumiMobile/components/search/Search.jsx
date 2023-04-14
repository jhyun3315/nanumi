import React from 'react';
import {View, Image, TextInput, Pressable, StyleSheet} from 'react-native';
import {COLORS, SIZES, assets} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-ionicons';

const Search = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          name="arrow-back"
          color={COLORS.primary}
          size={SIZES.extraLarge}
        />
      </Pressable>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Image
            source={assets.search}
            resizeMode="contain"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="검색"
            style={styles.searchInput}
            onChangeText={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.font,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  searchContainer: {
    width: '80%',
  },
  searchBar: {
    width: '100%',
    borderRadius: SIZES.font,
    backgroundColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.font,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: SIZES.base,
  },
  searchInput: {
    flex: 1,
  },
});

export default Search;
