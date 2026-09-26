const fs = require('fs');
const path = require('path');

// 各選手の公式トーナメント表・公式結果リンク
const officialTournamentMap = {
  // 陸上競技
  "kitaguchi-haruka": {
    name: "JAAF公式 大会リザルト速報",
    source: "日本陸上競技連盟 (JAAF) / World Athletics",
    url: "https://worldathletics.org/competitions/asian-games",
    caption: "女子やり投 予選・決勝全試技記録表"
  },
  "izumiya-shunsuke": {
    name: "JAAF公式 大会リザルト速報",
    source: "日本陸上競技連盟 (JAAF) / World Athletics",
    url: "https://worldathletics.org/competitions/asian-games",
    caption: "男子110mH 予選・準決・決勝公式タイムシート"
  },
  "sani-brown": {
    name: "JAAF公式 大会リザルト速報",
    source: "日本陸上競技連盟 (JAAF) / World Athletics",
    url: "https://worldathletics.org/competitions/asian-games",
    caption: "男子100m ラウンド別公式リザルト・風速記録"
  },
  "tanaka-nozomi": {
    name: "JAAF公式 大会リザルト速報",
    source: "日本陸上競技連盟 (JAAF) / World Athletics",
    url: "https://worldathletics.org/competitions/asian-games",
    caption: "女子1500m・5000m ラップタイム＆公式結果"
  },

  // 柔道
  "abe-hifumi": {
    name: "IJF公式 トーナメント表 (Draw)",
    source: "国際柔道連盟 (IJF Judobase) / 全日本柔道連盟",
    url: "https://judobase.ijf.org/",
    caption: "男子66kg級 勝ち上がりトーナメント表＆全試合決まり技詳細"
  },
  "abe-uta": {
    name: "IJF公式 トーナメント表 (Draw)",
    source: "国際柔道連盟 (IJF Judobase) / 全日本柔道連盟",
    url: "https://judobase.ijf.org/",
    caption: "女子52kg級 勝ち上がりトーナメント表＆全試合決まり技詳細"
  },
  "tsunoda-natsumi": {
    name: "IJF公式 トーナメント表 (Draw)",
    source: "国際柔道連盟 (IJF Judobase) / 全日本柔道連盟",
    url: "https://judobase.ijf.org/",
    caption: "女子48kg級 公式トーナメント対戦表＆スコア詳細"
  },

  // スケートボード
  "horigome-yuto": {
    name: "World Skate 公式リザルト",
    source: "World Skate / ワールドスケートジャパン",
    url: "https://www.worldskate.org/skateboarding/results.html",
    caption: "男子ストリート 予選・決勝ラン＆ベストトリック全採点表"
  },
  "yoshizawa-coco": {
    name: "World Skate 公式リザルト",
    source: "World Skate / ワールドスケートジャパン",
    url: "https://www.worldskate.org/skateboarding/results.html",
    caption: "女子ストリート 予選・決勝トリック別公式スコアシート"
  },

  // 体操
  "hashimoto-daiki": {
    name: "JGA公式 競技結果・採点シート",
    source: "日本体操協会 (JGA) / 国際体操連盟 (FIG)",
    url: "https://www.jpn-gym.or.jp/artistic/event/",
    caption: "男子個人総合 6種目別得点・Dスコア/Eスコア全詳細"
  },
  "oka-shinnosuke": {
    name: "JGA公式 競技結果・採点シート",
    source: "日本体操協会 (JGA) / 国際体操連盟 (FIG)",
    url: "https://www.jpn-gym.or.jp/artistic/event/",
    caption: "男子種目別平行棒 予選・決勝公式ジャッジ採点表"
  },

  // レスリング
  "fujinami-akari": {
    name: "UWW公式 対戦トーナメント表",
    source: "世界レスリング連盟 (UWW Arena) / 日本レスリング協会",
    url: "https://uww.org/events",
    caption: "女子53kg級 勝ち上がりブラケット＆ピリオド別スコア"
  },

  // フェンシング
  "kano-koki": {
    name: "FIE公式 対戦ブラケット表",
    source: "国際フェンシング連盟 (FIE) / 日本フェンシング協会",
    url: "https://fie.org/competitions",
    caption: "男子エペ個人 決勝トーナメント表＆ポイント経過記録"
  },

  // ブレイキン
  "shigekix": {
    name: "WDSF公式 バトルブラケット表",
    source: "世界ダンススポーツ連盟 (WDSF) / JDSF",
    url: "https://www.worlddancesport.org/",
    caption: "男子ブレイキン ラウンドロビン＆決勝トーナメント対戦表"
  },
  "ami": {
    name: "WDSF公式 バトルブラケット表",
    source: "世界ダンススポーツ連盟 (WDSF) / JDSF",
    url: "https://www.worlddancesport.org/",
    caption: "女子ブレイキン ジャッジ採点内訳＆対戦ブラケット"
  },

  // 飛込・競泳
  "tamai-rikuto": {
    name: "World Aquatics 公式リザルト",
    source: "世界水泳連盟 (World Aquatics) / 日本水泳連盟",
    url: "https://www.worldaquatics.com/competitions",
    caption: "男子高飛込 予選・準決・決勝ラウンド別全試技採点詳細"
  },
  "ikee-rikako": {
    name: "World Aquatics 公式リザルト",
    source: "世界水泳連盟 (World Aquatics) / 日本水泳連盟",
    url: "https://www.worldaquatics.com/competitions",
    caption: "女子50mバタフライ 予選・準決・決勝公式タイムシート"
  },
  "matsumoto-katsuhiro": {
    name: "World Aquatics 公式リザルト",
    source: "世界水泳連盟 (World Aquatics) / 日本水泳連盟",
    url: "https://www.worldaquatics.com/competitions",
    caption: "男子200m自由形 50mラップ別公式リザルト表"
  },

  // 卓球
  "hayata-hina": {
    name: "WTT公式 トーナメント表 (Draw)",
    source: "WTT (World Table Tennis) / 日本卓球協会",
    url: "https://worldtabletennis.com/results",
    caption: "女子シングルス 決勝トーナメント表＆ゲーム別詳細スコア"
  },
  "harimoto-tomokazu": {
    name: "WTT公式 トーナメント表 (Draw)",
    source: "WTT (World Table Tennis) / 日本卓球協会",
    url: "https://worldtabletennis.com/results",
    caption: "男子シングルス 決勝トーナメント表＆3位決定戦スコア"
  },

  // バドミントン
  "yamaguchi-akane": {
    name: "BWF公式 トーナメント表 (Draw)",
    source: "BWF Tournament Software / 日本バドミントン協会",
    url: "https://bwfbadminton.com/results/",
    caption: "女子シングルス 本戦トーナメント表＆マッチスタッツ"
  },
  "naraoka-kodai": {
    name: "BWF公式 トーナメント表 (Draw)",
    source: "BWF Tournament Software / 日本バドミントン協会",
    url: "https://bwfbadminton.com/results/",
    caption: "男子シングルス 本戦トーナメント表＆全試合ゲームスコア"
  },

  // eスポーツ
  "tokido": {
    name: "CAPCOM / JeSU公式 対戦表",
    source: "カプコン公式 (CAPCOM Fighters) / 日本eスポーツ連合",
    url: "https://capcomprotour.com/",
    caption: "ストリートファイター6部門 ダブルエリミネーション対戦表"
  },

  // サッカー男子
  "hosoya-mao": {
    name: "JFA公式 大会日程・結果速報",
    source: "日本サッカー協会 (JFA) / AFC 公式記録",
    url: "https://www.jfa.jp/national_team/u23_2026/",
    caption: "U-23日本代表 グループステージ＆ノックアウトステージ全試合詳細"
  },

  // バスケ男子
  "kawamura-yuki": {
    name: "FIBA公式 スケジュール＆ボックススコア",
    source: "FIBA (国際バスケットボール連盟) / 日本バスケットボール協会",
    url: "https://www.fiba.basketball/",
    caption: "男子日本代表 予選〜決勝トーナメント全試合公式ボックススコア"
  }
};

