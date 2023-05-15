import React from 'react';
import Report from '../components/report/Report';

const ReportScreen = ({navigation, route}) => {
  const {opponentId} = route.params;
  return <Report navigation={navigation} opponentId={opponentId} />;
};

export default ReportScreen;
