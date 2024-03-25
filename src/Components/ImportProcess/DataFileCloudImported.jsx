import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const DataFileCloudImported = (props) => {
  const [dataGridImp, setDataGridImp] = useState([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      name: "Ticket",
      selector: (row) => row.ticket,
    },
    {
      name: "Servicio ISO",
      selector: (row) => row.servicioISO,
    },
    {
      name: "Grupo Asignado",
      selector: (row) => row.grupoAsignado,
    },
    {
      name: "Grupo Propietarios",
      selector: (row) => row.grupoPropietario,
    },
    {
      name: "Responsable",
      selector: (row) => row.responsable,
    },
    {
      name: "Remitente",
      selector: (row) => row.remitente,
    },
    {
      name: "Impacto",
      selector: (row) => row.impacto,
    },
    {
      name: "Urgencia",
      selector: (row) => row.urgencia,
    },
    {
      name: "Tipo Requerimiento",
      selector: (row) => row.tipo,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente,
    },
    {
      name: "Resumen",
      selector: (row) => row.resumen,
    },
    {
      name: "Fecha Notificacion",
      selector: (row) => row.fechaNotificacion,
    },
    {
      name: "Fecha Envío",
      selector: (row) => row.fechaEnvio,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
    },

    {
      name: "CatPresol1",
      selector: (row) => row.catpresol1,
    },
    {
      name: "CatPresol1",
      selector: (row) => row.catpresol2,
    },
    {
      name: "Fecha Resolución",
      selector: (row) => row.fechaResolucion,
    },
    {
      name: "Notas",
      selector: (row) => row.notas,
    },
    {
      name: "Resolucion",
      selector: (row) => row.resolucion,
    },
    {
      name: "Pendiente",
      selector: (row) => row.pendiente,
    },
    {
      name: "e2e",
      selector: (row) => row.e2e,
    },
    {
      name: "SLA",
      selector: (row) => row.sla,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const response = await axios.get(
          "http://localhost:8080/api/v1/carga/loaded/" + props.idCarga,
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
            withCredentials: true,
          }
        );
        console.log("entro");
        setDataGridImp(response.data);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Llama a fetchData inmediatamente
  }, []);

  return (
    <DataTable
      columns={columns}
      data={dataGridImp}
      progressPending={pending}
      pagination
    />
  );
};

export default DataFileCloudImported;
