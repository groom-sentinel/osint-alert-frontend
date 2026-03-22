export default function MyPage() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-112px)] px-6 text-center">
      <h2
        className="text-white text-[52px] font-bold mb-6 drop-shadow-md"
        style={{ fontFamily: "'Goldman', sans-serif" }}
      >
        {'\uB9C8\uC774\uD398\uC774\uC9C0'}
      </h2>
      <p
        className="text-white/80 text-xl max-w-2xl leading-relaxed"
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        {'\uB0B4 \uC870\uD68C \uB0B4\uC5ED\uACFC \uC54C\uB9BC \uC124\uC815\uC744 \uAD00\uB9AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.'}
      </p>
    </main>
  );
}
