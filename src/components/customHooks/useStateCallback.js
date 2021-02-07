import { useCallback, useEffect, useRef, useState } from "react";

function useStateCallback(initVal) {
  var [val, setVal] = useState(initVal);
  var cbRef = useRef(null);
  var first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    if (typeof cbRef.current === "function") {
      console.log("calling cb");
      cbRef.current();
    }
  }, [val]);

  var setValCB = useCallback((newVal, cb) => {
    console.log("setValCB", newVal);
    cbRef.current = cb;
    setVal(newVal);
  }, []);

  return [val, setValCB];
}

export default useStateCallback;
