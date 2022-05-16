import React from "react";
import { Link } from "react-router-dom";

const PhoneListItems = ({ phone }) => {
  const {
    price,
    brand
  } = phone;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      {brand && (
        <li className="list-group-item">
          Brand{" "}
          <Link
            to={`/brand/${brand.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {brand.name}
          </Link>
        </li>
      )}

      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
    </ul>
  );
};

export default PhoneListItems;
