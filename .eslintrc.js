module.exports = {
    // --------------------------------
    // 呼び出したいルール（パッケージ）
    // --------------------------------
    // ES5 & kintone の場合
    // extends: "@cybozu/eslint-config/presets/kintone-customize-es5",

    // ES6以上 & kintone の場合
    extends: ["@cybozu", "@cybozu/eslint-config/globals/kintone"],

    // node & kintone の場合
    // extends: ["@cybozu/eslint-config/presets/node", "@cybozu/eslint-config/globals/kintone"],

    // --------------------------------
    // グローバル変数の定義
    // --------------------------------
    globals: {
        "process": "readonly",
        "Buffer": "readonly"
    },

    // --------------------------------
    //  ルール
    // --------------------------------
    rules: {
        "no-constant-condition": 0,
        "no-nested-ternary": 0,
        "no-unused-vars": 1,
        "require-atomic-updates": 0,
        "indent": ["warn", 4, {"SwitchCase": 1}],
        "linebreak-style": ["warn", "windows"],
        "max-depth": ["warn", 6],
        "max-len": ["warn", {"code": 1024}],
        "new-cap": ["warn", {"newIsCap": false, "capIsNewExceptions": ["Sweetalert2"]}],
        "no-empty": ["error", {"allowEmptyCatch": true}],
        "quotes": ["warn", "double"]
    }
};