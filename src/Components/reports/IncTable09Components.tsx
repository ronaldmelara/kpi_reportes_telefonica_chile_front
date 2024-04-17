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


export const IncTable09Component = (props) => {
    const { mes, anio, report } = props;
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";
    const [groupedData, setGroupedData] = useState<any>();

    const [pending, setPending] = useState<boolean>(true);
    const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/${report}/${anio}/${mes}`, token);


    let promedioTotalIncidentes = "";
    let promedioRequerimientos = "";
    let promedioTotal = "";
    if (rows) {
        promedioTotalIncidentes = calcularPromedioTiempo(rows, 'promedioIncidentes');
        promedioRequerimientos = calcularPromedioTiempo(rows, 'promedioRequerimientos');
        promedioTotal = calcularPromedioTiempo(rows, 'promedioTotal');
    }


    useEffect(() => {
        if (rows) {
            setPending(false);
            if (error) {
                console.log(error);
            }

            setGroupedData(rows.reduce((acc, item) => {
                const { urgencia, totalIncidentes } = item;
                if (!acc[urgencia]) {
                    acc[urgencia] = { items: [], total: 0 };
                }
                acc[urgencia].items.push(item);
                //acc[urgencia].total += totalIncidentes;
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

                    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead className='css-header-mui'>
                            <TableRow>
                                <TableCell align='center'>Grupo Asignado</TableCell>
                                <TableCell align='center'>Incidente</TableCell>
                                <TableCell align='center'>Requerimiento</TableCell>
                                <TableCell align='center'>Total General</TableCell>
                                <TableCell align='center'>Min. Inc</TableCell>
                                <TableCell align='center'>Min. Req</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Object.keys(groupedData).map((urgencia) => (
                                <>
                                    <TableRow>
                                        <TableCell colSpan={6}><p className='fw-bold bg-light text-dark mb-0'>{urgencia}</p> </TableCell>

                                    </TableRow>

                                    {groupedData[urgencia].items.map((item) => (
                                        <>
                                            <TableRow>

                                                <TableCell><p className='px-1 mb-0'>{item.grupoAsignado}</p></TableCell>
                                                <TableCell align='right'>{item.promedioIncidentes}</TableCell>
                                                <TableCell align='right'>{item.promedioRequerimientos}</TableCell>
                                                <TableCell align='right'>{item.promedioTotal}</TableCell>
                                                <TableCell align='right'>{item.minInc?.toFixed(2)}</TableCell>
                                                <TableCell align='right'>{item.minReq?.toFixed(2)}</TableCell>
                                            </TableRow>

                                        </>


                                    ))}


                                </>

                            ))}



                            <TableRow className='css-footer-mui'>
                                <TableCell></TableCell>
                                <TableCell align='right'>{promedioTotalIncidentes}</TableCell>
                                <TableCell align='right'>{promedioRequerimientos}</TableCell>
                                <TableCell align='right'>{promedioTotal}</TableCell>
                                <TableCell align='right'>{convertirTiempoAMinutos(promedioTotalIncidentes)?.toFixed(2)}</TableCell>
                                <TableCell align='right'>{convertirTiempoAMinutos(promedioRequerimientos)?.toFixed(2)}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>



                </>

            )}
        </>




    )
}
