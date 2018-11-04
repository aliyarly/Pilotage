const path = require('path');
export default {
  entry: 'src/index.js',
  env: {
    development: {
      extraBabelPlugins: [['import', { libraryName: 'antd', style: true }], 'dva-hmr'],
    },
    production: {
      extraBabelPlugins: [
        ['import', { libraryName: 'antd', style: true }],
      ],
      publicPath: `http://localhost:8080/`,
    }
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    assets: path.resolve(__dirname, 'src/assets/'),
    public: path.resolve(__dirname, 'public'),
    configs: path.resolve(__dirname, 'src/common/configs'),
    layouts: path.resolve(__dirname, 'src/layouts/'),
    utils: path.resolve(__dirname, 'src/utils'),
    common: path.resolve(__dirname, 'src/common'),
    services: path.resolve(__dirname, 'src/services'),
  },
  ignoreMomentLocale: true,
};

