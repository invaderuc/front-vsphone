/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import PhoneListItems from "./PhoneListItems";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

// this is childrend component of Phone page
const SinglePhone = ({ phone, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { name, images, description, _id } = phone;

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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(phone._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img alt="carousel-img-prod" src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img alt="cov-not-prod" src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this phone.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{name}</h1>

        {phone && phone.ratings && phone.ratings.length > 0 ? (
          showAverage(phone)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={phone.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {phone.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <PhoneListItems phone={phone} />
        </Card>
      </div>
    </>
  );
};

export default SinglePhone;
