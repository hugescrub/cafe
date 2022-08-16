import React from "react";

export default class EditMenuModal extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    const {
      menu: { id, type, title, img, availableFrom, availableUntil, items },
    } = this.props;

    console.log(this.props);

    return (
      <React.Fragment>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          Edit
        </button>
        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <header>
              <span className="editMenu-close-btn" onClick={() => this.setState({ isOpen: false })}>&times;</span>
                <h1>{title}</h1>
                <h4>
                  Between {availableFrom} - {availableUntil}
                </h4>
              </header>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
