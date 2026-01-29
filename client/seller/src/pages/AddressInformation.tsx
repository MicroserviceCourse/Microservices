import { useState } from "react";
import { MapPin } from "lucide-react";
import type { AddressInfoProps } from "../types/shop.type";

export default function AddressInformation({
  onBack,
  onNext,
  formData,
  setFormData,
}: AddressInfoProps) {

  return (
    <>
      {/* ===== HEADER STEP ===== */}
      <div className="px-8 pt-8">
        <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide your shop pickup & return location for logistics.
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="p-8 space-y-6">
        {/* Full address */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Full Address</label>
          <input
            value={formData.addresses?.fullAddress}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                addresses: {
                  ...prev.addresses,
                  fullAddress: e.target.value,
                },
              }));
            }}
            placeholder="Enter street name, house number, building/floor"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.addresses?.idProvince}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                addresses: {
                  ...prev.addresses,
                  idProvince: e.target.value,
                },
              }));
            }}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select Province</option>
            <option value="1">San Francisco</option>
            <option value="2">Los Angeles</option>
          </select>

          <select
            value={formData.addresses?.idDistrict}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                addresses: {
                  ...prev.addresses,
                  idDistrict: e.target.value,
                },
              }));
            }}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select District</option>
            <option value="1">Downtown</option>
            <option value="2">Mission</option>
          </select>

          <select
            value={formData.addresses?.idWard}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                addresses: {
                  ...prev.addresses,
                  idWard: e.target.value,
                },
              }));
            }}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select Ward</option>
            <option value="1">Ward 1</option>
            <option value="2">Ward 2</option>
          </select>
        </div>

        {/* Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Map Location</label>
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <MapPin className="h-4 w-4" />
              Detect my location
            </button>
          </div>

          <div className="relative h-[220px] w-full overflow-hidden rounded-xl border border-gray-200">
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${formData.addresses?.lat},${formData.addresses?.lng}&t=&z=lng}&z=13&output=embed`}
              className="h-full w-full"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 rounded-lg bg-blue-600
              px-3 py-1.5 text-xs font-medium text-white shadow"
            >
              Adjust Pin
            </button>
          </div>
        </div>

        {/* Lat / Lng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={formData.addresses?.lat}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                addresses: {
                  ...prev.addresses,
                  lat: e.target.value,
                },
              }));
            }}
            placeholder="LAT"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
          <input
            value={formData.addresses?.lng}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                addresses: {
                  ...prev.addresses,
                  lng: e.target.value,
                },
              }));
            }}
            placeholder="LNG"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

  

        {/* Info */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <strong>Why do we need this?</strong>
          <p className="mt-1">
            Accurate address coordinates ensure that courier partners can find your shop quickly for
            pickups and returns.
          </p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
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
    </>
  );
}
