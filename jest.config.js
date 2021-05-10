module.exports = {
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/test/mocks/styleMocks.js',
    },
    "snapshotSerializers": ["enzyme-to-json/serializer"]
  };