/**
 * 愛知・名古屋2026 アジア大会
 * 選手一覧ポータル アプリケーションロジック (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM要素
  const athletesGrid = document.getElementById('athletesGrid');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const eventSelect = document.getElementById('eventSelect');
  const sortSelect = document.getElementById('sortSelect');
  const currentCount = document.getElementById('currentCount');
  const categoryTabs = document.getElementById('categoryTabs');
  const btnFavFilter = document.getElementById('btnFavFilter');
  const favCountBadge = document.getElementById('favCountBadge');
  const quickModal = document.getElementById('quickModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContentInner = document.getElementById('modalContentInner');

  // 状態管理
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let currentEvent = 'all';
  let currentSort = 'default';
  let isFavOnly = false;
  let favorites = getStoredFavorites();

  // お気に入り復元＆初期更新
  updateFavBadge();
  populateEventSelect();
  renderAthletes();

  // ==========================================
  // イベントリスナー設定
  // ==========================================

  // カテゴリタブ切り替え
  categoryTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;

    categoryTabs.querySelectorAll('.cat-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    currentCategory = tab.dataset.category;
    populateEventSelect();
    renderAthletes();
  });

  // リアルタイム検索
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim().toLowerCase();
    renderAthletes();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchQuery = '';
    renderAthletes();
    searchInput.focus();
  });

  // 種目セレクタ
  eventSelect.addEventListener('change', (e) => {
    currentEvent = e.target.value;
    renderAthletes();
  });

  // ソート順
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderAthletes();
  });

  // お気に入りトグルボタン
  btnFavFilter.addEventListener('click', () => {
    isFavOnly = !isFavOnly;
    btnFavFilter.classList.toggle('active', isFavOnly);
    renderAthletes();
  });

  // モーダル閉じる
  modalCloseBtn.addEventListener('click', closeModal);
  quickModal.addEventListener('click', (e) => {
    if (e.target === quickModal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quickModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================
  // 種目セレクタの動的更新
  // ==========================================
  function populateEventSelect() {
    let pool = ATHLETES_DATA;
    if (currentCategory !== 'all') {
      pool = pool.filter(a => a.category === currentCategory);
    }

    const events = Array.from(new Set(pool.map(a => a.event))).sort();
    
    eventSelect.innerHTML = '<option value="all">全種目</option>';
    events.forEach(ev => {
      const opt = document.createElement('option');
      opt.value = ev;
      opt.textContent = ev;
      if (ev === currentEvent) opt.selected = true;
      eventSelect.appendChild(opt);
    });

    // 選択中の種目が現在のカテゴリにない場合はallにリセット
    if (currentEvent !== 'all' && !events.includes(currentEvent)) {
      currentEvent = 'all';
      eventSelect.value = 'all';
    }
  }

  // ==========================================
  // 選手フィルタリング＆レンダリング
  // ==========================================
  function renderAthletes() {
    let list = [...ATHLETES_DATA];

    // 1. カテゴリ絞り込み
    if (currentCategory !== 'all') {
      list = list.filter(a => a.category === currentCategory);
    }

    // 2. 種目絞り込み
    if (currentEvent !== 'all') {
      list = list.filter(a => a.event === currentEvent);
    }

    // 3. お気に入り絞り込み
    if (isFavOnly) {
      list = list.filter(a => favorites.includes(a.id));
    }

    // 4. キーワード検索（名前、カナ、英字、種目、所属、実績、要約など複合）
    if (currentSearchQuery) {
      list = list.filter(a => {
        const targetStr = [
          a.name,
          a.kana,
          a.romaji,
          a.sport,
          a.event,
          a.affiliation,
          a.birthPlace,
          a.summary,
          ...(a.badges || [])
        ].join(' ').toLowerCase();
        return targetStr.includes(currentSearchQuery);
      });
    }

    // 5. ソート
    if (currentSort === 'kana') {
      list.sort((a, b) => a.kana.localeCompare(b.kana, 'ja'));
    } else if (currentSort === 'sport') {
      list.sort((a, b) => (a.sport + a.event).localeCompare(b.sport + b.event, 'ja'));
    }
    // 'default' は ATHLETES_DATA 定義順

    // 件数更新
    currentCount.textContent = list.length;

    // カードHTML生成
    if (list.length === 0) {
      athletesGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">該当する選手が見つかりませんでした</h3>
          <p class="empty-desc">条件を変更するか、検索キーワードを見直してみてください。</p>
          <button class="btn-reset-filters" id="btnResetFilters">すべてのフィルターを解除</button>
        </div>
      `;
      document.getElementById('btnResetFilters')?.addEventListener('click', resetAllFilters);
      return;
    }

    athletesGrid.innerHTML = list.map(athlete => {
      const isFav = favorites.includes(athlete.id);
      const badgesHtml = (athlete.badges || []).slice(0, 3).map(b => 
        `<span class="honor-badge">${b}</span>`
      ).join('');

      return `
        <article class="athlete-card" data-id="${athlete.id}">
          <div class="card-image-wrap">
            <img src="${athlete.photoUrl}" alt="${athlete.name} 選手のポートレート" loading="lazy">
            <button class="card-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${athlete.id}" title="${isFav ? 'お気に入り解除' : 'お気に入りに追加'}" aria-label="${athlete.name}をお気に入り登録">
              ${isFav ? '★' : '☆'}
            </button>
            <div class="card-sport-badge">
              <span class="badge-sport">${athlete.sport}</span>
              <span class="badge-event">${athlete.event}</span>
            </div>
          </div>

          <div class="card-body">
            <div class="card-name-group">
              <span class="card-kana">${athlete.kana}</span>
              <h2 class="card-name">${athlete.name}</h2>
            </div>
            <div class="card-affiliation">
              <span>🏢</span> ${athlete.affiliation}
            </div>

            <div class="card-badges-row">
              ${badgesHtml}
            </div>

            <div class="card-catchphrase">
              ${athlete.catchphrase}
            </div>

            <p class="card-summary">
              ${athlete.summary}
            </p>

            <div class="card-footer-actions">
              <a href="athletes/${athlete.id}.html" class="btn-detail" title="${athlete.name}の詳細ページを見る">
                <span>詳細プロフィール</span> <span>➔</span>
              </a>
              <button class="btn-quick-view" data-quick-id="${athlete.id}" title="クイック概要を見る">
                クイック表示
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // カード内アクションのイベント委譲
    attachCardListeners();
  }

  // ==========================================
  // カード内イベント委譲
  // ==========================================
  function attachCardListeners() {
    // お気に入りボタン
    athletesGrid.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.favId;
        toggleFavorite(id);
      });
    });

    // クイックビューボタン
    athletesGrid.querySelectorAll('.btn-quick-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.quickId;
        openQuickModal(id);
      });
    });
  }

  // ==========================================
  // お気に入り処理
  // ==========================================
  function getStoredFavorites() {
    try {
      const data = localStorage.getItem('aichi2026_fav_athletes');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
    try {
      localStorage.setItem('aichi2026_fav_athletes', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
    updateFavBadge();
    renderAthletes();
  }

  function updateFavBadge() {
    favCountBadge.textContent = favorites.length;
  }

  // ==========================================
  // クイックビュー モーダル
  // ==========================================
  function openQuickModal(id) {
    const athlete = ATHLETES_DATA.find(a => a.id === id);
    if (!athlete) return;

    modalContentInner.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px;">
        <img src="${athlete.photoUrl}" alt="${athlete.name}" style="width: 100px; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid var(--color-gold);">
        <div>
          <span style="font-size: 0.8rem; color: var(--color-gold); font-weight: 700;">${athlete.sport} / ${athlete.event}</span>
          <h3 style="font-size: 1.6rem; font-weight: 900; color: #fff; margin: 2px 0;">${athlete.name}</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted);">${athlete.affiliation} | 出身: ${athlete.birthPlace}</p>
        </div>
      </div>
      
      <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 8px; margin-bottom: 16px; border-left: 3px solid var(--color-gold);">
        <p style="font-size: 0.95rem; font-weight: 700; color: #fff;">${athlete.catchphrase}</p>
      </div>

      <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.7; margin-bottom: 20px;">
        ${athlete.detailedProfile.bio}
      </p>

      <div style="display: flex; gap: 12px;">
        <a href="athletes/${athlete.id}.html" class="btn-detail" style="text-align: center; justify-content: center; width: 100%;">
          約1ページ分の完全詳細プロフィールを見る ➔
        </a>
      </div>
    `;

    quickModal.classList.add('open');
    quickModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    quickModal.classList.remove('open');
    quickModal.setAttribute('aria-hidden', 'true');
  }

  // ==========================================
  // フィルター全解除
  // ==========================================
  function resetAllFilters() {
    currentCategory = 'all';
    currentEvent = 'all';
    currentSearchQuery = '';
    isFavOnly = false;
    currentSort = 'default';

    searchInput.value = '';
    btnFavFilter.classList.remove('active');
    sortSelect.value = 'default';

    categoryTabs.querySelectorAll('.cat-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.category === 'all');
      t.setAttribute('aria-selected', t.dataset.category === 'all' ? 'true' : 'false');
    });

    populateEventSelect();
    renderAthletes();
  }
});
