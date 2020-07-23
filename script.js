// // // const $ = require("jquery");
// // // const fs = require("fs");
// // // const dialog = require("electron").remote.dialog;

// // // $(document).ready(function () {
// // //     let db;
// // //     $("#grid .cell").on("click", function () {
// // //         let rowId = Number($(this).attr("row-id")) + 1;
// // //         let colId = Number($(this).attr("col-id")) + 65;
// // //         let address = String.fromCharCode(colId) + rowId;
// // //         //    val to set value of an input
// // //         $("#address-input").val(address);
// // //     })
// // //     // *************************************New,Open,Save****************************************
// // //     // Create 
// // //     $("#New").on("click", function () {
// // //         // Create a 2d array representing grid
// // //         db = [];
// // //         let rows = $("#grid .row");
// // //         for (let i = 0; i < rows.length; i++) {
// // //             let row = []
// // //             let rowkeCells = $(rows[i]).find(".cell");
// // //             for (let j = 0; j < rowkeCells.length; j++) {
// // //                 // Open and save
// // //                 // Grid clear
// // //                 $(rowkeCells[j]).html("");
// // //                 let cell = {
// // //                     value: "",
// // //                     formula: ""
// // //                 };
// // //                 row.push(cell);
// // //             }
// // //             db.push(row);
// // //         }
// // //         // clear whole grid
// // //         console.log(db);
// // //     })

// // //     // Save
// // //     $("#Save").on("click", async function () {
// // //         // Open Dialog Box to save 
// // //         // write your db into it
// // //         let sdb = await dialog.showOpenDialog();
// // //         let data = JSON.stringify(db);
// // //         fs.writeFileSync(sdb.filePaths[0], data);
// // //         console.log("File saved to db");
// // //     })
// // //     // Open
// // //     $("#Open").on("click", async function () {
// // //         // open Dialog Box accept input
// // //         let sdb = await dialog.showOpenDialog();
// // //         // Read File
// // //         let bufferData = fs.readFileSync(sdb.filePaths[0]);
// // //         db = JSON.parse(bufferData);
// // //         //  Set Ui
// // //         let rows = $("#grid .row");
// // //         for (let i = 0; i < rows.length; i++) {
// // //             let rowkeCells = $(rows[i]).find(".cell");
// // //             for (let j = 0; j < rowkeCells.length; j++) {
// // //                 // Open and save
// // //                 // Grid clear
// // //                 $(rowkeCells[j]).html(db[i][j].value);
// // //             }
// // //         }
// // //         console.log("File Opened");
// // //         // Write onto grid
// // //     })
// // //     // ****************************Formula*******************************************
// // //     // Update
// // //     $("#grid .cell").on("blur", function () {
// // //         let { rowId, colId } = getRC(this);
// // //         db[rowId][colId].value = $(this).html();
// // //         console.log(db);
// // //     })
// // //     $("#formula-input").on("blur", function () {
// // //         // get formula
// // //         let formula = $(this).val();
// // //         // set  formula property of the cell
// // //         let cellElemAdd = $("#address-input").val();
// // //         let { colId, rowId } = getRcfromAdd(cellElemAdd);
// // //         let cellObject = db[rowId][colId];
// // //         cellObject.formula = formula;
// // //         //  evaluate the formula
// // //         let rVal = evaluate(formula);
// // //         // update the cell's  ui
// // //         updateCell(cellObject, rowId, colId, rVal);
// // //     })
// // //     function evaluate(formula) {
// // //         // ( A1 + A2 )
// // //         let formulaComponents = formula.split(" ");
// // //         // [(,A1,+,A2,)]
// // //         console.log(formula)
// // //         for (let i = 0; i < formulaComponents.length; i++) {
// // //             let CharCode = formulaComponents[i].charCodeAt(0);
// // //             if (CharCode >= 65 && CharCode <= 90) {
// // //                 let { rowId, colId } = getRcfromAdd(formulaComponents[i]);
// // //                 let pValue = db[rowId][colId].value;
// // //                 formula = formula.replace(formulaComponents[i], pValue);
// // //             }
// // //         }
// // //         console.log(formula);
// // //         // ( 10 + 20 )
// // //         let rVal = eval(formula);
// // //         console.log(rVal);
// // //         return rVal;
// // //     }
// // //     function updateCell(cellObject, rowId, colId, rVal) {

