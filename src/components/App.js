import React, { Component } from 'react';
import moment from 'moment'; // date formatting purpose
import DateRangePickerInput from './DateRangePicker';
import MailListBlock from './MailListBlock';

class App extends Component {

  state = {
    startDate: null, // if initial start 1900/01/01 (moment(new Date('1900/01/01')).format('YYYY/MM/DD'))
    endDate: null, // if initial end today (moment(new Date()).format('YYYY/MM/DD'))
    inputValue: ''
  };

  handleApply = (event, range) => {
    const start = moment(range.startDate._d).format('YYYY/MM/DD');
    const end = moment(range.endDate._d).format('YYYY/MM/DD');
    this.setState({ startDate: start, endDate: end, inputValue: start + ' - ' + end });
    // console.log(start, end);
  };

  handleClear = (event, range) => {
    const start = moment(new Date()).format('YYYY/MM/DD');
    const end = moment(new Date()).format('YYYY/MM/DD');
    this.setState({ startDate: start, endDate: end, inputValue: '' });
    // console.log(start, end);
  };

  render () {
    return (
      <div className="l-container--1280 appContainer">
        <DateRangePickerInput 
          handleApply={ this.handleApply }
          handleClear={ this.handleClear }
          startDate={ this.state.startDate }
          endDate={ this.state.endDate }
          handleValueChange={ this.handleValueChange }
          inputValue={ this.state.inputValue }
        />
        <MailListBlock 
          startDate={ this.state.startDate }
          endDate={ this.state.endDate }
        />
      </div>
    );
  }
}

export default App;
