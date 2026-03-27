import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Ep1A1IdleUnpublished from "../imports/Ep1A1IdleUnpublished27032026";
import Ep2A0BuilderIdle from "../imports/Ep2A0BuilderIdle27032026";
import Ep2A1BuilderIdle from "../imports/Ep2A1BuilderIdle27032026-12-7595";
import imgTickCircle1 from "figma:asset/8cf296bf74614c858428f86251dfb11b79463484.png";

// ── Asset imports ─────────────────────────────────────────────────────────────
import imgDivModelThumb from "figma:asset/473705755cbefac765d9e4876685988cb8e4b1ed.png";
import imgArrowCircle3151 from "figma:asset/5ec09b9c5174d8e4e4adde0fa84dc36ff01a6ee2.png";
import imgCrossWhite1 from "figma:asset/a6bb900af763896828bb77eb2394f258df695735.png";
import imgYusukeKamiyamaneFuguePlus161 from "figma:asset/b8f052ae1908c8eb8c1c9784a156079ddc75f644.png";
import imgDriveUpload1 from "figma:asset/18113d53ece71d5a7c863164839f5a0437047457.png";
import imgExternal1 from "figma:asset/fc7af571ce493c22fc509234b81763d376d085f6.png";
import imgTick1 from "figma:asset/97e2fac5e5ecd3905b19d3c7d8316079e9f047ee.png";
import imgChevronCollapsed from "figma:asset/4a9c72fa2e7298897e7d0010d288987e25d43d1a.png";
import imgChevronExpanded from "figma:asset/1d44bc3ceed34f96b203588d42bb7fe30d04784a.png";
import imgExclamation2 from "figma:asset/dea9c03e7c09878da61d7db52a94bb21a33799db.png";
import imgExclamation from "figma:asset/exclamation.png";
import imgExclamationRed from "figma:asset/exclamation-red.png";
import imgExclamationRedFrame from "figma:asset/exclamation-red-frame.png";
import imgTick from "figma:asset/tick.png";

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_CHANNELS = ["Auto24", "Mobile.de", "SS.lv", "Autoplius", "City24"];
const BMW_ID = "bmw-320d";
// For BMW: these channels fail; Auto24 + SS.lv succeed; Autoplius stays unpublished
const BMW_FAIL_CHANNELS = ["Mobile.de", "City24"];
const BMW_SUCCEED_CHANNELS = ["Auto24", "SS.lv"];

// Batch validation: carId → channels where fields are missing
const MISSING_COMBOS: Record<string, string[]> = {
  "toyota-rav4": ["Mobile.de"],
  "audi-a4":     ["Mobile.de"],
};

const CARS = [
  { id: "vw-golf",       name: "Volkswagen Golf 1.6 TDI", year: "2019", reg: "ABC-123",  price: "€14,500", mileage: "78,200 km",  fuel: "Diesel",  make: "Volkswagen", model: "Golf 1.6 TDI"   },
  { id: "toyota-rav4",   name: "Toyota RAV4 2.0 CVT",      year: "2021", reg: "TYT-456",  price: "€24,800", mileage: "32,100 km",  fuel: "Petrol",  make: "Toyota",     model: "RAV4 2.0 CVT"   },
  { id: BMW_ID,          name: "BMW 320d xDrive",           year: "2020", reg: "BMW-789",  price: "€28,500", mileage: "45,600 km",  fuel: "Diesel",  make: "BMW",        model: "320d xDrive"    },
  { id: "audi-a4",       name: "Audi A4 2.0 TFSI",          year: "2018", reg: "AUD-321",  price: "€22,900", mileage: "87,300 km",  fuel: "Petrol",  make: "Audi",       model: "A4 2.0 TFSI"    },
  { id: "skoda-octavia", name: "Skoda Octavia 1.5 TSI",     year: "2022", reg: "SKO-222",  price: "€19,900", mileage: "18,500 km",  fuel: "Petrol",  make: "Skoda",      model: "Octavia 1.5 TSI" },
];

// ── Batch result routing ───────────────────────────────────────────────────────
// B7: VW Golf + Audi A4 + Skoda Octavia (first + last two)
// B6: BMW in selection + at least one of its fail channels selected
function getBatchResult(selIds: string[], _selChannels: string[]): "success" | "partial_errors" | "all_failed" {
  const s = new Set(selIds);
  if (selIds.length === 3 && ["vw-golf","audi-a4","skoda-octavia"].every(id => s.has(id))) return "all_failed";
  if (selIds.length === 3 && ["bmw-320d","audi-a4","skoda-octavia"].every(id => s.has(id))) return "partial_errors";
  return "success";
}

// ── Dot backgrounds (copied verbatim pattern from Figma source) ───────────────
// DOT colors use CSS url() with escaped single quotes inside (CSS escape \'). 
// We must use the exact same escaping the Figma code uses: \\\' in a double-quoted JS string → \' in the CSS value.
const DOT_GRAY   = "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(200,220,232,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(138,171,189,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')";
const DOT_YELLOW = "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(245,192,96,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(211,156,64,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(176,120,32,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')";
const DOT_GREEN  = "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(92,212,122,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(61,167,90,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(29,122,58,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')";
const DOT_RED    = "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(240,112,112,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(208,80,80,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(176,48,48,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')";

// ── Types ─────────────────────────────────────────────────────────────────────
type PublishState = "unpublished" | "progress" | "published" | "partial_error";

interface CarState {
  channels: string[];
  publishState: PublishState;
  publishedChannels: string[];
  failedChannels: string[];
}

const DEFAULT_CAR_STATE: CarState = {
  channels: [],
  publishState: "unpublished",
  publishedChannels: [],
  failedChannels: [],
};

// channel completeness metadata
// warn:true → orange bar (#e8a830 → #b07820); else → green bar (#3db85e → #2d8a4e)
const CH_META: Record<string, { pct: number; warn: boolean }> = {
  "Auto24":    { pct: 96,  warn: false },
  "Mobile.de": { pct: 74,  warn: true  },
  "SS.lv":     { pct: 91,  warn: false },
  "Autoplius": { pct: 88,  warn: true  },
  "City24":    { pct: 74,  warn: true  },
};

// ── Shared primitives ─────────────────────────────────────────────────────────
function ChDot({ bg }: { bg: string }) {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" style={{ backgroundImage: bg }}>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[4.5px]" />
        </div>
      </div>
    </div>
  );
}

// Button label wrapper — matches the Figma div+p pattern so text is always visible
function BtnLabel({ text, color = "#2a4a60", shadow = "0px_1px_0px_rgba(255,255,255,0.5)" }: { text: string; color?: string; shadow?: string }) {
  return (
    <div className={`flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center whitespace-nowrap`}
      style={{ color, textShadow: shadow.replace(/_/g, " ") }}>
      <p className="leading-[15.4px]">{text}</p>
    </div>
  );
}

function BtnIcon({ src }: { src: string }) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={src} />
    </div>
  );
}

// Completeness bar: orange when warn, green otherwise
function CompletenessRow({ pct, warn }: { pct: number; warn?: boolean }) {
  const from = warn ? "#e8a830" : "#3db85e";
  const to   = warn ? "#b07820" : "#2d8a4e";
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center py-[3px] relative shrink-0 w-full">
      <div className="bg-[#c8dce8] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[3px]">
        <div className="absolute rounded-[3px]" style={{ background: `linear-gradient(to right, ${from}, ${to})`, inset: `0 ${100 - pct}% 0 0` }} />
      </div>
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap min-w-[24px]">
        <p className="leading-[normal]">{pct}%</p>
      </div>
      {warn && (
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b07820] text-[10px] whitespace-nowrap">
          <p className="leading-[normal]">⚠</p>
        </div>
      )}
    </div>
  );
}

// ── Button components ─────────────────────────────────────────────────────────
function AddChannelsBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[11px] py-[3px] relative rounded-[3px] shrink-0 cursor-pointer">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
      <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <BtnIcon src={imgYusukeKamiyamaneFuguePlus161} />
      <BtnLabel text="Add channels" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </button>
  );
}

