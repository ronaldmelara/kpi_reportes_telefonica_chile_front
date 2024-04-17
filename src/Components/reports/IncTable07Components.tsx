import React, { useEffect, useState, useRef } from 'react'
/* import { styled } from '@mui/material/styles'; */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import useFeth2 from '../../hook/useFetch2.ts';
import '../reports/IncReports.css';
import { calcularPromedioTiempo, convertirTiempoAMinutos } from '../Helpers/commons.tsx';


export const IncTable07Component = (props) => {
    const { mes, anio } = props;
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";

    const [groupedData, setGroupedData] = useState<any>();
    const [pending, setPending] = useState<boolean>(true);
    const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/rpt07/${anio}/${mes}`, token);



    /*  let promedioTotalIncidentes = "";
     let promedioRequerimientos = "";
     let promedioTotal = "";
     if (rows) {
         promedioTotalIncidentes = calcularPromedioTiempo(rows, 'promedioIncidentes');
         promedioRequerimientos = calcularPromedioTiempo(rows, 'promedioRequerimientos');
         promedioTotal = calcularPromedioTiempo(rows, 'promedioTotal');
     } */


    useEffect(() => {
        if (rows) {
            setPending(false);
            if (error) {
                console.log(error);
            }

            setGroupedData(rows.reduce((acc, item) => {
                const { prioridad, totalIncidentes } = item;
                if (!acc[prioridad]) {
                    acc[prioridad] = { items: [], total: 0 };
                }
                acc[prioridad].items.push(item);
                acc[prioridad].total += totalIncidentes;
                return acc;
            }, {}));
        }
    }, [rows]);

    return (

        <>
            {pending ? (
                <p>Cargando...</p>
            ) : (
                <>


                    <div className="list-group container">
                        {Object.keys(groupedData).map((prioridad) => (

                            <div className='list-group-item'>
                                <div className='row'>
                                    <p className="mb-1 bg-light fs-6">
                                        <div className='row justify-content-between'>
                                            <div className='col-6'><p className='fw-bold bg-light text-dark mb-0'>{prioridad}</p></div>
                                            <div className='col-3'><p className='fw-bold bg-light text-dark mb-0'>Total: {groupedData[prioridad].total}</p></div>
                                        </div>
                                    </p>
                                    {groupedData[prioridad].items.map((item) => (
                                        <>
                                            <div className='col-9'><p className="css-177gid-row-grouping mb-0"><small>{item.grupoAsignacion}</small></p></div>
                                            <div className='col-3'><p className='css-177gid-row-grouping mb-0'><small>{item.totalIncidentes}</small></p></div></>


                                    ))}
                                </div>


                            </div>

                        ))}


                    </div>




                </>

            )}
        </>




    )
}
