import React, { Component } from 'react';
import emailData from './../data/emails.json';
import moment from 'moment'; // date formatting purpose

const emailList = emailData.emails;

class MailListBlock extends Component {

  state = {
    prevBtn: {
      prevTxt: false,
      btnTxt: 'Hidden'
    },
    dateBtn: { 
      orderByNew: true,
      btnTxt: 'Latest'
    }
  };

  filterMailsByDateRange = (mail) => {
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    const mailDate = moment(mail.date).format('YYYY/MM/DD');
    const inRange = moment(mailDate).isBetween(startDate, endDate, undefined, '[]');
    // console.log('start: ' + startDate + ' end: ' + endDate + ' mail:' + mailDate + ' inRange: ' + inRange);
    return inRange;
  };

  handlePrevTxt = (state) => {
    if ( this.state.prevBtn.prevTxt ) {
      this.setState( { prevBtn: { prevTxt: false, btnTxt: 'Hidden' } } );
    } else {
      this.setState( { prevBtn: { prevTxt: true, btnTxt: 'Shown' } } );
    }
  };

  handleDateFormat = (date) => {
    if ( moment(date).isSame(new Date(), 'day') ) {
      return moment(date).format('H:mm');
    } else if ( moment(date).isSame(new Date(), 'month') ) {
      return moment(date).format('MMM DD');
    } else {
      return moment(date).format('YYYY/MM/DD');
    }
  };

  handleOrderState = () => {
    this.setState( { orderByRecent: false } );
    if ( this.state.dateBtn.orderByNew ) {
      this.setState( { dateBtn: { orderByNew: false, btnTxt: 'Oldest' } } );
    } else {
      this.setState( { dateBtn: { orderByNew: true, btnTxt: 'Latest' } } );
    }
  };

  render() {
    // order consition (recent or old)
    const filteredMails = () => {
      if ( this.state.dateBtn.orderByNew ) {
        // filtering here for the sake of getting the length, otherwise it can be done below at <tbody> section
        return emailList.filter( (mail) => this.filterMailsByDateRange(mail) === true );
      } else {
        return emailList.filter( (mail) => this.filterMailsByDateRange(mail) === true ).reverse();
      }
    }
    const filteredMailsNum = filteredMails().length;

    return (
      <div className="mailListBlock">
        <div className="mailListBlock__counter">Results: <span className="mailListBlock__counterNum">{ filteredMailsNum }</span>mail(s)</div>

        { filteredMailsNum < 1 && /* if no mail */
          <div className="mailListBlock__inner"></div> 
        }

        { filteredMailsNum > 0 && /* if there is a mail */
          <div>
            <div className="pc">
              <table className="d-mailListTable">
                <thead>
                  <tr>
                    <th className="d-mailListTable__from" onClick={ this.filterMailsByDateRange }>From</th>
                    <th className="d-mailListTable__to">To</th>
                    <th className="d-mailListTable__more"></th>
                    <th className="d-mailListTable__subject">Subject 
                      <span className="d-mailListTable__prevTxt">( Preview text: 
                        <span 
                          className="d-mailListTable__prevTxtBtn"
                          onClick={ this.handlePrevTxt }
                          >{ this.state.prevBtn.btnTxt }</span> )
                      </span>
                    </th>
                    <th className="d-mailListTable__attachment"></th>
                    <th className="d-mailListTable__date">Date:
                      <span 
                        className="d-mailListTable__dateBtn" 
                        onClick={ this.handleOrderState }
                        >{ this.state.dateBtn.btnTxt }</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mail list PC */}
                  { /* emailList.map( (mail) => {} )  <-- if just to map(), use this */ }
                  { filteredMails().map( (filteredMail) => {
                      const mailToNum = filteredMail.to.length - 1;
                      const attachment = filteredMail.attachment;

                      return (
                        <tr key={filteredMail.id.toString()}>
                          <td className="d-mailListTable__from">{ filteredMail.from }</td>
                          <td className="d-mailListTable__to">{ filteredMail.to }</td>
                          <td className="d-mailListTable__more">
                            { mailToNum > 0 
                              ? <div className="d-mailListTable__moreIcon">+{ mailToNum }</div> 
                              : null 
                            }
                          </td>
                          <td className="d-mailListTable__subject">
                            <span>{ filteredMail.subject }</span><br />
                            { this.state.prevBtn.prevTxt 
                              ? <span className="d-mailListTable__body">{ filteredMail.body }</span> 
                              : null 
                            }
                          </td>
                          <td className="d-mailListTable__attachment">
                            { attachment 
                              ? <span className="d-mailListTable__attachmentIcon"></span> 
                              : null 
                            }
                          </td>
                          <td className="d-mailListTable__date">{ this.handleDateFormat(filteredMail.date) }</td>
                        </tr>
                      )
                  }) }
                </tbody>
              </table>
            </div>

            <div className="sp">
              <div className="m-mailListTable">
                <div className="m-mailListTable__headRow clearfix">
                  <div className="m-mailListTable__prevTxt">Preview text:
                    <span 
                      className="m-mailListTable__prevTxtBtn"
                      onClick={ this.handlePrevTxt }
                      >{ this.state.prevBtn.btnTxt }</span>
                  </div>
                  <div className="m-mailListTable__dateBtnWrap">Date:
                    <span 
                      className="m-mailListTable__dateBtn" 
                      onClick={ this.handleOrderState }
                      >{ this.state.dateBtn.btnTxt }</span>
                  </div>
                </div>
                <div className="m-mailListTable__liRow">
                  {/* Mail list SP */}
                  { filteredMails().map( (filteredMail) => {
                      const mailToNum = filteredMail.to.length - 1;
                      const attachment = filteredMail.attachment;

                      return (
                        <div key={filteredMail.id.toString()} className="m-mailListTable__li">
                          <div className="m-mailListTable__fromToBox">
                            <div className="m-mailListTable__from">
                              <span className="m-mailListTable__fromToTxt">From:</span> 
                              <div className="m-mailListTable__fromEmail">{ filteredMail.from }</div>
                            </div>
                            <div className="m-mailListTable__to">
                              <span className="m-mailListTable__fromToTxt">To:</span> 
                              <div className="m-mailListTable__toEmail">{ filteredMail.to }</div> 
                              { mailToNum > 0 
                                ? <div className="m-mailListTable__moreIcon">+{ mailToNum }</div> 
                                : null 
                              }
                            </div>
                          </div>
                          <div className="m-mailListTable__statusBox">
                            <div className="m-mailListTable__date">{ this.handleDateFormat(filteredMail.date) }</div>
                            <div className="m-mailListTable__attachment">
                              { attachment 
                                ? <span className="m-mailListTable__attachmentIcon"></span> 
                                : null 
                              }
                            </div>
                          </div>
                          <div className="m-mailListTable__subject">{ filteredMail.subject }</div>
                          { this.state.prevBtn.prevTxt 
                            ? <div className="m-mailListTable__body">{ filteredMail.body }</div> 
                            : null 
                          }
                        </div>
                      )
                  }) }
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default MailListBlock;