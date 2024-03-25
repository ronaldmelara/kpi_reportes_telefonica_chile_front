import React, { useEffect, useState, useRef } from "react";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import "primeflex/primeflex.css";
import "../StyleCommon.css";
import DropDownMonthComponent from "./DropDownMonthComponent";

const ImportComponent = () => {
  const toast = useRef(null);
  const formRef = useRef(null); // Referencia al formulario
  const { state } = useLocation();
  const [errors, setErrors] = useState(null);
  const [inputFields, setInputFields] = useState({
    ddTipoArchivo: null,
    ddDatasources: null,
    file: null,
  });
  const [selectDatasource, setSelectDatasource] = useState(null);
  const [selectReporte, setSelectReporte] = useState(null);
  const [filterDsr, setFilterDsr] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  const ReportType = [
    { name: "Reporte Incidencias y Requerimientos", code: "1" },
    { name: "Cuandro de Mando", code: "2" },
    { name: "Control de Cambios", code: "3" },
  ];

  const ReportDatasource = [
    {
      name: "Remedy -> INC Diario- Ingeniería de Sistemas",
      code: "1",
      parentId: "1",
    },
    { name: "Externo -> IYR INGSYS (semanal)", code: "2", parentId: "1" },
    { name: "Externo -> IYR INGSYS (mensual)", code: "3", parentId: "1" },
    { name: "Remedy -> INGENIERIA TASK", code: "4", parentId: "2" },
  ];

  const handleDropdownMesChange = (value) => {
    setSelectedMonth(value);
  };

  useEffect(() => {
    if (selectReporte != null) {
      setFilterDsr(
        ReportDatasource.filter(
          (option) => option.parentId === selectReporte.code
        )
      );
    }
  }, [selectReporte]);

  const handleChange = (e) => {
    if (e.target != null && e.target.type === "file") {
      setInputFields({ ...inputFields, [e.target.name]: e.target.files });
    } else {
      setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    }
  };

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
              htmlFor="ddlTipoReporte"
              className="col-12 mb-2 md:col-3 md:mb-0"
            >
              Reporte
            </label>

            <div className="col-12 md:col-9">
              <Dropdown
                onChange={(e) => setSelectReporte(e.target.value)}
                options={ReportType}
                optionLabel="name"
                value={selectReporte}
                placeholder="Seleccione una opción"
                id="ddlTipoReporte"
                name="ddlTipoReporte"
                className={
                  classNames({
                    "p-invalid": isFormFieldValid("ddlTipoReporte"),
                  }) + " w-full md:w-14rem"
                }
              />
              <br />
              {getFormErrorMessage("ddlTipoReporte")}
            </div>
          </div>

          <div className="field grid show-element">
            <label
              htmlFor="ddDataSources"
              className="col-12 mb-2 md:col-3 md:mb-0"
            >
              Datasource
            </label>

            <div className="col-12 md:col-9">
              <Dropdown
                onChange={(e) => setSelectDatasource(e.target.value)}
                value={selectDatasource}
                options={filterDsr}
                optionLabel="name"
                placeholder="Seleccione una opción"
                className={
                  classNames({
                    "p-invalid": isFormFieldValid("ddDataSources"),
                  }) + " w-full md:w-14rem"
                }
                id="ddDataSources"
                name="ddDataSources"
              />
              <br />
              {getFormErrorMessage("ddDatasources")}
            </div>
          </div>

          <div className="field grid show-element">
            <label htmlFor="ddMes" className="col-12 mb-2 md:col-3 md:mb-0">
              Mes
            </label>

            <DropDownMonthComponent
              onDropdownChange={handleDropdownMesChange}
            />
            <br />
            {getFormErrorMessage("ddDatasources")}
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
                //onClick={(e) => onSubmit(e)}
                size="small"
                className="w-full"
                type="submit"
              ></Button>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  );
};

export default ImportComponent;
