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
const Animal = ['хулгана', 'үхэр', 'барс', 'туулай', 'луу', 'могой', 'морь', 'хонь', 'бич', 'тахиа', 'нохой', 'гахай']
const Animalin = ['хулгана', 'үхэр', 'бар', 'туулай', 'луу', 'могой', 'морин', 'хонин', 'бичин', 'тахиа', 'нохой', 'гахай']
const Element = ['модон', 'гал', 'шороон', 'төмөр', 'усан']
const Colour = ['хөх', 'хөхөгчин', 'улаан', 'улаагчин', 'шар', 'шарагчин', 'цагаан', 'цагаагчин', 'хар', 'харагчин']
const Element8 = ['гал', 'шороо', 'төмөр', 'огторгуй', 'ус', 'уул', 'мод', 'хий']
const mmn = ['хаврын тэргүүн', 'хаврын дунд', 'хаврын сүүл', 'зуны эхэн', 'зуны дунд', 'зуны сүүл', 'намрын эхэн', 'намрын дунд', 'намрын сүүл', 'өвлийн эхэн', 'өвлийн дунд', 'өвлийн сүүл']
// const Direction8 = ['урагшаа', 'баруун урагшаа', 'баруун тийшээ', 'баруун хойшоо', 'хойшоо', 'зүүн хойшоо', 'зүүн тийшээ', 'зүүн урагшаа']
const Colour9 = ['цагаан', 'хар', 'хөх', 'ногоон', 'шар', 'цагаан', 'улаан', 'цагаан', 'улаан']
const Numbern = ['нэг', 'хоёр', 'гурван', 'дөрвөн', 'таван', 'зургаан', 'долоон', 'найман', 'есөн']
const CycleName = ['Сайтар гарсан', 'Сайтар болсон', 'Цагаан', 'Маш согтонги', 'Төрөлхтөний эзэн', 'Ангира', 'Цог нүүрт', 'Бода', 'Насан төгөлдөр', 'Баригч', 'Эрхэт', 'Олон үрт', 'Согтох төгөлдөр', 'Тийн дарагч', 'Сүргийн манлай', 'Элдэв', 'Наран', 'Наран гэтэлгэгч', 'Газар тэтгэгч', 'Баршгүй', 'Хамгийг номхотгогч', 'Хотлыг баригч', 'Харшилт', 'Тийн урвагч', 'Илжиг', 'Баясгалан', 'Тийн ялагч', 'Ялгуусан', 'Солиоруулагч (Галзууруулагч)', 'Нүүр муут (Муу нүүрт)', 'Алтан унжлагат', 'Тийн унжлагат', 'Урвуулагч', 'Хотол төгс', 'Цөөвөр', 'Сайжруулагч (Буян үйлдэгч)', 'Үзэсгэлэнт болгогч', 'Хилэнт эм', 'Элдэв эрдэнэт', 'Сүрээр дарагч', 'Бичин', 'Гадсан', 'Амирлангуй', 'Ерд (Ерөнхий)', 'Харшлагч (Алжаас үйлт)', 'Огоот баригч', 'Сэрэмж үгүй', 'Хотол баясгалант', 'Мангас', 'Гал', 'Улбар шаргалт', 'Цагийн элч', 'Тус бүтээгч', 'Догшин', 'Муу оюут', 'Их хэнгэрэг', 'Цусаар бөөлжигч', 'Улаан нүдэн', 'Хилэнт', 'Барагдагч']
// const Type = ['Пүг', 'Цүр', 'Монгол', 'Бутан', 'Цагийн хүрдэн']
const calType = 2 // default type Mongolian

// Үс засуулах өдөр
const hairCutDay = ['Нас ахар болно', 'Хэл ам хэрүүл тэмцэл ирнэ', 'Эд мал баялаг төгөлдөр болно', 'Бие эрхтний хүч сайжирна', 'Эд мал арвидна', 'Өнгө зүс сайжирна', 'Хэл ам хэрүүл тэмцэл ирнэ', 'Нас уртасна', 'Өвчин өчүүхэн ирнэ', 'Эрч хүн ихэснэ', 'Эрхтэн хурц болно', 'Өвчин эмгэг ирнэ', 'Жаргал ирнэ', 'Эд мал арвижина', 'Өлзийтэй сайн', 'Өвчин ирнэ', 'Өнгө зүс доройтно', 'Эд малын гарлагатай', 'Сайн нөхөртэй нөхөрлөнө', 'Өлсөж ундаасна', 'Өвчин ирнэ', 'Идээ ундаа элбэг олдоно', 'Эд эдлэл идээ ундаа олдоно', 'Өвчин эмгэг ирнэ', 'Нүд бүрэлзэн улцайн', 'Жаргал үргэлжид ирнэ', 'Өлзийтэй сайн', 'Хэрүүл тэмцэл ирнэ', 'Сүлд тэнэж одно', 'Эрлэг лугаа учирна']

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

