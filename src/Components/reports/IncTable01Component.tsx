import React, { useEffect, useState, useRef } from 'react'
/* import { styled } from '@mui/material/styles'; */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import useFeth2 from '../../hook/useFetch2.ts';
import '../reports/IncReports.css';

export const IncTable01Component = (props) => {
  const { mes, anio } = props;
  const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";


  const [pending, setPending] = useState<boolean>(true);
  const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/rpt01/${anio}/${mes}`, token);



  function sumInc(items: readonly any[]) {
    return items.map(({ totalIncidentes }) => totalIncidentes).reduce((sum, i) => sum + i, 0);
  }

  function sumReq(items: readonly any[]) {
    return items.map(({ totalRequerimientos }) => totalRequerimientos).reduce((sum, i) => sum + i, 0);
  }

  function sumTotal(items: readonly any[]) {
    return items.map(({ totalGeneralPorGrupo }) => totalGeneralPorGrupo).reduce((sum, i) => sum + i, 0);
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
                <TableCell align='center'>Incidentes</TableCell>
                <TableCell align='center'>Requerimientos</TableCell>
                <TableCell align='center'>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow>
                  <TableCell>{row.grupoAsignacion}</TableCell>
                  <TableCell align='right'>{row.totalIncidentes}</TableCell>
                  <TableCell align='right'>{row.totalRequerimientos}</TableCell>
                  <TableCell align='right'>{row.totalGeneralPorGrupo}</TableCell>
                </TableRow>
              ))}
              <TableRow className='css-footer-mui'>
                <TableCell></TableCell>
                <TableCell align='right'>{sumInc(rows)}</TableCell>
                <TableCell align='right'>{sumReq(rows)}</TableCell>
                <TableCell align='right'>{sumTotal(rows)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>



        </>

      )}
    </>




  )
}
