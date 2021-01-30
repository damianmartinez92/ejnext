import { useEffect, useState } from "react";
import { onAuthStateChanged } from "../firebase/client";
import { useRouter } from "next/router";

export const USER_STATES = {
  NOT_LOGGER: null,
  NOT_KNOW: undefined,
};

export const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState(USER_STATES.NOT_KNOW);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGER && router.push("/");
  }, [user]);

  return user;
};
