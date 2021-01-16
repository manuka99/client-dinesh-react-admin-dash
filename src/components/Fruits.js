import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../util/api";

function Fruits() {
  const [fruits, setFruits] = useState([]);

  const getFruits = () => {
    api()
      .get("fruits")
      .then((res) => setFruits(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFruits();
  }, [])

  const fruitList = fruits.map((fruit) => {
    return (
      <div>
        <h1>{fruit.name}</h1>
        <h1>{fruit.age}</h1>
      </div>
    );
  });

  return (
    <div>
      {fruitList}
      <button onClick={getFruits}>Get Fruits</button>
    </div>
  );
}

export default Fruits;
