sap.ui.define([
    "com/bootcamp/sapui5/finalproject/utils/ProjectService",
	'sap/ui/model/json/JSONModel'
], function (ProjectService, JSONModel) {
    "use strict";

    return{
        init: function (oNorthwindModel) {
            this._oNorthwindModel = oNorthwindModel 
        },

        getDataSuppliers: async function (oFilters) {
            return ProjectService.readSuppliers(this._oNorthwindModel, oFilters)
        },

        setSuppliersModel: async function (oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel('SuppliersList');
            if(!oListModel){
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, "SuppliersList");  
                oListModel = oController.getOwnerComponent().getModel('SuppliersList');
            }

            oListModel.setData(oDatos);
        },

        setInitModelLocalData: function (oComponent) { 
            oComponent.setModel(new JSONModel({
                selectedKeyMulti:[]
            }), 'LocalDataModel')
        },

        setSupplierProductsData: function (oComponent) { 
            oComponent.setModel(new JSONModel({
                nameProduct:{}
            }), 'SupplierProductsModel')
        }
    }
})