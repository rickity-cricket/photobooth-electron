function connectEffect(seriously, src, target, effectName) {
  effectName.source = src
  target.source = effectName
  seriously.go()
}

const effects = {
  vanilla: (seriously, src, target) => {
    target.source = src
    seriously.go()
  },
  ascii: (seriously, src, target) => {
    const ascii = seriously.effect('ascii')
    connectEffect(seriously, src, target, ascii)
  },
  daltonize: (seriously, src, target) => {
    const daltonize = seriously.effect('daltonize')
    daltonize.type = '0.6'
    connectEffect(seriously, src, target, daltonize)
  },
  hex: (seriously, src, target) => {
    const hex = seriously.effect('hex')
    hex.size = 0.01
    connectEffect(seriously, src, target, hex)
  },
  bigHex: (seriously, src, target) => {
    const bigHex = seriously.effect('hex')
    bigHex.size = 0.03
    connectEffect(seriously, src, target, bigHex)
  },
  mirror: (seriously, src, target) => {
    const mirror = seriously.effect('mirror')
    connectEffect(seriously, src, target, mirror)
  },
  kal: (seriously, src, target) => {
    const kal = seriously.effect('kaleidoscope')
    connectEffect(seriously, src, target, kal)
  },
  tritanope: (seriously, src, target) => {
    const tritanope = seriously.effect('daltonize')
    tritanope.type = '0.8'
    connectEffect(seriously, src, target, tritanope)
  },
  pixelate: (seriously, src, target) => {
    const pix = seriously.effect('pixelate')
    pix.pizelSize = [2,2]
    connectEffect(seriously, src, target, pix)
  },
  tv: (seriously, src, target) => {
    const tv = seriously.effect('nightvision')
    connectEffect(seriously, src, target, tv)
  }
}
const effectNames = Object.keys(effects)
let currentIndex = 0

function setIndexToEffectIndex(effectName) {
  currentIndex = effectNames.indexOf(effectName)
  return currentIndex
}

function setNextIndex() {
  const nextIndex = currentIndex + 1 < effectNames.length ? currentIndex + 1 : 0
  currentIndex = nextIndex
  return currentIndex
}

exports.choose = (seriously, src, target, effectName = 'vanilla') => {
  effects[effectName](seriously, src, target)
  setIndexToEffectIndex(effectName)
}

exports.cycle = (seriously, src, target) => {
  setNextIndex()
  effects[effectNames[currentIndex]](seriously, src, target)
}