// チームスポーツの公式トーナメント表
const teamTournamentMap = {
  "football-men": {
    name: "JFA公式 大会日程・全試合結果",
    source: "日本サッカー協会 (JFA) / AFC (アジアサッカー連盟)",
    url: "https://www.jfa.jp/national_team/u23_2026/",
    caption: "男子サッカー 決勝トーナメント表＆全試合公式マッチレポート"
  },
  "football-women": {
    name: "JFA公式 なでしこジャパン大会結果",
    source: "日本サッカー協会 (JFA) / AFC (アジアサッカー連盟)",
    url: "https://www.jfa.jp/nadeshikojapan/",
    caption: "女子サッカー 決勝トーナメント表＆星取表・公式スタッツ"
  },
  "basketball-men": {
    name: "FIBA公式 トーナメント表＆結果",
    source: "FIBA (国際バスケットボール連盟) / 日本バスケットボール協会 (JBA)",
    url: "https://www.fiba.basketball/",
    caption: "男子5人制バスケ 決勝トーナメント表＆全クォータースコア"
  },
  "volleyball-men": {
    name: "AVC公式 マッチリザルト・星取表",
    source: "AVC (アジアバレーボール連盟) / 日本バレーボール協会 (JVA)",
    url: "https://asianvolleyball.net/",
    caption: "男子バレーボール 決勝トーナメント表＆セット別詳細スタッツ"
  },
  "baseball-men": {
    name: "侍ジャパン公式 試合日程・結果",
    source: "野球日本代表 侍ジャパン公式サイト / WBSC",
    url: "https://www.japan-baseball.jp/jp/team/amateur/",
    caption: "侍ジャパン社会人代表 トーナメント表＆公式スコアブック"
  },
  "softball-women": {
    name: "JSA公式 大会トーナメント対戦表",
    source: "日本ソフトボール協会 (JSA) / WBSC Softball",
    url: "https://www.softball.or.jp/",
    caption: "女子ソフトボール 決勝トーナメント表＆全試合イニングスコア"
  }
};

