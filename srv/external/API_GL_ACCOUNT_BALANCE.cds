/* checksum : 6b65f506ec446fd0428669761e0d0deb */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service API_GL_ACCOUNT_BALANCE {};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Fiscal Year For Company Code Value Help'
@sap.value.list : 'true'
entity API_GL_ACCOUNT_BALANCE.C_FiscalYearForCompanyCodeVH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  @sap.value.list : 'standard'
  key CompanyCode : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Fiscal Year'
  key FiscalYear : String(4);
  @sap.display.format : 'Date'
  @sap.filter.restriction : 'single-value'
  @sap.label : 'Start of Fiscal Year'
  @sap.quickinfo : 'Start Date of Fiscal Year'
  FiscalYearStartDate : Date;
  @sap.display.format : 'Date'
  @sap.filter.restriction : 'single-value'
  @sap.label : 'End of Fiscal Year'
  @sap.quickinfo : 'End Date of Fiscal Year'
  FiscalYearEndDate : Date;
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Fiscal Year Period For Company Code'
@sap.value.list : 'true'
entity API_GL_ACCOUNT_BALANCE.C_FiscalYearPeriodForCoCodeVH {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  @sap.value.list : 'standard'
  key CompanyCode : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Fiscal Year'
  @sap.value.list : 'standard'
  key FiscalYear : String(4);
  @sap.display.format : 'NonNegative'
  @sap.text : 'FiscalPeriod_Text'
  @sap.label : 'Fiscal Period'
  key FiscalPeriod : String(3);
  @sap.label : 'Text'
  @sap.quickinfo : 'Period name long text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FiscalPeriod_Text : String(20);
  @sap.display.format : 'UpperCase'
  @sap.text : 'to_FiscalYearVariant/FiscalYearVariant_Text'
  @sap.label : 'Fiscal Year Variant'
  @sap.value.list : 'standard'
  FiscalYearVariant : String(2);
  @sap.display.format : 'Date'
  @sap.label : 'Start Fiscal Period'
  @sap.quickinfo : 'Start Date of Fiscal Period'
  @sap.value.list : 'standard'
  FiscalPeriodStartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'End of Fiscal Period'
  @sap.quickinfo : 'End Date of Fiscal Period'
  FiscalPeriodEndDate : Date;
  @cds.ambiguous : 'missing on condition?'
  to_FiscalPeriodStartDate : Association to API_GL_ACCOUNT_BALANCE.I_CalendarDate on to_FiscalPeriodStartDate.CalendarDate = FiscalPeriodStartDate;
  @cds.ambiguous : 'missing on condition?'
  to_FiscalYear : Association to API_GL_ACCOUNT_BALANCE.I_FiscalYearForCompanyCode on to_FiscalYear.CompanyCode = CompanyCode and to_FiscalYear.FiscalYear = FiscalYear;
  @cds.ambiguous : 'missing on condition?'
  to_FiscalYearVariant : Association to API_GL_ACCOUNT_BALANCE.I_FiscalYearVariant on to_FiscalYearVariant.FiscalYearVariant = FiscalYearVariant;
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Date'
entity API_GL_ACCOUNT_BALANCE.I_CalendarDate {
  @sap.display.format : 'Date'
  @sap.label : 'Calendar Date'
  key CalendarDate : Date;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Calendar Year'
  CalendarYear : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Calendar Quarter'
  CalendarQuarter : String(1);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Calendar Month'
  CalendarMonth : String(2);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Calendar Week'
  CalendarWeek : String(2);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Calendar Day'
  CalendarDay : String(2);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Year Month'
  YearMonth : String(6);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Year Quarter'
  YearQuarter : String(5);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Year Week'
  YearWeek : String(6);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Week Day'
  WeekDay : String(1);
  @sap.display.format : 'Date'
  @sap.label : 'First day of week date'
  FirstDayOfWeekDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'First Day of Month'
  @sap.quickinfo : 'First Day of Month Date'
  FirstDayOfMonthDate : Date;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Calendar day of year'
  CalendarDayOfYear : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Day of the year'
  @sap.quickinfo : 'Year Day'
  YearDay : String(7);
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Company Code'
@sap.value.list : 'true'
entity API_GL_ACCOUNT_BALANCE.I_CompanyCodeStdVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCodeName'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  CompanyCodeName : String(25);
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Company Code'
@sap.value.list : 'true'
entity API_GL_ACCOUNT_BALANCE.I_CompanyCodeVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'CompanyCodeName'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.label : 'Company Name'
  @sap.quickinfo : 'Name of Company Code or Company'
  CompanyCodeName : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Controlling Area'
  @sap.value.list : 'standard'
  ControllingArea : String(4);
  @sap.label : 'City'
  CityName : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Country/Region Key'
  Country : String(3);
  @sap.label : 'Currency'
  @sap.quickinfo : 'Currency Key'
  @sap.semantics : 'currency-code'
  Currency : String(5);
  @sap.label : 'Language Key'
  Language : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Chart of Accounts'
  ChartOfAccounts : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fiscal Year Variant'
  FiscalYearVariant : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company'
  Company : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Credit control area'
  CreditControlArea : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Alternative Chart of Accounts'
  @sap.quickinfo : 'Alternative Chart of Accounts for Country/Region'
  CountryChartOfAccounts : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'FM Area'
  @sap.quickinfo : 'Financial Management Area'
  FinancialManagementArea : String(4);
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Controlling Area'
@sap.value.list : 'true'
entity API_GL_ACCOUNT_BALANCE.I_ControllingAreaStdVH {
  @sap.display.format : 'UpperCase'
  @sap.text : 'ControllingAreaName'
  @sap.label : 'Controlling Area'
  key ControllingArea : String(4);
  @sap.label : 'Controlling Area Name'
  ControllingAreaName : String(25);
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'Fiscal Year for Company Code'
entity API_GL_ACCOUNT_BALANCE.I_FiscalYearForCompanyCode {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  @sap.value.list : 'standard'
  key CompanyCode : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Fiscal Year'
  key FiscalYear : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Start of Fiscal Year'
  @sap.quickinfo : 'Start Date of Fiscal Year'
  FiscalYearStartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'End of Fiscal Year'
  @sap.quickinfo : 'End Date of Fiscal Year'
  FiscalYearEndDate : Date;
};

@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.searchable : 'true'
@sap.content.version : '1'
@sap.label : 'Fiscal Year Variant'
entity API_GL_ACCOUNT_BALANCE.I_FiscalYearVariant {
  @sap.display.format : 'UpperCase'
  @sap.text : 'FiscalYearVariant_Text'
  @sap.label : 'Fiscal Year Variant'
  key FiscalYearVariant : String(2);
  @sap.label : 'Description'
  @sap.quickinfo : 'Description of fiscal year variant'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FiscalYearVariant_Text : String(30);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fscl Perd Equal Mnth'
  @sap.quickinfo : 'Indicator: Fiscal Period Is Equal Calendar Month'
  FiscalPeriodIsEqualMonth : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Year-dependent'
  @sap.quickinfo : 'Indicator: Fiscal year variants year-dependent ?'
  IsYearDependent : Boolean;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Posting period'
  @sap.quickinfo : 'Number of posting periods'
  PostingPeriodsNumberVal : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'No.special periods'
  @sap.quickinfo : 'Number of special periods'
  NumberOfSpecialPeriods : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fiscal Week Start'
  @sap.quickinfo : 'Flag: Fiscal Weeks Calculated from Start of Fiscal Year'
  FsclWeekStartIsFsclYearStart : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Weekly Calendar'
  @sap.quickinfo : 'Flag: Fiscal Year Variant as Week Calendar'
  FiscalCalendarIsWeekBased : Boolean;
};

@cds.persistence.skip : true
@sap.searchable: 'false'
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
  @sap.value.list : 'standard'
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
  @sap.label : 'Fiscal Period'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.value.list : 'standard'
  key P_Period : String(3);
  @sap.display.format : 'NonNegative'
  @sap.parameter : 'mandatory'
  @sap.label : 'Fiscal Year'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  @sap.value.list : 'standard'
  key P_Year : String(4);
  @cds.ambiguous : 'missing on condition?'
  Results : Association to many API_GL_ACCOUNT_BALANCE.YCDS_GLACQ01Results {  };
};

