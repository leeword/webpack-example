import alarmBell from './asserts/alarm_bell_hover.png'

function createImage(src) {
  const img = new Image()
  img.src = src

  return img
}

document.body.appendChild(
  createImage(alarmBell)
)
