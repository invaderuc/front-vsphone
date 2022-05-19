import AdminNav from "../../components/nav/AdminNav";
import useCurrentItemHeader from "../../hooks/useCurrentItemHeader";
import { LoadingOutlined } from "@ant-design/icons";

const AdminDashboard = () => {
  useCurrentItemHeader();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col text-center">
          
            <h1>Welcome!</h1>
          
           
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