// First day of the lunar month
function firstDayJd (Y, M, L) {
  const d = prevMonth(Y, M, L)
  return julianDay(d.Y, d.M, d.L, 30) + 1
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

function intDiv (a, b) {
  return Math.floor(a / b)
}

// Gregorian date to Julian day number
function g2jdn (yy, mm, dd) {
  const a = intDiv(14 - mm, 12)
  const y = yy + 4800 - a
  const m = mm + 12 * a - 3
  return dd + intDiv(153 * m + 2, 5) + 365 * y + intDiv(y, 4) - intDiv(y, 100) + intDiv(y, 400) - 32045 // +68/86400??
}

// // Julian day number to Gregorian date
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
  ans.cycleName = CycleName[(Y + 7) % 60]
  return ans
}

// Month attributes
function attribMonth (Y, M) {
  const a = {}
  a.animal = Animal[(M + 1) % 12]
  a.animal_number = (M + 1) % 12
  const t = amod(Y - 2 + Math.floor((M - 1) / 2), 5)
  a.element = Element[t - 1]
  a.colour = Colour[2 * (t - 1) + (M - 1) % 2]
  a.elcor = a.colour
  a.number = amod(3 - 12 * Y - M, 9)
  a.colour9 = Colour9[a.number - 1]
  return a
}

// Last day of the lunar month
function lastDayJd (Y, M, L) {
  return julianDay(Y, M, L, 30)
}

function lunarMonthC (y, m, d) {
  const dat = {}
  const jd = g2jdn(y, m, d)
  dat.Y = y
  dat.M = m
  dat.L = 0
  let dat1 = {}
  while (true) {
    const jd1 = firstDayJd(dat.Y, dat.M, dat.L)
    const jd2 = lastDayJd(dat.Y, dat.M, dat.L)
    if (jd1 <= jd && jd <= jd2) { return dat }
    dat1 = prevMonth(dat.Y, dat.M, dat.L)
    dat.Y = dat1.Y; dat.M = dat1.M; dat.L = dat1.L
  }
}
function lunarDate (Y, M, D) {
  const julianDate = g2jdn(Y, M, D)
  const dayAttr = attribDay(julianDate)
  const lunarMonth = lunarMonthC(Y, M, D)
  const yearAttr = attribYear(lunarMonth.Y)
  let lunarDayNumber = 1
  for (let i = 1; i < 31; i++) {
    const temp = jd2g(julianDay(lunarMonth.Y, lunarMonth.M, lunarMonth.L, i))
    if (temp.year === Y && temp.month === M && temp.day === D) {
      lunarDayNumber = i
      break
    }
  }
  const monthAttr = attribMonth(lunarMonth.Y, lunarMonth.M)
  return {
    jaran: yearAttr.cycle,
    jil: yearAttr.elcor + ' ' + yearAttr.animalin,
    jil_cycle_name: yearAttr.cycleName,
    jil_animal_number: yearAttr.animal_number,
    jil_full: yearAttr.cycle + '-р жарны ' + yearAttr.cycleName + ' хэмээх ' + yearAttr.elcor + ' ' + yearAttr.animalin + ' жил',
    sar: mmn[lunarMonth.M - 1] + (lunarMonth.L ? ' (илүү) ' : ' '),
    sar_menge: Numbern[monthAttr.number - 1] + ' ' + monthAttr.colour9,
    sar_animal_number: monthAttr.animal_number,
    sar_jil: monthAttr.elcor + ' ' + monthAttr.animal,
    sar_full: mmn[lunarMonth.M - 1] + (lunarMonth.L ? ' (илүү), ' : ', ') + Numbern[monthAttr.number - 1] + ' ' + monthAttr.colour9 + ' мэнгэтэй, ' + monthAttr.elcor + ' ' + monthAttr.animal + ' сар',
    odor_bilgiin_toolol: lunarDayNumber,
    odor_suudal: Element8[dayAttr.trigram - 1],
    odor_menge: Numbern[dayAttr.number - 1] + ' ' + dayAttr.colour9,
    odor_animal: dayAttr.elcor + ' ' + Animal[dayAttr.animal - 1],
    odor_animal_number: dayAttr.animal - 1,
    hairCutDay: hairCutDay[lunarDayNumber - 1],
    odor_full: 'Билгийн тооллийн ' + lunarDayNumber + ', ' + Element8[dayAttr.trigram - 1] + ' суудалтай, ' + Numbern[dayAttr.number - 1] + ' ' + dayAttr.colour9 + ' мэнгэтэй, ' + dayAttr.elcor + ' ' + Animal[dayAttr.animal - 1] + ' өдөр'
  }
}
module.exports = lunarDate
