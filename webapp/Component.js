sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/bootcamp/sapui5/finalproject/model/models",
    "com/bootcamp/sapui5/finalproject/utils/ProjectHelper"
], (UIComponent, models, ProjectHelper) => {
    "use strict";

    return UIComponent.extend("com.bootcamp.sapui5.finalproject.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            this.setInitModel()
        },

        setInitModel: function () {
            ProjectHelper.init(this.getModel())
            ProjectHelper.setInitModelLocalData(this)
        }
    });
});