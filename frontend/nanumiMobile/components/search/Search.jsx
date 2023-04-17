import React, {useState} from 'react';
import Icon from 'react-native-ionicons';
import {
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {COLORS, Data, SIZES, assets} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import ProductList from '../product/ProductList';

const Search = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  const handleSearch = value => {
    if (!value.length) return setData(Data);
    const filteredData = Data.filter(item => item.name.includes(value));

    if (filteredData.length) setData(filteredData);
    else setData(Data);
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
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </View>
      <ProductList isSearch={true} data={data} />
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
  },
});

export default Search;
