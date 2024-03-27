import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../StyleCommon.css";

const DropDownMonthComponent = ({ onDropdownChange }) => {
  /* const [selectedValue, setSelectedValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(""); */
  const handleChange = (event) => {

    const selectedOption = event.target.value;
    const selectedAnio = event.target.options[event.target.selectedIndex].text;
   /*  setSelectedValue(selectedOption);
    setSelectedItem(event.target.options[event.target.selectedIndex].text); */
    onDropdownChange(selectedOption, selectedAnio); // Llama a la función del componente principal con el valor seleccionado
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
    { value: getCurrentMonth(), label: getFormattedDate(0) },
    { value: getPreviousMonth(), label: getFormattedDate(-1) },
  ];
  return (
    <>

    <select id="ddlMeses" className="form-select" onChange={handleChange} required defaultValue={""}>
                <option value="">Seleccione una opción</option>
                {months && months.map(item =>(
                 
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>

    </>
  );
};

export default DropDownMonthComponent;
