/*
* jQuery Labelize Plugin (jQuery >= 1.2.2)
*
* This work is distributed under the MIT License:
* http://www.opensource.org/licenses/mit-license.php
*
* Copyright 2008, Ben Vinegar [ ben ! benlog dot org ]
*
* Usage:
*
* $('.myLabel').labelize()
*
*/
jQuery.fn.labelize = function() {
  
  /* Apply cursor attribute to containers */
  $(this).css('cursor', 'pointer');
  
  /* Checkboxes */
  var labelClickEvent = function() {

    var checkbox = $('input', this);
    checkbox.click();
  }
    
  $(this).filter(':has(input[type=checkbox])').click(labelClickEvent);
  
  var containers = this;
  $('input[type=checkbox]', this)
    .mouseover(function() {
      $(containers).unbind('click', labelClickEvent);
    })
    .mouseout(function() {
      $(containers).click(labelClickEvent);
  });
    
  /* Radio Buttons */
  $(this).filter(':has(input[type=radio])').click(function() {
    $('input[name="' + $(this).attr('name') + '"]').removeAttr('checked');
    $('input', this).attr('checked', true);
  });
  return this;
}