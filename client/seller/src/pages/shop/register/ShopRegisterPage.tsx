import { useState } from "react";
import { SHOP_STEPS, type shopForm } from "../../../types/shop.type";
import BasicInfoShop from "../../BasicInfoShop";
import AddressInformation from "../../AddressInformation";
import IdentityVerification from "../../IdentityVerification";
import SelectBusinessCategories from "../../SelectBusinessCategories";
import { useAlert } from "../../../components/alert-context";
import { registerShop } from "../../../service/api/Shop";

const ShopRegisterPage = () => {
  const [step, setStep] = useState(1);
  const { showAlert } = useAlert();
  const [formData,setFormData] = useState<shopForm>({
    shopName:"",
    description:"",
    logoUrl:"",
    bannerUrl:"",
    addresses:{
      fullAddress:"",
      idProvince:"",
      idDistrict:"",
      idWard:"",
      lat:"",
      lng:""
    },
    shopVerification:{
      documentType:"",
      documentFront:"",
      documentBack:"",
      businessLicense:""
    },
    categoryIds:[]
  });
  const handleSubmit = async()=>{
    try{
      const response = await registerShop(formData);
      showAlert({
        title: response?.data?.message || "Shop registered successfully!",
        type: "success",
        autoClose: 3000,
      });
    }catch(err:any){
      showAlert({
        title: err?.response?.data?.message || "Failed to register shop.",
        type: "error",
        autoClose: 3000,
      });
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Shop Registration</h1>
          <p className="text-slate-500">Complete all steps to start selling</p>
        </div>
        <div className="flex items-center gap-4">
          {SHOP_STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl
                  text-sm font-medium ${
                    step === s.id
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-500"
                  }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
                  ${step === s.id ? "bg-white/20" : "bg-gray-100"}`}
              >
                {s.id}
              </span>
              {s.label}
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-white shadow-sm border border-gray-300">
          {step ===1 && <BasicInfoShop onNext={()=>setStep(2)}
                        formData={formData}
                        setFormData={setFormData}
            />}
            {step===2 && <AddressInformation
            formData={formData}
            setFormData={setFormData}
            onBack={()=>setStep(1)}
            onNext={()=>setStep(3)}/>}
            {step===3 && <IdentityVerification 
            onBack={()=>setStep(2)}
            onNext={()=>setStep(4)}
            formData={formData}
            setFormData={setFormData}
            />}
            {step===4 && <SelectBusinessCategories
            onBack={()=>setStep(3)}
            onSubmit={()=>handleSubmit()}
              formData={formData}
            setFormData={setFormData}
            />}
        </div>
      </div>
    </div>
  );
};
export default ShopRegisterPage;
