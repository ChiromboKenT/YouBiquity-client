import React, { useContext } from "react";
import { AuthContext } from "./AppAuthContext";

const Listings = () => {
  const { xml } = useContext(AuthContext);
  console.log(xml);
  return <div className="listings">{xml}</div>;
};

export default Listings;
