module.exports = {
  "env": {
    "es2020": true,
    "node": true,
  },
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-unused-vars":["error", {
      "argsIgnorePattern": "_"
    }],
    "camelcase": "off",
    "no-console": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
};
