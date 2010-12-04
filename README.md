


  $('body').stately('MAIN LOGIN SIGNUP ABOUT');

body class="MAIN"

  $('body').trigger('LOGIN');

body class="LOGIN"


  $('body').stately({
    'LOGIN->MAIN': function() {
      $('form#login').animate( { opacity: 0 }, 1000, function () {
        $(this).trigger('DONE');
      })
      return false;
    }
  });


