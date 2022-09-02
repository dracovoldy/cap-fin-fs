const cds = require('@sap/cds');
const isEqual = require('lodash.isequal');

let getQueryArgs = (query) => {
    if (!query.SELECT.where) {
        return { P_Period: null, P_Year: null }
    }
    const WHERE = query.SELECT.where;
    const FiscalYear = { ref: ['FiscalYear'] };
    const FiscalPeriod = { ref: ['FiscalPeriod'] };

    let FiscalYearVal, FiscalPeriodVal;

    for (let index = 0; index < WHERE.length; index++) {
        if (isEqual(WHERE[index], FiscalYear)) {
            FiscalYearVal = WHERE[index + 2].val;
        } else if (isEqual(WHERE[index], FiscalPeriod)) {
            FiscalPeriodVal = WHERE[index + 2].val;
        }

        if (FiscalPeriodVal && FiscalYearVal) {
            break;
        }
    }

    return { P_Period: FiscalPeriodVal, P_Year: FiscalYearVal }
}

let getQueryFilters = (query) => {
    if (!query.SELECT.where) {
        return { CompanyCode: null }
    }
    const WHERE = query.SELECT.where;
    // console.log(query.SELECT.where)
    const CompanyCode = { ref: ['CompanyCode'] };
    const hierarchyLevel = { ref: ['hierarchyLevel'] };
    const parentNodeID = { ref: ['parentNodeID'] };

    let CompanyCode_Val, hierarchyLevel_Val, parentNodeID_Val;

    for (let index = 0; index < WHERE.length; index++) {
        if (isEqual(WHERE[index], CompanyCode)) {
            CompanyCode_Val = WHERE[index + 2].val;
        }
        if (isEqual(WHERE[index], hierarchyLevel)) {
            hierarchyLevel_Val = WHERE[index + 2].val;
        }
        if (isEqual(WHERE[index], parentNodeID)) {
            parentNodeID_Val = WHERE[index + 2].val;
        }
    }

    let filters = {
        CompanyCode: CompanyCode_Val,
        hierarchyLevel: hierarchyLevel_Val,
        parentNodeID: parentNodeID_Val,
    }
    // console.log('filters identified', filters)
    return filters;
}

const HIERARCHY_STRUCTURE = {
    "Open Inventory Proprietary": [
        { "GLAccount": "51101000" }
    ],
    "Open Inventory Purchased": [
        { "GLAccount": "16100000" },
        { "GLAccount": "16100000" },
    ],
    "Production Proprietary": [
        { "GLAccount": "51101000" },
        { "GLAccount": "51201000" },
        { "GLAccount": "61001000" },
    ],
    "Purchases": [
        { "GLAccount": "60201000" },
        { "GLAccount": "60291000" },
    ],
    "Sales Purchased": [
        { "GLAccount": "50101000" },
        { "GLAccount": "50201040" },
        { "GLAccount": "50301000" },
    ],
    "Sales Proprietary": [
        { "GLAccount": "50101000" },
        { "GLAccount": "50101300" },
        { "GLAccount": "50201040" },
        { "GLAccount": "50301000" },
        { "GLAccount": "51901000" },
        { "GLAccount": "51901100" },
    ],
    "Ending Inventory Proprietary": [
        { "GLAccount": "16100100" },
    ],
    "Ending Inventory Purchased": [
        { "GLAccount": "16100200" },
        { "GLAccount": "16100000" },
    ],
    "Inventory Change": [
        { "GLAccount": "62006300" },
        { "GLAccount": "62090000" },
    ],
    "Stat Account Balancing": [
        { "GLAccount": "51101000" },
        { "GLAccount": "51201000" },
        { "GLAccount": "51301000" },
        { "GLAccount": "51401000" },
    ],
}

