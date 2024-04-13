import { toast } from 'react-toastify'

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true
}

export const MessageBox = (type, message) => {
  if (type === 'success') toast.success(message, toastOptions)
  if (type === 'error') toast.error(message, toastOptions)
  if (type === 'warn') toast.warn(message, toastOptions)
  if (type === 'info') toast.info(message, toastOptions)
}
