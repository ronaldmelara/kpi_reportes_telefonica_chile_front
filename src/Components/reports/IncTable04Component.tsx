import React, { useEffect, useState, useRef } from 'react'
/* import { styled } from '@mui/material/styles'; */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import useFeth2 from '../../hook/useFetch2.ts';
import '../reports/IncReports.css';

/* function sumarTiempos(tiempo1, tiempo2) {
    const [horas1, minutos1, segundos1] = tiempo1.split(':').map(Number);
    const [horas2, minutos2, segundos2] = tiempo2.split(':').map(Number);

    const totalSegundos = segundos1 + segundos2;
    const totalMinutos = minutos1 + minutos2 + Math.floor(totalSegundos / 60);
    const totalHoras = horas1 + horas2 + Math.floor(totalMinutos / 60);

    return (
        ('0' + totalHoras).slice(-2) +
        ':' +
        ('0' + (totalMinutos % 60)).slice(-2) +
        ':' +
        ('0' + (totalSegundos % 60)).slice(-2)
    );
} */

function calcularPromedioTiempo(rows, campoTiempo) {
    // Filtrar los tiempos no nulos
    const tiempos = rows
        .filter(row => row[campoTiempo] !== null)
        .map(row => {
            // Dividir el tiempo en horas, minutos y segundos
            const [horas, minutos, segundos] = row[campoTiempo].split(':').map(Number);
            // Convertir a segundos
            return horas * 3600 + minutos * 60 + segundos;
        });

    // Calcular el promedio en segundos
    const promedioSegundos = tiempos.reduce((total, tiempo) => total + tiempo, 0) / tiempos.length;

    // Convertir el promedio de segundos a formato HH:MM:SS
    const horas = Math.floor(promedioSegundos / 3600);
    const minutos = Math.floor((promedioSegundos % 3600) / 60);
    const segundos = Math.floor(promedioSegundos % 60);

    // Formatear el resultado
    const formatoDosDigitos = (valor) => (valor < 10 ? '0' : '') + valor;
    const promedioFormateado = `${formatoDosDigitos(horas)}:${formatoDosDigitos(minutos)}:${formatoDosDigitos(segundos)}`;

    return promedioFormateado;
}

function convertirTiempoAMinutos(tiempo) {
    // Separar las partes del tiempo
    const partesTiempo = tiempo.split(":");
    let horas = 0, minutos = 0, segundos = 0;

    // Asignar las partes a horas, minutos y segundos
    if (partesTiempo.length === 3) {
        horas = parseInt(partesTiempo[0], 10);
        minutos = parseInt(partesTiempo[1], 10);
        segundos = parseInt(partesTiempo[2], 10);
    } else if (partesTiempo.length === 2) {
        minutos = parseInt(partesTiempo[0], 10);
        segundos = parseInt(partesTiempo[1], 10);
    } else {
        throw new Error("Formato de tiempo no válido");
    }

    // Calcular el total de minutos
    const totalMinutos = horas * 60 + minutos + segundos / 60;

    return totalMinutos;
}

export const IncTable04Component = (props) => {
    const { mes, anio } = props;
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";


    const [pending, setPending] = useState<boolean>(true);
    const { data: rows, loading: loading, error: error } = useFeth2(`${process.env.REACT_APP_JAVA_API_URL_REPORTS}/inc/rpt04/${anio}/${mes}`, token);


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
