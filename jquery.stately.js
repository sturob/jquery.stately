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
  
  $.fn.stately = function(arg) {
    var $el = this;
    
    if (typeof arg === 'string') {
      arg = arg.split(' ');
    }
    
    if (typeof arg == 'object' && arg.length) { // set up binding for these states
      $el.data('states', arg);
      $el.data('transitions', {});
      
      $el.bind('DONE', function(e) {
        var new_state = $el.data('state');
        
        var to_states = '-' + $el.data('states').join(' -');
        var all_states = $el.data('states').join(' ');
        
        $el.removeClass(to_states + " " + all_states).addClass(new_state); // we are at rest!
        $el.attr('style', '').find('.reset').attr('style', '');
        $el.removeClass('FLUX').addClass('DONE');
        e.stopPropagation();
      });
      
      $.each( $el.data('states'), function(k,v) {
        $el.bind(v, function(foo) {
          
          // if (state == v) return; // catch no change, wtf?
          if ($el.is('.FLUX')) { // bail if another state change is in progress, TODO: switch
            // return;
            $el.trigger('DONE');
          }

          var state = $el.data('state');

          $el.removeClass('DONE').addClass('FLUX -' + v);
          
          var transitions = $el.data('transitions');
          var transition = transitions[state + ' -> ' + v] || 
                           transitions[state + ' -> *'] ||
                           transitions['* -> ' + v] ||
                           transitions['* -> *'];

          $el.data('state', v);

          if (transition && (transition.call($el, [state, v]) === false)) {
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