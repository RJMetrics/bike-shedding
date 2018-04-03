import { dataTestLine, dataLineOutput } from './app-data-fetch.js';


const chartLineGet = document.getElementById("chart-data-line");
let chartLineRender = new Chart(chartLineGet, {
    type: 'line',
    data: {
        labels: ["October", "November", "December"],
        datasets: [{
            label: 'Ride Duration',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor:'rgba(75,192,192,1)',
            data: dataTestLine,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
