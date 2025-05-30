import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image"; // Import next/image

export default function ImageBlock({ image = ['/images/home/feed-banner-img.png'] }) {
  const { setPopupImage } = useContext(GlobalContext);
  return (
    <div onClick={e => setPopupImage(image[0])} className={`flex ${image[0] ? `md:h-[30rem] sm:h-[30rem]` : `h-[0rem]`}`}>
      {typeof(image) === "object" ? image.map((src, index) => <Img key={index} src={src} />) : <Img src={image}/> }
    </div>
  )
}


function Img({ src }) {
  return (
    // Each image needs a relatively positioned container for layout="fill"
    // If multiple images, this div will be a flex item.
    // The w-full here means each image will try to take the full width of its flex container.
    // If the flex container is row-based, images might appear very wide.
    // This might need further styling adjustments depending on how multiple images should look.
    // For a single image, this should be fine.
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt="post_image"
        layout="fill"
        objectFit="cover"
        className="bg-white" // className on next/image applies to the underlying <img>
      />
    </div>
  );
}