/*global QUnit*/

sap.ui.define([
	"com/chevron/dcore/diaa/extensionvariables/ext/Custom",
    "com/chevron/dcore/diaa/extensionvariables/Component",
    "com/chevron/dcore/diaa/extensionvariables/model/models",
    "sap/ui/model/json/JSONModel",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit",
    "sap/ui/base/ManagedObject",
    "sap/ui/core/mvc/Controller"
], function (appController, Component, models, JSONModel, sinon, sinonQunit, ManagedObject, Controller) {
    "use strict";

    // QUnit.module("mockserver");

    //  QUnit.test("mockserver", function (assert) {
    //       var oMockserver = new  mockserver();
    //       oMockserver.init();
    //       assert.ok(oMockserver);  
    // });


    // QUnit.module("Component");

    //  QUnit.test("component", function (assert) {
    //       var oController = new  Component();
    //       oController.init();
    //       assert.ok(oController);  
    // });


    // QUnit.module("Main Controller");


    // // QUnit.test("controller method that uses getView and getDomRef", function (assert) {

    // //     var oController = new appController();
    // //     var oJsonModelStub = new JSONModel({});
    // //     var oDomElementStub = document.createElement("div");
    // //     var oViewStub = new ManagedObject({});
    // //     oViewStub.byId = function (sNeverUsed) {
    // //         return {
    // //             getDomRef: function () {
    // //                 return oDomElementStub;
    // //             }
    // //         }
    // //     };
    // //     oViewStub.setModel(oJsonModelStub);
    // //     var oGetViewStub = sinon.stub(Controller.prototype, "getView").returns(oViewStub);
    // //     // oJsonModelStub.setProperty("/newTodo", "some new item");
    // //     // oController.addTodo();
    // //     // assert.strictEqual(oJsonModelStub.getProperty("/todos").length, 1, "1 new todo item was added");
    // //     oGetViewStub.restore();

    // // });

    // QUnit.test("test the functions", function (assert) {
    //     var oAppController = new appController();
    //     assert.strictEqual(oAppController.onInit(), 0, "onInit Tested");
    //     assert.strictEqual(oAppController._onTableSelect(), 0, "tested table select");
    //     oAppController._setColumnPropertiesTY();
    //     oAppController._setColumnProperties();
    //     oAppController._onSave();
    //     oAppController._deselectRows();
    //     oAppController.onAfterRendering();
    //     assert.ok(oAppController);
    // });

    QUnit.module("createDeviceModel", {
        afterEach: function () {
            this.oDeviceModel.destroy();
        }
    });

    function isPhoneTestCase(assert, bIsPhone) {
        // Arrange
        this.stub(sap.ui.Device, "system", { phone: bIsPhone });

        // System under test
        this.oDeviceModel = models.createDeviceModel();

        // Assert
        assert.strictEqual(this.oDeviceModel.getData().system.phone, bIsPhone, "IsPhone property is correct");
    }

    QUnit.test("Should initialize a device model for desktop", function (assert) {
        isPhoneTestCase.call(this, assert, false);
    });

    QUnit.test("Should initialize a device model for phone", function (assert) {
        isPhoneTestCase.call(this, assert, true);
    });

    function isTouchTestCase(assert, bIsTouch) {
        // Arrange
        this.stub(sap.ui.Device, "support", { touch: bIsTouch });

        // System under test
        this.oDeviceModel = models.createDeviceModel();

        // Assert
        assert.strictEqual(this.oDeviceModel.getData().support.touch, bIsTouch, "IsTouch property is correct");
    }

    QUnit.test("Should initialize a device model for non touch devices", function (assert) {
        isTouchTestCase.call(this, assert, false);
    });

    QUnit.test("Should initialize a device model for touch devices", function (assert) {
        isTouchTestCase.call(this, assert, true);
    });

    QUnit.test("The binding mode of the device model should be one way", function (assert) {

        // System under test
        this.oDeviceModel = models.createDeviceModel();

        // Assert
        assert.strictEqual(this.oDeviceModel.getDefaultBindingMode(), "OneWay", "Binding mode is correct");
    });



});

