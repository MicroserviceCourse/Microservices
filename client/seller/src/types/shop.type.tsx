export const SHOP_STEPS = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Address" },
  { id: 3, label: "Identity" },
  { id: 4, label: "Category" },
];
export interface BasicInfoProps {
  onNext?:()=>void;
  formData:shopForm,
  setFormData: React.Dispatch<React.SetStateAction<shopForm>>
}
export interface AddressInfoProps {
  onBack?:()=>void;
  onNext?:()=>void;
  formData:shopForm;
  setFormData: React.Dispatch<React.SetStateAction<shopForm>>;
}
export interface IdentityInfoProps {
  onBack?:()=>void;
  onNext?:()=>void;
  formData:shopForm;
  setFormData: React.Dispatch<React.SetStateAction<shopForm>>;
}
export interface ShopAddressForm {
  fullAddress:string;
  idProvince:string;
  idDistrict:string;
  idWard:string;
  lat:string;
  lng:string;
}
export interface shopVerification {
  documentType:string;
  documentFront:string;
  documentBack:string;
  businessLicense:string;
}
export interface shopSelectCategories{
   onBack?:()=>void;
  onSubmit?:()=>void;
  formData:shopForm;
  setFormData: React.Dispatch<React.SetStateAction<shopForm>>;
}
export interface shopForm {
  shopName:string;
  description:string;
  logoUrl:string;
  bannerUrl:string;

  addresses:ShopAddressForm ;
  categoryIds:string[];
  shopVerification:shopVerification;

}