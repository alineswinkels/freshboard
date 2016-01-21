var $ = jQuery = require('jquery');
require('velocity-animate');
require('./makisu.js');

$(document).ready(function(){

    $(".js-items").each(function() {
        var $el = $(this),
            $items = $el.find('.js-item'),
            $itemImg = $el.find('.js-item-img'),
            $infoBlocks = $el.find('.js-info-block'),
            $itemSection = $el.find('.item-section');

            var $toWrap = $itemSection.data("target");

            for(var i = 0, l = $items.length; i < l; i += 4) {
                    $($toWrap).slice(i, i+4).wrapAll('<div class="item-wrap"></div>');
                }

        if(!$items.length) {
            return;
        }

        $items.on( "click", function(e) {
            $(".timeline-filled").css('width','0');
            var $item = $(this),
                $itemData = $item.data();

            console.log($itemData.target);

            // get height of item-open
            var $height = $($itemData.target).height();
            console.log($height);

            // close previous item-open
            $item.parents(".item-wrap").css('margin-bottom', '0');
            $infoBlocks.hide();

            $items.css('opacity','0.6');
            $item.css('opacity','1');

            // remove after element
            $items.removeClass("is-active");

            // add after element to clicked item
            setTimeout(function() {
                $item.addClass("is-active").delay(250);
            }, 200);

            // open item info
            $item.parents(".item-wrap").css('margin-bottom', $height);
            $($itemData.target).velocity("slideDown", {
                duration: 250,
                delay: 0
            });

            // scroll view to target
            $($itemData.target).velocity("scroll", {
                offset: "-250px"
            });

            // fill timeline with percentage
            $( ".timeline-filled" ).each(function( index ) {
                var $percentage = $(this).data('value') + '%';

                $(this).velocity({
                    width: $percentage
                }, { duration: 500 }, { delay: 500 });
            });

            // put fase icons on the right position
            $( ".timeline-view .icon" ).each(function( index ) {
                var $percentage = $(this).data('value') + '%';

                $(this).velocity({
                    left: $percentage
                }, function() {
                  });
            });

            e.preventDefault();
        });

        $(".js-close").on("click", function(e) {
            // close item info
            var $toclose = $(this).data('target');

            $($toclose).velocity("slideUp", {
                duration: 250
            });
            $(this).parents(".item-wrap").css('margin-bottom', '0px');

            // remove after element
            $(this).parents(".item-view").removeClass("is-active");
            $(".js-item").css('opacity','1');
            e.preventDefault();
        });

        $(".item-link").on("click", function(e) {
            // close opened item
            $(this).parents(".item-open").find('.js-close').trigger("click");
            var $url = "." + $(this).data('target') + " img";
            console.log($url);

            //open new item
            setTimeout(function () {
               jQuery($url).trigger('click');
           }, 250);
            e.preventDefault();
        });

        $(".scrollTo-js").on("click", function(e) {
            // scroll view to target
            $(".section-projects").velocity("scroll", {
                duration: 500,
                delay: 0
            });
            // $('html, body').animate({
            //     scrollTop: $(".section-projects").offset().top
            // }, 500);

            e.preventDefault();
        })

    });

    $(".js-personal-link").on("click", function(e) {
        var $list = $(this).data();
        $($list.target).toggle();

        e.preventDefault();
    });

        (function($) {

      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */

      $.fn.visible = function(partial) {

          var $t            = $(this),
              $w            = $(window),
              viewTop       = $w.scrollTop(),
              viewBottom    = viewTop + $w.height(),
              _top          = $t.offset().top,
              _bottom       = _top + $t.height(),
              compareTop    = partial === true ? _bottom : _top,
              compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

      };

    })(jQuery);

    $(window).scroll(function(event) {

      $(".section-projects .item").each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("come-in");
        }
      });

    });

        // The `enabled` flag will be `false` if CSS 3D isn't available

        if ( $.fn.makisu.enabled ) {

            var $maki = $( '.maki' );

            // Create Makisus

            $maki.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.85
            });

            // Open all

            // $( '.list' ).makisu( 'open' );

            // Toggle on click

            $( '.toggle' ).on( 'click', function() {
                $(this).parent().makisu( 'toggle' );
            });

            // Disable all links

            $( '.demo a' ).click( function( event ) {
                event.preventDefault();
            });

        }

});
