const Mzero = 3
const epoch = 1747
const ixx = 46
const betastar = 10
const beta = 172
const cnst = {
  m0: 2359237 + 2603 / 2828,
  m1: 167025 / 5656,
  m2: 11135 / 11312,
  s0: 397 / 402,
  s1: 65 / 804,
  s2: 13 / 4824,
  a0: 1523 / 1764,
  a1: 253 / 3528,
  a2: 1 / 28 // +1/105840
}
const Dlong = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба']
const Roman12 = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
const Animal = ['хулгана', 'үхэр', 'барс', 'туулай', 'луу', 'могой', 'морь', 'хонь', 'бич', 'тахиа', 'нохой', 'гахай']
const Animalin = ['хулгана', 'үхэр', 'бар', 'туулай', 'луу', 'могой', 'морин', 'хонин', 'бичин', 'тахиа', 'нохой', 'гахай']
const Element = ['модон', 'гал', 'шороон', 'төмөр', 'усан']
const Colour = ['хөх', 'хөхөгчин', 'улаан', 'улаагчин', 'шар', 'шарагчин', 'цагаан', 'цагаагчин', 'хар', 'харагчин']
const Element8 = ['гал', 'шороо', 'төмөр', 'огторгуй', 'ус', 'уул', 'мод', 'хий']
const Colour9 = ['цагаан', 'хар', 'хөх', 'ногоон', 'шар', 'цагаан', 'улаан', 'цагаан', 'улаан']
const Numbern = ['нэг', 'хоёр', 'гурван', 'дөрвөн', 'таван', 'зургаан', 'долоон', 'найман', 'есөн']
const calType = 2 // default type Mongolian

// constants
const EPOCH = {
  JD: 2451545 // J2000
}

const PHASE = {
  EPS: 0.0001,
  EPSD: 0.001
}

function amod (a, b) {
  let t = a % b
  if (t <= 0) { t += b }
  return t
}

function Mstar (Y, M) {
  return 12 * (Y - epoch) + M - Mzero
}

function trueMonth (Y, M, L) {
  const p = 67 * Mstar(Y, M) + betastar
  let ix = (67 * Mstar(Y, M) + betastar) % 65
  if (ix < 0) { ix += 65 }
  const pp = (p - ix) / 65
  switch (calType) {
    case 1: if (L) { return pp - 1 } else { return pp } // Tsurphu
    case 3: if (!L && (ix < ixx)) { return pp } else { return pp + 1 } // Bhutan
    case 4: if (!L) { return pp } else { return pp + 1 } // Karana
    default: if (L || (ix < ixx)) { return pp } else { return pp + 1 }
  }
}

function leapMonth (Y, M) {
  let t = (24 * (Y - epoch) + 2 * M - beta) % 65
  if (t < 0) { t += 65 }
  return (t === 0) || (t === 1)
}

function moonTab (i) {
  i = i % 28
  if (i < 0) { i += 28 }
  let s = 1
  if (i >= 14) { i -= 14; s = -1 }
  if (i > 7) { i = 14 - i }
  const a = Math.floor(i)
  const b = Math.ceil(i)
  const v = [0, 5, 10, 15, 19, 22, 24, 25]
  if (a === b) { return s * v[a] } else { return s * ((b - i) * v[a] + (i - a) * v[b]) / (b - a) }
}

function sunTab (i) {
  i = i % 12
  if (i < 0) { i += 12 }
  let s = 1
  if (i >= 6) { i -= 6; s = -1 }
  if (i > 3) { i = 6 - i }
  const a = Math.floor(i)
  const b = Math.ceil(i)
  const v = [0, 6, 10, 11]
  if (a === b) { return s * v[a] } else { return s * ((b - i) * v[a] + (i - a) * v[b]) / (b - a) }
}

function trueDate (d, n) {
  const meanDate = n * cnst.m1 + d * cnst.m2 + cnst.m0
  const meanSun = n * cnst.s1 + d * cnst.s2 + cnst.s0
  const anomalyMoon = n * cnst.a1 + d * cnst.a2 + cnst.a0
  const moonEqu = moonTab(28 * anomalyMoon)
  const anomalySun = meanSun - 0.25
  const sunEqu = sunTab(12 * anomalySun)
  const t = meanDate + moonEqu / 60 - sunEqu / 60
  return t
}

