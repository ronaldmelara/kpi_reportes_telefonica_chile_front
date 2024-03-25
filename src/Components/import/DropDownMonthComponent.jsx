import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import "primeflex/primeflex.css";
import "../StyleCommon.css";

const DropDownMonthComponent = ({ onDropdownChange }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    onDropdownChange(selectedOption); // Llama a la función del componente principal con el valor seleccionado
  };

  // Función para obtener la fecha formateada
  const getFormattedDate = (offset) => {
    const today = new Date();
    const month = today.getMonth() + offset;
    const year = today.getFullYear();

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return `${year} - ${monthNames[(month + 12) % 12]}`;
  };

  // Función para obtener el número del mes actual
  const getCurrentMonth = () => {
    const today = new Date();
    return String(today.getMonth() + 1);
  };

  // Función para obtener el número del mes anterior
  const getPreviousMonth = () => {
    const today = new Date();
    const previousMonth = today.getMonth();
    return String(previousMonth === 0 ? 12 : previousMonth);
  };

  const months = [
    { value: "", label: "Seleccione un mes" },
    { value: getCurrentMonth(), label: getFormattedDate(0) },
    { value: getPreviousMonth(), label: getFormattedDate(-1) },
  ];
  return (
    <div className="col-12 md:col-9">
      <Dropdown
        onChange={handleChange}
        options={months}
        optionLabel="label"
        value={selectedValue}
        placeholder="Seleccione un mes"
        id="ddlMes"
        name="ddlMes"
        className=" w-full md:w-14rem"
      />
    </div>
  );
};

export default DropDownMonthComponent;
