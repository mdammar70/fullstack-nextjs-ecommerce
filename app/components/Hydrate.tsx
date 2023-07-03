"use client";

import { useThemeStore } from "@/store";
import { useState, useEffect, ReactNode } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore= useThemeStore()
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return <>{isHydrated ? <body data-theme={themeStore.mode}>{children}</body> : <body></body>}</>;
}
