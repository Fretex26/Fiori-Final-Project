sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/finalproject/utils/ProjectHelper",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
], (Controller, ProjectHelper, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Project", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter()
            this.tableSuppliers()

            const oView = this.getView();
            oView.setModel(new JSONModel({
				rowMode: "Fixed"
			}), "ui");
        },

        tableSuppliers: async function () {
            try {
                let oDatos = await ProjectHelper.getDataSuppliers();
                await ProjectHelper.setSuppliersModel(this, oDatos[0].results)
            } catch (error) {
                MessageBox.error("Error al obtener productos para tabla.");
                console.error(error);
            }
        },

        onChange: async function (oEvent) {
            
            let oFilter = []
            let oSource = oEvent.getSource()
            let oTable = this.getView().byId("suppliersTable")
            let oBinding = oTable.getBinding("rows")
            
            if(oSource.getValue()){
                oFilter = new Filter("SupplierID", FilterOperator.EQ, oSource.getValue())
            }
            
            oBinding.filter(oFilter)
        },

        onMultiInputChange: function (oControlEvent) {
            let oSource = oControlEvent.getParameters().addedTokens
            let oRemovedSource = oControlEvent.getParameters().removedTokens

            let oModel = this.getOwnerComponent().getModel('LocalDataModel')
            let aSelectedKeyMulti = oModel.getProperty('/selectedKeyMulti')

            if (oSource.length) {
                oSource.map((token)=>{
                    aSelectedKeyMulti.push(token.getKey())
                })
            }

            if (oRemovedSource.length) {
                oRemovedSource.map((token)=>{
                    const elementIndex = aSelectedKeyMulti.indexOf(token.getKey());
                    if (elementIndex !== -1) {
                        aSelectedKeyMulti.splice(elementIndex, 1);
                    }
                })
            }
            
        },

        onFilter: async function () {
            
            let oFilter = []
            let values = this.getOwnerComponent().getModel("LocalDataModel").getData()            

            let oTable = this.getView().byId("suppliersTable")
            let oBinding = oTable.getBinding("rows")

            if(values?.selectedKeyMulti.length){
                values.selectedKeyMulti.forEach(element => {
                    oFilter.push(new Filter("SupplierID", FilterOperator.EQ, element))
                });
            }

            oBinding.filter(oFilter)
        },

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource();
            let oContext = oSource.getBindingContext("SuppliersList");
        
            let supplierID = oContext.getProperty("SupplierID");
            this.oRouter.navTo("detail", { SupplierID: supplierID });
        },
        
    });
});