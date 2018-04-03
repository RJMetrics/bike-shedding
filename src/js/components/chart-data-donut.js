import { dataTestDonut, dataDonutOutput } from './app-data-fetch.js';


export const chartDonutGet = document.getElementById("chart-data-donut");
export let chartDonutRender = new Chart(chartDonutGet, {
    type: 'doughnut',
    data: {
        labels: ["One Way", "Round Trip"],
        datasets: [{
            data: dataTestDonut,
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
});
