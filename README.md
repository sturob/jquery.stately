
# Huh?

jquery.stately is a jquery plugin to ensure interface state consistency.

It allows rapid prototyping without animationed transition, and then the addition of either CSS3 transition animations or jquery.animate(). It cleans up inline style after the animations finish, so you don't have to.


# Basic Example

Just some states to switch between.

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

    <body class="MAIN">

    $('body').trigger('LOGIN');

    <body class="LOGIN">


# Advanced Example

    $('body').stately({
      'LOGIN -> MAIN': function() {
        $('div#login').animate( { opacity: 0 }, 1000, function () {
          $(this).trigger('DONE'); // we're done, so finish up
        }).addClass('reset'); // tells stately to reset inline css when the animation completes
        return false; // this tells stately that we will trigger('DONE')
      }
    });

    $('body').trigger('MAIN');

Before the animation starts:

    <body class="LOGIN DONE">

While the animation takes place:

    <body class="LOGIN MAIN FLUX">

When it has completed:

    <body class="MAIN DONE">

So you can write css rules to be applied *during* transitions:

    .LOGIN.-MAIN div {
      opacity: 0.4;
    }




