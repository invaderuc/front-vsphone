import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getPhone, updatePhone } from "../../../functions/phone";
import { getBrands } from "../../../functions/brand";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import PhoneUpdateForm from "../../../components/forms/PhoneUpdateForm";

const initialState = {
  name: "",
  description: "",
  price: "",
  brand: "",
  images: []
};

const PhoneUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadPhone();
    loadBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPhone = () => {
    getPhone(slug).then((p) => {
      // console.log("single phone", p);
      // 1 load single proudct
      setValues({ ...values, ...p.data });
    });
  };

  const loadBrands = () =>
    getBrands().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PHONE", c.data);
      setBrands(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.Brand = selectedBrand ? selectedBrand : values.Brand;

    updatePhone(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/phones");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleBrandChange = (e) => {
    e.preventDefault();
    console.log("CLICKED Brand", e.target.value);

    setSelectedBrand(e.target.value);

    console.log("EXISTING Brand values.Brand", values.Brand);

    // if user clicks back to the original Brand
    // show its sub brands in default
    if (values.Brand._id === e.target.value) {
      loadPhone();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading && <LoadingOutlined />}
          {!loading && <h4>Phone update</h4>}

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <PhoneUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleBrandChange={handleBrandChange}
            brands={brands}
            selectedBrand={selectedBrand}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default PhoneUpdate;
