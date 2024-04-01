import React from "react";
import ImportComponent from "./ImportComponent.tsx";
import ImportedListComponent from "./ImportedListComponent.tsx";

const ImportMain = () => {
  return (
  <>
  <div className="container mb-5">
  <ImportComponent />
  </div>
 <div className="container">
 <ImportedListComponent/>
 </div>
 
  </>

  );
};

export default ImportMain;
