"use strict";

(function() {
    const common = require("./common");
    const {distDir, formLayoutName} = common.constant;
    const formLayoutJson = distDir + formLayoutName;

    const settings = common.getSettings("../" + distDir);
    if (!settings) return;

    async function getFormLayout() {
        try {
            const {KintoneRestAPIClient} = require("@kintone/rest-api-client");
            const client = new KintoneRestAPIClient(settings);

            const resp = await client.app.getFormLayout({app: settings.app});
            const fs = require("fs");
            fs.writeFileSync(formLayoutJson, JSON.stringify(resp));

            common.consoleLog("フォームレイアウトを取得しました。");
        } catch (e) {
            common.errorHandling(e.message);
        }
    }

    getFormLayout();
})();
