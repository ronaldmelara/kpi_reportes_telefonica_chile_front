import React, { useEffect, useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

export const EditDataPage = () => {
    const formRef = useRef(null); // Referencia al formulario
    const formRefInc = useRef(null); // Referencia al formulario
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";
    const [ticketSelected, setTicketSelected] = useState("");
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(null);

    const [tipoSelected, setTipoSelecte] = useState("");
    const [e2eSelected, setE2eSelecte] = useState(null);
    const [slaSelected, setSlaSelecte] = useState(null);
    const [observacionSelected, setObservacionSelecte] = useState(null);

    const validateSearch = () => {
        const errors = {};

        const form = formRef.current;
        if (form) {
            const inputValue = form.elements["txtId"].value.trim();
            if (inputValue == "") {
                errors.txtId = "Debe seleccionar ingresar un Id";
            } else {
                // Expresión regular para validar el formato del Id
                const idRegex = /^(INC|CRQ)\d{12}$/;
                // Verificar si el valor del input coincide con la expresión regular
                if (!idRegex.test(inputValue)) {
                    errors.txtId = "Formato de Id no válido";
                }
            }

            return errors;
        }
        else {
            return null;
        }
    };

    const validateSave = () => {
        const errors = {};

        const form = formRefInc.current;
        if (form) {
            const idRegex = /^^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
            const inputValueE2E = form.elements["txtE2E"].value.trim();
            if (inputValueE2E == "") {
                errors.txtE2E = "Debe seleccionar ingresar un E2E";
            } else {
                // Verificar si el valor del input coincide con la expresión regular
                if (!idRegex.test(inputValueE2E)) {
                    errors.txtE2E = "Formato de E2E no válido";
                }
            }

            const inputValueSLA = form.elements["txtSLA"].value.trim();
            if (inputValueSLA == "") {
                errors.txtSLA = "Debe seleccionar ingresar un SLA";
            } else {
                // Verificar si el valor del input coincide con la expresión regular
                if (!idRegex.test(inputValueSLA)) {
                    errors.txtSLA = "Formato de SLA no válido";
                }
            }

            return errors;
        }
        else {
            return null;
        }
    }


    const handleChange = (event, type) => {
        const inputTime = event.target.value;
        // Expresión regular para validar el formato HH:MM:SS
        const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        if (regex.test(inputTime) || inputTime === '') {
            if (type == "sla") {
                setSlaSelecte(inputTime);
            }
            if (type == "e2e") {
                setE2eSelecte(inputTime);
            }
            //setTime(inputTime);

        }
    };

    const removeError = (form) => {
        // Si no hay errores, reseteamos los estilos y enviamos la solicitud

        const elements = form.querySelectorAll('.is-invalid');

        elements.forEach(element => {
            element.classList.remove('is-invalid');
        })
    }

    useEffect(() => {

        if (data) {
            setPending(false);
        } else {
            setPending(null);
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = formRef.current;

        const errors = validateSearch();

        removeError(form);

        if (Object.keys(errors).length > 0) {
            event.stopPropagation();
            Object.keys(errors).forEach(fieldName => {
                const field = form.elements[fieldName];
                field.classList.add("is-invalid");
                const errorFeedback = field.nextElementSibling;
                if (errorFeedback) {
                    errorFeedback.textContent = errors[fieldName];
                }
            });
            return;
        }


        setPending(true);
        // Deshabilitar el botón y mostrar el spinner
        const url = process.env.REACT_APP_JAVA_API_URL_IMPORT + "/ticket/" + ticketSelected;
        const fetchData = async () => {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
                    "Content-Type": "application/json",
                    // Añade el token al encabezado si está disponible
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            };
            try {
                const res = await axios.get(url, config);

                setTicketSelected(res.data.ticket);
                setTipoSelecte(res.data.idTipoIncidencia == 1 ? "Requerimiento" : "Incidente");
                setE2eSelecte(res.data.e2e);
                setSlaSelecte(res.data.sla);

                setObservacionSelecte(res.data.observaciones == null ? "" : res.data.observaciones)


                if (res.data == "" && res.status == 204) {

                    setData(null);
                    setPending(null);
                }
                if (res.status == 200) {

                    setData(res.data);
                    setPending(true);
                }

            } catch (err) {
                setPending(null);
                console.error('Error:', err);
                if (err.response && err.response.status === 403) {
                    // Redirigir al usuario al inicio de sesión
                    window.location.href = "/login";
                }
            }

        }

        fetchData();
    };

    const handleSave = (event) => {
        event.preventDefault();
        const form = formRefInc.current;

        const errors = validateSave();

        removeError(form);

        if (Object.keys(errors).length > 0) {
            event.stopPropagation();
            Object.keys(errors).forEach(fieldName => {
                const field = form.elements[fieldName];
                field.classList.add("is-invalid");
                const errorFeedback = field.nextElementSibling;
                if (errorFeedback) {
                    errorFeedback.textContent = errors[fieldName];
                }
            });
            return;
        }



    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Buscar</h5>
                        <form ref={formRef} className="needs-validation" noValidate>
                            <div className="container">
                                <div className="row mb-3">

                                    <input type="text" className="form-control"
                                        placeholder="Ej.: INC000002751176/CRQ000000087535" maxLength={15} aria-label="txtId" aria-describedby="basic-addon1"
                                        onChange={e => setTicketSelected(e.target.value)}
                                        id="txtId" name="txtId"
                                    ></input>

                                    <div className="invalid-feedback" id="txtIdError"></div>
                                </div>

                                <div className="row mb-3 justify-content-end">
                                    <div className='col-3'>
                                        <button type="submit" className="btn btn-primary w-100 p-3" onClick={handleSubmit}
                                        >
                                            <BsSearch /> Buscar
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </form>

                        {
                            pending == null ? <></> : (pending ? <p>Cargando....</p> : (
                                <>

                                    <form ref={formRefInc} className="needs-validation" noValidate>
                                        <div className="container">
                                            <div className="input-group mb-1">
                                                <span className="input-group-text">Ticket</span>
                                                <input type="text" aria-label="Ticket" id="txtTicket" name="txtTicket" value={ticketSelected} style={{ marginBottom: '0px' }} className="form-control" disabled readonly />
                                            </div>
                                            <div className="input-group mb-1">
                                                <span className="input-group-text">Tipo</span>
                                                <input type="text" aria-label="Tipo Incidencia" id="txtTipo" name="txtTipo" value={tipoSelected} style={{ marginBottom: '0px' }} className="form-control" disabled readonly />
                                            </div>
                                            <div className="input-group mb-1">
                                                <span className="input-group-text">E2E</span>
                                                <input type="text" aria-label="E2E" id="txtE2E" name="txtE2E" onChange={(e) => handleChange(e, "e2e")} maxLength={8} value={e2eSelected} style={{ marginBottom: '0px' }} className="form-control" onChange={(e) => setE2eSelecte(e.target.value)} />
                                                <div className="invalid-feedback" id="txtE2EError"></div>
                                            </div>
                                            <div className="input-group mb-1">
                                                <span className="input-group-text">SLA</span>
                                                <input type="text" aria-label="SLA" id="txtSLA" name="txtSLA" onChange={(e) => handleChange(e, "sla")} maxLength={8} value={slaSelected} style={{ marginBottom: '0px' }} className="form-control" onChange={(e) => setSlaSelecte(e.target.value)} />
                                                <div className="invalid-feedback" id="txtSLAError"></div>
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Observaciones</span>
                                                <input type="text" aria-label="Observaciones" id="txtObservaciones" maxLength={255} name="txtObservaciones" value={observacionSelected} style={{ marginBottom: '0px' }} className="form-control" onChange={(e) => setObservacionSelecte(e.target.value)} />
                                            </div>
                                            <div className="row mb-3 justify-content-end">
                                                <div className='col-3'>
                                                    <button type="submit" className="btn btn-primary w-100 p-3" onClick={handleSave}
                                                    >
                                                        <BsSearch /> Actualizar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </>
                            ))

                        }

                    </div>
                </div>
            </div>
        </>
    );
};
