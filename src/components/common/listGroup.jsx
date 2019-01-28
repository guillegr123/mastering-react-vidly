/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const { items, selectedKey, onSelectedItem, itemKey, itemValue } = props;
  return (
    <div className="list-group">
      {items.map((item, i) => {
        const key = item[itemKey];
        return (
          <a
            key={key}
            className={
              key === selectedKey
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            style={{ cursor: "pointer" }}
            tabIndex={i}
            onClick={() => onSelectedItem(key)}
          >
            {item[itemValue]}
          </a>
        );
      })}
    </div>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array,
  selectedKey: PropTypes.string,
  itemKey: PropTypes.string,
  itemValue: PropTypes.string,
  onSelectedItem: PropTypes.func
};

export default ListGroup;
