"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MemberSearchProps {
  variant?: 'main' | 'sidebar';
  showBecomeMemberButton?: boolean;
  showNotice?: boolean;
  className?: string;
  onSearch?: (memberNo: string) => void;
  initialValue?: string;
}

export default function MemberSearch({
  variant = 'sidebar',
  showBecomeMemberButton = false,
  showNotice = false,
  className = '',
  onSearch,
  initialValue = ''
}: MemberSearchProps) {
  const [memberNo, setMemberNo] = useState(initialValue);
  const router = useRouter();

  function handleClick() {
    if (onSearch) {
      onSearch(memberNo);
    } else {
      if (memberNo.trim()) {
        router.push('/search?member=' + memberNo);
      } else {
        router.push('/search');
      }
    } 
  }

  const isMain = variant === 'main';

  return (
    <div className={`bg-white ${isMain ? 'p-8 rounded-2xl' : 'p-6 rounded-xl'} shadow-sm border border-blue-100 ${className}`}>
      <h2 className={`font-bold ${isMain ? 'mb-2 text-2xl' : 'mb-4 text-lg uppercase tracking-tighter text-indigo-950'}`}>
        Certificate Search
      </h2>
      <p className={`${isMain ? 'text-gray-600 mb-6 text-sm' : 'text-gray-500 mb-2 text-xs font-semibold'}`}>
        Certificate ID / ID
      </p>

      <div className={`flex gap-2 ${!isMain ? 'mb-4' : ''}`}>
        <input
          type="text"
          placeholder="Enter ID (Letters, Numbers, etc.)"
          defaultValue={initialValue}
          onInput={(e) => setMemberNo((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
          className={`flex-1 bg-white ${isMain ? 'px-4' : 'px-3'} py-2 ${isMain ? '' : 'text-sm'} rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        />
        <button
          type="button"
          onClick={handleClick}
          className={`bg-primary text-white ${isMain ? 'px-6' : 'px-4'} py-2 rounded-lg ${isMain ? '' : 'text-xs'} font-semibold hover:bg-primary/90 transition-colors shadow-sm cursor-pointer`}
        >
          Search
        </button>
      </div>

      {showBecomeMemberButton && (
        <div className="mt-8 flex justify-center">
          <Link href="/membership" className="bg-secondary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">
            Become a member
          </Link>
        </div>
      )}

      {showNotice && (
        <div className="mt-8 bg-blue-50 text-primary p-4 rounded-xl text-xs leading-relaxed italic text-center border border-primary/20">
          ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
        </div>
      )}
    </div>
  );
}
