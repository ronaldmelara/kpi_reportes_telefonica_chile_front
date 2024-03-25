import React from "react";

import { useLocation } from "react-router-dom";
import DataFileCloudImported from "./DataFileCloudImported";

const PopupDataLoaded = (props) => {
  const { state } = useLocation();
  console.log(state);
  console.log(props);

  return (
    <DataFileCloudImported
      token={state.token}
      idCarga={props.idCarga}
      idTipoCarga={props.idTipoCarga}
    />
  );
};

export default PopupDataLoaded;
