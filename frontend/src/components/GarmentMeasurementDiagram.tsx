'use client';

import React from 'react';

interface GarmentDiagramProps {
  type: 'upper' | 'lower';
}

export default function GarmentMeasurementDiagram({ type }: GarmentDiagramProps) {
  if (type === 'upper') {
    return (
      <div className="w-full flex flex-col items-center">
        <svg
          viewBox="0 0 460 320"
          className="w-full max-w-md h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrowUpper"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#801414" />
            </marker>
          </defs>

          {/* Background Canvas */}
          <rect width="460" height="320" rx="12" fill="#FAF9F7" />

          {/* T-Shirt Garment Outline */}
          <path
            d="
              M 195 48
              C 210 65 250 65 265 48
              L 335 78
              L 380 142
              L 338 170
              L 305 135
              L 305 272
              L 155 272
              L 155 135
              L 122 170
              L 80 142
              L 125 78
              Z
            "
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Neckline Ribbing Inner Curve */}
          <path
            d="M 195 48 C 210 58 250 58 265 48"
            fill="none"
            stroke="#737373"
            strokeWidth="1.8"
          />
          <path
            d="M 190 46 C 210 68 250 68 270 46"
            fill="none"
            stroke="#171717"
            strokeWidth="2"
          />

          {/* Sleeve Seams */}
          <path d="M 125 78 L 155 135" fill="none" stroke="#A3A3A3" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 335 78 L 305 135" fill="none" stroke="#A3A3A3" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Hem line subtle stitch */}
          <line x1="155" y1="264" x2="305" y2="264" stroke="#D4D4D4" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* DIMENSION A: CHEST (Pit to Pit) */}
          <line
            x1="158"
            y1="148"
            x2="302"
            y2="148"
            stroke="#801414"
            strokeWidth="1.8"
            markerStart="url(#arrowUpper)"
            markerEnd="url(#arrowUpper)"
          />
          <rect x="202" y="137" width="56" height="22" rx="4" fill="#801414" />
          <text
            x="230"
            y="152"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            A · CHEST
          </text>

          {/* DIMENSION B: LENGTH (High Shoulder to Hem) */}
          <line
            x1="240"
            y1="49"
            x2="240"
            y2="268"
            stroke="#801414"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            markerStart="url(#arrowUpper)"
            markerEnd="url(#arrowUpper)"
          />
          <rect x="208" y="195" width="64" height="22" rx="4" fill="#801414" />
          <text
            x="240"
            y="210"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            B · LENGTH
          </text>

          {/* DIMENSION C: SHOULDER (Seam to Seam) */}
          <line
            x1="128"
            y1="68"
            x2="332"
            y2="68"
            stroke="#801414"
            strokeWidth="1.8"
            markerStart="url(#arrowUpper)"
            markerEnd="url(#arrowUpper)"
          />
          <rect x="194" y="57" width="72" height="22" rx="4" fill="#801414" />
          <text
            x="230"
            y="72"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            C · SHOULDER
          </text>

          {/* DIMENSION D: SLEEVE LENGTH */}
          <line
            x1="337"
            y1="72"
            x2="382"
            y2="136"
            stroke="#801414"
            strokeWidth="1.8"
            markerStart="url(#arrowUpper)"
            markerEnd="url(#arrowUpper)"
          />
          <rect x="360" y="85" width="60" height="20" rx="4" fill="#801414" />
          <text
            x="390"
            y="99"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            D · SLEEVE
          </text>
        </svg>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 w-full text-[10px] text-neutral-600 font-medium">
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
            <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">A</span>
            <span>Chest (Pit-to-Pit)</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
            <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">B</span>
            <span>Total Garment Length</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
            <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">C</span>
            <span>Shoulder Seam Width</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
            <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">D</span>
            <span>Sleeve Length</span>
          </div>
        </div>
      </div>
    );
  }

  // LOWER BODY DIAGRAM (Sweatpants / Cargo / Pants)
  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox="0 0 460 340"
        className="w-full max-w-md h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="arrowLower"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#801414" />
          </marker>
        </defs>

        {/* Background Canvas */}
        <rect width="460" height="340" rx="12" fill="#FAF9F7" />

        {/* Ribbed Elasticated Waistband */}
        <rect
          x="165"
          y="32"
          width="130"
          height="18"
          rx="3"
          fill="#EEEEEE"
          stroke="#171717"
          strokeWidth="2.2"
        />
        {/* Drawstrings */}
        <path d="M 226 50 Q 220 70 216 88" fill="none" stroke="#171717" strokeWidth="2" />
        <path d="M 234 50 Q 240 70 244 88" fill="none" stroke="#171717" strokeWidth="2" />
        <circle cx="216" cy="89" r="2.5" fill="#801414" />
        <circle cx="244" cy="89" r="2.5" fill="#801414" />

        {/* Pants Body & Legs */}
        <path
          d="
            M 165 50
            C 152 80 150 115 150 155
            L 150 288
            L 204 288
            L 218 142
            Q 230 128 242 142
            L 256 288
            L 310 288
            L 310 155
            C 310 115 308 80 295 50
            Z
          "
          fill="#FFFFFF"
          stroke="#171717"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Side Slash Pockets */}
        <path d="M 165 72 L 182 108" fill="none" stroke="#A3A3A3" strokeWidth="1.8" />
        <path d="M 295 72 L 278 108" fill="none" stroke="#A3A3A3" strokeWidth="1.8" />

        {/* Hem stitching */}
        <line x1="150" y1="280" x2="204" y2="280" stroke="#D4D4D4" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="256" y1="280" x2="310" y2="280" stroke="#D4D4D4" strokeWidth="1.2" strokeDasharray="2 2" />

        {/* DIMENSION A: WAIST (Relaxed to Stretched) */}
        <line
          x1="168"
          y1="22"
          x2="292"
          y2="22"
          stroke="#801414"
          strokeWidth="1.8"
          markerStart="url(#arrowLower)"
          markerEnd="url(#arrowLower)"
        />
        <rect x="200" y="11" width="60" height="20" rx="4" fill="#801414" />
        <text
          x="230"
          y="25"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          A · WAIST
        </text>

        {/* DIMENSION B: HIP */}
        <line
          x1="152"
          y1="108"
          x2="308"
          y2="108"
          stroke="#801414"
          strokeWidth="1.8"
          markerStart="url(#arrowLower)"
          markerEnd="url(#arrowLower)"
        />
        <rect x="208" y="97" width="44" height="20" rx="4" fill="#801414" />
        <text
          x="230"
          y="111"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          B · HIP
        </text>

        {/* DIMENSION C: INSEAM (Crotch to Hem) */}
        <line
          x1="235"
          y1="138"
          x2="260"
          y2="284"
          stroke="#801414"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          markerStart="url(#arrowLower)"
          markerEnd="url(#arrowLower)"
        />
        <rect x="250" y="200" width="58" height="20" rx="4" fill="#801414" />
        <text
          x="279"
          y="214"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          C · INSEAM
        </text>

        {/* DIMENSION D: OUTSEAM / TOTAL LENGTH */}
        <line
          x1="130"
          y1="34"
          x2="130"
          y2="286"
          stroke="#801414"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          markerStart="url(#arrowLower)"
          markerEnd="url(#arrowLower)"
        />
        <rect x="85" y="150" width="74" height="22" rx="4" fill="#801414" />
        <text
          x="122"
          y="165"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          D · LENGTH
        </text>

        {/* DIMENSION E: LEG OPENING / HEM */}
        <line
          x1="152"
          y1="305"
          x2="202"
          y2="305"
          stroke="#801414"
          strokeWidth="1.8"
          markerStart="url(#arrowLower)"
          markerEnd="url(#arrowLower)"
        />
        <rect x="156" y="315" width="42" height="18" rx="3" fill="#801414" />
        <text
          x="177"
          y="327"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          E · HEM
        </text>
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2.5 w-full text-[10px] text-neutral-600 font-medium">
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
          <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">A</span>
          <span>Waist (Relaxed)</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
          <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">B</span>
          <span>Hip Across Seat</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
          <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">C</span>
          <span>Inner Inseam</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200">
          <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">D</span>
          <span>Total Outseam</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-neutral-200 col-span-2 sm:col-span-1">
          <span className="w-4 h-4 rounded-full bg-[#801414] text-white flex items-center justify-center font-bold text-[9px]">E</span>
          <span>Leg Hem Width</span>
        </div>
      </div>
    </div>
  );
}
