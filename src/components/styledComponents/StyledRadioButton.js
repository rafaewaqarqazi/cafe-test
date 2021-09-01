import React, { useMemo } from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import ColorList from "../../utils/colorsList";

const StyledRadio = styled.span`
  height: 16px;
  border-radius: 50%;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  color: ${(props) => (props.value ? props.theme.primary : ColorList.white)};
  transition: background-color 0.3s ease;
  border: 1px solid
    ${(props) => (props.value ? props.theme.primary : ColorList.separator)};
  cursor: pointer;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.primary};
  }
`;
const StyledRadioButton = ({ value, onChange, label, disabled }) => {
  const id = useMemo(() => `radio-${Math.random()}`, []);
  const onChangeRadio = (event) => {
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <>
      <label
        htmlFor={id}
        className="d-flex align-items-center mb-0 mr-4"
        style={{ cursor: "pointer" }}
      >
        <div>
          <StyledRadio value={value}>
            {value && <span className="dot" />}
          </StyledRadio>
        </div>
        {label && <span className="ml-3 text text-break">{label}</span>}
      </label>
      <input
        id={id}
        type="radio"
        style={{ display: "none" }}
        checked={value}
        disabled={disabled}
        onChange={onChangeRadio}
      />
    </>
  );
};

StyledRadio.defaultProps = {
  theme: {
    primary: ColorList.primary,
  },
};
StyledRadioButton.propTypes = {
  value: Proptypes.bool,
  onChange: Proptypes.func,
  label: Proptypes.string,
};

export default StyledRadioButton;
