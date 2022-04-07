/**
 * THIS FILE JUST BYPASS THE MODULE RESOLUTION VALIDATION OF THE WEBSTORM
 */

// eslint-disable-next-line no-undef
System.config({
  paths: {
    '@src/*': './src',
    '@assets/*': './src/assets/*',
    '@components/*': './src/components/*',
    '@configs/*': './src/configs/*',
    '@lib/*': './src/lib/*',
    '@features/*': './src/features/*',
    '@screens/*': './src/screens/*',
    '@styles/*': './src/styles/*',
  },
});
