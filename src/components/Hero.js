import React, { useState } from 'react';
import './Hero.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_EMPTY = '이메일 주소를 입력해주세요.';
const ERROR_INVALID = '올바른 이메일 형식이 아닙니다. (sentinel@domain.com)';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = (value) => {
    if (!value.trim()) return ERROR_EMPTY;
    if (!EMAIL_REGEX.test(value)) return ERROR_INVALID;
    return '';
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(validate(e.target.value));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const msg = validate(email);
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    console.log('조회 이메일:', email);
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
      </div>
    </main>
  );
}
