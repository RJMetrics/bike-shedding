/*
 *
 * Genrates app markup yo.
 *
*/
export const appMarkupGenerate =
    `<div id="app-container-layout">
        <header>
            <ul>
                <li><img src="https://u626n26h74f16ig1p3pt0f2g-wpengine.netdna-ssl.com/wp-content/themes/indego/library/images/logo.png?v=2" /></li>
                <li></li>
            </ul>
        </header>
        <h2>2017 Quarter 4 Data</h2>
        <div>
            <section>
                <h3>Trip Duration:</h3>
                <canvas id="chart-data-line" height="400" width="400"></canvas>
            </section>
            <section>
                <h3>One Way vs. Round Trip:</h3>
                <canvas id="chart-data-donut" height="400" width="400"></canvas>
            </section>
        </div>
        <h3>Trip Logs:</h3>
        <section><span>Bike ID</span><span>Start Time</span><span>End Time</span><span>Trip Duration</span></section>
        <ul id="chart-data-table"></ul>
    </div>`;

export const appMarkupRender = document.getElementById("app").innerHTML = appMarkupGenerate;
