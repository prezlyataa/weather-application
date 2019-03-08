import React, { Component } from "react";
import "./saved-places.component.scss";

export class SavedPlaces extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { places } = this.props;
    return (
      <div className="saved-places">
        <span>Last seen: </span>
        {places !== null &&
          places.map((place, i) => {
            return (
              <span
                className="saved-places__item"
                key={i}
                onClick={() => this.props.setPlaceFromLast(`${place}`)}
              >
                {place}
              </span>
            );
          })}
      </div>
    );
  }
}
