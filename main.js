;(function(window, undefined) {
    
    var app = [];

    app.tweetsLoaded = false;

    app.init = function() {

      var body, h1, words, i = 1, html = '';

      body = document.querySelector('body');

      h1 = body.querySelector('h1');
      words = h1.innerHTML.split(' ');

      for (word in words) {
          html += '<span class="word word' + i + '">' + words[word] + '</span> ';
          i++;
      }
      h1.innerHTML = html;

      window.setTimeout(function() {
          body.className += ' deploy';
          window.setTimeout(function() {
              body.className += ' deploy2';
          }, 1000);
      }, 1000);

      app.hello();
    }

    app.hello = function() {
        
        $('.next-slide').bind('click', function(e) {
            e.preventDefault();
            
            $('.hello').addClass( 'offscreen-above' );
            $('.twitter')
              .removeClass('offscreen-below')
              .removeClass('offscreen-above')
              .addClass( 'onscreen' );
                
            !app.tweetsLoaded && app.tweets();
        });

        $('.prev-slide').bind('click', function(e) {
            e.preventDefault();
            
            $('.twitter')
              .removeClass( 'onscreen' )
              .addClass( 'offscreen-above' );

            $('.hello')
              .removeClass('offscreen-above')
              .removeClass('offscreen-below')
              .addClass( 'onscreen' );
                
            // app.hello();
        });

    }
    
    app.tweets = function() {

        $.ajax({
          url: "http://localhost:5000/tweets",
          dataType: "jsonp"
        }).done(function ( data ) {
          
          var grid = document.querySelector('.tweets');
          
          var html = '';
          _.each(data, function(row, i) {
              var item = document.createElement('article');
              item.className += 'item item-hidden';

              var tweet = new Tweet(row.text);
              row.text = tweet.parse();

              item.innerHTML  = _.template('<%= text %>', row);
              
              salvattore['append_elements'](grid, [item]);                              
              setTimeout(function() {
                  item.className = 'item'
              }, 100 * i)
          })
          
          $('.slide-loading').addClass('slide-loading-hidden');
          
          app.tweetsLoaded = true;

        });

    }

    window.app = app;

})(window);