/**
 * jQuery.stately - minimal state machine
 * Copyright (c) 2010 Stuart Robinson - stu(at)sturob(dot)com | http://sturob.com
 * Dual licensed under MIT and GPL.
 * Date: 2/12/2010
 * @author Stuart Robinson
 * @version 0.4.0
 */


// todo:

 
(function($) {
  
  $.fn.state = function(to_state) {
      var $el = $(this[0]),
          current_state = $el.data('state');

      if (typeof to_state === 'string') {
        $el.trigger(to_state);
      } else {
        return current_state;
      }
  }
  
  $.fn.stately = function(arg) {
    var $els = this;
    
    $els.each(function() {
      var $el = $(this);

      if (typeof arg === 'string') {
        arg = arg.split(' ');
      }
    
      if (typeof arg == 'object' && arg.length) { // set up binding for these states
        $el.data('states', arg);
        $el.data('transitions', {});
    
        $.each( $el.data('states'), function(n, to_state) {
          $el.bind(to_state, function(foo) { // gets called on trigger(STATE) - begins transition
  // ------>
    
            var from_state = $el.data('state');
          
            // if (from_state == to_state) return; // catch no change?
          
            if ($el.is('.FLUX')) { // if another state change is in progress, DONE it and queue
              $el.trigger('DONE', function() {
                $el.trigger(to_state);
              });
              return;
            }

            $el.removeClass('DONE').addClass('FLUX -' + to_state);
          
            var transitions = $el.data('transitions');
            var transition = transitions[from_state + ' -> ' + to_state] || 
                             transitions[from_state + ' -> *'] ||
                             transitions['* -> ' + to_state] ||
                             transitions['* -> *'];

  // ------>
            $el.data('state', to_state);

            if (transition && (transition.call($el, [from_state, to_state]) === false)) {
              // let the transition callback trigger DONE
            } else {
              $el.trigger('DONE');
            }
          });
        });
      
        $el.bind('DONE', function(e, f) { // clean up styles + set correct classes - ends trans
  // ------>
          var new_state = $el.data('state');

          var to_states = '-' + $el.data('states').join(' -');
          var all_states = $el.data('states').join(' ');

          $el.removeClass(to_states + " " + all_states).addClass(new_state); // we are at rest!
          $el.removeAttr('style').find('.reset').removeAttr('style');
          // todo clear animations too
          $el.removeClass('FLUX').addClass('DONE');
          e.stopPropagation();

          f && f.call();
        });
      
        $el.trigger(arg[0]); // set state to first
      } else {
        $el.data('transitions', arg);
      }
    });

    return this;
  };
 
})(jQuery);