import svgPaths from "./svg-ci6bfvfwom";
import imgYusukeKamiyamaneFuguePlus161 from "figma:asset/b8f052ae1908c8eb8c1c9784a156079ddc75f644.png";
import imgDriveUpload1 from "figma:asset/18113d53ece71d5a7c863164839f5a0437047457.png";
import { imgGroup } from "./svg-3ul1r";

function Group() {
  return (
    <div className="absolute inset-[19.53%_0.16%_3.46%_0.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.022px] mask-size-[55.508px_12.97px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.4198 12.97">
        <g id="Group">
          <path d={svgPaths.p35ed970} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p1031db00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.pfcde740} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p23fb5e80} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p18ff6ef2} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p36338f80} fill="var(--fill-0, white)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[19.4%_0_3.59%_0.5%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function ModeraIdEVn3HUk() {
  return (
    <div className="col-1 h-[16.842px] ml-0 mt-[4.15px] overflow-clip relative row-1 w-[55.79px]" data-name="Modera_idEVn3hUk9_1 1">
      <ClipPathGroup />
    </div>
  );
}

function Strong() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[25.138px] items-start ml-[58.3px] mt-0 relative row-1 w-[81.697px]" data-name="strong">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18.853px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">
        <p className="leading-[normal]">salesfront</p>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Logo">
      <ModeraIdEVn3HUk />
      <Strong />
    </div>
  );
}

function Fix1CombinedLogo() {
  return (
    <div className="h-full relative shrink-0" data-name="Fix 1: combined logo">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] h-full items-center pb-[2px] pl-[16px] pr-[16.667px] relative">
          <Logo />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_12_7625)" id="Frame">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d={svgPaths.p1d401b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="1.2" />
        </g>
        <defs>
          <clipPath id="clip0_12_7625">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DivHelpBtn() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="div.help-btn">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5px] items-center px-[10px] relative size-full">
          <Frame />
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10.5px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
            <p className="leading-[normal]">Hello there, I am here if need help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpanPubStatusPill() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center px-[9px] py-[3px] relative rounded-[10px] shrink-0" data-name="span.pub-status-pill">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10.5px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">
        <p className="leading-[normal]">Publishing</p>
      </div>
    </div>
  );
}

function DivExitBtn() {
  return (
    <div className="h-full relative shrink-0" data-name="div.exit-btn">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-r-[0.67px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center px-[10px] relative">
        <SpanPubStatusPill />
      </div>
    </div>
  );
}

function PersonFill() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="person-fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="person-fill">
          <path d={svgPaths.p30f28770} fill="var(--fill-0, white)" fillOpacity="0.8" />
          <path d={svgPaths.p367e3500} fill="var(--fill-0, white)" fillOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function DivUserBtn() {
  return (
    <div className="h-full relative shrink-0" data-name="div.user-btn">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] h-full items-center px-[10px] py-[8px] relative">
          <PersonFill />
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">
            <p className="leading-[normal]">Andy Baldwin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DivExitBtn1() {
  return (
    <div className="h-full relative shrink-0 w-[40px]" data-name="div.exit-btn">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-r-[0.67px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <div className="relative shrink-0 size-[16px]" data-name="question-circle-fill">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2ce27600} fill="var(--fill-0, white)" fillOpacity="0.8" id="Subtract" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DivUserBtn1() {
  return (
    <div className="h-full relative shrink-0" data-name="div.user-btn">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] h-full items-center px-[12px] py-[8px] relative">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="bxs-left-arrow-circle">
            <div className="absolute flex inset-0 items-center justify-center">
              <div className="flex-none rotate-180 size-[16px]">
                <div className="relative size-full" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p14ee6c00} fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">
            <p className="leading-[normal]">Exit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fix5ProperRightSide() {
  return (
    <div className="h-full relative shrink-0" data-name="Fix 5: proper right side">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <DivUserBtn />
        <DivExitBtn1 />
        <DivUserBtn1 />
      </div>
    </div>
  );
}

function TopNavGroup() {
  return (
    <div className="content-stretch flex h-[40px] items-start pb-[0.667px] relative shrink-0 w-full" data-name="TOP NAV Group">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-b-[0.667px] border-solid inset-0 pointer-events-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)]" />
      <Fix1CombinedLogo />
      <DivHelpBtn />
      <DivExitBtn />
      <Fix5ProperRightSide />
    </div>
  );
}

function DivTopNavLink() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Dashboard</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="speedometer">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[6.28%_-0.06%_6.22%_0.06%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.pb661180} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function DivTopNavLink1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Pipe</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="steering">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p3bf20500} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function CarFrontFill() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="car-front-fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="car-front-fill">
          <path d={svgPaths.p3cc0d780} fill="var(--fill-0, white)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function DivTopNavLink2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Cars</p>
      </div>
      <CarFrontFill />
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function CarFrontFill1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="car-front-fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="car-front-fill">
          <path d={svgPaths.p3cc0d780} fill="var(--fill-0, #1E6080)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1e6080] text-[11.5px] whitespace-nowrap">
          <p className="leading-[normal]">Used Cars</p>
        </div>
        <CarFrontFill1 />
      </div>
    </div>
  );
}

