sap.ui.controller("com.chevron.dcore.anl.glaccbalances.ext.ListReportExtension", {
	onInit: function() {
		// var oSmartFilterBar = this.getView().byId("listReportFilter");
		// oSmartFilterBar.addAggregation("customData",
		// 	new sap.ui.core.CustomData({
		// 		key: "executeStandardVariantOnSelect",
		// 		value: true
		// 	})
		// );
        console.log('here');
	},

    // onMassAction: function (){
    //     if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
    //         var oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation"); 
    //         oCrossAppNav.toExternal({
    //             target : { semanticObject : "analyticsvariablesmass", action : "maintain" },
    //         })
    //     }
    // }

	// onInitSmartFilterBarExtension: function(oEvent) {
	// 	var oSmartFilterBar = oEvent.getSource();
	// 	var liveMode = oSmartFilterBar.getLiveMode();
	// 	if(!liveMode) {
	// 		oSmartFilterBar.setLiveMode(true);
	// 	}
	// }
});