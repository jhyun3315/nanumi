export const decodeJson = binaryData => {
  const decoder = new TextDecoder('utf-8');
  const jsonString = decoder.decode(binaryData);

  const jsonObject = JSON.parse(jsonString);

  return jsonObject;
};
