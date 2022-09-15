using CatalogService from './cat-service';

annotate CatalogService.TestEntity with {

    CompanyCode @(Common : {
                            // Text: ,
                            // TextArrangement : ,
                           ValueList : {
        $Type          : 'Common.ValueListType',
        CollectionPath : 'I_CompanyCodeVH',
        Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                ValueListProperty : 'CompanyCode',
                LocalDataProperty : CompanyCode
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'CompanyCodeName',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'ControllingArea',
            }

        ]
    }});

    FiscalYear  @(Common : {ValueList : {
        $Type          : 'Common.ValueListType',
        CollectionPath : 'I_FiscalYear',
        Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                ValueListProperty : 'FiscalYear',
                LocalDataProperty : FiscalYear
            },
            {
                $Type             : 'Common.ValueListParameterInOut',
                ValueListProperty : 'CompanyCode',
                LocalDataProperty : CompanyCode
            },
        ]
    }});

    FiscalPeriod  @(Common : {ValueList : {
        $Type          : 'Common.ValueListType',
        CollectionPath : 'I_FiscalPeriod',
        Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                ValueListProperty : 'FiscalYear',
                LocalDataProperty : FiscalYear
            },
            {
                $Type             : 'Common.ValueListParameterInOut',
                ValueListProperty : 'CompanyCode',
                LocalDataProperty : CompanyCode
            },
            {
                $Type             : 'Common.ValueListParameterInOut',
                ValueListProperty : 'FiscalPeriod',
                LocalDataProperty : FiscalPeriod
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'FiscalPeriod_Text',
            }
        ]
    }});

};
