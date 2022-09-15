using CatalogService from './cat-service';

annotate CatalogService.TestNode {
    nodeID         @sap.hierarchy.node.for;
    hierarchyLevel @sap.hierarchy.level.for;
    parentNodeID   @sap.hierarchy.parent.node.for;
    drillState     @sap.hierarchy.drill.state.for;
    // @Semantics.amount.currencyCode: 'CompanyCodeCurrency'
    PurchasedProductAmount;
    // @Semantics.currencyCode
    CompanyCodeCurrency;
}

annotate CatalogService.TestNode with @(UI : {
    Identification  : [{Value : Structure}],
    SelectionFields : [Structure],
    LineItem        : [
        {
            $Type : 'UI.DataField',
            Value : Structure,
            Label : 'Structure'
        },
        {
            $Type : 'UI.DataField',
            Value : PurchasedProductAmount,
            Label : 'Purchased Product Amount'
        },
        {
            $Type : 'UI.DataField',
            Value : PurchasedProductQuantity,
            Label : 'Purchased Product Quantity'
        },
    // {
    //     $Type : 'UI.DataField',
    //     Value : CompanyCodeCurrency,
    //     Label : 'Compancy Code Currency',
    // }
    ],
    HeaderInfo      : {
        $Type          : 'UI.HeaderInfoType',
        TypeName       : 'Node',
        TypeNamePlural : 'Nodes',
        Title          : {Value : Structure},
        Description    : {Value : Structure}
    }
});

annotate CatalogService.TestEntity {
    nodeID         @sap.hierarchy.node.for;
    hierarchyLevel @sap.hierarchy.level.for;
    parentNodeID   @sap.hierarchy.parent.node.for;
    drillState     @sap.hierarchy.drill.state.for;
// @Semantics.amount.currencyCode: 'CompanyCodeCurrency'
// PurchasedProductAmount;
// @Semantics.currencyCode
// CompanyCodeCurrency;
}

annotate CatalogService.TestEntity with @(UI : {
    Identification  : [{Value : Structure}],
    SelectionFields : [
        CompanyCode,
        FiscalYear,
        FiscalPeriod
    ],
    // Table Line Items & default order
    LineItem        : [
        {
            $Type : 'UI.DataField',
            Value : Structure,
            Label : 'Structure'
        },
        {
            $Type : 'UI.DataField',
            Value : PurchasedProductAmount,
            Label : 'Purchased Product Amount'
        },
        {
            $Type : 'UI.DataField',
            Value : PurchasedProductQuantity,
            Label : 'Purchased Product Quantity'
        },
        {
            $Type : 'UI.DataField',
            Value : ProductionProprietaryAmount,
            Label : 'Production Proprietary Amount'
        },
        {
            $Type : 'UI.DataField',
            Value : ProductionProprietaryQuantity,
            Label : 'Production Proprietary Quantity'
        },
        {
            $Type : 'UI.DataField',
            Value : TotalAmount,
            Label : 'Total Amount'
        },
        {
            $Type : 'UI.DataField',
            Value : TotalQuantity,
            Label : 'Total Quantity'
        },
        // {
        //     $Type : 'UI.DataField',
        //     Value : nodeID,
        //     Label : 'Node ID',
        //     ![@UI.Hidden]
        // }
    ],
    HeaderInfo      : {
        $Type          : 'UI.HeaderInfoType',
        TypeName       : 'Node',
        TypeNamePlural : 'Nodes',
        Title          : {Value : Structure},
        Description    : {Value : Structure}
    }
});

// Set Required filters in Filterbar
annotate CatalogService.TestEntity with @(Capabilities : {FilterRestrictions : {
    $Type              : 'Capabilities.FilterRestrictionsType',
    RequiredProperties : [
        CompanyCode,
        FiscalYear,
        FiscalPeriod,
    ],
}});
