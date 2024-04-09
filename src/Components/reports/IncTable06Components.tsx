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


export const IncTable06Component = (props) => {
    const { mes, anio } = props;
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";


    const [pending, setPending] = useState<boolean>(true);
    const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/rpt06/${anio}/${mes}`, token);


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
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell>{row.grupoAsignacion}</TableCell>
                                    <TableCell align='right'>{row.promedioIncidentes}</TableCell>
                                    <TableCell align='right'>{row.promedioRequerimientos}</TableCell>
                                    <TableCell align='right'>{row.promedioTotal}</TableCell>
                                    <TableCell align='right'>{row.minInc?.toFixed(2)}</TableCell>
                                    <TableCell align='right'>{row.minReq?.toFixed(2)}</TableCell>
                                </TableRow>
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
