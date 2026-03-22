export default function NoticePage() {
  const NOTICES = [
    {
      id: 1,
      date: '2026.03.20',
      title: '\uC11C\uBE44\uC2A4 \uC624\uD508 \uC548\uB0B4',
      desc: 'Sentinel \uC11C\uBE44\uC2A4\uAC00 \uC815\uC2DD \uC624\uD508\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    },
    {
      id: 2,
      date: '2026.03.15',
      title: '\uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uC5C5\uB370\uC774\uD2B8 \uC548\uB0B4',
      desc: '\uCD5C\uC2E0 \uC720\uCD9C \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uAC00 \uBC18\uC601\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    },
    {
      id: 3,
      date: '2026.03.10',
      title: '\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68 \uC548\uB0B4',
      desc: '\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC\uBC29\uCE68\uC774 \uAC31\uC2E0\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    },
  ];

  return (
    <main className="relative z-10 flex flex-col items-center min-h-[calc(100vh-112px)] px-6 pt-16">
      <h2
        className="text-white text-[52px] font-bold mb-10 drop-shadow-md"
        style={{ fontFamily: "'Goldman', sans-serif" }}
      >
        {'\uACF5\uC9C0\uC0AC\uD56D'}
      </h2>
      <ul className="w-full max-w-2xl flex flex-col gap-4">
        {NOTICES.map((notice) => (
          <li
            key={notice.id}
            className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-7 py-5 text-left hover:bg-white/25 transition-colors cursor-pointer"
          >
            <span
              className="text-white/55 text-sm mb-1 block"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              {notice.date}
            </span>
            <p
              className="text-white text-lg font-semibold mb-1"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              {notice.title}
            </p>
            <p
              className="text-white/70 text-sm"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              {notice.desc}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
