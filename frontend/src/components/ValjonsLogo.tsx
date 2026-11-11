'use client';

import React from 'react';
import Link from 'next/link';

interface ValjonsLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto'; // dark = white logo (on dark bg), light = black logo (on light bg)
  showMonogram?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ValjonsLogo({
  className = '',
  theme = 'auto',
  showMonogram = true,
  size = 'md',
}: ValjonsLogoProps) {
  // Height and aspect ratio sizing for exact original monogram proportions (403:252)
  const iconSizes = {
    sm: 'h-4 sm:h-5 aspect-[403/252]',
    md: 'h-5 sm:h-6.5 aspect-[403/252]',
    lg: 'h-7 sm:h-8.5 aspect-[403/252]',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg tracking-[0.18em]',
    md: 'text-lg sm:text-2xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.25em]',
  };

  return (
    <Link
      href="/"
      aria-label="VALJONS Home"
      className={`group inline-flex items-center gap-2 sm:gap-2.5 select-none transition-transform duration-200 active:scale-98 ${className}`}
    >
      {/* Official Geometric VJ Monogram directly matching client's original brand identity */}
      {showMonogram && (
        <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
          <svg
            viewBox="0 0 403 252"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-full transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-white'
                : theme === 'light'
                ? 'text-black'
                : 'text-current'
            }`}
          >
            {/* Left 'V' Piece with Inner Chevron Cut */}
            <path
              d="M 0 0 L 0 2 L 3 6 L 12 18 L 26 35 L 45 60 L 47 64 L 55 73 L 65 86 L 90 120 L 101 133 L 136 179 L 139 183 L 141 187 L 145 191 L 148 193 L 150 194 L 152 195 L 155 196 L 166 196 L 169 195 L 171 194 L 173 193 L 176 191 L 180 187 L 185 180 L 195 164 L 204 151 L 211 141 L 216 134 L 229 116 L 242 98 L 250 87 L 258 76 L 270 61 L 277 50 L 291 31 L 312 4 L 314 0 L 254 0 L 250 5 L 244 13 L 225 38 L 216 50 L 214 54 L 211 58 L 204 66 L 202 70 L 199 74 L 171 111 L 164 119 L 164 120 L 161 122 L 157 118 L 153 113 L 143 100 L 134 87 L 124 74 L 120 70 L 120 69 L 118 67 L 123 62 L 123 61 L 133 50 L 165 15 L 176 4 L 178 0 Z"
              fill="currentColor"
              fillRule="evenodd"
            />
            {/* Right 'J' Stroke with Smooth Bottom Curved Hook */}
            <path
              d="M 344 0 L 341 4 L 337 9 L 328 21 L 289 73 L 275 92 L 264 107 L 256 118 L 243 136 L 231 153 L 220 169 L 216 175 L 211 184 L 209 187 L 206 191 L 203 195 L 191 207 L 188 209 L 185 211 L 179 214 L 176 215 L 173 216 L 168 217 L 124 217 L 120 218 L 116 219 L 110 222 L 107 224 L 99 232 L 96 236 L 93 241 L 90 246 L 88 251 L 189 251 L 194 250 L 198 249 L 202 248 L 205 247 L 208 246 L 215 243 L 217 242 L 224 238 L 227 236 L 231 233 L 237 228 L 240 225 L 247 217 L 250 213 L 253 209 L 258 202 L 263 195 L 281 168 L 303 137 L 317 119 L 348 76 L 352 69 L 366 51 L 383 26 L 389 19 L 394 12 L 399 5 L 401 2 L 402 0 Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Clean Bold Wordmark in Poppins */}
      <span
        className={`font-poppins font-black uppercase leading-none transition-colors duration-300 ${textSizes[size]} ${
          theme === 'dark'
            ? 'text-white'
            : theme === 'light'
            ? 'text-black'
            : 'text-current'
        }`}
      >
        VALJONS
      </span>
    </Link>
  );
}
