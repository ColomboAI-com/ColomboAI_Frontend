import RenderFeed from "@/components/feed/post/RenderFeed"

export default function Images() {
  return (
    <div className="sm:mx-[1rem] md:mx-[2.5rem] xl:mx-[0rem]">
  <RenderFeed filter={'image'} />
  </div>
)
}
