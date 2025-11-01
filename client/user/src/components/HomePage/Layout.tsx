import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      {children}
    </main>
  );
};

export default Layout;
