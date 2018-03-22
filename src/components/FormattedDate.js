import React, { Component } from 'react'
import moment from 'moment'

export function formatDate(value) {
  const date = moment(value);

  return date.format('MMM Do @ ha');
}
export function formatFullDate(value) {
  const date = moment(value);

  return date.format('MMMM Do @ ha');
}
export default class FormattedDate extends Component {
  render() {
    const { value } = this.props;
    const date = formatFullDate(value);

    return(
      <span>{date}</span>
    )
  }
}
