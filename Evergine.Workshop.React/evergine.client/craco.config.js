const path = require('path');
const { ESLINT_MODES } = require('@craco/craco');

module.exports = {
    babel: {
        loaderOptions: {
            babelrc: true
        }
    },
    eslint: {
        mode: ESLINT_MODES.file
    },
    webpack: {
        alias: {
            '@evergine': path.resolve(__dirname, 'src/evergine/'),
            '@modules': path.resolve(__dirname,'src/modules/'),
            '@stores': path.resolve(__dirname,'src/stores/'),
            '@configuration': path.resolve(__dirname, 'src/configuration/'),
            '@hooks': path.resolve(__dirname,'src/hooks/')
        }
    }
};