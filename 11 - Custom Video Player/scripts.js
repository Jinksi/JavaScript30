// Get Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
let mousedown = false

// Build Functions
function togglePlay(){
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateToggleButton(){
  toggle.textContent = video.paused ? '▶' : '❚ ❚'
}

function skip(){
  const amount = parseFloat(this.dataset.skip)
  video.currentTime += amount
}

function handleRangeUpdate(){
  video[this.name] = this.value
  console.log(this.value);
}

function handleProgress(){
  const percent = video.currentTime / video.duration * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
  const percent =  e.offsetX / progress.offsetWidth
  video.currentTime = video.duration * percent
}

// Hook Event Listeners
video.addEventListener('click', togglePlay)
video.addEventListener('pause', updateToggleButton)
video.addEventListener('play', updateToggleButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(btn => btn.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))

window.addEventListener('mousedown', () => mousedown = true)
window.addEventListener('mouseup', () => mousedown = false)
