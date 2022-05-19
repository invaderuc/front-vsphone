import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { errorBoundary } from "./helpers/errorBoundary";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const BrandCreate = lazy(() => import("./pages/admin/brand/BrandCreate"));
const BrandUpdate = lazy(() => import("./pages/admin/brand/BrandUpdate"));
const IspCreate = lazy(() => import("./pages/admin/isp/IspCreate"));
const IspUpdate = lazy(() => import("./pages/admin/isp/IspUpdate"));
const FeatureCreate = lazy(() => import("./pages/admin/feature/FeatureCreate"));
const FeatureUpdate = lazy(() => import("./pages/admin/feature/FeatureUpdate"));
const MaterialCreate = lazy(() => import("./pages/admin/material/MaterialCreate"));
const MaterialUpdate = lazy(() => import("./pages/admin/material/MaterialUpdate"));

const StoreCreate = lazy(() => import("./pages/admin/store/StoreCreate"));
const StoreUpdate = lazy(() => import("./pages/admin/store/StoreUpdate"));
const PhoneCreate = lazy(() => import("./pages/admin/phone/PhoneCreate"));
const AllPhones = lazy(() => import("./pages/admin/phone/AllPhones"));
const PhoneUpdate = lazy(() => import("./pages/admin/phone/PhoneUpdate"));
const Phone = lazy(() => import("./pages/Phone"));
const Phones = lazy(() => import("./pages/Phones"));
const BrandHome = lazy(() => import("./pages/brand/BrandHome"));
const StoreHome = lazy(() => import("./pages/store/StoreHome"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const dispatch = useDispatch();

  const thenEndpointAction = useCallback(
    ({ data: { name, email, role, _id } }, { token }) =>
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { name, email, token, role, _id },
      }),
    [dispatch]
  );

  const userExistAction = useCallback(
    async (user) => {
      const idTokenResult = await user.getIdTokenResult();

      currentUser(idTokenResult.token)
        .then((res) => thenEndpointAction(res, idTokenResult))
        .catch((err) => console.log(err));
    },
    [thenEndpointAction]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => user && userExistAction(user)
    );

    return () => unsubscribe();
  }, [dispatch, thenEndpointAction, userExistAction]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <LoadingOutlined />
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/"currentUser component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/password" component={Password} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/brand" component={BrandCreate} />
        <AdminRoute exact path="/admin/isp" component={IspCreate} />
        <AdminRoute exact path="/admin/brand/:slug" component={BrandUpdate} />
        <AdminRoute exact path="/admin/ips" component={IspCreate} />
        <AdminRoute exact path="/admin/isp/:slug" component={IspUpdate} />
        <AdminRoute exact path="/admin/feature" component={FeatureCreate} />
        <AdminRoute exact path="/admin/feature/:slug" component={FeatureUpdate} />
        <AdminRoute exact path="/admin/material" component={MaterialCreate} />
        <AdminRoute exact path="/admin/material/:slug" component={MaterialUpdate} />
        <AdminRoute exact path="/admin/store" component={StoreCreate} />
        <AdminRoute exact path="/admin/store/:slug" component={StoreUpdate} />
        <AdminRoute exact path="/admin/phone" component={PhoneCreate} />
        <AdminRoute exact path="/admin/phones" component={AllPhones} />
        <AdminRoute exact path="/admin/phone/:slug" component={PhoneUpdate} />
        <Route exact path="/phone/:slug" component={Phone} />
        <Route exact path="/brand/:slug" component={BrandHome} />
        <Route exact path="/phones/:slug" component={StoreHome} />
        <Route exact path="/phones" component={Phones} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default errorBoundary(App);
