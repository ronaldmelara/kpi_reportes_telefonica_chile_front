import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSearchAlt } from "react-icons/bi";
import useFeth2 from "../hook/useFetch2.ts";
import { IncTable01Component } from '../Components/reports/IncTable01Component.tsx';

export const ReportsPage = () => {
    const [selectReporte, setSelectReporte] = useState();
    const [selectPeriodo, setSelectPeriodo] = useState();
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
                                    <select id="ddlPeriodos" className="form-select" onChange={(e) => { setSelectPeriodo(e.target.value) }} defaultValue={""} required>
                                        <option value="">Seleccione una opción</option>
                                        {

                                            periodos && periodos.map(item => (
                                                <option key={item.idReporte} value={item.idReporte}>{item.mes} - {item.anio}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <div className='row mb-3  justify-content-end'>
                                    <div className='col-3'>
                                        <a href="#" className="btn btn-primary w-100 p-3"><BiSearchAlt /> Consultar</a>
                                    </div>
                                </div>

                            </div>

                        </form>

                        <IncTable01Component mes={3} anio={2024} />

                    </div>
                </div>
            </div>
        </>

    )
}
