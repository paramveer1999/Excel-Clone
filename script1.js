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
                let cell="";
                row.push(cell);
            }
            db.push(row);
        }

    })
    $("#grid .cell").on("blur",function(){

        //updating entry in the database
        let rid=$(this).attr("rid");
        let cid=$(this).attr("cid");
        let value=$(this).html();
        console.log(value);
        db[rid][cid]=value;
        console.log(db);
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
                $(rowscol[j]).html(db[i][j]);
           
               
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
        let ans=evaluate(formula);
        //updating the ans on ui

        updateCell(rowId,colId,ans);
    })

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
                let value=db[rowId][colId];
                formula=formula.replace(fcomp[i],value);
            }

        }
        let ans=eval(formula);
        console.log(ans);
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

    }
})

