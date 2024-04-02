

import React, { useEffect, useState, useRef } from "react";
import useFeth2 from "../../hook/useFetch2.ts";
import DataTable from "react-data-table-component";

// Función para formatear una fecha en formato DD/MM/YYYY
const formatDateString = (inputString) => {
    // Crear un objeto de fecha a partir del string de entrada
    const date = new Date(inputString);
    // Obtener los componentes de la fecha (día, mes y año)
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();
    // Formatear la fecha como DD/MM/YYYY
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
};


const ImportedListComponent = () => {
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";


    const [pending, setPending] = useState<boolean>(true);
    const { data: rows, loading: loading, error: error } = useFeth2(process.env.REACT_APP_JAVA_API_URL_IMPORT + "", token);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);


    useEffect(() => {
        if (rows) {
            setPending(false);
            if (error) {
                console.log(error);
            }
        }
    }, [rows]);

    const columns = [
        {
            name: "Id Carga",
            selector: (row) => row.idCarga,
            omit: true,
        },

        {
            name: "Archivo",
            selector: (row) => row.nombreArchivo,
            width: "300px",
        },
        {
            name: "Estado",
            selector: (row) => row.estado,
            width: "90px",
            conditionalCellStyles: [
                {
                    when: row => row.estado === 'Success',
                    style: {
                        backgroundColor: 'rgba(63, 195, 128, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: row => row.estado === 'Pending' || row.estado === 'In Progress',
                    style: {
                        backgroundColor: 'rgba(248, 148, 6, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: row => row.estado === 'Failed',
                    style: {
                        backgroundColor: 'rgba(242, 38, 19, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'not-allowed',
                        },
                    },
                },
            ],
        },
        {
            name: "Datasource",
            selector: (row) => row.datasource,
            width: "330px",
        },
        {
            name: "Usuario",
            selector: (row) => row.nombreUsuario,
            width: "160px",
            omit: true,
        },
        {
            name: "Comentario",
            selector: (row) => row.resumenImportacion,
            width: "200px",
        },
        {
            name: "Importado",
            selector: (row) => formatDateString(row.fechaImportacion),
            width: "100px",
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
                    /*  <Button
                       icon="pi pi-eye"
                       rounded
                       text
                       aria-label="Ver"
                       severity="info"
                       onClick={() => handleButtonRowClick(row)}
                       size="small"
                     ></Button> */
                    "OK"
                ) : (
                    ""
                ),
        },
        {
            name: "Procesar",
            button: true,

            cell: (row) =>
                row.idEstadoImportacion === 5 && row.periodoAbierto === 1 ? (
                    /* <Button
                      icon="pi pi-cog"
                      rounded
                      text
                      aria-label="Procesar"
                      severity="success"
                      size="small"
                    ></Button> */
                    "OK2"
                ) : (
                    ""
                ),
        },
    ];



    return (
        <>
            <div className="container mt-5">
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Historial Cargas</h5>
                        {pending ? (
                            <p>Cargando...</p>
                        ) : (
                            <DataTable columns={columns} data={rows} pagination />
                        )}
                    </div>
                </div>
            </div>





        </>
    );

}

export default ImportedListComponent;