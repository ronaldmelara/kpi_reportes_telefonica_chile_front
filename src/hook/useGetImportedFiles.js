import { useState, useEffect } from "react";
import axios from "axios";

export const useGetImportedFiles = (token) => {
  const [dataGridImp, setDataGridImp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/carga/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log("entro");
        setDataGridImp(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Llama a fetchData inmediatamente

    const interval = setInterval(() => {
      fetchData(); // Llama a fetchData cada 2 minutos
    }, 120000); // 120000 milisegundos = 2 minutos

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return dataGridImp;
};
