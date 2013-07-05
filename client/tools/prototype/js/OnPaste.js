/**
 */
Prototype.onpaste = function(event) {

  // Return true if maker is editing an input
  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return true
  
  var pastedText = undefined
  
  if (event.clipboardData && event.clipboardData.getData)
    pastedText = event.clipboardData.getData('text/plain')
  
  var type = 'scraps'
  if (pastedText.match(/^\s*\</))
    type = 'html'
  
  if (type === 'scraps')
    Prototype.pasteScraps(pastedText)
  
  else if (type === 'html')
    Prototype.pasteScraps($.htmlToScraps(pastedText))
  
  else if (type === 'css')
    Prototype.pasteCss(pastedText)
  
  // paste image
  
  /*
  var items = event.clipboardData.items
  console.log(JSON.stringify(items)) // will give you the mime types
  for (var i in items) {
    debugger
    var blob = items[0].getAsFile()
    var reader = new FileReader()
    reader.onload = function(event){
      console.log(event.target.result)
      if (Prototype.isScraps(event.target.result))
        Prototype.pasteScraps()
    }
    reader.readAsDataURL(blob)
  }
  */
  
  mixpanel.track('I pasted something')
}

Prototype.pasteScraps = function(pastedText) {

  Prototype.stage.insert(pastedText)
  Prototype.stage.selection.save()
  Prototype.stage.open(Prototype.stage.activePage)
  Prototype.stage.selection.restore()
}
