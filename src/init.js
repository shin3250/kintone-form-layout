"use strict";

const common = require("./common");

const result = (() => {
    const regPattern = {
        subdomain: /^[A-Za-z0-9][A-Za-z0-9-]{1,30}[A-Za-z0-9]$/,
        apiToken: /^[A-Za-z0-9]{40}$/,
        serverName: /^([A-Za-z0-9][A-Za-z0-9-]{1,61}[A-Za-z0-9]\.)+([A-Za-z0-9]{2}\.)?[A-Za-z]{2,}$/,
    };
    const abortMessage = "接続情報の作成を中止しました。";
    const illegalMessage = str => str + "が不正です。" + abortMessage;

    const readlineSync = require("readline-sync");

    process.stdout.write("kintoneサブドメイン：");
    const subdomain = readlineSync.question();
    if (!subdomain) return abortMessage;
    if (!subdomain.match(regPattern.subdomain)) return illegalMessage("サブドメイン");

    process.stdout.write("ユーザー名：");
    const username = readlineSync.question();

    const password = (() => {
        if (username) {
            process.stdout.write("パスワード：");
            return readlineSync.question(null, {hideEchoBack: true});
        }
        return null;
    })();
    if (username && !password) return abortMessage;

    const apiToken = (() => {
        if (!password) {
            process.stdout.write("APIトークン：");
            return readlineSync.question();
        }
        return null;
    })();

    if (!password && !apiToken) return abortMessage;
    if (apiToken && !apiToken.match(regPattern.apiToken)) return illegalMessage("APIトークン");

    process.stdout.write("アプリID：");
    const appId = readlineSync.question();
    if (!appId) return abortMessage;
    if (isNaN(appId) || Number(appId) < 1) return illegalMessage("アプリID");

    process.stdout.write("プロキシサーバー：");
    const host = readlineSync.question();
    if (host && !host.match(regPattern.serverName)) return illegalMessage("プロキシサーバー");

    const port = (() => {
        if (host) {
            process.stdout.write("プロキシポート番号：");
            return readlineSync.question();
        }
        return null;
    })();
    if (host && port && (isNaN(port) || Number(port) < 1 || Number(port) > 65535)) return illegalMessage("プロキシポート番号");

    const clientParam = {
        app: Number(appId),
        baseUrl: "https://" + subdomain + ".cybozu.com",
    };
    if (password) clientParam.auth = {username, password};
    if (apiToken) clientParam.auth = {apiToken};
    if (host) clientParam.proxy = {host, port};

    try {
        const {distDir, clientParamName} = common.constant;
        const fs = require("fs");
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
        fs.writeFileSync(distDir + clientParamName, JSON.stringify(clientParam));

        return "kintoneへの接続情報を作成しました。";
    } catch {
        return "kintoneへの接続情報の作成に失敗しました。";
    }
})();

common.consoleLog("\n" + result);
