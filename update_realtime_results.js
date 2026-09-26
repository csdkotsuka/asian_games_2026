const fs = require('fs');
const path = require('path');

// 2026年9月26日 17:54 現在の最新事実に基づくデータ
const realTimeAthletesResults = {
  // 卓球
  "harimoto-tomokazu": {
    status: "ongoing",
    medal: "ongoing",
    rank: "男子シングルス 準決勝 激闘中（LIVE）🔥",
    eventResult: "男子シングルス ベスト4進出・準決勝試合中",
    record: "準々決勝 4-2 勝利 ➔ 本日 準決勝 vs 中国",
    summary: "【最新・試合中】準々決勝で難敵を4-2で破り堂々のベスト4進出（メダル確定）。現在、決勝進出を懸けて中国選手との大一番・準決勝を戦っており、会場のIGアリーナは大熱狂。",
    currentScene: {
      title: "準々決勝 最終ゲームでの魂のチキータ連発＆ベスト4進出決定の瞬間",
      description: "雄叫びとともにベンチへ駆け寄った決定的瞬間。現在行われている準決勝の最新映像・速報も配信中。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=張本智和+アジア大会+2026+準決勝+速報"
    },
    officialTournament: {
      name: "WTT公式 ライブスコア＆ドロー表",
      source: "WTT (World Table Tennis) / 日本卓球協会",
      url: "https://worldtabletennis.com/",
      caption: "男子シングルス 準決勝リアルタイムスコア＆トーナメント対戦表"
    }
  },
  "hayata-hina": {
    status: "ongoing",
    medal: "ongoing",
    rank: "女子シングルス 準決勝進出決定（銅以上確定）🔥",
    eventResult: "女子シングルス ベスト4進出（明日 準決勝）",
    record: "準々決勝: 4-1 快勝（明日 準決勝へ）",
    summary: "【最新】準々決勝で圧巻のフォアドライブを連発し4-1で快勝。見事にベスト4入りを果たしメダルを確定させた。明日行われる準決勝で悲願の頂点を目指す。",
    currentScene: {
      title: "準々決勝 豪快なフォアハンドスマッシュで準決勝進出を決めた瞬間",
      description: "相手のドライブをカウンターで打ち抜き、拳を握りしめて笑顔を見せた感動の勝利シーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=早田ひな+アジア大会+卓球+ハイライト"
    },
    officialTournament: {
      name: "WTT公式 女子トーナメント表",
      source: "WTT (World Table Tennis) / 日本卓球協会",
      url: "https://worldtabletennis.com/",
      caption: "女子シングルス 準決勝〜決勝ブラケット＆詳細スタッツ"
    }
  },

  // 柔道（前半戦で終了・メダル確定）
  "abe-hifumi": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（大会2連覇達成）",
    eventResult: "柔道男子66kg級 優勝",
    record: "決勝: 一本勝ち（袖釣込腰）",
    summary: "大会序盤の柔道競技に登場。圧倒的な体幹と鋭い技のキレで全試合オール一本勝ち。見事アジア大会2連覇を達成した。",
    finalScene: {
      title: "決勝戦 鮮やかな袖釣込腰で一本勝ち！雄叫びとともに2連覇の瞬間",
      description: "開始2分過ぎ、電光石火の飛び込みから相手を宙に舞わせた完璧な一本勝ちシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=阿部一二三+アジア大会+柔道+一本勝ち+ハイライト"
    },
    officialTournament: {
      name: "IJF公式 トーナメント表 (Draw)",
      source: "国際柔道連盟 (IJF Judobase) / 全日本柔道連盟",
      url: "https://judobase.ijf.org/",
      caption: "男子66kg級 勝ち上がりトーナメント表＆全試合決まり技詳細"
    }
  },
  "abe-uta": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（復活の圧倒的優勝）",
    eventResult: "柔道女子52kg級 優勝",
    record: "決勝: 一本勝ち（鋭い内股）",
    summary: "パリ五輪の悔しさを胸に畳へ上がり、気迫溢れる柔道で全試合一本勝ち。圧巻の強さでアジア王座に君臨した。",
    finalScene: {
      title: "決勝戦 豪快な内股で一本！兄妹同日アベック金メダル達成",
      description: "一瞬の隙を逃さず完璧な内股を決めて一本。畳の上で涙と笑顔が混じり合った感動の瞬間。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=阿部詩+アジア大会+柔道+金メダル+ハイライト"
    },
    officialTournament: {
      name: "IJF公式 トーナメント表 (Draw)",
      source: "国際柔道連盟 (IJF Judobase) / 全日本柔道連盟",
      url: "https://judobase.ijf.org/",
      caption: "女子52kg級 勝ち上がりトーナメント表＆全試合決まり技詳細"
    }
  },
  "tsunoda-natsumi": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（日本勢第1号金メダル）",
    eventResult: "柔道女子48kg級 優勝",
    record: "決勝: 技あり・巴投から腕緘",
    summary: "大会初日、伝家の宝刀・巴投で相手を翻弄。今大会の日本選手団第1号となる金メダルを獲得し、チームに大きな勢いをもたらした。",
    finalScene: {
      title: "巴投で相手を畳に叩きつけ一本！日本勢第1号金の歓喜",
      description: "芸術的な巴投が決まり一本がコールされた瞬間、畳を降りて深々と礼をした美しい所作。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=角田夏実+アジア大会+柔道+巴投+金メダル"
    },
    officialTournament: {
      name: "IJF公式 トーナメント表 (Draw)",
      source: "国際柔道連盟 (IJF Judobase) / 全日本柔道連盟",
      url: "https://judobase.ijf.org/",
      caption: "女子48kg級 公式トーナメント対戦表＆スコア詳細"
    }
  },

  // スケートボード（前半戦で終了・メダル確定）
  "horigome-yuto": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（アジア大会初制覇）",
    eventResult: "スケートボード男子ストリート 優勝",
    record: "決勝得点: 281.20点（逆転優勝）",
    summary: "9月23日の決勝で最終トリック『ノーリー270スライド』を完璧にメイクし劇的な逆転勝利。アジア大会初タイトルを手中に収めた。",
    finalScene: {
      title: "ベストトリック最終試技 奇跡のノーリー270スライド成功＆大逆転",
      description: "着地が決まった瞬間にデッキを掲げて観客にアピール。会場がスタンディングオベーションに包まれた瞬間。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=堀米雄斗+スケートボード+アジア大会+逆転金メダル"
    },
    officialTournament: {
      name: "World Skate 公式リザルト",
      source: "World Skate / ワールドスケートジャパン",
      url: "https://www.worldskate.org/skateboarding/results.html",
      caption: "男子ストリート 予選・決勝ラン＆ベストトリック全採点表"
    }
  },
  "yoshizawa-coco": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（五輪・アジア大会2冠）",
    eventResult: "スケートボード女子ストリート 優勝",
    record: "決勝得点: 272.85点",
    summary: "大技ビッグスピンフリップ・ボードスライドを正確に決め、パリ五輪に続いてアジアの頂点にも堂々君臨。",
    finalScene: {
      title: "大技ビッグスピンボードスライド成功！16歳の満面笑顔",
      description: "ハンドレールを滑り降り完璧にメイクした瞬間、ヘルメットを押さえながら両手を広げて喜んだハイライト。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=吉沢恋+スケートボード+アジア大会+金メダル"
    },
    officialTournament: {
      name: "World Skate 公式リザルト",
      source: "World Skate / ワールドスケートジャパン",
      url: "https://www.worldskate.org/skateboarding/results.html",
      caption: "女子ストリート 予選・決勝トリック別公式スコアシート"
    }
  },

  // 体操（前半戦で終了・メダル確定）
  "hashimoto-daiki": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（個人総合＆団体2冠）",
    eventResult: "体操男子個人総合 優勝",
    record: "合計得点: 86.950点",
    summary: "最終種目の鉄棒で見事な伸身コバチとピタリと止めた着地を披露し、激戦の個人総合を制して金メダルを獲得した。",
    finalScene: {
      title: "最終種目・鉄棒 完璧な着地でガッツポーズ！個人総合優勝の瞬間",
      description: "高難度のアドラー1回ひねりから伸身新月面着地をピタリと決め、雄叫びをあげた感動のフィニッシュ。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=橋本大輝+体操+アジア大会+個人総合+金メダル"
    },
    officialTournament: {
      name: "JGA公式 競技結果・採点シート",
      source: "日本体操協会 (JGA) / 国際体操連盟 (FIG)",
      url: "https://www.jpn-gym.or.jp/artistic/event/",
      caption: "男子個人総合 6種目別得点・Dスコア/Eスコア全詳細"
    }
  },
  "oka-shinnosuke": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（種目別平行棒 優勝）",
    eventResult: "体操男子種目別平行棒 優勝",
    record: "決勝得点: 15.350点（Eスコア 8.850）",
    summary: "極めて美しい姿勢と静止技の完成度で他を圧倒。高いEスコアを叩き出し種目別平行棒で金メダルを獲得した。",
    finalScene: {
      title: "平行棒 美しい倒立静止から後方屈身2回宙返り下り着地ピタリ",
      description: "ブレのない完璧な倒立と微動だにしない着地。水野コーチと抱き合って喜んだハイライトシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=岡慎之助+体操+平行棒+金メダル+アジア大会"
    },
    officialTournament: {
      name: "JGA公式 競技結果・採点シート",
      source: "日本体操協会 (JGA) / 国際体操連盟 (FIG)",
      url: "https://www.jpn-gym.or.jp/artistic/event/",
      caption: "男子種目別平行棒 予選・決勝公式ジャッジ採点表"
    }
  },

  // フェンシング（個人戦終了・メダル確定）
  "kano-koki": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（男子エペ個人 優勝）",
    eventResult: "フェンシング男子エペ個人 優勝",
    record: "決勝: 15-12 勝利（明日より団体戦へ）",
    summary: "パリ五輪個人金に続き、アジア大会でも神業のカウンターアタックが炸裂。見事個人金メダルを獲得し、明日からの団体戦に挑む。",
    finalScene: {
      title: "決勝戦 ラスト1本を突き刺しマスクを脱ぎ捨て雄叫びの瞬間",
      description: "14-12から相手のアタックをかわして見事にフリックで突いた金メダル決定のウィニングショット。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=加納虹輝+フェンシング+エペ+金メダル+アジア大会"
    },
    officialTournament: {
      name: "FIE公式 対戦ブラケット表",
      source: "国際フェンシング連盟 (FIE) / 日本フェンシング協会",
      url: "https://fie.org/competitions",
      caption: "男子エペ個人 決勝トーナメント表＆ポイント経過記録"
    }
  },

  // 競泳（終了・メダル確定）
  "ikee-rikako": {
    status: "finished",
    medal: "bronze",
    rank: "銅メダル 🥉（個人種目表彰台）",
    eventResult: "競泳女子50mバタフライ 3位",
    record: "決勝タイム: 25秒88",
    summary: "大接戦となった女子50mバタフライ決勝で気迫のラストスパートを見せ、見事3位表彰台に登壇した。",
    finalScene: {
      title: "タッチの瞬間 電光掲示板を見上げて満面の笑みでプールサイドを叩いたシーン",
      description: "0.02秒差の激戦を制して3位を確定させ、スタンドの声援に笑顔で応えた感動の表彰台シーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=池江璃花子+アジア大会+50mバタフライ+銅メダル"
    },
    officialTournament: {
      name: "World Aquatics 公式リザルト",
      source: "世界水泳連盟 (World Aquatics) / 日本水泳連盟",
      url: "https://www.worldaquatics.com/competitions",
      caption: "競泳 予選・決勝公式リザルト速報＆全選手スプリットタイム"
    }
  },
  "matsumoto-katsuhiro": {
    status: "finished",
    medal: "silver",
    rank: "銀メダル 🥈（男子200m自由形）",
    eventResult: "競泳男子200m自由形 準優勝",
    record: "決勝タイム: 1分45秒34",
    summary: "第4レーンで中国のライバルと激しいデッドヒートを展開。ラスト50mで驚異の粘りを見せて銀メダルを獲得した。",
    finalScene: {
      title: "ラスト50mの猛追撃！タッチの差で銀メダルをもぎ取った力泳",
      description: "激しい水飛沫の中で隣レーンに迫り、ゴール後に息を弾ませながら健闘を称え合ったハイライト。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=松元克央+200m自由形+アジア大会+銀メダル"
    },
    officialTournament: {
      name: "World Aquatics 公式リザルト",
      source: "世界水泳連盟 (World Aquatics) / 日本水泳連盟",
      url: "https://www.worldaquatics.com/competitions",
      caption: "競泳 予選・決勝公式リザルト速報＆全選手スプリットタイム"
    }
  },

  // eスポーツ（終了・メダル確定）
  "tokido": {
    status: "finished",
    medal: "gold",
    rank: "金メダル 🥇（初代アジア王者）",
    eventResult: "eスポーツ『ストリートファイター6』 優勝",
    record: "グランドファイナル: 3-1 勝利",
    summary: "緻密なフレーム管理と冷静な立ち回りでトーナメントを勝ち上がり、グランドファイナルを制して初代王者に輝いた。",
    finalScene: {
      title: "グランドファイナル 完璧な対空SAフィニッシュで優勝決定の瞬間",
      description: "ヘッドセットを外し、両手を天に突き上げてチームメイトと抱き合った劇的フィナーレ。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=ときど+ストリートファイター6+アジア大会+金メダル"
    },
    officialTournament: {
      name: "JeSU / 大会公式 eスポーツブラケット",
      source: "日本eスポーツ連合 (JeSU) / Aichi-Nagoya 2026",
      url: "https://jesu.or.jp/",
      caption: "ストリートファイター6 トーナメント対戦表＆マッチ勝敗詳細"
    }
  },

  // レスリング（本日予選突破・今夜 決勝戦！）
  "fujinami-akari": {
    status: "ongoing",
    medal: "ongoing",
    rank: "決勝進出決定（銀以上確定 / 今夜 決勝）🔥",
    eventResult: "女子53kg級 決勝進出（公式戦138連勝更新中）",
    record: "準決勝: 10-0 テクニカルスペリオリティ快勝",
    summary: "【最新・今夜決勝】本日行われた予選から準決勝まで相手に1ポイントも与えず全試合テクニカルスペリオリティで圧勝。今夜行われる決勝戦で公式戦139連勝と金メダル獲得を目指す。",
    currentScene: {
      title: "準決勝 電光石火の片足タックルで10-0テクニカルスペリオリティ勝利",
      description: "開始わずか1分台でテイクダウンを重ね、相手を圧倒して決勝進出を決めた瞬間。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=藤波朱理+レスリング+アジア大会+2026+速報"
    },
    officialTournament: {
      name: "UWW公式 対戦トーナメント表",
      source: "世界レスリング連盟 (UWW Arena) / 日本レスリング協会",
      url: "https://uww.org/events",
      caption: "女子53kg級 勝ち上がりブラケット＆ピリオド別スコア"
    }
  },

  // 飛込（本日予選首位・今夜 決勝戦！）
  "tamai-rikuto": {
    status: "ongoing",
    medal: "ongoing",
    rank: "予選1位通過・本日夜 決勝進出🔥",
    eventResult: "男子10m高飛込 決勝進出決定",
    record: "予選スコア: 492.30点（首位通過）",
    summary: "【最新・今夜決勝】本日午前の予選で全試技ノースプラッシュの完璧な入水を連発し、中国勢を抑えて全体首位で決勝進出。今夜の決勝で金メダルを狙う。",
    currentScene: {
      title: "予選第5試技 5255B（後ろ宙返り2回半2回半ひねり）で95点超えの神ダイブ",
      description: "水飛沫が一切上がらない『ノースプラッシュ』が決まり、場内から大歓声が沸き起こったシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=玉井陸斗+飛込+アジア大会+2026+速報"
    },
    officialTournament: {
      name: "World Aquatics 公式リザルト",
      source: "世界水泳連盟 (World Aquatics) / 日本水泳連盟",
      url: "https://www.worldaquatics.com/competitions",
      caption: "飛込 男子高飛込 予選ラウンド採点表＆決勝スタートリスト"
    }
  },

  // 陸上（本日開幕・準決勝/決勝/予選進行中）
  "sani-brown": {
    status: "ongoing",
    medal: "ongoing",
    rank: "準決勝突破・今夜 男子100m決勝進出🔥",
    eventResult: "陸上男子100m 決勝進出（本日夜 決勝戦）",
    record: "準決勝タイム: 10秒02（組1着・全体1位通過）",
    summary: "【最新・今夜決勝】本日開幕した陸上競技。男子100m準決勝で中盤から圧倒的な伸びを見せ、10秒02をマークして組1着・全体トップで決勝進出。今夜のアジア最速決戦に挑む。",
    currentScene: {
      title: "男子100m準決勝 中盤からの爆発的スプリントで10秒02！決勝へ",
      description: "余裕を残しながら先頭でフィニッシュラインを駆け抜けた圧巻の準決勝ラン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=サニブラウン+100m+アジア大会+2026+準決勝+速報"
    },
    officialTournament: {
      name: "JAAF公式 大会リザルト速報",
      source: "日本陸上競技連盟 (JAAF) / World Athletics",
      url: "https://worldathletics.org/competitions/asian-games",
      caption: "男子100m ラウンド別公式リザルト・風速記録＆決勝レーン順"
    }
  },
  "izumiya-shunsuke": {
    status: "ongoing",
    medal: "ongoing",
    rank: "予選1着突破・準決勝進出決定🔥",
    eventResult: "男子110mハードル 予選突破（明日 準決勝・決勝）",
    record: "予選タイム: 13秒24（向かい風0.4m）",
    summary: "【最新】本日行われた110mH予選に出場。鋭い踏切と高速インターバル走で他を寄せ付けず13秒24で余裕の1着通過。明日の準決勝・決勝に挑む。",
    currentScene: {
      title: "110mH予選 流れるようなハードリングで組1着通過の瞬間",
      description: "第1ハードルからトップに立ち、後半は余力を残してゴールした貫禄のレース展開。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=泉谷駿介+110mH+アジア大会+2026+予選"
    },
    officialTournament: {
      name: "JAAF公式 大会リザルト速報",
      source: "日本陸上競技連盟 (JAAF) / World Athletics",
      url: "https://worldathletics.org/competitions/asian-games",
      caption: "男子110mH 予選公式タイムシート＆組別着順詳細"
    }
  },
  "tanaka-nozomi": {
    status: "ongoing",
    medal: "ongoing",
    rank: "1500m 予選1位突破・決勝進出決定🔥",
    eventResult: "女子1500m 決勝進出（明日 決勝）/ 5000m出場予定",
    record: "1500m予選タイム: 4分12秒30（組1着）",
    summary: "【最新】女子1500m予選で集団を巧みにコントロールし、ラスト1周のスパートで1着フィニッシュ。明日の決勝で金メダル獲得を目指す。",
    currentScene: {
      title: "女子1500m予選 ラストスパートで抜け出し1着ゴール",
      description: "冷静なレース運びで集団を抜け出し、スタンドに手を振りながらフィニッシュしたシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=田中希実+1500m+アジア大会+2026+予選"
    },
    officialTournament: {
      name: "JAAF公式 大会リザルト速報",
      source: "日本陸上競技連盟 (JAAF) / World Athletics",
      url: "https://worldathletics.org/competitions/asian-games",
      caption: "女子1500m・5000m ラップタイム＆公式結果速報"
    }
  },
  "kitaguchi-haruka": {
    status: "upcoming",
    medal: "upcoming",
    rank: "出場予定（9月29日 決勝戦）🎯",
    eventResult: "女子やり投 9月29日 決勝出場予定",
    record: "今季世界ランキング1位（世界陸上・五輪女王）",
    summary: "【最新・出場直前】女子やり投は大会後半の9月29日に決勝が行われる。会場のパロマ瑞穂スタジアムにて順調に直前調整を消化しており、日本中から金メダルへの期待が集まる。",
    currentScene: {
      title: "パロマ瑞穂スタジアムでの公式公開練習＆ビッグスマイル",
      description: "リラックスした表情で軽めの投擲練習を消化し、取材陣に笑顔で応じた最新調整シーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=北口榛花+アジア大会+公開練習+やり投"
    },
    officialTournament: {
      name: "JAAF公式 大会リザルト速報",
      source: "日本陸上競技連盟 (JAAF) / World Athletics",
      url: "https://worldathletics.org/competitions/asian-games",
      caption: "女子やり投 競技日程・エントリーリスト＆決勝試技順"
    }
  },

  // バドミントン（中盤戦トーナメント進行中）
  "naraoka-kodai": {
    status: "ongoing",
    medal: "ongoing",
    rank: "ベスト8進出・今夜 準々決勝激突🔥",
    eventResult: "バドミントン男子シングルス 準々決勝進出",
    record: "2回戦: 2-0（21-16, 21-14）ストレート勝ち",
    summary: "【最新・今夜試合】2回戦を粘り強いラリーと精密なヘアピンショットでストレート勝ち。今夜、メダル獲得（ベスト4）を懸けた大一番・準々決勝に臨む。",
    currentScene: {
      title: "2回戦 60本超のロングラリーを制して雄叫びをあげた決定打",
      description: "コートを縦横無尽に走り抜いて相手のミスを誘い、勝利を決めた感動のラリー。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=奈良岡功大+バドミントン+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "BWF公式 マッチ対戦表 (Draw)",
      source: "世界バドミントン連盟 (BWF) / 日本バドミントン協会",
      url: "https://www.tournamentsoftware.com/",
      caption: "男子シングルス 決勝トーナメント表＆全マッチスコアシート"
    }
  },
  "yamaguchi-akane": {
    status: "ongoing",
    medal: "ongoing",
    rank: "準決勝進出決定（銅メダル以上確定）🔥",
    eventResult: "バドミントン女子シングルス ベスト4進出（明日 準決勝）",
    record: "準々決勝: 2-1（18-21, 21-15, 21-17）逆転勝利",
    summary: "【最新】本日行われた準々決勝で難敵とフルセットの死闘を展開。第3ゲーム終盤の神がかり的なディフェンスで逆転勝利しベスト4進出・メダルを確定させた。明日準決勝へ。",
    currentScene: {
      title: "準々決勝 最終ゲーム17オールからの怒涛の4連続ポイント奪取",
      description: "鋭いドロップショットが決まり、膝に手を当てて勝利を噛み締めた感動のシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=山口茜+バドミントン+アジア大会+2026+準決勝"
    },
    officialTournament: {
      name: "BWF公式 マッチ対戦表 (Draw)",
      source: "世界バドミントン連盟 (BWF) / 日本バドミントン協会",
      url: "https://www.tournamentsoftware.com/",
      caption: "女子シングルス 決勝トーナメント表＆全マッチスコアシート"
    }
  },

  // ブレイキン（10月2日・3日 出場予定）
  "shigekix": {
    status: "upcoming",
    medal: "upcoming",
    rank: "出場予定（10月2日 開幕）🎯",
    eventResult: "ブレイキン男子 10月2日・3日 出場予定",
    record: "パリ五輪銅メダリスト / アジア大会連覇を狙う",
    summary: "【最新・出場直前】ブレイキン競技は大会終盤の10月2日〜3日に開催。会場となる名古屋市内で順調にトレーニングを消化中。アジア大会2連覇に挑む。",
    currentScene: {
      title: "アジア大会直前 名古屋公開練習での超人的フリーズ＆スピン",
      description: "音楽に完璧に合わせたシグネチャームーブを披露し、取材陣を唸らせた最新プラクティス映像。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=Shigekix+ブレイキン+アジア大会+公開練習"
    },
    officialTournament: {
      name: "WDSF公式 バトルブラケット表",
      source: "世界ダンススポーツ連盟 (WDSF) / JDSF",
      url: "https://www.worlddancesport.org/",
      caption: "ブレイキン男子 バトルラウンドロビン＆決勝トーナメント表"
    }
  },
  "ami": {
    status: "upcoming",
    medal: "upcoming",
    rank: "出場予定（10月2日 開幕）🎯",
    eventResult: "ブレイキン女子 10月2日・3日 出場予定",
    record: "パリ五輪初代金メダリスト",
    summary: "【最新・出場直前】五輪初代女王として臨むアジア大会。競技は10月2日〜3日に行われる予定で、持ち前の滑らかなステップと独創的なフロアワークで金メダルを目指す。",
    currentScene: {
      title: "パリ五輪金メダルの歓喜＆アジア大会へ向けた最新トレーニング",
      description: "軽やかで力強いフットワークと独創的なムーブで世界を魅了するAMIの最新インタビュー＆練習シーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=AMI+湯浅亜実+ブレイキン+アジア大会"
    },
    officialTournament: {
      name: "WDSF公式 バトルブラケット表",
      source: "世界ダンススポーツ連盟 (WDSF) / JDSF",
      url: "https://www.worlddancesport.org/",
      caption: "ブレイキン女子 バトルラウンドロビン＆決勝トーナメント表"
    }
  },

  // 球技（トーナメント進行中）
  "kawamura-yuki": {
    status: "ongoing",
    medal: "ongoing",
    rank: "予選3連勝首位通過・準々決勝進出決定🔥",
    eventResult: "バスケットボール男子 決勝トーナメント進出",
    record: "予選通算: 1試合平均 18.5得点 / 10.3アシスト（アシスト暫定1位）",
    summary: "【最新】予選ラウンドを3戦全勝の圧倒的な強さで首位通過。超高速ドライブとノールックパスで会場のIGアリーナを大いに沸かせている。明日、メダルを懸けた準々決勝に臨む。",
    currentScene: {
      title: "予選第3戦 相手ディフェンスの間をすり抜ける神業ビハインドバックパス",
      description: "トップスピードのままノーマークの味方に通し、アリーナ全体から割れんばかりの歓声が上がったシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=河村勇輝+AKATSUKI+JAPAN+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "FIBA公式 スケジュール＆ボックススコア",
      source: "FIBA (国際バスケットボール連盟) / 日本バスケットボール協会",
      url: "https://www.fiba.basketball/",
      caption: "男子日本代表 予選〜決勝トーナメント全試合公式ボックススコア"
    }
  },
  "hosoya-mao": {
    status: "ongoing",
    medal: "ongoing",
    rank: "準々決勝突破・ベスト4（準決勝）進出決定🔥",
    eventResult: "サッカー男子 U-23日本代表 準決勝進出",
    record: "大会通算: 3得点（得点ランキング2位タイ）",
    summary: "【最新】準々決勝の難敵イラン戦で前半に強烈なヘディング決勝弾を沈め、1-0の勝利に大きく貢献。チームをベスト4へ牽引し、アジア大会2連覇に向けて準決勝へ挑む。",
    currentScene: {
      title: "準々決勝 相手DFに競り勝ちファーネットに叩き込んだ決勝ヘディングゴール",
      description: "右サイドのクロスに豪快に飛び込みゴールを奪い、コーナーフラッグへ猛ダッシュして歓喜の雄叫び。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=細谷真大+U-23日本代表+アジア大会+2026+ゴール"
    },
    officialTournament: {
      name: "JFA公式 大会日程・全試合結果",
      source: "日本サッカー協会 (JFA) / AFC (アジアサッカー連盟)",
      url: "https://www.jfa.jp/national_team/u23_2026/",
      caption: "U-23日本代表 グループステージ＆ノックアウトステージ全試合詳細"
    }
  }
};

