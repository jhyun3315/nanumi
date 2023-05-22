import React from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import {COLORS, SIZES} from '../../constants';
const {width} = Dimensions.get('window');

const Indicator = ({scrollX, data}) => {
  return (
    <View style={styles.indicatorContanier}>
      {data?.map((item, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View key={item} style={[styles.indicator, {opacity}]} />
        );
      })}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicatorContanier: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: SIZES.small,
    textAlign: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.small / 2,
  },
});
