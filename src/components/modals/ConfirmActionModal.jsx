import React from 'react';
import Modal from '@/components/elements/Modal'; // Assuming use of the base Modal
import Button from '@/elements/Button';

const ConfirmActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action? This cannot be undone.",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  isConfirming = false // For loading state on confirm button
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={onClose} // setIsOpen on Modal usually directly closes it
      className="max-w-md w-full p-0" // Remove padding from Modal, handle in content div
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {message}
          </p>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <Button
            title={confirmButtonText}
            onClick={onConfirm}
            loading={isConfirming}
            disabled={isConfirming}
            className="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
          />
          <Button
            title={cancelButtonText}
            onClick={onClose}
            disabled={isConfirming}
            className="mt-3 w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmActionModal;
