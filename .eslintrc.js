    // eslintrc.js
    module.exports = {
        plugins: ['prettier', 'jest'],
        extends: [
            'airbnb-base',
            'plugin:prettier/recommended',
            'plugin:jest/recommended',
            'plugin:jest/style',
        ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'prettier/prettier': 'error',
        semi: ['error', 'always'],
        'import/no-unresolved': 0,
        'no-console': 0,
        'import/prefer-default-export': 0,
        'consistent-return': 0,
        'no-confusing-arrow': 0,
        'arrow-body-style': 0,
        'max-len': 0,
        'no-extra-boolean-cast': 0,
        'no-nested-ternary': 0,
        'func-names': 0,
        'prefer-const': 0,
        'no-underscore-dangle': 0,
        'no-useless-return': 0,
        'no-async-promise-executor': 0,
    },
    env: {
        'jest/globals': true,
    },
    settings: {
        jest: {
            version: 26,
        },
    },
    };