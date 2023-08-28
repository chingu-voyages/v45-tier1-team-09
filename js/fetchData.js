const API = "https://data.nasa.gov/resource/gh4g-9sfh.json"

async function getApiData(){
    const response = await fetch(API)
    return await response.json();
    
}

//Put Csv into JSON format
async function getCsvData(){

}

export {getApiData, getCsvData}