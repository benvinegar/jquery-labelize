/*
 * jQuery Labelize Plugin (jQuery >= 1.2.6)
 * 
 * This work is distributed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2008, Ben Vinegar [ ben ! benlog dot org ]
 * 
 * Usage:
 * 
 *   $('.myLabel').labelize()
 *   
 */
jQuery.fn.labelize = function() {
  
  /* Apply cursor attribute to containers */
  $(this).css('cursor', 'pointer');
  
  /* Checkboxes */
  if (!$.browser.msie) { /* For all browsers but IE */
    var labelClickEvent = function() {
      var checkbox = $('input', this);
      var isChecked = !!checkbox.attr('checked');
      
      if (isChecked) checkbox.removeAttr('checked');
      else           checkbox.attr('checked', true);
      $(checkbox).triggerHandler('change');
    }
    
    $(this).filter(':has(input[type=checkbox])').click(labelClickEvent);
  
    var containers = this;
    $('input[type=checkbox]', this)
      .click(function() {
        $(containers).unbind('click', labelClickEvent);
      })
      .mouseout(function() { 
        $(containers).click(labelClickEvent);
    });
    
  } else {
    $(this).filter(':has(input[type=checkbox])').click(function() {
      var checkbox = $('input', this);
      $(checkbox).click();
      $(checkbox).triggerHandler('change');
    });
  }
  
  /* Radio Buttons */
  $(this).filter(':has(input[type=radio])').click(function() {
    $('input[name="' + $(this).attr('name') + '"]').removeAttr('checked');
    $('input', this).attr('checked', true);
  });
  
}