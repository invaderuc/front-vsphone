import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { getSub } from "../../functions/sub";
import PhoneCard from "../../components/cards/PhoneCard";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [phones, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoaded(true);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {!loaded && <LoadingOutlined />}
          {loaded && (
            <h4 className="text-center p-3 mt-5 mb-5 display-4">
              {phones.length} Phone in "{sub.name}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {phone.map((p) => (
          <div className="col" key={p._id}>
            <PhoneCard phone={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