function DivTopNavLink3() {
  return (
    <div className="bg-[#dce8f0] content-stretch flex h-[32px] items-center justify-center pt-[0.335px] px-[12.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute border-[#0f3040] border-l-[0.67px] border-r-[0.67px] border-solid border-t-[0.67px] inset-[-0.335px_-0.335px_0_-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <Frame2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[13.32%_0_13.35%_0]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0007 11.7336">
        <g id="Group 317">
          <path d={svgPaths.p19132200} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p22da400} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p23ae57f0} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p144a9e00} fill="var(--fill-0, white)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function DivTopNavLink4() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Customers</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="people">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <Group1 />
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function DivTopNavLink5() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Tools</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="wrench-adjustable">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <div className="absolute inset-[0_0_1.52%_1.52%]" data-name="Subtract">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7566 15.7566">
              <g id="Subtract">
                <path d={svgPaths.p2ea0be80} fill="var(--fill-0, white)" />
                <path d={svgPaths.p39080500} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function DivTopNavLink6() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Trade-In</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="sync-alt">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.pee02d70} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function DivTopNavLink7() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Test Drive</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="play-circle-fill">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p5cdde00} fill="var(--fill-0, white)" id="Subtract" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function DivTopNavLink8() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Sales</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="file-earmark-text-fill">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <div className="absolute inset-[0_12.5%]" data-name="Subtract">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
              <path d={svgPaths.p3bbc5000} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[0_0.01%_0.03%_0.03%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9955 15.9944">
        <g id="Group 318">
          <path d={svgPaths.p1dbc2300} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p17fa2380} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function DivTopNavLink9() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Chat</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="chatbubbles">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <Group2 />
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function DivTopNavLink10() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12.335px] py-[0.335px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="div.top-nav-link">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#314d65] inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px] to-[#27485c]" />
      <div aria-hidden="true" className="absolute border-[#0f3040] border-[0.67px] border-solid inset-[-0.335px] pointer-events-none rounded-tl-[4.335px] rounded-tr-[4.335px]" />
      <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Queue</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="sort-amount-down">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[6.25%_0]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p25c1bc40} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[-0.335px] pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

function TopLevelNavLinks() {
  return (
    <div className="relative shrink-0 w-full" data-name="Top-level nav links">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[2px] items-end pt-[16px] px-[6px] relative w-full">
          <DivTopNavLink />
          <DivTopNavLink1 />
          <DivTopNavLink2 />
          <DivTopNavLink3 />
          <DivTopNavLink4 />
          <DivTopNavLink5 />
          <DivTopNavLink6 />
          <DivTopNavLink7 />
          <DivTopNavLink8 />
          <DivTopNavLink9 />
          <DivTopNavLink10 />
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#2a4f6e] items-start relative shrink-0 to-[#1a3347] w-full" data-name="TOP NAV">
      <TopNavGroup />
      <TopLevelNavLinks />
    </div>
  );
}

