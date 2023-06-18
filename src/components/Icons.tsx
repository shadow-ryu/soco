import { LucideProps, MessageSquare, User } from "lucide-react";

export const Icons = {
  user: User,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 256.000000 256.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path d="M490 2164 c0 -4 39 -51 88 -106 389 -445 452 -520 446 -529 -3 -5 -9 -7 -13 -5 -18 12 5 -74 31 -111 58 -85 171 -171 246 -188 17 -3 36 -13 43 -21 6 -8 15 -14 19 -14 15 0 637 686 658 727 7 13 12 67 12 133 l0 111 -43 -29 c-23 -16 -103 -65 -177 -110 -74 -44 -193 -117 -265 -162 -71 -46 -160 -100 -197 -121 l-67 -39 -36 23 c-20 12 -65 41 -100 65 -77 51 -421 264 -485 300 -144 82 -160 90 -160 76z" />
        <path d="M1874 1663 c-71 -76 -146 -156 -167 -178 -20 -22 -116 -128 -213 -235 l-177 -195 -1 -237 c-1 -174 2 -234 10 -225 6 7 54 64 107 129 78 94 105 136 142 220 62 139 80 164 168 228 60 44 85 71 125 135 109 175 113 185 123 302 4 60 11 127 14 151 4 23 4 42 2 42 -3 0 -63 -62 -133 -137z" />
        <path d="M534 1691 c11 -165 18 -189 99 -322 72 -118 77 -124 168 -188 101 -71 100 -70 209 -298 14 -28 64 -98 112 -155 47 -57 94 -113 105 -126 18 -22 18 -18 17 207 l-2 230 -270 293 c-148 161 -309 331 -357 378 l-87 85 6 -104z" />
        <path d="M771 1154 c15 -42 87 -143 115 -162 41 -26 42 -23 9 31 -22 39 -132 155 -124 131z" />
        <path d="M1714 1098 c-64 -69 -86 -131 -31 -88 29 23 71 94 65 111 -2 5 -17 -5 -34 -23z" />
      </g>
    </svg>
  ),
  github: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  commentReply: MessageSquare,
};