import { firebaseAuth } from "./firebaseConfig";
import {
    multiFactor,
    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";


export const setupRecaptcha = () => {
    const verifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
            console.log('reCAPTCHA solved');
        }
    });
    return verifier;
};

// export const SendOTP = async (country_code, contact_number) => {
//     const recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', { size: 'invisible' });

//     const phoneNumber = `+${country_code}${contact_number}`;

//     multiFactor(user).getSession()
//         .then(function (multiFactorSession) {
//             const phoneInfoOptions = {
//                 phoneNumber: phoneNumber,
//                 session: multiFactorSession
//             };

//             const phoneAuthProvider = new PhoneAuthProvider(firebaseAuth);

//             // Send SMS verification code.
//             return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
//         }).then(function (verificationId) {
//             console.log(verificationId);
//             // // Ask user for the verification code. Then:
//             // const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
//             // const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

//             // // Complete enrollment.
//             // return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
//         });


//     // const formatPh = `+${country_code}${contact_number}`;
//     // return await signInWithPhoneNumber(firebaseAuth, formatPh, appVerifier)
//     //     .then(data => window.confirmationResult = data)
//     //     .catch((e) => { console.log(e); throw new Error() })
// }



export const SendOTP = async (country_code, contact_number) => {
    try {
        // Set up reCAPTCHA verifier
        const recaptchaVerifier = new RecaptchaVerifier(
            firebaseAuth,
            'recaptcha-container',
            {
                size: 'invisible',
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log('reCAPTCHA solved:', response);
                    console.log('reCAPTCHA solved:', response.getAssertedRecaptcha());
                }
            },

        );

        console.log(firebaseAuth.tenantId)
        await recaptchaVerifier.render()

    

        // Format the phone number
        // const phoneNumber = `+${country_code}${contact_number}`;

        // // Send OTP
        // const confirmationResult = await signInWithPhoneNumber(firebaseAuth, phoneNumber, recaptchaVerifier);

        // // Store confirmationResult for later use (e.g., verifying the code)
        // window.confirmationResult = confirmationResult;

        // console.log(confirmationResult);

        // console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error during OTP sending:', error);
    }
};


export const ConfirmOTP = async (code) => {
}
