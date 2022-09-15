'use strict';
const cds = require('@sap/cds');
const isEqual = require('lodash.isequal');
const sortBy = require('lodash.sortby');
const fs = require('fs');

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
    // console.log('filters identified', filters )
    return filters;
}

let getQueryColumns = (query) => {
    // if (!query.SELECT.columns) {
    //     return { CompanyCode: null }
    // }
    const WHERE = query.SELECT.columns;
    // console.log(query.SELECT.where)
    const ProductGroup = { ref: ['ProductGroup'] };
    const ProductGroupName = { ref: ['ProductGroupName'] };
    // const parentNodeID = { ref: ['parentNodeID'] };

    let ProductGroup_Val, ProductGroupName_Val;
    let found = false;
    for (let index = 0; index < WHERE.length; index++) {
        if (isEqual(WHERE[index], ProductGroup)) {
            found = true;
        }
        if (isEqual(WHERE[index], ProductGroupName)) {
            found = true;
        }

    }

    let filters = {
        ProductGroup: found,
        ProductGroupName: found,
    }
    // console.log('filters identified', filters )
    return filters;
}

const HIERARCHY_STRUCTURE = [
    {
        name: "Open Inventory Proprietary",
        key: "OpenInventoryProprietary",
        type: "static",
        nodes: [
            { "GLAccount": "16100100" }
        ]
    },
    {
        name: "Open Inventory Purchased",
        key: "OpenInventoryPurchased",
        type: "static",
        nodes: [
            { "GLAccount": "16100200" },
            { "GLAccount": "16100000" },
        ]
    },
    {
        name: "Production Proprietary",
        key: "ProductionProprietary",
        type: "static",
        nodes: [
            { "GLAccount": "51101000" },
            { "GLAccount": "51201000" },
            { "GLAccount": "51301000" },
            { "GLAccount": "61001000" },
        ]
    },
    {
        name: "Purchases",
        key: "Purchases",
        type: "static",
        nodes: [
            { "GLAccount": "60201000" },
            { "GLAccount": "60291000" },
        ]
    },
    {
        name: "Sales Purchased",
        key: "SalesPurchased",
        type: "static",
        nodes: [
            { "GLAccount": "50101000" },
            { "GLAccount": "50201040" },
            { "GLAccount": "50301000" },
        ]
    },
    {
        name: "Sales Proprietary",
        key: "SalesProprietary",
        type: "static",
        nodes: [
            { "GLAccount": "50101000" },
            { "GLAccount": "50101300" },
            { "GLAccount": "50201040" },
            { "GLAccount": "50301000" },
            { "GLAccount": "51901000" },
            { "GLAccount": "51901100" },
        ]
    },
    {
        name: "Ending Inventory Proprietary",
        key: "EndingInventoryProprietary",
        type: "static",
        nodes: [
            { "GLAccount": "16100100" },
        ]
    },
    {
        name: "Ending Inventory Purchased",
        key: "EndingInventoryPurchased",
        type: "static",
        nodes: [
            { "GLAccount": "16100200" },
            { "GLAccount": "16100000" },
        ]
    },
    {
        name: "Ending Inventory Calculated - Totals",
        key: "EndingInventoryCalculatedTotals",
        type: "formula",
        nodes: [],
        formula: "$projection.OpenInventoryProprietary + $projection.OpenInventoryPurchased + $projection.ProductionProprietary + $projection.Purchases - $projection.SalesPurchased - $projection.SalesProprietary"
    },
    {
        name: "Inventory Change",
        key: "InventoryChange",
        type: "static",
        nodes: [
            { "GLAccount": "62006300" },
            { "GLAccount": "62090000" },
        ]
    },
    {
        name: "Difference Between Calculated & Recorded Totals",
        key: "Formula2",
        type: "formula",
        nodes: [],
        formula: "$projection.EndingInventoryProprietary + $projection.EndingInventoryPurchased - $projection.EndingInventoryCalculatedTotals"

    },
    {
        name: "Check: Inv Chg = End less Open Proprietary",
        key: "Formula3",
        type: "formula",
        nodes: [],
        formula: "$projection.EndingInventoryProprietary - $projection.OpenInventoryProprietary"

    },
    {
        name: "Check: Inv Chg = End less Open Purchased",
        key: "Formula4",
        type: "formula",
        nodes: [],
        formula: "$projection.EndingInventoryPurchased - $projection.OpenInventoryPurchased"

    },
    {
        name: "Stat Account Balancing",
        key: "StatAccountBalancing",
        type: "static",
        nodes: [
            { "GLAccount": "51101000" },
            { "GLAccount": "51201000" },
            { "GLAccount": "51301000" },
            { "GLAccount": "51401000" },
        ]
    },
    {
        name: "Total",
        key: "Total",
        type: "formula",
        nodes: [],
        formula: "$projection.OpenInventoryProprietary + $projection.OpenInventoryPurchased + $projection.ProductionProprietary + $projection.Purchases + $projection.SalesPurchased + $projection.SalesProprietary + $projection.EndingInventory + $projection.EndingInventoryPurchased + $projection.InventoryChange + $projection.StatAccountBalancing"
    },
]

