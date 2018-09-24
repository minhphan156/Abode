import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// Text input for one line, f.e. street
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isrequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isrequired,
  label: PropTypes.string.isrequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isrequired,
  onChange: PropTypes.func.isrequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
