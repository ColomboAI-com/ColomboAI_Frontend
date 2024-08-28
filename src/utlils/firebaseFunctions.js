import { firebaseAuth } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const setupRecaptcha = () => {
    const verifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
            console.log('reCAPTCHA solved');
        }
    });
    return verifier;
};

export const SendOTP = async (appVerifier, country_code, contact_number) => {
    const formatPh = `+${country_code}${contact_number}`;
    return await signInWithPhoneNumber(firebaseAuth, formatPh, appVerifier)
        .then(data => window.confirmationResult = data)
        .catch((e) => { console.log(e); throw new Error() })
}

export const ConfirmOTP = async (code) => {
}