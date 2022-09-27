import React, { ReactNode } from "react";

export type EmptyProps = { children: ReactNode };

const Empty: React.FC<EmptyProps> = ({ children }) => {
  return <>{children}</>;
};

export default Empty;