// // //         cellObject.value = rVal;
// // //         // change on ui also
// // //         $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(rVal);
// // //     }
// // //     function getRcfromAdd(cellElemAdd) {
// // //         let colId = Number(cellElemAdd.charCodeAt(0)) - 65;
// // //         let rowId = Number(cellElemAdd.substring(1)) - 1;
// // //         return { colId, rowId };
// // //     }
// // //     function getRC(element) {
// // //         let rowId = $(element).attr("row-id");
// // //         let colId = $(element).attr("col-id");
// // //         return { rowId, colId };
// // //     }
// // //     function init() {
// // //         $("#New").trigger("click");
// // //     }
// // //     init();
// // // })


// // const $ = require("jquery");
// // const fs = require("fs");
// // const dialog = require("electron").remote.dialog;

// // $(document).ready(function () {
// //     let db;
// //     $("#grid .cell").on("click", function () {
// //         let rowId = Number($(this).attr("row-id")) + 1;
// //         let colId = Number($(this).attr("col-id")) + 65;
// //         let address = String.fromCharCode(colId) + rowId;
// //         //    val to set value of an input
// //         $("#address-input").val(address);
// //     })
// //     // *************************************New,Open,Save****************************************
// //     // Create 
// //     $("#New").on("click", function () {
// //         // Create a 2d array representing grid
// //         db = [];
// //         let rows = $("#grid .row");
// //         for (let i = 0; i < rows.length; i++) {
// //             let row = []
// //             let rowkeCells = $(rows[i]).find(".cell");
// //             for (let j = 0; j < rowkeCells.length; j++) {
// //                 // Open and save
// //                 // Grid clear
// //                 $(rowkeCells[j]).html("");
// //                 let cell = {
// //                     value: "",
// //                     formula: "",
// //                     children: []
// //                 };
// //                 row.push(cell);
// //             }
// //             db.push(row);
// //         }
// //         // clear whole grid
// //         console.log(db);
// //     })

// //     // Save
// //     $("#Save").on("click", async function () {
// //         // Open Dialog Box to save 
// //         // write your db into it
// //         let sdb = await dialog.showOpenDialog();
// //         let data = JSON.stringify(db);
// //         fs.writeFileSync(sdb.filePaths[0], data);
// //         console.log("File saved to db");
// //     })
// //     // Open
// //     $("#Open").on("click", async function () {
// //         // open Dialog Box accept input
// //         let sdb = await dialog.showOpenDialog();
// //         // Read File
// //         let bufferData = fs.readFileSync(sdb.filePaths[0]);
// //         db = JSON.parse(bufferData);
// //         //  Set Ui
// //         let rows = $("#grid .row");
// //         for (let i = 0; i < rows.length; i++) {
// //             let rowkeCells = $(rows[i]).find(".cell");
// //             for (let j = 0; j < rowkeCells.length; j++) {
// //                 // Open and save
// //                 // Grid clear
// //                 $(rowkeCells[j]).html(db[i][j].value);
// //             }
// //         }
// //         console.log("File Opened");
// //         // Write onto grid
// //     })
// //     // ****************************Formula*******************************************
// //     // Update
// //     // value=> value
// //     // formula=> value
// //     $("#formula-input").on("blur",function(){
// //         let formula=$(this).val();
// //         let cellAddress=$("#address-input").val();
// //         let ans=evaluate(formula);
// //         let {rowId,colId}=getRCfromAdd(cellAddress);
// //         updateCell(rowId,colId,ans);

// //     })
// //     function evaluate(formula)
// //     {
// //         let fcomp=formula.split(" ");
// //         //split the formula
// //         //(A!+A2)
// //         for(let i=0;i<fcomp.length;i++)
// //         {
// //             let ascii=fcomp[i].charCodeAt(0);
// //             if(ascii>=65&&ascii<=90)
// //             {
// //                 //get rc from parent cell
// //                 let{rowdId,colId}=getRCfromAdd(fcomp[i]);
// //                 //get the value from db and replave in formula
// //                 let value=db[rowId][colId];
// //                 formula=formula.replace(fcomp[i],value);
// //             }
// //         }
// //         console.log(formula);
// //         let ans=eval(formula);
// //         console.log(ans);
// //         return ans;
// //     }
// //     function updateCell(rowId,colId,ans){
// //         $("#grid .cell[rid=$")
// //     }



