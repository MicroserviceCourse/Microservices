import { useState } from "react";
import UploadBox from "../components/ui/UploadBox";
import type { IdentityInfoProps } from "../types/shop.type";
import MediaLibraryModal from "../components/media/MediaLibraryModal";

const IdentityVerification = ({ onBack, onNext, formData, setFormData}: IdentityInfoProps) => {
  const [openBusinessLiense,setOpenBussinessLicense] = useState(false);
  const [openFront,setOpenFront] = useState(false);
  const [openBack,setOpenBack] = useState(false);
  return (
    <>
      <div className="px-8 pt-8">
        <h2 className="text-xl font-semibold text-gray-900">Identity Verification</h2>
        <p className="mt-1 text-sm text-gray-500">
          Verify your identity to ensure a secure selling environment.
        </p>
      </div>
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Document Type</label>
          <select
            value={formData.shopVerification?.documentType}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                shopVerification: {
                  ...prev.shopVerification,
                  documentType: e.target.value,
                },
              }));
            }}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="1">National ID Card</option>
            <option value="2">Passport</option>
            <option value="3">Driver License</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadBox
            label="Document Front"
            accept="image/*,application/pdf"
            hint="PNG, JPG or PDF (max. 5MB)"
           
            previewName={formData.shopVerification?.documentFront}
            onOpenLibrary={() => setOpenFront(true)}
          />

          <UploadBox
            label="Document Back"
            accept="image/*,application/pdf"
            hint="PNG, JPG or PDF (max. 5MB)"
           previewName={formData.shopVerification?.documentBack}
            onOpenLibrary={() => setOpenBack(true)}
          />
        </div>
        <UploadBox
          label="Business License (Optional)"
          accept="image/*,application/pdf,.doc,.docx"
          hint="JPG, PDF, or DOCX (max. 10MB)"
           previewName={formData?.shopVerification?.businessLicense}
        onOpenLibrary={() => setOpenBussinessLicense(true)}
          height="h-[180px]"
        />
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <strong>Why is this required?</strong>
          <p className="mt-1">
            To comply with financial regulations and protect the marketplace, we need to verify the
            identity of our sellers. Your documents are stored securely and used only for
            verification.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 px-8 py-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-gray-200 px-5 py-2.5
          text-sm text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-blue-600 px-6 py-2.5
          text-sm font-semibold text-white hover:bg-blue-700"
        >
          Next Step
        </button>
      </div>
      <MediaLibraryModal
        isOpen={openBusinessLiense}
        onClose={()=>setOpenBussinessLicense(false)}
        multiple={false}
        mediaType={[1, 3]}
        onSelect={(value) => {
          // MediaLibrary trả url
         const url = Array.isArray(value) ? value[0] : value;
         setFormData((prev)=>({
          ...prev,
          shopVerification:{
            ...prev.shopVerification,
            businessLicense:url
          }
         }))
        }}
      />
      <MediaLibraryModal
        isOpen={openBack}
        onClose={()=>setOpenBack(false)}
        multiple={false}
        mediaType={[1, 3]}
        onSelect={(value) => {
          // MediaLibrary trả url
         const url = Array.isArray(value) ? value[0] : value;
         setFormData((prev)=>({
          ...prev,
          shopVerification:{
            ...prev.shopVerification,
            documentBack:url
          }
         }))
        }}
      />
      <MediaLibraryModal
        isOpen={openFront}
        onClose={()=>setOpenFront(false)}
        multiple={false}
        mediaType={[1, 3]}
        onSelect={(value) => {
          // MediaLibrary trả url
         const url = Array.isArray(value) ? value[0] : value;
         setFormData((prev)=>({
          ...prev,
          shopVerification:{
            ...prev.shopVerification,
            documentFront:url
          }
         }))
        }}
      />
    </>
  );
};
export default IdentityVerification;
