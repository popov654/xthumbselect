(function() {
   
window.XThumbSelect = {}

XThumbSelect.getWindowCoords = function(el) {
   return { left: Math.floor(el.lastElementChild.offsetLeft),
            top:  Math.floor(el.lastElementChild.offsetTop),
            size: Math.floor(el.lastElementChild.clientHeight) }
}

XThumbSelect.setWindowCoords = function(el, coords) {
   var w = el.lastElementChild
   w.style.left = coords.left + 'px'
   w.style.top = coords.top + 'px'
   w.style.width = coords.size + 'px'
   w.style.height = coords.size + 'px'
   w.style.backgroundPosition = '-' + w.style.left + ' -' + w.style.top
}

XThumbSelect.moveWindow = function(event, el) {
   var e = event || window.event
   var w = el.lastElementChild
   var height = w.clientHeight
   var width = w.clientWidth
   var max_height = el.clientHeight
   var max_width = el.clientWidth
   
   var p_top = this.p_top
   var p_left = this.p_left
   var offsetX = this.offsetX
   var offsetY = this.offsetY
   
   if (e.clientX - offsetX < p_left) {
      w.style.left = '0px'
   } else if (e.clientX - offsetX - p_left + width > max_width) {
      w.style.left = max_width - width + 'px'
   } else {
      w.style.left = e.clientX - offsetX - p_left + 'px'
   }
   if (e.clientY - offsetY < p_top) {
      w.style.top = '0px'
   } else if (e.clientY - offsetY - p_top + height > max_height) {
      w.style.top = max_height - height + 'px'
   } else {
      w.style.top = e.clientY - offsetY - p_top + 'px'
   }
   w.style.backgroundPosition = '-' + w.style.left + ' -' + w.style.top
}

XThumbSelect.resizeWindow = function(event, el) {
   var e = event || window.event
   var w = el.lastElementChild
   var height = w.clientHeight
   var width = w.clientWidth
   var max_height = document.getElementById('changeArea').clientHeight
   var max_width = document.getElementById('changeArea').clientWidth
   var old_left = w.offsetLeft
   var old_top = w.offsetTop
   var p_top = this.p_top
   var p_left = this.p_left
   
   var w = el.lastElementChild
   
   if (el.parentNode.style.cursor == 'nw-resize') {
      if (Math.abs(e.clientX - p_left - (old_left + width)) < Math.abs(e.clientY - p_top - (old_top + height))) {
         var s = old_top + height - (e.clientY - p_top)
         var size = e.clientY - p_top > 0 && old_left + width - s > 0 ? s : old_left + width < old_top + height ? old_left + width : old_top + height
      } else {
         var s = old_left + width - (e.clientX - p_left)
         var size = e.clientX - p_left > 0 && old_top + height - s > 0 ? s : old_left + width < old_top + height ? old_left + width : old_top + height
      }
      if (size < 50) size = 50

      if (e.clientX < p_left) {
         w.style.left = '0px'
         w.style.width = size + 'px'
         w.style.height = size + 'px'
         w.style.top = old_top + height - size + 'px'
         return
      }
      if (e.clientY < p_top) {
         w.style.top = '0px'
         w.style.height = size + 'px'
         w.style.width = size + 'px'
         w.style.left = old_left + width - size + 'px'
         return
      }
      w.style.left = old_left + width - size + 'px'
      w.style.width = size + 'px'

      w.style.top = old_top + height - size + 'px'
      w.style.height = size + 'px'
   }
   if (el.parentNode.style.cursor == 'ne-resize') {
      if (Math.abs(e.clientX - p_left - old_left) < Math.abs(e.clientY - p_top - (old_top + height))) {
         var s = old_top + height - (e.clientY - p_top)
         var size = e.clientY - p_top > 0 && old_left + s < max_width ? s : max_width - old_left < old_top + height ? max_width - old_left : old_top + height
      } else {
         var s = e.clientX - p_left - old_left
         var size = e.clientX - p_left < max_width && old_top + height - s > 0 ? s : max_width - old_left < old_top + height ? max_width - old_left : old_top + height
      }
      if (size < 50) size = 50
      
      if (e.clientX - p_left > max_width) {
         w.style.width = size + 'px'
         w.style.height = size + 'px'
         w.style.top = old_top + height - size + 'px'
         return
      }
      if (e.clientY < p_top) {
         w.style.top = '0px'
         w.style.height = size + 'px'
         w.style.width = size + 'px'
         w.style.left = old_left + width - size + 'px'
         return
      }
      w.style.width = size + 'px'

      w.style.top = old_top + height - size + 'px'
      w.style.height = size + 'px'
   }
   if (el.parentNode.style.cursor == 'sw-resize') {
      if (Math.abs(e.clientX - p_left - (old_left + width)) < Math.abs(e.clientY - p_top - old_top)) {
         var s = e.clientY - p_top - old_top
         var size = e.clientY - p_top < max_height && old_left + width - s > 0 ? s : old_left + width < max_height - old_top ? old_left + width : max_height - old_top
      } else {
         var s = old_left + width - (e.clientX - p_left)
         var size = e.clientX - p_left > 0 && old_top + s < max_height ? s : old_left + width < max_height - old_top ? old_left + width : max_height - old_top
      }
      if (size < 50) size = 50

      if (e.clientX < p_left) {
         document.getElementById('window').style.left = '0px'
         document.getElementById('window').style.width = size + 'px'
         document.getElementById('window').style.height = size + 'px'
         return
      }
      if (e.clientY - p_top > max_height) {
         document.getElementById('window').style.height = size + 'px'
         document.getElementById('window').style.width = size + 'px'
         document.getElementById('window').style.left = old_left + width - size + 'px'
         return
      }
      document.getElementById('window').style.left = old_left + width - size + 'px'
      document.getElementById('window').style.width = size + 'px'

      document.getElementById('window').style.height = size + 'px'
   }
   if (el.parentNode.style.cursor == 'se-resize') {
      if (Math.abs(e.clientX - p_left - old_left) < Math.abs(e.clientY - p_top - old_top)) {
         var s = e.clientY - p_top - old_top
         var size = e.clientY - p_top < max_height && old_left + s < max_width ? s : max_width - old_left < max_height - old_top ? max_width - old_left : max_height - old_top
      } else {
         var s = e.clientX - p_left - old_left
         var size = e.clientX - p_left < max_width && old_top + s < max_height ? s : max_width - old_left < max_height - old_top ? max_width - old_left : max_height - old_top
      }
      if (size < 50) size = 50

      if (e.clientX - p_left > max_width) {
         w.style.width = size + 'px'
         w.style.height = size + 'px'
         return
      }
      if (e.clientY - p_top > max_height) {
         w.style.height = size + 'px'
         w.style.width = size + 'px'
         return
      }
      w.style.width = size + 'px'

      w.style.height = size + 'px'
   }
   w.style.backgroundPosition = '-' + w.offsetLeft + 'px -' + w.offsetTop + 'px'
}

XThumbSelect.updateCursor = function(event, el) {
   var e = event || window.event
   var w = el.lastElementChild
   var top = w.getBoundingClientRect()['top']
   var left = w.getBoundingClientRect()['left']
   var bottom = top + w.clientHeight
   var right = left + w.clientWidth
   if (Math.abs(e.clientX - left) <= 5 && Math.abs(e.clientY - top) <= 5) {
      el.parentNode.style.cursor = 'nw-resize'
      w.style.cursor = ''
      return
   }
   if (Math.abs(e.clientX - right) <= 5 && Math.abs(e.clientY - top) <= 5) {
      el.parentNode.style.cursor = 'ne-resize'
      w.style.cursor = ''
      return
   }
   if (Math.abs(e.clientX - left) <= 5 && Math.abs(e.clientY - bottom) <= 5) {
      el.parentNode.style.cursor = 'sw-resize'
      w.style.cursor = ''
      return
   }
   if (Math.abs(e.clientX - right) <= 5 && Math.abs(e.clientY - bottom) <= 5) {
      el.parentNode.style.cursor = 'se-resize'
      w.style.cursor = ''
      return
   }
   w.style.cursor = 'move'
   el.parentNode.style.cursor = ''
}

XThumbSelect.init = function(el, img_src) {
   el.innerHTML = '<div class="curtain"></div><div class="rect"></div>'
   el.className += ' thumbselect'
   el.style.background = "url('" + img_src + "') 0px 0px no-repeat"
   el.lastElementChild.style.background = "url('" + img_src + "')"
   el.onmousedown = function(event) {
      XThumbSelect.drag = true
      var e = event || window.event
      var w = el.lastElementChild
      var top = w.getBoundingClientRect()['top']
      var left = w.getBoundingClientRect()['left']
      XThumbSelect.offsetX = e.clientX - left
      XThumbSelect.offsetY = e.clientY - top
      XThumbSelect.p_top = el.getBoundingClientRect()['top']
      XThumbSelect.p_left = el.getBoundingClientRect()['left']
   }
   el.onmousemove = function(event) {
      if (XThumbSelect.drag && this.lastElementChild.style.cursor != 'move') {
         XThumbSelect.resizeWindow(event, this)
         return
      }
      if (XThumbSelect.drag && this.lastElementChild.style.cursor == 'move') {
         XThumbSelect.moveWindow(event, this)
         return
      }

      XThumbSelect.updateCursor(event, this)
   }
   el.onmouseup = function(event) {
      XThumbSelect.drag = false
      XThumbSelect.offsetX = 0
      XThumbSelect.offsetY = 0
   }
}

window.addEventListener('DOMContentLoaded', function() {
   var els = getElementsByClass('xthumbselect', document.body, '*')
   for (var i = 0; i < els.length; i++) {
      els[i].parentNode.addEventListener('mouseup', function(event) {
         this.style.cursor = ''
         XThumbSelect.drag = false
         XThumbSelect.offsetX = 0
         XThumbSelect.offsetY = 0
      })
   }
})

function getElementsByClass(searchClass, node, tag) {
   var classElements = new Array();
   if ( node == null )
      node = document;
   if ( tag == null )
      tag = '*';
   var els = node.getElementsByTagName(tag);
   var elsLen = els.length;

   var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|)");
   for (i = 0, j = 0; i < elsLen; i++) {
      if ( pattern.test(els[i].className) ) {
         classElements[j] = els[i];
         j++;
      }
   }
   return classElements;
}

XThumbSelect.drag = false
XThumbSelect.offsetX = 0
XThumbSelect.offsetY = 0
XThumbSelect.left = 0
XThumbSelect.top = 0
XThumbSelect.p_top = 0
XThumbSelect.p_left = 0

})()