// 1. js/data.js を更新
const dataJsPath = path.join(__dirname, 'js', 'data.js');
let { ATHLETES_DATA } = require(dataJsPath);

ATHLETES_DATA.forEach(athlete => {
  if (officialTournamentMap[athlete.id] && athlete.tournamentResult) {
    athlete.tournamentResult.officialTournament = officialTournamentMap[athlete.id];
  }
});

const newDataJs = `/**
 * 2026年愛知・名古屋アジア競技大会 (Aichi-Nagoya 2026)
 * 日本代表・注目出場選手マスターデータ
 */

const ATHLETES_DATA = ${JSON.stringify(ATHLETES_DATA, null, 2)};

// Node.js環境用エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ATHLETES_DATA };
}
`;

fs.writeFileSync(dataJsPath, newDataJs, 'utf-8');
console.log('Successfully updated js/data.js with officialTournament links!');

// 2. js/team_data.js を更新
const teamDataJsPath = path.join(__dirname, 'js', 'team_data.js');
let { TEAMS_DATA } = require(teamDataJsPath);

TEAMS_DATA.forEach(team => {
  if (teamTournamentMap[team.id] && team.tournamentResult) {
    team.tournamentResult.officialTournament = teamTournamentMap[team.id];
    // 所属全選手にも公式トーナメントリンクを付与
    team.athletes.forEach(athlete => {
      if (athlete.tournamentResult) {
        athlete.tournamentResult.officialTournament = teamTournamentMap[team.id];
      }
    });
  }
});

const newTeamDataJs = `/**
 * 2026年愛知・名古屋アジア競技大会 (Aichi-Nagoya 2026)
 * チームスポーツ（団体球技）全登録選手マスターデータ
 */

const TEAMS_DATA = ${JSON.stringify(TEAMS_DATA, null, 2)};

// Node.js環境用エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TEAMS_DATA };
}
`;

fs.writeFileSync(teamDataJsPath, newTeamDataJs, 'utf-8');
console.log('Successfully updated js/team_data.js with officialTournament links!');
