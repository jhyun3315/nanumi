export const getAddressFromCoords = async coordinate => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${coordinate.longitude}&y=${coordinate.latitude}`,
      {
        headers: {
          Authorization: `KakaoAK c22bf545a0b497a95ef7e5417534f704`,
        },
      },
    );
    console.log('object', response);
    const address = response.data.documents[0].address_name;
    return {address};
  } catch (error) {
    return false;
  }
};
