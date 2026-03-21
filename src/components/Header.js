function Frame1() {
    return (
        <div className="absolute bottom-[40px] content-stretch flex font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal gap-[100px] h-[24px] items-center leading-[normal] right-[108px] text-[20px] whitespace-nowrap">
            <p className="relative shrink-0">서비스 소개</p>
            <p className="relative shrink-0">유출정보 조회하기</p>
            <p className="relative shrink-0">알림 받기</p>
            <p className="relative shrink-0">공지사항</p>
        </div>
    );
}

export default function Header() {
    return (
        <div className="bg-black border border-black border-solid not-italic relative size-full text-white h-[130px]">
            <a className="absolute block bottom-[-16px] font-['Allerta_Stencil:Regular',sans-serif] leading-[0] left-[73px] text-[64px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] top-[32px] w-[272px]" href="/">
                <p className="cursor-pointer decoration-solid leading-[normal] underline">Sentinel</p>
            </a>
            <Frame1 />
        </div>
    );
}