function prevMonth (Y, M, L) {
  const dat = {}
  dat.Y = Y; dat.M = M; dat.L = L
  if (calType <= 2) {
    if (leapMonth(Y, M)) { if (L) { dat.L = 0; dat.M-- } else { dat.L = 1 } } else { dat.M-- }
    if (dat.M <= 0) { dat.M = 12; dat.Y-- }
  } else {
    if (leapMonth(Y, M)) { if (L) { dat.L = 0 } else { dat.M-- } } else { dat.M-- }
    if (dat.M <= 0) { dat.M = 12; dat.Y-- }
    if (dat.M !== M) { dat.L = leapMonth(dat.Y, dat.M) }
  }
  return dat
}

// Julian day number of the lunar day
function julianDay (Y, M, L, d) {
  const n = trueMonth(Y, M, L)
  const t = trueDate(d, n)
  return Math.floor(t)
}

// Julian day number of the first day of the lunar year
function newYearJd (Y) {
  if (calType <= 2) { return julianDay(Y - 1, 12, 0, 30) + 1 } else {
    const d = prevMonth(Y, 1, 0)
    return julianDay(d.Y, d.M, d.L, 30) + 1
  }
}

// Year attributes
function attribYear (Y) {
  const ans = {}
  ans.year = amod(Y - 6, 60)
  ans.cycle = Math.ceil((Y - 1026) / 60)
  ans.animal = Animal[amod(Y - 3, 12) - 1]
  ans.animal_number = amod(Y - 3, 12) - 1
  ans.animalin = Animalin[amod(Y - 3, 12) - 1]
  ans.element = Element[Math.ceil(amod(Y - 3, 10) / 2) - 1]
  ans.colour = Colour[amod(Y - 3, 10) - 1]
  ans.elcor = calType === 2 ? ans.colour : ans.element
  ans.number = amod(2 - Y, 9)
  ans.colour9 = Colour9[ans.number - 1]
  return ans
}

// Julian day number to Gregorian date
function jd2g (jd) {
  const gregorianDate = {}
  const gg = Math.floor(Math.floor((jd - 4479.5) / 36524.25) * 0.75 + 0.5) - 37
  const n = jd + gg
  gregorianDate.year = Math.floor(n / 365.25) - 4712
  const dd = Math.floor((n - 59.25) % 365.25)
  gregorianDate.month = (Math.floor((dd + 0.5) / 30.6) + 2) % 12 + 1
  gregorianDate.day = Math.floor((dd + 0.5) % 30.6) + 1
  return gregorianDate
}

// Julian date to JS date object
function JSDate (jd) {
  const jj = jd - 2440587.5 // days since 1970/1/1 00:00:00
  const dat = new Date(jj * 86400000) // milliseconds since 1970/1/1 00:00:00
  return dat
}

// fractional part
function fracPart (a) {
  return a - Math.floor(a)
}

// Moon phase, n = jd - 2451545
function moonphaseFast (n) {
  const Omega = 2.1429 - 0.0010394594 * n
  const mls = 4.8950630 + 0.017202791698 * n // mean longitude
  const mas = 6.2400600 + 0.0172019699 * n // mean anomaly
  const els = mls + 0.03341607 * Math.sin(mas) + 0.00034894 * Math.sin(mas * 2) - 0.0001134 - 0.0000203 * Math.sin(Omega) // ecliptic longitude
  const t = n / 36525.0
  const mlm = 0.606433 + 1336.855225 * t // mean longitude
  const l = Math.PI * 2 * fracPart(0.374897 + 1325.552410 * t) // mean anomaly
  const ls = Math.PI * 2 * fracPart(0.993133 + 99.997361 * t) // Sun's mean anomaly
  const D = Math.PI * 2 * fracPart(0.827361 + 1236.853086 * t) // diff
  const F = Math.PI * 2 * fracPart(0.259086 + 1342.227825 * t) // distance from ascending node
  const dL = 22640 * Math.sin(l) - 4586 * Math.sin(l - 2 * D) + 2370 * Math.sin(2 * D) + 769 * Math.sin(2 * l) -
    668 * Math.sin(ls) - 412 * Math.sin(2 * F) - 212 * Math.sin(2 * l - 2 * D) - 206 * Math.sin(l + ls - 2 * D) +
    192 * Math.sin(l + 2 * D) - 165 * Math.sin(ls - 2 * D) - 125 * Math.sin(D) - 110 * Math.sin(l + ls) +
    148 * Math.sin(l - ls) - 55 * Math.sin(2 * F - 2 * D)
  const elm = mlm + dL / 1296000.0 // ecliptic longitude
  const p = fracPart(elm - els / (Math.PI * 2))
  return p
}

