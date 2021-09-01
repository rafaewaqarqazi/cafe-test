import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import StyledIconBox from "../components/styledComponents/StyledIconBox";
import ColorList, { boxColors } from "../utils/colorsList";
import PlusIcon from "../components/svg-icons/PlusIcon";
import moment from "moment";
import LocationIcon from "../components/svg-icons/LocationIcon";
import ClockIcon from "../components/svg-icons/ClockIcon";
import { Link } from "react-router-dom";
import PortletBody from "../components/portlet/PortletBody";
import Portlet from "../components/portlet/Portlet";
import PortletHeader from "../components/portlet/PortletHeader";
import "../assets/styles/scss/_dropdown-menu.scss";
import firebase from "../utils/firebaseConfig";
import { Modal } from "react-bootstrap";
import CreateCafeForm from "../components/CreateCafeForm";
const Cafes = () => {
  const [loading, setLoading] = useState(false);
  const [cafes, setCafes] = useState([]);
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref("cafes")
      .on("value", (snapshot) => {
        let list = [];
        snapshot?.forEach((child) => {
          list = [
            ...list,
            {
              id: child.key,
              ...child.val(),
            },
          ];
        });
        console.log({ list });
        setCafes(list);
        setLoading(false);
      });
  }, []);
  return (
    <PortletBody withBg className="border-top-right-radius">
      <Header title="Cafes" />
      <Portlet>
        <PortletHeader
          title="Cafes List"
          toolbar={
            <div className="d-flex align-items-center">
              <StyledIconBox
                color={ColorList.primary}
                marginRight="0"
                as="button"
                onClick={showModal}
              >
                <PlusIcon size="16px" />
              </StyledIconBox>
            </div>
          }
        />
        <PortletBody>
          {loading && (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 200 }}
            >
              <div className="spinner spinner-border" />
            </div>
          )}
          {!loading && cafes.length === 0 ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 200 }}
            >
              No Record Found!
            </div>
          ) : (
            cafes.map((cafe, i) => (
              <div
                className="d-flex align-items-center mb-3 pb-3 border-bottom"
                key={i}
              >
                <StyledIconBox
                  color={boxColors[Math.floor(Math.random() * 5)]}
                  marginRight="10px"
                >
                  {cafe?.cafeName[0]}
                </StyledIconBox>
                <div className="d-flex flex-column flex-grow-1">
                  <span className="text text-bold mb-1">{cafe?.cafeName}</span>
                  <div className="d-flex align-items-center">
                    <div className="secondary-text mr-4">
                      <span className="mr-2">
                        <LocationIcon size="14px" />
                      </span>
                      <span>{cafe.city}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">
                        <LocationIcon size="14px" />
                      </span>
                      <span>{cafe.pincode}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">Drinks:</span>
                      <span>{cafe.lessDrinks ? "<5" : ">5"}</span>
                    </div>
                    <div className="secondary-text mr-4">
                      <span className="mr-2">
                        <ClockIcon size="14px" />
                      </span>
                      <span>{moment(cafe.createdAt).format("LLL")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </PortletBody>
      </Portlet>
      <Modal show={show} centered onHide={hideModal}>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title as="h5">Create Cafe</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0 px-0">
          <CreateCafeForm onClose={hideModal} />
        </Modal.Body>
      </Modal>
    </PortletBody>
  );
};
export default Cafes;
