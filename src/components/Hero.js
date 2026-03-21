function Frame() {
    return (
        <div className="bg-[#d9d9d9] h-[69px] relative rounded-[20px] shrink-0 w-[750px]">
            <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
            <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[41px] not-italic text-[#818181] text-[20px] top-[22.5px] whitespace-nowrap">이메일 주소</p>
            <div className="absolute bg-[#1542e4] bottom-[12px] right-[21px] rounded-[10px] top-[12px] w-[120px]" />
            <p className="absolute bottom-[21px] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic right-[120px] text-[20px] text-white top-[23px] translate-x-full w-[80px]">조회 하기</p>
        </div>
    );
}

export default function Hero () {
    return (
        <div className="content-stretch flex flex-col gap-[77px] items-center relative size-full">
            <div className="bg-clip-text bg-gradient-to-b font-['Jersey_20:Regular',sans-serif] from-[rgba(228,228,228,0.55)] leading-[0] min-w-full not-italic relative shrink-0 text-[0px] text-[transparent] text-center to-[#5099ff] w-[min-content]">
                <p className="bg-clip-text bg-gradient-to-b font-['Goldman:Regular',sans-serif] from-[rgba(228,228,228,0.55)] leading-[normal] mb-0 text-[64px] to-[#5099ff]">Have I been detected</p>
                <p>
                    <span className="bg-clip-text bg-gradient-to-b font-['Goldman:Regular',sans-serif] from-[rgba(228,228,228,0.55)] leading-[normal] not-italic text-[64px] text-[transparent] to-[#5099ff]">by</span>
                    <span className="leading-[normal] text-[96px]">{` `}</span>
                    <span className="bg-clip-text bg-gradient-to-b font-['Allerta_Stencil:Regular',sans-serif] from-[rgba(228,228,228,0.55)] leading-[normal] not-italic text-[96px] text-[transparent] to-[#5099ff]">Sentinel</span>
                </p>
            </div>
            <p className="font-['Jacquarda_Bastarda_9:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[20px] text-center text-white w-[min-content]" style={{ fontVariationSettings: "'wght' 400" }}>
                내 이메일 주소가 개인정보 유출에 포함되었는지 확인하세요
            </p>
            <Frame />
        </div>
    );
}