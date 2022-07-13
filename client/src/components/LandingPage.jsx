import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="root">
      <Link style={{ zIndex: 3 }} to="/home">
        <button className="button">Go to Home!</button>
      </Link>
      <img
        className="imagen"
        src="https://images4.alphacoders.com/641/641968.jpg"
      />
      <h1 className="titulo">Welcome to my Pokemon App!</h1>
    </div>
  );
}
