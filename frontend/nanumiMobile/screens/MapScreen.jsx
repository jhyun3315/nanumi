import React from 'react';
import Map from '../components/web/Map';

const MapScreen = ({navigation, route}) => {
  return <Map navigation={navigation} userInfo={route.params.userInfo} />;
};

export default MapScreen;
