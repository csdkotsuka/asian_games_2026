/**
 * 選手個別詳細ページ動的描画スクリプト (detail.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('detailContainer');
  const params = new URLSearchParams(window.location.search);
  const athleteId = params.get('id');

  const athlete = ATHLETES_DATA.find(a => a.id === athleteId) || ATHLETES_DATA[0];

  const currentIndex = ATHLETES_DATA.findIndex(a => a.id === athlete.id);
  const prevAthlete = currentIndex > 0 ? ATHLETES_DATA[currentIndex - 1] : ATHLETES_DATA[ATHLETES_DATA.length - 1];
  const nextAthlete = currentIndex < ATHLETES_DATA.length - 1 ? ATHLETES_DATA[currentIndex + 1] : ATHLETES_DATA[0];

  document.title = `${athlete.name}（${athlete.sport}・${athlete.event}）| 2026年愛知・名古屋アジア大会 日本代表選手名鑑`;

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

  container.innerHTML = `
    <!-- パンくず & アクションバー -->
    <div class="nav-breadcrumbs-bar">
      <a href="index.html" class="back-link">
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
          <img src="${athlete.photoUrl}" alt="${athlete.name} 選手の顔写真" style="object-position: ${athlete.photoPosition || 'center 20%'};">
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
      <a href="athlete.html?id=${prevAthlete.id}" class="pn-btn pn-prev">
        <span class="pn-dir">← 前の選手</span>
        <span class="pn-name">${prevAthlete.name}（${prevAthlete.sport}）</span>
      </a>
      <a href="index.html" class="pn-btn" style="text-align: center; justify-content: center; max-width: 160px;">
        <span class="pn-dir">一覧</span>
        <span class="pn-name">選手名鑑TOP</span>
      </a>
      <a href="athlete.html?id=${nextAthlete.id}" class="pn-btn pn-next" style="text-align: right;">
        <span class="pn-dir">次の選手 →</span>
        <span class="pn-name">${nextAthlete.name}（${nextAthlete.sport}）</span>
      </a>
    </nav>
  `;
});
