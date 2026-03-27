// src/ServiceIntroPage.js


import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HaveIBeenDetectedBySentinel from '../components/HaveIBeenDetectedBySentinel';
//

function Frame({ categories, category, query, handleSearch, handleCategoryChange, handleQueryChange, hasError, error }) {
  return (
    <div className="bg-[#d9d9d9] h-[69px] relative rounded-[20px] shrink-0 w-[750px]">
      
      <div className="w-full">
        <form
          onSubmit={handleSearch}
          className={`w-full flex items-center justify-between bg-white rounded-2xl pl-4 pr-3 py-2 gap-3 shadow-xl transition-all${
            hasError ? ' ring-2 ring-red-400' : ''
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <label htmlFor="category" className="text-sm text-gray-500">
              분류:
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="text-gray-700 bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ fontFamily: "'Noto Sans KR', 'Inter', sans-serif" }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'group' ? '그룹' : item === 'country' ? '국가' : item === 'victim_info' ? '피해자' : item}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="조회하실 내용을 입력하세요"
              className="flex-1 text-gray-700 bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ fontFamily: "'Noto Sans KR', 'Inter', sans-serif" }}
            />
          </div>
          <button
            type="submit"
            className="bg-[#1542e4] hover:bg-[#1a4ff0] active:bg-[#1238cc] text-white font-semibold text-base px-8 py-3 rounded-xl transition-colors whitespace-nowrap"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            조회하기
          </button>
        </form>

        {hasError && (
          <p className="mt-2 text-left text-gray-200 text-sm px-2 flex items-center gap-1" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            <span>⚠</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  const location = useLocation();
  const [category, setCategory] = useState('group');
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState(['group', 'country', 'victim_info']);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        if (!res.ok) throw new Error('cat fetch failed');
        const items = await res.json();
        if (Array.isArray(items) && items.length > 0) {
          setCategories(items);
          if (!items.includes(category)) setCategory(items[0]);
        }
      } catch (_err) {
        // 기본값 유지
      }
    }

    loadCategories();

    const nextCategory = location.state?.category ?? 'group';
    setCategory(nextCategory);
    setHasError(false);
    setError('');
    setResult(null);
    setLoading(false);
  }, [location.state]);

  const validateCategory = (value) => {
    if (!value || !value.trim()) return '분류를 선택해주세요.';
    return '';
  };

  const validateQuery = (value) => {
    if (!value || !value.trim()) return '조회하실 내용을 입력해주세요.';
    return '';
  };

  const handleCategoryChange = (e) => {
    const next = e.target.value;
    setCategory(next);
    if (hasError) {
      const nextError = validateCategory(next) || validateQuery(query);
      setError(nextError);
      setHasError(Boolean(nextError));
    }
  };

  const handleQueryChange = (e) => {
    const next = e.target.value;
    setQuery(next);
    if (hasError) {
      const nextError = validateCategory(category) || validateQuery(next);
      setError(nextError);
      setHasError(Boolean(nextError));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const categoryError = validateCategory(category);
    const queryError = validateQuery(query);
    const msg = categoryError || queryError;

    if (msg) {
      setError(msg);
      setHasError(true);
      return;
    }

    setHasSearched(true);
    setError('');
    setHasError(false);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:8000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });

      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }

      const json = await res.json();
      setResult(json);
    } catch (err) {
      setError('서버 연결에 실패했습니다. 백엔드가 실행 중인지 확인해주세요.');
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-transparent flex items-center justify-center p-8 box-border">
      <div className="content-stretch flex flex-col gap-[39px] items-center relative size-full">
          <HaveIBeenDetectedBySentinel />
 
          <p className="sentinel-font-jacquarda-noto leading-[normal] min-w-full relative shrink-0 text-[20px] text-center text-white w-[min-content]" style={{ fontVariationSettings: "'wght' 400" }}>
            내 정보가 유출되었는지 확인하세요
          </p>
            <Frame
              categories={categories}
              category={category}
              query={query}
              handleSearch={handleSearch}
              handleCategoryChange={handleCategoryChange}
              handleQueryChange={handleQueryChange}
              hasError={hasError}
              error={error}
            />

        {result && !loading && (
          <div className="mt-6 w-full max-w-2xl text-left">
            {result.is_leaked ? (
              <div>
                <div className="bg-red-500/30 backdrop-blur-sm border border-red-400/40 rounded-2xl px-7 py-5 mb-4">
                  <p className="text-red-300 text-xl font-bold mb-1">⚠ 유출이 감지되었습니다</p>
                  <p className="text-white/90">
                    선택된 분류 ({category})가 유출 데이터에서 발견되었습니다.
                  </p>
                  <p className="text-white/90">
                    {result.leak_count ?? 0}건의 유출 데이터에 포함되어 있습니다.
                  </p>
                </div>

                {Array.isArray(result.records) && result.records.length > 0 && (
                  <ul className="flex flex-col gap-3">
                    {result.records.map((record) => (
                      <li key={record.id || `${record.source_name}-${record.category}`} className="bg-blue-300/20 backdrop-blur-sm border border-blue-400/30 rounded-xl px-6 py-4">
                        <p className="text-white font-semibold">{record.title || 'unnamed'}</p>
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
                )}
              </div>
            ) : (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl px-7 py-5">
                <p className="text-green-500 text-xl font-bold mb-1">✓ 안전합니다</p>
                <p className="text-white">선택된 분류 ({category})는 현재 수집된 유출 데이터에서 발견되지 않았습니다.</p>
              </div>
            )}
          </div>
        )}

            <div className="font-['Allerta_Stencil:Regular','Noto_Sans_KR:Black','Noto_Sans_KR:Regular',sans-serif] leading-[normal] relative size-full text-[0px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wght' 900" }}>
              <p className="font-['Abhaya_Libre_ExtraBold:Regular','Noto_Sans_KR:Black','Noto_Sans_KR:Regular',sans-serif] mb-0 text-[40px]" style={{ fontVariationSettings: "'wght' 900" }}>
                데이터 유출 이력
              </p>
            </div>

            <div
              className="h-[267px] relative rounded-[20px] shrink-0 w-full"
              style={{
                backgroundColor: 'transparent',
                backgroundImage: 'none',
              }}
            >
              <div aria-hidden="true" className="absolute border border-[#0cf] border-solid inset-0 pointer-events-none rounded-[20px]" />
            </div>
      </div>
    </div>
  );
}
