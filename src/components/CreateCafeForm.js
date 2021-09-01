import React, { useState } from "react";
import { Form, Formik } from "formik";
import { createCafe } from "../utils/crud/cafe.crud";
import PortletBody from "./portlet/PortletBody";
import { Alert } from "react-bootstrap";
import FormikInputField from "./FormikComponents/FormikInputField";
import FormikRadioMulti from "./FormikComponents/FormikRadioMulti";
import StyledButton from "./styledComponents/StyledButton";
import { useHistory } from "react-router-dom";

const CreateCafeForm = ({ onClose }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  return (
    <Formik
      initialValues={{
        cafeName: "",
        city: "",
        pincode: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.cafeName) {
          errors.cafeName = "Required!";
        }
        if (!values.city) {
          errors.city = "Required!";
        }
        if (!values.pincode) {
          errors.pincode = "Required!";
        }
        return errors;
      }}
      onSubmit={(values) => {
        setLoading(true);
        console.log({ values });
        const data = {
          ...values,
          createdAt: new Date(),
          lessDrinks: values.lessDrinks
            ? values.lessDrinks.includes("Less")
            : undefined,
        };
        createCafe(data)
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              if (onClose) {
                onClose();
              } else {
                history.push("/");
              }
            }, 500);
          })
          .catch((error) => {
            setLoading(false);
            console.log({ error: error.message });
            setError({
              show: true,
              message: error?.response?.data?.error || "Something went wrong!",
            });
          });
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <PortletBody className="py-0">
            <Alert
              show={error.show}
              onClose={() => setError({ show: false, message: "" })}
              variant="danger"
              dismissible
            >
              {error.message}
            </Alert>
            <div className=" form-group">
              <FormikInputField
                placeholder="Cafe Name*"
                name="cafeName"
                className="w-100"
              />
            </div>
            <div className=" form-group">
              <FormikInputField
                placeholder="City*"
                name="city"
                className="w-100"
              />
            </div>
            <div className=" form-group">
              <FormikInputField
                placeholder="Pincode*"
                name="pincode"
                className="w-100"
              />
            </div>
            <div className="row m-0 form-group">
              <FormikRadioMulti
                options={[
                  {
                    id: 1,
                    label: "Less than 5 drinks?",
                  },
                  {
                    id: 2,
                    label: "More than 5 drinks?",
                  },
                ]}
                name="lessDrinks"
                className="w-100"
              />
            </div>
          </PortletBody>

          <PortletBody className="d-flex align-items-center justify-content-end">
            <StyledButton type="submit" loading={loading} disabled={loading}>
              Create
            </StyledButton>
          </PortletBody>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCafeForm;
