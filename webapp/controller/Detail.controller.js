sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
], function(Controller, Fragment) {
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
				// this._oMessageManager.registerObject(this.oView.byId("formContainer"), true);

				// MessageToast.show('Press "Save" to trigger validation.');
				// this.createMessagePopover();
			}.bind(this));
        },

        _closeDialog: function () {
			this.oDialog.close();
		},

        onValueHelpRequest: function () {
			var oView = this.getView();

			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "com.bootcamp.sapui5.finalproject.view.fragments.ValueHelpDialog",
					controller: this
				}).then(function (oValueHelpDialog){
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}
			this._pValueHelpDialog.then(function(oValueHelpDialog){
				this._configValueHelpDialog();
				oValueHelpDialog.open();
			}.bind(this));
		},

        _configValueHelpDialog: function () {
            var sInputValue = this.byId("productInput").getValue();
            var oModel = this.getView().getModel();
        
            // Llamar a la API para obtener los datos
            oModel.read("/Categories", {
                success: function (oData) {
                    var aProducts = oData.results || []; // Asegura que se obtienen los datos correctamente
        
                    aProducts.forEach(function (oProduct) {
                        oProduct.selected = (oProduct.Name === sInputValue);
                    });
        
                    // Guardar los datos en el modelo si es necesario
                    oModel.setProperty("/Categories", aProducts);
                },
                error: function (oError) {
                    console.error("Error al obtener Categories:", oError);
                }
            });
        }
        
    });
});