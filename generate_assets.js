const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'assets', 'images', 'athletes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 選手ごとのカラーパレット・ビジュアル設定
const athleteVisuals = {
  "kitaguchi-haruka": {
    bg1: "#8A2387", bg2: "#E94057", bg3: "#F27121",
    sportIcon: "🏹",
    initials: "HK",
    accentColor: "#FFD700",
    hairStyle: "ponytail",
    wearColor: "#D11A2A"
  },
  "sani-brown": {
    bg1: "#1A2980", bg2: "#26D0CE", bg3: "#1e3c72",
    sportIcon: "⚡",
    initials: "SB",
    accentColor: "#00F2FE",
    hairStyle: "short-fade",
    wearColor: "#FFFFFF"
  },
  "tanaka-nozomi": {
    bg1: "#11998e", bg2: "#38ef7d", bg3: "#0F2027",
    sportIcon: "🏃‍♀️",
    initials: "NT",
    accentColor: "#F9D423",
    hairStyle: "bun",
    wearColor: "#002B49"
  },
  "izumiya-shunsuke": {
    bg1: "#4A00E0", bg2: "#8E2DE2", bg3: "#2c3e50",
    sportIcon: "🚧",
    initials: "SI",
    accentColor: "#F37335",
    hairStyle: "short-wavy",
    wearColor: "#111111"
  },
  "ikee-rikako": {
    bg1: "#00c6ff", bg2: "#0072ff", bg3: "#1A2980",
    sportIcon: "🏊‍♀️",
    initials: "RI",
    accentColor: "#FF69B4",
    hairStyle: "swimming-cap",
    wearColor: "#003366"
  },
  "matsumoto-katsuhiro": {
    bg1: "#2193b0", bg2: "#6dd5ed", bg3: "#0f3443",
    sportIcon: "🏊‍♂️",
    initials: "KM",
    accentColor: "#FFE000",
    hairStyle: "swimming-cap",
    wearColor: "#1D2671"
  },
  "tamai-rikuto": {
    bg1: "#36D1DC", bg2: "#5B86E5", bg3: "#004e92",
    sportIcon: "🌊",
    initials: "RT",
    accentColor: "#70A1FF",
    hairStyle: "short",
    wearColor: "#2F3542"
  },
  "hashimoto-daiki": {
    bg1: "#C33764", bg2: "#1D2671", bg3: "#240b36",
    sportIcon: "🤸‍♂️",
    initials: "DH",
    accentColor: "#E0C3FC",
    hairStyle: "clean-part",
    wearColor: "#FFFFFF"
  },
  "oka-shinnosuke": {
    bg1: "#B993D6", bg2: "#8CA6DB", bg3: "#302b63",
    sportIcon: "🤸‍♂️",
    initials: "SO",
    accentColor: "#FFD700",
    hairStyle: "short-layer",
    wearColor: "#FFFFFF"
  },
  "abe-hifumi": {
    bg1: "#4b1248", bg2: "#f0c27b", bg3: "#240b36",
    sportIcon: "🥋",
    initials: "HA",
    accentColor: "#FFD700",
    hairStyle: "judo-short",
    wearColor: "#FFFFFF"
  },
  "abe-uta": {
    bg1: "#800080", bg2: "#ff77a9", bg3: "#3b0066",
    sportIcon: "🥋",
    initials: "UA",
    accentColor: "#FFEAA7",
    hairStyle: "bob-black",
    wearColor: "#FFFFFF"
  },
  "tsunoda-natsumi": {
    bg1: "#4568DC", bg2: "#B06AB3", bg3: "#2c3e50",
    sportIcon: "🥋",
    initials: "NT",
    accentColor: "#FAD961",
    hairStyle: "short-side",
    wearColor: "#FFFFFF"
  },
  "fujinami-akari": {
    bg1: "#f12711", bg2: "#f5af19", bg3: "#8A2387",
    sportIcon: "🤼‍♀️",
    initials: "AF",
    accentColor: "#FFF275",
    hairStyle: "braid",
    wearColor: "#D63031"
  },
  "kano-koki": {
    bg1: "#373B44", bg2: "#4286f4", bg3: "#1e3c72",
    sportIcon: "🤺",
    initials: "KK",
    accentColor: "#00E5FF",
    hairStyle: "slick",
    wearColor: "#FFFFFF"
  },
  "harimoto-tomokazu": {
    bg1: "#ff0844", bg2: "#ffb199", bg3: "#4a0072",
    sportIcon: "🏓",
    initials: "TH",
    accentColor: "#FFDF00",
    hairStyle: "forward-bangs",
    wearColor: "#0984E3"
  },
  "hayata-hina": {
    bg1: "#f857a6", bg2: "#ff5858", bg3: "#4b1248",
    sportIcon: "🏓",
    initials: "HH",
    accentColor: "#FFEFBA",
    hairStyle: "ponytail-ribbon",
    wearColor: "#D63031"
  },
  "naraoka-kodai": {
    bg1: "#0099F7", bg2: "#F11712", bg3: "#1b2a4a",
    sportIcon: "🏸",
    initials: "KN",
    accentColor: "#55EFC4",
    hairStyle: "center-part",
    wearColor: "#00B894"
  },
  "yamaguchi-akane": {
    bg1: "#a80077", bg2: "#66ff00", bg3: "#301934",
    sportIcon: "🏸",
    initials: "AY",
    accentColor: "#F9CA24",
    hairStyle: "short-neat",
    wearColor: "#E056FD"
  },
  "horigome-yuto": {
    bg1: "#232526", bg2: "#414345", bg3: "#e65c00",
    sportIcon: "🛹",
    initials: "YH",
    accentColor: "#FF9900",
    hairStyle: "cap-sideway",
    wearColor: "#2D3436"
  },
  "yoshizawa-coco": {
    bg1: "#fc4a1a", bg2: "#f7b733", bg3: "#3f2b96",
    sportIcon: "🛹",
    initials: "CY",
    accentColor: "#F368E0",
    hairStyle: "long-cap",
    wearColor: "#6C5CE7"
  },
  "shigekix": {
    bg1: "#141E30", bg2: "#243B55", bg3: "#D31027",
    sportIcon: "🤸",
    initials: "SX",
    accentColor: "#FF4757",
    hairStyle: "beanie",
    wearColor: "#2F3542"
  },
  "ami": {
    bg1: "#3A1C71", bg2: "#D76D77", bg3: "#FFAF7B",
    sportIcon: "👟",
    initials: "AY",
    accentColor: "#ECCC68",
    hairStyle: "bucket-hat",
    wearColor: "#3742FA"
  },
  "tokido": {
    bg1: "#000428", bg2: "#004e92", bg3: "#1f1c2c",
    sportIcon: "🎮",
    initials: "TK",
    accentColor: "#00FFA3",
    hairStyle: "glasses",
    wearColor: "#111111"
  },
  "kawamura-yuki": {
    bg1: "#0052D4", bg2: "#4364F7", bg3: "#6FB1FC",
    sportIcon: "🏀",
    initials: "YK",
    accentColor: "#FFC312",
    hairStyle: "short-active",
    wearColor: "#C0392B"
  },
  "hosoya-mao": {
    bg1: "#134E5E", bg2: "#71B280", bg3: "#0F2027",
    sportIcon: "⚽",
    initials: "MH",
    accentColor: "#FEE140",
    hairStyle: "fade-top",
    wearColor: "#002B49"
  }
};

