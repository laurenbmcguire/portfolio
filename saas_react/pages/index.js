import dynamic from "next/dynamic";
import { useEffect, useState } from "react";




const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});
import LandingPage from "../components/LandingPage/LandingPage";

export default function Root() {
  const [loadChat, setLoadChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadChat(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <LandingPage />
      {loadChat && <Chat />}
    </>
  );

}

