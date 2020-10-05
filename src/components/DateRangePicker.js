import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const DateRangePickerInput = (props) => {
  return (
    <div className="customDateRangePicker">
      <DateRangePicker
        initialSettings={{ 
          // startDate: '2020/01/01', 
          // endDate: '2020/01/15',
          autoUpdateInput: false,
          locale: {
            cancelLabel: 'Clear',
            format: 'YYYY/MM/DD'
          }
        }}
        onApply={ props.handleApply }
        onCancel={ props.handleClear }
        startDate={ props.startDate } 
        endDate={ props.endDate } 
      >
        <input
          className="customDateRangePicker__input"
          type="text" 
          onChange={ props.handleApply }
          value={ props.inputValue }
        />
      </DateRangePicker>
      <div className="customDateRangePicker__dummy"></div>
    </div>
  );
}

export default DateRangePickerInput;