function attribDay (jd) {
  const ans = {}
  ans.animal = amod(jd + 2, 12)
  const t = amod(jd, 10)
  ans.colour = Colour[t - 1]
  ans.element = Element[Math.ceil(t / 2) - 1]
  ans.elcor = calType === 2 ? ans.colour : ans.element
  ans.number = amod(-jd, 9)
  ans.colour9 = Colour9[ans.number - 1]
  ans.trigram = amod(jd + 2, 8)
  ans.day = (jd + 1) % 7 // 0=Sunday,1=Monday
  return ans
}

// range in (-0.5,0.5)
function moonphase0 (n) {
  return fracPart(moonphaseFast(n) + 0.5) - 0.5
}

// solve moonphase(j-2451545)=pp where j1<=j<=j2
function findNewmoon (j1, j2, pp) {
  let n1 = j1 - 2451545
  let n2 = j2 - 2451545
  let p1 = moonphase0(n1) - pp
  if (Math.abs(p1) <= PHASE.EPS) { return n1 }
  let p2 = moonphase0(n2) - pp
  if (Math.abs(p2) <= PHASE.EPS) { return n2 }
  if (p1 * p2 > 0) { return -EPOCH.JD - 1 }
  let nn = n1 - p1 * (n2 - n1) / (p2 - p1)
  let pn = moonphase0(nn) - pp
  while (Math.abs(pn) > PHASE.EPS) {
    if (p1 * pn > 0) { p1 = pn; n1 = nn } else { p2 = pn; n2 = nn }
    nn = n1 - p1 * (n2 - n1) / (p2 - p1)
    if (n2 - n1 <= PHASE.EPSD) { break }
    pn = moonphase0(nn) - pp
  }
  return nn + 2451545
}

function calculateNewYear (y) {
  const j = newYearJd(y)
  const g = jd2g(j)
  const att = attribYear(y)
  const a = attribDay(j)
  const jnew = findNewmoon(j - 3, j + 3, 0)
  const sd = JSDate(jnew + 8 / 24)
  // const j1 = findNewmoon(j - 3, j + 3, 1.0 / 30)
  // const sd1 = JSDate(j1 + 8 / 24)
  // console.log(j1, sd1)
  return {
    Жаран: att.cycle,
    Жил: (att.elcor + ' ' + att.animal),
    animal_number: att.animal_number,
    Жилийн_мэнгэ: Numbern[att.number - 1] + ' ' + att.colour9,
    Шинийн_нэгэн: y + '/' + Roman12[g.month - 1] + '/' + ((g.day < 10) ? '0' : '') + g.day + ' ' + Dlong[a.day],
    Өдрийн_өнгө: a.elcor + ' ' + Animal[a.animal - 1],
    Өдрийн_мэнгэ: Numbern[a.number - 1] + ' ' + a.colour9,
    Суудал: Element8[a.trigram - 1],
    Битүүний_сар: Roman12[sd.getUTCMonth()] + '/' + ((sd.getUTCDate() <= 9) ? '0' : '') + sd.getUTCDate() + ' - ' + ((sd.getUTCHours() <= 9) ? '0' : '') + sd.getUTCHours() + 'ц ' + ((sd.getUTCMinutes() <= 9) ? '0' : '') + sd.getUTCMinutes() + 'м'
  }
}
module.exports = calculateNewYear
