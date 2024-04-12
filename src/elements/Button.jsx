import Loader from "@/components/Loader"

export default function Button({ title, className, height, width, loading, onClick, disabled }) {
  return (
    <button
      className={className}
      onClick={event => { if (onClick && !loading) onClick(event) }}
      style={{ height, width }}
      disabled={disabled}
    >
      {loading ? <Loader /> : title}
    </button>
  )
}