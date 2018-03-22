import React, { Component } from 'react'
import HeaderImg from './../assets/img/genuine-logo.svg'

export default class Header extends Component {
  render() {
    return (
      <header className="dashboard--header">
      <img src={HeaderImg} alt='G Dashboard'/></header>
    )
  }
}