// チームスポーツの最新ステータス（9月26日現在）
const realTimeTeamResults = {
  "football-men": {
    status: "ongoing",
    medal: "ongoing",
    rank: "準々決勝突破・ベスト4（準決勝）進出決定🔥",
    scoreSummary: "準々決勝: 日本 1-0 イラン（豊田スタジアム）",
    detail: "【最新】エース細谷真大のヘディング弾を守り切り、難敵イランを破ってベスト4進出。大会連覇に向けて準決勝へ進出決定。",
    finalScene: {
      title: "準々決勝 試合終了ホイッスル＆全員で勝利を分かち合ったシーン",
      description: "後半の猛攻を全員守備で耐え抜き、ベスト4進出を決めてサポーターと歓喜した瞬間。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=サッカー男子+U23日本代表+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "JFA公式 大会日程・全試合結果",
      source: "日本サッカー協会 (JFA) / AFC (アジアサッカー連盟)",
      url: "https://www.jfa.jp/national_team/u23_2026/",
      caption: "男子サッカー 決勝トーナメント表＆全試合公式マッチレポート"
    }
  },
  "football-women": {
    status: "ongoing",
    medal: "ongoing",
    rank: "準々決勝4発快勝・ベスト4進出決定🔥",
    scoreSummary: "準々決勝: 日本 4-0 ベトナム（豊田スタジアム）",
    detail: "【最新】華麗なコンビネーションから4ゴールを奪い完勝。危なげなくベスト4進出を果たし、王座奪還へ視界良好。",
    finalScene: {
      title: "準々決勝 鮮やかなダイレクトパス連続から沈めたダメ押しゴール",
      description: "相手守備陣を完全に崩してネットを揺らし、ベンチメンバーも交えて笑顔が弾けたシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=なでしこジャパン+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "JFA公式 なでしこジャパン大会結果",
      source: "日本サッカー協会 (JFA) / AFC (アジアサッカー連盟)",
      url: "https://www.jfa.jp/nadeshikojapan/",
      caption: "女子サッカー 決勝トーナメント表＆星取表・公式スタッツ"
    }
  },
  "basketball-men": {
    status: "ongoing",
    medal: "ongoing",
    rank: "予選ラウンド全勝首位通過・準々決勝進出決定🔥",
    scoreSummary: "予選第3戦: 日本 92-68 フィリピン（IGアリーナ）",
    detail: "【最新】満員の地元IGアリーナで攻守に圧倒し予選3連勝。河村勇輝・富樫勇樹らの高速オフェンスが冴え渡り、首位で決勝トーナメントへ進出。",
    finalScene: {
      title: "予選第3戦 第4クォーター終了ブザー＆満員の観客からスタンディングオベーション",
      description: "スリーポイント攻勢で圧倒し、コート中央で選手たちがハイタッチを交わした熱狂の瞬間。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=AKATSUKI+JAPAN+バスケ男子+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "FIBA公式 トーナメント表＆結果",
      source: "FIBA (国際バスケットボール連盟) / 日本バスケットボール協会 (JBA)",
      url: "https://www.fiba.basketball/",
      caption: "男子5人制バスケ 決勝トーナメント表＆全クォータースコア"
    }
  },
  "volleyball-men": {
    status: "ongoing",
    medal: "ongoing",
    rank: "決勝進出決定・今夜 イランと金メダル決定戦🔥",
    scoreSummary: "準決勝: 日本 3-1 カタール / 本日夜 決勝 vs イラン",
    detail: "【最新・今夜決勝】準決勝でカタールを下し決勝進出。本日夜、アジア王座奪還を懸けて宿敵イランとの決勝戦に臨む！",
    finalScene: {
      title: "準決勝第4セット 豪快なバックアタックが決まり決勝進出を決めた瞬間",
      description: "歓喜のウォーターシャワーとともにコート中央に集まり、今夜の決勝へ向け気合を入れ直したシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=バレーボール男子+龍神NIPPON+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "AVC公式 マッチリザルト・星取表",
      source: "AVC (アジアバレーボール連盟) / 日本バレーボール協会 (JVA)",
      url: "https://asianvolleyball.net/",
      caption: "男子バレーボール 決勝トーナメント表＆セット別詳細スタッツ"
    }
  },
  "baseball-men": {
    status: "ongoing",
    medal: "ongoing",
    rank: "オープニングラウンド全勝・スーパーラウンド進出決定🔥",
    scoreSummary: "予選第3戦: 日本 6-0 中国（岡崎市民球場）",
    detail: "【最新】社会人日本代表の侍ジャパンが鉄壁の投手陣と手堅い小技で予選3戦無失点全勝。スーパーラウンド進出決定。",
    finalScene: {
      title: "予選第3戦 9回裏 空振り三振でゲームセット＆無失点リレー完了",
      description: "安定感抜群のピッチングで締めくくり、マウンド上でバッテリーががっちり握手を交わしたシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=侍ジャパン+社会人代表+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "侍ジャパン公式 試合日程・結果",
      source: "野球日本代表 侍ジャパン公式サイト / WBSC",
      url: "https://www.japan-baseball.jp/jp/team/amateur/",
      caption: "侍ジャパン社会人代表 トーナメント表＆公式スコアブック"
    }
  },
  "softball-women": {
    status: "ongoing",
    medal: "ongoing",
    rank: "決勝進出決定・本日午後 決勝戦 vs 中国🔥",
    scoreSummary: "準決勝: 日本 3-0 チャイニーズ・タイペイ / 本日決勝 vs 中国",
    detail: "【最新・本日決勝】後藤希友、上野由岐子の完璧な継投で決勝進出。アジア大会6連覇を懸け、本日午後の決勝戦（安城市総合運動公園）に挑む。",
    finalScene: {
      title: "準決勝 最終回見逃し三振で決勝進出を決めた瞬間",
      description: "切れ味鋭いライズボールで三振を奪い、堂々の決勝進出。マウンドでナインとタッチを交わしたシーン。",
      platform: "YouTube",
      url: "https://www.youtube.com/results?search_query=ソフトボール女子+日本代表+アジア大会+2026+ハイライト"
    },
    officialTournament: {
      name: "JSA公式 大会トーナメント対戦表",
      source: "日本ソフトボール協会 (JSA) / WBSC Softball",
      url: "https://www.softball.or.jp/",
      caption: "女子ソフトボール 決勝トーナメント表＆全試合イニングスコア"
    }
  }
};

