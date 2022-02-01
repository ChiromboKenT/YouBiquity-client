/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { AuthContext } from "./AppAuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import { config } from "./config";

function Login() {
  const { dispatch } = useContext(AuthContext);
  const [loadState, setLoadState] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoadState(true);
      const result = await axios({
        method: "post",
        url: `${config.host}/api/v1/admin/login`,

        data: {
          username: data.username,
          password: data.password,
        },
      });

      dispatch({
        type: "SIGNIN",
        payload: {
          username: result.data.user.username as string,
          role: result.data.user.role,
          xml: result.data.user.xml,
        },
      });

      setTimeout(() => {
        dispatch({
          type: "REMOVELOGGED",
          payload: { messageLogged: undefined },
        });
      }, 2000);
      setLoadState(false);
      navigate("/role", {
        replace: true,
      });
    } catch (err) {
      if (`error: ${err}`.includes("400")) {
        dispatch({
          type: "ERROR",
          payload: { error: "Incorrect Login Details" },
        });
        setLoadState(false);
        setTimeout(() => {
          dispatch({
            type: "ERROR",
            payload: { error: undefined },
          });
        }, 2000);
      }
    }

    // dispatch({
    //   type: "SIGNIN",
    //   payload: data,
    // });
    // console.log(data);
  };
  return (
    <form id="form1" className="url-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="url-form--container">
        <input
          className="url-input"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Please provide a username",
            },
          })}
          placeholder="Enter username"
        />
        <ErrorMessage
          errors={errors}
          name="url"
          render={({ message }) => <p className="url-error">{message}</p>}
        />
        <input
          className="url-input"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "The password is required",
            },
          })}
          placeholder="Enter password"
        />
        <ErrorMessage
          errors={errors}
          name="url"
          render={({ message }) => <p className="url-error">{message}</p>}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="submit"
            form="form1"
            className="url-button"
            style={{ marginRight: "1rem" }}
          />
          {loadState && <ClipLoader loading={loadState} size={40} />}
        </div>
      </div>
    </form>
  );
}

export default Login;
