import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import StoreForm from "../../../components/forms/StoreForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getStore, updateStore } from "../../../functions/store";

const StoreUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadStore = useCallback(
    () =>
      getStore(match.params.slug).then((c) => {
        setLoaded(true);
        setName(c.data.store.name);
      }),
    [match.params.slug]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    updateStore(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoaded(true);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/store");
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
        return err.response.status === 400 && toast.error(err.response.data);
      });
  };

  useEffect(() => loadStore(), [loadStore]);

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
              <h4>Update store</h4>
              <StoreForm
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

export default StoreUpdate;