function ASubnavTab() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">← Inventory</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab1() {
  return (
    <div className="bg-gradient-to-b from-[#e9edf1] h-full relative shrink-0 to-white" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[#4a9ec4] border-solid border-t-[0.667px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center pt-[0.667px] px-[14px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2d7fa8] text-[11.5px] whitespace-nowrap">
          <p className="leading-[normal]">Details</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab2() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.99px] h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Extras</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab3() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Pricing</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab4() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Trade-In</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab5() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Financing</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab6() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4.01px] h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Notes</p>
        </div>
      </div>
    </div>
  );
}

function ASubnavTab7() {
  return (
    <div className="h-full relative shrink-0" data-name="a.subnav-tab">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l-[0.667px] border-r-[0.667px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4.01px] h-full items-center px-[14.667px] relative">
        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.5px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Agreement</p>
        </div>
      </div>
    </div>
  );
}

function SubTabsFix() {
  return (
    <div className="bg-gradient-to-b flex-[1_0_0] from-[#5fcee5] h-[32px] min-h-px min-w-px relative rounded-[4px] to-[#50c2d6]" data-name="SUB TABS (Fix 3">
      <div className="content-stretch flex items-start px-[8px] relative size-full">
        <ASubnavTab />
        <ASubnavTab1 />
        <ASubnavTab2 />
        <ASubnavTab3 />
        <ASubnavTab4 />
        <ASubnavTab5 />
        <ASubnavTab6 />
        <ASubnavTab7 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative w-full">
        <SubTabsFix />
      </div>
    </div>
  );
}

function DivBuilderSectionHead() {
  return (
    <div className="bg-gradient-to-b from-[#f0f6fa] relative shrink-0 to-[#ddeef7] w-full" data-name="div.builder-section__head">
      <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7px] pt-[6px] px-[10px] relative w-full">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
          <p className="leading-[normal]">Vehicle identification</p>
        </div>
      </div>
    </div>
  );
}

function LabelJqLabel() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Make *</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-auto relative size-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[normal]">Volkswagen</p>
        </div>
      </div>
    </div>
  );
}

function InputJqInput() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="input.jq-input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
          <Div2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Div1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <LabelJqLabel />
      <InputJqInput />
    </div>
  );
}

function LabelJqLabel1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Model *</p>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-auto relative size-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[normal]">Golf</p>
        </div>
      </div>
    </div>
  );
}

function InputJqInput1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="input.jq-input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
          <Div4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Div3() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <LabelJqLabel1 />
      <InputJqInput1 />
    </div>
  );
}

function LabelJqLabel2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Year *</p>
      </div>
    </div>
  );
}

function Div6() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-auto relative size-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[normal]">2019</p>
        </div>
      </div>
    </div>
  );
}

function InputJqInput2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="input.jq-input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
          <Div6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Div5() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <LabelJqLabel2 />
      <InputJqInput2 />
    </div>
  );
}

function LabelJqLabel3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Reg. number</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-auto relative size-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[normal]">ABC-123</p>
        </div>
      </div>
    </div>
  );
}

function InputJqInput3() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="input.jq-input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
          <Div8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Div7() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="div">
      <LabelJqLabel3 />
      <InputJqInput3 />
    </div>
  );
}

function LabelJqLabel4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">VIN</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-auto relative size-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[normal]">WVWZZZ1KZ...</p>
        </div>
      </div>
    </div>
  );
}

function InputJqInput4() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="input.jq-input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
          <Div10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Div9() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="div">
      <LabelJqLabel4 />
      <InputJqInput4 />
    </div>
  );
}

function Div() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full" data-name="div">
      <Div1 />
      <Div3 />
      <Div5 />
      <Div7 />
      <Div9 />
    </div>
  );
}

