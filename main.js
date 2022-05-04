async function main() {
    const apiUrl = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/PRC_HICP_MIDX?format=JSON&lang=en&freq=M&unit=I05&coicop=CP00&geo=DE&sinceTimePeriod=2005-06";
    const dataPromise = getData(apiUrl);

    const hicpNowEl = document.getElementById('HICP-new');
    const hicpNowElDate = document.getElementById('HICP-new-date');

    const data = await dataPromise;
    const valueArray = convertValueObjectToArray(data.value);
    const lastHICP = valueArray[valueArray.length - 1];

    insertLastHicpDate(data, valueArray, hicpNowEl, hicpNowElDate, lastHICP);

    handleToNewest(lastHICP);
}
main()

function handleToNewest(lastHICP) {
    const multiplier = lastHICP / 100;
    const convertEls = document.getElementsByClassName('toNewest');

    console.log(multiplier);

    for (const convertEl of convertEls) {
        console.log(parseInt(convertEl.dataset.base) * multiplier);
        convertEl.innerHTML = (parseInt(convertEl.dataset.base) * multiplier).toFixed(2);
    }
}

function insertLastHicpDate(data, valueArray, hicpNowEl, hicpNowElDate, lastHICP) {
    hicpNowEl.innerHTML = lastHICP;

    const dateIndex = data.dimension.time.category.index;
    const lastHicpDate = getKeyByValue(dateIndex, valueArray.length - 1);
    hicpNowElDate.innerHTML = lastHicpDate;
}

function convertValueObjectToArray(values) {
    const valueArray = [];

    for (const key in values) {
        valueArray[key] = values[key];
    }

    return valueArray;
}

async function getData(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}