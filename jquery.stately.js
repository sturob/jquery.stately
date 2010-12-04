/**
 * jQuery.stately - minimal state machine
 * Copyright (c) 2010 Stuart Robinson - stu(at)sturob(dot)com | http://sturob.com
 * Dual licensed under MIT and GPL.
 * Date: 2/12/2010
 * @author Stuart Robinson
 * @version 0.1.0
 *
 */

 
(function($) {
  
  var CSS_RESET = { height: "", opacity: "", left: "", top: "", display: "" }; // todo switch to just clearing the style attribute? need to override sometimes

  $.fn.stately = function(arg) {
    var $el = this;
    // console.log(this);
    
    if (typeof arg == 'object' && arg.length) { // set up binding for these states
      $el.data('states', arg);
      $el.data('transitions', {});
      
      $el.bind('DONE', function() {
        $el.css(CSS_RESET).find('div').css(CSS_RESET) // do better
        $el.removeClass('FLUX').addClass('DONE');
      });
      
      $.each( $el.data('states'), function(k,v) {
        
        $el.bind(v, function() {
          $el.removeClass('DONE').addClass('FLUX');
          $el.removeClass($el.data('states').join(' '));

          var state = $el.data('state');

          $el.addClass(v);

          var transition = $el.data('transitions')[state + " -> " + v];

          if (transition && transition.call() === false) {
            // console.log("Called " + transition);
          } else {
            $el.trigger('DONE');
          }
          
          $el.data('state', v);
          
        });
      });
      
      $el.trigger(arg[0]);
    } else {
      $el.data('transitions', arg);
    }

    return this;
  };
 
})(jQuery);