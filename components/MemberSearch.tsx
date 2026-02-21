"use client";

import { useState } from 'react';

interface MemberSearchProps {
  variant?: 'main' | 'sidebar';
  showBecomeMemberButton?: boolean;
  showNotice?: boolean;
  className?: string;
}

export default function MemberSearch({ 
  variant = 'sidebar', 
  showBecomeMemberButton = false, 
  showNotice = false,
  className = ''
}: MemberSearchProps) {
  const [memberNo, setMemberNo] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for member:', memberNo);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isMainVariant = variant === 'main';

  return (
    <div className={`bg-background-light-blue p-${isMainVariant ? '8' : '6'} rounded-${isMainVariant ? '2xl' : 'xl'} shadow-sm border border-blue-100 ${className}`}>
      <h2 className={`font-bold mb-${isMainVariant ? '2' : '4'} ${isMainVariant ? 'text-2xl' : 'text-lg uppercase tracking-tighter text-indigo-950'}`}>
        Member Search
      </h2>
      <p className={`text-gray-${isMainVariant ? '600' : '500'} mb-${isMainVariant ? '6' : '2'} ${isMainVariant ? 'text-sm' : 'text-xs font-semibold'}`}>
        Member NO.
      </p>
      
      <div className={`flex gap-2 ${!isMainVariant ? 'mb-4' : ''}`}>
        <input
          type="text"
          placeholder="Only Numeric no."
          value={memberNo}
          onChange={(e) => setMemberNo(e.target.value.replace(/[^0-9]/g, ''))}
          onKeyPress={handleKeyPress}
          className={`flex-1 px-${isMainVariant ? '4' : '3'} py-2 ${isMainVariant ? '' : 'text-sm'} rounded border border-gray-300 focus:outline-none focus:ring-${isMainVariant ? '2' : '1'} focus:ring-primary`}
        />
        <button 
          onClick={handleSearch}
          className={`bg-primary text-white px-${isMainVariant ? '6' : '4'} py-2 rounded ${isMainVariant ? '' : 'text-xs'} font-semibold hover:bg-primary-dark transition-colors`}
        >
          Search
        </button>
      </div>

      {showBecomeMemberButton && (
        <div className="mt-8 flex justify-center">
          <button className="bg-secondary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform active:scale-95">
            Become a member
          </button>
        </div>
      )}

      {showNotice && (
        <div className="mt-8 bg-background-blue-muted text-primary p-4 rounded-xl text-xs leading-relaxed italic text-center border border-primary/20">
          ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
        </div>
      )}
    </div>
  );
}
