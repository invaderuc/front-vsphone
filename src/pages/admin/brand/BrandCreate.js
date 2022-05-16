import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createBrand,
  getBrands,
  removeBrand,
} from "../../../functions/brand";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import BrandForm from "../../../components/forms/BrandForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const BrandCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  const catchEndpointAction = (err) => {
    console.log(err);
    setLoading(false);
    return err.response.status === 400 && toast.error(err.response.data);
  };

  const loadBrands = () => {
    setLoaded(false);
    getBrands().then((c) => {
      setLoaded(true);
      setBrands(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createBrand({ name }, user.token)
      .then((res) => {
        setLoading(false);
        loadBrands();
        setName("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => catchEndpointAction(err));
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeBrand(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadBrands();
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => catchEndpointAction(err));
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => loadBrands(), []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {(!loaded || loading) && <LoadingOutlined />}
          {loaded && !loading && <h4>Create brand</h4>}
          <BrandForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {loaded && (
            <>
              {/* step 2 and step 3 */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              {/* step 5 */}
              {brands.filter(searched(keyword)).map((c) => (
                <div className="alert alert-secondary" key={c._id}>
                  {c.name}
                  <span
                    onClick={() => handleRemove(c.slug)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/brand/${c.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandCreate;
