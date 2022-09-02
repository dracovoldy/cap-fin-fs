/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/chevron/dcore/diaa/extensionvariables/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
