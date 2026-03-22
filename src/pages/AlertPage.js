export default function AlertPage() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-112px)] px-6 text-center">
      <h2
        className="text-white text-[52px] font-bold mb-6 drop-shadow-md"
        style={{ fontFamily: "'Goldman', sans-serif" }}
      >
        {'\uC54C\uB9BC \uBC1B\uAE30'}
      </h2>
      <p
        className="text-white/80 text-xl max-w-2xl leading-relaxed"
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        {
          '\uC0C8\uB85C\uC6B4 \uC720\uCD9C \uC0AC\uACE0\uAC00 \uBC1C\uC0DD\uD558\uBA74 \uC774\uBA54\uC77C\uB85C \uC989\uC2DC \uC54C\uB9BC\uC744 \uBC1B\uC544\uBCF4\uC138\uC694. \uC5B4\uB5A4 \uC0C1\uD669\uC5D0\uC11C\uB3C4 \uBE60\uB974\uAC8C \uB300\uC751\uD560 \uC218 \uC788\uB3C4\uB85D \uC2E4\uC2DC\uAC04 \uBAA8\uB2C8\uD130\uB9C1\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.'
        }
      </p>
    </main>
  );
}
