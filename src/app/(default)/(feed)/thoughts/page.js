import RenderFeed from "@/components/feed/post/RenderFeed"

export default function Thoughts() {
  return (
    <div className="flex justify-center">
    <div className="sm:mx-[0rem] md:mx-[2.5rem] xl:mx-[0rem]  sm:w-[375px] w-[680px] md:w-[680px] lg:w-[680px]">
      <RenderFeed filter={'thought'} />
    </div> 
    </div>
  )
}
