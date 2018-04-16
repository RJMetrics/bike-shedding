// Convert time from 24-hour format to 12-hour format
function displayAmOrPm(hour) {
  if (hour > 12) {
    return (hour - 12) + "PM";
  } else if (hour == 12) {
    return hour + "PM";
  } else if (hour == 0) {
    return "12AM";
  } else {
    return hour + "AM";
  }
}

// Determine image to show, based on time of day
function displayTimeOfDayImage(hour) {
  if (hour >= 5 && hour < 10) {
    return "img/morning-icon.svg";
  } else if (hour >= 10 && hour < 17) {
    return "img/day-icon.svg";
  } else if (hour >= 17 && hour < 20) {
    return "img/evening-icon.svg";
  } else {
    return "img/night-icon.svg";
  }
}

// Determine alt tag for image, based on time of day
function displayTimeOfDayAlt(hour) {
  if (hour >= 5 && hour < 10) {
    return "Morning icon";
  } else if (hour >= 10 && hour < 17) {
    return "Day icon";
  } else if (hour >= 17 && hour < 20) {
    return "Evening icon";
  } else {
    return "Night icon";
  }
}

// Retrieve data from json file
var $chartsData = $.getJSON("data/indego.json", function(response) {

  //Create array to hold the hour that each bike was rented for the 'Bike Share Rides by Time of Day' chart
  var tripHours = [];

  // Filter data from json file so we just have the hour each bike was rented
  $.each(response, function (index, trip) {
    var tripDate = new Date(trip.start_time);
    var tripHour = tripDate.getHours();
    tripHours.push(tripHour);
  });

  // Count how many time bikes were rented per each hour of the day, store in object
  var hoursCount = tripHours.reduce(function(sums, hour) {
    sums[hour] = (sums[hour] || 0) + 1;
    return sums;
  },{});

  // Create an array that holds all the hours of the day for our chart's X axis
  var hourOfDay = Object.getOwnPropertyNames(hoursCount);

  // Create an array that holds the count of bikes rented for each hour for our chart's Y axis
  var hourCount = Object.values(hoursCount);

  // Determine which hour was the most popular hour to rent bikes
  var topHour = hourCount.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  // Get the element we will use for our 'Bike Share Rides by Time of Day' chart
  var lineChart = document.getElementById("lineChart").getContext("2d");

  // Apply styles to fonts for all charts so styles are consistent throughout dashboard
  Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
  Chart.defaults.global.defaultFontColor = "#575A5E";

  // Create gradient fill color for our chart
  var gradient = lineChart.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0.000, "rgba(85, 111, 181, 1.000)");
  gradient.addColorStop(1.000, "rgba(222, 246, 247, 1.000)");

  // Create 'Bike Share Rides by Time of Day' chart
  var myLineChart = new Chart(lineChart, {
    type: "line",
    data: {
      labels: hourOfDay,
      datasets: [{
        label: "Bike Share Rides",
        backgroundColor: gradient,
        data: hourCount
      }]
    },
    options: {
      animation: {
        easing: "easeInOutQuart"
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            callback: function(value, index, values) {
              if (value > 12) {
                return (value - 12) + "PM";
              } else if (value == 12) {
                return value + "PM";
              } else if (value == 0) {
                return "12AM";
              } else {
                return value + "AM";
              }
            }
          }
        }]
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10
      }
    }
  });

  // Calculate the remaining time from 12 to use as a second data point in the chart so we can create a cool visual representation of a clock!
  var remainderHour = Math.abs(12-topHour);

  // Convert our most popoular hour from 24-hour format to 12-hour format for our clock
  var displayHour = displayAmOrPm(topHour);

  // Insert the most popular hour into our HTML for any element with the class .time
  $(".time").text(displayHour);

  // Determine image to show, based on time of day
  var timeImage = displayTimeOfDayImage(topHour);

  // Determine alt tag to show, based on time of day
  var timeImageAlt = displayTimeOfDayAlt(topHour);

  // Insert image and alt tag into our HTML for the element with the class .time-icon
  $(".time-icon").attr({
    src: timeImage,
    alt: timeImageAlt
  });

  // Get the element we will use for our 'Most Popular Time of Day' chart
  var timeChart = document.getElementById("timeChart").getContext("2d");

  // Create 'Most Popular Time of Day' chart
  var myTimeChart = new Chart(timeChart, {
    type: "doughnut",
    data: {
      labels: ["Time"],
      datasets: [{
        label: "Most Popular Hour",
        backgroundColor: [
          gradient,
          "white"
        ],
        hoverBackgroundColor: [
          gradient,
          "white"
        ],
        hoverBorderColor: [
          "white",
          "white"
        ],
        data: [
          topHour,
          remainderHour
        ]
      }]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      layout: {
        padding: {
          left: 30,
          right: 30
        }
      }
    }
  });

  // Filter data from our JSON file for the 'Bike Share Rentals during topHour' table
  var topHourTrips = $(response).filter(function (index, trip){
    var tripDate = new Date(trip.start_time);
    var hour = tripDate.getHours();
    if (hour === topHour) {
      return trip;
    }
  });

  // Create 'Bike Share Rentals during topHour' table
  $("#bikeRentals").DataTable({
    data: topHourTrips,
    columns: [
        { data: "bike_id" },
        { data: "trip_id" },
        { data: "start_time" },
        { data: "end_time" },
        { data: "duration" },
        { data: "start_station" },
        { data: "end_station" }
    ],
    "searching": false
  });

});