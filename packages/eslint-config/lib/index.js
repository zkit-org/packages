module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "next/core-web-vitals"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/button-has-type": 0,
        "@next/next/no-img-element": 0,
        "react/display-name": 0,
        "react-hooks/exhaustive-deps": 0,
        "jsx-a11y/alt-text": 0,
        "@next/next/link-passhref": 0,
        "import/no-anonymous-default-export": 0,
        "@next/next/no-sync-scripts": 0
    }
};
