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
  
  var CSS_RESET = { margin: "", height: "", opacity: "", left: "", top: "", display: "", zIndex: "" }; // todo switch to just clearing the style attribute? need to override sometimes???

  $.fn.stately = function(arg) {
    var $el = this;
    
    if (typeof arg === 'string') {
      arg = arg.split(' ');
    }
    
    if (typeof arg == 'object' && arg.length) { // set up binding for these states
      $el.data('states', arg);
      $el.data('transitions', {});
      
      $el.bind('DONE', function() {
        var new_state = $el.data('state');
        
        var to_states = '-' + $el.data('states').join(' -');
        var all_states = $el.data('states').join(' ');
        
        $el.removeClass(to_states + " " + all_states).addClass(new_state); // we are at rest!
        $el.css(CSS_RESET).find('.reset').css(CSS_RESET); // do this better
        $el.removeClass('FLUX').addClass('DONE');
      });
      
      $.each( $el.data('states'), function(k,v) {
        $el.bind(v, function(foo) {
          
          // if (state == v) return; // catch no change, wtf?
          if ($el.is('.FLUX')) { // bail if another state change is in progress, TODO: switch
            $el.trigger('DONE');
          }

          var state = $el.data('state');
          
          
          // console.log(state + '->' + v);
          
          $el.removeClass('DONE').addClass('FLUX -' + v);
          
          var transitions = $el.data('transitions');
          var transition = transitions[state + ' -> ' + v] || 
                           transitions[state + ' -> *'] ||
                           transitions['* -> ' + v] ||
                           transitions['* -> *'];

          $el.data('state', v);

          if (transition && (transition.call($el) === false)) {
            // let the transition callback trigger DONE
          } else {
            $el.trigger('DONE');
          }
        });
      });
      
      $el.trigger(arg[0]); // set state to first
    } else {
      $el.data('transitions', arg);
    }

    return this;
  };
 
})(jQuery);