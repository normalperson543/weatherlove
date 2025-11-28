"use client";

import { settings, saveSettings } from "@/lib/storage";
import FloatingMenuWrapper from "./floating-menu-wrapper";
import { Settings, Settings as SettingsType } from "@/lib/types";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SettingsMenu() {
  const [se, setSe] = useState<SettingsType>(settings() as Settings);
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
  function handleToggleColorScheme() {
    let seColor = se.colorScheme
    seColor++;
    if (seColor === 3) seColor = 0
    setSe({
      ...se,
      colorScheme: seColor,
    });
    
    saveSettings({
      ...se,
      colorScheme: seColor,
    });
    console.log("Written the settings")
    const sp = new URLSearchParams(searchParams);
    sp.set("cs", (seColor).toString());
    replace(`${pathname}?${sp.toString()}`);
    console.log("Replaced the pathname")
  }
  return (
    <FloatingMenuWrapper>
      <button className="w-full text-left" onClick={handleToggleUnits}>
        toggle units: {se.units === 0 ? "metric" : "imperial"}
      </button>
      <button className="w-full text-left" onClick={handleToggleColorScheme}>
        colors: {se.colorScheme === 0 && "auto"}{se.colorScheme === 1 && "light"}{se.colorScheme === 2 && "dark"}
      </button>
    </FloatingMenuWrapper>
  );
}