function PublishToChannelsBtn({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`content-stretch flex gap-[4px] h-[24px] items-center px-[11px] py-[3px] relative rounded-[3px] shrink-0 w-[143px] ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
      <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <BtnIcon src={imgDriveUpload1} />
      <BtnLabel text="Publish to channels" color="#ffffff" shadow="0px_1px_1px_rgba(0,0,0,0.2)" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </button>
  );
}

// ── Sub-tabs row (modal) ──────────────────────────────────────────────────────
function ModalSubTabs() {
  const tabs = ["Extras", "Trade-In", "Financing", "Notes", "Agreement"];
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="bg-gradient-to-b from-[#5fcee5] h-[32px] relative rounded-[4px] shrink-0 to-[#50c2d6] w-full">
          <div className="content-stretch flex items-start px-[8px] relative size-full">
            {tabs.map((t) => (
              <div key={t} className="h-full relative shrink-0">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
                <div className="content-stretch flex h-full items-center px-[14.667px] relative">
                  <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
                    <p className="leading-[normal]">{t}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-b from-[#e9edf1] h-full relative shrink-0 to-white">
              <div aria-hidden="true" className="absolute border-[#4a9ec4] border-solid border-t-[0.667px] inset-0 pointer-events-none" />
              <div className="content-stretch flex gap-[4px] h-full items-center pt-[0.667px] px-[14px] relative">
                <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11.5px] whitespace-nowrap">
                  <p className="leading-[normal]">Publishing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Car specs sidebar ─────────────────────────────────────────────────────────
function CarSpecsPanel({ car }: { car: (typeof CARS)[0] }) {
  const specs = [
    { label: "Make",    value: car.make,    bold: true  },
    { label: "Model",   value: car.model,   bold: false },
    { label: "Year",    value: car.year,    bold: false },
    { label: "Mileage", value: car.mileage, bold: false },
    { label: "Fuel",    value: car.fuel,    bold: false },
    { label: "Price",   value: car.price,   bold: true  },
  ];
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative self-start shrink-0 w-[200px]">
      <div className="h-[152px] relative rounded-[3px] shrink-0 w-full">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[3px] size-full" src={imgDivModelThumb} />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        {specs.map((s) => (
          <div key={s.label} className="content-stretch flex items-start justify-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start pb-[4px] pt-[3px] relative shrink-0 w-[90px]">
              <div aria-hidden="true" className="absolute border-[#eef2f5] border-b border-solid inset-0 pointer-events-none" />
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
                <p className="leading-[normal]">{s.label}</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start pb-[4px] pt-[3px] relative shrink-0 w-[110px]">
              <div aria-hidden="true" className="absolute border-[#eef2f5] border-b border-solid inset-0 pointer-events-none" />
              <div className={`flex flex-col font-['Segoe_UI:${s.bold ? "Bold" : "Regular"}',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11px] whitespace-nowrap`}>
                <p className="leading-[normal]">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Panel header ──────────────────────────────────────────────────────────────
function PanelHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative shrink-0 to-[#ddeef7] w-full">
      <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[9px] pt-[8px] px-[10px] relative size-full">
          <div className="content-stretch flex items-center justify-between relative w-full">
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[12px] whitespace-nowrap">
              <p className="leading-[normal]">{title}</p>
            </div>
            {children && (
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modal footer ──────────────────────────────────────────────────────────────
function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start pb-[8px] px-[8px] relative w-full">
        <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
          <div className="flex flex-row items-center justify-end size-full">
            <div className="content-stretch flex gap-[6px] items-center justify-end p-[8px] relative size-full">
              <button onClick={onClose} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                  <BtnIcon src={imgCrossWhite1} />
                  <BtnLabel text="Close" />
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Error detail box ──────────────────────────────────────────────────────────
function ErrorDetailBox({ onBack, onGoToBuilder }: { onBack?: () => void; onGoToBuilder?: () => void }) {
  return (
    <div className="bg-[#f5f9fc] col-2 justify-self-stretch relative rounded-[3px] mb-[8px]">
      <div aria-hidden="true" className="absolute border border-[#e0a0a0] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[9px] relative w-full">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#801010] text-[11.5px]">
          <p className="leading-[normal]">Publishing failed</p>
        </div>
        <div className="content-stretch flex flex-col items-start relative w-full">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a03030] text-[11px]">
            <p className="leading-[normal]">Missing required fields:</p>
          </div>
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a03030] text-[11px]">
            <p className="leading-[normal]">· Mileage (km)</p>
          </div>
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a03030] text-[11px]">
            <p className="leading-[normal]">· Fuel type</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[5px] items-start pt-[2px] relative w-full">
          {/* ← Back */}
          <button onClick={onBack} className="content-stretch flex items-center justify-center pb-[5.39px] pt-[3px] px-[11px] relative rounded-[3px] shrink-0 cursor-pointer">
            <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
            <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
              <p className="leading-[15.4px]">← Back</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
          </button>
          {/* Go to Vehicle Builder */}
          <button onClick={onGoToBuilder} className="content-stretch flex h-[24px] items-center justify-center pb-[5px] pt-[3px] px-[8px] relative rounded-[3px] shrink-0 cursor-pointer">
            <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
            <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-white text-[10.5px] text-center text-shadow-[0px_1px_1px_rgba(0,0,0,0.2)] whitespace-nowrap">
              <p className="leading-[14.7px]">Go to Vehicle Builder →</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
          </button>
          {/* Retry channel */}
          <button className="content-stretch flex h-[24px] items-center justify-center pb-[5px] pt-[3px] px-[8px] relative rounded-[3px] shrink-0 cursor-pointer">
            <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
            <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[10.5px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
              <p className="leading-[14.7px]">Retry channel</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Publishing panels ─────────────────────────────────────────────────────────
function EmptyPublishPanel({ onAddChannels }: { onAddChannels: () => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <PanelHeader title="Not published">
          <AddChannelsBtn onClick={onAddChannels} />
          <PublishToChannelsBtn disabled />
        </PanelHeader>
        <div className="content-stretch flex flex-col gap-[4px] items-center px-[10px] py-[40px] relative w-full">
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] text-center w-full">
            <p className="leading-[normal]">No channels</p>
          </div>
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] text-center w-full">
            <p className="leading-[normal]">Add channels first.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WithChannelsPanel({ channels, onAddChannels, onPublish }: { channels: string[]; onAddChannels: () => void; onPublish: () => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <PanelHeader title="Not published">
          <AddChannelsBtn onClick={onAddChannels} />
          <PublishToChannelsBtn onClick={onPublish} />
        </PanelHeader>
        <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
          {channels.map((ch) => {
            const m = CH_META[ch] ?? { pct: 90, warn: false };
            return (
              <div key={ch} className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] pb-[9px] pt-[12px] relative shrink-0 w-full border-b border-[#dce8f0]">
                <ChDot bg={DOT_GRAY} />
                <div className="col-2 content-stretch flex flex-col items-start relative w-full">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
                    <p className="leading-[normal]">{ch}</p>
                  </div>
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full">
                    <p className="leading-[normal]">Not published</p>
                  </div>
                  <CompletenessRow pct={m.pct} warn={m.warn} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProgressPanel({ channels, progressStep }: { channels: string[]; progressStep: number }) {
  const done = progressStep;
  const sending = progressStep < channels.length ? channels[progressStep] : null;
  const overallPct = Math.round((progressStep / channels.length) * 100);
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch">
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative shrink-0 to-[#ddeef7] w-full">
          <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-center justify-between pb-[9px] pt-[8px] px-[10px] relative size-full">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]" style={{ animation: "spin 1.5s linear infinite" }}>
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgArrowCircle3151} />
              </div>
              <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[12px] whitespace-nowrap">
                <p className="leading-[normal]">Publishing… ({done}/{channels.length})</p>
              </div>
            </div>
            <div className="opacity-50 content-stretch flex items-center justify-center pb-[5px] pt-[3px] px-[11px] relative rounded-[3px]">
              <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
              <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px]" />
              <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] whitespace-nowrap">
                <p className="leading-[15.4px]">Please wait…</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] pt-[8px] relative w-full">
          <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full">
            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
              <p className="leading-[normal]">{done * 2} of {channels.length * 2} operations</p>
            </div>
            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
              <p className="leading-[normal]">{overallPct}%</p>
            </div>
          </div>
          <div className="bg-[#c8dce8] h-[16px] relative rounded-[8px] shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
              <div className="bg-gradient-to-r flex-[1_0_0] from-[#5bbde0] min-h-px relative rounded-[8px] to-[#3a9ec8]" style={{ width: `${overallPct}%`, transition: "width 0.8s ease" }} />
            </div>
            <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
          {channels.map((ch, i) => {
            const isDone = i < done;
            const isSending = ch === sending;
            const m = CH_META[ch] ?? { pct: 90, warn: false };
            let dotBg = DOT_GRAY, barPct = 0, warn = false, status = "Waiting…";
            let barFrom = "#c8dce8", barTo = "#c8dce8";
            if (isDone) {
              dotBg = DOT_GRAY; barFrom = "#3db85e"; barTo = "#2d8a4e"; barPct = m.pct; status = "Not published";
            } else if (isSending) {
              dotBg = DOT_YELLOW; barFrom = "#e8a830"; barTo = "#b07820"; barPct = Math.round(m.pct * 0.75); warn = m.warn; status = "⟳ Sending…";
            }
            return (
              <div key={ch} className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] pb-[9px] pt-[12px] relative shrink-0 w-full border-b border-[#dce8f0]">
                <ChDot bg={dotBg} />
                <div className="col-2 content-stretch flex flex-col items-start relative w-full">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full"><p className="leading-[normal]">{ch}</p></div>
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full"><p className="leading-[normal]">{status}</p></div>
                  <div className="content-stretch flex gap-[6px] h-[20px] items-center py-[3px] relative shrink-0 w-full">
                    <div className="bg-[#c8dce8] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[3px]">
                      <div className="absolute rounded-[3px]" style={{ background: `linear-gradient(to right, ${barFrom}, ${barTo})`, inset: `0 ${100 - barPct}% 0 0`, transition: "inset 0.8s ease" }} />
                    </div>
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap min-w-[24px]"><p className="leading-[normal]">{barPct}%</p></div>
                    {warn && <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#b07820] text-[10px] whitespace-nowrap"><p className="leading-[normal]">⚠</p></div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PublishedPanel({ channels, onAddChannels }: { channels: string[]; onAddChannels: () => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch">
      <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <PanelHeader title="Active channels">
          <AddChannelsBtn onClick={onAddChannels} />
          <button className="content-stretch flex h-[24px] items-center justify-center pb-[5px] pt-[3px] px-[11px] relative rounded-[3px] shrink-0 cursor-pointer">
            <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
            <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b03030] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
              <p className="leading-[15.4px]">Unpublish…</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
          </button>
        </PanelHeader>
        <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
          {channels.map((ch) => (
            <div key={ch} className="content-stretch flex flex-col items-start relative shrink-0 w-full border-b border-[#dce8f0]">
              <div className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] pb-[8px] pt-[12px] relative shrink-0 w-full">
                <ChDot bg={DOT_GREEN} />
                <div className="col-2 content-stretch flex flex-col items-start relative w-full">
                  <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full">
                    <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                    <div className="relative shrink-0 size-[16px]"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgExternal1} /></div>
                  </div>
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d8a4e] text-[10.5px] pb-px w-full"><p className="leading-[normal]">● Published · Today, 14:32</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Partial error panel: published + failed + unpublished (leftover)
function PartialErrorPanel({
  publishedChannels, failedChannels, leftoverChannels,
  expandedErrors, onToggleError, onAddChannels, onPublish, onGoToBuilder,
}: {
  publishedChannels: string[]; failedChannels: string[]; leftoverChannels: string[];
  expandedErrors: string[]; onToggleError: (ch: string) => void;
  onAddChannels: () => void; onPublish: () => void; onGoToBuilder?: () => void;
}) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch gap-[10px]">
      {/* Active channels */}
      {publishedChannels.length > 0 && (
        <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] shrink-0 w-full">
          <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
          <PanelHeader title="Active channels">
            <button className="content-stretch flex h-[24px] items-center justify-center pb-[5px] pt-[3px] px-[11px] relative rounded-[3px] shrink-0 cursor-pointer">
              <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
              <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
              <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b03030] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap"><p className="leading-[15.4px]">Unpublish…</p></div>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
            </button>
          </PanelHeader>
          <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
            {publishedChannels.map((ch) => (
              <div key={ch} className="content-stretch flex flex-col items-start relative shrink-0 w-full border-b border-[#dce8f0]">
                <div className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] pb-[8px] pt-[12px] relative shrink-0 w-full">
                  <ChDot bg={DOT_GREEN} />
                  <div className="col-2 content-stretch flex flex-col items-start relative w-full">
                    <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                      <div className="relative shrink-0 size-[16px]"><img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgExternal1} /></div>
                    </div>
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d8a4e] text-[10.5px] pb-px w-full"><p className="leading-[normal]">● Published · 2 days ago</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Not published (failed + leftover) */}
      {(failedChannels.length > 0 || leftoverChannels.length > 0) && (
        <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] shrink-0 w-full">
          <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
          <PanelHeader title="Not published">
            <AddChannelsBtn onClick={onAddChannels} />
            <PublishToChannelsBtn onClick={onPublish} />
          </PanelHeader>
          <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
            {/* Failed channels */}
            {failedChannels.map((ch) => {
              const m = CH_META[ch] ?? { pct: 74, warn: true };
              const isExpanded = expandedErrors.includes(ch);
              return (
                <div key={ch} className="content-stretch flex flex-col items-start relative shrink-0 w-full border-b border-[#dce8f0] last:border-b-0">
                  <div className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] pb-[8px] pt-[12px] relative shrink-0 w-full">
                    <ChDot bg={DOT_RED} />
                    <div className="col-2 content-stretch flex flex-col items-start relative w-full">
                      <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full">
                        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                        <button onClick={() => onToggleError(ch)} className="relative shrink-0 size-[16px] cursor-pointer">
                          <img alt={isExpanded ? "collapse" : "expand"} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={isExpanded ? imgChevronExpanded : imgChevronCollapsed} />
                        </button>
                      </div>
                      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b03030] text-[10.5px] pb-px w-full"><p className="leading-[normal]">✕ Publishing failed</p></div>
                      <CompletenessRow pct={m.pct} warn={m.warn} />
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] relative w-full">
                      <div />
                      <ErrorDetailBox onBack={() => onToggleError(ch)} onGoToBuilder={onGoToBuilder} />
                    </div>
                  )}
                </div>
              );
            })}
            {/* Leftover channels (not published, no error) */}
            {leftoverChannels.map((ch) => {
              const m = CH_META[ch] ?? { pct: 88, warn: true };
              return (
                <div key={ch} className="gap-x-[6px] grid grid-cols-[16px_minmax(0,1fr)] pb-[9px] pt-[12px] relative shrink-0 w-full border-b border-[#dce8f0] last:border-b-0">
                  <ChDot bg={DOT_GRAY} />
                  <div className="col-2 content-stretch flex flex-col items-start relative w-full">
                    <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full"><p className="leading-[normal]">{ch}</p></div>
                    <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full"><p className="leading-[normal]">Not published</p></div>
                    <CompletenessRow pct={m.pct} warn={m.warn} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared check path ─────────────────────────────────────────────────────────
const CHECK_PATH = "M5.75502 10.2349L1.20502 5.68492C0.931661 5.41157 0.931661 4.96835 1.20502 4.69497L2.19494 3.70502C2.4683 3.43163 2.91154 3.43163 3.1849 3.70502L6.24999 6.77009L12.8151 0.205017C13.0884 -0.0683389 13.5317 -0.0683389 13.805 0.205017L14.795 1.19497C15.0683 1.46833 15.0683 1.91154 14.795 2.18492L6.74497 10.235C6.47159 10.5083 6.02837 10.5083 5.75502 10.2349Z";

// Renders interactive checkbox mark (box + optional check) — used in channel modals
function FigmaCheckboxItem({ checked }: { checked: boolean }) {
  return (
    <div className="relative shrink-0">
      <div className="bg-white relative rounded-[2.5px] shrink-0 size-[13px]">
        <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[2.5px]" />
      </div>
      {checked && (
        <div className="absolute left-[1.4px] overflow-clip size-[14px] top-[-1.2px]">
          <div className="absolute inset-[12.71%_0_12.72%_0]">
            <div className="absolute inset-[0_-7.14%_-19.16%_-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 12.44">
                <path d={CHECK_PATH} fill="#2A4A60" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CSS injection for batch row selection ─────────────────────────────────────
const CHECK_SVG_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 12.44'%3E%3Cpath d='M5.75502 10.2349L1.20502 5.68492C0.931661 5.41157 0.931661 4.96835 1.20502 4.69497L2.19494 3.70502C2.4683 3.43163 2.91154 3.43163 3.1849 3.70502L6.24999 6.77009L12.8151 0.205017C13.0884 -0.0683389 13.5317 -0.0683389 13.805 0.205017L14.795 1.19497C15.0683 1.46833 15.0683 1.91154 14.795 2.18492L6.74497 10.235C6.47159 10.5083 6.02837 10.5083 5.75502 10.2349Z' fill='%232A4A60'/%3E%3C/svg%3E")`;

function buildBatchCSS(selectedCarIds: string[]): string {
  if (selectedCarIds.length === 0) return "";
  const allSelected = selectedCarIds.length === CARS.length;
  const checkAfter = `content:''!important;position:absolute!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;width:14px!important;height:11px!important;background-image:${CHECK_SVG_URI}!important;background-size:contain!important;background-repeat:no-repeat!important;pointer-events:none!important;z-index:4!important;`;
  let css = `[data-name="Table-bottom"]{display:none!important;}`;
  selectedCarIds.forEach(carId => {
    const n = CARS.findIndex(c => c.id === carId) + 1;
    if (n < 1) return;
    css += `[data-name="tbody"]>[data-name="tr.inv-row"]:nth-child(${n}){background-color:#DCE8F0!important;}`;
    css += `[data-name="tbody"]>[data-name="tr.inv-row"]:nth-child(${n}) [data-name^="td"]{background-color:#DCE8F0!important;}`;
    css += `[data-name="tbody"]>[data-name="tr.inv-row"]:nth-child(${n}) [data-name="td1"]{position:relative!important;}`;
    css += `[data-name="tbody"]>[data-name="tr.inv-row"]:nth-child(${n}) [data-name="td1"]::after{${checkAfter}}`;
  });
  if (allSelected) {
    css += `[data-name="th1"]{position:relative!important;}`;
    css += `[data-name="th1"]::after{${checkAfter}}`;
  }
  return css;
}

// ── Batch action bar — fixed at bottom, replaces pagination ──────────────────
function BatchActionBar({ count, onDeselect, onPublishSelected, onCancel }: {
  count: number; onDeselect: () => void; onPublishSelected: () => void; onCancel: () => void;
}) {
  return (
    <div className="bg-gradient-to-b from-[#2a4f6e] to-[#1a3347] w-full shrink-0 relative">
      <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative w-full">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
          <p className="leading-[normal]">{count} vehicle{count !== 1 ? "s" : ""} selected</p>
        </div>
        <button onClick={onDeselect} className="cursor-pointer shrink-0">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">
            <p className="decoration-solid leading-[normal] underline">Deselect all</p>
          </div>
        </button>
        <div className="flex-[1_0_0] h-px min-w-px" />
        <button onClick={onPublishSelected} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
          <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
          <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
          <div className="content-stretch flex h-full items-center justify-center pb-[5px] pt-[3px] px-[11px] relative">
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-shadow-[0px_1px_1px_rgba(0,0,0,0.2)] text-white whitespace-nowrap">
              <p className="leading-[15.4px]">Publish selected →</p>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
        </button>
        <button onClick={onCancel} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
          <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
          <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
          <div className="content-stretch flex h-full items-center justify-center pb-[5px] pt-[3px] px-[11px] relative">
            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
              <p className="leading-[15.4px]">Cancel</p>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
        </button>
      </div>
    </div>
  );
}

// ── Batch Channel Selector Modal — EP3·B2 Step 1 of 3 ────────────────────────
function BatchChannelSelectorModal({ vehicleCount, selectedChannels, onToggle, onCancel, onNext }: {
  vehicleCount: number; selectedChannels: string[];
  onToggle: (ch: string) => void; onCancel: () => void; onNext: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[576px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Title header */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#5fcee5] relative rounded-[4px] shrink-0 to-[#50c2d6] w-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                  <p className="leading-[normal]">Publish {vehicleCount} vehicles · Step 1 of 3: Select channels</p>
                </div>
                <button onClick={onCancel} className="cursor-pointer p-[2px]">
                  <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                    <p className="leading-[16px]">✕</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Step wizard */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full h-full">
                <div className="content-stretch flex flex-1 gap-[8px] items-center relative">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">● 1. Channels</p></div>
                  <div className="bg-[#5a7080] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">○ 2. Validate</p></div>
                  <div className="bg-[#5a7080] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">○ 3. Publish</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start px-[16px] py-[12px] relative w-full">
            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11.5px] w-full">
              <p className="leading-[normal]">Select which portals to publish {vehicleCount} vehicles on.</p>
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">
              {ALL_CHANNELS.map((ch) => {
                const isChecked = selectedChannels.includes(ch);
                return (
                  <button key={ch} onClick={() => onToggle(ch)} className="h-[32px] relative rounded-[3px] shrink-0 w-full cursor-pointer text-left">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[3px]" style={{ background: isChecked ? "#d0e8f4" : "#fafcfe", border: `1px solid ${isChecked ? "#5aaed0" : "#aec5d4"}` }} />
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center px-[9px] py-[10px] relative size-full">
                        <div className="h-[19px] relative shrink-0 w-[20px]">
                          <div className="content-stretch flex flex-col items-start pl-[4px] pr-[3px] py-[3px] relative size-full">
                            <FigmaCheckboxItem checked={isChecked} />
                          </div>
                        </div>
                        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[12px] whitespace-nowrap">
                          <p className="leading-[normal]">{ch}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
                  <button onClick={onCancel} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                    <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnIcon src={imgCrossWhite1} /><BtnLabel text="Cancel" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                  <button onClick={selectedChannels.length > 0 ? onNext : undefined} disabled={selectedChannels.length === 0}
                    className={`h-[24px] relative rounded-[3px] shrink-0 cursor-pointer ${selectedChannels.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                    <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnIcon src={imgTick1} />
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
                        <p className="leading-[15.4px]">Next: Validate ({selectedChannels.length} channel{selectedChannels.length !== 1 ? "s" : ""}) →</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Batch Fix Issues Modal — EP3·B3a ──────────────────────────────────────────
function BatchFixIssuesModal({ onBackToValidation, onClose }: {
  onBackToValidation: () => void; onClose: () => void;
}) {
  const vehicles = [
    { idx: 1, total: 2, name: "Toyota RAV4", channel: "Mobile.de", fields: ["Mileage (km)", "Fuel type"] },
    { idx: 2, total: 2, name: "Audi A4 2.0 TFSI", channel: "Mobile.de", fields: ["Mileage (km)", "Fuel type"] },
  ];
  const [step, setStep] = useState(0);
  const v = vehicles[step];

  function handleSaveNext() {
    if (step < vehicles.length - 1) setStep(step + 1);
    else onBackToValidation();
  }

  function SectionHead({ title }: { title: string }) {
    return (
      <div className="bg-gradient-to-b from-[#f0f6fa] relative shrink-0 to-[#ddeef7] w-full">
        <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7px] pt-[6px] px-[10px] relative w-full">
          <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
            <p className="leading-[normal]">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  function JqInput({ value }: { value: string }) {
    return (
      <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full">
        <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
            <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-auto relative size-full">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
                  <p className="leading-[normal]">{value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      </div>
    );
  }

  function JqSelect({ value, borderColor = "#aec5d4" }: { value: string; borderColor?: string }) {
    return (
      <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[3px]" style={{ borderColor }} />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
            <div className="flex-[1_0_0] min-h-px min-w-px relative">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
                  <p className="leading-[12px]">{value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function JqLabel({ text, color = "#5a7080" }: { text: string; color?: string }) {
    return (
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] w-full" style={{ color }}>
          <p className="leading-[normal]">{text}</p>
        </div>
      </div>
    );
  }

  function FooterBtn({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
    return (
      <div className="h-[24px] relative rounded-[3px] shrink-0" onClick={onClick} style={{ cursor: "pointer" }}>
        <div aria-hidden="true" className="absolute bg-clip-padding bg-gradient-to-b border-0 border-[transparent] border-solid from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
          {children}
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      {/* Dialog — w-[860px] per Figma */}
      <div className="bg-white content-stretch flex flex-col items-start max-w-[860px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[860px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />

        {/* Header */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#5fcee5] relative rounded-[4px] shrink-0 to-[#50c2d6] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                  <div className="flex flex-row items-center self-stretch">
                    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[295.5px]">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                        <p className="leading-[normal]">Batch publish: fix issues — Vehicle {v.idx} of {v.total} · {v.name}</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={onClose} className="cursor-pointer content-stretch flex items-center justify-center p-[2px] relative shrink-0">
                    <div className="flex flex-col font-['Arial:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                      <p className="leading-[16px]">✕</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wizard steps */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
                  <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap">
                        <p className="leading-[normal]">● 1. Channels</p>
                      </div>
                      <div className="bg-[#5a7080] flex-[1_0_0] h-px min-h-px min-w-px" />
                      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
                        <p className="leading-[normal]">● 2. Validate</p>
                      </div>
                      <div className="bg-[#5a7080] flex-[1_0_0] h-px min-h-px min-w-px" />
                      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
                        <p className="leading-[normal]">● 3. Publish</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body — DivBuilderFormCol */}
        <div className="relative shrink-0 w-full">
          <div className="overflow-auto size-full">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">

              {/* Alert */}
              <div className="bg-[#eef2f5] h-[32px] relative rounded-[3px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#e0c060] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[11px] py-[8px] relative size-full">
                    <div className="relative shrink-0 size-[16px]">
                      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgExclamation2} />
                    </div>
                    <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a5010] text-[0px] whitespace-nowrap">
                      <p className="text-[11.5px]">
                        <span className="font-['Segoe_UI:Bold',sans-serif] leading-[normal]">Vehicle {v.idx} of {v.total} with issues · {v.channel}</span>
                        <span className="font-['Segoe_UI:Regular',sans-serif] leading-[normal]">{` · Missing ${v.fields.length} fields: ${v.fields.join(", ")}`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle identification */}
              <div className="bg-white relative rounded-[3px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative w-full">
                  <SectionHead title="Vehicle identification" />
                  <div className="relative shrink-0 w-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative w-full">
                      <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full">
                        <div className="col-start-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-start shrink-0">
                          <JqLabel text="Make *" /><JqInput value="Volkswagen" />
                        </div>
                        <div className="col-start-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-start shrink-0">
                          <JqLabel text="Model *" /><JqInput value="Golf" />
                        </div>
                        <div className="col-start-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-start shrink-0">
                          <JqLabel text="Year *" /><JqInput value="2019" />
                        </div>
                        <div className="col-start-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-2 self-start shrink-0">
                          <JqLabel text="Reg. number" /><JqInput value="ABC-123" />
                        </div>
                        <div className="col-start-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-2 self-start shrink-0">
                          <JqLabel text="VIN" /><JqInput value="WVWZZZ1KZ..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical data */}
              <div className="bg-white relative rounded-[3px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative w-full">
                  <SectionHead title="Technical data" />
                  <div className="relative shrink-0 w-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative w-full">
                      <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full">
                        <div className="col-start-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-stretch shrink-0">
                          <JqLabel text="Mileage (km) *" color="#b03030" />
                          <JqSelect value="" borderColor="#b03030" />
                        </div>
                        <div className="col-start-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-stretch shrink-0">
                          <JqLabel text="Fuel type *" color="#b03030" />
                          <JqSelect value="Select…" borderColor="#b03030" />
                        </div>
                        <div className="col-start-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-start-1 self-start shrink-0">
                          <JqLabel text="Engine (cc)" />
                          <JqSelect value="1598" />
                        </div>
                        <div className="col-start-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-start-2 self-start shrink-0">
                          <JqLabel text="Power (hp)" />
                          <JqSelect value="115" />
                        </div>
                        <div className="col-start-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-2 self-start shrink-0">
                          <JqLabel text="Transmission" />
                          <JqSelect value="Manual" />
                        </div>
                        <div className="col-start-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-start-2 self-start shrink-0">
                          <JqLabel text="Color" />
                          <JqSelect value="Deep Black Pearl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional details */}
              <div className="bg-white relative rounded-[3px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative w-full">
                  <SectionHead title="Additional details" />
                  <div className="relative shrink-0 w-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
                      <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] relative shrink-0 w-full">
                        <div className="col-start-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-stretch shrink-0">
                          <JqLabel text="Interior color" />
                          <JqSelect value="e.g. Black leather" />
                        </div>
                        <div className="col-start-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-start-1 self-stretch shrink-0">
                          <JqLabel text="Doors count" />
                          <JqSelect value="5" />
                        </div>
                        <div className="col-start-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-start-1 self-start shrink-0">
                          <JqLabel text="Seats" />
                          <JqSelect value="5" />
                        </div>
                      </div>
                      {/* Description */}
                      <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-full">
                        <JqLabel text="Description" />
                        <div className="bg-white h-[80px] relative rounded-[3px] shrink-0 w-full">
                          <div className="flex flex-row justify-center overflow-auto size-full">
                            <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
                              <div className="flex-[1_0_0] min-h-px min-w-px relative">
                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
                                    <p className="leading-[normal]">Well-maintained one-owner vehicle.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
                  <FooterBtn onClick={onBackToValidation}>
                    <BtnLabel text="← Back to validation" />
                  </FooterBtn>
                  <div className="relative shrink-0">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative">
                      <FooterBtn>
                        <BtnLabel text="Skip this vehicle" />
                      </FooterBtn>
                      <FooterBtn onClick={handleSaveNext}>
                        <div className="relative shrink-0 size-[16px]">
                          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgTick1} />
                        </div>
                        <BtnLabel text={`Save & Next vehicle →`} />
                      </FooterBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Batch Progress Modal — EP3·B4 ─────────────────────────────────────────────
function BatchProgressModal({ selectedCarIds, selectedChannels, onDone }: {
  selectedCarIds: string[]; selectedChannels: string[]; onDone: () => void;
}) {
  const selectedCars = CARS.filter(c => selectedCarIds.includes(c.id));
  const [step, setStep] = useState(0); // cars completed so far

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    selectedCars.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), (i + 1) * 700));
    });
    timers.push(setTimeout(onDone, selectedCars.length * 700 + 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  const total = selectedCars.length * selectedChannels.length;
  const done = step * selectedChannels.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  function cellContent(carIdx: number) {
    if (carIdx < step) return <span className="text-[#2d8a4e] text-[11px]">✓</span>;
    if (carIdx === step) return (
      <img alt="" className="size-[11px] object-cover pointer-events-none" src={imgArrowCircle3151}
        style={{ animation: "spin 1.5s linear infinite" }} />
    );
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[576px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Title header — teal */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#5fcee5] relative rounded-[4px] shrink-0 to-[#50c2d6] w-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                <div className="flex items-center gap-[6px]">
                  <div className="relative shrink-0 size-[16px]" style={{ animation: "spin 1.5s linear infinite" }}>
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgArrowCircle3151} />
                  </div>
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Batch publish: Step 3 of 3</p>
                  </div>
                </div>
                <button onClick={onDone} className="cursor-pointer p-[2px] opacity-50">
                  <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                    <p className="leading-[16px]">✕</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Step wizard */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full h-full">
                <div className="content-stretch flex flex-1 gap-[8px] items-center relative">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 1. Channels</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 2. Validate</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">● 3. Publish</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-[8px] relative w-full">
            {/* Progress bar — same style as EP1·A4 */}
            <div className="content-stretch flex flex-col gap-[4px] items-start px-[4px] relative w-full">
              <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
                  <p className="leading-[normal]">{done} of {total} operations</p>
                </div>
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
                  <p className="leading-[normal]">{pct}%</p>
                </div>
              </div>
              <div className="bg-[#c8dce8] h-[16px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
                  <div className="bg-gradient-to-r flex-[1_0_0] from-[#5bbde0] min-h-px relative rounded-[8px] to-[#3a9ec8]" style={{ width: `${pct}%`, transition: "width 0.7s ease" }} />
                </div>
                <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[8px]" />
              </div>
            </div>
            {/* Results table */}
            <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full overflow-x-auto">
              {/* Header row */}
              <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
                <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ddeef7] items-start p-[9px] relative shrink-0 to-[#c8dce8] w-[180px]">
                  <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">Vehicle</p></div>
                </div>
                {selectedChannels.map(ch => (
                  <div key={ch} className="bg-gradient-to-b flex-1 from-[#ddeef7] min-h-px min-w-px relative to-[#c8dce8]">
                    <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-r border-solid border-t inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start pl-[8px] pr-[9px] py-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Data rows */}
              {selectedCars.map((car, idx) => (
                <div key={car.id} className="content-stretch flex items-start justify-center relative shrink-0 w-full" style={{ borderBottom: "1px solid #e4edf5", background: idx % 2 === 1 ? "#f0f6fa" : "#fafcfe" }}>
                  <div className="relative shrink-0 w-[180px]" style={{ background: "inherit" }}>
                    <div aria-hidden="true" className="absolute border-[#e4edf5] border-l border-r border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start justify-center p-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
                        <p className="leading-[normal]">{car.make} {car.model}</p>
                      </div>
                    </div>
                  </div>
                  {selectedChannels.map(ch => (
                    <div key={ch} className="flex-1 min-h-px min-w-px relative" style={{ background: "inherit" }}>
                      <div aria-hidden="true" className="absolute border-[#e4edf5] border-r border-solid inset-0 pointer-events-none" />
                      <div className="content-stretch flex flex-col items-center justify-center pl-[8px] pr-[9px] py-[9px] relative w-full h-full">
                        {cellContent(idx)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Batch Success Modal — EP3·B5 ──────────────────────────────────────────────
function BatchSuccessModal({ selectedCarIds, selectedChannels, onDone }: {
  selectedCarIds: string[]; selectedChannels: string[]; onDone: () => void;
}) {
  const selectedCars = CARS.filter(c => selectedCarIds.includes(c.id));
  // Mobile.de missing combos → skipped
  const MOBILE_DE = "Mobile.de";
  const skippedCars = selectedCars.filter(c => (MISSING_COMBOS[c.id] || []).includes(MOBILE_DE) && selectedChannels.includes(MOBILE_DE));
  const totalOps = selectedCars.length * selectedChannels.length;
  const skippedOps = skippedCars.length;
  const successOps = totalOps - skippedOps;

  function cellValue(carId: string, ch: string) {
    if (ch === MOBILE_DE && (MISSING_COMBOS[carId] || []).includes(MOBILE_DE)) return "—";
    return "✓";
  }
  function cellColor(val: string) {
    return val === "—" ? "text-[#5a7080]" : "text-[#2d8a4e]";
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[576px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Title header — green */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#3dba6a] relative rounded-[4px] shrink-0 to-[#2d9e57] w-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                <div className="flex items-center gap-[6px]">
                  <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgTick1} />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Batch publish complete</p>
                  </div>
                </div>
                <button onClick={onDone} className="cursor-pointer p-[2px]">
                  <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                    <p className="leading-[16px]">✕</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Step wizard — all done */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full h-full">
                <div className="content-stretch flex flex-1 gap-[8px] items-center relative">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 1. Channels</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 2. Validate</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 3. Publish</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-[8px] relative w-full">
            {/* Success banner */}
            <div className="bg-[#eef8f1] relative rounded-[3px] shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-[#2d8a4e] border-solid inset-0 pointer-events-none rounded-[3px]" />
              <div className="content-stretch flex gap-[4px] items-center px-[11px] py-[8px] relative w-full">
                <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgTickCircle1} />
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a3347] text-[11.5px]">
                  <p className="leading-[normal]">
                    <span className="font-['Segoe_UI:Bold',sans-serif]">{successOps} of {totalOps} operations successful</span>
                    {skippedOps > 0 && ` · ${skippedOps} skipped (missing fields for ${MOBILE_DE})`}
                  </p>
                </div>
              </div>
            </div>
            {/* Results grid */}
            <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full overflow-x-auto">
              {/* Header */}
              <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
                <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ddeef7] items-start p-[9px] relative shrink-0 to-[#c8dce8] w-[180px]">
                  <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">Vehicle</p></div>
                </div>
                {selectedChannels.map(ch => (
                  <div key={ch} className="bg-gradient-to-b flex-1 from-[#ddeef7] min-h-px min-w-px relative to-[#c8dce8]">
                    <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-r border-solid border-t inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start pl-[8px] pr-[9px] py-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Data rows */}
              {selectedCars.map((car, idx) => (
                <div key={car.id} className="content-stretch flex items-start justify-center relative shrink-0 w-full" style={{ borderBottom: "1px solid #e4edf5", background: idx % 2 === 1 ? "#f0f6fa" : "#fafcfe" }}>
                  <div className="relative shrink-0 w-[180px]" style={{ background: "inherit" }}>
                    <div aria-hidden="true" className="absolute border-[#e4edf5] border-l border-r border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start justify-center p-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
                        <p className="leading-[normal]">{car.make} {car.model}</p>
                      </div>
                    </div>
                  </div>
                  {selectedChannels.map(ch => {
                    const val = cellValue(car.id, ch);
                    return (
                      <div key={ch} className="flex-1 min-h-px min-w-px relative" style={{ background: "inherit" }}>
                        <div aria-hidden="true" className="absolute border-[#e4edf5] border-r border-solid inset-0 pointer-events-none" />
                        <div className="content-stretch flex flex-col items-start justify-center pl-[8px] pr-[9px] py-[9px] relative w-full">
                          <div className={`flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] w-full ${cellColor(val)}`}>
                            <p className="leading-[normal]">{val}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {/* Note */}
            {skippedCars.length > 0 && (
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px]">
                <p className="leading-[normal]">Note: {skippedCars.map(c => `${c.make} ${c.model}`).join(" and ")} were skipped for {MOBILE_DE}.</p>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-end p-[8px] relative size-full">
                  <button onClick={onDone} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                    <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnIcon src={imgTick1} /><BtnLabel text="Done" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Batch Partial Errors Modal — EP3·B6 ───────────────────────────────────────
function BatchPartialErrorsModal({ selectedCarIds, selectedChannels, onDone }: {
  selectedCarIds: string[]; selectedChannels: string[]; onDone: () => void;
}) {
  const selectedCars = CARS.filter(c => selectedCarIds.includes(c.id));
  const failedOps = selectedCars.reduce((acc, car) => {
    if (car.id === BMW_ID) return acc + BMW_FAIL_CHANNELS.filter(ch => selectedChannels.includes(ch)).length;
    return acc;
  }, 0);
  const totalOps = selectedCars.length * selectedChannels.length;
  const successOps = totalOps - failedOps;
  const failDetails = selectedCars
    .filter(c => c.id === BMW_ID)
    .flatMap(c => BMW_FAIL_CHANNELS.filter(ch => selectedChannels.includes(ch)).map(ch => `${c.make} ${c.model} – ${ch}`))
    .join(", ");

  function cellValue(carId: string, ch: string) {
    if (carId === BMW_ID && BMW_FAIL_CHANNELS.includes(ch)) return "✗";
    return "✓";
  }
  function cellColor(val: string) {
    return val === "✗" ? "text-[#c83030]" : "text-[#2d8a4e]";
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[576px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Title header — orange */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#c87820] relative rounded-[4px] shrink-0 to-[#8a4a10] w-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                <div className="flex items-center gap-[6px]">
                  <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgExclamation} />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Batch publish: partial results</p>
                  </div>
                </div>
                <button onClick={onDone} className="cursor-pointer p-[2px]">
                  <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                    <p className="leading-[16px]">✕</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Step wizard */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full h-full">
                <div className="content-stretch flex flex-1 gap-[8px] items-center relative">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 1. Channels</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 2. Validate</p></div>
                  <div className="bg-[#c87820] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c87820] text-[11px] whitespace-nowrap"><p className="leading-[normal]">● 3. Publish</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-[8px] relative w-full">
            {/* Alert banner */}
            <div className="bg-[#eef2f5] relative rounded-[3px] shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-[#c87820] border-solid inset-0 pointer-events-none rounded-[3px]" />
              <div className="content-stretch flex gap-[4px] items-center px-[11px] py-[8px] relative w-full">
                <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgExclamation} />
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a3347] text-[11.5px]">
                  <p className="leading-[normal]">
                    <span className="font-['Segoe_UI:Bold',sans-serif]">{successOps} of {totalOps} operations successful · {failedOps} failed</span>
                    {failDetails && ` (${failDetails})`}
                  </p>
                </div>
              </div>
            </div>
            {/* Results grid */}
            <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full overflow-x-auto">
              <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
                <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ddeef7] items-start p-[9px] relative shrink-0 to-[#c8dce8] w-[180px]">
                  <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">Vehicle</p></div>
                </div>
                {selectedChannels.map(ch => (
                  <div key={ch} className="bg-gradient-to-b flex-1 from-[#ddeef7] min-h-px min-w-px relative to-[#c8dce8]">
                    <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-r border-solid border-t inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start pl-[8px] pr-[9px] py-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedCars.map((car, idx) => (
                <div key={car.id} className="content-stretch flex items-start justify-center relative shrink-0 w-full" style={{ borderBottom: "1px solid #e4edf5", background: idx % 2 === 1 ? "#f0f6fa" : "#fafcfe" }}>
                  <div className="relative shrink-0 w-[180px]" style={{ background: "inherit" }}>
                    <div aria-hidden="true" className="absolute border-[#e4edf5] border-l border-r border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start justify-center p-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
                        <p className="leading-[normal]">{car.make} {car.model}</p>
                      </div>
                    </div>
                  </div>
                  {selectedChannels.map(ch => {
                    const val = cellValue(car.id, ch);
                    return (
                      <div key={ch} className="flex-1 min-h-px min-w-px relative" style={{ background: "inherit" }}>
                        <div aria-hidden="true" className="absolute border-[#e4edf5] border-r border-solid inset-0 pointer-events-none" />
                        <div className="content-stretch flex flex-col items-start justify-center pl-[8px] pr-[9px] py-[9px] relative w-full">
                          <div className={`flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] w-full ${cellColor(val)}`}>
                            <p className="leading-[normal]">{val}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-end gap-[6px] p-[8px] relative size-full">
                  <button onClick={onDone} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                    <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnLabel text="Close" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                  <button onClick={onDone} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
                    <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnIcon src={imgTick} /><BtnLabel text="Retry failed" color="white" shadow="0px_1px_1px_rgba(0,0,0,0.2)" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Batch All Failed Modal — EP3·B7 ───────────────────────────────────────────
function BatchAllFailedModal({ selectedCarIds, selectedChannels, onDone }: {
  selectedCarIds: string[]; selectedChannels: string[]; onDone: () => void;
}) {
  const selectedCars = CARS.filter(c => selectedCarIds.includes(c.id));
  const totalOps = selectedCars.length * selectedChannels.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[576px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Title header — red */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#c83030] relative rounded-[4px] shrink-0 to-[#801010] w-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                <div className="flex items-center gap-[6px]">
                  <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgExclamationRedFrame} />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Batch publish failed</p>
                  </div>
                </div>
                <button onClick={onDone} className="cursor-pointer p-[2px]">
                  <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                    <p className="leading-[16px]">✕</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Step wizard */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full h-full">
                <div className="content-stretch flex flex-1 gap-[8px] items-center relative">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 1. Channels</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 2. Validate</p></div>
                  <div className="bg-[#c83030] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c83030] text-[11px] whitespace-nowrap"><p className="leading-[normal]">● 3. Publish</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-[8px] relative w-full">
            {/* Alert banner */}
            <div className="bg-[#f5f9fc] relative rounded-[3px] shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-[#c83030] border-solid inset-0 pointer-events-none rounded-[3px]" />
              <div className="content-stretch flex gap-[4px] items-center px-[11px] py-[8px] relative w-full">
                <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgExclamationRed} />
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a3347] text-[11.5px]">
                  <p className="leading-[normal]">
                    <span className="font-['Segoe_UI:Bold',sans-serif]">All {totalOps} operations failed</span>
                    {" · Connection error or portal unavailable. Check your network and try again."}
                  </p>
                </div>
              </div>
            </div>
            {/* Results grid */}
            <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full overflow-x-auto">
              <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
                <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ddeef7] items-start p-[9px] relative shrink-0 to-[#c8dce8] w-[180px]">
                  <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">Vehicle</p></div>
                </div>
                {selectedChannels.map(ch => (
                  <div key={ch} className="bg-gradient-to-b flex-1 from-[#ddeef7] min-h-px min-w-px relative to-[#c8dce8]">
                    <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-r border-solid border-t inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start pl-[8px] pr-[9px] py-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedCars.map((car, idx) => (
                <div key={car.id} className="content-stretch flex items-start justify-center relative shrink-0 w-full" style={{ borderBottom: "1px solid #e4edf5", background: idx % 2 === 1 ? "#f0f6fa" : "#fafcfe" }}>
                  <div className="relative shrink-0 w-[180px]" style={{ background: "inherit" }}>
                    <div aria-hidden="true" className="absolute border-[#e4edf5] border-l border-r border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start justify-center p-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
                        <p className="leading-[normal]">{car.make} {car.model}</p>
                      </div>
                    </div>
                  </div>
                  {selectedChannels.map(ch => (
                    <div key={ch} className="flex-1 min-h-px min-w-px relative" style={{ background: "inherit" }}>
                      <div aria-hidden="true" className="absolute border-[#e4edf5] border-r border-solid inset-0 pointer-events-none" />
                      <div className="content-stretch flex flex-col items-start justify-center pl-[8px] pr-[9px] py-[9px] relative w-full">
                        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] w-full text-[#c83030]">
                          <p className="leading-[normal]">✗</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-end gap-[6px] p-[8px] relative size-full">
                  <button onClick={onDone} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                    <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnLabel text="Close" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                  <button onClick={onDone} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
                    <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                      <BtnIcon src={imgTick} /><BtnLabel text="Retry all" color="white" shadow="0px_1px_1px_rgba(0,0,0,0.2)" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Batch Validation Modal — EP3·B3 Step 2 of 3 ───────────────────────────────
function BatchValidationModal({ selectedCarIds, selectedChannels, onBack, onProceed, onClose, onFixIssues }: {
  selectedCarIds: string[]; selectedChannels: string[];
  onBack: () => void; onProceed: () => void; onClose: () => void; onFixIssues: () => void;
}) {
  const selectedCars = CARS.filter(c => selectedCarIds.includes(c.id));

  // Per-car, per-channel validation
  function getStatus(carId: string, ch: string): "ready" | "missing" {
    return (MISSING_COMBOS[carId] || []).includes(ch) ? "missing" : "ready";
  }

  // Build warning info
  const missingCars = selectedCars.filter(c =>
    selectedChannels.some(ch => getStatus(c.id, ch) === "missing")
  );
  const missingChannels = [...new Set(
    selectedCars.flatMap(c => selectedChannels.filter(ch => getStatus(c.id, ch) === "missing"))
  )];
  const hasWarnings = missingCars.length > 0;

  // Short names for warning text (Make + Model only)
  const warningCarNames = missingCars.map(c => `${c.make} ${c.model}`);

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,40,60,0.6)", zIndex: 20 }}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[576px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Title header */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#5fcee5] relative rounded-[4px] shrink-0 to-[#50c2d6] w-full">
              <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
                <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                  <p className="leading-[normal]">Batch publish: Step 2 of 3: Validation</p>
                </div>
                <button onClick={onClose} className="cursor-pointer p-[2px]">
                  <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                    <p className="leading-[16px]">✕</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Step wizard — step 2 active */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[31px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="content-stretch flex items-center px-[12px] py-[8px] relative w-full h-full">
                <div className="content-stretch flex flex-1 gap-[8px] items-center relative">
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">✓ 1. Channels</p></div>
                  <div className="bg-[#2d7fa8] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11px] whitespace-nowrap"><p className="leading-[normal]">● 2. Validate</p></div>
                  <div className="bg-[#5a7080] flex-1 h-px" />
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">● 3. Publish</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] py-[8px] relative w-full">
            {/* Warning banner */}
            {hasWarnings && (
              <div className="bg-[#eef2f5] relative rounded-[3px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#e0c060] border-solid inset-0 pointer-events-none rounded-[3px]" />
                <div className="content-stretch flex gap-[4px] items-center px-[11px] py-[8px] relative w-full">
                  <img alt="" className="relative shrink-0 size-[16px] object-cover pointer-events-none" src={imgExclamation2} />
                  <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a5010] text-[11.5px]">
                    <p className="leading-[normal]">
                      <span className="font-['Segoe_UI:Bold',sans-serif]">{warningCarNames.join(" and ")}</span>
                      {` will be skipped for ${missingChannels.join(", ")} (missing required fields).`}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Validation grid */}
            <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full overflow-x-auto">
              {/* Header */}
              <div className="content-stretch flex items-start justify-center relative shrink-0 w-full">
                <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ddeef7] items-start p-[9px] relative shrink-0 to-[#c8dce8] w-[180px]">
                  <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none" />
                  <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">Vehicle</p></div>
                </div>
                {selectedChannels.map(ch => (
                  <div key={ch} className="bg-gradient-to-b flex-1 from-[#ddeef7] min-h-px min-w-px relative to-[#c8dce8]">
                    <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-r border-solid border-t inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start pl-[8px] pr-[9px] py-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap"><p className="leading-[normal]">{ch}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Data rows */}
              {selectedCars.map(car => (
                <div key={car.id} className="content-stretch flex items-start justify-center relative shrink-0 w-full" style={{ borderBottom: "1px solid #e4edf5" }}>
                  <div className="bg-[#fafcfe] relative shrink-0 w-[180px]">
                    <div aria-hidden="true" className="absolute border-[#e4edf5] border-l border-r border-solid inset-0 pointer-events-none" />
                    <div className="content-stretch flex flex-col items-start justify-center p-[9px] relative w-full">
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
                        <p className="leading-[normal]">{car.make} {car.model}</p>
                      </div>
                    </div>
                  </div>
                  {selectedChannels.map(ch => {
                    const status = getStatus(car.id, ch);
                    return (
                      <div key={ch} className="bg-[#fafcfe] flex-1 min-h-px min-w-px relative">
                        <div aria-hidden="true" className="absolute border-[#e4edf5] border-r border-solid inset-0 pointer-events-none" />
                        <div className="content-stretch flex flex-col items-start justify-center pl-[8px] pr-[9px] py-[9px] relative w-full">
                          {status === "ready" ? (
                            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d8a4e] text-[11px] w-full">
                              <p className="leading-[normal]">✓ Ready</p>
                            </div>
                          ) : (
                            <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b07820] text-[11px] w-full">
                              <p className="leading-[normal]">⚠ Missing 2</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
            <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
                  {/* Back */}
                  <button onClick={onBack} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                    <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                    <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                    <div className="content-stretch flex h-full items-center justify-center px-[11px] py-[3px] relative"><BtnLabel text="← Back" /></div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                  </button>
                  {/* Right side buttons */}
                  <div className="content-stretch flex gap-[8px] items-center relative">
                    {hasWarnings && (
                      <button onClick={onFixIssues} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                        <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                        <div className="content-stretch flex h-full items-center justify-center px-[11px] py-[3px] relative"><BtnLabel text="Fix issues first" /></div>
                        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                      </button>
                    )}
                    <button onClick={onProceed} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                      <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                      <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                        <BtnIcon src={imgTick1} /><BtnLabel text="Proceed anyway →" />
                      </div>
                      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Channel Select Modal ──────────────────────────────────────────────────────

function ChannelSelectModal({ carName, currentChannels, publishedChannels, onClose, onValidate }: {
  carName: string; currentChannels: string[]; publishedChannels: string[];
  onClose: () => void; onValidate: (channels: string[]) => void;
}) {
  const available = ALL_CHANNELS.filter((ch) => !publishedChannels.includes(ch));
  const [checked, setChecked] = useState<string[]>(currentChannels.filter(ch => !publishedChannels.includes(ch)));
  const toggle = (ch: string) => setChecked((prev) => prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]);

  return (
    <div className="absolute bg-[rgba(20,40,60,0.55)] content-stretch flex inset-0 items-center justify-center z-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[720px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[574px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Header */}
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="bg-gradient-to-b from-[#5fcee5] relative rounded-[4px] shrink-0 to-[#50c2d6] w-full">
            <div className="content-stretch flex items-center justify-between px-[12px] py-[10px] relative w-full">
              <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-shadow-[0px_1px_2px_rgba(0,0,0,0.3)] text-white whitespace-nowrap">
                <p className="leading-[normal]">Publishing — {carName}</p>
              </div>
              <button onClick={onClose} className="cursor-pointer p-[2px]">
                <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap">
                  <p className="leading-[16px]">✕</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Search bar */}
        <div className="content-stretch flex gap-[8px] items-center px-[8px] relative w-full">
          <div className="bg-white flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[3px]">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center px-[9px] py-px relative size-full">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[11px] w-full"><p className="leading-[normal]">Search channel…</p></div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px]" />
          </div>
          <button className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[11px] py-[3px] relative rounded-[3px] shrink-0 cursor-pointer">
            <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
            <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
            <BtnIcon src={imgYusukeKamiyamaneFuguePlus161} />
            <BtnLabel text="Add channel" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
          </button>
        </div>
        {/* Channel list */}
        <div className="content-stretch flex flex-col gap-[6px] items-start max-h-[320px] overflow-auto px-[16px] py-[8px] relative w-full">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11.5px] w-full">
            <p className="leading-[normal]">Select which portals to publish {checked.length} vehicles on.</p>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            {available.length === 0 ? (
              <div className="text-center w-full py-4">
                <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[11px] w-full">
                  <p className="leading-[normal]">All channels are already published.</p>
                </div>
              </div>
            ) : available.map((ch) => {
              const isChecked = checked.includes(ch);
              return (
                <button key={ch} onClick={() => toggle(ch)} className="h-[32px] relative rounded-[3px] shrink-0 w-full cursor-pointer text-left">
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[3px]" style={{ background: isChecked ? "#d0e8f4" : "#fafcfe", border: `1px solid ${isChecked ? "#5aaed0" : "#aec5d4"}` }} />
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center px-[9px] py-[10px] relative size-full">
                      <div className="h-[19px] relative shrink-0 w-[20px]">
                        <div className="content-stretch flex flex-col items-start pl-[4px] pr-[3px] py-[3px] relative size-full">
                          <div className="relative shrink-0">
                            <div className="bg-white relative rounded-[2.5px] shrink-0 size-[13px]">
                              <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[2.5px]" />
                            </div>
                            {isChecked && (
                              <div className="absolute left-[1.4px] overflow-clip size-[14px] top-[-1.2px]">
                                <div className="absolute inset-[12.71%_0_12.72%_0]">
                                  <div className="absolute inset-[0_-7.14%_-19.16%_-7.14%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 12.44">
                                      <path d={CHECK_PATH} fill="#2A4A60" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[12px] whitespace-nowrap">
                        <p className="leading-[normal]">{ch}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* Footer */}
        <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
          <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between p-[8px] relative size-full">
                <button onClick={onClose} className="h-[24px] relative rounded-[3px] shrink-0 cursor-pointer">
                  <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                  <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                  <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                    <BtnIcon src={imgCrossWhite1} />
                    <BtnLabel text="Cancel" />
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                </button>
                <button onClick={() => checked.length > 0 && onValidate(checked)} disabled={checked.length === 0} className={`h-[24px] relative rounded-[3px] shrink-0 cursor-pointer ${checked.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                  <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
                  <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
                  <div className="content-stretch flex gap-[4px] h-full items-center justify-center px-[11px] py-[3px] relative">
                    <BtnIcon src={imgTick1} />
                    <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
                      <p className="leading-[15.4px]">Next: Validate ({checked.length} channel{checked.length !== 1 ? "s" : ""}) →</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Publish Modal ────────────────────────────────────────────────────────
function PublishModal({ car, carState, progressStep, showChannelSelect, expandedErrors, onClose, onAddChannels, onPublish, onCloseChannelSelect, onValidate, onToggleError, onGoToBuilder }: {
  car: (typeof CARS)[0]; carState: CarState; progressStep: number;
  showChannelSelect: boolean; expandedErrors: string[];
  onClose: () => void; onAddChannels: () => void; onPublish: () => void;
  onCloseChannelSelect: () => void; onValidate: (ch: string[]) => void;
  onToggleError: (ch: string) => void; onGoToBuilder: () => void;
}) {
  const { channels, publishState, publishedChannels, failedChannels } = carState;
  const leftoverChannels = channels.filter(ch => !publishedChannels.includes(ch) && !failedChannels.includes(ch));

  function renderBody() {
    if (publishState === "progress") return <ProgressPanel channels={channels} progressStep={progressStep} />;
    if (publishState === "published") return <PublishedPanel channels={publishedChannels} onAddChannels={onAddChannels} />;
    if (publishState === "partial_error") return (
      <PartialErrorPanel publishedChannels={publishedChannels} failedChannels={failedChannels} leftoverChannels={leftoverChannels}
        expandedErrors={expandedErrors} onToggleError={onToggleError} onAddChannels={onAddChannels} onPublish={onPublish} onGoToBuilder={onGoToBuilder} />
    );
    if (channels.length === 0) return <EmptyPublishPanel onAddChannels={onAddChannels} />;
    return <WithChannelsPanel channels={channels} onAddChannels={onAddChannels} onPublish={onPublish} />;
  }

  return (
    <div className="absolute bg-[rgba(20,40,60,0.55)] content-stretch flex inset-0 items-center justify-center z-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white content-stretch flex flex-col items-start max-w-[860px] min-w-[560px] p-px relative rounded-[4px] shrink-0 w-[860px]">
        <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35),0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        {/* Header */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[6px] items-start pb-[16px] pt-[8px] px-[8px] relative w-full">
            <div className="content-stretch flex items-center justify-between pt-[10px] px-[12px] relative w-full">
              <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[13px] whitespace-nowrap">
                <p className="leading-[normal]">{car.year} {car.name} — {car.reg}</p>
              </div>
              <button onClick={onClose} className="content-stretch flex items-center justify-center p-[2px] relative shrink-0 w-[20px] cursor-pointer">
                <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[16px] text-center whitespace-nowrap"><p className="leading-[16px]">✕</p></div>
              </button>
            </div>
            <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11.5px] w-full">
                <p className="leading-[normal]">Stock #VG-2019-001 · Added 12 Jan 2024</p>
              </div>
            </div>
          </div>
        </div>
        <ModalSubTabs />
        {/* Body */}
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex gap-[14px] items-start p-[16px] relative w-full">
            {renderBody()}
            <CarSpecsPanel car={car} />
          </div>
        </div>
        <ModalFooter onClose={onClose} />
      </div>
      {showChannelSelect && (
        <ChannelSelectModal carName={`${car.year} ${car.make} ${car.model} — ${car.reg}`}
          currentChannels={channels} publishedChannels={publishedChannels}
          onClose={onCloseChannelSelect} onValidate={onValidate} />
      )}
    </div>
  );
}

// ── Builder sidebar panel content (passed into Ep2A1BuilderIdle as rightSidebarContent) ─
function BuilderSidebarPanel({ carState, progressStep, expandedErrors, onAddChannels, onPublish, onToggleError, onGoToBuilder }: {
  carState: CarState; progressStep: number; expandedErrors: string[];
  onAddChannels: () => void; onPublish: () => void;
  onToggleError: (ch: string) => void; onGoToBuilder?: () => void;
}) {
  const { channels, publishState, publishedChannels, failedChannels } = carState;
  const leftoverChannels = channels.filter(ch => !publishedChannels.includes(ch) && !failedChannels.includes(ch));

  if (publishState === "progress") return (
    <ProgressPanel channels={channels} progressStep={progressStep} />
  );
  if (publishState === "published") return (
    <PublishedPanel channels={publishedChannels} onAddChannels={onAddChannels} />
  );
  if (publishState === "partial_error") return (
    <PartialErrorPanel publishedChannels={publishedChannels} failedChannels={failedChannels} leftoverChannels={leftoverChannels}
      expandedErrors={expandedErrors} onToggleError={onToggleError}
      onAddChannels={onAddChannels} onPublish={onPublish} onGoToBuilder={onGoToBuilder} />
  );
  if (channels.length === 0) return <EmptyPublishPanel onAddChannels={onAddChannels} />;
  return <WithChannelsPanel channels={channels} onAddChannels={onAddChannels} onPublish={onPublish} />;
}

// ── Builder Screen ────────────────────────────────────────────────────────────
function BuilderScreen({ car, carState, progressStep, sidebarVisible, showChannelSelect, expandedErrors, onGoToDashboard, onShowSidebar, onAddChannels, onPublish, onCloseChannelSelect, onValidate, onToggleError }: {
  car: (typeof CARS)[0]; carState: CarState; progressStep: number; sidebarVisible: boolean;
  showChannelSelect: boolean; expandedErrors: string[];
  onGoToDashboard: () => void; onShowSidebar: () => void;
  onAddChannels: () => void; onPublish: () => void;
  onCloseChannelSelect: () => void; onValidate: (ch: string[]) => void;
  onToggleError: (ch: string) => void;
}) {
  const handleBuilderClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const pEl = target.closest("p");
    if (!pEl) return;
    const text = pEl.textContent?.trim();
    if (text === "← Inventory") { onGoToDashboard(); return; }
    if (text === "Publish to channels" && !sidebarVisible) { onShowSidebar(); return; }
  }, [onGoToDashboard, onShowSidebar, sidebarVisible]);

  if (!sidebarVisible) {
    return (
      <div className="size-full relative" onClick={handleBuilderClick}>
        <Ep2A0BuilderIdle />
        {showChannelSelect && (
          <div className="absolute inset-0 z-10">
            <ChannelSelectModal carName={`${car.year} ${car.make} ${car.model} — ${car.reg}`}
              currentChannels={carState.channels} publishedChannels={carState.publishedChannels}
              onClose={onCloseChannelSelect} onValidate={onValidate} />
          </div>
        )}
      </div>
    );
  }

  // EP2·A1: sidebar visible.
  // The dynamic panel is passed as rightSidebarContent prop — Ep2A1BuilderIdle slots it in
  // place of the hardcoded RightA1PublishingPanel, inside the correct Figma layout structure.
  const sidebarPanel = (
    <BuilderSidebarPanel
      carState={carState}
      progressStep={progressStep}
      expandedErrors={expandedErrors}
      onAddChannels={onAddChannels}
      onPublish={onPublish}
      onToggleError={onToggleError}
      onGoToBuilder={onGoToDashboard}
    />
  );

  return (
    <div className="size-full relative" onClick={handleBuilderClick}>
      <Ep2A1BuilderIdle rightSidebarContent={sidebarPanel} />
      {showChannelSelect && (
        <div className="absolute inset-0 z-10">
          <ChannelSelectModal carName={`${car.year} ${car.make} ${car.model} — ${car.reg}`}
            currentChannels={carState.channels} publishedChannels={carState.publishedChannels}
            onClose={onCloseChannelSelect} onValidate={onValidate} />
        </div>
      )}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<"dashboard" | "builder">("dashboard");
  const [builderCarId, setBuilderCarId] = useState<string | null>(null);
  const [builderSidebarVisible, setBuilderSidebarVisible] = useState(false);

  // Per-car publishing state (resets when modal is closed OR when returning from builder to dashboard)
  const [carStates, setCarStates] = useState<Record<string, CarState>>({});
  // Single-car modal
  const [activeCarId, setActiveCarId] = useState<string | null>(null);
  const [showChannelSelect, setShowChannelSelect] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [expandedErrors, setExpandedErrors] = useState<string[]>([]);

  // Batch selection state
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);
  const [batchStep, setBatchStep] = useState<"none" | "channels" | "validation" | "fix_issues" | "progress" | "success" | "partial_errors" | "all_failed">("none");
  const [batchChannels, setBatchChannels] = useState<string[]>(ALL_CHANNELS.slice(0, 4));

  // Portal container inside Table-bottom's parent (injects batch bar in place of pagination)
  const [batchBarPortalEl, setBatchBarPortalEl] = useState<HTMLElement | null>(null);
  const isBatchMode = selectedCarIds.length > 0 && !activeCarId;
  useEffect(() => {
    if (!isBatchMode) { setBatchBarPortalEl(null); return; }
    // Find Table-bottom's parent flex container and append a portal slot
    const tableBottom = document.querySelector('[data-name="Table-bottom"]');
    const parent = tableBottom?.parentElement;
    if (!parent) return;
    const el = document.createElement("div");
    el.style.cssText = "width:100%;flex-shrink:0;";
    parent.appendChild(el);
    setBatchBarPortalEl(el);
    return () => { try { parent.removeChild(el); } catch {} setBatchBarPortalEl(null); };
  }, [isBatchMode]);

  const activeCar   = CARS.find((c) => c.id === activeCarId)   ?? null;
  const builderCar  = CARS.find((c) => c.id === builderCarId)  ?? null;
  const getCarState = (id: string) => carStates[id] ?? DEFAULT_CAR_STATE;

  // Progress animation
  useEffect(() => {
    const id = activeCarId || builderCarId;
    if (!id) { setProgressStep(0); return; }
    const st = getCarState(id);
    if (st.publishState !== "progress") { setProgressStep(0); return; }

    const channels = st.channels;
    setProgressStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    channels.forEach((_, i) => {
      timers.push(setTimeout(() => setProgressStep(i + 1), (i + 1) * 900));
    });
    timers.push(setTimeout(() => {
      const isBMW = id === BMW_ID;
      if (isBMW) {
        const succeeded = channels.filter(ch => BMW_SUCCEED_CHANNELS.includes(ch));
        const failed    = channels.filter(ch => BMW_FAIL_CHANNELS.includes(ch));
        setCarStates(prev => ({ ...prev, [id]: { channels, publishState: "partial_error", publishedChannels: succeeded, failedChannels: failed } }));
        setExpandedErrors(failed);
      } else {
        setCarStates(prev => ({ ...prev, [id]: { channels, publishState: "published", publishedChannels: channels, failedChannels: [] } }));
      }
    }, channels.length * 900 + 600));
    return () => timers.forEach(clearTimeout);
  }, [carStates[activeCarId ?? builderCarId ?? ""]?.publishState, activeCarId, builderCarId]);

  // Dashboard click handler
  const handleDashboardClick = useCallback((e: React.MouseEvent) => {
    if (activeCarId) return;
    if (batchStep !== "none") return; // Batch modal open — don't process
    const target = e.target as HTMLElement;

    // Row checkbox (td1) click → toggle single car selection
    const td1 = target.closest('[data-name="td1"]');
    if (td1) {
      const row = td1.closest('[data-name="tr.inv-row"]');
      if (row) {
        const allRows = document.querySelectorAll('[data-name="tr.inv-row"]');
        const idx = Array.from(allRows).indexOf(row as Element);
        if (idx >= 0 && idx < CARS.length) {
          const carId = CARS[idx].id;
          setSelectedCarIds(prev => prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]);
          return;
        }
      }
      return;
    }

    // Header checkbox (th1) click → toggle all
    const th1 = target.closest('[data-name="th1"]');
    if (th1) {
      setSelectedCarIds(prev => prev.length === CARS.length ? [] : CARS.map(c => c.id));
      return;
    }

    // Existing: Publish / Edit buttons
    const pEl = target.closest("p");
    if (!pEl) return;
    const text = pEl.textContent?.trim();
    if (text === "Publish" || text === "Edit") {
      const row = pEl.closest('[data-name="tr.inv-row"]');
      if (row) {
        const allRows = document.querySelectorAll('[data-name="tr.inv-row"]');
        const idx = Array.from(allRows).indexOf(row as Element);
        if (idx >= 0 && idx < CARS.length) {
          if (text === "Publish") { setActiveCarId(CARS[idx].id); }
          if (text === "Edit") {
            setBuilderCarId(CARS[idx].id);
            setBuilderSidebarVisible(false);
            setScreen("builder");
          }
        }
      }
    }
  }, [activeCarId, batchStep]);

  const handleClose = () => {
    if (activeCarId) {
      setCarStates(prev => { const n = { ...prev }; delete n[activeCarId]; return n; });
    }
    setActiveCarId(null);
    setShowChannelSelect(false);
    setExpandedErrors([]);
  };

  const handleAddChannels    = () => setShowChannelSelect(true);
  const handleCloseChSelect  = () => setShowChannelSelect(false);

  const handleValidate = (carId: string, selectedChannels: string[]) => {
    setCarStates(prev => ({
      ...prev,
      [carId]: { ...(prev[carId] ?? DEFAULT_CAR_STATE), channels: selectedChannels, publishState: "unpublished" },
    }));
    setShowChannelSelect(false);
  };

  const handlePublish = (carId: string) => {
    setCarStates(prev => ({
      ...prev,
      [carId]: { ...(prev[carId] ?? DEFAULT_CAR_STATE), publishState: "progress" },
    }));
  };

  const handleToggleError = (ch: string) => {
    setExpandedErrors(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]);
  };

  const handleGoToBuilder = () => {
    // Open builder for BMW in its current error state
    setBuilderCarId(BMW_ID);
    setBuilderSidebarVisible(true);
    setScreen("builder");
    setActiveCarId(null);
    setShowChannelSelect(false);
  };

  const handleGoToDashboard = () => {
    // Reset builder car state when leaving builder
    if (builderCarId) {
      setCarStates(prev => { const n = { ...prev }; delete n[builderCarId]; return n; });
    }
    setBuilderCarId(null);
    setBuilderSidebarVisible(false);
    setShowChannelSelect(false);
    setExpandedErrors([]);
    setScreen("dashboard");
  };

  if (screen === "builder" && builderCar) {
    const cState = getCarState(builderCar.id);
    return (
      <div className="size-full relative">
        <style>{`
          .hide-modal [data-name="div.modal-overlay"] { display: none !important; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        <BuilderScreen
          car={builderCar}
          carState={cState}
          progressStep={progressStep}
          sidebarVisible={builderSidebarVisible}
          showChannelSelect={showChannelSelect}
          expandedErrors={expandedErrors}
          onGoToDashboard={handleGoToDashboard}
          onShowSidebar={() => setBuilderSidebarVisible(true)}
          onAddChannels={handleAddChannels}
          onPublish={() => handlePublish(builderCar.id)}
          onCloseChannelSelect={handleCloseChSelect}
          onValidate={(ch) => handleValidate(builderCar.id, ch)}
          onToggleError={handleToggleError}
        />
      </div>
    );
  }

  return (
    <div className="size-full relative">
      <style>{`
        .hide-modal [data-name="div.modal-overlay"] { display: none !important; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        button, [data-name^="button"] { cursor: pointer; }
        button:hover:not(:disabled), [data-name^="button"]:hover { filter: brightness(0.93); transition: filter 0.1s; }
        ${buildBatchCSS(selectedCarIds)}
      `}</style>
      <div className="size-full hide-modal" onClick={handleDashboardClick}>
        <Ep1A1IdleUnpublished />
      </div>

      {/* Batch action bar — portalled into Table's flex container, replacing pagination */}
      {batchBarPortalEl && createPortal(
        <BatchActionBar
          count={selectedCarIds.length}
          onDeselect={() => setSelectedCarIds([])}
          onPublishSelected={() => { setBatchChannels(ALL_CHANNELS.slice(0, 4)); setBatchStep("channels"); }}
          onCancel={() => setSelectedCarIds([])}
        />,
        batchBarPortalEl
      )}

      {/* Single-car publish modal */}
      {activeCar && (
        <PublishModal
          car={activeCar} carState={getCarState(activeCar.id)}
          progressStep={progressStep} showChannelSelect={showChannelSelect}
          expandedErrors={expandedErrors}
          onClose={handleClose} onAddChannels={handleAddChannels}
          onPublish={() => handlePublish(activeCar.id)}
          onCloseChannelSelect={handleCloseChSelect}
          onValidate={(ch) => handleValidate(activeCar.id, ch)}
          onToggleError={handleToggleError}
          onGoToBuilder={handleGoToBuilder}
        />
      )}

      {/* EP3·B2 — Batch channel selector (Step 1) */}
      {batchStep === "channels" && (
        <BatchChannelSelectorModal
          vehicleCount={selectedCarIds.length}
          selectedChannels={batchChannels}
          onToggle={(ch) => setBatchChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch])}
          onCancel={() => setBatchStep("none")}
          onNext={() => setBatchStep("validation")}
        />
      )}

      {/* EP3·B3 — Batch validation summary (Step 2) */}
      {batchStep === "validation" && (
        <BatchValidationModal
          selectedCarIds={selectedCarIds}
          selectedChannels={batchChannels}
          onBack={() => setBatchStep("channels")}
          onFixIssues={() => setBatchStep("fix_issues")}
          onProceed={() => setBatchStep("progress")}
          onClose={() => setBatchStep("none")}
        />
      )}

      {/* EP3·B3a — Fix Issues (Builder form) */}
      {batchStep === "fix_issues" && (
        <BatchFixIssuesModal
          onBackToValidation={() => setBatchStep("validation")}
          onClose={() => setBatchStep("none")}
        />
      )}

      {/* EP3·B4 — Batch Progress */}
      {batchStep === "progress" && (
        <BatchProgressModal
          selectedCarIds={selectedCarIds}
          selectedChannels={batchChannels}
          onDone={() => setBatchStep(getBatchResult(selectedCarIds, batchChannels))}
        />
      )}

      {/* EP3·B5 — Batch Success */}
      {batchStep === "success" && (
        <BatchSuccessModal
          selectedCarIds={selectedCarIds}
          selectedChannels={batchChannels}
          onDone={() => { setBatchStep("none"); setSelectedCarIds([]); }}
        />
      )}

      {/* EP3·B6 — Batch Partial Errors */}
      {batchStep === "partial_errors" && (
        <BatchPartialErrorsModal
          selectedCarIds={selectedCarIds}
          selectedChannels={batchChannels}
          onDone={() => { setBatchStep("none"); setSelectedCarIds([]); }}
        />
      )}

      {/* EP3·B7 — Batch All Failed */}
      {batchStep === "all_failed" && (
        <BatchAllFailedModal
          selectedCarIds={selectedCarIds}
          selectedChannels={batchChannels}
          onDone={() => { setBatchStep("none"); setSelectedCarIds([]); }}
        />
      )}
    </div>
  );
}
