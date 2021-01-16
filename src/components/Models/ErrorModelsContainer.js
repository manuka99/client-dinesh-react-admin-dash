import React from "react";
import { connect } from "react-redux";
import { show_error_data, dismiss_error_data } from "../../Redux";
import ErrorModelItem from "./ErrorModelItem";

function ErrorModelsContainer({
  message,
  show,
  show_error_data,
  dismiss_error_data,
  ...rest
}) {
  return (
    <ErrorModelItem
      message={message}
      status={show}
      hideModel={dismiss_error_data}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.errors.message,
    show: state.errors.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    show_error_data: () => dispatch(show_error_data()),
    dismiss_error_data: () => dispatch(dismiss_error_data()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModelsContainer);
