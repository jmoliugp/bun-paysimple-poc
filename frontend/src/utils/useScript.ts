import { useEffect } from "react";
import { loadPaysimpleJs } from "./loadPaysimpleJs";
import { getCheckoutToken } from "../networking/getCheckoutToken";

const PAYSIMPLE_SCRIPT_URL =
  "https://sandbox-api.paysimple.com/paysimplejs/payments.js";

export const usePaysimpleScript = () => {
  useEffect(() => {
    console.log("🚀 ~ usePaysimpleScript ~ useEffect START");
    const script = document.createElement("script");

    script.src = PAYSIMPLE_SCRIPT_URL;
    script.async = true;
    console.log("🚀 ~ usePaysimpleScript ~ useEffect 1");
    script.onload = async () => {
      console.log("🚀 ~ script.onload");
      const token = await getCheckoutToken();
      loadPaysimpleJs(token);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
