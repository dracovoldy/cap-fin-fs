// @cds.persistence.skip : true
@sap.creatable       : 'false'
@sap.updatable       : 'false'
@sap.deletable       : 'false'
@sap.addressable     : 'false'
@sap.content.version : '1'
@sap.semantics       : 'aggregate'
entity Node {
    key nodeID                        : UUID;
        hierarchyLevel                : Integer;
        parentNodeID                  : Integer;
        drillState                    : String;
        Structure                     : String;
        
        // Measures
        @sap.aggregation.role : 'measure'
        @sap.unit             : 'CompanyCodeCurrency'
        @sap.label            : 'Purchased Product Amount'
        @sap.filterable       : 'false'
        PurchasedProductAmount        : Decimal(24, 3);

        @sap.aggregation.role : 'measure'
        @sap.unit             : 'CompanyCodeCurrency'
        @sap.label            : 'Purchased Product Quantity'
        @sap.filterable       : 'false'
        PurchasedProductQuantity      : Decimal(31, 9);

        @sap.aggregation.role : 'measure'
        @sap.unit             : 'CompanyCodeCurrency'
        @sap.label            : 'Amount in Company Code Currency'
        @sap.filterable       : 'false'
        ProductionProprietaryAmount   : Decimal(24, 3);

        @sap.aggregation.role : 'measure'
        @sap.unit             : 'TargetUnit'
        @sap.label            : 'Quantity'
        @sap.filterable       : 'false'
        ProductionProprietaryQuantity : Decimal(31, 9);

        @sap.aggregation.role : 'measure'
        @sap.unit             : 'CompanyCodeCurrency'
        @sap.label            : 'Total Amount'
        @sap.filterable       : 'false'
        TotalAmount                   : Decimal(24, 3);
        @sap.aggregation.role : 'measure'
        @sap.unit             : 'TargetUnit'
        @sap.label            : 'Total Quantity'
        @sap.filterable       : 'false'
        TotalQuantity                 : Decimal(31, 9);

        // Units
        @sap.aggregation.role : 'dimension'
        @sap.label            : 'Company Code Currency'
        @sap.semantics        : 'currency-code'
        CompanyCodeCurrency           : String(5);

        @sap.aggregation.role : 'dimension'
        @sap.label            : 'TargetUnit'
        @sap.semantics        : 'unit-of-measure'
        TargetUnit                    : String(3);
}
