function fetchData() {
    const API_ENDPOINT = "https://disease.sh/v3/covid-19/all";
    fetch(API_ENDPOINT)
    .then(function(response) {
        const jsonData = response.json();
        return jsonData;
    })
    .then(function(jsonData) {
        displayData(jsonData)
    })
}

function fetchVaccinatedData() {
    const API_ENDPOINT = "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=30&fullData=false";
    fetch(API_ENDPOINT)
    .then(function(response) {
        const jsonData = response.json();
        return jsonData;
    })
    .then(function(jsonData) {
        displayVaccinatedData(jsonData)
    })
}

function indianRepresentation(num) {
    const formattedNum = new Intl.NumberFormat("en-IN").format(num);
    return formattedNum;
}

function displayData(data) {
    const stats = document.querySelectorAll(".stat");
    // active cases
    stats[0].children[1].children[0].textContent = indianRepresentation(data.cases);
    stats[0].children[1].children[2].textContent = indianRepresentation(data.todayCases);
    //recovered case
    stats[1].children[1].children[0].textContent = indianRepresentation(data.recovered);
    stats[1].children[1].children[2].textContent = indianRepresentation(data.todayRecovered);
    //deaths
    stats[3].children[1].children[0].textContent = indianRepresentation(data.deaths);
    stats[3].children[1].children[2].textContent = indianRepresentation(data.todayDeaths);
    //total cases
    const headerConfirmedStat = document.querySelector("header");
    headerConfirmedStat.children[1].children[0].textContent = indianRepresentation(data.cases);
}

function displayVaccinatedData(data) {
    const stats = document.querySelectorAll(".stat");
    // Vaccinated data
    stats[2].children[1].children[0].textContent = indianRepresentation(data[ Object.keys(data).sort().pop()]);
}
window.onload = function(){
        fetchData();
        fetchVaccinatedData();
}
