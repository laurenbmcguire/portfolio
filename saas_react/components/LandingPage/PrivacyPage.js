import Footer from "./Footer";
import ExportedImage from "next-image-export-optimizer";

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="mx-auto">
          <div className="relative h-52 w-full">
            <ExportedImage
              src={"images/johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg"}
              alt="Lightning Image"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        </div>
        <main>
          <div className="relative mt-4 px-4 py-8 pb-52 sm:mt-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-lg ">

            </div>
            <div className="prose-cerulean prose prose-lg mx-auto mt-6 text-gray-500">

            </div>
          </div>
          <div className="fixed bottom-0 w-full">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivacyPage;
