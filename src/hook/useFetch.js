import { useState, useEffect } from "react";

import axios from "axios";

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
  const [callStatus, setCallStatus] = useState("idle"); // "idle", "loading", "success", "error"

  const fetchData = async (url, request, config, method) => {
    try {
      setLoading(true);
      setCallStatus("loading");

      let res;
      if (method === "GET") {
        res = await axios.get(url, config);
      }
      if (method === "POST") {
        res = await axios.post(url, request, config);
      }
      if (method === "PUT") {
        res = await axios.put(url, request, config);
      }
      if (method === "DELETE") {
        res = await axios.delete(url, config);
      }

      setResponse(res);

      setCallStatus("success");
    } catch (err) {
      setErrorResponse(err.message);
      setCallStatus("error");
    } finally {
      setLoading(false);
    }
  };

  //fetchData();

  return { response, loading, errorResponse, callStatus, fetchData };
};

export default useFetch;
