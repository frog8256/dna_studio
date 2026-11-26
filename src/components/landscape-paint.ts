// Coordinates follow the shoreline and branch tips in the 1672 × 941 pencil drawing.
export const sceneWidth = 1672
export const sceneHeight = 941
type Brush = CanvasRenderingContext2D
const tau = Math.PI * 2
const unit = (n: number) => Math.max(0, Math.min(1, n))
function ramp(value: number, from: number, to: number) {
  const t = unit((value - from) / (to - from))
  return t * t * (3 - 2 * t)
}
// Stable placement also lets a backward scroll retrace each falling petal.
function noise(i: number) {
  const n = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return n - Math.floor(n)
}
const tips = [
  [18, 526, 9], [42, 509, 10], [76, 491, 13], [94, 471, 12], [125, 481, 14], [151, 512, 13], [122, 544, 9],
  [196, 599, 6], [220, 573, 7], [246, 583, 8], [276, 616, 6], [315, 602, 7], [336, 621, 6],
  [550, 697, 3], [725, 675, 4], [756, 682, 4], [789, 693, 3], [998, 655, 4], [1028, 641, 6],
  [1053, 660, 5], [1080, 651, 4], [1237, 636, 5], [1400, 636, 5],
  [1291, 529, 11], [1325, 493, 12], [1360, 507, 13], [1396, 478, 13], [1435, 498, 11],
  [1420, 402, 13], [1458, 414, 16], [1483, 375, 13], [1512, 393, 14], [1536, 358, 12],
  [1572, 344, 12], [1556, 406, 14], [1577, 449, 14], [1615, 421, 13], [1647, 401, 12],
  [1660, 456, 12], [1641, 500, 13], [1607, 533, 11], [1454, 582, 10], [1404, 576, 9],
]
const foliage = tips.flatMap(([x, y, size], branch) => Array.from({ length: 12 }, (_, index) => {
  const id = branch * 12 + index
  const angle = tau * noise(id + 12)
  const spread = size * Math.sqrt(noise(id + 231))
  return {
    x: x + Math.cos(angle) * spread, y: y + Math.sin(angle) * spread * .76,
    size: size * (.24 + .23 * noise(id + 55)), angle, timing: noise(id + 461), id
  }
}))

function ellipse(ctx: Brush, x: number, y: number, w: number, h: number, angle = 0) {
  ctx.beginPath()
  ctx.ellipse(x, y, w, h, angle, 0, tau)
  ctx.fill()
}

function paintTrees(ctx: Brush, phase: number) {
  for (const tip of foliage) {
    const { x, y, size, angle, timing, id } = tip
    const late = phase >= 4
    // Only a few tips sprout after the bare-paper stage.
    if (late && id % 11 !== 0) continue
    const leafGrowth = late ? ramp(phase, 4.12 + timing * .45, 4.70 + timing * .26) * .74
      : (.22 + .78 * ramp(phase, timing * .36, .72 + timing * .20))
    const fall = late ? 0 : ramp(phase, 1.7 + timing * .65, 2.35 + timing * .58)
    const amber = late ? 0 : ramp(phase, .98 + timing * .25, 1.73 + timing * .24)
    const leafSize = size * leafGrowth
    if (leafSize > 0 && fall < 1) {
      const twist = angle + fall * 3
      ctx.globalAlpha = (.43 + timing * .23) * (1 - fall)
      ctx.fillStyle = `rgb(${Math.round(144 + 52 * amber)} ${Math.round(151 - 8 * amber)} ${Math.round(116 - 18 * amber)})`
      ellipse(ctx, x + fall * (11 + 12 * Math.sin(angle + fall * 5)), y + fall * (32 + size * 4), leafSize * 1.5, leafSize * .60, twist)
    }
    if (late && id % 22 !== 0) continue
    const shed = late ? 0 : ramp(phase, .08 + timing * .38, .55 + timing * .35)
    const bloom = late ? ramp(phase, 4.24 + timing * .37, 4.82 + timing * .16) * .76 : 1
    if (shed === 1 || bloom === 0) continue
    ctx.fillStyle = id % 3 ? '#dbaea0' : '#d5a0a3'
    const radius = size * bloom
    for (let i = 0; i < 5; i++) {
      const a = angle + i * tau / 5
      const drift = shed * (id % 4 === 0 ? 48 : 9)
      ctx.globalAlpha = (.42 + .24 * timing) * (1 - shed)
      ellipse(ctx, x + Math.cos(a) * radius * .68 + Math.sin(a + shed * 4) * drift * .35,
        y + Math.sin(a) * radius * .68 + drift, radius * .8, radius * .47, a + shed)
    }
  }
  ctx.globalAlpha = 1
}

