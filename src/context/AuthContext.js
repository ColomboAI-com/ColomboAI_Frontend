"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { ROOT_URL_AUTH } from "@/utlils/rootURL";
import { handleError } from "@/utlils/handleError";
import { MessageBox } from "@/components/MessageBox";
import { getCookie } from "@/utlils/cookies";
import NewDevicePopup from "@/components/auth/NewDevicePopup";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const defaultInputs = {
  username: "",
  name: "",
  age: "",
  email: "",
  otp: "",
};

const defaultValidations = {
  username: false,
  name: false,
  age: false,
  email: false,
  otp: false,
};

const defaultLoadings = {
  otp: false,
  auth: false,
  google: false,
  meta: false,
  microsoft: false,
};

export const AuthContextProvider = ({ children }) => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [validations, setValidations] = useState(defaultValidations);
  const [loadings, setLoadings] = useState(defaultLoadings);
  const [new_device, setNew_device] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setValidations((prev) => ({ ...prev, [name]: false }));
  };

  const getOTP = async (action = "sign-in") => {
    try {
      setLoadings((prev) => ({ ...prev, otp: true }));
      const data =
        action === "sign-in"
          ? {
              action,
              email: inputs.email,
            }
          : {
              action,
              email: inputs.email,
              user_name: inputs.username,
              name: inputs.name,
              age: inputs.age,
              email: inputs.email,
            };
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/get-otp`, data);
      setNew_device(res.data.new_device);
      MessageBox("success", res.data.message);
      return res;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, otp: false }));
    }
  };

  const signUp = async () => {
    try {
      setLoadings((prev) => ({ ...prev, auth: true }));
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sign-up`, {
        action: "sign-up",
        user_name: inputs.username,
        name: inputs.name,
        age: inputs.age,
        email: inputs.email,
        otp: inputs.otp,
      });
      MessageBox("success", res.data.message);
      return res;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, auth: false }));
    }
  };

  const signIn = async () => {
    try {
      setLoadings((prev) => ({ ...prev, auth: true }));

      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sign-in`, {
        action: "sign-in",
        email: inputs.email,
        otp: inputs.otp,
      });

      if (res.data.new_device) {
        setNew_device(true);
      }

      MessageBox("success", res.data.message);
      return res;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, auth: false }));
    }
  };

  const ssoAuthentication = async ({ provider, token }) => {
    try {
      setLoadings((prev) => ({ ...prev, [provider]: true }));
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/sso-authentication`, {
        provider,
        token,
      });
      MessageBox("success", res.data.message);
      return res;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const addnewdevice = async (email) => {
    try {
      const res = await axios.post(
        `${ROOT_URL_AUTH}/user/addnewdevice`,
        { email },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      MessageBox("success", res.data.message);
      return res;
    } catch (error) {
      handleError(error);
    }
  };

  const resetAuthValues = () => {
    setInputs(defaultInputs);
    setValidations(defaultValidations);
    setLoadings(defaultLoadings);
  };

  const handlePopupConfirm = async () => {
    await addnewdevice(inputs.email); // Perform action on confirmation
    setShowPopup(false); // Hide the popup after confirming
    setTimeout(() => router.replace("/"), 1000);
  };

  const handlePopupCancel = () => {
    setShowPopup(false); // Hide the popup after canceling
    router.replace("/");
  };

  const passKeySignUpStart = async () => {
    try {
      setLoadings((prev) => ({ ...prev, auth: true }));
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/passkey/sign-up/start`, {
        user_name: inputs.username,
        name: inputs.name,
        age: inputs.age,
      });
      MessageBox("success", res.data.message);
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, auth: false }));
    }
  };

  const passKeySignUpFinish = async ({ data }) => {
    try {
      setLoadings((prev) => ({ ...prev, auth: true }));
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/passkey/sign-up/finish`, {
        user_name: inputs.username,
        data,
      });
      MessageBox("success", res.data.message);
      return res;
    } catch (err) {
      console.log(err);
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, auth: false }));
    }
  };

  const passKeySignInStart = async () => {
    try {
      setLoadings((prev) => ({ ...prev, auth: true }));
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/passkey/sign-in/start`, {
        user_name: inputs.username,
      });
      MessageBox("success", res.data.message);
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, auth: false }));
    }
  };

  const passKeySignInFinish = async ({ data }) => {
    try {
      setLoadings((prev) => ({ ...prev, auth: true }));
      const res = await axios.post(`${ROOT_URL_AUTH}/auth/passkey/sign-in/finish`, {
        user_name: inputs.username,
        data,
      });
      MessageBox("success", res.data.message);
      return res;
    } catch (err) {
      console.log(err);
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, auth: false }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        inputs,
        setInputs,
        validations,
        setValidations,
        loadings,
        setLoadings,
        new_device,
        setNew_device,
        setShowPopup,
        handleInputs,
        getOTP,
        signUp,
        signIn,
        ssoAuthentication,
        addnewdevice,
        resetAuthValues,
        passKeySignUpStart,
        passKeySignUpFinish,
        passKeySignInStart,
        passKeySignInFinish,
      }}
    >
      {children}
      {showPopup && <NewDevicePopup onConfirm={handlePopupConfirm} onCancel={handlePopupCancel} />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
