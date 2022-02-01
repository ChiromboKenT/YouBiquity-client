import React, { useContext } from "react";
import { AuthContext } from "./AppAuthContext";

const colors: {
  [color: string]: string;
} = {
  Role0: "#ff0000",
  Role1: "#00ff00",
  Role2: "#fbff00",
};
const Role = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="Role" style={{ backgroundColor: colors[role!] }}>
      <span className="Role-text">{role}</span>
    </div>
  );
};

export default Role;
