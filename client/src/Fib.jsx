import React, { useState, useEffect } from "react";
import axios from "axios";

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [currentValues, setCurrentValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const cValues = await axios.get("/api/values/current");
    setCurrentValues(cValues.data);
  };

  const fetchIndexes = async () => {
    let allValues = await axios.get("/api/values/all");
    setSeenIndexes(allValues.data);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderCurrentValues = () => {
    const currentEntries = Object.entries(currentValues).map(([key, value]) => {
      return (
        <div key={key}>
          For index {key} I Calculated {value}
        </div>
      );
    });
    return currentEntries;
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
      {renderSeenIndexes()}
      <h3>Calculated values:</h3>
      {renderCurrentValues()}
    </div>
  );
}

export default Fib;
