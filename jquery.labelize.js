/*
 * jQuery Labelize Plugin (jQuery >= 1.2.2)
 *
 * This work is distributed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright Ben Vinegar [ ben ! benlog dot org ]
 *
 * Usage:
 *
 * $('.myLabel').labelize()
 *
 */

(function($) {
  function labelClickEvent() {
    // remove encompassing event (prevents jQuery recursion error in 1.3.x)
    $(this).unbind('click', labelClickEvent);

    // call .click on owned input
    $input = $(this).find('input');

    if ($input.is(':checked')) {
      $input.removeAttr('checked').change();
    } else {
      $input.attr('checked', 'checked').change();
    }

    // re-apply the event after we're done
    $(this).click(labelClickEvent);
  }

  $.fn.labelize = function(hoverClass) {

    var containers = $(this).filter(':has(input)');

    // Apply cursor attribute and onclick event to containers
    $(containers)
      .css('cursor', 'pointer')
      .click(labelClickEvent);

    // Apply optional hoverClass
    if (typeof hoverClass === 'string') {
      containers
        .mouseover(function() { $(this).addClass(hoverClass) })
        .mouseout (function() { $(this).removeClass(hoverClass) });
    }

    // Remove encompassing label event when hovering over the
    // input element; this makes sure click() events don't fire twice
    $('input', this)
      .mouseover(function() { $(containers).unbind('click', labelClickEvent); })
      .mouseout(function()  { $(containers).click(labelClickEvent); })
      .focus(function()     { $(containers).unbind('click', labelClickEvent); })
      .blur(function()      { $(containers).click(labelClickEvent); })
      .click(function() {
        if ($(this).is('[type=checkbox], [type=radio]') && $.browser.msie) {
          $(this).change();
        }
    });

    return this;
  }

})(jQuery);