import React, { useEffect, useState } from "react";
import { getPhone, phoneStar } from "../functions/phone";
import SinglePhone from "../components/cards/SinglePhone";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/phone";
import PhoneCard from "../components/cards/PhoneCard";

const Phone = ({ match }) => {
  const [phone, setPhone] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSinglePhone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (phone.ratings && user) {
      let existingRatingObject = phone.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [phone.ratings, user]);

  const loadSinglePhone = () => {
    getPhone(slug).then((res) => {
      setPhone(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    phoneStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSinglePhone(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SinglePhone
          phone={phone}
          onStarClick={onStarClick}
          star={star}
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
