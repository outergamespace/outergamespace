import React from 'react';

class Question extends React.Component {
  constructor (props) {
    super(props);
    //this.state =
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div >{this.props.question}</div>
          <div>Put Timer Here</div>
        </div>
        <div className="row">
          
            <form className="row-item" action="">
              <div className="answer">
                <label htmlFor="answer1" className="row">
                  <input type="radio" name="answer" id="answer1" />
                  {this.props.answers[0]}
                </label>
                <label htmlFor="answer2" className="row">
                  <input type="radio" name="answer" id="answer2" />
                  {this.props.answers[1]}
                </label>
                <label htmlFor="answer3" className="row">
                  <input type="radio" name="answer" id="answer3" />
                  {this.props.answers[2]}
                </label>
                <label htmlFor="answer4" className="row">
                  <input type="radio" name="answer" id="answer4" />
                  {this.props.answers[3]}
                </label>
              </div>
              <button>Submit</button>
            </form>
            <div className="hide-on-player row-item">
              answered player checklist goes here
            </div>
          
        </div>

      </div>

    );
  }
}

export default Question;
