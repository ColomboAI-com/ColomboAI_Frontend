export default function Loader({ className }) {
  return (
    <div
      className={`flex justify-center items-center${
        className ? ` ${className}` : ""
      }`}
    >
      Loading...
    </div>
  );
}
