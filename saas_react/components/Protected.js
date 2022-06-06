import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useStore from "./StateManagement";
import Spinner from "./Spinner";

function FullPageLoader() {


  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    showLoader && (
      <div className="flex min-h-screen flex-col items-center justify-center text-lightning-500">
        <Spinner className="mb-4 h-10 w-10 text-6xl" />
        <p className="text-gray-700">Loading...</p>
      </div>
    )
  );
}

function Protected({ children, adminOnly = false }) {
  const user = useStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {

    const timer = setTimeout(() => {
      if (!user) {
        console.log("user undefined, push to login");
        router.push({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      }
    }, 500);


    if (user && adminOnly && !user.claims?.admin) {
      console.log("user defined, admin false, push to login");

      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
    return () => clearTimeout(timer);
  }, [user, router, adminOnly]);


  if (!user) {
    return <FullPageLoader />;
  }

  return children;
}

export default Protected;
