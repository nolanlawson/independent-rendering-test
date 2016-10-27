(function () {
  var $ = document.querySelector.bind(document)
  var display = $('#display')
  var displayContainer = $('#displayContainer')

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s]
    })
  }

  function appendToDisplay(el) {
    var pre = document.createElement('pre')
    pre.innerHTML = escapeHtml(pretty(el.outerHTML))
    pre.classList.add('rawHtmlDisplay')
    display.appendChild(el)
    display.appendChild(pre)
    displayContainer.style.display = 'inherit'
  }
  
  function removeFromDisplay(selector) {
    display.removeChild($(selector))
    display.removeChild($('.rawHtmlDisplay'))
    if (!display.children.length) {
      displayContainer.style.display = 'none'
    }
  }

  var jankHandle

  function jank(ms) {
    var start = Date.now()
    while (Date.now() - start <= ms) {}
  }

  $('#jank').addEventListener('change', function (e) {
    if (e.target.checked) {
      jankHandle = setInterval(function () {
        jank(200)
      }, 300)
    } else {
      clearInterval(jankHandle)
    }
  })

  $('#canvas').addEventListener('change', function (e) {
    if (e.target.checked) {
      var canvasEl = document.createElement('canvas')
      canvasEl.width = 100
      canvasEl.height = 100
      var ctx = canvasEl.getContext('2d')
      ctx.fillStyle = 'goldenrod'
      ctx.fillRect(0, 0, 100, 100)
      appendToDisplay(canvasEl)
    } else {
      removeFromDisplay('canvas')
    }
  })

  $('#advancedSvg').addEventListener('change', function (e) {
    if (e.target.checked) {
      var el = document.createElement('div')
      el.classList.add('advancedSvgEl')
      el.innerHTML = '<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">  <defs>    <clipPath id="myClip">      <circle cx="30" cy="30" r="20"/>      <circle cx="70" cy="70" r="20"/>    </clipPath>  </defs>  <rect x="10" y="10" width="100" height="100"      clip-path="url(#myClip)"/></svg>'
      appendToDisplay(el)
    } else {
      removeFromDisplay('.advancedSvgEl')
    }
  })

  $('#autoplayVideo').addEventListener('change', function (e) {
    if (e.target.checked) {
      var el = document.createElement('div')
      el.classList.add('autoplayVideoEl')
      el.innerHTML = '<video autoplay loop muted src="kirby_paint.mp4" width="50" height="50"></video>'
      appendToDisplay(el)
    } else {
      removeFromDisplay('.autoplayVideoEl')
    }
  })

  $('#addAudio').addEventListener('change', function (e) {
    if (e.target.checked) {
      var el = document.createElement('div')
      el.classList.add('addAudioEl')
      el.innerHTML = '<audio controls src="win31.mp3"></audio>'
      appendToDisplay(el)
    } else {
      removeFromDisplay('.addAudioEl')
    }
  })

  $('#custom').addEventListener('change', function (e) {
    if (e.target.checked) {
      var el = document.createElement('div')
      el.classList.add('customEl')
      el.innerHTML = $('#customElTextarea').value
      appendToDisplay(el)
    } else {
      removeFromDisplay('.customEl')
    }
  })

  var fps = new FpsEmitter()
  var fpsDisplay = $('#fps')
  fps.on('update', function (newFps) {
    fpsDisplay.innerHTML = newFps + ' FPS'
    fpsDisplay.style.background = 'rgba(200, 50, 50, ' + (1 - (newFps / 60)) + ')'
  })
})()