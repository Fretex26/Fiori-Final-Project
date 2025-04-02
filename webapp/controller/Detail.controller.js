sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
], function(Controller, MessageBox) {
    "use strict";
    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Detail", {
        onInit() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            let sSupplierID = oEvent.getParameter("arguments").SupplierID;
            this.getView().bindElement({
                path: "/Suppliers(" + sSupplierID + ")",
                parameters: {
                    expand: "Products"
                }
            });
        },
        
        
        onAddProduct: function (params) {
            if (!this.oMPDialog) {
				this.oMPDialog = this.loadFragment({
					name: "com.bootcamp.sapui5.finalproject.view.fragments.ProjectFormDialog"
				});
			}
			this.oMPDialog.then(function (oDialog) {
				this.oDialog = oDialog;
				this.oDialog.open();
			}.bind(this));
        },

        _closeDialog: function () {
			this.oDialog.close();
		},

        onChange: function (oEvent) {
            let oSource = oEvent.getSource()
            let sPropertyName = oSource.getProperty("name");
            let sValue = oSource.getValue();

            let oSupplierProductsModel = this.getView().getModel("SupplierProductsModel")

            let oCurrentData = oSupplierProductsModel.getProperty("/nameProduct")
            oCurrentData[sPropertyName] = sValue;
            oSupplierProductsModel.setProperty("/nameProduct", oCurrentData);
            
        },

        _onSave: function () {

            let oSupplierProductsModel = this.getView().getModel("SupplierProductsModel")
            let oCurrentData = oSupplierProductsModel.getProperty("/nameProduct")

            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            let sName = oResourceBundle.getText("name");
            MessageBox.alert(`Producto ${oCurrentData[sName]} creado correctamente`);

            this.oDialog.close();
        }
        
    });
});