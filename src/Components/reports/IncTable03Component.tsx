import React, { useEffect, useState, useRef } from 'react'
/* import { styled } from '@mui/material/styles'; */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import useFeth2 from '../../hook/useFetch2.ts';
import '../reports/IncReports.css';

export const IncTable03Component = (props) => {
    const { mes, anio } = props;
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";


    const [pending, setPending] = useState<boolean>(true);
    const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/rpt03/${anio}/${mes}`, token);

    function sumTotal(items: readonly any[]) {
        return items.map(({ totalCumplidos }) => totalCumplidos).reduce((sum, i) => sum + i, 0);
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
                                <TableCell align='center'>Cumplido</TableCell>
                                <TableCell align='center'>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell>{row.grupoAsignacion}</TableCell>
                                    <TableCell align='right'>{row.totalCumplidos}</TableCell>
                                    <TableCell align='right'>{row.totalCumplidos}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow className='css-footer-mui'>
                                <TableCell></TableCell>
                                <TableCell align='right'>{sumTotal(rows)}</TableCell>
                                <TableCell align='right'>{sumTotal(rows)}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>



                </>

            )}
        </>




    )
}