function DivBuilderSectionBody() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.builder-section__body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative w-full">
        <Div />
      </div>
    </div>
  );
}

function DivBuilderSection() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 w-full" data-name="div.builder-section">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative w-full">
        <DivBuilderSectionHead />
        <DivBuilderSectionBody />
      </div>
    </div>
  );
}

function DivBuilderSectionHead1() {
  return (
    <div className="bg-gradient-to-b from-[#f0f6fa] relative shrink-0 to-[#ddeef7] w-full" data-name="div.builder-section__head">
      <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7px] pt-[6px] px-[10px] relative w-full">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
          <p className="leading-[normal]">Technical data</p>
        </div>
      </div>
    </div>
  );
}

function LabelJqLabel5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Mileage (km) *</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">78200</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div13 />
        </div>
      </div>
    </div>
  );
}

function Div12() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-1 self-start shrink-0" data-name="div">
      <LabelJqLabel5 />
      <SelectJqSelect />
    </div>
  );
}

function LabelJqLabel6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Fuel type *</p>
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">Diesel</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div15 />
        </div>
      </div>
    </div>
  );
}

function Div14() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="div">
      <LabelJqLabel6 />
      <SelectJqSelect1 />
    </div>
  );
}

function LabelJqLabel7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Engine (cc)</p>
      </div>
    </div>
  );
}

function Div17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">1598</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div17 />
        </div>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-1 self-start shrink-0" data-name="div">
      <LabelJqLabel7 />
      <SelectJqSelect2 />
    </div>
  );
}

function LabelJqLabel8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Power (hp)</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">115</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect3() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div19 />
        </div>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-2 self-start shrink-0" data-name="div">
      <LabelJqLabel8 />
      <SelectJqSelect3 />
    </div>
  );
}

function LabelJqLabel9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Transmission</p>
      </div>
    </div>
  );
}

function Div21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">Manual</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect4() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div21 />
        </div>
      </div>
    </div>
  );
}

function Div20() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="div">
      <LabelJqLabel9 />
      <SelectJqSelect4 />
    </div>
  );
}

function LabelJqLabel10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Color</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">Deep Black Pearl</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect5() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div23 />
        </div>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-2 self-start shrink-0" data-name="div">
      <LabelJqLabel10 />
      <SelectJqSelect5 />
    </div>
  );
}

function Div11() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full" data-name="div">
      <Div12 />
      <Div14 />
      <Div16 />
      <Div18 />
      <Div20 />
      <Div22 />
    </div>
  );
}

function DivBuilderSectionBody1() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.builder-section__body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative w-full">
        <Div11 />
      </div>
    </div>
  );
}

function DivBuilderSection1() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 w-full" data-name="div.builder-section">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative w-full">
        <DivBuilderSectionHead1 />
        <DivBuilderSectionBody1 />
      </div>
    </div>
  );
}

function DivBuilderSectionHead2() {
  return (
    <div className="bg-gradient-to-b from-[#f0f6fa] relative shrink-0 to-[#ddeef7] w-full" data-name="div.builder-section__head">
      <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[7px] pt-[6px] px-[10px] relative w-full">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] whitespace-nowrap">
          <p className="leading-[normal]">Additional details</p>
        </div>
      </div>
    </div>
  );
}

function LabelJqLabel11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Interior color</p>
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">e.g. Black leather</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect6() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div26 />
        </div>
      </div>
    </div>
  );
}

function Div25() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="div">
      <LabelJqLabel11 />
      <SelectJqSelect6 />
    </div>
  );
}

function LabelJqLabel12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Doors count</p>
      </div>
    </div>
  );
}

function Div28() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">5</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect7() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div28 />
        </div>
      </div>
    </div>
  );
}

function Div27() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="div">
      <LabelJqLabel12 />
      <SelectJqSelect7 />
    </div>
  );
}

function LabelJqLabel13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Seats</p>
      </div>
    </div>
  );
}

