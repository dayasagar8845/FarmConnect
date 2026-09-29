/* FarmConnect prototype. MOCK AUTH + localStorage only.
   PRODUCTION: replace the `store` object with API calls; hash passwords server-side (bcrypt/argon2),
   use HTTPS, rate limiting, server-side checks so phone numbers are only returned after acceptance. */
const LANGS = ['en', 'te', 'hi'], VOICE = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
let lang = localStorage.fc_lang || 'en';
// ---------- translations: 'English|Telugu|Hindi' ----------
const T = {
  home:'Home|హోమ్|होम', how:'How It Works|ఎలా పనిచేస్తుంది|यह कैसे काम करता है', about:'About|మా గురించి|हमारे बारे में',
  login:'Login|లాగిన్|लॉगिन', logout:'Logout|లాగ్అవుట్|लॉगआउट', find:'Find|వెతుకు|खोजें', work:'Work|పని|काम', alerts:'Alerts|సూచనలు|सूचना', profile:'Profile|ప్రొఫైల్|प्रोफ़ाइल',
  heroT:'Connect Farmers with Agricultural Labourers|రైతులను వ్యవసాయ కూలీలతో కలపండి|किसानों को खेतिहर मजदूरों से जोड़ें',
  heroS:'Find workers near you or find farm work near you.|మీ దగ్గర కూలీలను లేదా పనిని వెతకండి.|अपने पास मजदूर या खेती का काम खोजें।',
  farmer:'FARMER|రైతు|किसान', labourer:'LABOURER|కూలీ|मजदूर', needW:'Need workers for your farm?|మీ పొలానికి కూలీలు కావాలా?|खेत के लिए मजदूर चाहिए?',
  needJ:'Looking for farm work?|పొలం పని కావాలా?|खेत का काम चाहिए?', flogin:'Farmer Login|రైతు లాగిన్|किसान लॉगिन', llogin:'Labourer Login|కూలీ లాగిన్|मजदूर लॉगिन',
  phone:'Phone Number|ఫోన్ నంబర్|फ़ोन नंबर', pass:'4-Digit Password|4 అంకెల పాస్‌వర్డ్|4 अंकों का पासवर्ड', pass2:'Confirm 4-Digit Password|పాస్‌వర్డ్ మళ్ళీ|पासवर्ड दोहराएं',
  newu:'New User? Sign Up|కొత్తవారా? సైన్ అప్|नए हैं? साइन अप', haveacc:'Have account? Login|ఖాతా ఉందా? లాగిన్|खाता है? लॉगिन', LOGIN:'LOGIN|లాగిన్|लॉगिन',
  name:'Full Name|పూర్తి పేరు|पूरा नाम', state:'State|రాష్ట్రం|राज्य', district:'District|జిల్లా|जिला', mandal:'Mandal|మండలం|मंडल', village:'Village|గ్రామం|गाँव', select:'-- Select --|-- ఎంచుకోండి --|-- चुनें --',
  age:'Age|వయస్సు|उम्र', gender:'Gender|లింగం|लिंग', male:'Male|పురుషుడు|पुरुष', female:'Female|స్త్రీ|महिला', skills:'Work you can do|మీరు చేయగల పని|आप कौन सा काम कर सकते हैं',
  exp:'Years of experience|అనుభవం (సంవత్సరాలు)|अनुभव (साल)', avail:'Availability|అందుబాటు|उपलब्धता', farmLoc:'Farm Location|పొలం ప్రదేశం|खेत की जगह', contact:'Preferred Contact|సంప్రదింపు విధానం|संपर्क का तरीका', call:'Phone Call|ఫోన్ కాల్|फ़ोन कॉल', wapp:'WhatsApp|వాట్సాప్|व्हाट्सऐप',
  regF:'Farmer Registration|రైతు నమోదు|किसान पंजीकरण', regL:'Labourer Registration|కూలీ నమోదు|मजदूर पंजीकरण', createF:'Create Farmer Account|రైతు ఖాతా తయారు చేయండి|किसान खाता बनाएं', createL:'Create Labourer Account|కూలీ ఖాతా తయారు చేయండి|मजदूर खाता बनाएं',
  regOk:'Registration Successful|నమోదు విజయవంతం|पंजीकरण सफल', welcome:'Welcome|స్వాగతం|स्वागत', errPhone:'Enter 10-digit phone number|10 అంకెల ఫోన్ నంబర్ ఇవ్వండి|10 अंकों का फ़ोन नंबर डालें',
  errPass:'Password must be exactly 4 digits|పాస్‌వర్డ్ సరిగ్గా 4 అంకెలు ఉండాలి|पासवर्ड ठीक 4 अंकों का हो', errMatch:'Passwords do not match|పాస్‌వర్డ్‌లు సరిపోలలేదు|पासवर्ड मेल नहीं खाते', errBad:'Wrong phone or password|ఫోన్ లేదా పాస్‌వర్డ్ తప్పు|फ़ोन या पासवर्ड गलत', errExist:'This phone is already registered|ఈ ఫోన్ ఇప్పటికే నమోదైంది|यह फ़ोन पहले से पंजीकृत है', errFill:'Please fill all boxes|అన్ని ఖాళీలు నింపండి|सभी खाने भरें',
  postWork:'Post Work|పని పెట్టండి|काम डालें', findL:'Find Workers|కూలీలను వెతకండి|मजदूर खोजें', nearL:'Nearby Workers|దగ్గర కూలీలు|पास के मजदूर', myReq:'My Requests|నా అభ్యర్థనలు|मेरे अनुरोध', accL:'Accepted Workers|అంగీకరించిన కూలీలు|स्वीकार मजदूर', myProf:'My Profile|నా ప్రొఫైల్|मेरी प्रोफ़ाइल',
  findW:'Find Work|పని వెతకండి|काम खोजें', availJ:'Available Jobs|అందుబాటులో ఉన్న పనులు|उपलब्ध काम', nearJ:'Nearby Jobs|దగ్గర పనులు|पास के काम', myAcc:'My Accepted Work|నా అంగీకరించిన పని|मेरा स्वीकार काम', myWage:'My Wage|నా కూలీ|मेरी मजदूरी',
  crop:'Crop|పంట|फसल', workType:'Type of Work|పని రకం|काम का प्रकार', need:'Workers Needed|కావలసిన కూలీలు|मजदूर चाहिए', date:'Date|తేదీ|तारीख', hours:'Working Hours|పని గంటలు|काम के घंटे', wage:'Wage Offered (₹/day)|కూలీ (₹/రోజు)|मजदूरी (₹/दिन)', extra:'Extra Requirements|ఇతర అవసరాలు|अन्य ज़रूरतें', POST:'POST WORK|పని పెట్టండి|काम डालें',
  posted:'Work request posted successfully.|పని విజయవంతంగా పెట్టబడింది.|काम सफलतापूर्वक डाला गया।', sendReq:'Send Work Request|పని అభ్యర్థన పంపండి|काम का अनुरोध भेजें', sent:'Request sent|అభ్యర్థన పంపబడింది|अनुरोध भेजा गया',
  good:'⭐ Good Match|⭐ మంచి సరిపోలిక|⭐ अच्छा मेल', nearby:'📍 Nearby|📍 దగ్గరలో|📍 पास में', avail1:'Available|అందుబాటులో|उपलब्ध', km:'km|కి.మీ|किमी', yrs:'years|సంవత్సరాలు|साल', day:'/day|/రోజు|/दिन',
  waiting:'Waiting for Labourers|కూలీల కోసం ఎదురుచూపు|मजदूरों का इंतज़ार', accepted:'ACCEPTED|అంగీకరించారు|स्वीकार', closed:'Request Closed|అభ్యర్థన ముగిసింది|अनुरोध बंद', acc:'Accepted|అంగీకరించారు|स्वीकार', rem:'Remaining|మిగిలినవి|शेष',
  contactL:'Contact Labourer|కూలీని సంప్రదించండి|मजदूर से संपर्क करें', accWork:'ACCEPT WORK|పని అంగీకరించండి|काम स्वीकार करें', details:'View Details|వివరాలు|विवरण देखें', doYou:'Do you want to accept this work?|ఈ పని అంగీకరించాలా?|क्या यह काम स्वीकार करें?',
  yes:'✅ YES, ACCEPT|✅ అవును|✅ हाँ, स्वीकार', cancel:'❌ CANCEL|❌ రద్దు|❌ रद्द', okAcc:'Work Accepted Successfully|పని అంగీకరించబడింది|काम सफलतापूर्वक स्वीकार', fjob:'Farmer|రైతు|किसान', wanted:'Labourers Required|కావలసిన కూలీలు|मजदूर चाहिए',
  FIND:'FIND WORK|పని వెతకండి|काम खोजें', anyC:'Any crop|ఏదైనా పంట|कोई भी फसल', today:'Available today|ఈ రోజు|आज', tomorrow:'Available tomorrow|రేపు|कल', week:'Available this week|ఈ వారం|इस हफ्ते', pickD:'Select date|తేదీ ఎంచుకోండి|तारीख चुनें', above:'Above ₹700/day|₹700/రోజు పైన|₹700/दिन से ऊपर', custom:'Custom wage (₹)|మీ కూలీ (₹)|अपनी मजदूरी (₹)', anyW:'Any wage|ఏదైనా కూలీ|कोई भी मजदूरी',
  none:'Nothing found yet.|ఇంకా ఏమీ లేదు.|अभी कुछ नहीं।', notif:'🔔 Notifications|🔔 సూచనలు|🔔 सूचनाएं', nAcc:'{n} accepted your {w} work.|{n} మీ {w} పనిని అంగీకరించారు.|{n} ने आपका {w} काम स्वीकार किया।', nJob:'New {c} {w} work available {d} km from you.|కొత్త {c} {w} పని మీ నుండి {d} కి.మీ దూరంలో ఉంది.|नया {c} {w} काम आपसे {d} किमी दूर है।', nInv:'{n} sent you a work request.|{n} మీకు పని అభ్యర్థన పంపారు.|{n} ने आपको काम का अनुरोध भेजा।',
  say:'Tell us your requirement|మీ అవసరం చెప్పండి|अपनी ज़रूरत बताएं', sayEx:'Example: "I need five workers for rice harvesting"|ఉదా: "వరి కోతకు ఐదుగురు కూలీలు కావాలి"|उदाहरण: "धान कटाई के लिए पाँच मजदूर चाहिए"', noVoice:'Voice not supported on this phone|ఈ ఫోన్‌లో వాయిస్ లేదు|इस फ़ोन में आवाज़ सुविधा नहीं',
  instr:'Fill the boxes and press the big green button.|ఖాళీలు నింపి పెద్ద ఆకుపచ్చ బటన్ నొక్కండి.|खाने भरें और बड़ा हरा बटन दबाएं।', save:'SAVE|సేవ్|सेव', saved:'Saved|సేవ్ అయింది|सेव हुआ',
  h1:'1. Sign up with phone and 4-digit password.|1. ఫోన్ మరియు 4 అంకెల పాస్‌వర్డ్‌తో నమోదు.|1. फ़ोन और 4 अंकों के पासवर्ड से साइन अप करें।', h2:'2. Farmer posts work. Labourer chooses crop and wage.|2. రైతు పని పెడతారు. కూలీ పంట, కూలీ ఎంచుకుంటారు.|2. किसान काम डालता है। मजदूर फसल और मजदूरी चुनता है।', h3:'3. Labourer accepts. Farmer gets phone number.|3. కూలీ అంగీకరిస్తే రైతుకు ఫోన్ నంబర్ వస్తుంది.|3. मजदूर स्वीकार करे तो किसान को फ़ोन नंबर मिलता है।',
  aboutT:'FarmConnect helps villages: farmers find workers, workers find farm work. Free and simple.|FarmConnect గ్రామాలకు సహాయం: రైతులకు కూలీలు, కూలీలకు పని.|FarmConnect गाँवों की मदद करता है: किसानों को मजदूर, मजदूरों को काम।',
  admin:'Admin|అడ్మిన్|एडमिन', tF:'Total Farmers|మొత్తం రైతులు|कुल किसान', tL:'Total Labourers|మొత్తం కూలీలు|कुल मजदूर', aR:'Active Requests|క్రియాశీల అభ్యర్థనలు|सक्रिय अनुरोध', cR:'Completed Requests|పూర్తయినవి|पूरे हुए', reports:'Reports|నివేదికలు|रिपोर्ट', back:'⬅ Back|⬅ వెనుక|⬅ वापस', hidden:'Phone shown after acceptance|అంగీకారం తర్వాత ఫోన్ కనిపిస్తుంది|स्वीकार के बाद फ़ोन दिखेगा'
};
const CROPS = { rice:['🌾','Rice / Paddy|వరి|धान'], cotton:['☁️','Cotton|పత్తి|कपास'], chilli:['🌶️','Chilli|మిర్చి|मिर्च'], maize:['🌽','Maize|మొక్కజొన్న|मक्का'], groundnut:['🥜','Groundnut|వేరుశెనగ|मूंगफली'], veg:['🥕','Vegetables|కూరగాయలు|सब्जियां'], sugarcane:['🎋','Sugarcane|చెరకు|गन्ना'], other:['🌱','Other|ఇతర|अन्य'] };
const WORKS = { plant:['🌱','Planting|నాట్లు|रोपाई'], weed:['🌿','Weeding|కలుపు తీయడం|निराई'], harvest:['🧺','Harvesting|కోత|कटाई'], spray:['💦','Spraying|మందు చల్లడం|छिड़काव'], irrig:['🚿','Irrigation|నీటి పారుదల|सिंचाई'], prep:['🚜','Field preparation|పొలం సిద్ధం|खेत की तैयारी'], other:['🛠️','Other|ఇతర|अन्य'] };
const t = k => ((T[k] || k).split('|')[LANGS.indexOf(lang)]) || k;
const lb = (o, k) => o[k][1].split('|')[LANGS.indexOf(lang)];
const cl = k => CROPS[k][0] + ' ' + lb(CROPS, k), wl = k => WORKS[k][0] + ' ' + lb(WORKS, k);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// ---------- locations (sample) ----------
const LOC = {
  'Andhra Pradesh': { Guntur: { 'Guntur Rural': ['Chowdavaram', 'Nallapadu'], Pedakakani: ['Pedakakani', 'Kanaparru'] }, Krishna: { 'Vijayawada Rural': ['Nunna', 'Gollapudi'], Machilipatnam: ['Chilakalapudi'] } },
  Telangana: { Warangal: { Hanamkonda: ['Kazipet', 'Madikonda'] }, Nizamabad: { Armoor: ['Mamidipally'] }, Khammam: { 'Khammam Rural': ['Ekunuru'] } }
};
const LK = ['state', 'district', 'mandal', 'village'];
function locList(k, v) { if (k === 'state') return Object.keys(LOC); let o = LOC[v.state]; if (!o) return []; if (k === 'district') return Object.keys(o); o = o[v.district]; if (!o) return []; return k === 'mandal' ? Object.keys(o) : (o[v.mandal] || []); }
const opts = (list, val) => `<option value="">${t('select')}</option>` + list.map(x => { const [v, l] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}" ${v == val ? 'selected' : ''}>${esc(l)}</option>`; }).join('');
const locHTML = (v = {}) => LK.map(k => `<label>📍 ${t(k)}<select name="${k}" data-loc="${k}" required>${opts(locList(k, v), v[k])}</select></label>`).join('');
function locChange(el) { const f = el.form, i = LK.indexOf(el.dataset.loc), v = {}; LK.slice(0, i + 1).forEach(k => v[k] = f[k].value); LK.slice(i + 1).forEach(k => f[k].innerHTML = opts(locList(k, v), '')); }
// ---------- mock data store ----------
const seed = () => ({
  farmers: [{ id: 'f1', name: 'Ravi Kumar', phone: '9000000001', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Guntur Rural', village: 'Chowdavaram' }, { id: 'f2', name: 'Suresh', phone: '9000000002', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Pedakakani', village: 'Pedakakani' }],
  labourers: [{ id: 'l1', name: 'Ramesh', phone: '9876543210', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Guntur Rural', village: 'Chowdavaram', age: 34, gender: 'male', skills: ['harvest', 'plant'], experience: 4, expectedWage: 500, availability: 'week' },
    { id: 'l2', name: 'Lakshmi', phone: '9876543211', password: '1234', state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Pedakakani', village: 'Pedakakani', age: 29, gender: 'female', skills: ['weed', 'spray'], experience: 3, expectedWage: 450, availability: 'today' }],
  requests: [{ id: 'r1', farmerId: 'f1', crop: 'rice', workType: 'harvest', labourersRequired: 5, acceptedLabourers: 0, date: '2026-10-20', hours: '7am-5pm', wage: 500, state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Guntur Rural', village: 'Chowdavaram', status: 'open' },
    { id: 'r2', farmerId: 'f2', crop: 'chilli', workType: 'weed', labourersRequired: 3, acceptedLabourers: 0, date: '2026-10-15', hours: '7am-1pm', wage: 450, state: 'Andhra Pradesh', district: 'Guntur', mandal: 'Pedakakani', village: 'Pedakakani', status: 'open' }],
  acceptances: [], notifs: []
});
let db = JSON.parse(localStorage.fc_db || 'null') || seed();
const save = () => localStorage.fc_db = JSON.stringify(db);
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
let me = JSON.parse(sessionStorage.fc_me || 'null'), view = 'home', arg = null, flt = {};
const user = () => me && me.role !== 'admin' ? db[me.role + 's'].find(u => u.id === me.id) : null;
const byId = (a, id) => db[a].find(x => x.id === id);
// ---------- matching ----------
const dist = (a, b) => a.village === b.village ? 2 : a.mandal === b.mandal ? 8 : a.district === b.district ? 25 : 80;
const locScore = d => d <= 2 ? 3 : d <= 8 ? 2 : d <= 25 ? 1 : 0;
const label = (s, d) => s >= 5 ? t('good') : d <= 25 ? t('nearby') : '';
function jobScore(j, l, f = {}) {
  const d = dist(j, l), days = (new Date(j.date) - new Date()) / 864e5;
  let s = locScore(d) + (!f.crop || f.crop === j.crop ? 1 : 0) + (l.skills.includes(j.workType) ? 1 : 0) + (f.wage ? (j.wage >= f.wage ? 1 : 0) : (j.wage >= l.expectedWage ? 1 : 0));
  s += !f.avail || f.avail === 'week' && days <= 7 || f.avail === 'today' && days < 1 || f.avail === 'tomorrow' && days < 2 || f.avail === 'date' && j.date === f.date ? 1 : 0;
  return { s, d };
}
// ---------- helpers ----------
const toast = m => { const e = document.getElementById('toast'); e.textContent = m; e.hidden = false; setTimeout(() => e.hidden = true, 2600); };
const modal = h => { const m = document.getElementById('modal'); m.innerHTML = h ? `<div class="card" role="dialog" aria-modal="true">${h}</div>` : ''; m.hidden = !h; };
const err = k => `<div class="err" role="alert">⚠️ ${t(k)}</div>`;
const statusB = r => r.status === 'closed' ? `<span class="badge r">🔴 ${t('closed')}</span>` : r.acceptedLabourers > 0 ? `<span class="badge">🟢 ${t('accepted')}</span>` : `<span class="badge y">🟡 ${t('waiting')}</span>`;
const dstr = d => new Date(d).toLocaleDateString(VOICE[lang], { day: 'numeric', month: 'long', year: 'numeric' });
const back = (v = 'dash') => `<button class="btn alt sm" data-go="${v}">${t('back')}</button>`;
const empty = () => `<div class="card">${t('none')}</div>`;
// ---------- views ----------
const V = {};
V.home = () => `<section class="hero"><h1>${t('heroT')}</h1><p>${t('heroS')}</p></section>
<div class="grid"><div class="card big"><span class="ic">👨‍🌾</span><h2>${t('farmer')}</h2><p>${t('needW')}</p><button class="btn" data-go="auth" data-a="farmer:login">${t('flogin')}</button></div>
<div class="card big"><span class="ic">👷</span><h2>${t('labourer')}</h2><p>${t('needJ')}</p><button class="btn" data-go="auth" data-a="labourer:login">${t('llogin')}</button></div></div>
<p class="note" style="text-align:center"><a href="#" data-go="auth" data-a="admin:login">${t('admin')}</a></p>`;
V.how = () => back('home') + `<div class="card"><h2>❓ ${t('how')}</h2><p>${t('h1')}</p><p>${t('h2')}</p><p>${t('h3')}</p></div>`;
V.about = () => back('home') + `<div class="card"><h2>🌾 ${t('about')}</h2><p>${t('aboutT')}</p></div>`;
const pwField = (n, l) => `<label>🔢 ${t(l)}<div class="pw"><input name="${n}" type="password" inputmode="numeric" pattern="\\d{4}" maxlength="4" placeholder="_ _ _ _" autocomplete="off" required><button type="button" data-do="eye" aria-label="Show/hide">👁️</button></div></label>`;
V.auth = () => {
  const [role, mode] = arg.split(':'), ic = role === 'farmer' ? '👨‍🌾' : role === 'labourer' ? '👷' : '🛠️', sign = mode === 'signup';
  const other = role === 'farmer' ? [`<label>🏡 ${t('farmLoc')}<input name="farmLoc" placeholder="${t('farmLoc')}"></label>`, `<label>📞 ${t('contact')}<select name="contactPref"><option value="call">${t('call')}</option><option value="wapp">${t('wapp')}</option></select></label>`].join('')
    : `<label>🎂 ${t('age')}<input name="age" type="number" inputmode="numeric" min="16" max="80" required></label><label>🚻 ${t('gender')}<select name="gender"><option value="male">${t('male')}</option><option value="female">${t('female')}</option></select></label>
<label>🛠️ ${t('skills')}</label><div class="chk">${Object.keys(WORKS).map(k => `<label><input type="checkbox" name="skills" value="${k}"> ${wl(k)}</label>`).join('')}</div>
<label>⭐ ${t('exp')}<input name="experience" type="number" inputmode="numeric" min="0" max="60" required></label>
<label>💰 ${t('myWage')} (₹)<input name="expectedWage" type="number" inputmode="numeric" value="500" required></label>
<label>🕒 ${t('avail')}<select name="availability">${['today', 'tomorrow', 'week'].map(k => `<option value="${k}">${t(k)}</option>`).join('')}</select></label>`;
  return back('home') + `<div class="card"><h2>${ic} ${sign ? t(role === 'farmer' ? 'regF' : 'regL') : t(role === 'farmer' ? 'flogin' : role === 'labourer' ? 'llogin' : 'admin')}</h2><div id="msg"></div>
<form data-f="${sign ? 'signup' : 'login'}" data-role="${role}">
${sign ? `<label>👤 ${t('name')}<input name="name" required></label>` : ''}
<label>📱 ${t('phone')}<input name="phone" type="tel" inputmode="numeric" maxlength="10" placeholder="${t('errPhone')}" required></label>
${pwField('password', 'pass')}${sign ? pwField('password2', 'pass2') + locHTML() + other : ''}
<button class="btn">${sign ? t(role === 'farmer' ? 'createF' : 'createL') : t('LOGIN')}</button></form>
${role !== 'admin' ? `<button class="btn alt" data-go="auth" data-a="${role}:${sign ? 'login' : 'signup'}">${sign ? t('haveacc') : t('newu')}</button>` : '<p class="note">Demo admin: 0000000000 / 0000</p>'}
${!sign && role !== 'admin' ? '<p class="note">Demo: 9000000001 / 1234 (farmer), 9876543210 / 1234 (labourer)</p>' : ''}</div>`;
};
const TILES = {
  farmer: [['📋', 'postWork', 'post'], ['👷', 'findL', 'findL'], ['📍', 'nearL', 'nearL'], ['📊', 'myReq', 'reqs'], ['✅', 'accL', 'accL'], ['👤', 'myProf', 'profile']],
  labourer: [['🔎', 'findW', 'find'], ['🌾', 'availJ', 'jobs'], ['📍', 'nearJ', 'near'], ['✅', 'myAcc', 'myacc'], ['💰', 'myWage', 'wage'], ['👤', 'myProf', 'profile']]
};
V.dash = () => `<h1>${me.role === 'farmer' ? '👨‍🌾' : '👷'} ${t('welcome')}, ${esc(user().name)}</h1><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">${TILES[me.role].map(([i, k, v]) => `<button class="tile" data-go="${v}"><span class="ic">${i}</span>${t(k)}</button>`).join('')}</div>`;
V.post = () => { const u = user(); return back() + `<div class="card"><h2>📋 ${t('postWork')}</h2><p>${t('instr')}</p><div id="msg"></div>
<form data-f="post"><label>🌾 ${t('crop')}<select name="crop">${Object.keys(CROPS).map(k => `<option value="${k}">${cl(k)}</option>`).join('')}</select></label>
<label>🛠️ ${t('workType')}<select name="workType">${Object.keys(WORKS).map(k => `<option value="${k}">${wl(k)}</option>`).join('')}</select></label>
<label>👷 ${t('need')}</label><div class="cnt"><button type="button" data-do="cnt" data-a="-1" aria-label="-">−</button><b id="cn">1</b><button type="button" data-do="cnt" data-a="1" aria-label="+">+</button></div><input type="hidden" name="labourersRequired" value="1">
<label>📅 ${t('date')}<input type="date" name="date" required></label><label>🕒 ${t('hours')}<input name="hours" value="7am - 5pm"></label>
<label>💰 ${t('wage')}<input name="wage" type="number" inputmode="numeric" value="500" required></label>${locHTML(u)}
<label>📝 ${t('extra')}<textarea name="extra" rows="2"></textarea></label><button class="btn">${t('POST')}</button></form></div>`; };
const lcard = (l, s, d, ask) => `<div class="card">👷 <b>${esc(l.name)}</b> <span class="badge">${label(s, d)}</span><br>📍 ${esc(l.village)} · ${d} ${t('km')}<br>🌾 ${l.skills.map(wl).join(', ')}<br>⭐ ${l.experience} ${t('yrs')}<br>💰 ₹${l.expectedWage}${t('day')}<br>🟢 ${t(l.availability)}<br><span class="note">🔒 ${t('hidden')}</span><button class="btn" data-do="invite" data-a="${l.id}">📨 ${t('sendReq')}</button></div>`;
function labList(near) {
  const f = user(), ref = db.requests.filter(r => r.farmerId === f.id && r.status === 'open').pop();
  const list = db.labourers.map(l => { const d = dist(f, l), s = locScore(d) + (ref && l.skills.includes(ref.workType) ? 2 : 1) + (ref && l.expectedWage <= ref.wage ? 1 : 0) + 1; return { l, d, s }; }).filter(x => !near || x.d <= 25).sort((a, b) => b.s - a.s || a.d - b.d);
  return `<h2>${near ? '📍' : '👷'} ${t(near ? 'nearL' : 'findL')}</h2><div class="grid">${list.map(x => lcard(x.l, x.s, x.d)).join('') || empty()}</div>`;
}
V.findL = () => back() + labList(false); V.nearL = () => back() + labList(true);
V.reqs = () => { const rs = db.requests.filter(r => r.farmerId === me.id).reverse(); return back() + `<h2>📊 ${t('myReq')}</h2><div class="grid">${rs.map(r => `<div class="card"><b>${cl(r.crop)}</b> · ${wl(r.workType)}<br>${statusB(r)}<br>📅 ${dstr(r.date)} · 💰 ₹${r.wage}${t('day')}<br>👷 ${t('need')}: <b>${r.labourersRequired}</b><br>✅ ${t('acc')}: <b>${r.acceptedLabourers}</b><br>⏳ ${t('rem')}: <b>${Math.max(0, r.labourersRequired - r.acceptedLabourers)}</b></div>`).join('') || empty()}</div>`; };
V.accL = () => { const rows = db.acceptances.filter(a => byId('requests', a.workRequestId)?.farmerId === me.id); return back() + `<h2>✅ ${t('accL')}</h2><div class="grid">${rows.map(a => { const l = byId('labourers', a.labourerId), r = byId('requests', a.workRequestId); return `<div class="card"><span class="badge">🟢 ${t('accepted')}</span><br>👷 <b>${esc(l.name)}</b><br>📱 ${esc(l.phone)}<br>📍 ${esc(l.district)}, ${esc(l.village)}<br>🌾 ${l.skills.map(wl).join(', ')}<br>⭐ ${l.experience} ${t('yrs')}<br>💰 ₹${l.expectedWage}${t('day')}<br><span class="note">${cl(r.crop)} · ${wl(r.workType)}</span><a class="btn" style="text-decoration:none;text-align:center" href="tel:${esc(l.phone)}">📞 ${t('contactL')}</a></div>`; }).join('') || empty()}</div>`; };
V.profile = () => { const u = user(); return back() + `<div class="card"><h2>👤 ${t('myProf')}</h2><p>👤 ${esc(u.name)}<br>📱 ${esc(u.phone)}<br>📍 ${esc(u.village)}, ${esc(u.mandal)}, ${esc(u.district)}, ${esc(u.state)}</p>${me.role === 'labourer' ? `<p>🌾 ${u.skills.map(wl).join(', ')}<br>⭐ ${u.experience} ${t('yrs')}<br>💰 ₹${u.expectedWage}${t('day')}</p>` : ''}<button class="btn red" data-do="logout">${t('logout')}</button></div>`; };
// labourer
const WAGES = [300, 400, 500, 600, 700];
V.find = () => back() + `<div class="card"><h2>🔎 ${t('findW')}</h2><form data-f="find">
<label>🌾 ${t('crop')}<select name="crop"><option value="">${t('anyC')}</option>${Object.keys(CROPS).map(k => `<option value="${k}">${cl(k)}</option>`).join('')}</select></label>
<label>💰 ${t('wage')}<select name="wage"><option value="">${t('anyW')}</option>${WAGES.map(w => `<option value="${w}">₹${w}${t('day')}</option>`).join('')}<option value="701">${t('above')}</option></select></label>
<label>${t('custom')}<input name="cwage" type="number" inputmode="numeric"></label>
<label>🕒 ${t('avail')}<select name="avail">${['today', 'tomorrow', 'week'].map(k => `<option value="${k}">${t(k)}</option>`).join('')}<option value="date">${t('pickD')}</option></select></label><input type="date" name="date">${locHTML(user())}
<button class="btn">${t('FIND')}</button></form></div>`;
function jobCard(j, s, d) {
  const f = byId('farmers', j.farmerId), done = db.acceptances.some(a => a.workRequestId === j.id && a.labourerId === me.id);
  return `<div class="card"><b>${cl(j.crop)} ${wl(j.workType)}</b> <span class="badge">${label(s, d)}</span><br>👨‍🌾 ${t('fjob')}: ${esc(f.name)}<br>📍 ${esc(j.village)} · ${d} ${t('km')}<br>👷 ${t('wanted')}: ${j.labourersRequired - j.acceptedLabourers}<br>💰 ₹${j.wage}${t('day')}<br>📅 ${dstr(j.date)}<br>🟢 ${t('avail1')}
${done ? `<span class="badge">✅ ${t('accepted')}</span>` : `<button class="btn" data-do="accept" data-a="${j.id}">${t('accWork')}</button>`}<button class="btn alt" data-do="detail" data-a="${j.id}">${t('details')}</button></div>`;
}
function jobList(mode) {
  const l = user(), f = mode === 'find' ? flt : {};
  const list = db.requests.filter(r => r.status === 'open').map(j => ({ j, ...jobScore(j, l, f) })).filter(x => (mode === 'near' ? x.d <= 25 : true) && (!f.district || x.j.district === f.district) && (!f.village || x.j.village === f.village || x.d <= 25)).sort((a, b) => b.s - a.s || a.d - b.d);
  return back(mode === 'find' ? 'find' : 'dash') + `<h2>${mode === 'near' ? '📍' : '🌾'} ${t(mode === 'near' ? 'nearJ' : 'availJ')}</h2><div class="grid">${list.map(x => jobCard(x.j, x.s, x.d)).join('') || empty()}</div>`;
}
V.jobs = () => jobList('jobs'); V.near = () => jobList('near'); V.results = () => jobList('find');
V.myacc = () => { const rows = db.acceptances.filter(a => a.labourerId === me.id); return back() + `<h2>✅ ${t('myAcc')}</h2><div class="grid">${rows.map(a => { const j = byId('requests', a.workRequestId), f = byId('farmers', j.farmerId); return `<div class="card"><span class="badge">🟢 ${t('accepted')}</span><br><b>${cl(j.crop)} ${wl(j.workType)}</b><br>👨‍🌾 ${esc(f.name)} · 📱 ${esc(f.phone)}<br>📍 ${esc(j.village)}<br>📅 ${dstr(j.date)} · 💰 ₹${j.wage}${t('day')}</div>`; }).join('') || empty()}</div>`; };
V.wage = () => { const u = user(); return back() + `<div class="card"><h2>💰 ${t('myWage')}</h2><form data-f="wage"><input name="expectedWage" type="number" inputmode="numeric" value="${u.expectedWage}" required><button class="btn">${t('save')}</button></form></div>`; };
const nText = n => t(n.type).replace('{n}', n.name).replace('{w}', n.work ? lb(WORKS, n.work) : '').replace('{c}', n.crop ? lb(CROPS, n.crop) : '').replace('{d}', n.d ?? '');
V.notifs = () => { const ns = db.notifs.filter(n => n.to === me.id).reverse(); return back() + `<h2>${t('notif')}</h2>${ns.map(n => `<div class="card" style="margin-bottom:8px">🔔 ${esc(nText(n))}</div>`).join('') || empty()}`; };
V.admin = () => { const tab = arg || 'reports', act = db.requests.filter(r => r.status === 'open').length;
  const tb = (h, rows) => `<div style="overflow-x:auto"><table><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const body = tab === 'farmers' ? tb(['Name', 'Phone', 'Village', 'District'], db.farmers.map(f => [f.name, f.phone, f.village, f.district])) : tab === 'labourers' ? tb(['Name', 'Phone', 'Village', 'Skills', '₹'], db.labourers.map(l => [l.name, l.phone, l.village, l.skills.join(','), l.expectedWage])) : tab === 'requests' ? tb(['Crop', 'Work', 'Need', 'Accepted', 'Village', 'Status'], db.requests.map(r => [r.crop, r.workType, r.labourersRequired, r.acceptedLabourers, r.village, r.status])) : `<div class="card">📈 Acceptances: ${db.acceptances.length}<br>🔔 Notifications: ${db.notifs.length}</div>`;
  return back('home') + `<h1>🛠️ ${t('admin')}</h1><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))"><div class="card big"><span class="ic">👨‍🌾</span>${t('tF')}<h2>${db.farmers.length}</h2></div><div class="card big"><span class="ic">👷</span>${t('tL')}<h2>${db.labourers.length}</h2></div><div class="card big"><span class="ic">📋</span>${t('aR')}<h2>${act}</h2></div><div class="card big"><span class="ic">✅</span>${t('cR')}<h2>${db.requests.length - act}</h2></div></div>
<div class="tabs">${['farmers', 'labourers', 'requests', 'reports'].map(k => `<button class="btn alt sm" data-go="admin" data-a="${k}">${k === 'reports' ? t('reports') : k}</button>`).join('')}</div>${body}<button class="btn red" data-do="logout">${t('logout')}</button>`; };
// ---------- actions ----------
const A = {
  eye(_, b) { const i = b.previousElementSibling; i.type = i.type === 'password' ? 'tel' : 'password'; },
  cnt(d) { const i = document.querySelector('[name=labourersRequired]'); i.value = Math.max(1, +i.value + +d); document.getElementById('cn').textContent = i.value; },
  logout() { me = null; sessionStorage.removeItem('fc_me'); go('home'); },
  invite(id) { const f = user(); db.notifs.push({ to: id, type: 'nInv', name: f.name }); save(); toast('✅ ' + t('sent')); },
  detail(id) { const j = byId('requests', id); modal(`<h2>${cl(j.crop)} ${wl(j.workType)}</h2><p>📅 ${dstr(j.date)}<br>🕒 ${esc(j.hours)}<br>💰 ₹${j.wage}${t('day')}<br>📍 ${esc(j.village)}, ${esc(j.mandal)}, ${esc(j.district)}<br>${j.extra ? '📝 ' + esc(j.extra) : ''}</p><button class="btn" data-do="close">OK</button>`); },
  close() { modal(''); },
  accept(id) { modal(`<h2>${t('doYou')}</h2><button class="btn" data-do="confirm" data-a="${id}">${t('yes')}</button><button class="btn red" data-do="close">${t('cancel')}</button>`); },
  confirm(id) {
    const j = byId('requests', id), l = user(); modal('');
    if (!db.acceptances.some(a => a.workRequestId === id && a.labourerId === l.id)) {
      db.acceptances.push({ id: uid('a'), workRequestId: id, labourerId: l.id, status: 'accepted', acceptedAt: new Date().toISOString() });
      j.acceptedLabourers++; if (j.acceptedLabourers >= j.labourersRequired) j.status = 'closed';
      db.notifs.push({ to: j.farmerId, type: 'nAcc', name: l.name, work: j.workType });
    }
    save(); toast('✅ ' + t('okAcc')); go('myacc');
  }
};
const F = {
  login(v, f) {
    const role = f.dataset.role, m = document.getElementById('msg');
    if (!/^\d{10}$/.test(v.phone)) return m.innerHTML = err('errPhone');
    if (!/^\d{4}$/.test(v.password)) return m.innerHTML = err('errPass');
    if (role === 'admin') { if (v.phone === '0000000000' && v.password === '0000') { setMe({ role: 'admin' }); return go('admin'); } return m.innerHTML = err('errBad'); }
    const u = db[role + 's'].find(x => x.phone === v.phone && x.password === v.password);
    if (!u) return m.innerHTML = err('errBad'); setMe({ role, id: u.id }); go('dash');
  },
  signup(v, f) {
    const role = f.dataset.role, m = document.getElementById('msg');
    if (!v.name.trim() || LK.some(k => !v[k])) return m.innerHTML = err('errFill');
    if (!/^\d{10}$/.test(v.phone)) return m.innerHTML = err('errPhone');
    if (!/^\d{4}$/.test(v.password)) return m.innerHTML = err('errPass');
    if (v.password !== v.password2) return m.innerHTML = err('errMatch');
    if (db[role + 's'].some(x => x.phone === v.phone)) return m.innerHTML = err('errExist');
    const u = { id: uid(role[0]), name: v.name.trim(), phone: v.phone, password: v.password, ...Object.fromEntries(LK.map(k => [k, v[k]])) };
    if (role === 'farmer') Object.assign(u, { farmLoc: v.farmLoc, contactPref: v.contactPref });
    else Object.assign(u, { age: +v.age, gender: v.gender, skills: [...f.querySelectorAll('[name=skills]:checked')].map(c => c.value), experience: +v.experience, expectedWage: +v.expectedWage, availability: v.availability });
    db[role + 's'].push(u); save(); setMe({ role, id: u.id });
    document.getElementById('app').innerHTML = `<div class="ok" style="font-size:24px;text-align:center">✅ ${t('regOk')}</div>`; setTimeout(() => go('dash'), 1200);
  },
  post(v) {
    const u = user(), r = { id: uid('r'), farmerId: u.id, crop: v.crop, workType: v.workType, labourersRequired: +v.labourersRequired, acceptedLabourers: 0, date: v.date, hours: v.hours, wage: +v.wage, extra: v.extra, ...Object.fromEntries(LK.map(k => [k, v[k]])), status: 'open' };
    db.requests.push(r);
    db.labourers.forEach(l => { const d = dist(r, l); if (d <= 25) db.notifs.push({ to: l.id, type: 'nJob', crop: r.crop, work: r.workType, d }); });
    save(); toast('✅ ' + t('posted')); go('reqs');
  },
  find(v) { flt = { crop: v.crop, wage: +v.cwage || +v.wage || 0, avail: v.avail, date: v.date, district: v.district, village: v.village }; go('results'); },
  wage(v) { user().expectedWage = +v.expectedWage; save(); toast('✅ ' + t('saved')); }
};
// ---------- router / render ----------
function setMe(m) { me = m; sessionStorage.fc_me = JSON.stringify(m); }
function go(v, a) { if (!me && !['home', 'how', 'about', 'auth'].includes(v)) v = 'home'; view = v; arg = a; modal(''); render(); scrollTo(0, 0); }
function render() {
  document.documentElement.lang = lang; document.getElementById('lang').value = lang;
  document.getElementById('nav').innerHTML = [['home', 'home'], ['how', 'how'], ['about', 'about']].map(([v, k]) => `<button data-go="${v}">${t(k)}</button>`).join('') + (me ? `<button data-go="${me.role === 'admin' ? 'admin' : 'dash'}">👤</button><button data-do="logout">${t('logout')}</button>` : `<button data-go="auth" data-a="farmer:login">${t('login')}</button>`);
  const b = document.getElementById('bottom'), fm = me?.role === 'farmer';
  b.className = me && me.role !== 'admin' ? 'show' : ''; b.style.display = '';
  b.innerHTML = me && me.role !== 'admin' ? [['🏠', 'home', 'dash'], ['🔎', 'find', fm ? 'findL' : 'find'], ['📋', 'work', fm ? 'reqs' : 'myacc'], ['🔔', 'alerts', 'notifs'], ['👤', 'profile', 'profile']].map(([i, k, v]) => `<button data-go="${v}" class="${view === v ? 'on' : ''}"><span>${i}</span>${t(k)}</button>`).join('') : '';
  if (view === 'dash' && me?.role === 'admin') view = 'admin';
  document.getElementById('app').innerHTML = (V[view] || V.home)();
}
document.addEventListener('click', e => { const b = e.target.closest('[data-go],[data-do]'); if (!b) return; e.preventDefault(); if (b.dataset.go) go(b.dataset.go, b.dataset.a); else A[b.dataset.do]?.(b.dataset.a, b); });
document.addEventListener('submit', e => { e.preventDefault(); F[e.target.dataset.f]?.(Object.fromEntries(new FormData(e.target)), e.target); });
document.addEventListener('change', e => { if (e.target.dataset.loc) locChange(e.target); });
document.getElementById('lang').addEventListener('change', e => { lang = e.target.value; localStorage.fc_lang = lang; render(); });
render();
