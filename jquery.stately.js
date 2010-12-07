/**
 * jQuery.stately - minimal state machine
 * Copyright (c) 2010 Stuart Robinson - stu(at)sturob(dot)com | http://sturob.com
 * Dual licensed under MIT and GPL.
 * Date: 2/12/2010
 * @author Stuart Robinson
 * @version 0.1.0
 */


// todo:

 
(function($) {
  
  var CSS_RESET = { height: "", opacity: "", left: "", top: "", display: "", zIndex: "" }; // todo switch to just clearing the style attribute? need to override sometimes

  $.fn.stately = function(arg) {
    var $el = this;
    
    if (typeof arg === 'string') {
      arg = arg.split(' ');
    }
    
    if (typeof arg == 'object' && arg.length) { // set up binding for these states
      $el.data('states', arg);
      $el.data('transitions', {});
      
      $el.bind('DONE', function() {
        $el.removeClass('FLUX').addClass('DONE');
        $el.css(CSS_RESET).find('div').css(CSS_RESET) // do better
      });
      
      $.each( $el.data('states'), function(k,v) {
        $el.bind(v, function(foo) {
          
          var state = $el.data('state');
          if (state == v) return; // catch no change, wtf?
          if ($el.is('.FLUX')) return; // bail if another state change is in progress, TODO: switch
          
          // console.log(state + '->' + v);
          
          $el.removeClass('DONE').addClass('FLUX');
          $el.removeClass($el.data('states').join(' '));

          $el.addClass(v);

          var transitions = $el.data('transitions');
          var transition = transitions[state + ' -> ' + v] || 
                           transitions[state + ' -> *'] ||
                           transitions['* -> ' + v] ||
                           transitions['* -> *'];

          if (transition && (transition.call($el, [state, v]) === false)) {
            // let the transition callback trigger DONE
          } else {
            $el.trigger('DONE');
          }
          
          $el.data('state', v);
        });
      });
      
      $el.trigger(arg[0]); // set state to first
    } else {
      $el.data('transitions', arg);
    }

    return this;
  };
 
})(jQuery);