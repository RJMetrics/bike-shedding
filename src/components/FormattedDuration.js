import React, { Component } from 'react'

export default class FormattedDuration extends Component {
  render() {
    const hours = Math.floor(this.props.value / 60);
    const minutes = Math.floor(this.props.value % 60);
    const formattedDuration = (hours > 0) ? `${hours}h ${minutes}m` : `${minutes}m`;

    return(
      <span>{formattedDuration}</span>
    )
  }
}
