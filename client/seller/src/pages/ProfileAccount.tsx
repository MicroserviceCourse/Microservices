import {
  MdAccountCircle,
  MdEdit,
  MdInventory2,
  MdLocationOn,
  MdMail,
  MdPhone,
  MdPublic,
  MdSettingsApplications,
  MdStorefront,
  MdWorkspacePremium,
} from "react-icons/md";
import { ProfileBadge, ProfileSkeleton } from "../components/ui";
import { Verified } from "lucide-react";
import useProfile from "../hooks/useProfile";

const ProfileAccount = () => {
  const { profile, loading: profileLoading } = useProfile();

  return (
    <main className="flex-grow flex flex-col items-center px-10 py-4">
      <div className="max-w-[1200px] w-full flex flex-col gap-8">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white font-bold text-xl">
            PT
          </div>

          {/* Greeting */}
          <div className="flex flex-col">
            <span className="text-slate-500 text-sm font-medium">Xin chào,</span>
            <h1 className="text-2xl font-semibold text-slate-900">Phong Trần Nguyễn Thanh</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {profileLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="flex flex-col">
              <div
                className="relative flex flex-col items-stretch justify-start rounded-2xl
    shadow-sm bg-white border border-gray-200 overflow-hidden h-full"
              >
                {/* Banner */}
                <div
                  className="w-full h-40 bg-center bg-no-repeat bg-cover opacity-90"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #0061FF 0%, #00c6ff 100%)",
                  }}
                />

                {/* Avatar / Icon user */}
                <div
                  className="absolute top-28  left-8 w-24 h-24 rounded-full
      bg-blue-50 border-4 border-white shadow-md
      flex items-center justify-center text-[#0061FF]"
                >
                  <MdAccountCircle size={56} />
                </div>

                {/* Content */}
                <div className="p-8 pt-16">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ProfileBadge
                          variant="info"
                          icon={<MdWorkspacePremium className="text-[14px]" />}
                        >
                          Gold Member
                        </ProfileBadge>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900">{profile?.fullName}</h3>
                      <p className="text-slate-500 text-sm font-medium">Personal Account</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 py-6 border-y border-gray-100">
                      <div className="flex items-center gap-3 text-sm font-medium">
                        <MdMail className="text-[#0061FF] text-lg" />
                        <span className="text-slate-600">{profile?.email}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm font-medium">
                        <MdPhone className="text-[#0061FF] text-lg" />
                        <span className="text-slate-600">{profile?.phone}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm font-medium">
                        <MdLocationOn className="text-[#0061FF] text-lg" />
                        <span className="text-slate-600">New York, USA</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="flex min-w-[140px] items-center justify-center rounded-xl h-11 px-6 bg-[#0061FF] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                        <MdEdit className="text-lg mr-2" />
                        Edit Personal Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div
              className="flex flex-col items-stretch justify-start rounded-2xl
                shadow-sm bg-white border border-gray-200 overflow-hidden h-full"
            >
              <div
                className="w-full h-40 bg-center bg-no-repeat bg-cover opacity-90"
                style={{
                  backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #0061FF 100%)",
                }}
              />
              <div className="p-8 relative">
                <div
                  className="absolute -top-12 left-8 size-24 rounded-2xl border-4 border-white bg-white shadow-md bg-center bg-cover"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDY4CI9qC1kP4E4kD3if_5tkG88gLJU0oGhrZWfWZJdFdo77VxfrOzuHMDE06MNaMkOoBIk1xJiZwR9vx4GIGO8wD6kJ2tD5ced_mgPsDFfWoHcevYoC83yIx_tSUVxK_XE8EiQKyscuG__2HPtaWBA7tlMrk7Ta7CuKHqRsJyz5M477Q1V3BaIaLmmrWX5mwffdpXQreJPDmsWer0XVE8jJhfDw0gfq2RgCkGlbu6cxsS8GvDa_vmdZ2bFD4tpu4ltU8sbzN28NTBM")',
                  }}
                />
                <div className="mt-14 flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ProfileBadge variant="success" icon={<Verified className="text-[14px]" />}>
                          Verified Seller
                        </ProfileBadge>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">A-IN Store</h3>
                      <p className="text-slate-500 text-sm font-medium">Shop Profile</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">
                        Shop Code
                      </p>
                      <p className="text-sm font-mono font-bold text-[#0061FF]">TH-8829</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 py-6 border-y border-gray-100">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <MdStorefront className="text-[#0061FF] text-lg" />
                      <span className="text-slate-600">Consumer Electronics &amp; Tech</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <MdPublic className="text-[#0061FF] text-lg" />
                      <span className="text-slate-600">Region: North America</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <MdInventory2 className="text-[#0051FF] text-lg" />
                      <span className="text-slate-600">142 Active Listings</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <button
                      className="flex min-w-[140px] items-center justify-center
                    rounded-xl h-11 px-6 bg-[#0061FF] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      <MdSettingsApplications className="text-lg mr-2" />
                      Manage Shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProfileAccount;
