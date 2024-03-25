import React, { useEffect, useState, useRef } from "react";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import "primeflex/primeflex.css";
import "./StyleCommon.css";

import axios from "axios";

import FileLoaded from "./ImportProcess/FileLoaded";

const FileUploadPanel = () => {
  const { state } = useLocation();
  const [errors, setErrors] = useState(null);
  const toast = useRef(null);
  const [inputFields, setInputFields] = useState({
    ddTipoArchivo: null,
    ddDatasources: null,
    file: null,
  });
  const formRef = useRef(null); // Referencia al formulario

  const FileType = [
    { name: "Servicios Incidencias y Requerimientos", code: "1" },
    { name: "Control de Cambios", code: "2" },
    { name: "Cuadro Mando", code: "3" },
  ];

  const Datasoruces = [
    { name: "Remedy -> INC Diario- Ingeniería de Sistemas", code: "1" },
    { name: "Externo -> IYR INGSYS (semanal)", code: "2" },
    { name: "Externo -> IYR INGSYS (mensual)", code: "3" },
    { name: "Remedy -> INGENIERIA TASK", code: "4" },
  ];

  const handleChange = (e) => {
    if (e.target != null && e.target.type === "file") {
      setInputFields({ ...inputFields, [e.target.name]: e.target.files });
    } else {
      setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    }
  };

  // Después de llamar a setInputFields, puedes acceder al estado actualizado en la función de devolución de llamada
  useEffect(() => {}, [inputFields]);
  useEffect(() => {}, [errors]); // Ejecutar la función de devolución de llamada cada vez que inputFields cambie

  const validateValues = (inputValues) => {
    let errors1 = {};
    if (inputValues.ddTipoArchivo === null) {
      errors1.ddTipoArchivo = "Es requerido seleccionar un tipo de archivo";
    }
    if (inputValues.ddDatasources === null) {
      errors1.ddFrecuencia =
        "Es requerido seleccionar la periodicidad del archivo";
    }

    if (inputValues.file === null) {
      errors1.file = "Es requerido seleccionar un archivo";
    } else {
      if (inputValues.file.length === 0) {
        errors1.file = "Es requerido seleccionar un archivo";
      }
      if (inputValues.file.length > 0 && inputValues.file.length > 1) {
        errors1.file = "Se permite seleccionar solo un archivo.";
      }
    }

    return errors1;
  };

  function onSubmit(e) {
    e.preventDefault();
    const currentErrors = validateValues(inputFields);
    setErrors(currentErrors);

    console.log("onSubmit");
    console.log(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Complete los campos requeridos.",
        life: 3000,
      });
    } else {
      console.log(formRef.current);
      submit();
      // Resetear el formulario después del envío exitoso
      formRef.current.reset();
    }
  }

  const isFormFieldValid = (meta) =>
    !!(errors != null && errors.hasOwnProperty(meta) && errors[meta] != null);

  const getFormErrorMessage = (inputname) => {
    if (
      errors != null &&
      errors.hasOwnProperty(inputname) &&
      errors[inputname] != null
    ) {
      return <small className="p-error">{errors[inputname]}</small>;
    }
    return <></>;
  };

  const submit = () => {
    const formData = new FormData();

    formData.append("file", inputFields.file[0]);
    formData.append("idDatasource", inputFields.ddDatasources.code);
    formData.append("idTipoCarga", inputFields.ddTipoArchivo.code);
    formData.append("nombreArchivo", inputFields.file[0].name);
    formData.append("usuarioCarga", state.userid);

    axios
      .post("http://localhost:8080/api/v1/carga", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${state.token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Archivo cargado correctamente",
          life: 3000,
        });
        console.log(response);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Hubo un problema al cargar el archivo.",
          life: 3000,
        });
        console.log(error);
      });
  };

  return (
    <div className="flex align-items-stretch flex-wrap justify-content-center ">
      <Toast ref={toast} />
      <Panel
        header="Importar Archivo"
        className="w-full min-w-max min-w-min w-4 col-12"
      >
        <form ref={formRef}>
          <div className="field grid">
            <label
              htmlFor="ddTipoArchivo"
              className="col-12 mb-2 md:col-3 md:mb-0"
            >
              Tipo Archivo
            </label>

            <div className="col-12 md:col-9">
              <Dropdown
                onChange={(e) => handleChange(e)}
                options={FileType}
                optionLabel="name"
                value={inputFields.ddTipoArchivo}
                placeholder="Seleccione una opción"
                id="ddTipoArchivo"
                name="ddTipoArchivo"
                className={
                  classNames({
                    "p-invalid": isFormFieldValid("ddTipoArchivo"),
                  }) + " w-full md:w-14rem"
                }
              />
              <br />
              {getFormErrorMessage("ddTipoArchivo")}
            </div>
          </div>

          <div className="field grid show-element">
            <label
              htmlFor="ddFrecuencia"
              className="col-12 mb-2 md:col-3 md:mb-0"
            >
              Periodicidad
            </label>

            <div className="col-12 md:col-9">
              <Dropdown
                onChange={(e) => handleChange(e)}
                value={inputFields.ddDatasources}
                options={Datasoruces}
                optionLabel="name"
                placeholder="Seleccione una opción"
                className={
                  classNames({
                    "p-invalid": isFormFieldValid("ddDatasources"),
                  }) + " w-full md:w-14rem"
                }
                id="ddDatasources"
                name="ddDatasources"
              />
              <br />
              {getFormErrorMessage("ddDatasources")}
            </div>
          </div>

          <div className="field grid">
            <div className="col-12 md:col-12">
              <input
                type="file"
                name="file"
                onChange={(e) => handleChange(e)}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className={classNames({
                  "p-invalid": isFormFieldValid("file"),
                })}
              />
              <br />
              {getFormErrorMessage("file")}
            </div>
          </div>
          <div className="field grid">
            <div className="col-12 mb-2 md:col-12 md:mb-0">
              <Button
                label="Cargar Archivo"
                severity="success"
                aria-label="Filter"
                onClick={(e) => onSubmit(e)}
                size="small"
                className="w-full"
                type="submit"
              ></Button>
            </div>
          </div>
        </form>
      </Panel>

      <FileLoaded />
    </div>
  );
};

export default FileUploadPanel;
