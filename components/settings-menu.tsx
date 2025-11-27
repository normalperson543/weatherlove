"use client";

import { settings, saveSettings } from "@/lib/storage";
import FloatingMenuWrapper from "./floating-menu-wrapper";
import { Settings as SettingsType } from "@/lib/types";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SettingsMenu() {
  const [se, setSe] = useState<SettingsType>(settings());
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleToggleUnits() {
    console.log(se)
    console.log(se.units === 0 ? 1 : 0)
    setSe({
      ...se,
      units: se.units === 0 ? 1 : 0,
    });
    
    saveSettings({
      ...se,
      units: se.units === 0 ? 1 : 0,
    });
    console.log("Written the settings")
    const sp = new URLSearchParams(searchParams);
    sp.set("units", (se.units).toString());
    replace(`${pathname}?${sp.toString()}`);
    console.log("Replaced the pathname")
  }

  return (
    <FloatingMenuWrapper>
      <button className="w-full text-left" onClick={handleToggleUnits}>
        toggle units: {se.units === 0 ? "metric" : "imperial"}
      </button>
    </FloatingMenuWrapper>
  );
}
