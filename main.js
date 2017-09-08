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


  $('#canvas').addEventListener('change', function (e) {
    if (e.target.checked) {
      performance.mark('canvas:add')
      var canvasEl = document.createElement('canvas')
      canvasEl.width = 100
      canvasEl.height = 100
      var ctx = canvasEl.getContext('2d')
      ctx.fillStyle = 'goldenrod'
      ctx.fillRect(0, 0, 100, 100)
      appendToDisplay(canvasEl)
    } else {
      performance.mark('canvas:remove')
      removeFromDisplay('canvas')
    }
  })

  $('#advancedSvg').addEventListener('change', function (e) {
    if (e.target.checked) {
      performance.mark('advancedSvg:add')
      var el = document.createElement('div')
      el.classList.add('advancedSvgEl')
      el.innerHTML = '<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">  <defs>    <clipPath id="myClip">      <circle cx="30" cy="30" r="20"/>      <circle cx="70" cy="70" r="20"/>    </clipPath>  </defs>  <rect x="10" y="10" width="100" height="100"      clip-path="url(#myClip)"/></svg>'
      appendToDisplay(el)
    } else {
      performance.mark('advancedSvg:remove')
      removeFromDisplay('.advancedSvgEl')
    }
  })

  $('#autoplayVideo').addEventListener('change', function (e) {
    if (e.target.checked) {
      performance.mark('autoplayVideo:add')
      var el = document.createElement('div')
      el.classList.add('autoplayVideoEl')
      el.innerHTML = '<video autoplay loop muted src="windows.mp4" width="300"></video>'
      appendToDisplay(el)
    } else {
      performance.mark('autoplayVideo:remove')
      removeFromDisplay('.autoplayVideoEl')
    }
  })

  $('#selectControl').addEventListener('change', function (e) {
    if (e.target.checked) {
      performance.mark('selectControl:add')
      var el = document.createElement('div')
      el.classList.add('selectControl')
      el.innerHTML = '<select size="3">\n' +
        '  <option value="alpha">Alpha</option>\n' +
        '  <option value="bravo">Bravo</option>\n' +
        '  <option value="charlie">Charlie</option>\n' +
        '  <option value="delta">Delta</option>\n' +
        '</select>'
      appendToDisplay(el)
    } else {
      performance.mark('selectControl:remove')
      removeFromDisplay('.selectControl')
    }
  })


  $('#addAudio').addEventListener('change', function (e) {
    if (e.target.checked) {
      performance.mark('audio:add')
      var el = document.createElement('div')
      el.classList.add('addAudioEl')
      el.innerHTML = '<audio src="win31.mp3" autoplay loop></audio>'
      appendToDisplay(el)
    } else {
      performance.mark('audio:remove')
      removeFromDisplay('.addAudioEl')
    }
  })

  $('#custom').addEventListener('change', function (e) {
    if (e.target.checked) {
      performance.mark('custom:add')
      var el = document.createElement('div')
      el.classList.add('customEl')
      el.innerHTML = $('#customElTextarea').value
      appendToDisplay(el)
    } else {
      performance.mark('custom:remove')
      removeFromDisplay('.customEl')
    }
  })

  $('#whatIsThisToggle').addEventListener('click', function (e) {
    e.preventDefault()
    $('#whatIsThis').style.display = $('#whatIsThis').style.display === 'none' ? 'inherit' : 'none'
  })

  var fps = new FpsEmitter()
  var fpsDisplay = $('#fps')
  fps.on('update', function (newFps) {
    fpsDisplay.innerHTML = newFps + ' FPS'
    fpsDisplay.style.background = 'rgba(200, 50, 50, ' + (1 - (newFps / 60)) + ')'
  })
})()
