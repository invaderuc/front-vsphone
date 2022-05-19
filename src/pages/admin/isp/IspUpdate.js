import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import IspForm from "../../../components/forms/IspForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getIsp, updateIsp } from "../../../functions/isp";

const IspUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadIsp = useCallback(
    () =>
      getIsp(match.params.slug).then((c) => {
        setLoaded(true);
        setName(c.data.isp.name);
      }),
    [match.params.slug]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    updateIsp(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoaded(true);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/isp");
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
        return err.response.status === 400 && toast.error(err.response.data);
      });
  };

  useEffect(() => loadIsp(), [loadIsp]);

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
              <h4>Update isp</h4>
              <IspForm
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

export default IspUpdate;
