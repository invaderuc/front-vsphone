/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
const { Meta } = Card;

const PhoneCard = ({ phone }) => {

  // destructure
  const { images, name, description, slug, price } = phone;
  return (
    <>
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
          </Link>
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
