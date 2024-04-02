import React from "react";
import ImportComponent from "./ImportComponent.tsx";
import ImportedListComponent from "./ImportedListComponent.tsx";

const ImportMain = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <ImportComponent />

        <ImportedListComponent />
      </div>

    </>

  );
};

export default ImportMain;
