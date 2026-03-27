import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';


export default function Hero() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    navigate('/search');
  };

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
        내 정보가 유출되었는지 확인하세요
      </p>

      <div className="hero__search-wrapper">
        <form
          onSubmit={handleSearch}
          className={'hero__search-form'}
        >
          <input
            type="text"
            placeholder="조회하기를 누르시면 검색페이지로 이동합니다"
            className="hero__search-input"
          />
          <button type="submit" className="hero__search-btn">
            조회하기
          </button>
        </form>
      </div>
    </main>
  );
}