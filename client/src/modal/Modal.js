import React from 'react';
import "./Modal.css";

export default class Modal extends React.Component {

  state = {
    isOpen: false
  }

  render() {
    const {
      menu: { id, type, title, img, availableFrom, availableUntil, items }
    } = this.props

    console.log(this.props);

    return(
      <React.Fragment>
      <button className="button" onClick={() => this.setState({isOpen: true})}>
        About menu
      </button>
        {this.state.isOpen && (
        <div className="modal">
          <div className="modal-body">
          <header>
            <h1>{title}</h1>
          </header>
          <h4 className="price-availability">Between {availableFrom} - {availableUntil}</h4>
          <p className="item-text">{type}</p>
          <p> {items} </p>
            <button className="button" onClick={() => this.setState({isOpen: false})}>
            Back
            </button>
          </div>
        </div>
      )}
      </React.Fragment>
    )
  }
}
