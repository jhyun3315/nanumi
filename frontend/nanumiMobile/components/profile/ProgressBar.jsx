import React from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants';

const {width} = Dimensions.get('window');

const ProgressBar = ({value}) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progress, {width: `${value}%`}]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBarContainer: {
    width: width / 1.1,
    height: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
  },
  progress: {
    height: 10,
    backgroundColor: COLORS.disable,
    borderRadius: 5,
  },
});