function generateAthleteSvg(id, athlete) {
  const v = athleteVisuals[id] || {
    bg1: "#2b5876", bg2: "#4e4376", bg3: "#1e3c72",
    sportIcon: "🏅", initials: "JP", accentColor: "#FFD700",
    hairStyle: "short", wearColor: "#FFFFFF"
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${v.bg1}"/>
      <stop offset="60%" stop-color="${v.bg2}"/>
      <stop offset="100%" stop-color="${v.bg3}"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE000"/>
      <stop offset="100%" stop-color="#799F0C"/>
    </linearGradient>
    <radialGradient id="sunburst" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.4)"/>
    </radialGradient>
    <filter id="shadow_${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="400" height="480" rx="20" fill="url(#bgGrad_${id})"/>
  <rect width="400" height="480" rx="20" fill="url(#sunburst)"/>

  <!-- Geometric & Dynamic Pattern -->
  <circle cx="200" cy="180" r="145" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <circle cx="200" cy="180" r="125" fill="none" stroke="${v.accentColor}" stroke-opacity="0.25" stroke-dasharray="8 6" stroke-width="2"/>
  <polygon points="320,30 380,80 340,140" fill="rgba(255,255,255,0.04)"/>
  <polygon points="20,380 90,440 10,460" fill="rgba(255,255,255,0.05)"/>

  <!-- Top Badge: Aichi-Nagoya 2026 -->
  <g transform="translate(24, 24)">
    <rect width="140" height="26" rx="13" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <circle cx="14" cy="13" r="5" fill="#E60012"/>
    <text x="26" y="17" fill="#FFFFFF" font-family="'Noto Sans JP', sans-serif" font-size="11" font-weight="700" letter-spacing="1">TEAM JAPAN</text>
  </g>

  <!-- Top Right Sport Symbol -->
  <g transform="translate(330, 20)">
    <circle cx="20" cy="20" r="22" fill="rgba(0,0,0,0.3)" stroke="${v.accentColor}" stroke-width="1.5"/>
    <text x="20" y="27" text-anchor="middle" font-size="22">${v.sportIcon}</text>
  </g>

  <!-- Central Silhouette / Athlete Portrait Illustration -->
  <g filter="url(#shadow_${id})">
    <!-- Back Aura Glow -->
    <ellipse cx="200" cy="210" rx="90" ry="110" fill="${v.accentColor}" opacity="0.18"/>

    <!-- Athlete Torso / Jersey -->
    <path d="M 120 380 C 120 280, 150 250, 200 250 C 250 250, 280 280, 280 380 Z" fill="${v.wearColor}"/>
    <path d="M 150 260 L 200 300 L 250 260" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="3"/>
    
    <!-- Chest Hinomaru Flag -->
    <rect x="180" y="295" width="40" height="26" rx="4" fill="#FFFFFF"/>
    <circle cx="200" cy="308" r="8" fill="#BC002D"/>

    <!-- Neck -->
    <rect x="185" y="195" width="30" height="40" rx="6" fill="#FAD0C4"/>

    <!-- Head -->
    <ellipse cx="200" cy="175" rx="52" ry="62" fill="#FFDFC4"/>

    <!-- Hair / Styling depending on athlete -->
    <path d="M 148 165 C 148 115, 252 115, 252 165 C 240 130, 160 130, 148 165 Z" fill="#1C1C1E"/>
    ${v.hairStyle.includes('cap') ? `
      <!-- Cap / Goggles -->
      <path d="M 146 160 C 146 110, 254 110, 254 160 Z" fill="${v.accentColor}"/>
      <rect x="162" y="155" width="34" height="16" rx="8" fill="#111" opacity="0.85"/>
      <rect x="204" y="155" width="34" height="16" rx="8" fill="#111" opacity="0.85"/>
      <line x1="196" y1="163" x2="204" y2="163" stroke="#FFF" stroke-width="2"/>
    ` : ''}
    ${v.hairStyle === 'ponytail' ? `
      <path d="M 235 150 C 275 140, 285 210, 260 230 C 250 210, 245 170, 235 150 Z" fill="#1C1C1E"/>
      <circle cx="236" cy="148" r="7" fill="${v.accentColor}"/>
    ` : ''}
    ${v.hairStyle === 'glasses' ? `
      <rect x="165" y="160" width="28" height="16" rx="4" fill="none" stroke="#222" stroke-width="3"/>
      <rect x="207" y="160" width="28" height="16" rx="4" fill="none" stroke="#222" stroke-width="3"/>
      <line x1="193" y1="168" x2="207" y2="168" stroke="#222" stroke-width="3"/>
    ` : ''}

    <!-- Facial Features (Stylized, Sleek) -->
    <circle cx="182" cy="170" r="3.5" fill="#333"/>
    <circle cx="218" cy="170" r="3.5" fill="#333"/>
    <path d="M 175 160 Q 183 156 191 161" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
    <path d="M 209 161 Q 217 156 225 160" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round"/>
    <path d="M 200 178 L 198 188 L 202 188" fill="none" stroke="#E0A899" stroke-width="2"/>
    <path d="M 190 198 Q 200 205 210 198" fill="none" stroke="#C25953" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Initials Watermark / Monogram -->
  <text x="200" y="360" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="80" font-weight="900" fill="rgba(255,255,255,0.08)" letter-spacing="4">${v.initials}</text>

  <!-- Bottom Card Info Overlay -->
  <g transform="translate(0, 370)">
    <rect width="400" height="110" fill="rgba(12, 14, 28, 0.88)"/>
    <line x1="0" y1="0" x2="400" y2="0" stroke="${v.accentColor}" stroke-width="3"/>
    
    <text x="24" y="32" fill="#A0A5BA" font-family="'Noto Sans JP', sans-serif" font-size="12" font-weight="500" letter-spacing="1">AICHI-NAGOYA 2026 OFFICIAL</text>
    <text x="24" y="62" fill="#FFFFFF" font-family="'Noto Sans JP', sans-serif" font-size="24" font-weight="900">${id.split('-').map(s=>s.toUpperCase()).join(' ')}</text>
    <text x="24" y="88" fill="${v.accentColor}" font-family="'Noto Sans JP', sans-serif" font-size="13" font-weight="700">JAPAN NATIONAL ATHLETE</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${id}.svg`), svg, 'utf-8');
}

// 全選手画像生成
Object.keys(athleteVisuals).forEach(id => {
  generateAthleteSvg(id);
  console.log(`Generated SVG for ${id}`);
});
