import React from "react";
import Portlet from "../components/portlet/Portlet";
import PortletHeader from "../components/portlet/PortletHeader";
import Header from "../components/header/Header";
import CreateCafeForm from "../components/CreateCafeForm";
const Home = () => {
  return (
    <div
      className="portlet__body-bg border-top-right-radius"
      style={{ height: "100vh" }}
    >
      <Header title="Create Cafe" />
      <div className="row ">
        <div className="col-4 mx-auto  mt-5">
          <Portlet>
            <PortletHeader title="Create new cafe" />
            <CreateCafeForm />
          </Portlet>
        </div>
      </div>
    </div>
  );
};
export default Home;
