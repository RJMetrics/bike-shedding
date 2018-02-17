import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault()
    let booleanSwitch = !this.state.questionClicked
    this.setState( {questionClicked: booleanSwitch} )
  }

  render() {
    let answer;
    if (this.state.questionClicked) {
      answer = <div className="card-body answer">This question can be answered in many different ways.  Are we taking into consideration the revenue being created by different typeholders or the continuos use and foot traffic of the service? This is the power of anaylitics. <br/><br/> If we take a look at the Walk-up rides, they make up the second most of all the rides taken this quarter. They don't pay an upfront monthly pass, however they pay an upfront charge of 4 dollars for their initial 30 minutes.  On average, they also go over their allotted 30 minutes and pay an additional 4 dollars for another 30 minutes.  We can also see this in the table above.<br/><br/>If we take a look at Indego30 typeholders, they make up the majority of the rides and they already pay 15 dollars upfront each month. However, their average ride duration is under 20 minutes. These users are experienced riders and have their destination and route planned. They are punctual and avoid paying the extra 4 dollar charge after one hour. <br/><br/> For these reasons, I believe Indego30 passholders and Walk-Up's give Indego the most business.</div>
    }

    return(
      <div className="text-center question-card">
        <div className="card bg-light">
          <div onClick={this.handleClick} className="card-header question">Question: Which Typeholder gives Indego the most business?</div>
          {answer}
        </div>
      </div>
    );
  }
};

export default Question;
