import AdminNav from "../../components/nav/AdminNav";
import useCurrentItemHeader from "../../hooks/useCurrentItemHeader";

const AdminDashboard = () => {
  useCurrentItemHeader();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col text-center">
        
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
