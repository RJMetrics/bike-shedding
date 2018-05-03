(function () {
    var timeGroups = [{ start: 0, end: 6, title: 'Real Early' },
    { start: 6, end: 10, title: 'Morning' },
    { start: 10, end: 15, title: 'Middle of Day' },
    { start: 15, end: 19, title: 'Evening' },
    { start: 19, end: 24, title: 'Late Night' }];

    var columnConfigs = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Most Popular Starting Stations'
        },
        xAxis: {
            categories: _.map(timeGroups, function (val) { return val.title })
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Rides'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        
    };

    function configData(stationData, rideData) {
        //group rides by start station
        var stationGroups = _.groupBy(rideData, 'start_station');
        //create array of stations with detailed station info, total started rides, and raw ride info
        var vizData = _.map(stationGroups, function (rides, key) {
            var dataPoint = _.find(stationData, function (station) { return parseInt(key, 10) === parseInt(station['Station ID'], 10) });
            dataPoint.totalRides = rides.length;
            dataPoint.rawRides = rides;
            return dataPoint;
        });
        //add property to vizData that is time groups of the raw ride info
        _.map(vizData, function (val) {
            val.hourRides = _.map(timeGroups, function (tg, index) {
                var timeGroupedRides = _.assign({}, tg);
                timeGroupedRides.rides = _.filter(val.rawRides, function (ride) {
                    var rideHour = parseInt(ride.start_time.substring(10, 13));
                    return rideHour >= tg.start && rideHour < tg.end;
                });
                return timeGroupedRides;
            });
        });
        //order groups by total rides and take top 7 for the chart
        vizData = _.orderBy(vizData,'totalRides', 'desc');
        vizData = _.slice(vizData, 0, 7);
        createColumnChart(vizData);
    }

    function createColumnChart(chartData) {
        //create data dependent configs for the chart from the initial data configs
        var dataConfigs = {};
        dataConfigs.xAxis = {
            categories: _.map(chartData, function(val){
                return val['Station Name'];
            })
        };
        dataConfigs.series = _.map(timeGroups, function(timeGroup){
            var dataPoint = {};
            dataPoint.name = timeGroup.title;
            dataPoint.data = _.map(chartData, function(val){
                var hourData = _.find(val.hourRides, function(o){ return timeGroup.title === o.title;});
                return hourData.rides.length;
            });
            return dataPoint;
        });
        dataConfigs.plotOptions = {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                },
                events: {
                    click: function(evt){
                        //Using evt info find corresponding rides from the chartData Parameter
                        var groupToDisplay = _.find(chartData, function(val){ return val['Station Name'] === evt.point.category});
                        var hourToDisplay = _.find(groupToDisplay.hourRides, function(val){  return val.title === evt.point.series.name});

                        //Create a new div with Stringified json text for each ride corresponding to block clicked.
                        var listBlock = document.getElementById('rawRideData');
                        listBlock.innerHTML = '';
                        _.map(hourToDisplay.rides, function(ride){
                            var newRow = document.createElement('div');
                            var rideInfo = document.createTextNode(JSON.stringify(ride));
                            newRow.appendChild(rideInfo);
                            listBlock.appendChild(newRow);
                        });
                    }
                }
            }
        }
        Highcharts.chart('bikeBarChart', _.assign(columnConfigs, dataConfigs));
    }

    function fetchData() {
        var getStation = fetch('./data/stations.json').then(handleJson);
        var getRideInfo = fetch('./data/indego.json').then(handleJson);
        Promise.all([getStation, getRideInfo]).then(function (data) {
            configData(data[0], data[1]);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function handleJson(response) {
        if (response.ok) {
            return response.json()
        }
        throw new Error(response.statusText);
    }

    document.addEventListener("DOMContentLoaded", function (evt) {
        fetchData();
    });
})()