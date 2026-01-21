import { useMemo, useState } from "react";
import FileDropZone from "../components/ui/FileDropZone";
import { Camera, ChevronRight, ImageIcon } from "lucide-react";

const ShopRegistrationPage = () => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const logoUrl = useMemo(() => (logoFile ? URL.createObjectURL(logoFile) : ""), [logoFile]);

  const bannerUrl = useMemo(
    () => (bannerFile ? URL.createObjectURL(bannerFile) : ""),
    [bannerFile],
  );

  return (
    <div className="min-h-screen bg-gray-50 space-y-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Shop Registration</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Complete your shop basic information to start selling
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center  gap-3 px-6 pt-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
              1
            </div>
            <div className="text-lg font-semibold">Basic Information</div>
          </div>
          <div className="pb-6 pt-5">
            <div className="rounded-2xl ">
              <div className="p-6">
                <div className="grid grid-cols-1 gap-7 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <div className="text-sm font-semibold block text-slate-700 dark:text-slate-300 mb-2">
                      Shop Name
                    </div>
                    <div className="text-xs text-slate-500">
                      This will be your official store name.
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <input
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder="e.g. Urban Style Collective"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 
                     placeholder:text-gray-400 placeholder:font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Description</div>
                    <div className="text-xs text-slate-500">
                      Tell customers about your shop and what you sell.
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      placeholder="Describe your brand's mission and products..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white
                    px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400
                    placeholder:font-medium outline-none
                    focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Logo</div>
                    <div className="mt-1 text-xs text-gray-500">
                      Square image, recommended size 500×500px.
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <FileDropZone
                      title="Click to upload or drag and drop"
                      subTitle="PNG, JPG or WEBP (Max. 2MB)"
                      icon={<Camera className="h-5 w-5" />}
                      onFile={setLogoFile}
                      previewUrl={logoUrl}
                      heightClass="h-[260px] "
                    />
                  </div>
                  <div className="md:col-span-4">
                    <div className="text-sm font-semibold text-gray-800">Shop Banner</div>
                    <div className="mt-1 text-xs text-gray-500">
                      Horizontal banner for your shop profile page.
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <FileDropZone
                    title="Upload Banner Image"
                    subTitle="Recommended size 1200×400px"
                    icon={<ImageIcon className="h-5 w-5"/>}
                    onFile={setBannerFile}
                    previewUrl={bannerUrl}
                    heightClass="h-[240px] "
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                type="button"
                className="rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700
                hover:bg-gray-50"
                >
                  Save Draft
                </button>
                <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600
                px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Next: Address Info
                  <ChevronRight className="h-4 w-4"/>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopRegistrationPage;
