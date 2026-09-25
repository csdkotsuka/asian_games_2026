const fs = require('fs');
const path = require('path');

// data.js を読み込む
const { ATHLETES_DATA } = require('./js/data.js');
const ATHLETES = ATHLETES_DATA;
const outDir = path.join(__dirname, 'athletes');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

ATHLETES.forEach((athlete, index) => {
  const prevAthlete = index > 0 ? ATHLETES[index - 1] : ATHLETES[ATHLETES.length - 1];
  const nextAthlete = index < ATHLETES.length - 1 ? ATHLETES[index + 1] : ATHLETES[0];

  const badgesHtml = (athlete.badges || []).map(b => 
    `<span class="detail-badge-item">🏅 ${b}</span>`
  ).join('');

  const highlightsHtml = (athlete.detailedProfile.highlights || []).map(h => `
    <div class="timeline-item">
      <span class="tl-year">${h.year}</span>
      <span class="tl-title">${h.title}</span>
      <span class="tl-result">${h.result}</span>
    </div>
  `).join('');

  const linksHtml = (athlete.detailedProfile.officialLinks || []).map(l => `
    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="ext-link-chip">
      <span>🔗</span>
      <span>${l.label}</span>
    </a>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${athlete.name}（${athlete.sport}・${athlete.event}）| 2026年愛知・名古屋アジア大会 日本代表選手名鑑</title>
  <meta name="description" content="第20回アジア競技大会（愛知・名古屋2026）日本代表、${athlete.name}選手の詳細プロフィール、戦績、プレイスタイル、意気込み、競技日程。">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/athlete-detail.css">
</head>
<body>

  <!-- ヘッダー -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="logo-link" aria-label="トップページへ戻る">
        <div class="emblem-icon">26</div>
        <div class="logo-text-group">
          <h1>愛知・名古屋2026 アジア大会</h1>
          <span class="logo-sub">TEAM JAPAN 選手名鑑</span>
        </div>
      </a>
      
      <div class="header-actions">
        <a href="../index.html" class="fav-filter-btn" style="text-decoration:none;">
          <span>← 選手一覧へ戻る</span>
        </a>
      </div>
    </div>
  </header>

  <!-- 選手詳細コンテナ (約1ページ分) -->
  <div class="detail-page-container">
    
    <!-- パンくず & アクションバー -->
    <div class="nav-breadcrumbs-bar">
      <a href="../index.html" class="back-link">
        <span>←</span>
        <span>競技・選手一覧へ戻る</span>
      </a>

      <div class="page-actions-group">
        <button class="action-btn-print" onclick="window.print()" title="このページを印刷またはPDF保存">
          <span>🖨️</span>
          <span>印刷 / PDF保存</span>
        </button>
      </div>
    </div>

    <!-- メイン詳細カード -->
    <article class="athlete-detail-card">
      
      <!-- ヒーローセクション -->
      <section class="detail-hero">
        <div class="detail-photo-wrap">
          <img src="../${athlete.photoUrl}" alt="${athlete.name} 選手の顔写真" style="object-position: ${athlete.photoPosition || 'center 20%'};">
        </div>

        <div class="detail-hero-info">
          <div class="detail-cat-badge">
            <span>${athlete.categoryName}</span>
            <span>•</span>
            <span>${athlete.sport} / ${athlete.event}</span>
          </div>
          
          <span class="detail-kana">${athlete.kana}</span>
          <h1 class="detail-name">${athlete.name}</h1>
          <div class="detail-romaji">${athlete.romaji}</div>

          <div class="detail-affiliation">
            <span>🏢 所属:</span> <strong>${athlete.affiliation}</strong>
          </div>

          <div class="detail-badges-list">
            ${badgesHtml}
          </div>

          <div class="detail-catchphrase-box">
            ${athlete.catchphrase}
          </div>
        </div>
      </section>

      <!-- 詳細情報ボディ -->
      <div class="detail-content-body">
        
        <!-- 基本プロフィール表 -->
        <div class="profile-meta-grid">
          <div class="meta-item-cell">
            <span class="meta-label">生年月日 / 年齢</span>
            <span class="meta-val">${athlete.birthDate}（${athlete.age}歳）</span>
          </div>
          <div class="meta-item-cell">
            <span class="meta-label">出身地</span>
            <span class="meta-val">${athlete.birthPlace}</span>
          </div>
          <div class="meta-item-cell">
            <span class="meta-label">身長 / 体重</span>
            <span class="meta-val">${athlete.heightWeight}</span>
          </div>
          <div class="meta-item-cell">
            <span class="meta-label">代表種目</span>
            <span class="meta-val">${athlete.event}</span>
          </div>
        </div>

        <!-- 選手経歴・ストーリー -->
        <section class="section-block">
          <h2 class="section-header-title">
            <span class="sec-icon">📖</span>
            <span>経歴・これまでの歩み</span>
          </h2>
          <p class="section-text">
            ${athlete.detailedProfile.bio}
          </p>
        </section>

        <!-- 主な戦績・ハイライト -->
        <section class="section-block">
          <h2 class="section-header-title">
            <span class="sec-icon">🏆</span>
            <span>主要大会ハイライト戦績</span>
          </h2>
          <div class="timeline-list">
            ${highlightsHtml}
          </div>
        </section>

        <!-- プレイスタイルと強み -->
        <section class="section-block">
          <h2 class="section-header-title">
            <span class="sec-icon">⚡</span>
            <span>プレイスタイル＆世界を制する武器</span>
          </h2>
          <p class="section-text">
            ${athlete.detailedProfile.playStyle}
          </p>
        </section>

        <!-- 2026年愛知・名古屋大会への意気込み -->
        <section class="section-block">
          <h2 class="section-header-title">
            <span class="sec-icon">💬</span>
            <span>愛知・名古屋2026への決意とメッセージ</span>
          </h2>
          <div class="quote-message-box">
            <p>${athlete.detailedProfile.message2026}</p>
          </div>
        </section>

        <!-- 競技日程・観戦ガイド -->
        <section class="section-block">
          <h2 class="section-header-title">
            <span class="sec-icon">📅</span>
            <span>大会スケジュール＆観戦のツボ</span>
          </h2>
          <div class="schedule-box">
            <div class="schedule-card-inner">
              <div class="sched-title">🗓️ 出場予定日程・会場</div>
              <div class="sched-text">${athlete.detailedProfile.schedule}</div>
            </div>
            <div class="schedule-card-inner">
              <div class="sched-title">👀 観戦の注目ポイント</div>
              <div class="sched-text">${athlete.detailedProfile.viewingPoints}</div>
            </div>
          </div>
        </section>

        <!-- 関連リンク -->
        ${linksHtml ? `
        <section class="section-block">
          <h2 class="section-header-title">
            <span class="sec-icon">🌐</span>
            <span>公式情報・SNSリンク</span>
          </h2>
          <div class="links-flex-wrap">
            ${linksHtml}
          </div>
        </section>
        ` : ''}

      </div>
    </article>

    <!-- 前後の選手ナビゲーション -->
    <nav class="athlete-prev-next-nav" aria-label="他の選手へのナビゲーション">
      <a href="${prevAthlete.id}.html" class="pn-btn pn-prev">
        <span class="pn-dir">← 前の選手</span>
        <span class="pn-name">${prevAthlete.name}（${prevAthlete.sport}）</span>
      </a>
      <a href="../index.html" class="pn-btn" style="text-align: center; justify-content: center; max-width: 160px;">
        <span class="pn-dir">一覧</span>
        <span class="pn-name">選手名鑑TOP</span>
      </a>
      <a href="${nextAthlete.id}.html" class="pn-btn pn-next" style="text-align: right;">
        <span class="pn-dir">次の選手 →</span>
        <span class="pn-name">${nextAthlete.name}（${nextAthlete.sport}）</span>
      </a>
    </nav>

  </div>

  <!-- フッター -->
  <footer class="site-footer">
    <div class="container">
      <p class="footer-copy">
        &copy; 2026 第20回アジア競技大会（愛知・名古屋）選手名鑑ポータル. All rights reserved.
      </p>
    </div>
  </footer>

</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${athlete.id}.html`), html, 'utf-8');
});

console.log(`Generated ${ATHLETES.length} athlete detail pages in /athletes/`);
