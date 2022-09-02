/* checksum : 3f3f19db4bfa1c6a1291b60fa2cf08da */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service API_GL_ACCOUNT_BALANCE {};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
@sap.semantics : 'aggregate'
@sap.label : 'External API for EXT00609'
entity API_GL_ACCOUNT_BALANCE.YCDS_GLACQ01Results {
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ID : LargeString;
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Source Ledger'
  SourceLedger : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  CompanyCode : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'G/L Account'
  GLAccount : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Fiscal Year'
  FiscalYear : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Product'
  @sap.quickinfo : 'Product Number'
  ProductCode : String(40);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Chart of Accounts'
  ChartOfAccounts : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Controlling Area'
  ControllingArea : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.text : 'ProductGroupName'
  @sap.label : 'Product Group'
  ProductGroup : String(9);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Fiscal Period'
  FiscalPeriod : String(3);
  @sap.label : 'Short Text'
  @sap.quickinfo : 'G/L Account Short Text'
  GLAccountName : String(20);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Cost Center'
  CostCenter : String(10);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'UpperCase'
  @sap.label : 'Journal Entry Type'
  AccountingDocumentType : String(2);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Company Code Currency'
  @sap.semantics : 'currency-code'
  CompanyCodeCurrency : String(5);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'AmountInCompanyCodeCurrency'
  @sap.filterable : 'false'
  AmountInCompanyCodeCurrency : Decimal(24, 3);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Base Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  BaseUnit : String(3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  Quantity : Decimal(31, 9);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'Low'
  CBO_GLAccountGroup : String(255);
  @sap.aggregation.role : 'dimension'
  @sap.display.format : 'NonNegative'
  @sap.label : 'Numb'
  CBO_GLAccountNumb : String(4);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'ProprietaryPurchasedFlag'
  ProprietaryPurchasedFlag : String(19);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  OpeningInventoryAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  OpeningInventoryQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  ProductionProprietaryAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  ProductionProprietaryQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  PurchasesAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  PurchasesQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  SalesPurchasedAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  SalesPurchasedQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  SalesProprietaryAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  SalesProprietaryQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  EndingInventoryAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  EndingInventoryQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  InventoryChangeAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  InventoryChangeQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Amount in Company Code Currency'
  @sap.filterable : 'false'
  StatAccountBalancingAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Quantity'
  @sap.filterable : 'false'
  StatAccountBalancingQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Proprietary Product Amount'
  @sap.filterable : 'false'
  ProprietaryProductAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Proprietary Product Quantity'
  @sap.filterable : 'false'
  ProprietaryProductQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'High'
  CBO_ConversionFactor1 : String(255);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'CBO_ConversionFactor2'
  CBO_ConversionFactor2 : Decimal(12, 6);
  @sap.aggregation.role : 'dimension'
  @sap.label : 'TargetUnit'
  @sap.semantics : 'unit-of-measure'
  TargetUnit : String(3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Purchased Product Amount'
  @sap.filterable : 'false'
  PurchasedProductAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Purchased Product Quantity'
  @sap.filterable : 'false'
  PurchasedProductQuantity : Decimal(31, 9);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'CompanyCodeCurrency'
  @sap.label : 'Total Amount'
  @sap.filterable : 'false'
  TotalAmount : Decimal(24, 3);
  @sap.aggregation.role : 'measure'
  @sap.unit : 'TargetUnit'
  @sap.label : 'Total Quantity'
  @sap.filterable : 'false'
  TotalQuantity : Decimal(31, 9);
  @sap.label : 'Product Group Description'
  ProductGroupName : String(20);
  @sap.filterable : 'false'
  @cds.ambiguous : 'missing on condition?'
  Parameters : Association to API_GL_ACCOUNT_BALANCE.YCDS_GLACQ01 {  };
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.content.version : '1'
@sap.semantics : 'parameters'
entity API_GL_ACCOUNT_BALANCE.YCDS_GLACQ01 {
  @sap.display.format : 'NonNegative'
  @sap.parameter : 'mandatory'
  @sap.label : 'Period'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key P_Period : String(3);
  @sap.display.format : 'NonNegative'
  @sap.parameter : 'mandatory'
  @sap.label : 'Year'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key P_Year : String(4);
  @cds.ambiguous : 'missing on condition?'
  Results : Association to many API_GL_ACCOUNT_BALANCE.YCDS_GLACQ01Results {  };
};

