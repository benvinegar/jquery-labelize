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

jQuery.fn.labelize = function(hoverClass) {

  var containers = $(this).filter(':has(input)');
  
  // Apply cursor attribute to containers
  $(containers).css('cursor', 'pointer');
  
  // Apply click event to container
  containers.click(jQuery.fn.labelize.labelClickEvent);
  
  // Apply optional hoverClass
  if (hoverClass) {
    containers
      .mouseover(function() { $(this).addClass(hoverClass) })
      .mouseout (function() { $(this).removeClass(hoverClass) });
  }
  
  // Remove encompassing label event when hovering over the
  // input element; this makes sure click() events don't fire twice
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
