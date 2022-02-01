import React, { FC } from "react";

const Message: FC = (props) => {
  return <div className="message">{props.children}</div>;
};

export default Message;
