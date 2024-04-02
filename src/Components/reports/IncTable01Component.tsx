import React, { useEffect, useState, useRef } from 'react'
/* import { styled } from '@mui/material/styles'; */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import useFeth2 from '../../hook/useFetch2.ts';
import '../reports/IncReports.css';

export const IncTable01Component = (props) => {
  const { mes, anio } = props;
  const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";


  const [pending, setPending] = useState<boolean>(true);
  const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/rpt01/${anio}/${mes}`, token);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" variant='scrollable' scrollButtons="auto">
                  <Tab label="INCIDENTES Y REQUERIMIENTOS" value="1" />
                  <Tab label="TD REQUERIMIENTOS POR GRUPO" value="2" />
                  <Tab label="TD INCIDENCIAS POR GRUPO" value="3" />
                  <Tab label="TIEMPO DE RESTAURACIÓN DE INCIDENTES Y REQUERIMIENTOS" value="4" />
                  <Tab label="TIEMPO DE RESTAURACIÓN DE INCIDENTES Y REQUERIMIENTOS MANAGED" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1">
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
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item Three</TabPanel>
              <TabPanel value="5">Item Three</TabPanel>
            </TabContext>
          </Box>


        </>

      )}
    </>




  )
}
