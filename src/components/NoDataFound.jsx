export default function NoDataFound({ message = 'No Data Found', className }) {
  return (
    <div className={`flex justify-center items-center${className ? ` ${className}` : ''}`}>{message}</div>
  )
}