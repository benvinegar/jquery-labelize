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
    
  $(this).filter(':has(input)').click(jQuery.fn.labelize.labelClickEvent);
  
  var containers = this;
  $('input', this)
    .mouseover(function() {
      $(containers).unbind('click', jQuery.fn.labelize.labelClickEvent);
    })
    .mouseout(function() {
      $(containers).click(jQuery.fn.labelize.labelClickEvent);
  });
    
  return this;
}

jQuery.fn.labelize.labelClickEvent = function() {
  $('input', this).click();
}
