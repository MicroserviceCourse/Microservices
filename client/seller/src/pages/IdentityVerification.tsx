import { useState } from "react";
import UploadBox from "../components/ui/UploadBox";

const IdentityVerification = () => {
  const [docType, setDocType] = useState("National ID Card");
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [license, setLicense] = useState<File | null>(null);
  return (
    <div className="min-h-screen bg-gray-50 space-y-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Identity Verification
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Step 3 of 4: Verify your identity to ensure a secure selling environment.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Document Type</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>National ID Card</option>
                <option>Passport</option>
                <option>Driver License</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox
                label="Document Front"
                accept="image/*,application/pdf"
                hint="PNG, JPG or PDF (max. 5MB)"
                onFile={setFront}
                previewName={front?.name}
              />
              <UploadBox
                label="Document Back"
                accept="image/*,application/pdf"
                hint="PNG, JPG or PDF (max. 5MB)"
                onFile={setBack}
                previewName={back?.name}
              />
            </div>
            <UploadBox
              label="Business License (Optional)"
              accept="image/*,application/pdf,.doc,.docx"
              hint="JPG, PDF, or DOCX (max. 10MB)"
              onFile={setLicense}
              previewName={license?.name}
              height="h-[180px]"
            />
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <button className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
              Back
            </button>
            <button className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              Next Step
            </button>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <strong>Why is this required?</strong>
          <p className="mt-1">
            To comply with financial regulations and protect the marketplace, we need to verify the
            identity of our sellers. Your documents are stored securely with end-to-end encryption
            and are only used for verification purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
export default IdentityVerification;
