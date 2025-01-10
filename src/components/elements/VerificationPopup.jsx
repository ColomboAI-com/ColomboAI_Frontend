"use client";

import { useRouter } from "next/navigation";

const VerificationPopup = ({ setIsOpen }) => {
  const router = useRouter();

  const handleProceed = () => {
    setIsOpen(false); // Close the modal
    router.push("/passkey/sign-up");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Verification Required</h2>
      <p className="mb-6">
        You are not verified. To access the feature, you need to complete the passkey registration.
      </p>
      <button
        onClick={handleProceed}
        className="w-full max-w-sm bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Proceed to Passkey Registration
      </button>
    </div>
  );
};

export default VerificationPopup;
