function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

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

function tagSelectedText(obj, tag) {

   if (document.selection) {
      var s = document.selection.createRange();
      if (s.text) {
         s.text = '<' + tag + '>' + s.text + '</' + tag + '>';
	 s.select();
	 return true;
      }
   } else if (typeof(obj.selectionStart)=="number") {
      var s = obj.selectionStart;
      var e = obj.selectionEnd;
      var text = obj.value.substr(s,e-s);
         
      text = '<' + tag + '>' + text + '</' + tag + '>';

      obj.value = obj.value.substr(0,s) + text + obj.value.substr(e);
      e += tag.length * 2 + 5;
      obj.setSelectionRange(e,e);
   }
   obj.focus()
   return true;
}

function addEventHandler(obj, e, h) {
   if (document.all) {
      obj.attachEvent('on' + e, h)
   } else {
      obj.addEventListener(e, h, false)
   }
}

function ctrlEnter(event, formElem) {
   if((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))) {
      send();
      return false;
   }
   return true;
}

function enter(event, func) {
   if((event.keyCode == 0xA)||(event.keyCode == 0xD)) {
      func();
   }
}

function getSelectedText() {
   var result = "";
   if (document.getSelection) {
      result = document.getSelection();
   } else if (document.selection) {
      result = document.selection.createRange().text;
   } else if (window.getSelection) {
      result = window.getSelection();
   }
   return result
}

function setCursor(object, pos) {
   if (object.selectionStart) {
     if (pos < 0) pos = object.value.length + pos + 1;
     object.setSelectionRange(pos, pos);
     object.focus();
   }
   if (object.createTextRange) {
      var r = object.createTextRange(pos, pos);
      r.collapse();
   }
}

function addBookmark(url, title) {
   if (document.all) window.external.addFavorite(url, title);
   return false;
}

function highlight(obj, startcolour, endcolour) {
   var steps = 14;
   var element = obj;

   var red_change = (startcolour[0] - endcolour[0]) / steps;
   var green_change = (startcolour[1] - endcolour[1]) / steps;
   var blue_change = (startcolour[2] - endcolour[2]) / steps;

   var currentcolour = startcolour;
   var stepcount = 0;

   setTimeout(function() {

   var timer = setInterval(function(){
      currentcolour[0] = parseInt(currentcolour[0] - red_change);
      currentcolour[1] = parseInt(currentcolour[1] - green_change);
      currentcolour[2] = parseInt(currentcolour[2] - blue_change);
      element.style.backgroundColor = 'rgb(' + currentcolour.toString() + ')';

      stepcount += 1;
      if (stepcount >= steps) {
         element.style.backgroundColor = 'rgb(' + endcolour.toString() + ')';
         clearInterval(timer);
      }
   }, 90);
   }, 2000);
}

function fadeout(obj, step, callback) {
   var t = 1.0
   setTimeout(function() {
      var timer = setInterval(function() {
         t -= step
         setElementOpacity(obj, t)
         if (t <= 0) {
            setElementOpacity(obj, 0)
            clearInterval(timer)
            if (callback) callback()
         }
      }, 30)
   }, 2000)
}

function fade(obj, start, stop, step, delay, callback) {
   var t = start
   if (start == 0) obj.style.display = 'block'
   setTimeout(function() {
      var timer = setInterval(function() {
         t += step
         setElementOpacity(obj, t)
         if ((stop < start) && (t <= stop) || (stop > start) && (t >= stop)) {
            setElementOpacity(obj, stop)
            clearInterval(timer)
            if (stop == 0) obj.style.display = 'none'
            if (callback) callback()
         }
      }, 30)
   }, delay)
}

function setElementOpacity(elem, nOpacity) {
   var opacityProp = getOpacityProperty();

   if (!elem || !opacityProp) return;

   if (opacityProp=="filter") {
      nOpacity *= 100;

      // Если уже установлена прозрачность, то меняем её через коллекцию filters, иначе добавляем прозрачность через style.filter
      var oAlpha = elem.filters['DXImageTransform.Microsoft.alpha'] || elem.filters.alpha;
      if (oAlpha) oAlpha.opacity = nOpacity;
      else elem.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity="+nOpacity+")"; //Для того чтобы не затереть другие фильтры используем "+="
   }
   else // Другие браузеры
      elem.style[opacityProp] = nOpacity;
}

function getOpacityProperty() {
   if (typeof document.body.style.opacity == 'string') // CSS3 compliant (Moz 1.7+, Safari 1.2+, Opera 9)
      return 'opacity';
   else if (typeof document.body.style.MozOpacity == 'string') // Mozilla 1.6 и младше, Firefox 0.8
      return 'MozOpacity';
   else if (typeof document.body.style.KhtmlOpacity == 'string') // Konqueror 3.1, Safari 1.1
      return 'KhtmlOpacity';
   else if (document.body.filters && navigator.appVersion.match(/MSIE ([\d.]+);/)[1]>=5.5) // Internet Exploder 5.5+
      return 'filter';

   return false; //нет прозрачности
}