let createStructure = (HIERARCHY_STRUCTURE) => {
    // iterate on level 0
    let HIERARCY_KEYS = Object.keys(HIERARCHY_STRUCTURE);
    let STRUCT = [];
    // console.log(HIERARCHY_STRUCTURE);
    let idx = 0;
    HIERARCY_KEYS.forEach(element => {
        STRUCT.push({
            nodeID: idx,
            parentNodeID: null,
            hierarchyLevel: 0,
            drillState: "expanded",
            Structure: element,
            "ProductionProprietaryAmount": 0,
            "ProductionProprietaryQuantity": 0,
            "PurchasedProductAmount": 0,
            "PurchasedProductQuantity": 0,
            "TotalAmount": 0,
            "TotalQuantity": 0,
            "TargetUnit": null,
            "CompanyCodeCurrency": null,
        });
        idx++;
    });
    // console.log(STRUCT);

    let FINAL_STRUCT = [...STRUCT];

    // iterate on level 1
    STRUCT.forEach((element, index) => {

        HIERARCHY_STRUCTURE[HIERARCY_KEYS[index]].forEach((st_ele, st_idx) => {
            FINAL_STRUCT.push({
                nodeID: idx,
                parentNodeID: index,
                hierarchyLevel: 1,
                drillState: "leaf",
                Structure: st_ele.GLAccount,
                "ProductionProprietaryAmount": 0,
                "ProductionProprietaryQuantity": 0,
                "PurchasedProductAmount": 0,
                "PurchasedProductQuantity": 0,
                "TotalAmount": 0,
                "TotalQuantity": 0,
                "TargetUnit": null,
                "CompanyCodeCurrency": null,

            });
            idx++
        });
    });
    // console.log(FINAL_STRUCT);
    return { FINAL_STRUCT };

}

// const HIERARCHY_STRUCTURE = [
//     "Open Inventory Proprietary",
//     "Open Inventory Purchased",
//     "Production Proprietary",
//     "Purchases",
//     "Sales Purchased",
//     "Sales Proprietary",
//     "Ending Inventory Proprietary",
//     "Ending Inventory Purchased",
//     "Inventory Change",
//     "Stat Account Balancing",
// ]

