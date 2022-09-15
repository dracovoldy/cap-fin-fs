/* checksum : 08db329791d52e7ee6327eb126af88c6 */
@cds.external                : true
@m.IsDefaultEntityContainer  : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats       : 'atom json xlsx'
service CBO_ANALYTICS {};

// type CBO_ANALYTICS.OBJECT {
//     SAP_UUID : UUID;
//     Name     : String(40);
//     Low      : String(255);
//     High     : String(255);
//     Med      : String(255);
// };

// action CBO_ANALYTICS.upsert(param : CBO_ANALYTICS.OBJECT) returns CBO_ANALYTICS.ZZ1_ACCOUNTUNITMAPPING;

@cds.persistence.skip : true
@sap.creatable        : 'false'
@sap.updatable        : 'false'
@sap.deletable        : 'false'
@sap.addressable      : 'false'
@sap.content.version  : '1'
@sap.label            : 'User'
entity CBO_ANALYTICS.P_Scbo_User {
        @sap.display.format : 'UpperCase'
        @sap.label          : 'User'
        @sap.quickinfo      : 'User Name in User Master Record'
    key name        : String(12);
        @sap.label          : 'Description'
        @sap.quickinfo      : 'Description of the Technical User Account'
        description : String(80);
};

@cds.persistence.skip : true
@sap.searchable       : 'true'
@sap.content.version  : '1'
@sap.label            : 'AccountUnitMapping'
entity CBO_ANALYTICS.ZZ1_ACCOUNTUNITMAPPING {
        @sap.label          : 'UUID'
        @sap.quickinfo      : '16 Byte UUID in 16 Bytes (Raw Format)'
    key SAP_UUID                     : UUID;
        @sap.label          : 'Name'
        Name                         : String(40);
        @sap.label          : 'Low'
        Low                          : String(255);
        @sap.label          : 'High'
        High                         : String(255);
        @sap.label          : 'Med'
        Med                          : String(255);
        @sap.label          : 'Code'
        Code                          : String(20);
        @odata.Type         : 'Edm.DateTimeOffset'
        // @odata.Type         : 'Edm.DateTime'
        @odata.Precision    : 7
        @sap.label          : 'Created On'
        @sap.creatable      : 'false'
        @sap.updatable      : 'false'
        SAP_CreatedDateTime          : Timestamp;
        @sap.display.format : 'UpperCase'
        @sap.text           : 'SAP_CreatedByUser_Text'
        @sap.label          : 'Created By'
        @sap.creatable      : 'false'
        @sap.updatable      : 'false'
        SAP_CreatedByUser            : String(12);
        @sap.label          : 'Description'
        @sap.quickinfo      : 'Description of the Technical User Account'
        @sap.creatable      : 'false'
        @sap.updatable      : 'false'
        SAP_CreatedByUser_Text       : String(80);
        @odata.Type         : 'Edm.DateTimeOffset'
        // @odata.Type         : 'Edm.DateTime'
        @odata.Precision    : 7
        @sap.label          : 'Last Changed On'
        @sap.creatable      : 'false'
        @sap.updatable      : 'false'
        SAP_LastChangedDateTime      : Timestamp;
        @sap.display.format : 'UpperCase'
        @sap.text           : 'SAP_LastChangedByUser_Text'
        @sap.label          : 'Last Changed By'
        @sap.creatable      : 'false'
        @sap.updatable      : 'false'
        SAP_LastChangedByUser        : String(12);
        @sap.label          : 'Description'
        @sap.quickinfo      : 'Description of the Technical User Account'
        @sap.creatable      : 'false'
        @sap.updatable      : 'false'
        SAP_LastChangedByUser_Text   : String(80);
        @cds.ambiguous      : 'missing on condition?'
        to_SAPSysAdminDataChangeUser : Association to CBO_ANALYTICS.P_Scbo_User {};
        @cds.ambiguous      : 'missing on condition?'
        to_SAPSysAdminDataCreateUser : Association to CBO_ANALYTICS.P_Scbo_User {};
};