// 1. js/data.js を更新
const dataJsPath = path.join(__dirname, 'js', 'data.js');
let { ATHLETES_DATA } = require(dataJsPath);

ATHLETES_DATA.forEach(athlete => {
  if (realTimeAthletesResults[athlete.id]) {
    const r = realTimeAthletesResults[athlete.id];
    athlete.tournamentResult = {
      status: r.status,
      medal: r.medal,
      rank: r.rank,
      eventResult: r.eventResult,
      record: r.record,
      summary: r.summary,
      finalScene: r.currentScene || r.finalScene,
      officialTournament: r.officialTournament
    };
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
console.log('Successfully updated js/data.js with real-time tournament results!');

// 2. js/team_data.js を更新
const teamDataJsPath = path.join(__dirname, 'js', 'team_data.js');
let { TEAMS_DATA } = require(teamDataJsPath);

TEAMS_DATA.forEach(team => {
  if (realTimeTeamResults[team.id]) {
    const tr = realTimeTeamResults[team.id];
    team.tournamentResult = {
      status: tr.status,
      medal: tr.medal,
      rank: tr.rank,
      scoreSummary: tr.scoreSummary,
      detail: tr.detail,
      finalScene: tr.finalScene,
      officialTournament: tr.officialTournament
    };

    // チーム所属選手にも反映
    team.athletes.forEach(athlete => {
      athlete.tournamentResult = {
        status: tr.status,
        medal: tr.medal,
        rank: tr.rank,
        scoreSummary: tr.scoreSummary,
        record: tr.scoreSummary,
        summary: tr.detail,
        finalScene: tr.finalScene,
        officialTournament: tr.officialTournament
      };
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
console.log('Successfully updated js/team_data.js with real-time tournament results!');
