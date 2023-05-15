export const getDisntace = (coordinate1, coordinate2) => {
  const R = 6371e3;
  const lat1 = (coordinate1.latitude * Math.PI) / 180;
  const lat2 = (coordinate2.latitude * Math.PI) / 180;
  const deltaLat =
    ((coordinate2.latitude - coordinate1.latitude) * Math.PI) / 180;
  const deltaLng =
    ((coordinate2.longitude - coordinate1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
};
