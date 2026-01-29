import {  useState } from "react";
import FileDropZone from "../components/ui/FileDropZone";
import {  ChevronRight, ImageIcon } from "lucide-react";
import type { BasicInfoProps } from "../types/shop.type";
import MediaLibraryModal from "../components/media/MediaLibraryModal";

const BasicInfoShop = ({ onNext, formData, setFormData }: BasicInfoProps) => {
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [openBannerModal, setOpenBannerModal] = useState(false);


  return (
    <>
      <div className="flex items-center gap-3 px-6 pt-6">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600
        text-white text-sm  font-semibold"
        >
          1
        </div>
        <div className="text-lg font-semibold">Basic Information</div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-sm font-semibold text-slate-700 mb-2">Shop Name</div>
            <div className="text-xs text-slate-500">This will be your official store name.</div>
          </div>
          <div className="md:col-span-8">
            <input
              value={formData.shopName}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  shopName: e.target.value,
                }));
              }}
              placeholder="e.g. Urban Style Collective"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
              outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              rows={5}
              placeholder="Describe your brand's mission and products..."
              className="w-full resize-none rounded-xl border border-gray-200
              px-4 py-3 text-sm outline-none
              focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="text-sm font-semibold text-gray-900 mb-2">Logo</div>
            <div className="text-xs text-gray-500">Square image, recommended size 500×500px.</div>
          </div>
          <div className="md:col-span-8">
            <FileDropZone
              title="Click to upload or drag and drop"
              subTitle="PNG, JPG or WEBP (Max. 2MB)"
              hint="Recommended size 1200x630"
              icon={<ImageIcon />}
              previewUrl={formData.logoUrl}
              onPick={() => setOpenLogoModal(true)}
            />
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="text-sm font-semibold text-gray-800">Shop Banner</div>
            <div className="mt-1 text-xs text-gray-500">
              Horizontal banner for your shop profile page.
            </div>
          </div>
          <div className="md:col-span-8">
            <FileDropZone
              title="Upload Banner Image"
              subTitle="Recommended size 1200×400px"
              icon={<ImageIcon className="h-5 w-5" />}
              previewUrl={formData.bannerUrl}
              onPick={() => setOpenBannerModal(true)}
              aspectClass="aspect-[16/9]"
              heightClass="h-[240px]"
            />
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-end gap-3 border-t border-gray-200
      px-6 py-4"
      >
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600
          px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Next: Address Info
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <MediaLibraryModal
        isOpen={openLogoModal}
        mediaType={1}
        multiple={false}
        onClose={() => setOpenLogoModal(false)}
        onSelect={(value) => {
          const url = Array.isArray(value) ? value[0] : value;
          setFormData((prev) => ({ ...prev, logoUrl: url }));
        }}
      />
      <MediaLibraryModal
        isOpen={openBannerModal}
        mediaType={1}
        multiple={false}
        onClose={() => setOpenBannerModal(false)}
        onSelect={(value) => {
          const url = Array.isArray(value) ? value[0] : value;
          setFormData((prev) => ({ ...prev, bannerUrl: url }));
        }}
      />
    </>
  );
};
export default BasicInfoShop;