function Div30() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-px relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[12px]">5</p>
        </div>
      </div>
    </div>
  );
}

function SelectJqSelect8() {
  return (
    <div className="bg-white h-[32px] relative rounded-[3px] shrink-0 w-full" data-name="select.jq-select">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[11px] pr-[23px] py-[4px] relative size-full">
          <Div30 />
        </div>
      </div>
    </div>
  );
}

function Div29() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[3px] items-start justify-self-stretch pb-[2px] relative row-1 self-start shrink-0" data-name="div">
      <LabelJqLabel13 />
      <SelectJqSelect8 />
    </div>
  );
}

function Div24() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] relative shrink-0 w-full" data-name="div">
      <Div25 />
      <Div27 />
      <Div29 />
    </div>
  );
}

function LabelJqLabel14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="label.jq-label">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] w-full">
        <p className="leading-[normal]">Description</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
          <p className="leading-[normal]">Well-maintained one-owner vehicle.</p>
        </div>
      </div>
    </div>
  );
}

function TextareaJqTextarea() {
  return (
    <div className="bg-white h-[80px] relative rounded-[3px] shrink-0 w-full" data-name="textarea.jq-textarea">
      <div className="flex flex-row justify-center overflow-auto size-full">
        <div className="content-stretch flex items-start justify-center px-[7px] py-[4px] relative size-full">
          <Div32 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Div31() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-full" data-name="div">
      <LabelJqLabel14 />
      <TextareaJqTextarea />
    </div>
  );
}

function DivBuilderSectionBody2() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.builder-section__body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <Div24 />
        <Div31 />
      </div>
    </div>
  );
}

function DivBuilderSection2() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 w-full" data-name="div.builder-section">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-px relative w-full">
        <DivBuilderSectionHead2 />
        <DivBuilderSectionBody2 />
      </div>
    </div>
  );
}

function DivBuilderFormCol() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px min-w-px overflow-auto relative w-full" data-name="div.builder-form-col">
      <DivBuilderSection />
      <DivBuilderSection1 />
      <DivBuilderSection2 />
    </div>
  );
}

function ButtonJqBtn() {
  return (
    <div className="h-[24px] relative rounded-[3px] shrink-0" data-name="button.jq-btn">
      <div aria-hidden="true" className="absolute bg-clip-padding bg-gradient-to-b border-0 border-[transparent] border-solid from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
      <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center pb-[5px] pt-[3px] px-[11px] relative">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
          <p className="leading-[15.4px]">Cancel</p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function ButtonJqBtn1() {
  return (
    <div className="h-[24px] relative rounded-[3px] shrink-0" data-name="button.jq-btn">
      <div aria-hidden="true" className="absolute bg-clip-padding bg-gradient-to-b border-0 border-[transparent] border-solid from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
      <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center pb-[5px] pt-[3px] px-[11px] relative">
        <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-shadow-[0px_1px_1px_rgba(0,0,0,0.2)] text-white whitespace-nowrap">
          <p className="leading-[15.4px]">Save changes</p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function Div33() {
  return (
    <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative rounded-[4px] shrink-0 to-[#e4edf5] w-full" data-name="div">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[7px] relative size-full">
          <ButtonJqBtn />
          <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="div" />
          <ButtonJqBtn1 />
        </div>
      </div>
    </div>
  );
}

function TableBottom() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table-bottom">
      <Div33 />
    </div>
  );
}

function Table() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between overflow-clip relative rounded-[inherit] size-full">
        <DivBuilderFormCol />
        <TableBottom />
      </div>
    </div>
  );
}

function TableArea() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]" data-name="TABLE AREA">
      <div aria-hidden="true" className="absolute border-[#aec5d4] border-r-[0.667px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pl-[8px] pr-[8.667px] py-[8px] relative size-full">
        <Frame1 />
        <Table />
      </div>
    </div>
  );
}