let createStructure = (HIERSTRUCT, { aProductGroups }) => {

    let parseFormula = (formula) => {
        let regex = /^[a-zA-Z]*$/;
        // formula = formula.split(" ");

        formula = formula.map(ele => {
            if (regex.test(ele)) {
                // return key of the structure objects
                HIERSTRUCT.map((item, idx) => {
                    if (item.key === ele) {
                        ele = idx;
                    }
                });

            }
            return ele;
        });
        return formula;

    }
    let parseFormulaWithGroups = (aStruct, formula, sProdGroup) => {
        let regex = /^[a-zA-Z]*$/;
        console.log(formula);
        // formula = formula.split(" ");

        formula = formula.map(ele => {
            if (regex.test(ele)) {
                // return key of the structure objects
                aStruct.map((item, idx) => {
                    if ((item.InternalKey === (sProdGroup + '_' + ele))) {
                        ele = idx;
                    }
                });

            }
            return ele;
        });
        return formula;

    }

    let STRUCT = [];
    let idx = 0;
    HIERSTRUCT
        .forEach(element => {
            // console.log(element.name)
            if (element.type === "static") {
                STRUCT.push({
                    nodeID: idx,
                    parentNodeID: null,
                    hierarchyLevel: 0,
                    drillState: "expanded",
                    Structure: element.name,
                    Type: element.type,
                    InternalKey: element.key,
                    "ProductionProprietaryAmount": null,
                    "ProductionProprietaryQuantity": null,
                    "PurchasedProductAmount": null,
                    "PurchasedProductQuantity": null,
                    "TotalAmount": null,
                    "TotalQuantity": null,
                    "TargetUnit": null,
                    "CompanyCodeCurrency": null,
                    "ProductGroup": null,
                    "ProductGroupName": null,
                });
            } else if (element.type === "formula") {
                // console.log(element.formula);
                STRUCT.push({
                    nodeID: idx,
                    parentNodeID: null,
                    hierarchyLevel: 0,
                    drillState: "leaf",
                    Structure: element.name,
                    Type: element.type,
                    InternalKey: element.key,
                    Formula: parseFormula(element.formula),
                    FormulaUnconverted: element.formula,
                    "ProductionProprietaryAmount": null,
                    "ProductionProprietaryQuantity": null,
                    "PurchasedProductAmount": null,
                    "PurchasedProductQuantity": null,
                    "TotalAmount": null,
                    "TotalQuantity": null,
                    "TargetUnit": null,
                    "CompanyCodeCurrency": null,
                    "ProductGroup": null,
                    "ProductGroupName": null,
                });
            }
            idx++;
        });

    let FINAL_STRUCT = [...STRUCT];

    // console.log('FINAL_STRUCT', FINAL_STRUCT.splice(14,25))

    // iterate on level 1
    STRUCT.forEach((element, index) => {

        HIERSTRUCT
            .filter(ele => ele.name === element.Structure)[0].nodes
            // .filter(st_ele => {
            //     if (st_ele.nodes.length > 0) {
            //         return true;
            //     }
            //     return false;
            // })
            .forEach((st_ele, st_idx) => {
                FINAL_STRUCT.push({
                    nodeID: idx,
                    parentNodeID: index,
                    hierarchyLevel: 1,
                    drillState: "leaf",
                    Structure: st_ele.GLAccount,
                    "ProductionProprietaryAmount": null,
                    "ProductionProprietaryQuantity": null,
                    "PurchasedProductAmount": null,
                    "PurchasedProductQuantity": null,
                    "TotalAmount": null,
                    "TotalQuantity": null,
                    "TargetUnit": null,
                    "CompanyCodeCurrency": null,
                    "ProductGroup": null,
                    "ProductGroupName": null,
                });
                idx++
            });
    });
    // console.log(FINAL_STRUCT.splice(30,50));
    let FINAL_NESTED_STRUCT = [];
    if (aProductGroups) {

        aProductGroups.map(pg => {
            FINAL_NESTED_STRUCT.push({
                nodeID: pg,
                parentNodeID: null,
                hierarchyLevel: 0,
                drillState: "collapsed",
                Structure: pg,
                "ProductionProprietaryAmount": null,
                "ProductionProprietaryQuantity": null,
                "PurchasedProductAmount": null,
                "PurchasedProductQuantity": null,
                "TotalAmount": null,
                "TotalQuantity": null,
                "TargetUnit": null,
                "CompanyCodeCurrency": null,
                "ProductGroup": pg,
                "ProductGroupName": null,
            })
            FINAL_STRUCT.map(ele => {

                let copy = { ...ele };

                if (ele.hierarchyLevel === 0) {
                    copy.nodeID = pg + '_' + ele.nodeID;
                    copy.parentNodeID = pg;
                    copy.hierarchyLevel = 1;
                    copy.InternalKey = pg + '_' + ele.InternalKey;
                    // copy.formula = parseFormula(element.formula)
                } else if (ele.hierarchyLevel === 1) {
                    copy.nodeID = pg + '_' + ele.nodeID;
                    copy.parentNodeID = pg + '_' + ele.parentNodeID;
                    copy.hierarchyLevel = 2;
                }
                // console.log(copy);
                FINAL_NESTED_STRUCT.push(copy);
            });


        });

    }
    if (FINAL_NESTED_STRUCT.length > 0) {

        FINAL_NESTED_STRUCT = FINAL_NESTED_STRUCT.map((ele, idx, arr) => {
            let copy = { ...ele }

            if (ele.Type === 'formula') {

                copy.Formula = parseFormulaWithGroups(FINAL_NESTED_STRUCT, ele.FormulaUnconverted, ele.ProductGroup)
                console.log(copy.Formula)
            }
            return copy;
        });

        return { FINAL_STRUCT: FINAL_NESTED_STRUCT }
    }
    return { FINAL_STRUCT };

}



