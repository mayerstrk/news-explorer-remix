export async function getMockArticles() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, response: { articles: data, status: '200' } }
}

const data = [
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '好市多知名咖啡球每杯10元 會員回購率高 大讚：3秒速成拿鐵',
    description:
      '一名男子近日在好市多買到一款奶精球大小的咖啡球，打開倒入裝有鮮奶的馬克杯裡，3秒就能立刻喝到冰涼的拿鐵咖啡，每顆平均不到10元，吸引他回購，大讚「方便又好喝」，貼文引發關注，買過多次的會員推薦加燕麥奶或奶茶，風味也很好。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_88a66aee-0349-4065-be22-51b57a1295da',
    urlToImage: null,
    publishedAt: '2024-04-06T22:48:23Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '雷雨區逼近本港　廣泛地區短期內或有大雨',
    description:
      '【on.cc東網專訊】位於珠江口的雷雨區正逐漸靠近，天文台今日(7日)透過特別天氣提示指，短期內香港廣泛地區可能受大雨影響，提醒市民提高警惕。雷暴警告現正生效。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_6401ffc3-6ba5-4374-aa04-3cc21847293a',
    urlToImage: null,
    publishedAt: '2024-04-06T22:48:21Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Esporte News Mundo',
    title:
      'Atuações ENM: Lucero marca, é destaque de um Fortaleza que tem atuação ruim, com defesa que tem muitas dificuldades e perde nos pênaltis o Clássico-Rei pela final do Campeonato Cearense, impossibilitando o hexacampeonato consecutivo por parte do Leão do Picí; veja notas',
    description:
      'Lucero marca e sai como destaque de um Fortaleza que joga mal e perde nos pênaltis a final do Campeonato Cearense.',
    url: 'https://www.terra.com.br/esportes/futebol/estaduais/campeonato-cearense/atuacoes-enm-lucero-marca-e-destaque-de-um-fortaleza-que-tem-atuacao-ruim-com-defesa-que-tem-muitas-dificuldades-e-perde-nos-penaltis-o-classico-rei-pela-final-do-campeonato-cearense-impossibilitando-o-hexacampeonato-consecutivo-por-parte-do-leao-do-pici-veja-notas,229a9889cc963169ca7a3df40c20de91nw10ybuj.html',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/202837105-lucero-gol.jpeg',
    publishedAt: '2024-04-06T22:48:15Z',
    content:
      'Fortaleza e Ceará se enfrentaram pelo segundo jogo da final do Campeonato Cearense, na Arena Castelão, neste sábado (6). As equipes empataram o jogo no tempo regulamentar por 1×1 e nos pênaltis o Cea… [+1624 chars]',
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Esporte News Mundo',
    title: 'Atletismo: Matheus Lima alcança segundo índice olímpico para Paris',
    description:
      'Matheus se juntou a Alison dos Santos, o Piu, campeão mundial de 2022 e bronze nas Olimpíadas de Tóquio nos 400m com barreiras',
    url: 'https://www.terra.com.br/esportes/jogos-olimpicos/atletismo-matheus-lima-alcanca-segundo-indice-olimpico-para-paris,64363b3bb59ac3fb6a9696284a651dcexv28zaf6.html',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/325027430-matheus-lima.png',
    publishedAt: '2024-04-06T22:48:11Z',
    content:
      'Matheus Lima conseguiu neste sábado o índice olímpico para disputar uma segunda prova nos Jogos de Paris 2024. Já com a marca classificatória para os 400m rasos, o brasileiro de 20 anos alcançou agor… [+922 chars]',
  },
  {
    source: { id: 'fox-news', name: 'Fox News' },
    author: 'Chantz Martin',
    title:
      "Charles Barkley, Stephen A. Smith's remarks on immigration resurface with months to go before election",
    description:
      'Charles Barkley is one of the most outspoken sports media figures. The NBA great was a guest on "The Stephen A. Smith Show" in February, and the pair discussed immigration issues.',
    url: 'https://www.foxnews.com/sports/charles-barkley-stephen-a-smiths-remarks-on-immigration-resurface-with-months-to-go-before-election',
    urlToImage:
      'https://static.foxnews.com/foxnews.com/content/uploads/2024/04/Charles-Barkely-Stephen-A-Smith.jpg',
    publishedAt: '2024-04-06T22:47:53Z',
    content:
      'Longtime sports commentator and television host Stephen A Smith was joined by Naismith Memorial Basketball Hall of Famer Charles Barkely during a late February edition of his podcast, "The Stephen A.… [+3586 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '強震襲台灣建築損害低於預期　中國網友熱議',
    description:
      '[NOWnews今日新聞]台灣在3日早上發生規模7.2地震，是921地震後25年來規模最大，引起國際社會關注。由於這次地震造成的建築損傷和人員傷亡低於921地震，有外媒指出，這歸因於台灣多年來對建築盎...',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_493395a8-4e32-4fb0-9d98-103728d17b7d',
    urlToImage: null,
    publishedAt: '2024-04-06T22:47:51Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'iG Gente, iG Gente',
    title:
      'Jojo Todynho leva invertida após criticar palestra de Direitos Humanos',
    description:
      'Estudante de direito reprovou a apresentação de Rodrigo Mondego, procurador da Comissão de Direitos Humanos da OAB-RJ',
    url: 'https://gente.ig.com.br/celebridades/2024-04-06/jojo-todynho-leva-invertida-apos-criticar-palestra-de-direitos-humanos.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/a4/3c/4s/a43c4s1ikwkpo9v5ssv2yn7sz.jpg',
    publishedAt: '2024-04-06T22:47:11Z',
    content:
      'A influenciadora Jojo Todynho causou polêmica nesta sexta-feira (5) ao criticar uma palestra de Direitos Humanos. No Instagram, a estudante de direito acusou o palestrante de parcialidade. Responsáve… [+1425 chars]',
  },
  {
    source: { id: null, name: 'Minneapolis Star Tribune' },
    author: 'Star Tribune Staff',
    title:
      'Brewers place starter Jakob Junis on injured list, recall former top-prospect Aaron Ashby',
    description:
      'The Milwaukee Brewers placed starting pitcher Jakob Junis on the 15-day injured list Saturday because of a right shoulder impingement, retroactive to Wednesday.',
    url: 'https://www.startribune.com/brewers-place-starter-jakob-junis-on-injured-list-recall-former-top-prospect-aaron-ashby/600356926/',
    urlToImage:
      'https://www.startribune.com/static/img/branding/logos/strib-social-card.png?d=1711485830',
    publishedAt: '2024-04-06T22:47:01Z',
    content:
      'MILWAUKEE The Milwaukee Brewers placed starting pitcher Jakob Junis on the 15-day injured list Saturday because of a right shoulder impingement, retroactive to Wednesday.\r\n' +
      'Left-hander Aaron Ashby, at… [+853 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '象牙海岸前領袖拚重回總統寶座 資格問題成爭議',
    description:
      '（中央社象牙海岸阿格波市6日綜合外電報導）數千名象牙海岸民眾今天聚集在阿格波市（Agboville），聆聽前總統巴波（Laurent Gbagbo）宣布投入總統選戰，即便巴波並不參選資格。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_f333c944-be20-4e34-afbc-fd30fb87d671',
    urlToImage: null,
    publishedAt: '2024-04-06T22:46:57Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '《好聲音》提告李玟經紀公司！原定9日上海開庭傳取消　原因曝光',
    description:
      '[周刊王CTWANT] 天眼查App顯示，《中國好聲音》節目製作方上海燦星文化傳媒股份有限公司，去年9月新增1則開庭公告信息，被告為華納唱片中國（香港）有限公司（WARNER MUSIC CHINA(HK)LIMITED)，案由為其他合同糾紛，案件將於今年4月9日在上海市第一中級人民法院開庭審理，具體案由尚不清楚。...',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_b3cc5776-7503-45f8-b078-0009d8b68015',
    urlToImage: null,
    publishedAt: '2024-04-06T22:46:48Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Pipoca Moderna',
    title: 'Flora Matos insinua que Beyoncé plagiou seu hit "Piloto"',
    description:
      'A brasileira sugere que a estrela pop se apropriou de seu flow na gravação da faixa "Bodyguard", do álbum "Cowboy Carter"',
    url: 'https://www.terra.com.br/diversao/musica/flora-matos-insinua-que-beyonce-plagiou-seu-hit-piloto,67417cf0a62188e0e6c71a45a5ac3dc5e1wyfmqt.html',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/1048941376-flora-matos.jpg',
    publishedAt: '2024-04-06T22:45:31Z',
    content:
      'Flora Matos comemorou o sucesso de seu hit "Piloto", que acumula mais de 80 milhões de plays no Spotify, com uma insinuação de plágio de Beyoncé. Segundo a rapper brasileira, a estrela pop se apropri… [+1675 chars]',
  },
  {
    source: { id: null, name: '/FILM' },
    author: 'staff@slashfilm.com (Danielle Ryan)',
    title:
      "The Wicker Man's Signature Bonfire Ran Into Trouble With A Goat's Bladder",
    description:
      'Shooting the famous ending scene of The Wicker Man ran into problems thanks to a goat.',
    url: 'https://www.slashfilm.com/1547285/the-wicker-man-horror-bonfire-goat-bladder-trouble/',
    urlToImage:
      'https://www.slashfilm.com/img/gallery/the-wicker-mans-signature-bonfire-ran-into-trouble-with-a-goats-bladder/l-intro-1711381951.jpg',
    publishedAt: '2024-04-06T22:45:30Z',
    content:
      'In a retrospective for The Guardian, director Robin Hardy explained that they actually built and burned a giant wicker man, which was large enough to hold at least Woodward, Hardy, a cameraperson, an… [+989 chars]',
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Banda B',
    title: 'Título paranaense coroa começo da "era Cuca" no Athletico',
    description:
      'Cuca já está na história do Athletico. O título paranaense, conquistado neste sábado (6), com a vitória por 3×0 sobre...',
    url: 'https://www.terra.com.br/esportes/atletico-pr/titulo-paranaense-coroa-comeco-da-era-cuca-no-athletico,fae101eb85620384f2ec6d149c39dc89155vdbgv.html',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/1936154187-cuca-tecnico-athletico.jpeg',
    publishedAt: '2024-04-06T22:45:19Z',
    content:
      'Cucajá está na história do Athletico. O título paranaense, conquistado neste sábado (6), com a vitória por 3×0 sobre o Maringá, já colocou o treinador na lista de vencedores do Furacão ao longo de se… [+2103 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '明迎開工日！星巴克連2天「特大杯買1送1」　超商美式、拿鐵「買2送1」',
    description:
      '記者劉沛妘／台北報導 清明連假進入尾聲！超商、連鎖咖啡紛紛祭出好康優惠，包含星巴克4月8日至4月9日連2天「特大杯買1送1」；OKmart咖啡買2送1、7-ELEVE',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_6658c1cf-6edf-40e4-88a1-68b3b1e25640',
    urlToImage: null,
    publishedAt: '2024-04-06T22:45:12Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Screen Rant' },
    author: 'Dhruv Sharma',
    title:
      "What Happened To The Body In Olivia's Car? Sugar Episode 2 Mystery & Theories Explained",
    description:
      "Sugar does not disclose much about the body in Olivia's car in episode 2 but leaves enough room for speculation and theories by dropping many clues.",
    url: 'https://screenrant.com/what-happened-to-clifford-carter-body-car-sugar-episode-2/',
    urlToImage:
      'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/04/what-happened-to-the-body-in-olivia-s-car-sugar-episode-2-mystery-theories-explained.jpg',
    publishedAt: '2024-04-06T22:45:11Z',
    content:
      'This article has mention of rape and murder.\r\n' +
      'Warning! This post contains spoilers for Sugar.\r\n' +
      'Summary\r\n' +
      '<ul><li>\r\n' +
      " Sugar's initial episodes set up a complex murder mystery, with intriguing clues hint… [+5664 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '澳洲新南威爾斯州洪水侵襲 數百人急待救援',
    description:
      '在澳洲東南部的新南威爾斯州(New South Wales)多個地區今天(7日)宣布發生自然災害後，該州大面積的洪水侵襲導致數百人需要緊急救援。 緊急服務部門表示，這個週末發生的強降雨導致雪梨東北部約300戶家庭被迫緊急疏散。 聯邦緊急事務管理部長凱瑟琳．金(Catherine King)表示，洪水在很短的時間內，對新南威爾斯州造成了大範圍的破壞。 凱瑟琳．金接著說：「新南威爾斯州政府正持續評估損失，並了解這場災難帶來的影響。」 新南威爾斯州急難救助廳廳長狄布(Jihad Dib)表示，自5日以來，緊急救援人員已…',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8185d0a2-7ba6-486c-aed5-8d9a78071a3d',
    urlToImage: null,
    publishedAt: '2024-04-06T22:44:20Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '在台港澳大專學生運動會 運動競技凝聚情誼默契',
    description:
      '（中央社記者李雅雯台北7日電）中華全國在台港澳大專學生聯合會（港澳學聯）6至7日連續兩天在逢甲大學舉辦港澳大專學生運動會，在台港澳生透過運動競技增進交流，凝聚情誼默契。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_b38d170d-4d19-43e2-b39b-5ea28b629fad',
    urlToImage: null,
    publishedAt: '2024-04-06T22:43:55Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Observador.pt' },
    author: 'Agência Lusa',
    title:
      'Segundo sismo, de magnitude 2,5 na escala de Richter, sentido na ilha Terceira',
    description:
      'Um novo sismo com magnitude 2,5 na escala de Richter, o segundo abalo registado este sábado na ilha Terceira, foi sentido às 20:43 locais (21:43 em Lisboa).',
    url: 'https://observador.pt/2024/04/06/segundo-sismo-de-magnitude-25-na-escala-de-richter-sentido-na-ilha-terceira/',
    urlToImage:
      'https://wm.observador.pt/wm/obs/l/https%3A%2F%2Fbordalo.observador.pt%2Fv2%2Frs%3Afill%3A770%3A403%2Fc%3A2000%3A1122%3Anowe%3A0%3A37%2Fq%3A85%2Fplain%2Fhttps%3A%2F%2Fs3.observador.pt%2Fwp-content%2Fuploads%2F2024%2F01%2F14203318%2F42144557.jpg',
    publishedAt: '2024-04-06T22:43:53Z',
    content:
      'Um novo sismo com magnitude 2,5 na escala de Richter, o segundo abalo registado este sábado na ilha Terceira, foi sentido às 20:43 locais (21:43 em Lisboa), informou o Centro de Informação e Vigilânc… [+2174 chars]',
  },
  {
    source: { id: 'fox-sports', name: 'Fox Sports' },
    author: null,
    title:
      'Yankees reliever Jonathan Loáisiga to miss 10-12 months with elbow surgery',
    description:
      'New York Yankees reliever Jonathan Loáisiga says he needs season-ending elbow surgery and will be sidelined for 10-12 months.',
    url: 'https://www.foxsports.com/stories/mlb/yankees-reliever-jonathan-loaisiga-to-miss-10-12-months-with-elbow-surgery',
    urlToImage:
      'https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/04/1408/814/loaisiga2.jpg?ve=1&tl=1',
    publishedAt: '2024-04-06T22:43:50Z',
    content:
      'With a downcast look and a soft voice, New York Yankees reliever Jonathan Loáisiga said he needs season-ending elbow surgery and will be sidelined for 10 to 12 months.\r\n' +
      'A 29-year-old right-hander, Lo… [+3428 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: 'MLB》計時器害投手容易受傷？大聯盟回應：沒有相關證據',
    description:
      '大聯盟本季縮短投球時限，無人在壘時投手須於15秒內將球投出，壘上有跑者時須於20秒內投出（今年縮短到18秒），違規的投手會被罰1顆壞球。球員工會擔憂增加投手受傷的風險，但是大聯盟7日發出聲明駁斥，投手受傷是因為猛飆球速、以及投球的轉速愈來愈快，與投球計時器無關。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_94fc29fd-cc71-4c7c-a418-6cfe83ec8c47',
    urlToImage: null,
    publishedAt: '2024-04-06T22:43:24Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '花蓮地震／希臘遊客太魯閣白楊步道坍救12人 英雄事蹟傳為佳話',
    description:
      '花蓮3日發生規模7.2地震，太魯閣園區內落石坍方嚴重，希臘籍遊客Dimitris Belbas在白楊步道英勇帶出受困7人，再奔赴找警方聯手同來，以結繩架梯方式，把2大3小一家5口救出。這段「希臘英雄」救難事蹟，昨天在受困天祥的災民陸續撤出後傳開來。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_a27a0918-5776-4c0e-a9fe-9a222e09f7e1',
    urlToImage: null,
    publishedAt: '2024-04-06T22:42:21Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'Andrea Kane',
    title: 'What’s the best diet for weight loss? | CNN',
    description:
      'Keto, low-fat, vegan or intermittent fasting? Many diets claim to be the best way to lose weight, but which ones work? A Stanford University professor weighs in.',
    url: 'https://www.cnn.com/2024/04/06/health/best-diet-weight-loss-wellness/index.html',
    urlToImage:
      'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1455851287-copy.jpg?c=16x9&q=w_800,c_fill',
    publishedAt: '2024-04-06T22:41:51Z',
    content:
      'Season 9 of the CNN podcast Chasing Life With Dr. Sanjay Gupta explores the intersection between body weight and health. We delve into a wide range of topics, including the truth about menopausal wei… [+6036 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '天王星大樓成打卡勝地？男女開心擺拍遭撻伐',
    description:
      '花蓮天王星大樓，受到強震影響嚴重傾斜，造成一名33歲的康姓女教師不幸喪生，目前仍在進行拆除作業。不過，有民眾發現，竟然有一男一女將天王星大樓當成打卡景點，到現場開心擺拍，遭批評用別人的悲劇，滿足自己的娛樂，不過也有人認為，可能是受災戶在苦中作樂，但管理員看過照片表示，他們並不是這裡的住戶。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_d7cb6e16-d37e-45bc-ab13-47f269cb640f',
    urlToImage: null,
    publishedAt: '2024-04-06T22:41:40Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: 'Sooners Wire',
    title: 'Sooners land commitment from three-star safety Marcus Wimberly',
    description:
      'Oklahoma lands its 11th commit of the 2025 cycle with a pledge from safety Marcus Wimberly.',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_da705cf2-ec31-4bad-89cf-40502187b71d',
    urlToImage: null,
    publishedAt: '2024-04-06T22:41:07Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '菲律賓駐台代表赴花蓮災區 探視1400名菲國移工',
    description:
      '（中央社記者張已亷、李先鳳花蓮縣7日電）馬尼拉經濟文化辦事處主席兼駐台代表貝世偉今天表示，受總統小馬可仕指示來台關心花蓮地震情況，對花蓮跟台灣表達哀悼之情，同時探視在花蓮的1400名菲律賓移工。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_6f2fca8d-e586-4941-a7c6-dcb60cd4b1bc',
    urlToImage: null,
    publishedAt: '2024-04-06T22:40:52Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'New York Post' },
    author: 'Joseph Staszewski',
    title:
      'WWE WrestleMania 40 live updates: Latest news, highlights, reaction for Night 1',
    description:
      'The Rock will finally come back to a WWE ring – and he will do so in one of the biggest tag matches in company history Dwayne “The Rock” Johnson will take part in his first true WWE match in 11 years – since he lost to John Cena in the main event of WrestleMa…',
    url: 'https://nypost.com/2024/04/06/sports/wrestlemania-40-live-updates-latest-wwe-news-highlights-reaction/',
    urlToImage:
      'https://nypost.com/wp-content/uploads/sites/2/2024/04/wrestlemania-blog.jpg?quality=75&strip=all&w=1024',
    publishedAt: '2024-04-06T22:40:44Z',
    content:
      'The Rock will finally come back to a WWE ring and he will do so in one of the biggest tag matches in company history\r\n' +
      'Dwayne The Rock Johnson will take part in his first true WWE match in 11 years si… [+789 chars]',
  },
  {
    source: { id: null, name: 'Olhardigital.com.br' },
    author: 'Pedro Spadoni',
    title: 'Apple libera emuladores de jogos retrô na App Store',
    description:
      'Atualização nas diretrizes da Apple para desenvolvedores permite até a disponibilização de jogos para download nos emuladores; entenda\n' +
      'O post Apple libera emuladores de jogos retrô na App Store apareceu primeiro em Olhar Digital.',
    url: 'https://olhardigital.com.br/2024/04/06/games-e-consoles/apple-libera-emuladores-de-jogos-retro-na-app-store/',
    urlToImage:
      'https://olhardigital.com.br/wp-content/uploads/2024/04/Destaque-Jogo-em-iPhone-695x500.jpg',
    publishedAt: '2024-04-06T22:40:21Z',
    content:
      'A Apple passou a permitir emuladores de jogos na App Store, sua loja de aplicativos. As diretrizes atualizadas, notadas primeiro pelo site 9to5Mac, agora afirmam que aplicativos que emulam consoles d… [+2741 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '中職／陳柏豪K暈前東家兄弟好興奮　盼不要記進江坤宇「西殺那一條」',
    description:
      '記者張沛嘉／台北報導 陳柏豪休賽季期間轉戰樂天桃猿，6日在台北大巨蛋首度對決前東家中信兄弟，面對3個打席連飆3K，並靠隊友9局下的再見安打收下勝投，談到三振命運轉換的',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8860b13d-c96f-4525-8944-c027b404f018',
    urlToImage: null,
    publishedAt: '2024-04-06T22:40:21Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: '[Removed]' },
    author: null,
    title: '[Removed]',
    description: '[Removed]',
    url: 'https://removed.com',
    urlToImage: null,
    publishedAt: '1970-01-01T00:00:00Z',
    content: '[Removed]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '花蓮地震／各界善款破億　妙天、徐欣瑩再合捐1000萬賑災',
    description:
      '花蓮因規模7.2強震受創嚴重，各界賑災善款已突破1億多元，悟覺妙天禪師與國民黨立委徐欣瑩也共捐1000萬元，昨天徐欣瑩代表妙天前往花蓮，由縣府官員接受千萬善款，隨後，徐欣瑩也和縣長徐榛蔚會面，親自表達慰問之意。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_4a4d9a30-18a5-4877-b135-2e0bd6d17d69',
    urlToImage: null,
    publishedAt: '2024-04-06T22:40:14Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Nerdmaldito.com' },
    author: 'Unknown',
    title:
      'Personagens do Junji Ito no game Identify V, veja a jogabilidade do mais puro horror!',
    description:
      'Apesar do autor Junji Ito ter obras sérias como Declínio de um Homem , ou ainda a obra prima que é sua adaptação de Frankenstein , não há dú...',
    url: 'http://www.nerdmaldito.com/2024/04/junji-ito-collection-em-identify-v.html',
    urlToImage:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgepkFgbWBKbvcBfuEzV4ryAO1fQIaf1ewzE9_fKh-TMsDrLeACKjavlF4hofqW-mFEv2Qq6Bhe2vB6nR6uIvx9FCw1qNcArr1PqltzKSE-wPbeixA8emZDOGySJCn_gAyF6e7JGiTOuoUXVEOIESsanyn9XC2bp9Z1Jy2JGE1QZNbqAilaKOgsE-HwieCw/w1200-h630-p-k-no-nu/como%20o%20souichi%20eh%20simpatico%20ein.jpg',
    publishedAt: '2024-04-06T22:40:00Z',
    content:
      'Apesar do autor Junji Ito ter obras sérias como Declínio de um Homem, ou ainda a obra prima que é sua adaptação de Frankenstein, não há dúvidas de que seus personagens originais em obras bizarras com… [+5115 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '25 Countries with the Highest GDP Growth Rate in the World',
    description: null,
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_6f77900b-f957-47f0-ae19-beb530be98d8',
    urlToImage: null,
    publishedAt: '2024-04-06T22:39:51Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Freerepublic.com' },
    author: 'X',
    title:
      'Trump violates the gag order, directly daring Judge Merchan to jail him',
    description:
      'SHOTS FIRED. Trump violates the gag order, directly daring Judge Merchan to jail him. Pretty sure Judge Merchan will be very happy to do that',
    url: 'https://freerepublic.com/focus/f-news/4229502/posts',
    urlToImage: null,
    publishedAt: '2024-04-06T22:39:40Z',
    content:
      'Skip to comments.\r\n' +
      'Trump violates the gag order, directly daring Judge Merchan to jail himX ^Posted on 04/06/2024 3:39:40 PM PDT by janetjanet998\r\n' +
      'SHOTS FIRED. \r\n' +
      'Trump violates the gag order, directl… [+4878 chars]',
  },
  {
    source: { id: 'abc-news-au', name: 'ABC News (AU)' },
    author: 'Lee Robinson',
    title:
      "Crime in Alice Springs is nothing new. But how did it become an 'emergency situation'?",
    description:
      "As Alice Springs residents wait to hear whether a two-week youth curfew will lift, there's an ongoing debate about what led to the unrest on the town's streets.",
    url: 'https://www.abc.net.au/news/2024-04-07/nt-alice-springs-how-did-it-become-emergency-explained/103677842',
    urlToImage:
      'https://live-production.wcms.abc-cdn.net.au/8150f73688c45d284f2bfc6568341238?impolicy=wcms_watermark_news&cropH=2813&cropW=5000&xPos=0&yPos=260&width=862&height=485&imformat=generic',
    publishedAt: '2024-04-06T22:39:24Z',
    content:
      "Twelve days ago, on a Tuesday around 3pm, Alice Springs' oldest pub came under siege.\r\n" +
      "The Todd Tavern in the town's centre became the target of bricks and fly-kicks as rioters attempted to smash dow… [+8231 chars]",
  },
  {
    source: { id: null, name: 'Uol.com.br' },
    author: 'Da AFP',
    title: null,
    description:
      'O ex-presidente Jair Bolsonaro (PL), alvo de diversas investigações judiciais, convocou seus apoiadores para participarem de uma "grande manifestação" no dia 21 de abril na praia de Copacabana, no Rio de Janeiro, dois meses após uma primeira',
    url: 'https://noticias.uol.com.br/ultimas-noticias/afp/2024/04/06/bolsonaro-convoca-apoiadores-para-nova-manifestacao-no-rio-em-21-de-abril.htm',
    urlToImage:
      'https://conteudo.imguol.com.br/c/noticias/47/2024/02/27/ex-presidente-jair-bolsonaro-pl-em-entrevista-ao-canal-revista-oeste-1709068546630_v2_615x300.jpg',
    publishedAt: '2024-04-06T22:39:05Z',
    content:
      'Ela ocorreu logo após uma grande operação policial no âmbito de uma investigação sobre uma suposta "tentativa de golpe" fomentada por Bolsonaro e alguns de seus colaboradores mais próximos que não ac… [+913 chars]',
  },
  {
    source: { id: null, name: 'Uol.com.br' },
    author: null,
    title: null,
    description:
      'Kassio segue relator, e STF tem 10 a 0 para rejeitar moderação pelas Forças Armadas',
    url: 'https://www1.folha.uol.com.br/poder/2024/04/carmen-refuta-superpoder-e-stf-ja-tem-8-a-0-para-rejeitar-moderacao-pelas-forcas-armadas.shtml',
    urlToImage:
      'https://f.i.uol.com.br/fotografia/2020/11/09/16049502465fa998e69f8bf_1604950246_3x2_xl.jpg',
    publishedAt: '2024-04-06T22:39:05Z',
    content:
      'O STF (Supremo Tribunal Federal) tem 10 votos a 0 a favor do entendimento de que as Forças Armadas não têm atribuição de poder moderador e que a Constituição não permite intervenção militar sobre os … [+4624 chars]',
  },
  {
    source: { id: null, name: 'Ouniversodatv.com' },
    author: 'O Universo da TV',
    title:
      'Canal Brasil - Filmes em destaque na programação de 08 a 14 de abril',
    description:
      'Foto: Divulgação Confira os filmes em destaque na programação do Canal Brasil  de 08 a 14 de abril. SEGUNDA-FEIRA, 8 DE ABRIL Marinheiro das...',
    url: 'https://www.ouniversodatv.com/2024/04/canal-brasil-filmes-em-destaque-na.html',
    urlToImage:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgKRvfBRQ_WkC2X5Bl8idIABlW5n3TegmcijNQsuGLcBH3T0cwPac9hakteJKXf6oN8V52ABhnPoyCh-n_OC3JNhuD0puXrqCea14kyToT4S9wkuWIbUKwYjLFig_IgSx58RrDuTL8gsN7YJJJjT9GNApzl9mVOap7toCtcH5YMF_3WRhm47Or84z2mI4/w1600/Nardjes%20A-tile.jpg',
    publishedAt: '2024-04-06T22:39:00Z',
    content:
      '<table><tr><td></td></tr><tr><td>Foto: Divulgação</td></tr>\r\n' +
      '</table>Confira os filmes em destaque na programação do Canal Brasil de 08 a 14 de abril.SEGUNDA-FEIRA, 8 DE ABRILMarinheiro das Montanhas… [+3951 chars]',
  },
  {
    source: { id: null, name: 'Metropoles.com' },
    author: 'William Cardoso',
    title: 'Namorada de dono do Porsche prestará depoimento nos próximos dias',
    description:
      'Namorada de dono do Porsche deverá esclarecer motivo de discussão flagrada por câmera em frente a clube de pôquer, antes de acidente',
    url: 'https://www.metropoles.com/sao-paulo/namorada-de-dono-do-porsche-prestara-depoimento-nos-proximos-dias',
    urlToImage:
      'https://uploads.metropoles.cloud/wp-content/uploads/2024/04/04084746/porsche-antes-acidente.jpg',
    publishedAt: '2024-04-06T22:38:58Z',
    content:
      'São Paulo O delegado Carlos Henrique Ruiz, da 5ª Delegacia Seccional de São Paulo, afirmou neste sábado (6/4) que a namorada do condutor do Porsche que provocou o acidente que matou um motorista de a… [+3362 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '少女失蹤35年！父母全台認屍找嘸人　忍痛做一決定',
    description:
      '35年前，南投草屯一名15歲簡姓少女放學後失蹤，其父母為了尋人，辭去工作2年，開著貨車全台認無名屍，只是沒有一人和女兒特徵相同。前年警方啟動DNA比對計畫，簡父連忙提供DNA進行比對，還是沒有發現，夫妻倆最後一絲希望破滅，請兒子為妹妹聲請死亡宣告，南投地院於今年2月裁定准予。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_5f7fb3f2-0c94-4648-a796-fa84b3e4793b',
    urlToImage: null,
    publishedAt: '2024-04-06T22:38:56Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '25 Best Countries for Remote Working',
    description: null,
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_755bb46a-099b-479d-a6cb-75eda73c1a01',
    urlToImage: null,
    publishedAt: '2024-04-06T22:38:48Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Myconfinedspace.com' },
    author: 'tiki bot',
    title: 'Daylight reveals aftermath of Baltimore bridge collapse',
    description: null,
    url: 'https://img.myconfinedspace.com/2024/03/26/daylight-reveals-aftermath-of-baltimore-bridge-collapse/',
    urlToImage: 'https://i.redd.it/xezxh9d4unqc1.png',
    publishedAt: '2024-04-06T22:38:48Z',
    content:
      'this website brought to you by The Tiki Web Group Unless specifically mentioned, we have no clue where this content came from. Know where it came from? Post the link in the comments, and reap the glo… [+106 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '西寶國小寄宿學校斷網　師生公共電話報平安',
    description:
      '目前受困中橫的有飯店旅客，還有西寶國小師生，陸續安排接駁下山。西寶國小師生，如果從西邊撤離，比較安全，但是要遶半個台灣回花蓮，路途正在評估中，西寶是寄宿學校，學生平時都是公共電話聯繫家長，地震後，學校網路中斷，也是靠供公共電話報平安。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_33a9f05d-8f7a-4a1f-ab7c-14167c823050',
    urlToImage: null,
    publishedAt: '2024-04-06T22:38:37Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Sherdog.com' },
    author: 'contact@sherdog.com (Sherdog.com Staff)',
    title: 'ONE Friday Fights 58 Post-Fight Interview: Jake Peacock',
    description:
      'Jake Peacock chats with the media after besting Kohei Shinjo via unanimous decision at ONE Friday Fights 58.',
    url: 'https://www.sherdog.com/videos/videointerview/ONE-Friday-Fights-58-PostFight-Interview-Jake-Peacock-21321',
    urlToImage:
      'https://www1-cdn.sherdog.com/_images/videos/20240406062849_N8713.JPG',
    publishedAt: '2024-04-06T22:38:15Z',
    content:
      'Jake Peacock chats with the media after besting Kohei Shinjo via unanimous decision at ONE Friday Fights 58.\r\n' +
      'How certain he was he would have his arm raised:\r\n' +
      'Definitely, I knew I had it. Its pure d… [+852 chars]',
  },
  {
    source: { id: null, name: 'Sherdog.com' },
    author: 'contact@sherdog.com (Sherdog.com Staff)',
    title: 'ONE Friday Fights 58 Post-Fight Interview: Superbon Singha Mawynn',
    description:
      'Superbon Singha Mawynn reflected on his  Marat Grigorian via unanimous decision to claim the ONE interim featherweight kickboxing title-clinching performance against Marat Grigorian at ONE Friday Fights 58.',
    url: 'https://www.sherdog.com/videos/videointerview/ONE-Friday-Fights-58-PostFight-Interview-Superbon-Singha-Mawynn-21320',
    urlToImage:
      'https://www1-cdn.sherdog.com/_images/videos/20240406062515_N6038.JPG',
    publishedAt: '2024-04-06T22:38:15Z',
    content:
      'Superbon Singha Mawynn reflected on his Marat Grigorian via unanimous decision to claim the ONE interim featherweight kickboxing title-clinching performance against Marat Grigorian at ONE Friday Figh… [+1083 chars]',
  },
  {
    source: { id: null, name: 'Expresso.pt' },
    author: 'Lusa',
    title:
      'Segundo sismo de magnitude 2,5 na escala de Richter sentido hoje na ilha Terceira',
    description:
      'O Instituto do Mar e Atmosfera (IPMA) também emitiu um comunicado a referir que, de acordo com a informação disponível até ao momento, o sismo “não causou danos pessoais ou materiais',
    url: 'https://expresso.pt/sociedade/2024-04-06-Segundo-sismo-de-magnitude-25-na-escala-de-Richter-sentido-hoje-na-ilha-Terceira-d80350c6',
    urlToImage:
      'https://images.impresa.pt/expresso/2023-12-18-Reportagem-Acores---Terceira---Angra-do-Heroismo-7c09c5bc',
    publishedAt: '2024-04-06T22:37:48Z',
    content:
      'Um novo sismo com magnitude 2,5 na escala de Richter, o segundo abalo registado hoje na ilha Terceira, foi sentido às 20:43 locais (21:43 em Lisboa), informou o Centro de Informação e Vigilância Sism… [+2127 chars]',
  },
  {
    source: { id: null, name: '7NEWS.com.au' },
    author: 'Digital Staff',
    title: 'Mel B fuels Spice Girls reunion speculation',
    description: 'Mel B fuels Spice Girls reunion speculation7news.com.au',
    url: 'https://7news.com.au/entertainment/celebrity/mel-b-fuels-spice-girls-reunion-speculation-c-14222606',
    urlToImage:
      'https://images.7news.com.au/publication/C-14222606/6dfc498528ee63c3362571646ccae9aaed3f40ec-16x9-x0y0w1280h720.jpg?imwidth=1200',
    publishedAt: '2024-04-06T22:37:35Z',
    content:
      'Melanie Brown has continued to fuel speculation about Spice Girls reunion plans by sharing a picture of their mural at Wembley Stadium with a teasing caption.\r\n' +
      'The poster at the London stadium shows … [+1537 chars]',
  },
  {
    source: { id: 'globo', name: 'Globo' },
    author: null,
    title: 'Lula, Mauricio de Sousa e artistas lamentam a morte de Ziraldo',
    description:
      'Presidente destacou as diversas contribuições do cartunista para a cultura brasileira',
    url: 'https://valor.globo.com/brasil/noticia/2024/04/06/lula-mauricio-de-sousa-e-artistas-lamentam-a-morte-de-ziraldo.ghtml',
    urlToImage:
      'https://s2-valor.glbimg.com/ebrPi09wUfxWa9fud9v3fiqL4AQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2024/V/6/Ga41lfQ0GBLApvqmFuWg/38168722-1008.2006-20-20divulga-c3-a7-c3-a3o-20-20e-20mail-20-20zi-20-20ziraldo-20no-20document-c3-a0rio-20sobre-20o-20jornal-20o-20sol.jpg',
    publishedAt: '2024-04-06T22:37:09Z',
    content:
      'Além dos aportes de grandes empresas do setor, como a Stellantis, que anunciou R$ 30 bilhões, recentemente, a BYD elevou o volume anunciado para instalar uma fábrica no país, de R$ 3 bilhões para R$ … [+8 chars]',
  },
  {
    source: { id: 'nbc-news', name: 'NBC News' },
    author: 'Greg Rosenstein',
    title:
      "Iowa-UConn Final Four matchup draws 14.2 million viewers, most in women's college basketball history",
    description:
      'Iowa’s 71-69 win against UConn in Friday’s NCAA Final Four game drew 14.2 million viewers, the most in women’s college basketball history, according to ESPN.',
    url: 'https://www.nbcnews.com/news/sports/iowa-uconn-final-four-matchup-draws-142-million-viewers-womens-college-rcna146735',
    urlToImage:
      'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2024-04/2240406-final-four-caitlin-clark-womens-basketball-wm-208p-66e6a8.jpg',
    publishedAt: '2024-04-06T22:37:08Z',
    content:
      'Iowas 71-69 win against UConn in Fridays NCAA Final Four game drew 14.2 million viewers, the most in womens college basketball history, according to ESPN. \r\n' +
      'The matchup produced the highest audience … [+1413 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '「希臘英雄」聯手保七救出太魯閣白楊步道受困者 (圖)',
    description:
      '花蓮3日發生芮氏規模7.2地震，希臘籍遊客Dimitris Belbas（後右3）在太魯閣白楊步道英勇帶出受困7人，再急忙報警一起把2大3小一家5口救出。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_7b565a13-1d05-4057-a7d4-4b0a08ebaa94',
    urlToImage: null,
    publishedAt: '2024-04-06T22:36:52Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Lance.com.br' },
    author: 'LANCE!',
    title:
      'Sabia dessa? Vitória jamais perdeu o título baiano após vencer o primeiro jogo da final',
    description:
      'Após o grande resultado no primeiro jogo da decisão, o Vitória precisa de apenas um empate para ...',
    url: '  https://www.lance.com.br/resenha-de-apostas/noticias/sabia-dessa-vitoria-jamais-perdeu-o-titulo-baiano-apos-vencer-o-primeiro-jogo-da-final.html ',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/142274551-04052024sabiadissobahiaxvitoriasite.png',
    publishedAt: '2024-04-06T22:36:44Z',
    content:
      'Após o grande resultado no primeiro jogo da decisão, o Vitória precisa de apenas um empate para voltar a conquistar a Taça do Campeonato Baiano. Com a vantagem ao lado, o Leão da Barra tem mais um po… [+1967 chars]',
  },
  {
    source: { id: 'espn', name: 'ESPN' },
    author: null,
    title: "Marlins, MLB's lone winless team, lose 9th in row",
    description:
      'The Marlins fell 3-1 to the Cardinals on Saturday, dropping their ninth straight game to open the season.',
    url: 'https://www.espn.com/mlb/story/_/id/39889292/marlins-fall-cardinals-9th-straight-loss-open-season',
    urlToImage:
      'https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0406%2Fr1315221_1296x729_16%2D9.jpg',
    publishedAt: '2024-04-06T22:36:13Z',
    content:
      "ST. LOUIS -- The winless Miami Marlins, who are off to the worst start in the franchise's 33-year history, dropped their ninth consecutive game on Saturday, losing 3-1 to Steven Matz and the St. Loui… [+2696 chars]",
  },
  {
    source: { id: null, name: 'BBC News' },
    author: 'https://www.facebook.com/bbcnews',
    title:
      'Como a natureza desenvolveu relações entre animais de espécies diferentes',
    description:
      'De morcegos e plantas carnívoras a crocodilos e aves, a natureza está repleta de pares notáveis que dependem uns dos outros para sobreviver.',
    url: 'https://www.bbc.com/portuguese/articles/cqed3lz31vjo',
    urlToImage:
      'https://ichef.bbci.co.uk/news/1024/branded_portuguese/1dc7/live/71baf700-d1dd-11ee-b83b-0f87a864f372.png',
    publishedAt: '2024-04-06T22:36:10Z',
    content:
      'Crédito, Getty Images\r\n' +
      'Legenda da foto, Os olhos das zebras e os narizes das avestruzes formam uma excelente parceria para evitar os predadores\r\n' +
      'Article information<ul><li>Author, Lucy Sherriff</li><… [+7123 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title:
      "Newspaper headlines: 'Gaza famine' warning and Corrie 'budgeting row'",
    description: null,
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_3c2213ba-ac44-4345-b796-dc6a1c77de8f',
    urlToImage: null,
    publishedAt: '2024-04-06T22:35:37Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'Esporte News Mundo, Esporte News Mundo',
    title:
      'É campeão! Criciúma empata com Brusque e conquista o Campeonato Catarinense de 2024',
    description:
      'O Criciúma empatou como Brusque, em 1 a 1, na tarde deste sábado (6), no estádio Heriberto Hulse, no Sul de Santa Catarina',
    url: 'https://esporte.ig.com.br/parceiros/esporte-news-mundo/2024-04-06/e-campeao-criciuma-empata-com-brusque-e-conquista-o-campeonato-catarinense-de-2024.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/5t/so/gz/5tsogz5uacv7whhq16dxevuw8.jpg',
    publishedAt: '2024-04-06T22:35:24Z',
    content:
      'O Criciúma \r\n' +
      'empatou como Brusque\r\n' +
      ', em 1 a 1, na tarde deste sábado (6), no estádio Heriberto Hulse, no Sul de Santa Catarina, e se torna campeão do Campeonato Catarinense\r\n' +
      'pelo 2º ano consecutivo. … [+1138 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '救護車遭轎車停紅燈擋住！8旬翁不敢闖燈被罰',
    description:
      '高雄楠梓區，一輛救護車載運傷患，準備就醫，卻在一處紅燈路口，遭一輛轎車擋住！直到綠燈，正好有警車經過狂按喇叭，駕駛才催油門加速，一度想逃離警方攔查，最後依舊被逮到，原來駕駛高齡81歲，疑似年紀大不敢闖紅燈，事後被警方開罰3600元。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_e3083c11-7294-446f-a57f-c2ad79c07592',
    urlToImage: null,
    publishedAt: '2024-04-06T22:35:13Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Blog.sme.sk' },
    author: 'Petit Press, a.s.',
    title: 'Čierna diera zo Slovenska',
    description: 'Každý národ má vraj takú vládu, akú si zaslúži.',
    url: 'https://blog.sme.sk/lubosdobrota/politika/cierna-diera-zo-slovenska',
    urlToImage:
      'https://image.smedata.sk/image/w450-h300/ef96d299-5120-4dbe-88e5-513377b8da5f.jpg',
    publishedAt: '2024-04-06T22:35:11Z',
    content:
      'Zvolili sme si do vlády gaunerov, zloincov, ruských špiónov a vlastizradcov. Vera Slováci potvrdili, e takú vládu chcú, e si takú vládu zaslúia. \r\n' +
      'Viem, e nie všetci, ale väšina áno. aká nás ierna bu… [+571 chars]',
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'Placar, Placar',
    title:
      'Velo Clube retorna à elite do Paulistão após 46 anos e com técnico artilheiro',
    description:
      'Equipe de Rio Claro, comandada por Guilherme, segura empate com o Juventus e avança após vencer em São Paulo; último acesso velista havia acontecido em 1978',
    url: 'https://esporte.ig.com.br/placar/2024-04-06/velo-clube-retorna-a-elite-do-paulistao-apos-46-anos-e-com-tecnico-artilheiro.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/bc/k0/56/bck056o2r5prmm7i9b6e4pvqu.jpg',
    publishedAt: '2024-04-06T22:35:03Z',
    content:
      'O futebol paulista viu a história ser escrita neste sábado, 6, pelo Velo Clube. O tradicional time de Rio Claro conseguiu empatar por 0 a 0 com o Juventus, avançando à final do Campeonato Paulista A2… [+1883 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '穿絕美白紗登場！丁噹唱到一半被下跪求婚',
    description:
      '[NOWnews今日新聞]「全民情歌天后」丁噹在結束台北、高雄三場《夜遊ANightTour》演唱會，日前帶著全新演唱會前往廣州，和歌迷再歡唱一夜，想不到唱到一半卻出現突發事件，一名歌迷突然衝到台前單...',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8d9fea39-e270-481e-8857-464ba6d13ac5',
    urlToImage: null,
    publishedAt: '2024-04-06T22:35:03Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Abril.com.br' },
    author: 'Matheus Leitão',
    title: 'O outro Ziraldo que eu conheci',
    description: '… no interior de Minas!',
    url: 'https://veja.abril.com.br/coluna/matheus-leitao/o-outro-ziraldo-que-eu-conheci',
    urlToImage:
      'https://veja.abril.com.br/wp-content/uploads/2018/09/entretenimento-ziraldo-20070228-0001.jpg?quality=90&strip=info&crop=1&resize=1080,565',
    publishedAt: '2024-04-06T22:35:02Z',
    content:
      'Assine VEJA por R$2,00/semanaMatheus Leitão\r\n' +
      'SEGUIR\r\n' +
      'SEGUINDO\r\n' +
      'Blog de notícias exclusivas e opinião nas áreas de política, direitos humanos e meio ambiente. Jornalista desde 2000, Matheus Leitão é v… [+2464 chars]',
  },
  {
    source: { id: null, name: 'Lawyersgunsmoneyblog.com' },
    author: 'Paul Campos',
    title: 'Euthanasia matters',
    description:
      'I was startled to learn that more than 5% of the total deaths in the Netherlands last year were via euthanasia. Many of these deaths were of elderly people with clearly terminal illnesses, but apparently there’s now something of a trend of cases that resemble…',
    url: 'https://www.lawyersgunsmoneyblog.com/2024/04/euthanasia-matters',
    urlToImage:
      'https://substackcdn.com/image/fetch/w_652,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff7100f84-e7f6-41b4-9b5a-5617884da0cc_1600x1067.jpeg',
    publishedAt: '2024-04-06T22:34:51Z',
    content:
      'I was startled to learn that more than 5% of the total deaths in the Netherlands last year were via euthanasia. Many of these deaths were of elderly people with clearly terminal illnesses, but appare… [+1759 chars]',
  },
  {
    source: { id: null, name: 'Freerepublic.com' },
    author: 'Israel 365 News',
    title:
      'Multiple regions across the US declare state of emergency in preparation for solar eclipse',
    description:
      'Multiple regions across the US declared a state of emergency in preparation for the solar eclipse that will transverse the continental US on April 8. While Monday’s eclipse will be at least partially visible throughout all 48 contiguous states, officials are …',
    url: 'https://freerepublic.com/focus/f-bloggers/4229501/posts',
    urlToImage: null,
    publishedAt: '2024-04-06T22:34:22Z',
    content:
      'Skip to comments.\r\n' +
      'Multiple regions across the US declare state of emergency in preparation for solar eclipseIsrael 365 News ^\r\n' +
      ' | 3/5/24\r\n' +
      ' | Adam Eliyahu Berkowitz\r\n' +
      'Posted on 04/06/2024 3:34:22 PM P… [+4636 chars]',
  },
  {
    source: { id: null, name: 'Bleeding Cool News' },
    author: 'Gavin Sheehan',
    title: 'Season Four Of EA Sports WRC Arrives This Tuesday',
    description:
      "Electronic Arts has revealed more details as to what's on the way for Season Four of EA Sports WRC, as the content will launch on Tuesday, April 9. This season comes with an all-new update that adds 67 new Moments and 20 fresh Rally Pass levels, along with up…",
    url: 'https://bleedingcool.com/games/season-four-of-ea-sports-wrc-arrives-this-tuesday/',
    urlToImage:
      'https://bleedingcool.com/wp-content/uploads/2024/04/EA-Sports-WRC-Toyota-Stripe-2000x1125.jpg',
    publishedAt: '2024-04-06T22:34:07Z',
    content:
      'Posted in: Electronic Arts, Games, Video Games | Tagged: EA Sports WRC, WRC\r\n' +
      "EA Sports WRC has revealed details of what's on the way for Season Four, as the content will arrive this Tuesday, April 9.… [+3410 chars]",
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Redação Terra',
    title:
      'Cão farejador ajuda PF a encontrar fuzil em carro usado por fugitivos do presídio de Mossoró',
    description:
      'A Polícia Federal encontrou, neste sábado, 6, um segundo fuzil vinculado aos fugitivos do Presídio Federal de Mossoró',
    url: 'https://www.terra.com.br/noticias/brasil/policia/cao-farejador-ajuda-pf-a-encontrar-fuzil-em-carro-usado-por-fugitivos-do-presidio-de-mossoro,7f6ddbee480fca26fb0a530f9ab99605q9tdwbbs.html',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/cao_farejador_fuzil_fugitivos_mossoro-1iv72kloj98pv.PNG',
    publishedAt: '2024-04-06T22:33:47Z',
    content:
      'ResumoDuas pessoas, Rogério da Silva Mendonça e Deibson Cabral Nascimento, foram recapturadas pela Polícia Federal após 50 dias de fuga do Presídio Federal de Mossoró, localizados na cidade de Marabá… [+2065 chars]',
  },
  {
    source: { id: null, name: 'Nbcsportsphiladelphia.com' },
    author: 'NBC Sports Philadelphia',
    title: 'Pitching staff rolling right along as Phillies beat Nats again',
    description:
      'The Phillies jumped on the Nationals early for the second straight day and received another strong performance from the rotation to reach .500.',
    url: 'https://www.nbcsportsphiladelphia.com/mlb/philadelphia-phillies/phillies-news/ranger-suarez-phillies-pitching-staff-jeff-hoffman-jt-realmuto/576356/?partner=yahoo',
    urlToImage:
      'https://media.zenfs.com/en/csnphilly.com/2ba9d3dce608b57ed985bbd67be78989',
    publishedAt: '2024-04-06T22:33:46Z',
    content:
      'Pitching staff rolling right along as Phillies beat Nats again originally appeared on NBC Sports Philadelphia\r\n' +
      'WASHINGTON The Phillies jumped on the Nationals in the second inning for the second stra… [+4772 chars]',
  },
  {
    source: { id: null, name: 'Pausaparafeminices.com' },
    author: 'Bruna Tavares',
    title:
      'Boyd Gambling Releases Stardust 3 reel slots play for fun for real money Public Gambling enterprise App',
    description:
      'Blogs In which Is this Extra Available? Are Stardust Gambling enterprise Online Nj Secure To make use of? Slot Gifts Out of Troy: Gambling enterprise Information Is actually Stardust Gambling establishment A knowledgeable Agent Within the New jersey? You are …',
    url: 'https://www.pausaparafeminices.com/ppf/boyd-gambling-releases-stardust-3-reel-slots-play-for-fun-for-real-money-public-gambling-enterprise-app/',
    urlToImage: null,
    publishedAt: '2024-04-06T22:33:38Z',
    content:
      'The regular volatility condition manage pay alternatively which have down so you can middle sized victories and so so that it are rewarding to play starburst slots a real income. They condition video… [+6583 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title:
      'Insiders Of Brightstar Resources Are Up 62% On Their AU$2.39m Purchase',
    description: null,
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_59ee6757-333a-406c-88b8-b9b6438c03f3',
    urlToImage: null,
    publishedAt: '2024-04-06T22:33:34Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Esporte News Mundo',
    title:
      'É campeão! Criciúma empata com Brusque e conquista o Campeonato Catarinense de 2024',
    description:
      'O Criciúma empatou como Brusque, em 1 a 1, na tarde deste sábado (6), no estádio Heriberto Hulse, no Sul de Santa Catarina',
    url: 'https://www.terra.com.br/esportes/criciuma/e-campeao-criciuma-empata-com-brusque-e-conquista-o-campeonato-catarinense-de-2024,56fbfd482bee800fac54a40d1cd4090a5qc8fao0.html',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/1409608652-criciuma.png',
    publishedAt: '2024-04-06T22:33:16Z',
    content:
      'O Criciúma empatou como Brusque, em 1 a 1, na tarde deste sábado (6), no estádio Heriberto Hulse, no Sul de Santa Catarina, e se torna campeão do Campeonato Catarinense pelo 2º ano consecutivo. Os do… [+1241 chars]',
  },
  {
    source: { id: null, name: 'Sliceofscifi.com' },
    author: 'Summer Brooks',
    title: '2024 International Horror & Sci-fi Film Festival',
    description:
      "International Horror & Sci-fi Film Festival Director Monte Yazzie returns to tell us all about the features and shorts being showcased in this year's festival (its 20th year!)\n" +
      '\n' +
      'What film festivals did you like or would you like to attend? Let us know! Send Su…',
    url: 'https://www.sliceofscifi.com/2024/04/06/slice-of-scifi-1083/',
    urlToImage:
      'https://www.sliceofscifi.com/wp-content/uploads/2024/04/Slice1083.jpg',
    publishedAt: '2024-04-06T22:33:13Z',
    content:
      'Podcast: Play in new window | Download (Duration: 30:42 — 28.6MB)\r\n' +
      'Subscribe: Apple Podcasts | Podchaser | RSS\r\n' +
      'International Horror &amp; Sci-fi Film Festival Director Monte Yazzie returns to tell u… [+1000 chars]',
  },
  {
    source: { id: null, name: 'Observador.pt' },
    author: 'Bruno Roseiro',
    title:
      '“Não acabou mas é difícil, Sporting tem tudo nas suas mãos. Arbitragem? Hoje não comento”, diz Roger Schmidt',
    description:
      'Ao contrário dos últimos dérbis, Roger Schmidt falou do jogo e de forma pragmática, assumindo que a vitória podia cair para qualquer lado e que título ficou mais longe com oitava derrota da temporada.',
    url: 'https://observador.pt/2024/04/06/nao-acabou-mas-e-dificil-sporting-tem-tudo-nas-suas-maos-arbitragem-hoje-nao-comento-diz-roger-schmidt/',
    urlToImage:
      'https://wm.observador.pt/wm/obs/l/https%3A%2F%2Fbordalo.observador.pt%2Fv2%2Frs%3Afill%3A770%3A403%2Fc%3A1500%3A841%3Anowe%3A0%3A61%2Fq%3A85%2Fplain%2Fhttps%3A%2F%2Fs3.observador.pt%2Fwp-content%2Fuploads%2F2024%2F04%2F06233036%2Froger-schmidt-7.jpg',
    publishedAt: '2024-04-06T22:33:09Z',
    content:
      'Não era um jogo do tudo ou nada. Era um jogo que podia abrir tudo, era um jogo que podia acabar com uma mão cheia de nada. Foi isso que aconteceu ao Benfica. Que voltou a entrar a perder, neste caso … [+2858 chars]',
  },
  {
    source: { id: null, name: '[Removed]' },
    author: null,
    title: '[Removed]',
    description: '[Removed]',
    url: 'https://removed.com',
    urlToImage: null,
    publishedAt: '1970-01-01T00:00:00Z',
    content: '[Removed]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '太魯閣白楊步道崩塌 希臘籍遊客與保七救援民眾 (圖)',
    description:
      '花蓮3日發生芮氏規模7.2地震，白楊步道1.7公里處崩塌，12名遊客受困，希臘籍遊客Dimitris Belbas帶出受困7名大人後，再跑到派出所報警，與員警回到現場救出餘下的2大3小一家5口，保住12名遊客安全。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_4ccc7d2d-04c5-4ad1-a35f-02f83a002b2d',
    urlToImage: null,
    publishedAt: '2024-04-06T22:32:50Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Lance.com.br' },
    author: 'LANCE!',
    title: 'Grêmio vence o Juventude de virada e conquista o hepta do Gauchão',
    description:
      'Heptacampeão. O Grêmio venceu o Juventude de virada, por 3 a 1, no final da tarde deste sábado ...',
    url: '  https://www.lance.com.br/gremio/gremio-vence-o-juventude-de-virada-e-conquista-o-hepta-do-gauchao.html ',
    urlToImage:
      'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2024/04/06/1131222988-agif24040617222541-scaled-aspect-ratio-512-320.jpg',
    publishedAt: '2024-04-06T22:32:34Z',
    content:
      'Heptacampeão. O Grêmio venceu o Juventude de virada, por 3 a 1, no final da tarde deste sábado (6), e levantou a sétima taça do Gauchão. Os gols do Tricolor, na Arena do Grêmio, foram marcados por Cr… [+1302 chars]',
  },
  {
    source: { id: null, name: 'Freerepublic.com' },
    author: 'SteynonLine',
    title: 'Frenemy Mine: Katharine Hepburn and Ginger Rogers in Stage Door',
    description:
      "The marvel of Katharine Hepburn's enduring stardom is how secure it is now, two decades after her death and three after her last film performance – especially compared to her early years in Hollywood, when audiences were having a hard time figuring out if the…",
    url: 'https://freerepublic.com/focus/f-chat/4229500/posts',
    urlToImage: null,
    publishedAt: '2024-04-06T22:32:26Z',
    content:
      'Skip to comments.\r\n' +
      'Frenemy Mine: Katharine Hepburn and Ginger Rogers in Stage DoorSteynonLine ^\r\n' +
      ' | April 6, 2024\r\n' +
      ' | Rick McGinnis\r\n' +
      'Posted on 04/06/2024 3:32:26 PM PDT by Twotone\r\n' +
      'The marvel of Kath… [+2400 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '王品初瓦、嚮辣傳食物中毒！衛生局下令停業　業者發聲了',
    description:
      '（記者林曼／綜合報導）王品集團旗下餐廳「初瓦」、「嚮辣」西門店傳出疑似食物中毒事件，截至今（7日）上午已有22 […]',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_38883de7-f3bd-4f89-bde4-3158b2d07db1',
    urlToImage: null,
    publishedAt: '2024-04-06T22:32:03Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Catracalivre.com.br' },
    author: 'Redação',
    title: 'Beneficiários do Minha Casa Minha Vida recebem desconto de 80%',
    description:
      'O Minha Casa Minha Vida, conhecido por proporcionar acesso à moradia própria no Brasil, está oferecendo uma oportunidade única para os cidadãos de baixa',
    url: 'https://catracalivre.com.br/cidadania/beneficiarios-do-minha-casa-minha-vida-recebem-desconto-de-80/',
    urlToImage:
      'https://catracalivre.com.br/cdn-cgi/image/f=auto,q=60,w=1280,h=720,fit=cover,format=jpeg/wp-content/uploads/2023/07/novas-regras-do-minha-casa-minha-vida-entram-em-vigor.jpg',
    publishedAt: '2024-04-06T22:31:53Z',
    content:
      'O Minha Casa Minha Vida, conhecido por proporcionar acesso à moradia própria no Brasil, está oferecendo uma oportunidade única para os cidadãos de baixa renda que buscam realizar o sonho da casa próp… [+1929 chars]',
  },
  {
    source: { id: null, name: 'Metropoles.com' },
    author: 'Stephanie Alves',
    title: 'Grêmio vira sobre o Juventude e é heptacampeão gaúcho',
    description:
      'Após empate do primeiro jogo, Grêmio virou para conquistar 43º título estadual, o sétimo seguido',
    url: 'https://www.metropoles.com/esportes/gremio-vira-sobre-o-juventude-e-e-heptacampeao-gaucho',
    urlToImage:
      'https://uploads.metropoles.cloud/wp-content/uploads/2024/04/06193040/gremio-x-juventude-1.jpg',
    publishedAt: '2024-04-06T22:31:44Z',
    content:
      'O Grêmio é heptacampeão gaúcho. Com uma dose de emoção e jogando em casa, o Tricolor venceu o Juventude na tarde deste sábado por 3×1, após empate em 0x0 no jogo de ida.\r\n' +
      'Com a vitória, o Grêmio soma… [+1113 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '太魯閣白楊步道坍困12人 「希臘英雄」聯手保七救出',
    description:
      '（中央社記者李先鳳花蓮縣7日電）花蓮地震，太魯閣園區內落石坍方嚴重，希臘籍遊客Dimitris Belbas在白楊步道先是英勇帶出受困7人，再急忙報警一起把2大3小一家5口救出，在這次救災中傳為佳話。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_50a31326-7b8c-41ae-9de0-316763389ee1',
    urlToImage: null,
    publishedAt: '2024-04-06T22:31:44Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '衛福部表態了！拒和黃子佼合作　下架舊影片「兒少性剝削零容忍」',
    description:
      '藝人黃子佼遭檢方查獲曾向偷拍論壇「創意私房」購買7部未成年少女私密片，涉嫌違反《兒童及少年性剝削防制條例》，處分緩起訴，引來外界撻伐。曾與黃合作的衛福部6日嚴正表態，對兒少性剝削零容忍，表示「不會和黃子佼合作」也會下架過往與黃合作的影片。對此，民進黨立委黃捷表示，黃子佼是非法論壇高級會員，無疑就是這個犯罪產業的驅動者、犯罪者，未來將針對防範等議題，在立院質詢衛福部。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_c810ede2-1607-43f2-b876-f91a88fdce20',
    urlToImage: null,
    publishedAt: '2024-04-06T22:31:39Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'Esporte News Mundo, Esporte News Mundo',
    title:
      'Hegemonia tricolor! Grêmio vence o Juventude de virada e é hepta do Gaúcho',
    description:
      'Grêmio vence o Juventude por 3 a 1, na Arena, neste sábado, e mantém a sua hegemonia no futebol gaúcho com o sétimo título seguido',
    url: 'https://esporte.ig.com.br/parceiros/esporte-news-mundo/2024-04-06/hegemonia-tricolor-gremio-vence-o-juventude-de-virada-e-e-hepta-do-gaucho.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/43/vs/5o/43vs5o7lpsu02ojdlpnv6wuj1.jpg',
    publishedAt: '2024-04-06T22:31:31Z',
    content:
      'O Grêmio\r\n' +
      'é heptacampeão do Campeonato Gaúcho. Neste sábado, o Tricolor saiu atrás, mas virou o jogo em dois minutos e acabou vencendo, em casa, o Juventude\r\n' +
      'por 3 a 1. É o sétimo ano seguido que o G… [+1651 chars]',
  },
  {
    source: { id: null, name: 'Terra.com.br' },
    author: 'Estadão Conteúdo',
    title: 'Confira os resultados dos jogos de hoje, sábado, no futebol',
    description:
      'Grêmio fatura o Campeonato Gaúcho pela 7ª vez consecutiva; campeões também levantam a taça em Pernambuco, Paraná e Ceará',
    url: 'https://www.terra.com.br/esportes/futebol/confira-os-resultados-dos-jogos-de-hoje-sabado-no-futebol,59af72e2232a5bf5a755e75c0732ab83qegwcsyj.html',
    urlToImage:
      'https://s1.trrsf.com/update-1698692222/fe/zaz-mod-t360-icons/svg/logos/terra-16x9-borda.png',
    publishedAt: '2024-04-06T22:31:30Z',
    content:
      'O Grêmio é campeão gaúcho de 2024! Depois de sair atrás, o time de Renato Gaúcho conseguiu se reerguer e, com público recorde da arena no ano, venceu o Juventude por 3 a 1. Outros estados também conh… [+3275 chars]',
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'Esporte News Mundo, Esporte News Mundo',
    title: 'Atuações ENM: Cuiabá é solido e vence o campeonato Mato-Grossense',
    description: 'O próximo desafio do Cuiabá será pela Copa Sul-Americana',
    url: 'https://esporte.ig.com.br/parceiros/esporte-news-mundo/2024-04-06/atuacoes-enm--cuiaba-e-solido-e-vence-o-campeonato-mato-grossense.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/4s/r0/q4/4sr0q4s51rlsspo0j07cj2rl8.jpg',
    publishedAt: '2024-04-06T22:31:27Z',
    content:
      'O Cuiabá \r\n' +
      'se sagrou tetracampeão consecutivo do Campeonato Mato-Grossense. O Dourado venceu novamente o União Rondonópolis neste sábado (6), no estádio Luthero Lopes, em Rondonópolis, que teve iníci… [+1928 chars]',
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'Esporte News Mundo, Esporte News Mundo',
    title: 'CRB vence clássico contra o ASA e é tricampeão Alagoano',
    description:
      'Na ida, o CRB havia vencido por 1x0, fora de casa, e na volta, derrotou o rival por 3x1 no Rei Pelé com gols de Hereda, Anselmo Ramon e Matheus',
    url: 'https://esporte.ig.com.br/parceiros/esporte-news-mundo/2024-04-06/crb-vence-classico-contra-o-asa-e-e-tricampeao-alagoano.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/4k/mx/mj/4kmxmjfg3clzq2fbbmm8m1tcm.jpg',
    publishedAt: '2024-04-06T22:31:09Z',
    content:
      'É CAMPEÃO!\r\n' +
      'CRB e ASA duelaram na noite deste sábado (6), pela grande final do Campeonato Alagoano de 2024. Na ida, o CRB havia vencido por 1×0, fora de casa, e na volta, derrotou o rival por 3×1 no … [+1662 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '花蓮強震 /菲國駐台代表赴花蓮災區 感謝台灣照顧移工',
    description:
      '花蓮強震引發國際關注，菲律賓駐台代表貝世偉今天(7日)特地前往花蓮市災區天王星大樓拆除現場，代表菲律賓總統小馬可仕前來關心台灣救災狀況，並感謝花蓮照顧菲國勞工，這次沒有太多菲籍人士受傷受困。 0403花蓮強震造成嚴重死傷，目前還有多人失聯，引發國際關注，菲律賓總統小馬可仕日前曾於社群媒體X平台發文表達慰問之意，而菲律賓駐台代表貝世偉今天更親自前往花蓮市中山路前的天王星大樓拆除現場，他表示，他是受菲律賓總統小馬可仕指示前來台灣關心花蓮地震的情況，並感謝花蓮照顧菲律賓移工，沒有太多菲籍人士因此受傷受困。 貝世偉說，他…',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_73c97923-6dd6-47a9-9458-db8f104ab219',
    urlToImage: null,
    publishedAt: '2024-04-06T22:31:05Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: 'buzzfeed', name: 'Buzzfeed' },
    author: 'Chelsea Stuart',
    title: `32 Wacky Products That'll Make Your Guests Say "Why Do You Own This And Where Can I Get It"`,
    description:
      "Say hello to the strawberry toilet seat you'll be thinking about for the rest of the day...View Entire Post ›",
    url: 'https://www.buzzfeed.com/chelseastuart/weird-items-to-intrigue-your-guests-an',
    urlToImage:
      'https://img.buzzfeed.com/buzzfeed-static/static/2023-11/11/21/enhanced/0d1122ba398d/original-1548-1699739653-2.jpg?crop=1243:650;0,89%26downsize=1250:*',
    publishedAt: '2024-04-06T22:31:02Z',
    content:
      "Impact Racks is a small biz that refurbishes and repurposes used newspaper boxes. They're actually the supplier of said boxes (to publications like The New York Post, The Washington Post, The Wall St… [+750 chars]",
  },
  {
    source: { id: null, name: 'Observador.pt' },
    author: 'Cátia Bruno',
    title:
      'Recrutas sem experiência, uso excessivo da IA e uma “cultura relaxada”. Como se explicam “erros” dos ataques do exército israelita',
    description:
      'As IDF gostam de se definir como "o Exército mais moral", mas há especialistas militares que discordam. Em Gaza, o número de civis encarados como "danos colaterais" aumentou nesta guerra. Porquê?',
    url: 'https://observador.pt/especiais/recrutas-sem-experiencia-uso-excessivo-da-ia-e-uma-cultura-relaxada-como-se-explicam-erros-dos-ataques-do-exercito-israelita/',
    urlToImage:
      'https://wm.observador.pt/wm/obs/l/https%3A%2F%2Fbordalo.observador.pt%2Fv2%2Frs%3Afill%3A770%3A403%2Fc%3A2000%3A1124%3Anowe%3A0%3A104%2Fq%3A85%2Fplain%2Fhttps%3A%2F%2Fs3.observador.pt%2Fwp-content%2Fuploads%2F2024%2F04%2F06104534%2Fgettyimages-2061698536.jpg',
    publishedAt: '2024-04-06T22:31:02Z',
    content:
      'Para além disso, as mesmas fontes dizem que os comandantes têm dado autorização para matar esses alvos mesmo quando haverá centenas de civis mortos, como danos colaterais. Um rácio que, para alguns m… [+3260 chars]',
  },
  {
    source: { id: null, name: 'Freerepublic.com' },
    author: 'Israel National News',
    title: 'US intelligence: This will be the Iranian retaliation',
    description:
      'The US has picked up intelligence on what an Iranian retaliatory strike for the alleged Israeli strike on the Iranian consulate in Damascus in which a senior member of the Iranian Revolutionary Guards was eliminated, will look like, CBS News reported on Frida…',
    url: 'https://freerepublic.com/focus/f-news/4229499/posts',
    urlToImage: null,
    publishedAt: '2024-04-06T22:30:53Z',
    content:
      'Skip to comments.\r\n' +
      'US intelligence: This will be the Iranian retaliationIsrael National News ^\r\n' +
      ' | 4/5/24\r\n' +
      ' | staff\r\n' +
      'Posted on 04/06/2024 3:30:53 PM PDT by Roman_War_Criminal\r\n' +
      'The US has picked up in… [+4132 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '寶林廚師「內含」邦克列酸卻沒事　醫分析2原因：恐已具備耐受性',
    description:
      '[周刊王CTWANT] 蘇一峰在臉書發文分析，代班廚師手部有邦克列酸，代表廚師可能不小心吃下該毒素，也因攝入導致糞便含有邦克列酸。他認為，越籍廚師攝入的毒素應該只有微量，所以沒出現和其他中毒者一樣的嚴重症狀。蘇一峰也懷疑，廚師可能因長期接觸某種化合物，接觸邦克列酸，促使身體產生...',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_c4490610-cff1-4db9-a00c-388e913965ad',
    urlToImage: null,
    publishedAt: '2024-04-06T22:30:47Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '星韓港突擊兒童色情網逮272人　賣家最高恐被新加坡關7年加鞭刑',
    description:
      '新加坡警察（Singapore Police Force）與香港、南韓聯手合作，共同突擊追查兒童色情網站在三國的根據地，根據《亞洲衛視》（CNA）報導，三國警方一共逮捕272名嫌疑人，年齡層從12至73歲不等，在過去5星期期間，陸續被星港韓警方逮捕歸案。其中新加坡本地有28名嫌犯，因為販售淫穢物品和脅迫未成年人性交流等罪名被捕，根據當地法律規定，持有或取得相關影音者，最高可處5年刑期、外加鉅額罰款或鞭刑。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_2a1bdf33-4045-48f8-a23d-8eb4bc6f0c4b',
    urlToImage: null,
    publishedAt: '2024-04-06T22:30:42Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: 'ign', name: 'IGN' },
    author: 'Viny Mathias',
    title:
      'A esquisita tática de contratação que Steve Jobs aplicava a candidatos da Apple: levar ao bar',
    description:
      'Ele só não podia marcar muitas entrevistas no mesmo dia...\n' +
      'O processo de entrevista de emprego costuma ser chato, enfadonho e repetitivo. Mas não se você estivesse tentando entrar na Apple, já que poderia ser convidado para tomar uma cerveja com Steve Jobs.',
    url: 'https://br.ign.com/steve-jobs/122069/news/a-esquisita-tatica-de-contratacao-que-steve-jobs-aplicava-a-candidatos-da-apple-levar-ao-bar',
    urlToImage:
      'https://sm.ign.com/t/ign_br/screenshot/default/1200-800_w118.1200.jpg',
    publishedAt: '2024-04-06T22:30:41Z',
    content:
      'A Apple nem sempre foi a empresa poderosa que é hoje. Criada por Steve Jobs e Steve Wozniak na década de 70, passou por altos e baixos, até que uma das baixas resultou na saída de Jobs. Depois de mui… [+2864 chars]',
  },
  {
    source: { id: 'abc-news-au', name: 'ABC News (AU)' },
    author: 'Harvey Biggs',
    title:
      "'All of a sudden I was in a really bad way': Advocates want a conversation on police mental health",
    description:
      'The rate of suicide among serving police officers in Australia has more than doubled in the past decade, prompting calls for more open conversations about the impact the job can have on mental health. WARNING: This article contains content that some readers m…',
    url: 'https://www.abc.net.au/news/2024-04-07/mental-health-support-to-prevent-police-suicide/103666516',
    urlToImage:
      'https://live-production.wcms.abc-cdn.net.au/a7500a75a0fbd370a354d4678ec1d2e4?impolicy=wcms_watermark_news&cropH=2813&cropW=5000&xPos=0&yPos=260&width=862&height=485&imformat=generic',
    publishedAt: '2024-04-06T22:30:31Z',
    content:
      '<ul><li>In short: Trauma specialists and former police officers are urging more open conversations about the impact that policing can have on mental health.</li><li>The rate of suicide among Australi… [+9148 chars]',
  },
  {
    source: { id: null, name: 'Ig.com.br' },
    author: 'Jogada10, Jogada10',
    title: 'Criciúma empata com Brusque e é campeão do Catarinense',
    description:
      'Criciúma venceu o primeiro jogo por 2 a 1 e precisava apenas empatar para garantir seu 12º título estadual . Foi o que rolou: 1 a 1 Deu Tigre',
    url: 'https://esporte.ig.com.br/parceiros/jogada10/2024-04-06/criciuma-empata-com-brusque-e-e-campeao-do-catarinense.html',
    urlToImage:
      'https://i0.statig.com.br/bancodeimagens/0y/l7/ya/0yl7yatqgddtxjfc1mbpk411l.jpg',
    publishedAt: '2024-04-06T22:30:20Z',
    content:
      'Vibra, torcedor! O Criciúma empatou com o Brusque, por 1 a 1, em jogo na tarde deste sábado (6), no Estádio Heriberto Hulse, em Criciúma (SC), e conquistou o título do Campeonato Catarinense. No prim… [+1553 chars]',
  },
  {
    source: { id: null, name: 'STLtoday.com' },
    author: 'Matthew DeFranks St. Louis Post-Dispatch',
    title:
      'Blues look to the future by icing young lineup Saturday in San Jose',
    description:
      'The Blues entered Saturday five points behind the Kings for the last wild card spot in the West, and with the possibility of being eliminated before coming home.',
    url: 'https://www.stltoday.com/sports/professional/nhl/blues/blues-look-to-the-future-by-icing-young-lineup-saturday-in-san-jose/article_3ca453b8-f41f-11ee-9d55-8bc30aaeb11b.html',
    urlToImage:
      'https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/3/ca/3ca453b8-f41f-11ee-9d55-8bc30aaeb11b/6611c9cb75ae2.preview.jpg?crop=1729%2C908%2C0%2C145&resize=1200%2C630&order=crop%2Cresize',
    publishedAt: '2024-04-06T22:30:00Z',
    content:
      'St. Louis Blues center Zack Bolduc plays against the Nashville Predators during the first period Thursday, April 4, 2024, in Nashville, Tenn.\r\n' +
      'Mark Zaleski, ASSOCIATED PRESS\r\n' +
      'SAN JOSE, Calif. With ju… [+5344 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '花蓮地震不講台灣地區要說哪？ 孫大千轟綠營：對韓國瑜雞蛋裡挑骨頭',
    description:
      '立法院長韓國瑜日前在臉書發文談清明節，卻因貼文中出現「台灣地區發生地震」、「清明掃墓祭祖在我國已有千年歷史」等字眼，引來綠營人士批評。對此，國民黨前立委孫大千砲轟，這些批評的綠營人士是在雞蛋裡挑骨頭，「根本就是一群白癡」，他並認為，從連這點小事都要挑毛病可看出，民進黨的目標只有一個，就是推動台獨，他們根本不值得信任。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_048b2dbd-7005-48f3-b138-ea261ff79dce',
    urlToImage: null,
    publishedAt: '2024-04-06T22:29:55Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '大咖天后突暴走拋「引退」震撼彈！　網瘋猜跟經紀公司鬧翻',
    description:
      '南韓音樂天后（BoA）15歲出道，如今已是24年，演藝成績亮眼的她，後來還成為經紀公司SM娛樂理事之一，沒想到昨突然暴走，在限動發文「合約結束了就可以引退嗎」，引發韓網熱議，她在日韓都有高人氣，近日也演出爆紅韓劇《和我老公結婚吧》，話題度居高不下，而她昨天突然在限動發聲，立刻引發熱議，不過她本人尚未出面回應。 寶兒在限動寫下：「現在合約結束了我能運退了吧？」、「我打錯字了。隱退。」看起來頗有情緒的字眼，令不少粉絲憂心，而近期SM娛樂確實有多位藝人不續約離開，有資深粉絲推測此舉對寶兒也產生影響，不過也有人推測，她出…',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_154d0bba-513c-48ae-8553-43397edfddb1',
    urlToImage: null,
    publishedAt: '2024-04-06T22:29:32Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Observador.pt' },
    author: 'Mariana Fernandes',
    title:
      '“Quatro pontos de avanço? Um dia mau e fica-se com um.” Amorim é um homem satisfeito, mas não dá nada como garantido',
    description:
      'O treinador do Sporting reconheceu que a equipa esteve "ansiosa", mas mostrou-se satisfeito com a vitória. Amorim justificou alterações no onze, comentou lágrimas de Catamo e recusou abordar futuro.',
    url: 'https://observador.pt/2024/04/06/quatro-pontos-de-avanco-um-dia-mau-e-fica-se-com-um-amorim-e-um-homem-satisfeito-mas-nao-da-nada-como-garantido/',
    urlToImage:
      'https://wm.observador.pt/wm/obs/l/https%3A%2F%2Fbordalo.observador.pt%2Fv2%2Frs%3Afill%3A770%3A403%2Fc%3A2482%3A1393%3Anowe%3A0%3A59%2Fq%3A85%2Fplain%2Fhttps%3A%2F%2Fs3.observador.pt%2Fwp-content%2Fuploads%2F2024%2F04%2F06232454%2Fdoc2024040642639732miguel-a-lopes-20.jpg',
    publishedAt: '2024-04-06T22:29:29Z',
    content:
      'Era um dia importante. Não necessariamente decisivo, crucial ou fulcral, mas importante. O Sporting venceu o Benfica em Alvalade, ficou com quatro pontos de avanço na liderança do Campeonato e ainda … [+2667 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '【0403花蓮強震】全台12.2萬戶一度停水　台水：已全面復水',
    description:
      '0403花蓮強震造成多處道路坍方，部份地區通訊、水電供應中斷。昨日（4/6）台八線太魯閣段搶通後，台灣自來水公司員工與施工人員不畏危險及困難，挺進災區搶修花蓮富世淨水場導水管，戮力修復2處漏水處，於6日22時恢復富世高地區160戶供水，完成全面復水的使命。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_ebf57dff-1911-458a-85c0-cfaf15f277ab',
    urlToImage: null,
    publishedAt: '2024-04-06T22:29:18Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'New Zealand Herald' },
    author: 'Karleen Gribble, Naomi Hull, Nina Jane Chad',
    title: 'When can my baby drink cow’s milk? It’s sooner than you think',
    description:
      'What do parents need to know about the latest advice? And when is cow’s milk an option?',
    url: 'https://www.nzherald.co.nz/lifestyle/when-can-my-baby-drink-cows-milk-its-sooner-than-you-think/QGAIAG6W4VDC3JIYWLRDBXK4ZY/',
    urlToImage:
      'https://www.nzherald.co.nz/resizer/v2/DPTHWKCANRDTZPXFNMZD7VY4TA.jpg?auth=4aff54d3f20dd4331865618901113a4cc06f37024ff4c927db9af85e1e20464c&width=1200&height=675&quality=70&smart=true',
    publishedAt: '2024-04-06T22:29:10Z',
    content:
      'What do parents need to know about the latest health advice? And when is cows milk an option? Photo / Getty ImagesParents are often faced with well-meaning opinions and conflicting advice about what … [+5925 chars]',
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '涉移民欺詐 華裔名媛姜立元遭聯邦起訴',
    description:
      '活躍於中文社交媒體的華裔「名媛」姜立元，日前因涉嫌移民欺詐共謀罪(Conspiracy to Commit Immigr...',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8e58dccb-656f-4f2a-a1b6-8ea2131df2c9',
    urlToImage: null,
    publishedAt: '2024-04-06T22:29:04Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Yahoo Entertainment' },
    author: null,
    title: '【花蓮強震撼全台】支援花蓮震災　高市特搜女力展專業與勇氣',
    description:
      '高雄市消防局於花蓮大地震後，火速派遣了一支由65名專業人員組成的特種搜救隊，前往災區進行救援，並在驚險的行動中展現了非凡的勇氣和專業能力，特別是本次支援5名女性隊員，她們在各自的專業領域中發揮了關鍵作用，充分展示了巾幗不讓鬚眉的精神。',
    url: 'https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_00f47be4-af52-4ce1-b30b-c8833f5594eb',
    urlToImage: null,
    publishedAt: '2024-04-06T22:29:00Z',
    content:
      "If you click 'Accept all', we and our partners (including 240 who are part of the IAB Transparency &amp; Consent Framework) will also store and/or access information on a device (in other words, use … [+678 chars]",
  },
  {
    source: { id: null, name: 'Ouniversodatv.com' },
    author: 'O Universo da TV',
    title: 'Canal Brasil - Destaques da programação de 8 a 14 de abril',
    description:
      'Foto: Divulgação Confira os destaques da programação do Canal Brasil de 08  a 14 de abril. SEGUNDA-FEIRA, 8 DE ABRIL O NEGRO NO FUTEBOL BRAS...',
    url: 'https://www.ouniversodatv.com/2024/04/canal-brasil-destaques-da-programacao.html',
    urlToImage:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEinoEh9guXhTMsAkK3ByvvAbAR1yt9OC_Qj4bmVJJyap9iHGmyq4gfIXIKBJ-TaAjqFMRD0b-I3M4VhRlwxwLYES2dLUCtJpcbS_57B3wInjnv3cXl-qcwzvFC8T87mKOoahftKL7KvWvBOMZ4XzAMF_sjf9tIhY3nlXLweG0bGqGzQV_618A_6_0Q-wso/w1600/o%20negro%20no%20futebol%20brasieliro.jpeg',
    publishedAt: '2024-04-06T22:29:00Z',
    content:
      '<table><tr><td></td></tr><tr><td>Foto: Divulgação</td></tr>\r\n' +
      '</table>Confira os destaques da programação do Canal Brasil de 08  a 14 de abril.SEGUNDA-FEIRA, 8 DE ABRILO NEGRO NO FUTEBOL BRASILEIROPRI… [+2694 chars]',
  },
]
