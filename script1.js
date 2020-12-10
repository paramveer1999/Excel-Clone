const $=require("jquery");
const fs=require("fs");
const { systemPreferences } = require("electron");
const dialog=require("electron").remote.dialog;
let db;
let lsc;
let copy;
let cut;

$(document).ready(function(){
    $("#grid .cell").on("click",function(){
        let rId=Number($(this).attr("rid"))+1;
        let cId=Number($(this).attr("cid"))+65;
        
        let address=String.fromCharCode(cId)+rId;
        let {rowId,colId}=getRC(address);
        const cellObject=db[rowId][colId];
        $("#address-input").val(address);
        lsc=this;
        if(cellObject.bold){
            $("#bold").addClass("active");
        }
        else{
            $("#bold").css("background-color","darkgray");
            $("#bold").removeClass("active");

        }
        if(cellObject.underline){
            $("#underline").addClass("active");
        }
        else{
            $("#undeline").removeClass("active");
        }
        if(cellObject.italic){
            $("#italic").addClass("active");
        }
        else{
            $("#italic").removeClass("active");
        }
    })
    //FONT-FAMILY
    $("#font-family").on("change",function(){
        let ffam=$(this).val();
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("font-family",ffam);
        cellobject.fontFamily=ffam;
        // ////////////////////chnging the height of row also/////////////////
        let height1=$(lsc).height();
        console.log(height1);
        let myrow=$(lsc).attr("rid");
        let allleftcol=$("#left-col .cell");
        let mycol=allleftcol[myrow];
        $(mycol).height(height1);
    })
    $("#copy").on("click",function(){
       copy=$(lsc).html();
       cut="";
    })
    $("#cut").on("click",function(){
        cut=$(lsc).html();
            copy="";
            let {rowId,colId}=getrcoflast(lsc);
            let cellObject=db[rowId][colId];
            if(cellObject.formula){
                removeFormula(cellObject,rowId,colId);
            }
            $(`#grid .cell[rid=${rowId}][cid=${colId}]`).html("");
            //change left col height
            $(lsc).keyup();
    })
    $("#paste").on("click",function(){
        paste=cut?cut:copy
        $(lsc).html=paste;
        if(!cut&&!copy){
            return;
        }
        
        let {rowId,colId}=getrcoflast(lsc);
        let cellObject=db[rowId][colId];
        if(cellObject.formula){
            removeFormula(cellObject,rowId,colId);
        }
        updateCell(rowId,colId,paste)
        paste=""
        cut=""
        copy=""
    })
    //FONT-SIZE
    $("#font-size").on("change",function(){
        let fsize=$(this).val();
        let {rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("font-size",fsize+"px");
        cellobject.fontsize=fsize;

    
        // ////////////////////chnging the height of row also/////////////////
        let height1=$(lsc).height();
        console.log(height1);
        let myrow=$(lsc).attr("rid");
        let allleftcol=$("#left-col .cell");
        let mycol=allleftcol[myrow];
        $(mycol).height(height1);

    })
    //background-color
    $("#b-color").on("change",function(){
        let bcolor=$(this).val();
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("background-color",bcolor);
        cellobject.bcolor=bcolor;
    })
    //Font-color
    $("#font-color").on("change",function(){
        let color=$(this).val();
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("color",color);
        cellobject.color=color;
    })
    $("#underline").on("click",function(){
        $(this).toggleClass("active");
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("text-decoration",cellobject.underline?"none":"underline");
        cellobject.underline=!cellobject.underline;

    })
    $("#italic").on("click",function(){
       
        $(this).toggleClass("active");
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("font-style",cellobject.italic?"normal":"italic");
        cellobject.italic=!cellobject.italic;

    })
    $("#alli-1").on("click",function(){
        $(this).toggleClass("active");
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        
        $(lsc).css("text-align","left");
        cellobject.leftalign=!cellobject.leftalign;
    })
    $("#alli-2").on("click",function(){
        $(this).toggleClass("active");
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
       
        $(lsc).css("text-align","center");
        cellobject.center=!cellobject.center;
    })
    $("#alli-3").on("click",function(){
        $(this).toggleClass("active");
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(lsc).css("text-align","right");
        cellobject.rightalign=!cellobject.rightalign;
    })

    $("#bold").on("click",function(){
        $(this).toggleClass("active");
       
        let{rowId,colId}=getrcoflast(lsc);
        let cellobject=db[rowId][colId];
        $(this).css("background-color",cellobject.bold?"darkgray":"floralwhite");
        $(lsc).css("font-weight",cellobject.bold?"normal":"bold");
        cellobject.bold=!cellobject.bold;
       
        // ////////////////////chnging the height of row also/////////////////
        let height1=$(lsc).height();
        console.log(height1);
        let myrow=$(lsc).attr("rid");
        let allleftcol=$("#left-col .cell");
        let mycol=allleftcol[myrow];
        $(mycol).height(height1);

    })

    //CHANGING THE HEIGHT OF ROW ACCORDING TO HIGHT OF CELL
    $("#grid .cell").on("keyup",function(){
        let height1=$(this).height();
        let myrow=$(this).attr("rid");
        let allleftcol=$("#left-col .cell");
        let mycol=allleftcol[myrow];
        $(mycol).height(height1);
    })
    ////CHANGING THE POSITION OF LEFT COL AND TOP ROW acc to the scrolling
    $("#cell-container").on("scroll",function(){
        let vs=$(this).scrollTop();
        let hz=$(this).scrollLeft();
        $("#t1-cell,#top-row").css("top",vs);
        $("#t1-cell,#left-col").css("left",hz);
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
                    parents:[],
                    bold:false,
                    italic:false,
                    underline:false,
                    leftalign:false,
                    rightalign:false,
                    center:false,
                    fontFamily:"arial",
                    color:"black",
                    bcolor:"white",
                    fontsize:12
                };
                row.push(cell);
            }
            db.push(row);
        }
        let allcells=$("#grid .cell")
        $(allcells[0]).trigger("click");

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
                let cellobject=db[i][j];
                $(rowscol[j]).html(cellobject.value);
                    // bold:false,
                    // italic:false,
                    // underline:false,
                    // fontFamily:"arial",
                    // color:"black",
                    // bcolor:"white",
                    // fontsize:12
                $(rowscol[j]).css("bold",cellobject.bold ?"bold":"normal");
                $(rowscol[j]).css("font-style",cellobject.italic ?"italic":"normal");
                $(rowscol[j]).css("text-decoration",cellobject.underline ?"underline": "none");
                $(rowscol[j]).css("font-family",cellobject.fontFamily);
                $(rowscol[j]).css("background-color",cellobject.bcolor);
                $(rowscol[j]).css("color",cellobject.color);
                $(rowscol[j]).css("text-align",cellobject.center?"center":"none");
                $(rowscol[j]).css("text-align",cellobject.right?"right":"none");
                $(rowscol[j]).css("text-align",cellobject.leftalign?"left-align":"none");

            }
        
        }
    })
    $("#save").on("click",function(){

        let sdb=dialog.showSaveDialogSync();
         let data=JSON.stringify(db);
         fs.writeFileSync(sdb,data);
         console.log("file saved");
    })
    ///clicking on file and them home
    // $(".menu").on("click",function(){
    //     let optionName=$(this).attr("id");

    //     $(".menu-options").removeClass("active");
    //     $('#${ optionName }-menu-options').addClass("active");
    // })
    $(".menu").on("click", function () {
        let optionName = $(this).attr("id");
        $(".menu-options").removeClass("active");
        $(`#${optionName}-menu-options`).addClass("active");
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
    function getrcoflast(this1){
        let rowId=$(this1).attr("rid");
        let colId=$(this1).attr("cid");
        return{rowId,colId};
    }
    function fn(){
        $("#Home").trigger("click");
        $("#new").trigger("click");
    }
    fn();
})

