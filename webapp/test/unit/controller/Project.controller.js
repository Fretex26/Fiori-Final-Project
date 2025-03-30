/*global QUnit*/

sap.ui.define([
	"com/bootcamp/sapui5/finalproject/controller/Project.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Project Controller");

	QUnit.test("I should test the Project controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
