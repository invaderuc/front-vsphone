import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { getBrand } from "../../functions/brand";
import PhoneCard from "../../components/cards/PhoneCard";

const BrandHome = ({ match }) => {
  const [brand, setBrand] = useState({});
  const [phones, setPhones] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    getBrand(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setBrand(res.data.brand);
      setPhones(res.data.phones);
      setLoaded(true);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {!loaded && <LoadingOutlined />}
          {loaded && (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {phones.length} Phones in "{brand.name}" brand
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {phones.map((p) => (
          <div className="col" key={p._id}>
            <PhoneCard phone={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandHome;
