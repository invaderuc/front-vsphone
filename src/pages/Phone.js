import React, { useEffect, useState } from "react";
import { getPhone } from "../functions/phone";
import SinglePhone from "../components/cards/SinglePhone";
import { getRelated } from "../functions/phone";
import PhoneCard from "../components/cards/PhoneCard";

const Phone = ({ match }) => {
  const [phone, setPhone] = useState({});
  const [related, setRelated] = useState([]);

  const { slug } = match.params;

  useEffect(() => {
    loadSinglePhone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadSinglePhone = () => {
    getPhone(slug).then((res) => {
      setPhone(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SinglePhone
          phone={phone}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Phones</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <PhoneCard phone={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Phones Found</div>
        )}
      </div>
    </div>
  );
};

export default Phone;
