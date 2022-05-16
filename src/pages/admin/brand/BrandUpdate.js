import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import BrandForm from "../../../components/forms/BrandForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getBrand, updateBrand } from "../../../functions/brand";

const BrandUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadBrand = useCallback(
    () =>
      getBrand(match.params.slug).then((c) => {
        setLoaded(true);
        setName(c.data.brand.name);
      }),
    [match.params.slug]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    updateBrand(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoaded(true);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/brand");
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
        return err.response.status === 400 && toast.error(err.response.data);
      });
  };

  useEffect(() => loadBrand(), [loadBrand]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {!loaded && <LoadingOutlined />}
          {loaded && (
            <>
              <h4>Update brand</h4>
              <BrandForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
              <hr />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandUpdate;