// //     /////////////////////////////////////////////////////////
// //     function removeFormula(formula, chrowId, chcolId) {
// //         // ( A1 + A2 )
// //         let formulaComponents = formula.split(" ");
// //         // [(,A1,+,A2,)]
// //         console.log(formula);
// //         for (let i = 0; i < formulaComponents.length; i++) {
// //             let CharCode = formulaComponents[i].charCodeAt(0);
// //             if (CharCode >= 65 && CharCode <= 90) {
// //                 let { rowId, colId } = getRcfromAdd(formulaComponents[i]);
// //                 let parentObj = db[rowId][colId];

// //                 //    find index
// //                 // remove your self
// //                 let remChArr = parentObj.children.filter(function (chObj) {
// //                     return !(chObj.rowId == chrowId && chObj.colId == chcolId)
// //                 })
// //                 parentObj.children = remChArr;

// //             }
// //         }

// //     }
// //     function getRCfromAdd(cellElemAdd) {
// //         let colId = Number(cellElemAdd.charCodeAt(0)) - 65;
// //         let rowId = Number(cellElemAdd.substring(1)) - 1;
// //         return { colId, rowId };
// //     }
// //     function getRC(element) {
// //         let rowId = $(element).attr("row-id");
// //         let colId = $(element).attr("col-id");
// //         return { rowId, colId };
// //     }

// //     function init() {
// //         $("#New").trigger("click");
// //     }
// //     init();
// // })

// const $ = require("jquery");
// const fs = require("fs");
// const dialog = require("electron").remote.dialog;
// $(document).ready(function () {
//     let db;
//     $("#grid .cell").on("click", function () {
//         // perform 
//         // action
//         let rid = Number($(this).attr("rid")) + 1;
//         let cid = Number($(this).attr("cid")) + 65;
//         let address = String.fromCharCode(cid) + rid;
//         //   to set value of input type element => val set  
//         $("#address-input").val(address);
//         let { rowId, colId } = getRCFromAddr(address);
//         $("#formula-input").val(db[rowId][colId].formula);
//     })


//     // **************New Open Save**************
//     // New
//     $("#new").on("click", function () {
//         // 
//         db = [];
//         let allRows = $("#grid").find(".row");
//         for (let i = 0; i < allRows.length; i++) {
//             let allCellOfarow = $(allRows[i]).find(".cell");
//             let row = [];
//             for (let j = 0; j < allCellOfarow.length; j++) {
//                 $(allCellOfarow[j]).html("");
//                 let cell = {
//                     value: "",
//                     formula: "",
//                     children: []
//                 };
//                 row.push(cell);
//             }
//             db.push(row);
//         }
//     })

//     // update
//     $("#grid .cell").on("blur", function () {
//         //  update entry in db
//         let rowId = $(this).attr("rid");
//         let colId = $(this).attr("cid");
//         // to get text of any element except input
//         let value = $(this).html();
//         // console.log(value);
//         updateCell(rowId, colId, value);
//         // console.log(db);
//     })
//     $("#open").on("click", async function () {
//         // it gives array of file Paths os selected file
//         let sdb = await dialog.showOpenDialog();
//         let buffer = fs.readFileSync(sdb.filePaths[0]);
//         console.log(buffer);
//         db = JSON.parse(buffer);
//         let allRows = $("#grid").find(".row");
//         for (let i = 0; i < allRows.length; i++) {
//             let allCellOfarow = $(allRows[i]).find(".cell");
//             for (let j = 0; j < allCellOfarow.length; j++) {
//                 $(allCellOfarow[j]).html(db[i][j].value);
//             }

//         }
//     })
//     $("#save").on("click", function () {
//         // open dialogbox
//         let sdb = dialog.showSaveDialogSync();
//         let strData = JSON.stringify(db);
//         console.log(sdb);
//         // it directly gives pathon which file is to be created
//         fs.writeFileSync(sdb, strData);
//         console.log("File Saved");
//         // write to disk

//     })



//     // ****************Formula************************

//     $("#formula-input").on("blur", function () {
//         let formula = $(this).val();
//         // console.log(value);
//         let cellAdddress = $("#address-input").val();
//         // coordinates=> update ui and db 
//         let ans = evaluate(formula);
//         let { rowId, colId } = getRCFromAddr(cellAdddress);
//         let cellObject = db[rowId][colId];
//         cellObject.formula = formula;
//         setUpFormula(rowId, colId, formula);
//         updateCell(rowId, colId, ans);
//     })
//     function evaluate(formula) {
//         // Split and iterate over formula
//         // ( A1 + A2 )
//         let fCOmp = formula.split(" ");
//         // [(,A1,+,A2)]
//         console.log(fCOmp)
//         for (let i = 0; i < fCOmp.length; i++) {
//             let ascii = fCOmp[i].charCodeAt(0);
//             if (ascii >= 65 && ascii <= 90) {
//                 // get RC of the parent Cell
//                 let { rowId, colId } = getRCFromAddr(fCOmp[i]);
//                 // Get value from db and replace in formula
//                 let value = db[rowId][colId].value;
//                 formula = formula.replace(fCOmp[i], value);
//             }

