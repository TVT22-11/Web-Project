import React from "react";
import "./FourGrid.css";
import PropTypes from "prop-types";

const FourGrid = (props) => {
  const renderElements = () => {
    const gridElements = props.children.map((element, i) => {
      return (
        <div key={i} className="grid-element" id="actor">
          {element}
          {/*<span className="tooltiptext">{props.text}kkk</span>*/}
        </div>
      );
    });
    return gridElements;
  };
  return (
    <div className="grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="grid-content">{renderElements()}</div>
    </div>
  );
};
//test proptypes pour éviter les erreurs de types dans le choix des props
FourGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
};

export default FourGrid;