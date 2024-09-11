"use client"
import SideAdComponent from "@/components/ads/SideAd"
import SideTopAdComponent from "@/components/ads/SideTopAd"
import BannerAdComponent from "@/components/feed/vibes/BannerAd"
export default function adsFinal(){
    return (

   

            
            <div>
                <BannerAdComponent/>
                <SideAdComponent/>
                <SideTopAdComponent/>
            </div>
 
    )
}