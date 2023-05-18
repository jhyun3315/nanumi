import React, {useState} from 'react';
import Icon from 'react-native-ionicons';
import {
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {COLORS, SIZES, assets} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import SearchList from './SearchList';

const Search = () => {
  const navigation = useNavigation();
  const [words, setWords] = useState('');

  const handleWords = text => {
    setWords(encodeURIComponent(text));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
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
              onChangeText={handleWords}
            />
          </View>
        </View>
      </View>
      <SearchList words={words} />
    </SafeAreaView>
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
    borderColor: COLORS.disable,
    borderWidth: 1,
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
    color: COLORS.primary,
  },
});

export default Search;
