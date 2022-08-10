import React from "react";
import "./Modal.css";
import { Link } from "react-router-dom";

export default class Modal extends React.Component {
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
          About menu
        </button>
        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <header>
                <h1>{title}</h1>
                <h4 className="price-availability">
                  Between {availableFrom} - {availableUntil}
                </h4>
                <span className="close-btn" onClick={() => this.setState({ isOpen: false })}>&times;</span>
              </header>
              <div>
                <h1> Available dishes </h1>
                <div className="modal-underline"></div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr>
                          <td>
                            <Link
                              to={"/items/" + item.id}
                              style={{
                                textDecoration: "none",
                                color: "#c59d5f",
                              }}
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td>{item.itemType}</td>
                          <td>{item.price}&nbsp;₽</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
