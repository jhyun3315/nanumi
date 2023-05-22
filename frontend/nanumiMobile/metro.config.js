module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: [
      'js', // note this has to be defined first or you get an error
      'json',
      'jsx',
      'mjs',
      // required because the react-native cli ignores `resolverMainFields`
      'ts',
      'tsx',
    ],
  },
};
