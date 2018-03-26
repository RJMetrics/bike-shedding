// JavaScript Document
//Table
$("#indiego").tabulator( {
	responsiveLayout:true,
	layout:"fitColumns",
	columns:[
    {title:"Trip", field:"trip_id", responsive:2, minWidth:100, sortable:true},
    {title:"Duration", field:"duration", sortable:true,responsive:2, sorter:"number"},
    {title:"Start<br>Time", field:"start_time",responsive:2, minWidth:200, sortable:true},
    {title:"End<br>Time", field:"end_time", responsive:2,minWidth:200, sortable:true},
    {title:"Start<br>Station", field:"start_station",responsive:4, minWidth:50, sortable:true},
	{title:"End<br>Station", field:"end_station",responsive:4, minWidth:50, sortable:true},
	{title:"Bike<br>ID", field:"bike_id",responsive:5, minWidth:100, sortable:true},
	{title:"Plan<br>Duration", field:"plan_duration",responsive:5, minWidth:100, sortable:true},
	{title:"Trip<br>Route", field:"trip_route_category", responsive:1, sortable:true},
	{title:"Pass<br>Type", field:"passholder_type", responsive:0, minWidth:100, sortable:false},
		],
});
	
	//trigger download of data.csv file
$("#download-csv").click(function(){
    $("#indiego").tabulator("download", "csv", "data.csv");
});

//trigger download of data.json file
$("#download-json").click(function(){
    $("#indiego").tabulator("download", "json", "data.json");
});

	//This filters the data before showing in the table
$("#indiego").tabulator("setFilter", "passholder_type", "like", "IndegoFlex");
$("#indiego").tabulator("setData", "https://raw.githubusercontent.com/thecarousel/bike-shedding/master/data/indego.json");

	// Load google charts
google.charts.load('current',  {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
 
// Draw the chart and set the chart values
function drawChart() {
  var data =  google.visualization.arrayToDataTable([
  ['Passholder Type', 'Total Rides'],
   ['Indego30', 8927],
  ['IndegoFlex', 49],
  ['One Day Pass',  72],
  ['Walk-up', 951],
]);
  var options = {'title':'Pass Popularity', 
				 'width': 270,
				 'height': 250,
				 'chartArea':{'width':'95%', 'height':'80%'},
				 backgroundColor:'#EBE8E8'};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new  google.visualization.PieChart(document.getElementById('piechart'));
   chart.draw(data, options);
}