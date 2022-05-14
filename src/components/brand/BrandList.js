import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { getBrands } from "../../functions/brand";

const BrandList = () => {
  const history = useHistory();
  const [brands, setbrands] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getBrands().then((c) => {
      setbrands(c.data);
      setLoaded(true);
    });
  }, []);

  const showBrands = () =>
    brands.map((c) => (
      <button
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3 color-blue"
        onClick={() => history.push(`/brand/${c.slug}`)}
      >
        {c.name}
      </button>
    ));

  return (
    <div className="container">
      <div className="row">
        {!loaded && <LoadingOutlined />}
        {loaded && showBrands()}
      </div>
    </div>
  );
};

export default BrandList;
