module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "extends": [
    "plugin:vue/recommended"
  ],
  "plugins": [
    "vue"
  ],
  "rules": {
    "semi": ["error", "never"],
    "vue/max-attributes-per-line": 0,
    "vue/attributes-order": 0,
    "vue/html-self-closing": 0,
    "vue/order-in-components": 0,
    "vue/require-default-prop": 0,
    "vue/script-indent": ["error", 2, {
      "baseIndent": 1,
      "switchCase": 1,
      "ignores": []
    }],
    "eqeqeq": [2, 'always'],
    // 'array-callback-return': 2,
    'block-scoped-var': 2,
    'brace-style': 2,
    // 'complexity': 2,
    'curly': [2, 'multi-line', 'consistent'],
    'default-case': 2,
    'for-direction': 2,
    // 'guard-for-in': 2,
    'handle-callback-err': 2,
    // 'indent': [2, 2],
    'key-spacing': 2,
    'keyword-spacing': 2,
    'max-depth': [2, 5],
    // 'max-nested-callbacks': [2, 3],
    'max-params': [2, 8],
    'new-cap': [2, {
        'capIsNew': false, // 允许大写开头的函数直接执行
    }],
    'new-parens': 2,
    'no-alert': 1,
    'no-array-constructor': 2,
    'no-await-in-loop': 2,
    'no-case-declarations': 2,
    'no-catch-shadow': 2,
    'no-class-assign': 2,
    'no-compare-neg-zero': 2,
    'no-cond-assign': [2, 'except-parens'],
    'no-confusing-arrow': [2, { 'allowParens': true }],
    'no-console': 1,
    // 禁止使用常量作为判断条件
    'no-constant-condition': [2, { 'checkLoops': false }],
    // 禁止对 const 定义重新赋值
    'no-const-assign': 2,
    'no-debugger': 1,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-dupe-class-members': 2,
    'no-duplicate-case': 2,
    'no-duplicate-imports': 2,
    'no-empty-character-class': 2,
    // 'no-empty-function': 2,
    'no-empty-pattern': 2,
    'no-empty': [2, { 'allowEmptyCatch': true }],
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-label': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': [2, { 'commentPattern': '.' }],
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-global-assign': 2,
    'no-inner-declarations': [2, 'both'],
    'no-irregular-whitespace': [2, {
      'skipStrings': true, // 允许在字符串中使用
      'skipComments': true, // 允许在注释中使用
      'skipRegExps': true, // 允许在正则表达式中使用
      'skipTemplates': true, // 允许在模板字符串中使用
    }],
    'no-lone-blocks': 2,
    'no-mixed-operators': [2, {
      "groups": [
        ["&&", "||"]
      ]
    }],
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-obj-calls': 2,
    // 'no-param-reassign': 2,
    'no-return-assign': 2,
    'no-self-compare': 2,
    'no-shadow-restricted-names': 2,
    'no-tabs': 2,
    'no-undef': 2,
    'nonblock-statement-body-position': 2,
    'space-before-function-paren': 0,
    'space-before-blocks': 2,
    'rest-spread-spacing': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false,
    }],
    'no-trailing-spaces': [2, {
      "skipBlankLines": true, // 不检查空行
      "ignoreComments": true // 不检查注释
    }],
    'switch-colon-spacing': 2,
    'wrap-iife': [2, 'inside'],
    'yoda': 2,
    'no-whitespace-before-property': 2,
    'block-spacing': 2,

  }
}
