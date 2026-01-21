import { useState } from "react";
import { MapPin } from "lucide-react";

export default function AddressInformation() {
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [lat, setLat] = useState("37.7749");
  const [lng, setLng] = useState("-122.4194");
  const [isDefault, setIsDefault] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 space-y-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Address Information</h1>
          <p className="text-slate-500 dark:text-slate-400">Step 2 of 4: Provide your shop's pickup and return location for logistics.</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6 space-y-6">
            {/* Full address */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter street name, house number, building/floor"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              >
                <option value="">Select Province</option>
                <option>San Francisco</option>
                <option>Los Angeles</option>
              </select>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              >
                <option value="">Select District</option>
                <option>Downtown</option>
                <option>Mission</option>
              </select>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              >
                <option value="">Select Ward</option>
                <option>Ward 1</option>
                <option>Ward 2</option>
              </select>
            </div>

            {/* Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Map Location</label>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                  <MapPin className="h-4 w-4" /> Detect my location
                </button>
              </div>
              <div className="relative h-[220px] w-full overflow-hidden rounded-xl border border-gray-200">
                <iframe
                  title="map"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`}
                  className="h-full w-full"
                />
                <button className="absolute bottom-3 right-3 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow">
                  Adjust Pin
                </button>
              </div>
            </div>

            {/* Lat Lng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
                placeholder="LAT"
              />
              <input
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
                placeholder="LNG"
              />
            </div>

            {/* Default toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Set as default address for pickup & returns</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <button className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Back</button>
            <button className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Next Step</button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <strong>Why do we need this?</strong>
          <p className="mt-1">Accurate address coordinates ensure that courier partners can find your shop quickly for package pickups and return deliveries.</p>
        </div>
      </div>
    </div>
  );
}
