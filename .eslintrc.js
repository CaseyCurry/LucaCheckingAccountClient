module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "indent": ["error",
      2, {
        "SwitchCase": 1
      }
    ],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-console": "off",
    "no-underscore-dangle": "error"
  }
};