//         }
//         console.log(formula);
//         // evaluate the formula
//         let ans = eval(formula);
//         console.log(ans);
//         return ans;
//     }

//     function setUpFormula(crowId, ccolId, formula) {
//         // Split and iterate over formula
//         // ( A1 + A2 )
//         let fCOmp = formula.split(" ");
//         // [(,A1,+,A2)]
//         console.log(fCOmp)
//         for (let i = 0; i < fCOmp.length; i++) {
//             let ascii = fCOmp[i].charCodeAt(0);
//             if (ascii >= 65 && ascii <= 90) {
//                 // get RC of the parent Cell
//                 let { rowId, colId } = getRCFromAddr(fCOmp[i]);
//                 // Get value from db and replace in formula
//                 let parentObj = db[rowId][colId];
//                 parentObj.children.push({
//                     rowId: crowId,
//                     colId: ccolId
//                 })

//             }

//         }

//     }
//     function updateCell(rowId, colId, ans) {

//         $(`#grid .cell[rid=${rowId}][cid=${colId}]`).html(ans);
//         // $('#grid .cell[rid="+rowId"+"]["+"cid="+colId+"]"').html(ans);
//         let cellObject = db[rowId][colId];
//         cellObject.value = ans;
//         for (let i = 0; i < cellObject.children.length; i++) {
//             let childRc = cellObject.children[i];
//             let cObj = db[childRc.rowId][childRc.colId];
//             let cAns = evaluate(cObj.formula);
//             updateCell(childRc.rowId, childRc.colId, cAns);
//         }
//     }



//     function getRCFromAddr(cellAddress) {
//         // A1,A11
//         let Ascii = cellAddress.charCodeAt(0);
//         let colId = Ascii - 65;
//         let rowId = Number(cellAddress.substring(1)) - 1;
//         let obj = {
//             rowId: rowId,
//             colId: colId
//         }
//         return obj
//     }

//     function fn() {
//         $("#new").trigger("click");
//     }
//     fn();


// })


