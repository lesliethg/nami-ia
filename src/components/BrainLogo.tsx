type BrainLogoProps = {
    className?: string;
    stroke?: string;
  };
  
  export function BrainLogo({
    className,
    stroke = "#1F2937", // slate-800
  }: BrainLogoProps) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* little lightning bolts */}
        <path
          d="M14 10 l-4 6 h5 l-3 7"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 10 l-4 6 h5 l-3 7"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 6 l-3 6 h5 l-3 7"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
  
        {/* brain outline (scribbly) */}
        <path
          d="M22 18
             c-6 0-10 4.5-10 10
             c0 4 2.2 7.2 5.2 8.8
             c-1 4.6 1.8 9.4 7.2 10.6
             c1.4 4.2 5.4 7.8 10.6 7.8
             c5.8 0 10.4-3.8 11.6-8.6
             c5.2-1.8 7.6-6.8 6.6-11.2
             c3-1.8 4.8-5 4.8-8.4
             c0-5.5-4.2-10-10-10
             c-1.2-4.6-5.6-8-11-8
             c-5.2 0-9.6 3.2-10.8 7.6
             c-0.9-0.4-2-0.6-3.2-0.6
             z"
          stroke={stroke}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
  
        {/* inner scribbles */}
        <path
          d="M24 28
             c2-3 6-3 8 0
             c2 3 6 3 8 0"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M22 36
             c2.5-2 5-2 7 0
             c2 2 5 2 7 0
             c2-2 4.5-2 7 0"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M28 22 c-2 2-2 4 0 6
             M36 22 c2 2 2 4 0 6"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
  
        {/* little neck/base */}
        <path
          d="M30 56
             c0-2 1.5-3 3-3
             c1.6 0 3 1 3 3
             v3
             c0 1-0.8 2-2 2
             h-2
             c-1.2 0-2-1-2-2
             z"
          stroke={stroke}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  