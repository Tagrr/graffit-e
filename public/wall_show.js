function getCurrentWallName () {
  var path = location.pathname;
  return path.replace('/walls/','');

}

function showForm (cls) {
  var show = document.querySelector('nav.creategraph div.form.show');
  if (show) {
    show.classList.toggle('show');
    if (show.classList.contains(cls)) return;
  }

  document.querySelector('nav.creategraph div.form.' + cls).classList.toggle('show');

}

function updateStickers(callback) {
  $.get(
    location.pathname + '/showGraphs', 
    function (graphs) {
      graphs.forEach(function (graph) {
        var $g = $('#'+graph.id);
        if ($g.length) {
          $g.attr('style', graph.style);
        } else {
          $g = $('<div>').addClass('graph').attr('id', graph.id).attr('style', graph.style).append('<img src="' + graph.img + '" >');
          $('#graphs').append($g);
        }
      });
      if (callback) callback();
    },
    'json');
}

function insertSticker (img) {
  $.post(
    location.pathname + '/createGraph', 
    {"graph":{"img": img.getAttribute('src')}},
    function () {
      updateStickers();
    },
    'json'
  );
}

function updateSticker (graph) {
  $.ajax({
    method: 'PUT',
    url: location.pathname + '/updateGraph/' + graph.id,
    data: {"graph":{"style": graph.style.cssText}},
    dataType: 'json'
  });

}
function destroySticker (graph) {
  $.ajax({
    method: 'DELETE',
    url: location.pathname + '/destroyGraph/' + graph.id,
    success: function () {
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
    event.currentTarget.style.setProperty('z-index', 10);
    currentTouch = event.currentTarget;
  });
  graphs.delegate('.graph', 'touchmove', function (event) {
    var t = event.currentTarget;
    if (!t.classList.contains('graph')) { return; }
    event.preventDefault();

    var tt = event.originalEvent.touches[0];
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


    //event.currentTarget.style.setProperty('z-index', 0);
    t.style.removeProperty('z-index');

    // check if touchend in remove zone.
    if (isOverRemove(top)) {
      destroySticker(t);
    } else {
      updateSticker(t);
    }
    currentTouch = null;
  });

 })();
