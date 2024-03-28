import React, { useState, useRef } from "react";
import { useForm } from "../hook/userForm";

import "primeicons/primeicons.css";
import { Form, Field } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { BlockUI } from "primereact/blockui";
import { Toast } from "primereact/toast";

import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const LoginPage = () => {
  sessionStorage.clear();
  const [formData, setFormData] = useState({});
  const toast = useRef(null);

  const navigate = useNavigate();

  const { username, password, onInputChange, onResetForm } = useForm({
    username: "",
    password: "",
  });



  const validate = (data) => {
    let errors = {};

    if (!data.username) {
      errors.username = "Usuario es requerido.";
    }

    if (!data.password) {
      errors.password = "Password es requerido.";
    }

    return errors;
  };

  const handleClick = (data, form) => {
    setFormData(data);

   const fd = async()=>{
    try{
       
      const res = await axios.post("http://localhost:8080/auth/login",
      {
        username: data.username,
        password: data.password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        },
      });

      
      if (res && res.data) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('logged', "true");
        sessionStorage.setItem('loguseridged', res.data.userid);
        sessionStorage.setItem('username', data.username);

        navigate("/dashboard", {
          replace: true,
          state: {
            logged: true,
            username: data.username,
            token: res.data.token,
            userid: res.data.userid,
          },
        });
      }
      }catch(err){
        
      }
      finally{
        
        

        form.restart(); 
      }
   }
    
   fd();

    
  };

  /* if (errorResponse != null && callStatus === "error") {
    console.log("error");
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Archivo cargado correctamente",
      life: 3000,
    });
    console.log(errorResponse);
  } */
/* 
  if (response && callStatus === "success") {
    if (response) {
      var token = response.token;
      navigate("/dashboard", {
        replace: true,
        state: {
          logged: true,
          username: response.username,
          token: token,
          userid: response.userid,
        },
      });
    }
  } */

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  return (


<div class="login"> 
<Toast ref={toast} />
<h1>KPI Application</h1>
   {/*  <form method="post">
    	<input type="text" name="u" placeholder="Username" required="required" />
        <input type="password" name="p" placeholder="Password" required="required" />
        <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
    </form> */}
    <Form
            onSubmit={handleClick}
            initialValues={{ username: "", password: "" }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="username"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-user" />

                        <InputText
                          id="username"
                          {...input}
                          name="username"
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="username"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Usuario
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <Password
                          id="password"
                          {...input}
                          toggleMask
                          feedback={false}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Button
                  label="Entrar"
                  type="submit"
                  className="bg-primary font-bold border-round mt-2 max-w-full w-full"
                ></Button>
              </form>
            )}
          />
</div>
/* 
    </div> */
  );
};
