import Loader from "@/components/Loader"

export default function Button({ title, className, height, width, loading, onClick, disabled }) {
  return (
    <button
      className={className}
      onClick={(e) => { if (onClick && !loading) { onClick(e) } }}
      style={{
        height: height,
        width: width
      }}
      disabled={disabled}
    >
      {loading ? <Loader /> : title}
    </button>
  )
}