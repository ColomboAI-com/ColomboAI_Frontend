'use client'
import Navigation from "@/components/profile/Navigation"
import VisitProfile from "@/components/profile/VisitProfile"
import { UserProfileContext } from "@/context/UserProfileContext";
import { useContext, useEffect } from "react";

const UserName = ({ params }) => {

  const { getUserDetails, resetFeedValues, userDetails, loadings } = useContext(UserProfileContext);

  useEffect(() => {
    getUserDetails(params?.username)
    return () => resetFeedValues()
  }, [params]);

  return (
    <div className=" max-w-5xl mx-auto font-sans">
      <VisitProfile userData={userDetails} />
      <Navigation />
    </div>
  )
}

export default UserName