# Basic Example

## HTML

    <body>
      <div id="main">hello</div>
      <div id="login">login</div>
      <div id="signup">signup</div>
      <div id="about">about</div>
    </body>

## CSS

    body > div { display: none; }
    
    .MAIN #main,
    .LOGIN #login,
    .SIGNUP #signup,
    .ABOUT #about { display: block; }

## Javascript
  
    $('body').stately('MAIN LOGIN SIGNUP ABOUT');

body class="MAIN"

    $('body').trigger('LOGIN');

body class="LOGIN DONE"


# Advanced Example

    $('body').stately({
      'LOGIN -> MAIN': function() {
        $('div#login').animate( { opacity: 0 }, 1000, function () {
          $(this).trigger('DONE');
        }).addClass('reset');
        return false;
      }
    });

    $('body').trigger('MAIN');

While the animation takes place:

&lt;body class="LOGIN -MAIN FLUX"&gt;

When it has completed:

body class="MAIN DONE"

So you can write css rules to be applied *during* transitions:

    .LOGIN.-MAIN div {
      opacity: 0.4;
    }