module.exports = cds.service.impl(async function () {
    const { TestEntity, I_CompanyCodeVH, I_FiscalYear, I_FiscalPeriod } = this.entities;

    const service = await cds.connect.to('API_GL_ACCOUNT_BALANCE');
    const CBOService = await cds.connect.to('CBO_ANALYTICS');

    this.on(["READ"], TestEntity, async req => {
        console.log(req.query)

        const { P_Period, P_Year } = getQueryArgs(req.query);
        const { CompanyCode, hierarchyLevel, parentNodeID } = getQueryFilters(req.query);
        const { ProductGroup, ProductGroupName } = getQueryColumns(req.query);

        /* GET CBO variables */
        let HierVars = await CBOService.tx(req).send('GET', `ZZ1_ACCOUNTUNITMAPPING?$filter=Name eq 'EXT00609_HIER'`);

        let GLAccMapping = await CBOService.tx(req).send('GET', `ZZ1_ACCOUNTUNITMAPPING?$filter=Name eq 'EXT00609_GLACCOUNT' and Med eq '${CompanyCode}'`);

        let HierFormulas = await CBOService.tx(req).send('GET', `ZZ1_ACCOUNTUNITMAPPING?$filter=Name eq 'EXT00609_FORMULA'`);

        let DefaultQtyUnit = await CBOService.tx(req).send('GET', `ZZ1_ACCOUNTUNITMAPPING?$filter=Name eq 'EXT00609_UNIT_MAPPING'`);

        /* Create Tree Structure */

        let structArr = [];
        HierVars = HierVars.sort(function (a, b) {
            return parseInt(a.High) - parseInt(b.High);
        });
        // console.log(HierVars);

        HierVars = HierVars.map(item => {

            let structureObj = {
                name: "Open Inventory Proprietary",
                key: "OpenInventoryProprietary",
                type: "static",
                nodes: [],
                formula: []
            }

            structureObj.name = item.Low;
            structureObj.key = item.Code;

            // console.log(item.Code)
            if (item.Code.split('_') && item.Code.split('_')[0] === 'EXPR') {
                structureObj.type = "formula";
            }

            return structureObj;
        });

        HierVars = HierVars.map((item) => {
            if (item.type === 'formula') {

                // console.log(`HierFormulas`, HierFormulas)
                // console.log(GLAccMapping)

                for (let i = 0; i < HierFormulas.length; i++) {
                    // console.log('item : ', item)
                    // console.log('item2 : ', HierFormulas[i])


                    if (HierFormulas[i]['Code'] === item['key']) {
                        item.formula = HierFormulas[i]['Low'].split(" ");
                        // console.log('here')
                        break;
                    }

                }

                return item;

            }

            item.nodes = GLAccMapping.filter(ele => {
                if (ele.Code === item.key) {
                    return true;
                }
                return false;
            });

            item.nodes = item.nodes.map(ele => {
                return { GLAccount: ele.High };
            })

            return item;

        });

        structArr = [...HierVars];

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
            console.log('no CC')
            return []
        }

        let query_level_0 = query + `&$select=CBO_GLAccountGroup,TotalAmount,TotalQuantity,ProductionProprietaryAmount,ProductionProprietaryQuantity,PurchasedProductAmount,PurchasedProductQuantity,CompanyCodeCurrency,TargetUnit`
        let query_level_1 = query + `&$select=CBO_GLAccountGroup,GLAccount,TotalAmount,TotalQuantity,ProductionProprietaryAmount,ProductionProprietaryQuantity,PurchasedProductAmount,PurchasedProductQuantity,CompanyCodeCurrency,TargetUnit`

        let aProductGroups;
        if (ProductGroup) {
            aProductGroups = await service.tx(req).send('GET', query + `&$select=ProductGroup,ProductGroupName`);
            aProductGroups = aProductGroups.map(pg => {
                return pg.ProductGroup;
            });

            query_level_0 = query_level_0 + `,ProductGroup,ProductGroupName`;
            query_level_1 = query_level_1 + `,ProductGroup,ProductGroupName`;

        }

        let results_level_0 = await service.tx(req).send('GET', query_level_0);
        let results_level_1 = await service.tx(req).send('GET', query_level_1);

        // let { FINAL_STRUCT: STRUCT } = createStructure(HIERARCHY_STRUCTURE);
        let { FINAL_STRUCT: STRUCT } = createStructure(structArr, {
            aProductGroups
        });


        let res_level_0, res_level_1, merged_res;

        if (!aProductGroups) {
            // console.log('default flow')
            // console.log('STRUCT', STRUCT);
            // level 0 merge
            res_level_0 = STRUCT.filter(ele => ele.hierarchyLevel === 0 ? true : false)
                .map(ele => {
                    for (let i = 0; i < results_level_0.length; i++) {

                        if ((results_level_0[i].CBO_GLAccountGroup).replace(/\s/g, '') === (ele.Structure).replace(/\s/g, '')) {
                            // if ((results_level_0[i].CBO_GLAccountGroup) == (ele.Structure)) {

                            ele.ProductionProprietaryAmount = parseFloat(results_level_0[i].ProductionProprietaryAmount);
                            ele.ProductionProprietaryQuantity = parseFloat(results_level_0[i].ProductionProprietaryQuantity);
                            ele.PurchasedProductAmount = parseFloat(results_level_0[i].PurchasedProductAmount);
                            ele.PurchasedProductQuantity = parseFloat(results_level_0[i].PurchasedProductQuantity);
                            ele.TotalAmount = parseFloat(results_level_0[i].TotalAmount);
                            ele.TotalQuantity = parseFloat(results_level_0[i].TotalQuantity);
                            ele.TargetUnit = DefaultQtyUnit[0].Low;
                            ele.CompanyCodeCurrency = 'CAD';

                            ele.ProductGroup = parseFloat(results_level_0[i].ProductGroup);
                            ele.ProductGroupName = parseFloat(results_level_0[i].ProductGroupName);
                            break;
                        }
                    }

                    return ele;
                });

            //  level 1 merge
            res_level_1 = STRUCT.filter(ele => ele.hierarchyLevel === 1 ? true : false)
                .map(ele => {
                    ele.Structure = ele.Structure.slice(2)
                    for (let i = 0; i < results_level_1.length; i++) {

                        if (results_level_1[i].GLAccount == ele.Structure) {
                            ele.ProductionProprietaryAmount = parseFloat(results_level_1[i].ProductionProprietaryAmount);
                            ele.ProductionProprietaryQuantity = parseFloat(results_level_1[i].ProductionProprietaryQuantity);
                            ele.PurchasedProductAmount = parseFloat(results_level_1[i].PurchasedProductAmount);
                            ele.PurchasedProductQuantity = parseFloat(results_level_1[i].PurchasedProductQuantity);
                            ele.TotalAmount = parseFloat(results_level_1[i].TotalAmount);
                            ele.TotalQuantity = parseFloat(results_level_1[i].TotalQuantity);
                            ele.TargetUnit = DefaultQtyUnit[0].Low;
                            ele.CompanyCodeCurrency = 'CAD';

                            ele.ProductGroup = parseFloat(results_level_0[i].ProductGroup);
                            ele.ProductGroupName = parseFloat(results_level_0[i].ProductGroupName);
                            break;
                        }
                    }

                    return ele;
                });

            merged_res = [...res_level_0, ...res_level_1];
            // console.log(merged_res);
            if (hierarchyLevel === 0) {

                let CURR = 'CAD';
                res_level_0 = res_level_0
                    .map(ele => {

                        if (ele.Type === "formula") {
                            let sign = '+';
                            let copy_ele = { ...ele };

                            ele.Formula.map((term, idx, arr) => {
                                // "ProductionProprietaryAmount": null,
                                // "ProductionProprietaryQuantity": null,
                                // "PurchasedProductAmount": null,
                                // "PurchasedProductQuantity": null,
                                // "TotalAmount": null,
                                // "TotalQuantity": null,
                                // "TargetUnit": null,
                                // "CompanyCodeCurrency": null,
                                if (typeof (term) === 'number') {

                                    if (sign === '+') {
                                        copy_ele.ProductionProprietaryAmount = copy_ele.ProductionProprietaryAmount + res_level_0[term].ProductionProprietaryAmount;
                                        copy_ele.ProductionProprietaryQuantity = copy_ele.ProductionProprietaryQuantity + res_level_0[term].ProductionProprietaryQuantity;
                                        copy_ele.PurchasedProductAmount = copy_ele.PurchasedProductAmount + res_level_0[term].PurchasedProductAmount;
                                        copy_ele.PurchasedProductQuantity = copy_ele.PurchasedProductQuantity + res_level_0[term].PurchasedProductQuantity;
                                        copy_ele.TotalAmount = copy_ele.TotalAmount + res_level_0[term].TotalAmount;
                                        copy_ele.TotalQuantity = copy_ele.TotalQuantity + res_level_0[term].TotalQuantity;
                                        copy_ele.TargetUnit = DefaultQtyUnit[0].Low;
                                        copy_ele.CompanyCodeCurrency = CURR;
                                    } else if (sign === '-') {
                                        copy_ele.ProductionProprietaryAmount = copy_ele.ProductionProprietaryAmount - res_level_0[term].ProductionProprietaryAmount;
                                        copy_ele.ProductionProprietaryQuantity = copy_ele.ProductionProprietaryQuantity - res_level_0[term].ProductionProprietaryQuantity;
                                        copy_ele.PurchasedProductAmount = copy_ele.PurchasedProductAmount - res_level_0[term].PurchasedProductAmount;
                                        copy_ele.PurchasedProductQuantity = copy_ele.PurchasedProductQuantity - res_level_0[term].PurchasedProductQuantity;
                                        copy_ele.TotalAmount = copy_ele.TotalAmount - res_level_0[term].TotalAmount;
                                        copy_ele.TotalQuantity = copy_ele.TotalQuantity - res_level_0[term].TotalQuantity;
                                        copy_ele.TargetUnit = DefaultQtyUnit[0].Low;
                                        copy_ele.CompanyCodeCurrency = CURR;
                                    }

                                } else if (typeof (term) === 'string') {
                                    sign = term;
                                }

                            });

                            return copy_ele;

                        }
                        return ele;
                    });

                res_level_0['$count'] = res_level_0.length
                return res_level_0;
            }

            if (parentNodeID >= 0) {

                let final_res_level_1 = [];

                for (let idx = 0; idx < merged_res.length; idx++) {
                    if (merged_res[idx].parentNodeID === parentNodeID) {
                        final_res_level_1.push(merged_res[idx]);
                    }
                }

                final_res_level_1['$count'] = final_res_level_1.length
                return final_res_level_1;
            }

        } else if (aProductGroups) {

            // level 0 merge
            res_level_0 = STRUCT.filter(ele => ele.hierarchyLevel === 1 ? true : false)
                .map(ele => {
                    for (let i = 0; i < results_level_0.length; i++) {

                        if (((results_level_0[i].CBO_GLAccountGroup).replace(/\s/g, '') === (ele.Structure).replace(/\s/g, '')) && ele.parentNodeID === parentNodeID) {
                            // if ((results_level_0[i].CBO_GLAccountGroup) == (ele.Structure)) {

                            ele.ProductionProprietaryAmount = parseFloat(results_level_0[i].ProductionProprietaryAmount);
                            ele.ProductionProprietaryQuantity = parseFloat(results_level_0[i].ProductionProprietaryQuantity);
                            ele.PurchasedProductAmount = parseFloat(results_level_0[i].PurchasedProductAmount);
                            ele.PurchasedProductQuantity = parseFloat(results_level_0[i].PurchasedProductQuantity);
                            ele.TotalAmount = parseFloat(results_level_0[i].TotalAmount);
                            ele.TotalQuantity = parseFloat(results_level_0[i].TotalQuantity);
                            ele.TargetUnit = DefaultQtyUnit[0].Low;
                            ele.CompanyCodeCurrency = 'CAD';

                            ele.ProductGroup = parseFloat(results_level_0[i].ProductGroup);
                            ele.ProductGroupName = parseFloat(results_level_0[i].ProductGroupName);
                            break;
                        }
                    }

                    return ele;
                });

            //  level 1 merge
            res_level_1 = STRUCT.filter(ele => ele.hierarchyLevel === 2 ? true : false)
                .map(ele => {
                    ele.Structure = ele.Structure.slice(2)
                    for (let i = 0; i < results_level_1.length; i++) {

                        if (results_level_1[i].GLAccount == ele.Structure && results_level_1[i].ProductGroup == ele.parentNodeID && ele.parentNodeID === parentNodeID) {
                            ele.ProductionProprietaryAmount = parseFloat(results_level_1[i].ProductionProprietaryAmount);
                            ele.ProductionProprietaryQuantity = parseFloat(results_level_1[i].ProductionProprietaryQuantity);
                            ele.PurchasedProductAmount = parseFloat(results_level_1[i].PurchasedProductAmount);
                            ele.PurchasedProductQuantity = parseFloat(results_level_1[i].PurchasedProductQuantity);
                            ele.TotalAmount = parseFloat(results_level_1[i].TotalAmount);
                            ele.TotalQuantity = parseFloat(results_level_1[i].TotalQuantity);
                            ele.TargetUnit = DefaultQtyUnit[0].Low;
                            ele.CompanyCodeCurrency = 'CAD';

                            ele.ProductGroup = parseFloat(results_level_0[i].ProductGroup);
                            ele.ProductGroupName = parseFloat(results_level_0[i].ProductGroupName);
                            break;
                        }
                    }

                    return ele;
                });

            merged_res = [...res_level_0, ...res_level_1];

            if (hierarchyLevel === 0) {

                let CURR = 'CAD';
                let result = STRUCT
                    .filter(ele => ele.hierarchyLevel === 0)


                result['$count'] = result.length
                return result;
            }

            if (parentNodeID) {

                let result = merged_res
                    .filter(ele => {
                        // console.log('ele.parentNodeID: ', ele.parentNodeID)
                        // console.log('parentNodeID: ', parentNodeID)
                        if (ele.parentNodeID == parentNodeID) {
                            return true;
                        }
                        return false;
                    })
                    .map(ele => {

                        if (ele.Type === "formula") {
                            let sign = '+';
                            let copy_ele = { ...ele };

                            ele.Formula.map((term, idx, arr) => {
                                // "ProductionProprietaryAmount": null,
                                // "ProductionProprietaryQuantity": null,
                                // "PurchasedProductAmount": null,
                                // "PurchasedProductQuantity": null,
                                // "TotalAmount": null,
                                // "TotalQuantity": null,
                                // "TargetUnit": null,
                                // "CompanyCodeCurrency": null,
                                if (typeof (term) === 'number') {

                                    if (sign === '+') {
                                        copy_ele.ProductionProprietaryAmount = copy_ele.ProductionProprietaryAmount + res_level_0[term].ProductionProprietaryAmount;
                                        copy_ele.ProductionProprietaryQuantity = copy_ele.ProductionProprietaryQuantity + res_level_0[term].ProductionProprietaryQuantity;
                                        copy_ele.PurchasedProductAmount = copy_ele.PurchasedProductAmount + res_level_0[term].PurchasedProductAmount;
                                        copy_ele.PurchasedProductQuantity = copy_ele.PurchasedProductQuantity + res_level_0[term].PurchasedProductQuantity;
                                        copy_ele.TotalAmount = copy_ele.TotalAmount + res_level_0[term].TotalAmount;
                                        copy_ele.TotalQuantity = copy_ele.TotalQuantity + res_level_0[term].TotalQuantity;
                                        copy_ele.TargetUnit = DefaultQtyUnit[0].Low;
                                        copy_ele.CompanyCodeCurrency = CURR;
                                    } else if (sign === '-') {
                                        copy_ele.ProductionProprietaryAmount = copy_ele.ProductionProprietaryAmount - res_level_0[term].ProductionProprietaryAmount;
                                        copy_ele.ProductionProprietaryQuantity = copy_ele.ProductionProprietaryQuantity - res_level_0[term].ProductionProprietaryQuantity;
                                        copy_ele.PurchasedProductAmount = copy_ele.PurchasedProductAmount - res_level_0[term].PurchasedProductAmount;
                                        copy_ele.PurchasedProductQuantity = copy_ele.PurchasedProductQuantity - res_level_0[term].PurchasedProductQuantity;
                                        copy_ele.TotalAmount = copy_ele.TotalAmount - res_level_0[term].TotalAmount;
                                        copy_ele.TotalQuantity = copy_ele.TotalQuantity - res_level_0[term].TotalQuantity;
                                        copy_ele.TargetUnit = DefaultQtyUnit[0].Low;
                                        copy_ele.CompanyCodeCurrency = CURR;
                                    }

                                } else if (typeof (term) === 'string') {
                                    sign = term;
                                }

                            });

                            return copy_ele;

                        }
                        return ele;
                    });
                // console.log(result)
                result['$count'] = result.length
                return result;
            }

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

    this.on(['READ'], I_CompanyCodeVH, async req => {
        return await service.tx(req).run(req.query);
    });
    this.on(['READ'], I_FiscalYear, async req => {
        return await service.tx(req).run(req.query);
    });
    this.on(['READ'], I_FiscalPeriod, async req => {
        return await service.tx(req).run(req.query);
    });

});