module.exports = cds.service.impl(async function () {
    const { TestEntity } = this.entities;

    const service = await cds.connect.to('API_GL_ACCOUNT_BALANCE');

    this.on(["READ"], TestEntity, async req => {
        console.log(req.query)

        const { P_Period, P_Year } = getQueryArgs(req.query);
        const { CompanyCode, hierarchyLevel, parentNodeID } = getQueryFilters(req.query);

        // let internal_results = [];
        // let HIERARCY_KEYS = Object.keys(HIERARCHY_STRUCTURE);

        let query = `YCDS_GLACQ01(P_Period='${P_Period}',P_Year='${P_Year}')/Results`

        if (!P_Period || !P_Year) {
            query = `YCDS_GLACQ01(P_Period='007',P_Year='2022')/Results`
            // return empty set if parameters are not present
            // return [];
        }

        if (CompanyCode) {
            query = query + `?$filter=CompanyCode eq '${CompanyCode}'`
        } else {
            // query = query + `?$filter=CompanyCode eq '3255'`
            return []
        }

        let query_level_0 = query + `&$select=CBO_GLAccountGroup,TotalAmount,TotalQuantity,ProductionProprietaryAmount,ProductionProprietaryQuantity,PurchasedProductAmount,PurchasedProductQuantity,CompanyCodeCurrency,TargetUnit`
        let query_level_1 = query + `&$select=CBO_GLAccountGroup,GLAccount,TotalAmount,TotalQuantity,ProductionProprietaryAmount,ProductionProprietaryQuantity,PurchasedProductAmount,PurchasedProductQuantity,CompanyCodeCurrency,TargetUnit`

        let results_level_0 = await service.tx(req).send('GET', query_level_0);
        let results_level_1 = await service.tx(req).send('GET', query_level_1);

        let { FINAL_STRUCT: STRUCT } = createStructure(HIERARCHY_STRUCTURE);

        // console.log(STRUCT);

        // level 0 merge
        let res_level_0 = STRUCT.filter(ele => ele.hierarchyLevel === 0 ? true : false)
            .map(ele => {

                for (let i = 0; i < results_level_0.length; i++) {
                    // const element = array[i];
                    if (results_level_0[i].CBO_GLAccountGroup === ele.Structure) {
                        ele.ProductionProprietaryAmount = parseFloat(results_level_0[i].ProductionProprietaryAmount);
                        ele.ProductionProprietaryQuantity = parseFloat(results_level_0[i].ProductionProprietaryQuantity);
                        ele.PurchasedProductAmount = parseFloat(results_level_0[i].PurchasedProductAmount);
                        ele.PurchasedProductQuantity = parseFloat(results_level_0[i].PurchasedProductQuantity);
                        ele.TotalAmount = parseFloat(results_level_0[i].TotalAmount);
                        ele.TotalQuantity = parseFloat(results_level_0[i].TotalQuantity);
                        ele.TargetUnit = results_level_0[i].TargetUnit;
                        ele.CompanyCodeCurrency = results_level_0[i].CompanyCodeCurrency;
                        break;
                    }
                }

                return ele;
            });

        //  level 1 merge
        let res_level_1 = STRUCT.filter(ele => ele.hierarchyLevel === 1 ? true : false)
            .map(ele => {

                for (let i = 0; i < results_level_1.length; i++) {
                    // const element = array[i];
                    if (results_level_1[i].GLAccount === ele.Structure) {
                        ele.ProductionProprietaryAmount = parseFloat(results_level_1[i].ProductionProprietaryAmount);
                        ele.ProductionProprietaryQuantity = parseFloat(results_level_1[i].ProductionProprietaryQuantity);
                        ele.PurchasedProductAmount = parseFloat(results_level_1[i].PurchasedProductAmount);
                        ele.PurchasedProductQuantity = parseFloat(results_level_1[i].PurchasedProductQuantity);
                        ele.TotalAmount = parseFloat(results_level_1[i].TotalAmount);
                        ele.TotalQuantity = parseFloat(results_level_1[i].TotalQuantity);
                        ele.TargetUnit = results_level_1[i].TargetUnit;
                        ele.CompanyCodeCurrency = results_level_1[i].CompanyCodeCurrency;
                        break;
                    }
                }

                return ele;
            });

        let merged_res = [...res_level_0, ...res_level_1];

        if (hierarchyLevel === 0) {
            res_level_0['$count'] = res_level_0.length
            return res_level_0;
        }
        // console.log('parentNode: ', parentNodeID)
        // console.log('final merge: ', merged_res)
        if (parentNodeID >= 0) {
            console.log(parentNodeID);
            // let final_res_level_1 = merged_res.filter(ele => ele.parentNodeID === parentNodeID ? true : false);
            let final_res_level_1 = [];

            for (let idx = 0; idx < merged_res.length; idx++) {
                if(merged_res[idx].parentNodeID === parentNodeID) {
                    final_res_level_1.push(merged_res[idx]);
                }
            }

            final_res_level_1['$count'] = final_res_level_1.length
            // console.log(final_res_level_1);
            return final_res_level_1;
        }

        // LEVEL 0 - GL Accounts Groups
        // if (hierarchyLevel === 0) {
        //     internal_results = HIERARCY_KEYS.map((key, index) => {

        //         let obj = {
        //             "nodeID": index,
        //             "hierarchyLevel": 0,
        //             "parentNodeID": null,
        //             "drillState": 'expanded',
        //             "Structure": key,
        //             "ProductionProprietaryAmount": 0,
        //             "ProductionProprietaryQuantity": 0,
        //             "PurchasedProductAmount": 0,
        //             "PurchasedProductQuantity": 0,
        //             "TotalAmount": 0,
        //             "TotalQuantity": 0,
        //             "TargetUnit": null,
        //             "CompanyCodeCurrency": null,
        //         }
        //         return obj;
        //     });

        //     query = query + `&$select=CBO_GLAccountGroup,TotalAmount,TotalQuantity,ProductionProprietaryAmount,ProductionProprietaryQuantity,PurchasedProductAmount,PurchasedProductQuantity,CompanyCodeCurrency,TargetUnit`
        //     console.log(`query to S4`, query);
        //     let results = await service.tx(req).send('GET', query)

        //     internal_results = internal_results.map((obj, index) => {

        //         for (let i = 0; i < results.length; i++) {
        //             // const element = array[i];
        //             if (results[i].CBO_GLAccountGroup === obj.Structure) {
        //                 obj.ProductionProprietaryAmount = parseFloat(results[i].ProductionProprietaryAmount);
        //                 obj.ProductionProprietaryQuantity = parseFloat(results[i].ProductionProprietaryQuantity);
        //                 obj.PurchasedProductAmount = parseFloat(results[i].PurchasedProductAmount);
        //                 obj.PurchasedProductQuantity = parseFloat(results[i].PurchasedProductQuantity);
        //                 obj.TotalAmount = parseFloat(results[i].TotalAmount);
        //                 obj.TotalQuantity = parseFloat(results[i].TotalQuantity);
        //                 obj.TargetUnit = results[i].TargetUnit;
        //                 obj.CompanyCodeCurrency = results[i].CompanyCodeCurrency;
        //                 break;
        //             }
        //         }

        //         return obj;
        //     });
        //     // console.log(`in internal calc 2`, internal_results);
        //     internal_results['$count'] = internal_results.length
        //     return internal_results;

        // }

        // // // LEVEL 1 - GL Accounts
        // if (parentNodeID) {
        //     let level1_array = HIERARCHY_STRUCTURE[HIERARCY_KEYS[parentNodeID]];
        // //     console.log(level1_array)
        // //     return []
        // // }

        //     level1_array = level1_array.map((item, index)=> {

        //         let obj = {
        //             "nodeID": parentNodeID + index,
        //             "hierarchyLevel": 1,
        //             "parentNodeID": parentNodeID,
        //             "drillState": 'leaf',
        //             "Structure": item.GLAccount,
        //             "ProductionProprietaryAmount": 0,
        //             "ProductionProprietaryQuantity": 0,
        //             "PurchasedProductAmount": 0,
        //             "PurchasedProductQuantity": 0,
        //             "TotalAmount": 0,
        //             "TotalQuantity": 0,
        //             "TargetUnit": null,
        //             "CompanyCodeCurrency": null,
        //         }
        //         return obj;
        //     });
        //     query = query + ` and CBO_GLAccountGroup eq '${HIERARCY_KEYS[parentNodeID]}'`
        //     query = query + `&$select=CBO_GLAccountGroup,GLAccount,TotalAmount,TotalQuantity,ProductionProprietaryAmount,ProductionProprietaryQuantity,PurchasedProductAmount,PurchasedProductQuantity,CompanyCodeCurrency,TargetUnit`
        //     console.log(`query to S4`, query);
        //     // let results = await service.tx(req).send('GET', query)

        //     // level1_array = level1_array.map((obj, index) => {

        //     //     for (let i = 0; i < results.length; i++) {
        //     //         // const element = array[i];
        //     //         if (results[i].GLAccount === obj.GLAccount) {
        //     //             obj.ProductionProprietaryAmount = parseFloat(results[i].ProductionProprietaryAmount);
        //     //             obj.ProductionProprietaryQuantity = parseFloat(results[i].ProductionProprietaryQuantity);
        //     //             obj.PurchasedProductAmount = parseFloat(results[i].PurchasedProductAmount);
        //     //             obj.PurchasedProductQuantity = parseFloat(results[i].PurchasedProductQuantity);
        //     //             obj.TotalAmount = parseFloat(results[i].TotalAmount);
        //     //             obj.TotalQuantity = parseFloat(results[i].TotalQuantity);
        //     //             obj.TargetUnit = results[i].TargetUnit;
        //     //             obj.CompanyCodeCurrency = results[i].CompanyCodeCurrency;
        //     //             break;
        //     //         }
        //     //     }

        //     //     return obj;
        //     // });
        //     // console.log(`in internal calc 2`, internal_results);
        //     // level1_array['$count'] = level1_array.length
        //     return level1_array;

        // }

        // console.log(query)

        // let results = await service.tx(req).send('GET', query)
        // // let results = await service.tx(req).run(SELECT.from(`TestEntity(P_Period:'007', P_Year:'2022')`));
        // console.log(results)
        // return results;

    });

});