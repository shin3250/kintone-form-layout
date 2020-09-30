"use strict";

(function() {
    const common = require("./common");
    const {distDir, formLayoutName} = common.constant;
    const formLayoutJson = distDir + formLayoutName;

    const settings = common.getSettings("../" + distDir);
    if (!settings) return;

    const formLayout = (() => {
        try {
            return require("../" + formLayoutJson);
        } catch {
            return null;
        }
    })();

    if (!formLayout) {
        common.consoleLog("フォームレイアウトを読み込めません。" + formLayoutName + " の内容が正しいか確認してください。");
        return;
    }

    async function setFormLayout() {
        try {
            formLayout.app = settings.app;
            if (formLayout.revision) delete formLayout.revision;

            const {KintoneRestAPIClient} = require("@kintone/rest-api-client");
            const client = new KintoneRestAPIClient(settings);

            await client.app.updateFormLayout(formLayout).then(async () => {
                await client.app.deployApp({apps: [{app: settings.app}]});
            });

            common.consoleLog("フォームレイアウトを設定しました。");
        } catch (e) {
            common.errorHandling(e.message);
        }
    }

    setFormLayout();
})();
