import React, { useEffect, useState, useRef } from "react";

import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../StyleCommon.css";
import DropDownMonthComponent from "./DropDownMonthComponent";
import useFeth2 from "../../hook/useFetch2.ts";
import axios, { AxiosRequestConfig } from "axios";

const ImportComponent = () => {
  const formRef = useRef(null); // Referencia al formulario
  const { state } = useLocation();

  const [selectDatasource, setSelectDatasource] = useState<string>();
  const [selectReporte, setSelectReporte] = useState<string>();
  const [listDatasources, setListDatasources] = useState<{ id: number, value: string, idParent: number }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [selectedAnio, setSelectedAnio] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<any>();

  const [toastType, setToastType] = useState<string>(""); // Tipo de toast: success o error
  const [toastMessage, setToastMessage] = useState<string>(""); // Mensaje del toast
  const [showToast, setShowToast] = useState<boolean>(false); // Estado para mostrar u ocultar el toast

  const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";
  const { data: ReportType, loading: reportLoading, error: reportError } = useFeth2(process.env.REACT_APP_JAVA_API_URL_CATALOG + "/reports", token);
  const { data: ReportDatasource, loading: dsrcLoading, error: dsrcError } = useFeth2(process.env.REACT_APP_JAVA_API_URL_CATALOG + "/datasource", token);


  const handleDropdownMesChange = (value: string, item: string) => {
    setSelectedAnio(item.substring(0, 4));
    setSelectedMonth(value);
  };


  useEffect(() => {

    if (selectReporte != null) {
      const idReport = ReportType.filter((op) => op.id == selectReporte)?.[0];
      if (idReport) {
        setListDatasources(
          ReportDatasource.filter(
            (option) => option.idParent === idReport.id
          )
        );
      }

    }
  }, [selectReporte]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {

      event.stopPropagation();
    }
    else {

      // Deshabilitar el botón y mostrar el spinner
      const button = event.currentTarget;
      button.setAttribute('disabled', true);
      button.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Cargando...`;
      const formData = new FormData();


      if (selectedFile && selectDatasource && selectReporte && selectedMonth && formRef && selectedAnio) {
        formData.append("file", selectedFile);
        formData.append("idDatasource", selectDatasource);
        formData.append("nombreArchivo", selectedFile.name);
        formData.append("usuarioCarga", state.userid);
        formData.append("mes", selectedMonth);
        formData.append("anio", selectedAnio);
        formData.append("idTipoReporte", selectReporte);


        axios
          .post(process.env.REACT_APP_JAVA_API_URL_IMPORT, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((response) => {

            console.log(response);
            // Mostrar el toast de éxito
            showToastM("success", "Importación exitosa");
          })
          .catch((error) => {

            console.log(error);
            // Mostrar el toast de error
            showToastM("error", "Error en la importación");
          })
          .finally(() => {
            button.removeAttribute('disabled');
            button.innerHTML = 'Importar';
          }

          );

        // Resetear el formulario después del envío exitoso
        form.classList.add('was-validated');
        /* formRef.current.reset(); */

      }


    }




  };


  const handleChangeSelectedFile = (e) => {

    if (e.target != null) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const showToastM = (type: string, message: string) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Ocultar el toast después de 3 segundos
  };


  return (
    <>

      <div className="d-flex justify-content-center">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Importar Archivo</h5>
            <form ref={formRef} className="needs-validation" novalidate>
              <div className="container">
                <div className="row mb-3">
                  <label
                    htmlFor="ddlTipoReporte"
                    className="form-label"
                  >
                    Reporte
                  </label>
                  <select id="ddlTipoReporte" className="form-select" onChange={(e) => { setSelectReporte(e.target.value) }} defaultValue={""} required>
                    <option value="">Seleccione una opción</option>
                    {ReportType && ReportType.map(item => (

                      <option key={item.id} value={item.id}>{item.value}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid state.
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="ddDataSources"
                    className="form-label"
                  >
                    Datasource
                  </label>
                  <select id="ddDataSources" className="form-select" onChange={(e) => { setSelectDatasource(e.target.value) }} defaultValue={""} required>
                    <option value="">Seleccione una opción</option>
                    {listDatasources && listDatasources.map(item => (

                      <option key={item.id} value={item.id}>{item.value}</option>
                    ))}
                  </select>
                </div>

                <div className="row mb-3">
                  <label htmlFor="ddMes" className="form-label">
                    Mes
                  </label>
                  <DropDownMonthComponent
                    onDropdownChange={handleDropdownMesChange}
                  />

                </div>

                <div className="row mb-3">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    onChange={(e) => handleChangeSelectedFile(e)}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    required
                  />
                </div>
                <div className="row mb-3">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}
                  >
                    Importar
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast para mostrar mensajes de éxito o error */}
      {showToast && (

        <div className="toast border-0 show" role="alert" aria-live="assertive" aria-atomic="true">

          <div className={`toast-header bg-${toastType} text-white`}>
            <img src="..." className="rounded me-2" alt="..."/>
              <strong className="me-auto">Status Process</strong>
              <small className="text-muted">Hace 11 minutos</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}
    </>

  );
};

export default ImportComponent;
