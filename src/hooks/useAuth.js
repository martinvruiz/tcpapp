import { useStore } from "@/store/useStore";
import { supabase } from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWorkHours } from "./useWorkHours";

export function useAuth() {
  const router = useRouter();
  const { fetchWorkHours } = useWorkHours();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setProfile = useStore((state) => state.setProfile);
  const setLoggedHours = useStore((state) => state.setLoggedHours);

  const signUp = async (email, password, name) => {
    setLoading(true);
    setError(null);

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }
      router.push("/profile");
      return { error, data };
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email, password) => {
    setLoading(true);
    setError(null);
    const { error, data: user } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setProfile(user);
      fetchWorkHours(user.id);
    }
    return {
      user,
      error: error?.message ?? null,
    };
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/");
  };

  const initializeProfile = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error("Error fetching user", error.message);
      return null;
    }
    console.log(user);

    const loggedHours = await fetchWorkHours(user.id);
    setLoggedHours(loggedHours);
    setProfile(user);
    return user;
  };

  return { signUp, logIn, logOut, initializeProfile, loading, error };
}
