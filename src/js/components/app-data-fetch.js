const url = 'http://localhost:3000/data';

export const dataTestLine = [19, 8, 7, 8, 14, 5, 6, 8, 15, 6, 4, 2, 2, 1 ];
export const dataTestDonut = [18235, 13359];
export var dataLineOutput = [];
export var dataDonutOutput = [];
console.log(dataLineOutput);
console.log(dataDonutOutput);


/*
 *
 * line chart data genration and mapping.
 * Sorry :( , I had trouble mapping the data to my chartjs componets. only pushes static data from above ie dataTestLine :(.
 * Still working on a solution though.
 *
*/
function map_data_to_line_chart(lineData) {
    var parseData = JSON.parse(lineData);
    dataLineOutput.push(parseData);
}


/*
 *
 * donut chart generation and mapping.
 * Sorry :(, I had trouble mapping the data to my chartjs componets. only maps static data from above ie dataTestDonut.
 *
*/
function map_data_to_donut_chart(donutData) {
    // console.log(donutData);
    dataDonutOutput.push(donutData);
}


/*
 *
 * Table data genration.
 *
*/
function map_data_to_table_chart(tableData) {
    // console.log(tableData);
    const get_ul_chart = document.getElementById("chart-data-table");

    var generate_li = document.createElement('li');
    var span_bikeid = document.createElement('span');
    var span_startime = document.createElement('span');
    var span_endtime = document.createElement('span');
    var span_duration = document.createElement('span');

    span_bikeid.innerHTML = tableData.bike_id;
    span_startime.innerHTML = tableData.start_time;
    span_endtime.innerHTML = tableData.end_time;
    span_duration.innerHTML = tableData.duration;

    generate_li.innerHTML += span_bikeid.outerHTML + span_startime.outerHTML + span_endtime.outerHTML + span_duration.outerHTML;
    get_ul_chart.appendChild(generate_li);
}


/*
 *
 * Data dispather/filter.
 *
*/
const getDataFilter = (data) => {
    // only working with reduced items for debugging purposes.
    data.filter((i, index) => (index < 10)).map(function(result) {
        map_data_to_line_chart(result.duration);
        map_data_to_donut_chart(result.trip_route_category);
        map_data_to_table_chart(result);
    });
};


/*
 *
 * Main json request.
 *
*/
fetch(url).then(response => response.json())
.then(getDataFilter)
.catch(function(error) {
    console.log('Oppps! something went wrong :(', error);
});
