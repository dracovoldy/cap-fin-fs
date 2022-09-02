using {API_GL_ACCOUNT_BALANCE as API} from './external/API_GL_ACCOUNT_BALANCE';
using Node from '../db/data-model';

service CatalogService {
    @readonly
    @cds.persistence.skip : true
    // entity TestEntity as projection on API.YCDS_GLACQ01Results;
    entity TestEntity {
        key nodeID                        : Integer;
            hierarchyLevel                : Integer;
            parentNodeID                  : Integer;
            drillState                    : String;
            Structure                     : String;

            // Dimensions
            @sap.aggregation.role : 'dimension'
            @sap.display.format   : 'UpperCase'
            @sap.label            : 'Company Code'
            CompanyCode                   : String(4);

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
            @sap.label            : 'Production Proprietary Amount'
            @sap.filterable       : 'false'
            ProductionProprietaryAmount   : Decimal(24, 3);

            @sap.aggregation.role : 'measure'
            @sap.unit             : 'TargetUnit'
            @sap.label            : 'Production Proprietary Quantity'
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

    @readonly
    entity TestNode as projection on Node;

};
