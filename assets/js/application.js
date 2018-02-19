$(document).ready(function() {
  requirejs(['/assets/js/common.js'], function(common) {
    require(['dstore', 'dojo/_base/declare',
      'dgrid/Grid', 'dgrid/extensions/Pagination', 'dijit/Dialog', 'mapboxGL',
      'moment'
    ], function(RequestMemory, declare, Grid, Pagination, Dialog, mapBoxGL, moment) {

      // not good to do this, but for the sake of this excerise I will leave it here.
      mapBoxGL.accessToken = 'pk.eyJ1IjoiZG9ub3ZhbmNsYXJrZSIsImEiOiJjamRvdjdjeDEwcms1MnBwa2ZqaXk0dDJuIn0.3St3cLui5wjQ8RnlMBFz0w';

      var grid = new(declare([Grid, Pagination]))({
        collection: new RequestMemory({
          target: '/data/indego.json'
        }),
        columns: {
          trip_id: {
            label: 'Trip Id',
            renderCell: function(object, value, node) {
              var tripLink = document.createElement('a');
              tripLink.innerHTML = object.trip_id;
              tripLink.href = 'javascript:void(0)';
              tripLink.addEventListener('click', function(e) {
                var content = document.createElement('div');
                content.className = 'dialog-table';
                content.innerHTML = '<p>Trip began at ' + moment(object.start_time).format('ddd, MMM Do YYYY, h:mm a') + ', and was taken from station ' + object.start_station + '.</p>' +
                                    '<p>Trip ended at ' + moment(object.end_time).format('ddd, MMM Do YYYY, h:mm a') + ', and was returned to station ' + object.end_station + '.</p>'

                var tripDialog = new Dialog({
                  title: "Trip information for " + object.trip_id,
                  className: "claro",
                  content: content
                });
                tripDialog.show();
              })
              node.appendChild(tripLink);
            }
          },
          duration: {
            label: 'Time spent on bike',
            renderCell: function(object, value, node) {
              var durationInfo = document.createElement('span');
              durationInfo.innerHTML = object.duration + ' minutes';
              node.appendChild(durationInfo);
            }
          },
          bike_id: 'Bike id',
          trip_route_category: 'Trip type',
          locale: {
            label: 'Pick up and drop off location',
            renderCell: function(object, value, node) {
              var infoLink = document.createElement('a');
              infoLink.innerHTML = 'Info';
              infoLink.href = 'javascript:void(0)';
              infoLink.addEventListener('click', function(e) {
                var mapID = 'mapID-' + object.trip_id + Math.floor(Math.random() * 100);
                var content = document.createElement('div');
                content.className = 'dialog-table';
                content.innerHTML = '<div id="' + mapID + '"></div>';
                var locationDialog = new Dialog({
                  title: "Pick-up / drop-off information for " + object.trip_id,
                  className: "claro",
                  content: content
                });

                locationDialog.show();
                // custom icons to insert into map
                var greenIcon = new L.Icon({
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                });
                var redIcon = new L.Icon({
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                });

                var locations = [
                  ['Start Location', object.start_lat, object.start_lon, greenIcon],
                  ['End Location', object.end_lat, object.end_lon, redIcon]
                ]
                var map = object.trip_id;
                map = L.map(mapID).setView([object.start_lat, object.start_lon], 13);
                for (var i = 0; i < locations.length; i++) {
                  marker = new L.marker([locations[i][1], locations[i][2]], {
                      icon: locations[i][3]
                    })
                    .bindPopup(locations[i][0])
                    .addTo(map);
                }

                L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
                  maxZoom: 18,
                  id: 'mapbox.streets',
                  accessToken: 'pk.eyJ1IjoiZG9ub3ZhbmNsYXJrZSIsImEiOiJjamRvdjdjeDEwcms1MnBwa2ZqaXk0dDJuIn0.3St3cLui5wjQ8RnlMBFz0w'
                }).addTo(map);
              })
              node.appendChild(infoLink);
            }
          }
        },
        pagingLinks: 1,
        pagingTextBox: true,
        firstLastArrows: true,
        pageSizeOptions: [20, 40, 150],
        rowsPerPage: 20
      }, 'grid')
    });
  })

  $(function() {

    var $ctx = $('#pieChart'),
      $ctx2 = $('#barChart');

    var myChart = new Chart($ctx, {
      type: 'pie',
      membership: {
        labels: [],
        datasets: []
      }
    });
    var myChart2 = new Chart($ctx2, {
      type: 'bar',
      tripType: {
        labels: [],
        datasets: []
      }
    });
    updateChart(myChart, myChart2);
  })

})
// two requests to the same indego file, not ideal, TODO: REFACTOR
function updateChart(chart, chart2) {
  $.ajax({
    type: 'POST',
    dataType: 'JSON',
    url: 'data/indego.json',
    success: function(result) {
      // membership type data
      var passType30 = result.filter(function(el) {
        return (el.passholder_type == 'Indego30');
      }).length
      var passTypeWalk = result.filter(function(el) {
        return (el.passholder_type == 'Walk-up');
      }).length
      var passTypeOne = result.filter(function(el) {
        return (el.passholder_type == 'One Day Pass');
      }).length
      var passTypeFlex = result.filter(function(el) {
        return (el.passholder_type == 'IndegoFlex');
      }).length

      var oneWayType = result.filter(function(el) {
        return (el.trip_route_category == 'One Way');
      }).length
      var roundTripType = result.filter(function(el) {
        return (el.trip_route_category == 'Round Trip');
      }).length

      var membership = {
        labels: ['Indego30', 'Walk-up', 'One day pass', 'IndegoFlex'],
        datasets: [{
          label: 'Type of membership',
          data: [passType30, passTypeWalk, passTypeOne, passTypeFlex],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }

      var tripType = {
        labels: ['One way', 'Roundtrip'],
        datasets: [{
          label: 'Type of trips taken',
          data: [oneWayType, roundTripType],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
      chart.data.labels = membership.labels
      chart.data.datasets = membership.datasets
      chart.update()

      chart2.data.labels = tripType.labels
      chart2.data.datasets = tripType.datasets
      chart2.update()
    }
  })

}
