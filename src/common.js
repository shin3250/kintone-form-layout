"use sttict";

const distDir = "dist/";
const clientParamName = "clientParam.json";
const formLayoutName = "formLayout.json";
const npmRumInit = "npm run init";
const cannotReadConfig = "設定ファイルを読み込めません。" + npmRumInit + " を実行し、初期設定を行ってください。";
const runInitAgain = "エラーが発生しました。再度 " + npmRumInit + " を実行してください。";

function consoleLog(message) {
    console.log(message.replace(/(。)/g, "$1\n"));
}

function getSettings(dir) {
    try {
        return require(dir + clientParamName);
    } catch {
        consoleLog(cannotReadConfig);
        return null;
    }
}

function errorHandling(message) {
    const errorMessage = message.indexOf("。") !== -1 ?
        message.replace(/。 \([A-Za-z0-9]{20}\)/, "。") :
        runInitAgain;
    consoleLog(errorMessage);
}

module.exports = {
    constant: {
        distDir,
        clientParamName,
        formLayoutName,
    },

    consoleLog,
    getSettings,
    errorHandling,
};
