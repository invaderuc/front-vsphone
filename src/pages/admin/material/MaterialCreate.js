import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createMaterial,
  getMaterials,
  removeMaterial,
} from "../../../functions/material";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import MaterialForm from "../../../components/forms/MaterialForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const MaterialCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Materials, setMaterials] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  const catchEndpointAction = (err) => {
    console.log(err);
    setLoading(false);
    return err.response.status === 400 && toast.error(err.response.data);
  };

  const loadMaterials = () => {
    setLoaded(false);
    getMaterials().then((c) => {
      setLoaded(true);
      setMaterials(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createMaterial({ name }, user.token)
      .then((res) => {
        setLoading(false);
        loadMaterials();
        setName("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => catchEndpointAction(err));
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeMaterial(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadMaterials();
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => catchEndpointAction(err));
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => loadMaterials(), []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {(!loaded || loading) && <LoadingOutlined />}
          {loaded && !loading && <h4>Create Material</h4>}
          <MaterialForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {loaded && (
            <>
              {/* step 2 and step 3 */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              {/* step 5 */}
              {Materials.filter(searched(keyword)).map((c) => (
                <div className="alert alert-secondary" key={c._id}>
                  {c.name}
                  <span
                    onClick={() => handleRemove(c.slug)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/Material/${c.slug}`}>
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

export default MaterialCreate;
