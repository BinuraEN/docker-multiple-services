import React, { useState, useEffect } from "react";
import axios from "axios";

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues({ values: values.data });
    console.log(values);
  };

  const fetchIndexes = async () => {
    const values = await axios.get("/api/values/all");
    setSeenIndexes(values.data);
    console.log(seenIndexes);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map((e) => e.number).join(", ");
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I Calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: index,
    });
    setIndex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter you index: </label>
        <input
          type="text"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes}
      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;