function Div34({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="div">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] tracking-[0.5px] uppercase">
        <p className="leading-[normal]">Publishing</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="flex items-center justify-center p-[2px] shrink-0 cursor-pointer" style={{ width: 20, height: 20 }}>
          <div className="flex flex-col font-['Arial:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[16px] text-center whitespace-nowrap"><p className="leading-[16px]">✕</p></div>
        </button>
      )}
    </div>
  );
}

function SpanPubPanelTitle() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="span.pub-panel__title">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Not published</p>
      </div>
    </div>
  );
}

function ButtonJqBtn2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[11px] py-[3px] relative rounded-[3px] shrink-0" data-name="button.jq-btn">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
      <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="relative shrink-0 size-[16px]" data-name="Yusuke-Kamiyamane-Fugue-Plus.16 1">
        <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgYusukeKamiyamaneFuguePlus161} />
      </div>
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="leading-[15.4px]">Add channels</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function ButtonJqBtn3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center px-[11px] py-[3px] relative rounded-[3px] shrink-0 w-[143px]" data-name="button.jq-btn">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#5bbde0] inset-0 pointer-events-none rounded-[3px] to-[#3a9ec8]" />
      <div aria-hidden="true" className="absolute border border-[#2a7ea8] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="relative shrink-0 size-[16px]" data-name="drive-upload 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDriveUpload1} />
      </div>
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-shadow-[0px_1px_1px_rgba(0,0,0,0.2)] text-white whitespace-nowrap">
        <p className="leading-[15.4px]">Publish to channels</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="button-group">
      <ButtonJqBtn2 />
      <ButtonJqBtn3 />
    </div>
  );
}

function Div35() {
  return (
    <div className="relative shrink-0 w-full" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <SpanPubPanelTitle />
        <ButtonGroup />
      </div>
    </div>
  );
}

function DivPubPanelHeader() {
  return (
    <div className="bg-gradient-to-b from-[#f0f6fa] h-[40px] relative shrink-0 to-[#ddeef7] w-full" data-name="div.pub-panel__header">
      <div aria-hidden="true" className="absolute border-[#aec5d4] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pb-[9px] pt-[8px] px-[10px] relative size-full">
          <Div35 />
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(200,220,232,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(138,171,189,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[4.5px]" />
        </div>
      </div>
    </div>
  );
}

function DivChName() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-name">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
        <p className="leading-[normal]">Auto24</p>
      </div>
    </div>
  );
}

function DivChStatusText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-status-text">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full">
        <p className="leading-[normal]">Not published</p>
      </div>
    </div>
  );
}

function DivValBar() {
  return (
    <div className="bg-[#c8dce8] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="absolute bg-gradient-to-r from-[#3db85e] inset-[0_4%_0_0] rounded-[3px] to-[#2d8a4e]" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] pr-[3.98px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">96%</p>
      </div>
    </div>
  );
}

function DivCompletenessRow() {
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar />
      <Span />
    </div>
  );
}

function Div36() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <DivChName />
        <DivChStatusText />
        <DivCompletenessRow />
      </div>
    </div>
  );
}

function Auto() {
  return (
    <div className="gap-x-[6px] gap-y-[6px] grid grid-cols-[__16px_minmax(0,1fr)] grid-rows-[repeat(1,fit-content(100%))] pb-[9px] pt-[12px] relative shrink-0 w-full" data-name="Auto24 96">
      <div aria-hidden="true" className="absolute border-[#dce8f0] border-b border-solid inset-0 pointer-events-none" />
      <Dot />
      <Div36 />
    </div>
  );
}

function Dot1() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(200,220,232,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(138,171,189,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[4.5px]" />
        </div>
      </div>
    </div>
  );
}

function DivChName1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-name">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
        <p className="leading-[normal]">Mobile.de</p>
      </div>
    </div>
  );
}

function DivChStatusText1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-status-text">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full">
        <p className="leading-[normal]">Not published</p>
      </div>
    </div>
  );
}

