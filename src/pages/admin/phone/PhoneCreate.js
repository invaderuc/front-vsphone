import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createPhone } from "../../../functions/phone";
import PhoneCreateForm from "../../../components/forms/PhoneCreateForm";
import { getBrands } from "../../../functions/brand";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  name: "Macbook Pro",
  description: "This is the best Apple phone",
  price: "45000",
  brands: [],
  brand: "",
  quantity: "50",
  images: [],
};

const PhoneCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
      console.log("jojoo");
    loadBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBrands = () =>
    getBrands().then((c) => setValues({ ...values, brands: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createPhone(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.name}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        const { err: error, code } = err.response.data;
        const duplicateKey = code === 11000;
        const errMessage = duplicateKey ? "This phone already exists" : error;
        console.log(errMessage);
        toast.error(errMessage);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleBrandChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, brand: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading && <LoadingOutlined />}
          {!loading && <h4>Phone create</h4>}
          <hr />

          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <PhoneCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleBrandChange={handleBrandChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneCreate;
