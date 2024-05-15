import React, { useEffect, useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

export const EditDataPage = () => {
    const formRef = useRef(null); // Referencia al formulario
    const token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : "";
    const [ticketSelected, setTicketSelected] = useState("");
    const [data, setData] = useState(null);
    const [pending, setPending] = useState(null);

    const [tipoSelected, setTipoSelecte] = useState("");
    const [e2eSelected, setE2eSelecte] = useState(null);
    const [slaSelected, setSlaSelecte] = useState(null);
    const [observacionSelected, setObservacionSelecte] = useState(null);


    useEffect(() => {
        if (data) {
            setPending(false);
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {

            event.stopPropagation();
        }
        else {
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


                    setData(res.data);
                    setPending(true);

                } catch (err) {

                    console.error('Error:', err);
                }

            }

            fetchData();


        }




    };

    const handleSave = (event) => {
    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Buscar</h5>
                        <form ref={formRef} className="needs-validation" novalidate>
                            <div className="container">
                                <div className="row mb-3">

                                    <input type="text" class="form-control"
                                        placeholder="Ej.: INC000002751176/CRQ000000087535" aria-label="txtId" aria-describedby="basic-addon1"
                                        onChange={e => setTicketSelected(e.target.value)}

                                    ></input>

                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
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

                                    <form>
                                        <div className="container">
                                            <div className="input-group">
                                                <span className="input-group-text">Ticket</span>
                                                <input type="text" aria-label="Ticket" value={ticketSelected} className="form-control" />
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text">Tipo</span>
                                                <input type="text" aria-label="Tipo Incidencia" value={tipoSelected} className="form-control" />
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text">E2E</span>
                                                <input type="text" aria-label="E2E" value={e2eSelected} className="form-control" onChange={(e) => setE2eSelecte(e.target.value)} />
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text">SLA</span>
                                                <input type="text" aria-label="SLA" value={slaSelected} className="form-control" onChange={(e) => setSlaSelecte(e.target.value)} />
                                            </div>

                                            <div className="input-group">
                                                <span className="input-group-text">Observaciones</span>
                                                <input type="text" aria-label="SLA" value={observacionSelected} className="form-control" onChange={(e) => setObservacionSelecte(e.target.value)} />
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