// Calm shallows and the near bank of the bend share this mask in every season.
const river = new Path2D('M555 726 Q687 726 832 734 Q818 740 938 750 Q747 758 690 796 Q744 816 956 830 Q1330 855 1672 901 L1672 941 L757 941 Q655 898 550 892 Q390 873 275 855 Q227 830 363 803 Q408 790 540 771 Q607 763 678 754 Q607 745 555 739 Z')
const banks = new Path2D('M0 615 Q152 651 302 676 Q440 713 531 731 Q705 722 827 728 Q1100 696 1312 688 Q1480 687 1672 665 L1672 941 H0 Z')
const farHills = new Path2D('M0 553 Q105 597 184 609 Q261 656 394 645 Q487 672 535 665 Q616 630 658 609 Q699 600 763 625 Q828 636 862 630 Q957 603 1082 579 Q1112 568 1201 598 Q1272 614 1360 557 Q1435 536 1494 537 Q1587 546 1672 507 V739 H0 Z')
const roofs = [[905, 677, 18], [945, 678, 16], [1062, 669, 18], [1140, 660, 34], [1228, 660, 25], [1306, 654, 43]]

function paintWater(ctx: Brush, phase: number, frost: number) {
  ctx.save()
  ctx.clip(river)
  // The current slows near the freeze, then runs again as the ice retreats.
  const flow = Math.min(phase, 2.85) + Math.max(0, phase - 3.24)
  const flowAlpha = (1 - frost) * (1 - ramp(phase, 3.72, 4))
  for (let i = 0; i < 190; i++) {
    const y = 727 + noise(i + 231) * 216
    const depth = (y - 726) / 217
    const x = (noise(i + 68) * 1800 + flow * (40 + depth * 92)) % 1800 - 60
    const length = (5 + 22 * noise(i + 91)) * (.25 + depth)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x + length * .48, y - 1.5 * depth, x + length, y)
    ctx.lineWidth = .7 + depth
    ctx.strokeStyle = i % 3 ? 'rgba(255,251,235,.82)' : 'rgba(129,157,165,.53)'
    ctx.globalAlpha = flowAlpha
    ctx.stroke()
  }
  if (frost > 0) {
    // Frost spreads inward from the banks. Individual ice patches join at the peak.
    ctx.globalAlpha = frost * .58
    ctx.strokeStyle = '#dee4df'
    ctx.lineWidth = 74 * frost
    ctx.stroke(river)
    for (let i = 0; i < 145; i++) {
      const depth = noise(i + 543)
      const amount = ramp(frost, depth * .53, .62 + depth * .38)
      if (!amount) continue
      ctx.globalAlpha = .32 * amount
      ctx.fillStyle = i % 4 ? '#e2e5df' : '#ced9da'
      ellipse(ctx, noise(i + 27) * sceneWidth, 735 + depth * 205, (44 + 65 * depth) * amount, (3 + 10 * depth) * amount)
    }
  }
  ctx.restore()
}

