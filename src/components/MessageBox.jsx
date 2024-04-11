import cogoToast from "cogo-toast"

export const MessageBox = (type, message) => {
  if (type === 'success') {
    cogoToast.success(message, { hideAfter: 3, position: 'top-right' })
    return
  }
  if (type === 'error') {
    cogoToast.error(message, { hideAfter: 3, position: 'top-right' })
    return
  }
  if (type === 'warn') {
    cogoToast.warn(message, { hideAfter: 3, position: 'top-right' })
    return
  }
  if (type === 'info') {
    cogoToast.info(message, { hideAfter: 3, position: 'top-right' })
    return
  }
}              