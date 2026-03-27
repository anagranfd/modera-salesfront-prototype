import imgArrowCircle3151 from "figma:asset/5ec09b9c5174d8e4e4adde0fa84dc36ff01a6ee2.png";

function SpanPubPanelTitle() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="span.pub-panel__title">
      <div className="relative shrink-0 size-[16px]" data-name="arrow-circle-315 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgArrowCircle3151} />
      </div>
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a2e3d] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">Publishing… (2/5)</p>
      </div>
    </div>
  );
}

function ButtonJqBtn() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center opacity-50 pb-[5px] pt-[3px] px-[11px] relative rounded-[3px] shrink-0" data-name="button.jq-btn">
      <div aria-hidden="true" className="absolute bg-gradient-to-b from-[#f5f9fc] inset-0 pointer-events-none rounded-[3px] to-[#ddeef7]" />
      <div aria-hidden="true" className="absolute border border-[#8aabbd] border-solid inset-0 pointer-events-none rounded-[3px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2a4a60] text-[11px] text-center text-shadow-[0px_1px_0px_rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="leading-[15.4px]">Please wait…</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.7)]" />
    </div>
  );
}

function Div() {
  return (
    <div className="relative shrink-0 w-full" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <SpanPubPanelTitle />
        <ButtonJqBtn />
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
          <Div />
        </div>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">8 of 10 operations</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a7080] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">80%</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="div">
      <Span />
      <Span1 />
    </div>
  );
}

function DivOverallProgressFill() {
  return (
    <div className="bg-gradient-to-r flex-[1_0_0] from-[#5bbde0] min-h-px min-w-px relative rounded-[8px] to-[#3a9ec8] w-[359px]" data-name="div.overall-progress__fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute bg-gradient-to-r from-[rgba(255,255,255,0)] inset-[0_0.41px_0_0] to-[rgba(255,255,255,0)] via-1/2 via-[rgba(255,255,255,0.3)]" data-name="::after" />
      </div>
    </div>
  );
}

function DivOverallProgress() {
  return (
    <div className="bg-[#c8dce8] h-[16px] relative rounded-[8px] shrink-0 w-full" data-name="div.overall-progress">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <DivOverallProgressFill />
      </div>
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Div1() {
  return (
    <div className="relative shrink-0 w-full" data-name="div">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] relative w-full">
        <Div2 />
        <DivOverallProgress />
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

function Span2() {
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
      <Span2 />
    </div>
  );
}

function Div3() {
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
    <div className="gap-x-[6px] gap-y-[6px] grid grid-cols-[__16px_minmax(0,1fr)] grid-rows-[repeat(1,fit-content(100%))] pb-[9px] pt-[13px] relative shrink-0 w-full" data-name="Auto24 96">
      <div aria-hidden="true" className="absolute border-[#dce8f0] border-b border-solid border-t inset-0 pointer-events-none" />
      <Dot />
      <Div3 />
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

function Span3() {
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
      <Span3 />
    </div>
  );
}

function Div4() {
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
      <Div4 />
    </div>
  );
}

function Dot2() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(245,192,96,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(211,156,64,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(176,120,32,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
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
      <div className="flex flex-col font-['Segoe_UI:Regular','Noto_Sans_Math:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b07820] text-[10.5px] w-full">
        <p className="leading-[normal]">⟳ Sending…</p>
      </div>
    </div>
  );
}

function DivValBar2() {
  return (
    <div className="bg-[#c8dce8] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="absolute bg-gradient-to-r from-[#e8a830] inset-[0_26%_0_0] rounded-[3px] to-[#b07820]" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span4() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] pr-[3.98px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">74%</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b07820] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">⚠</p>
      </div>
    </div>
  );
}

function DivCompletenessRow2() {
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar2 />
      <Span4 />
      <Span5 />
    </div>
  );
}

function Div5() {
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
      <Div5 />
    </div>
  );
}

function Dot3() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="dot">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] relative size-full">
        <div className="relative rounded-[4.5px] shrink-0 size-[9px]" data-name="span.ch-dot" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 9 9\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0.82731 0 0 0.82731 3.15 3.15)\\'><stop stop-color=\\'rgba(245,192,96,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(211,156,64,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(176,120,32,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
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
        <p className="leading-[normal]">Waiting…</p>
      </div>
    </div>
  );
}

function DivValBar3() {
  return (
    <div className="bg-[#c8dce8] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[3px]" data-name="div.val-bar">
      <div className="absolute bg-gradient-to-r from-[#e8a830] inset-[0_12%_0_0] rounded-[3px] to-[#b07820]" data-name="div.val-bar__fill" />
    </div>
  );
}

function Span6() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[24px] pr-[3.98px] relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a9aaa] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">88%</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0" data-name="span">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#b07820] text-[10px] whitespace-nowrap">
        <p className="leading-[normal]">⚠</p>
      </div>
    </div>
  );
}

function DivCompletenessRow3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center py-[3px] relative shrink-0 w-full" data-name="div.completeness-row">
      <DivValBar3 />
      <Span6 />
      <Span7 />
    </div>
  );
}

function Div6() {
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
      <Div6 />
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
        <p className="leading-[normal]">Waiting…</p>
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

function Span8() {
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
      <Span8 />
    </div>
  );
}

function Div7() {
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
      <Div7 />
    </div>
  );
}

function DivPubPanelBody1() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.pub-panel__body">
      <div className="content-stretch flex flex-col items-start px-[10px] relative w-full">
        <Auto />
        <Auto4 />
        <Auto1 />
        <Auto2 />
        <Auto3 />
      </div>
    </div>
  );
}

function DivPubPanelBody() {
  return (
    <div className="relative shrink-0 w-full" data-name="div.pub-panel__body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pt-[8px] relative w-full">
        <Div1 />
        <DivPubPanelBody1 />
      </div>
    </div>
  );
}

export default function DivPubPanel() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[3px] size-full" data-name="div.pub-panel">
      <div aria-hidden="true" className="absolute border border-[#aec5d4] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <DivPubPanelHeader />
      <DivPubPanelBody />
    </div>
  );
}