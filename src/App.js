import './styles/css/App.css'
import PeakTimeChart from './components/PeakTimeChart'
import PassholderChart from './components/PassholderChart'
import Header from './components/Header'
import DataTable from './components/DataTable'
import { pushRotate as Menu } from 'react-burger-menu'
import React, { Component } from 'react'

const isMenuOpen = (state) => {
  return state.isOpen;
};
const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '18px'
  },
  bmBurgerBars: {
    background: '#B4EC51'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#232529',
    overflow: 'hidden',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#232529'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
class App extends Component {
  render() {
    return (
      <div id="outer-container">
        <div className="App">
          <Menu
            pageWrapId={ "page-wrap" }
            outerContainerId={ "outer-container" }
            onStateChange={ isMenuOpen }
            isOpen={false}
            minWidth={ '20%' }
            styles={ styles }>
            <a href="/">Item 1</a>
          </Menu>
          <main id="page-wrap">
            <Header/>
            <div className="dashboard--wrapper">
              <PeakTimeChart/>
              <PassholderChart/>
              <DataTable/>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
