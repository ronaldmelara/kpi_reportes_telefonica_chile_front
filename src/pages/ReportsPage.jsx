import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSearchAlt } from "react-icons/bi";
import useFeth2 from "../hook/useFetch2.ts";
import { IncTable01Component } from '../Components/reports/IncTable01Component.tsx';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IncTable02Component } from '../Components/reports/IncTable02Components.tsx';
import { IncTable03Component } from '../Components/reports/IncTable03Component.tsx';
import { IncTable04Component } from '../Components/reports/IncTable04Component.tsx';
import { IncTable05Component } from '../Components/reports/IncTable05Components.tsx';
import { IncTable06Component } from '../Components/reports/IncTable06Components.tsx';
import { IncTable07Component } from '../Components/reports/IncTable07Components.tsx';

export const ReportsPage = () => {
    const [selectReporte, setSelectReporte] = useState();
    const [selectPeriodo, setSelectPeriodo] = useState(null);
    const [periodos, setPeriodos] = useState();
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";
    const { data: ReportType, loading: reportLoading, error: reportError } = useFeth2(process.env.REACT_APP_JAVA_API_URL_CATALOG + "/reports", token);


    const fetchPeriodos = async (reportId) => {
        try {
            setPeriodos(null);
            const response = await fetch(`${process.env.REACT_APP_JAVA_API_URL_CATALOG}/periodos/${reportId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();

                setPeriodos(data);
            } else {
                throw new Error('Error al obtener los periodos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (selectReporte) {
            fetchPeriodos(selectReporte);
        }
    }, [selectReporte]);

    const formRef = useRef(null);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const valPeriodo = () => {
        let arr = [];
        if (selectPeriodo != null) {
            (selectPeriodo.split('-')).forEach((el) => arr.push(Number(el)));
            return arr;
        }
        else {
            return null;
        }
    }

    let component = null;
    if (selectReporte == "1" & selectPeriodo != null) {
        let periodFilter = valPeriodo();

        component = <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" variant='scrollable' scrollButtons="auto">
                        <Tab label="INCIDENTES Y REQUERIMIENTOS" value="1" />
                        <Tab label="TD REQUERIMIENTOS POR GRUPO" value="2" />
                        <Tab label="TD INCIDENCIAS POR GRUPO" value="3" />
                        <Tab label="TIEMPO DE RESTAURACIÓN DE INCIDENTES Y REQUERIMIENTOS" value="4" />
                        <Tab label="TIEMPO DE RESTAURACIÓN DE INCIDENTES Y REQUERIMIENTOS MANAGED" value="5" />
                        <Tab label="TIEMPO DE RESTAURACIÓN DE INCIDENTES Y REQUERIMIENTOS SERVICES DELIVERY" value="6" />
                        <Tab label="TD TOTAL POR PRIORIDAD" value="7" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <IncTable01Component mes={periodFilter[0]} anio={periodFilter[1]} />

                </TabPanel>
                <TabPanel value="2">
                    <IncTable02Component mes={periodFilter[0]} anio={periodFilter[1]} />
                </TabPanel>
                <TabPanel value="3">
                    <IncTable03Component mes={periodFilter[0]} anio={periodFilter[1]} />
                </TabPanel>
                <TabPanel value="4">
                    <IncTable04Component mes={periodFilter[0]} anio={periodFilter[1]} />
                </TabPanel>
                <TabPanel value="5">
                    <IncTable05Component mes={periodFilter[0]} anio={periodFilter[1]} />
                </TabPanel>
                <TabPanel value="6">
                    <IncTable06Component mes={periodFilter[0]} anio={periodFilter[1]} />
                </TabPanel>
                <TabPanel value="7">
                    <IncTable07Component mes={periodFilter[0]} anio={periodFilter[1]} />
                </TabPanel>
            </TabContext>
        </Box>
    }
    else {
        component = <></>;
    }

    return (
        <>
            <div className='container mt-5'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Consultar KPIs</h5>
                        <form ref={formRef} className="needs-validation" novalidate>
                            <div className='container'>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="ddlTipoReporte"
                                        className="form-label text-secondary"
                                    >
                                        Reporte
                                    </label>
                                    <select id="ddlTipoReporte" className="form-select" onChange={(e) => { setSelectReporte(e.target.value) }} defaultValue={""} required>
                                        <option value="">Seleccione una opción</option>
                                        {ReportType && ReportType.map(item => (

                                            <option key={item.id} value={item.id}>{item.value}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label
                                        htmlFor="ddlPeriodos"
                                        className="form-label text-secondary"
                                    >
                                        Periodo
                                    </label>
                                    <select id="ddlPeriodos" className="form-select" onChange={(e) => { setSelectPeriodo(e.target.value != "" ? (e.target.options[e.target.selectedIndex].text) : null); }} defaultValue={""} required>
                                        <option value="">Seleccione una opción</option>
                                        {

                                            periodos && periodos.map(item => (
                                                <option key={item.idReporte} value={item.idReporte}>{String(item.mes).padStart(2, '0')} - {item.anio}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <div className='row mb-3  justify-content-end d-none'>
                                    <div className='col-3'>
                                        <a href="#" className="btn btn-primary w-100 p-3"><BiSearchAlt /> Consultar</a>
                                    </div>
                                </div>

                            </div>

                        </form>


                        {component}


                    </div>
                </div>
            </div>
        </>

    )
}
