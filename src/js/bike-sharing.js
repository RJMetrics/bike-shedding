// Retrieve data from json file
var $hourData = $.getJSON('data/indego.json', function(response) {

	//Create array to hold the hour that each bike was rented for the 'Bike Share Rides by Time of Day' chart
	var hours = [];

	// Filter data from json file so we just have the hour each bike was rented
	$.each(response, function (index, journey) {
		var tripDate = new Date(journey.start_time);
		var hour = tripDate.getHours();
		hours.push(hour);
	});

	// Count how many time bikes were rented per each hour of the day, store in object
	var hoursCount = hours.reduce(function(sums, day) {
		sums[day] = (sums[day] || 0) + 1;
		return sums;
	},{});

  // Create an array that holds all the hours of the day for our chart's X axis
	var hourOfDay = Object.getOwnPropertyNames(hoursCount);

	// Create an array that holds the count of bikes rented for each hour for our chart's Y axis
	var hourCount = Object.values(hoursCount);

	// Determine which hour was the most popular hour to rent bikes
	var topHour = hourCount.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

	// Get the element we will use for our 'Bike Share Rides by Time of Day' chart
	var chart = document.getElementById("myChart").getContext('2d');

	// Create gradient fill color for our chart
	gradient = chart.createLinearGradient(0, 0, 0, 450);
	gradient.addColorStop(0.000, 'rgba(85, 111, 181, 1.000)');
  gradient.addColorStop(1.000, 'rgba(222, 246, 247, 1.000)');

  // Create 'Bike Share Rides by Time of Day' chart
	var myLineChart = new Chart(chart, {
	    type: 'line',
	    data: {
	    	labels: hourOfDay,
	    	datasets: [{
	    		label: 'Bike Share Rides',
	    		backgroundColor: gradient,
          data: hourCount
	    	}]
	    },
	    options: {
	    	animation: {
	    		easing: 'easeOutElastic'
	    	},
	    	legend: {
	    		display: false
	    	},
	    	scales: {
          xAxes: [{
            ticks: {
              callback: function(value, index, values) {
              	if (value > 12) {
              		return (value - 12) + "PM;"
              	} else if (value == 12) {
              		return value + "PM";
              	} else {
                  return value + "AM";
              	}
              }
            }
          }]
        }
	    }
	});

  // Calculate the hours______ so we can create a cool visual representation of a clock!
	var remainderHour = Math.abs(12-topHour);

	// Convert our most popoular hour from 24-hour format to 12-hour format for our clock
	var displayHour = displayAmOrPm(topHour);

	// Insert the most popular hour into our HTML 
	$(".time").text(displayHour);

	// Get the element we will use for our 'Most Popular Time of Day' chart
	var timeChart = document.getElementById("timeChart").getContext('2d');

	// Create 'Most Popular Time of Day' chart
	var myDoughnutChart = new Chart(timeChart, {
	    type: 'doughnut',
	    data: {
	    	labels: ['Time'],
	    	datasets: [{
	    		label: 'Most Popular Hour',
	    		backgroundColor: [
	    		gradient,
	    		'white'
	    		],
          data: [topHour, remainderHour]
	    	}]
	    },
	    options: {
	    	legend: {
	    		display: false
	    	}
	    }
	});

  // Filter data from our JSON file for the bike data table
	var bike = $(response).filter(function (index, journey){
      return journey.bike_id == "03631";
  });

  // Create variable to hold HTML for bike data table
	var tableHTML = '';

	// Loop through each data ENTRY_, add HTML row to table
	$.each(bike, function (index, journey) {
		tableHTML += '<tr><td>' + journey.bike_id + '</td>';
		tableHTML += '<td>' + journey.trip_id + '</td>';
		tableHTML += '<td>' + journey.duration + '</td>';
		tableHTML += '<td>' + journey.start_time + '</td>';
		tableHTML += '<td>' + journey.end_time + '</td>';
		tableHTML += '<td>' + journey.start_station + '</td>';
		tableHTML += '<td>' + journey.end_station + '</td></tr>';
	});

	// Append table rows to table with ID of bikeTable
	$("#bikeTable").append(tableHTML);

}); 

//Convert time from 24-hour format to 12-hour format
function displayAmOrPm(hour) {
	if (hour > 12) {
		return (hour - 12) + "PM";
	} else {
		return hour + "AM";
	}
};