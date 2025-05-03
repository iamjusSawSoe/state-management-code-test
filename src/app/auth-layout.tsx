"use client";
import { setUsername } from "@/lib/redux/features/loginSlice";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.login.username);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername && !username) {
        dispatch(setUsername(savedUsername));
      }
      if (!savedUsername && !username) {
        router.push("/login");
      }
    }
  }, [hasMounted, username, dispatch, router]);

  if (!hasMounted) {
    return null;
  }

  return username ? children : null;
}