function paintSnow(ctx: Brush, phase: number, snow: number) {
  if (snow <= 0) return
  ctx.save()
  ctx.fillStyle = '#fffdfa'
  ctx.globalAlpha = snow * .35
  ctx.fill(farHills)
  ctx.save()
  ctx.clip(banks)
  const land = new Path2D()
  land.rect(0, 0, sceneWidth, sceneHeight)
  land.addPath(river)
  ctx.clip(land, 'evenodd')
  ctx.globalAlpha = snow * .46
  ctx.fillRect(0, 550, sceneWidth, sceneHeight - 550)
  for (let i = 0; i < 215; i++) {
    const depth = noise(i + 349)
    const amount = ramp(snow, depth * .62, .67 + depth * .32)
    if (!amount) continue
    ctx.globalAlpha = amount * .27
    ellipse(ctx, noise(i + 73) * sceneWidth, 625 + depth * 316, (12 + depth * 34) * amount, (1.8 + depth * 6) * amount, noise(i + 39) * .25 - .125)
  }
  ctx.restore()
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#fffdfa'
  ctx.globalAlpha = snow * .88
  ctx.lineWidth = 2.4 * snow
  for (const [x, y, length] of roofs) {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + length * .5, y + 2, x + length * snow, y - .7); ctx.stroke()
  }
  for (let i = 0; i < 100; i++) {
    const y = (noise(i + 135) * sceneHeight + (phase - 2) * 180) % sceneHeight
    ctx.globalAlpha = snow * .66
    ellipse(ctx, noise(i + 234) * sceneWidth + Math.sin(phase * 3 + i) * 10, y, 1 + noise(i + 42) * 1.5, 1.3)
  }
  ctx.restore()
}

// Broken brush marks follow the two grassy slopes and leave the pencil lines visible.
const meadows = [[92, 657, 56], [222, 679, 55], [347, 711, 48], [467, 739, 33], [1127, 747, 30],
[1282, 745, 44], [1395, 760, 52], [1533, 752, 65], [1580, 803, 61], [109, 868, 68], [254, 887, 52]]
function paintMeadows(ctx: Brush, phase: number) {
  const cover = 1 - ramp(phase, 1.88, 2.75)
  if (cover === 0) return
  const green = ramp(phase, .02, .93)
  const gold = ramp(phase, 1.12, 1.98)
  ctx.save()
  ctx.clip(banks)
  for (let i = 0; i < meadows.length * 24; i++) {
    const [cx, cy, radius] = meadows[Math.floor(i / 24)]
    const x = cx + (noise(i + 764) - .5) * radius * 2
    const y = cy + (noise(i + 231) - .5) * radius * .38
    const length = (1.5 + noise(i + 93) * 3) * (1 + green * .5)
    ctx.globalAlpha = cover * (.26 + .23 * noise(i + 61))
    const turn = ramp(gold, noise(i + 44) * .5, .5 + noise(i + 44) * .5)
    ctx.fillStyle = `rgb(${146 + 40 * turn} ${153 - 4 * turn} ${113 - 2 * turn})`
    ellipse(ctx, x, y, length, length * .32, -.76 + noise(i + 77) * .37)
    ctx.globalAlpha = cover * (1 - green) * .52
    ctx.fillStyle = '#d9a99b'
    ellipse(ctx, x + 1, y - length * .62, length * .76, length * .56)
  }
  ctx.restore()
}

// All three displays use the same frame. Paint the scene once per scroll position.
let frame: HTMLCanvasElement | undefined
let lastPhase = -1
export function paintSeason(target: Brush, phase: number) {
  if (!frame) {
    frame = document.createElement('canvas')
    frame.width = sceneWidth
    frame.height = sceneHeight
  }
  if (phase !== lastPhase) {
    const ctx = frame.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, sceneWidth, sceneHeight)
    if (phase < 4) {
      const frost = ramp(phase, 2.18, 3) * (1 - ramp(phase, 3.08, 3.89))
      const snow = ramp(phase, 2.34, 3) * (1 - ramp(phase, 3.02, 3.93))
      paintMeadows(ctx, phase)
      paintWater(ctx, phase, frost)
      paintSnow(ctx, phase, snow)
    }
    paintTrees(ctx, phase)
    lastPhase = phase
  }
  target.clearRect(0, 0, sceneWidth, sceneHeight)
  target.drawImage(frame, 0, 0)
}
