(function (win) {
  const doc = win.document
  const docEl = doc.documentElement
  let tid

  function refreshRem () {
    const width = docEl.getBoundingClientRect().width
    const rem = width / 7.5 // 将屏幕宽度分成7.5份， 1份为1rem
    docEl.style.fontSize = rem + 'px'
  }

  win.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 10)
  }, false)
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 10)
    }
  }, false)

  refreshRem()
})(window)