function DivValBar1() {
  return (
    <div className="bg-[#c8dce8] content-stretch flex flex-[1_0_0] flex-col h-[6px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="bg-gradient-to-r flex-[1_0_0] from-[#3db85e] min-h-px min-w-px rounded-[3px] to-[#2d8a4e] w-full" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span1() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">100%</p>
      </div>
    </div>
  );
}

function DivCompletenessRow1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar1 />
      <Span1 />
    </div>
  );
}

function Div37() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <DivChName1 />
        <DivChStatusText1 />
        <DivCompletenessRow1 />
      </div>
    </div>
  );
}

function Auto4() {
  return (
    <div className="gap-x-[6px] gap-y-[6px] grid grid-cols-[__16px_minmax(0,1fr)] grid-rows-[repeat(1,fit-content(100%))] pb-[9px] pt-[12px] relative shrink-0 w-full" data-name="Auto24 101">
      <div aria-hidden="true" className="absolute border-[#dce8f0] border-b border-solid inset-0 pointer-events-none" />
      <Dot1 />
      <Div37 />
    </div>
  );
}

function Dot2() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(200,220,232,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(138,171,189,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[4.5px]" />
        </div>
      </div>
    </div>
  );
}

function DivChName2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-name">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
        <p className="leading-[normal]">SS.lv</p>
      </div>
    </div>
  );
}

function DivChStatusText2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-status-text">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full">
        <p className="leading-[normal]">Not published</p>
      </div>
    </div>
  );
}

function DivValBar2() {
  return (
    <div className="bg-[#c8dce8] content-stretch flex flex-[1_0_0] flex-col h-[6px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="bg-gradient-to-r flex-[1_0_0] from-[#3db85e] min-h-px min-w-px rounded-[3px] to-[#2d8a4e] w-full" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span2() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">100%</p>
      </div>
    </div>
  );
}

function DivCompletenessRow2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar2 />
      <Span2 />
    </div>
  );
}

function Div38() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <DivChName2 />
        <DivChStatusText2 />
        <DivCompletenessRow2 />
      </div>
    </div>
  );
}

function Auto1() {
  return (
    <div className="gap-x-[6px] gap-y-[6px] grid grid-cols-[__16px_minmax(0,1fr)] grid-rows-[repeat(1,fit-content(100%))] pb-[9px] pt-[12px] relative shrink-0 w-full" data-name="Auto24 97">
      <div aria-hidden="true" className="absolute border-[#dce8f0] border-b border-solid inset-0 pointer-events-none" />
      <Dot2 />
      <Div38 />
    </div>
  );
}

function Dot3() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(200,220,232,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(138,171,189,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[4.5px]" />
        </div>
      </div>
    </div>
  );
}

function DivChName3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-name">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
        <p className="leading-[normal]">Autoplius</p>
      </div>
    </div>
  );
}

function DivChStatusText3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-status-text">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full">
        <p className="leading-[normal]">Not published</p>
      </div>
    </div>
  );
}

function DivValBar3() {
  return (
    <div className="bg-[#c8dce8] content-stretch flex flex-[1_0_0] flex-col h-[6px] items-start justify-center min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="bg-gradient-to-r flex-[1_0_0] from-[#3db85e] min-h-px min-w-px rounded-[3px] to-[#2d8a4e] w-full" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span3() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">100%</p>
      </div>
    </div>
  );
}

function DivCompletenessRow3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar3 />
      <Span3 />
    </div>
  );
}

function Div39() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <DivChName3 />
        <DivChStatusText3 />
        <DivCompletenessRow3 />
      </div>
    </div>
  );
}

function Auto2() {
  return (
    <div className="gap-x-[6px] gap-y-[6px] grid grid-cols-[__16px_minmax(0,1fr)] grid-rows-[repeat(1,fit-content(100%))] pb-[9px] pt-[12px] relative shrink-0 w-full" data-name="Auto24 98">
      <div aria-hidden="true" className="absolute border-[#dce8f0] border-b border-solid inset-0 pointer-events-none" />
      <Dot3 />
      <Div39 />
    </div>
  );
}

