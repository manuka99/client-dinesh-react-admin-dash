import React from "react";
import { useNavigate } from "react-router-dom";

function useRedirect({ to }) {
  let navigate = useNavigate();
  return navigate(to);
}

export default useRedirect;
