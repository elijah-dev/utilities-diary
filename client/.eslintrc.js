module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
    ],
    globals: {
        JSX: 'readonly',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: false,
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            { ts: 'never', tsx: 'never' },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
