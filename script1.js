const $=require("jquery");
const fs=require("fs");
const dialog=require("electron").remote.dialog;
let db;

$(document).ready(function(){
    $(".grid .cell").on("click",function(){
        let rowId=Number($(this).attr("rid"))+1;
        let colId=Number($(this).attr("cid"))+65;
        let address=String.fromCharCode(colId)+rowId;
        $("#address-input").val(address);
    })
    $("#new").on("click",function(){
        db=[];

        let allRows=$("#grid").find(".row");
        for(let i=0;i<allRows.length;i++)
        {
            let row=[];
            let rowscol=$(allRows[i]).find(".cell");
            for(let j=0;j<rowscol.length;j++)
            {
                $(rowscol[j]).html("");
                let cell={
                    value:"",
                    formula:"",
                    children:[],
                    parents:[]
                };
                row.push(cell);
            }
            db.push(row);
        }

    })
    $("#grid .cell").on("blur",function(){

        //updating entry in the database
        let rowId=$(this).attr("rid");
        let colId=$(this).attr("cid");
        let value=$(this).html();
        let cellObject=db[rowId][colId];
        if(cellObject.formula){
            removeFormula(cellObject,rowId,colId);
        }
        //console.log(value);
        updateCell(rowId,colId,value);
        
        //console.log(db);
    })
    $("#open").on("click",async function(){
        let sdb=await dialog.showOpenDialog();
        let buffer=fs.readFileSync(sdb.filePaths[0]);
        db=JSON.parse(buffer);
        //STORING THE DATA INTO GRID BY MOVINBG INTO EACH LOOP
        let allRows=$("#grid").find(".row");
        for(let i=0;i<allRows.length;i++)
        {
            
            let rowscol=$(allRows[i]).find(".cell");
            for(let j=0;j<rowscol.length;j++)
            {
                $(rowscol[j]).html(db[i][j].value);
           
               
            }
        
        }
    })
    $("#save").on("click",function(){

        let sdb=dialog.showSaveDialogSync();
         let data=JSON.stringify(db);
         fs.writeFileSync(sdb,data);
         console.log("file saved");
    })


    ////////////////////////FORMULA//////////////////////////////////////

    $("#formula-input").on("blur",function(){

        let formula=$(this).val();

        let cellAddress=$("#address-input").val();
        let {rowId,colId}=getRC(cellAddress);
        let cellObject=db[rowId][colId];
        cellObject.formula=formula;
        //setup formula to add adress part into its parent children
        setUpformula(rowId,colId,formula,cellObject);
        ///////////////////////////////////////////////////////////
        let ans=evaluate(formula);
        //updating the ans on ui

        updateCell(rowId,colId,ans);
    })
    function setUpformula(crowId,ccolId,formula,cellObject)
    {
        let fcomp=formula.split(" ");
        //[(,A1,+,A2)]
        console.log(fcomp);
        for(let i=0;i<fcomp.length;i++)
        {
            let ascii=fcomp[i].charCodeAt(0);
            if(ascii>=65&&ascii<=90){
                //get RC FROM getRC function
                let {rowId,colId}=getRC(fcomp[i]);
                //getting the value from db and replacing it with formula
                let parentObj=db[rowId][colId];
                parentObj.children.push({
                    rowId:crowId,
                    colId:ccolId
                })
                cellObject.parents.push({
                    rowId:rowId,
                    colId:colId
                })
                
            }

        }
        
    }

    function evaluate(formula)
    {
        //split and iterarte over the formula
        let fcomp=formula.split(" ");
        //[(,A1,+,A2)]
        console.log(fcomp);
        for(let i=0;i<fcomp.length;i++)
        {
            let ascii=fcomp[i].charCodeAt(0);
            if(ascii>=65&&ascii<=90){
                //get RC FROM getRC function
                let {rowId,colId}=getRC(fcomp[i]);
                //getting the value from db and replacing it with formula
                let value=db[rowId][colId].value;
                formula=formula.replace(fcomp[i],value);
            }

        }
        let ans=eval(formula);
        console.log(ans);
        return ans;
    }
    function getRC(cellAddress)
    {
        ///THIS FUNCTION IS USED TO GET THE ROWID AND COLID OF ADDRESS INPUT LIKE B1

        let ascii=cellAddress.charCodeAt(0);
        let colId=ascii-65;
        let rowId=Number(cellAddress.substring(1))-1;
        return {rowId,colId};
    }
    function updateCell(rowId,colId,ans)
    {
        $(`#grid .cell[rid=${rowId}][cid=${colId}]`).html(ans);
        let cellObject=db[rowId][colId];
        cellObject.value=ans;
          //updating value of children also
        for(let i=0;i<cellObject.children.length;i++){
            let childRc=cellObject.children[i];
            let cObj=db[childRc.rowId][childRc.colId];
            let cAns=evaluate(cObj.formula);
            updateCell(childRc.rowId,childRc.colId,cAns);
        }
        
      
         

    }
    function removeFormula(cellObject,rowId,colId)
    {
        for(let i=0;i<cellObject.parents.length;i++)
        {
            let parentRc=cellObject.parents[i];
            let parentObj=db[parentRc.rowId][parentRc.colId];
            let newArr=parentObj.children.filter(function(elemRc){
                return !(rowId==elemRc.rowId&&colId==elemRc.colId);

            })
            parentObj.children=newArr
        }
        cellObject.parents=[];
        cellObject.formula="";

    }
    function fn(){
        $("#new").trigger("click");
    }
    fn();
})

