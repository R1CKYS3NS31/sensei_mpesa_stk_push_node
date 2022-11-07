import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export const Home = () => {
  const [value, setValue] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* <input type="number" minLength={9} maxLength={9} /> */}
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
        />
        <p>{value}</p>
        <input
          required
          placeholder="7xxxxxxxxxx"
          type={"submit"}
          value={"Pay via M-pesa"}
          style={{
            marginTop: "20px",
            textDecoration: "none",
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
};
