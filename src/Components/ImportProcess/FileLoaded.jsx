import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primeflex/primeflex.css";
import { classNames } from "primereact/utils";
import DataTable from "react-data-table-component";

import axios from "axios";
import { useGetImportedFiles } from "../../hook/useGetImportedFiles";
import PopupDataLoaded from "./PopupDataLoaded";

const FileLoaded = () => {
  const { state, pathname } = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [rowSelected, setRowSelected] = useState({
    idCarga: 0,
    idTipoCarga: 0,
    token: "",
  });

  const columns = [
    {
      name: "Id Carga",
      selector: (row) => row.idCarga,
      omit: true,
    },

    {
      name: "Archivo",
      selector: (row) => row.nombreArchivo,
    },
    {
      name: "Estado Importación",
      selector: (row) => row.estado,
    },
    {
      name: "Datasource",
      selector: (row) => row.datasource,
    },
    {
      name: "Tipo",
      selector: (row) => row.tipoCarga,
    },
    {
      name: "Usuario",
      selector: (row) => row.nombreUsuario,
    },
    {
      name: "Resumen Importación",
      selector: (row) => row.resumenImportacion,
    },
    {
      name: "Fecha Importación",
      selector: (row) => row.fechaImportacion,
    },
    {
      name: "Id Estado Importacion",
      selector: (row) => row.idEstadoImportacion,
      omit: true,
    },

    {
      name: "Revisar",
      button: true,

      cell: (row) =>
        row.idEstadoImportacion === 5 ? (
          <Button
            icon="pi pi-eye"
            rounded
            text
            aria-label="Ver"
            severity="info"
            onClick={() => handleButtonRowClick(row)}
            size="small"
          ></Button>
        ) : (
          ""
        ),
    },
    {
      name: "Procesar",
      button: true,

      cell: (row) =>
        row.idEstadoImportacion === 5 && row.periodoAbierto === 1 ? (
          <Button
            icon="pi pi-cog"
            rounded
            text
            aria-label="Procesar"
            severity="success"
            size="small"
          ></Button>
        ) : (
          ""
        ),
    },
  ];

  const dataGridImp = useGetImportedFiles(state.token);

  const handleButtonRowClick = (r) => {
    setRowSelected(r);
    setVisiblePopup(true);
  };

  return (
    <>
      <Panel
        header="Importaciones"
        className="p-7 w-full min-w-max min-w-min w-12"
      >
        <DataTable columns={columns} data={dataGridImp} pagination />
      </Panel>

      <Dialog
        header="Header"
        visible={visiblePopup}
        onHide={() => setVisiblePopup(false)}
        style={{ width: "50vw" }}
      >
        <p className="m-0">
          <PopupDataLoaded
            token={state.token}
            tipoCarga={rowSelected.idTipoCarga}
            idCarga={rowSelected.idCarga}
          />
        </p>
      </Dialog>
    </>
  );
};

export default FileLoaded;
