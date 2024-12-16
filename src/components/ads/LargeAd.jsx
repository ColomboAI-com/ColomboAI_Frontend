import { useState, useEffect } from 'react';
import Dropdown from "../messages/Dropdown";
import { LikeIcon, MagicPenIcon, PostMoreOptionsIcon, RePostIcon } from "../Icons";
import Image from "next/image";
import post_comment from "../../../public/images/icons/post_comment.svg";
import post_stats from "../../../public/images/icons/post_stats.svg";
import reply_icon from "../../../public/images/icons/reply_icon.svg";
import wallet_icon from "../../../public/images/icons/wallet_icon.svg";
const LargeAdComponent = ({divid}) => {
    const [adLoaded, setAdLoaded] = useState(false);

    useEffect(() => {
        const loadGPTScript = () => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };
    
        loadGPTScript()
          .then(() => {
            if (window.googletag && window.googletag.cmd) {
              console.log('Initializing Google Publisher Tag...');
              window.googletag.cmd.push(() => {
                try {
                  console.log('Defining ad slot...');
                 
                  // window.googletag.defineSlot('/23102803892/Test_768x',[[480, 320], [768, 1024], [1024, 768]],
                  //   divid)
                  // .addService(window.googletag.pubads());

                  window.googletag.defineSlot('/23102803892/Feed/InlineDisplayAds', [[480, 320], 'fluid'], divid)
                  .addService(window.googletag.pubads());

                  
                  // console.log('Enabling single request mode...');
                  // window.googletag.pubads().enableSingleRequest();
                  
                  console.log('Collapsing empty divs...');
                  window.googletag.pubads().collapseEmptyDivs();
                  
                  console.log('Enabling services...');
                  window.googletag.enableServices();
                  
                  console.log('Displaying ad...');

                  window.googletag.display(divid);
                  setAdLoaded(true);
                  
                } catch (error) {
                  console.error('Error setting up Google Publisher Tag:', error);
                  setAdLoaded(false);
                }
              });
            } else {
              console.error('Google Publisher Tag library is not loaded.');
              setAdLoaded(false);
            }
          })
          .catch((error) => {
            console.error('Failed to load Google Publisher Tag script:', error);
            setAdLoaded(false);
          });
      }, []);
  
  if (!adLoaded) return null; //returning null if there is no ad

  return (
    <>
        <div
      className="overflow-x-hidden border-[0.5px] w-full border-brandprimary sm:rounded-[10px] md:rounded-[10px] mt-5"
      //id="videoContainer"
    >
      <div className="flex flex-col w-full py-[10px]">
        <div className="flex pb-2 flex-row justify-between items-center px-3">
          <p className="">Advertisement</p>
          <div className="flex flex-row items-center gap-2">
            <p className="text-gray-400">Sponsored</p>
            <Dropdown
              offset={[0, 10]}
              placement="bottom-start"
              btnClassName="flex justify-center items-center rounded-full hover:text-brandprimary cursor-pointer"
              button={<PostMoreOptionsIcon w={30} h={30} fill={"#A7A7A7"} />}
            />
          </div>
        </div>
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>
        <div id={divid} className="h-auto"></div>

        <div className="flex items-center justify-between pt-2 px-3">
          <div className="flex items-center gap-[10px] lg:gap-[19px] md:gap-[19px] xl:gap-[19px]">
            <LikeIcon />
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <button>
                <Image src={post_comment} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
              </button>
            </div>
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image src={post_stats} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
            </div>
            <button className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image src={reply_icon} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
            </button>
            <button className="">
              <RePostIcon />
            </button>
          </div>
          <div className="flex items-center lg:gap-[19px] md:gap-[19px] gap-[10px]">
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <MagicPenIcon />
            </div>
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image src={wallet_icon} alt="colombo" width={28} height={27} />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <Head>

        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>

      </Head>
   
    <div id={divid} >
   
    </div>  */}
   
    </>
  );
};

export default LargeAdComponent;
