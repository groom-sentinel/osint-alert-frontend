import React, { useState } from 'react';
import './Hero.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_EMPTY = '이메일 주소를 입력해주세요.';
const ERROR_INVALID = '올바른 이메일 형식이 아닙니다. (sentinel@domain.com)';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);  
  const [loading, setLoading] = useState(false);  

  const validate = (value) => {
    if (!value.trim()) return ERROR_EMPTY;
    if (!EMAIL_REGEX.test(value)) return ERROR_INVALID;
    return '';
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(validate(e.target.value));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const msg = validate(email);
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    setLoading(true);          // 로딩 시작
    setResult(null);           // 이전 결과 초기화

    try {
      const res = await fetch('http://localhost:8000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      const data = await res.json();
      setResult(data);          // 결과 저장
    } catch (err) {
      setError('서버 연결에 실패했습니다. 백엔드가 실행 중인지 확인해주세요.');
    } finally {
      setLoading(false); // 로딩 종료
    }       
  };

  const hasError = Boolean(error);

  return (
    <main className="hero">
      <div className="hero__title-wrapper">
        <h1 className="hero__title-main">Have I been detected</h1>
        <div className="hero__title-by-row">
          <span className="hero__title-by">by</span>
          <span className="hero__title-sentinel">Sentinel</span>
        </div>
      </div>

      <p className="hero__description">
        내 이메일 주소가 개인정보 유출에 포함되었는지 확인하세요
      </p>

      <div className="hero__search-wrapper">
        <form
          onSubmit={handleSearch}
          className={`hero__search-form${hasError ? ' hero__search-form--error' : ''}`}
        >
          <input
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="이메일 주소를 입력하세요"
            className="hero__search-input"
          />
          <button type="submit" className="hero__search-btn">
            조회
          </button>
        </form>

        {hasError && (
          <p className="hero__error-msg">
            <span>⚠</span>
            <span>{error}</span>
          </p>
        )}
        
        {loading && (
          <p className="text-white/80 text-lg mt-6">조회 중...</p>
        )}

        {result && !loading && (
          <div className="mt-8 w-full max-w-2xl text-left">
            {result.is_leaked ? (
              <div>
                <div className="bg-red-500/30 backdrop-blur-sm border border-red-400/40 rounded-2xl px-7 py-5 mb-4">
                  <p className="text-red-300 text-xl font-bold mb-1">
                    ⚠ 유출이 감지되었습니다
                  </p>
                  <p className="text-white/90">
                    {result.email} 주소가 {result.leak_count}건의 유출 데이터에서 발견되었습니다.
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {result.records.map((record) => (
                    <li
                      key={record.id}
                      className="bg-blue-300/20 backdrop-blur-sm border border-blue-400/30 rounded-xl px-6 py-4"
                    >
                      <p className="text-white font-semibold">{record.title}</p>
                      <p className="text-white text-sm mt-1">
                        출처: {record.source_name} · 유형: {record.category}
                      </p>
                      {record.published_at && (
                        <p className="text-white text-sm">
                          날짜: {new Date(record.published_at).toLocaleDateString('ko-KR')}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl px-7 py-5">
                <p className="text-green-500 text-xl font-bold mb-1">
                  ✓ 안전합니다
                </p>
                <p className="text-white">
                  {result.email} 주소는 현재 수집된 유출 데이터에서 발견되지 않았습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
