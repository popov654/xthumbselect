## xthumbselect

A library for creating area-selection widgets in your web apps

### Usage

1. Include CSS and JS files into the head
2. Create the widget:

```
XThumbSelect.init(element, 'photo.jpg')
```

3. Get the coords of the rectangle when you need them:

```
var coords = XThumbSelect.getWindowCoords(element)
```
