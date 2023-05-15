import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ProductPrice, ProductTitle} from './SubInfo';
import {COLORS, SIZES, FONTS} from '../../constants';

const DetailDesc = ({data}) => {
  const [text, setText] = useState(data.description.slice(0, 100));
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ProductTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />
      </View>

      <View style={{marginVertical: SIZES.extraLarge * 1.5}}>
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.medium,
            color: COLORS.primary,
          }}>
          카테고리
        </Text>

        <View style={{marginTop: SIZES.base}}>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.light,
              color: COLORS.secondary,
              lineHeight: SIZES.large,
            }}>
            {text}
            {!readMore && '...'}
            <Text
              style={{
                fontSize: SIZES.small,
                fontFamily: FONTS.bold,
                color: COLORS.primary,
                lineHeight: SIZES.primary,
              }}
              onPress={() => {
                if (!readMore) {
                  setText(data.description);
                  setReadMore(true);
                } else {
                  setText(data.description.slice(0, 100));
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

export default DetailDesc;
