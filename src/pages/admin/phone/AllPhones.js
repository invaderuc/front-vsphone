import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { getPhonesByCount } from "../../../functions/phone";
import AdminPhoneCard from "../../../components/cards/AdminPhoneCard";
import { removePhone } from "../../../functions/phone";

const AllPhones = () => {
  const [phones, setPhones] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllPhones();
  }, []);

  const loadAllPhones = () => {
    getPhonesByCount(100)
      .then((res) => {
        setPhones(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        setLoaded(true);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removePhone(slug, user.token)
        .then((res) => {
          loadAllPhones();
          toast.error(`${res.data.name} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {!loaded && <LoadingOutlined />}
          {loaded && <h4>All Phones</h4>}
          <div className="row">
            {phones.map((phone) => (
              <div key={phone._id} className="col-md-4 pb-3">
                <AdminPhoneCard
                  phone={phone}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPhones;