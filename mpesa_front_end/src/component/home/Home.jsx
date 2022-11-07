import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export const Home = () => {
  const [value, setValue] = useState();
  const [phoneNumberData, setPhoneNumberData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(value.replace('+',''));
    postPhoneNumber(value.replace("+", ""));
  };
  const postPhoneNumber = async (phone) => {
    // console.log(JSON.stringify({phoneNumber:phone}));
    const res = await fetch("http://localhost:9000/mpesa/lipa-na-mpesa", {
      method: "POST",
      headers: { "Content-TYpe": "application/json" },
      body: JSON.stringify({phoneNumber:phone}),
    });
    const phoneNumberData = await res.json();
    // setPhoneNumberData(JSON.parse(phoneNumberData))
    console.log(phoneNumberData);

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
          required
          defaultCountry="KE"
          country={"KE"}
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          limitMaxLength={true}
          min="700000000"
        />
        <p>{value}</p>
        <input
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
      {/* <span>{phoneNumberData}</span> */}
    </div>
  );
};
