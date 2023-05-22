import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProductTitle} from './SubInfo';
import {COLORS, SIZES, FONTS} from '../../constants';

const DetailDesc = ({data}) => {
  const [text, setText] = useState(data.content.slice(0, 100));
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <ProductTitle
          title={data.name}
          subTitle={data.userNickname}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.categoryTitle}>{data.categoryName}</Text>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {data.content}
            {!readMore && '...'}
            <Text
              style={styles.readMoreText}
              onPress={() => {
                if (!readMore) {
                  setText(data.content);
                  setReadMore(true);
                } else {
                  setText(data.content.slice(0, 100));
                  setReadMore(false);
                }
              }}>
              {readMore ? '접기' : '더 보기'}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginVertical: SIZES.extraLarge * 1.5,
  },
  categoryTitle: {
    fontSize: SIZES.font,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  descriptionContainer: {
    marginTop: SIZES.base,
  },
  descriptionText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.light,
    color: COLORS.secondary,
    lineHeight: SIZES.large,
  },
  readMoreText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    lineHeight: SIZES.primary,
  },
});

export default DetailDesc;
