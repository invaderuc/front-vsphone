import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import FeatureForm from "../../../components/forms/FeatureForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getFeature, updateFeature } from "../../../functions/feature";

const FeatureUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadFeature = useCallback(
    () =>
      getFeature(match.params.slug).then((c) => {
        setLoaded(true);
        setName(c.data.feature.name);
      }),
    [match.params.slug]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    updateFeature(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoaded(true);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/feature");
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
        return err.response.status === 400 && toast.error(err.response.data);
      });
  };

  useEffect(() => loadFeature(), [loadFeature]);

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
              <h4>Update feature</h4>
              <FeatureForm
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

export default FeatureUpdate;