function Dot4() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(200,220,232,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(138,171,189,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[4.5px]" />
        </div>
      </div>
    </div>
  );
}

function DivChName4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-name">
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[11.5px] w-full">
        <p className="leading-[normal]">City24</p>
      </div>
    </div>
  );
}

function DivChStatusText4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.ch-status-text">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a9aaa] text-[10.5px] w-full">
        <p className="leading-[normal]">Not published</p>
      </div>
    </div>
  );
}

function DivValBar4() {
  return (
    <div className="bg-[#c8dce8] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="absolute bg-gradient-to-r from-[#3db85e] inset-[0_9%_0_0] rounded-[3px] to-[#2d8a4e]" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span4() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] pr-[3.98px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">91%</p>
      </div>
    </div>
  );
}

function DivCompletenessRow4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar4 />
      <Span4 />
    </div>
  );
}

function Div40() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <DivChName4 />
        <DivChStatusText4 />
        <DivCompletenessRow4 />
      </div>
    </div>
  );
}

function Auto3() {
  return (
    <div className="gap-x-[6px] gap-y-[6px] grid grid-cols-[__16px_minmax(0,1fr)] grid-rows-[repeat(1,fit-content(100%))] pb-[8px] pt-[12px] relative shrink-0 w-full" data-name="Auto24 100">
      <Dot4 />
      <Div40 />
    </div>
  );
}

function DivPubPanelBody() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.pub-panel__body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] relative w-full">
        <Auto />
        <Auto4 />
        <Auto1 />
        <Auto2 />
        <Auto3 />
      </div>
    </div>
  );
}

function DivPubPanel() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] shrink-0 w-full" data-name="div.pub-panel">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <DivPubPanelHeader />
      <DivPubPanelBody />
    </div>
  );
}

function RightA1PublishingPanel() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Right: A1 Publishing panel">
      <DivPubPanel />
    </div>
  );
}

function RightSidebar({ content, onCloseSidebar }: { content?: React.ReactNode; onCloseSidebar?: () => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-full items-start min-h-px min-w-px overflow-auto relative rounded-[4px]" data-name="RIGHT SIDEBAR">
      <Div34 onClose={onCloseSidebar} />
      {content !== undefined ? content : <RightA1PublishingPanel />}
    </div>
  );
}

function RightSidebarContainer({ content, onCloseSidebar }: { content?: React.ReactNode; onCloseSidebar?: () => void }) {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="RIGHT SIDEBAR Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
          <RightSidebar content={content} onCloseSidebar={onCloseSidebar} />
        </div>
      </div>
    </div>
  );
}

function MainLayout({ rightSidebarContent, onCloseSidebar }: { rightSidebarContent?: React.ReactNode; onCloseSidebar?: () => void }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="MAIN LAYOUT">
      <div className="content-stretch flex gap-[10px] items-start p-[10px] relative size-full">
        <TableArea />
        <RightSidebarContainer content={rightSidebarContent} onCloseSidebar={onCloseSidebar} />
      </div>
    </div>
  );
}

function DivPageWrap({ rightSidebarContent, onCloseSidebar }: { rightSidebarContent?: React.ReactNode; onCloseSidebar?: () => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="div.page-wrap">
      <TopNav />
      <MainLayout rightSidebarContent={rightSidebarContent} onCloseSidebar={onCloseSidebar} />
    </div>
  );
}

export default function Ep2A1BuilderIdle({ rightSidebarContent, onCloseSidebar }: { rightSidebarContent?: React.ReactNode; onCloseSidebar?: () => void }) {
  return (
    <div className="bg-[#dce8f0] content-stretch flex flex-col items-start relative size-full" data-name="EP2 · A1 · Builder Idle - 27/03/2026">
      <DivPageWrap rightSidebarContent={rightSidebarContent} onCloseSidebar={onCloseSidebar} />
    </div>
  );
}