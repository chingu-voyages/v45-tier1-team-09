function checkEmptyCell(cellData){
    if(cellData == undefined || cellData == NaN || cellData == "Unknown" ){
        return "N/A"
    }else{
        return cellData
    }
}

function extractYearFromISO(isoDate){
    const date = new Date(isoDate)
    return date.getFullYear()
}   

export{checkEmptyCell, extractYearFromISO}