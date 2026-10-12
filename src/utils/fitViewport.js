// keep that same composition and scale it up to fill the screen.
const designWidth = 1280

function fitToDesignWidth() {
  const page = document.getElementById('root')
  const viewport = document.documentElement.clientWidth

  if (!page || viewport <= designWidth) {
    document.documentElement.style.setProperty('--fit', '1')
    if (page) {
      page.style.zoom = ''
      page.style.width = ''
    }
    return
  }

  const scale = viewport / designWidth
  document.documentElement.style.setProperty('--fit', String(scale))
  page.style.width = `${designWidth}px`
  page.style.zoom = String(scale)
}

function settle() {
  fitToDesignWidth()
  requestAnimationFrame(fitToDesignWidth)
}

settle()
window.addEventListener('resize', settle)
