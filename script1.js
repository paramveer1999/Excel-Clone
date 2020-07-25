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
    $("#open").on("click",function(){

    })
    $("#save").on("click",async function(){

        let sdb=await dialog.showOpenDialog();
         let data=JSON.stringify(db);
         fs.writeFileSync(sdb.filePaths[0],data);
         console.log("file saved");


    })
})