//COMPLETED FORMULA//////////////////////////////////
const $ = require("jquery");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(function () {
    let db;
    $("#grid .cell").on("click", function () {
        // perform 
        // action
        let rid = Number($(this).attr("rid")) + 1;
        let cid = Number($(this).attr("cid")) + 65;
        let address = String.fromCharCode(cid) + rid;
        //   to set value of input type element => val set  
        $("#address-input").val(address);
        let { rowId, colId } = getRCFromAddr(address);
        $("#formula-input").val(db[rowId][colId].formula);
    })


    // **************New Open Save**************
    // New
    $("#new").on("click", function () {
        // 
        db = [];
        let allRows = $("#grid").find(".row");
        for (let i = 0; i < allRows.length; i++) {
            let allCellOfarow = $(allRows[i]).find(".cell");
            let row = [];
            for (let j = 0; j < allCellOfarow.length; j++) {
                $(allCellOfarow[j]).html("");
                let cell = {
                    value: "",
                    formula: "",
                    children: [],
                    parents: []
                };
                row.push(cell);
            }
            db.push(row);
        }
    })


    $("#open").on("click", async function () {
        // it gives array of file Paths os selected file
        let sdb = await dialog.showOpenDialog();
        let buffer = fs.readFileSync(sdb.filePaths[0]);
        console.log(buffer);
        db = JSON.parse(buffer);
        let allRows = $("#grid").find(".row");
        for (let i = 0; i < allRows.length; i++) {
            let allCellOfarow = $(allRows[i]).find(".cell");
            for (let j = 0; j < allCellOfarow.length; j++) {
                $(allCellOfarow[j]).html(db[i][j].value);
            }

        }
    })
    $("#save").on("click", function () {
        // open dialogbox
        let sdb = dialog.showSaveDialogSync();
        let strData = JSON.stringify(db);
        console.log(sdb);
        // it directly gives pathon which file is to be created
        fs.writeFileSync(sdb, strData);
        console.log("File Saved");
        // write to disk

    })



    // ****************Formula************************
    // update
    // val=> val 
    // val => formula
    $("#grid .cell").on("blur", function () {
        //  update entry in db
        let rowId = $(this).attr("rid");
        let colId = $(this).attr("cid");
        let cellObject = db[rowId][colId];
        if (cellObject.formula) {
            removeFormula(cellObject, rowId, colId);
        }
        // to get text of any element except input
        let value = $(this).html();
        // console.log(value);
        updateCell(rowId, colId, value);
        // console.log(db);
    })

    // val=> formula
    // formula => formula
    $("#formula-input").on("blur", function () {
        let formula = $(this).val();
        // console.log(value);
        let cellAdddress = $("#address-input").val();
        let { rowId, colId } = getRCFromAddr(cellAdddress);
        let cellObject = db[rowId][colId];
        if (cellObject.formula) {
            removeFormula(cellObject, rowId, colId);
        }
        // coordinates=> update ui and db 
        let ans = evaluate(formula);
        cellObject.formula = formula;
        setUpFormula(rowId, colId, formula, cellObject);
        updateCell(rowId, colId, ans);
    })


    function evaluate(formula) {
        // Split and iterate over formula
        // ( A1 + A2 )
        let fCOmp = formula.split(" ");
        // [(,A1,+,A2)]
        console.log(fCOmp)
        for (let i = 0; i < fCOmp.length; i++) {
            let ascii = fCOmp[i].charCodeAt(0);
            if (ascii >= 65 && ascii <= 90) {
                // get RC of the parent Cell
                let { rowId, colId } = getRCFromAddr(fCOmp[i]);
                // Get value from db and replace in formula
                let value = db[rowId][colId].value;
                formula = formula.replace(fCOmp[i], value);
            }

        }
        console.log(formula);
        // evaluate the formula
        let ans = eval(formula);
        console.log(ans);
        return ans;
    }

    function setUpFormula(crowId, ccolId, formula, cellObject) {
        // Split and iterate over formula
        // ( A1 + A2 )
        let fCOmp = formula.split(" ");
        // [(,A1,+,A2)]
        console.log(fCOmp)
        for (let i = 0; i < fCOmp.length; i++) {
            let ascii = fCOmp[i].charCodeAt(0);
            if (ascii >= 65 && ascii <= 90) {
                // get RC of the parent Cell
                let { rowId, colId } = getRCFromAddr(fCOmp[i]);
                // Get value from db and replace in formula
                let parentObj = db[rowId][colId];
                parentObj.children.push({
                    rowId: crowId,
                    colId: ccolId
                })
                cellObject.parents.push({
                    rowId: rowId,
                    colId: colId
                })
            }

        }

    }
    function removeFormula(cellObject, rowId, colId) {
        for (let i = 0; i < cellObject.parents.length; i++) {
            let parentRc = cellObject.parents[i];
            let parentObj = db[parentRc.rowId][parentRc.colId];
            // let newArr = parentObj.children.filter(function (elemRc) {
            //     return !(rowId == elemRc.rowId && colId == elemRc.colId);
            // })
            // parentObj.children = newArr;

            let idx = parentObj.children.findIndex(function (elemRc) {
                return (rowId == elemRc.rowId && colId == elemRc.colId);
            })
            parentObj.children.splice(idx,1)
        }
        cellObject.parents = [];
        cellObject.formula = "";

    }
    function updateCell(rowId, colId, ans) {

        $(`#grid .cell[rid=${rowId}][cid=${colId}]`).html(ans);
        // $('#grid .cell[rid="+rowId"+"]["+"cid="+colId+"]"').html(ans);
        let cellObject = db[rowId][colId];
        cellObject.value = ans;

        for (let i = 0; i < cellObject.children.length; i++) {
            let childRc = cellObject.children[i];
            let cObj = db[childRc.rowId][childRc.colId];
            let cAns = evaluate(cObj.formula);
            updateCell(childRc.rowId, childRc.colId, cAns);
        }
    }



    function getRCFromAddr(cellAddress) {
        // A1,A11
        let Ascii = cellAddress.charCodeAt(0);
        let colId = Ascii - 65;
        let rowId = Number(cellAddress.substring(1)) - 1;
        let obj = {
            rowId: rowId,
            colId: colId
        }
        return obj
    }

    function fn() {
        $("#new").trigger("click");
    }
    fn();


})