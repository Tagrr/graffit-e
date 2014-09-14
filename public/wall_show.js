function getCurrentWallName () {
  var path = location.pathname;
  return path.replace('/walls/','');

}

function wallEdit () {
  var name = getCurrentWallName();
  document.querySelector('.creategraph').classList.toggle('show');


}

function createGraph () {
  var name = getCurrentWallName();
  document.querySelector('.creategraph').classList.toggle('show');


}

function createSticker () {
  var name = getCurrentWallName();
  document.querySelector('.creategraph').classList.toggle('show');

}

function insertStickerCallback () {
  console.log('insertStickerCallback', this, arguments);
}

function insertSticker (img) {
  console.log(location, 'url', location.pathname + '/createGraph');
  $.post(
    location.pathname + '/createGraph', 
    {"graph":{"img": img.getAttribute('src')}},
     function () {console.log('ajax callback', arguments);},
    'json'
  );
}

function destroySticker (graph) {
  console.log('destroy path', location.pathname + '/destroyGraph/' + graph.id);
  $.ajax({
    method: 'DELETE',
    url: location.pathname + '/destroyGraph/' + graph.id,
    success: function () {
      console.log('destroyGraph successed', graph);
      graph.parentNode.removeChild(graph);
    },
    dataType: 'json'
  });

}

(function () {
  var graphs = $('#graphs');
  var i = 0;
  var j = 0;
  var k = 0;

  if (!graphs) return;
  function preventDefault (event) {
    event.preventDefault();
  }

  function disableGlobalScroll () {
    document.body.addEventListener('touchmove', preventDefault, false);
  }

  function enableGlobalScroll () {
    document.body.removeEventListener('touchmove', preventDefault, false);
  }

  var currentTouch;
  graphs.delegate('.graph', 'touchstart', function (event) {
    document.querySelector('#info').textContent = 'touchstart' + (i++);
    event.currentTarget.style.setProperty('z-index', 10);
    currentTouch = event.currentTarget;
  });
  graphs.delegate('.graph', 'touchmove', function (event) {
    var t = event.currentTarget;
    if (!t.classList.contains('graph')) { return; }
    event.preventDefault();

    var tt = event.originalEvent.touches[0];
    document.querySelector('#info').textContent = 'touchmove' + (j++);
    // -50 to set the image in the middle of the cursor
    t.style.setProperty('top', (window.pageYOffset + tt.clientY - 50) + 'px');
    t.style.setProperty('left', (window.pageXOffset + tt.clientX  - 50)+ 'px');
  });

  function isOverRemove (y) {
    return y > window.innerHeight + window.pageYOffset - 80;
  }

  graphs.delegate('.graph', 'touchend', function () {
    var
    t = currentTouch,
    top = parseInt(t.style.getPropertyValue('top'), 10);

    document.querySelector('#info').textContent = 'touchend' + (k++);

    //event.currentTarget.style.setProperty('z-index', 0);
    t.style.removeProperty('z-index');

    // check if touchend in remove zone.
    if (isOverRemove(top)) {
      destroySticker(t);
    }
    currentTouch = null;
  });

 })();
