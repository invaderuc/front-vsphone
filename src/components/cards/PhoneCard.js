/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const PhoneCard = ({ phone }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new phone to cart
      cart.push({
        ...phone,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, name, description, slug, price } = phone;
  return (
    <>
      {phone && phone.ratings && phone.ratings.length > 0 ? (
        showAverage(phone)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            alt="prod-images"
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/phone/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Phone
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={phone.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {phone.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${name} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default PhoneCard;
