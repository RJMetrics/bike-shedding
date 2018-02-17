import React from 'react';
import SVGContainer from './containers/SVGContainer';
import TopBar from './components/TopBar';
import Table from './components/Table';
import Questions from './components/Questions';

let json = require('../data/indego.json');

const App = props => {
  return(
    <div className="container-fluid">
      <TopBar />
      <div className="row">
        <div className="col-md-5">
          <SVGContainer json={json} />
        </div>
        <div className="col-md-7">
          <Table json={json}/>
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default App;
