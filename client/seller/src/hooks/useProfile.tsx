import { useEffect, useRef, useState } from "react";
import { profileAccount } from "../service/api/Authenticate";

const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await profileAccount();
        setProfile(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  return {
    profile,
    loading,
    error,
  };
};
export default useProfile;
