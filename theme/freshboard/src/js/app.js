var $ = jQuery = require('jquery');
require('velocity-animate');
require('./makisu.js');

$(document).ready(function(){
    var $windowSize = $( window ).width();
    // console.log($windowSize);

    $(".js-items").each(function() {
        var $el = $(this),
            $items = $el.find(".js-item"),
            $infoBlocks = $el.find(".js-info-block"),
            $itemSection = $el.find(".item-section");

            var $toWrap = $itemSection.data("target");

            if ($(window).width() > 768) {
                // console.log('bigger then 768');
            for(var i = 0, l = $items.length; i < l; i += 4) {
                    $($toWrap).slice(i, i+4).wrapAll('<div class="item-wrap"></div>');
                }
            }
                else {
                    for(var i = 0, l = $items.length; i < l; i += 1) {
                            $($toWrap).slice(i, i+1).wrapAll('<div class="item-wrap"></div>');
                        }
                    }


        if(!$items.length) {
            return;
        }

        $items.on( "click", function(e) {
            var $item = $(this),
                $infoBlock = $item.next(".js-info-block"),
                $itemData = $item.data();

                i
                var height = null;
                calculateHeight($itemData.target);
                if ($infoBlock.css("display") == "block") {
                    reset();
                }
                else {
                    reset();
                    openItem();
                    placeTimestamps();
                }


                fillTimeline();


                // functions
                    function reset() {
                        $items.css("opacity","1");
                        $items.removeClass("is-active");
                            $infoBlocks.velocity("slideUp", {
                                duration: 50,
                                delay: 0
                            });
                        $items.parents(".item-wrap").css({
                            marginBottom: 0,
                            paddingBottom: 0
                        });
                        $(".timeline-filled").css('width','0');
                        $(".now, .week, timeline-filled").css("left","0");
                        return;
                    };

                    function calculateHeight($el){
                        height = $($el).height();
                    };

                    function placeTimestamps(){
                        var timelinePosition = $(".now").data("offset") + "%";

                        $(".now").velocity({
                            left: timelinePosition
                        }, { duration: 1500 }, { delay: 500 });

                        $( ".week" ).each(function() {
                            var $el = $(this),
                                elData = $el.data(),
                                percentage = elData.offset + '%';

                            $el.velocity({
                                left: percentage
                            }, { duration: 100 }, { delay: 100 });

                        });
                    }

                    function fillTimeline(){
                        $( ".timeline-filled" ).each(function() {
                            var $percentage = $(this).data('value') + '%';
                            var $left = $(this).data('offset') + '%';
                                $(this).velocity({
                                    width: $percentage,
                                    left: $left
                                }, { duration: 500 }, { delay: 500 });
                            });

                            return;
                        };

                    function openItem(){
                        // check if not already opened
                        if ($infoBlock.css("display") == "none") {

                        $(".js-list-title").parent().makisu( 'open' );
                        //do something with height
                        $item.parents(".item-wrap").css("margin-bottom", height);
                        $item.parents(".item-wrap").css("padding-bottom", "8rem");
                        // add active class
                        $items.css("opacity","0.6");
                        $item.css("opacity","1");
                        $item.addClass("is-active");
                        // open item
                        $infoBlock.velocity("slideDown", {
                            duration: 250,
                            delay: 0
                        });



                        return;
                    };

                        return;
                    };

                    $(".js-close").on("click", function(e) {
                        reset();

                        e.preventDefault();
                        return;
                    });


                    // function scrollTo($target){
                    //     $target.velocity("scroll", { duration: 750, offset: 250 })
                    //
                    //     $target.preventDefault();
                    //     return;
                    // });


                    e.preventDefault();
                    return;
            });

            $(".item-link").on("click", function() {
                var target = $(this).data("target");
                console.log(target);

                $(target).trigger("click");

                return;
            });
    });



    $(".timeline-filled").on("click", function() {
        var $details = $(this).data("target");
        // console.log($details);
        showDate($details);
    });

    function showDate($details){
        if( $($details).css("display") == "none"){
        resetDate();
        $(".timeline-filled").find($details).velocity("slideDown", {
            duration: 50,
            delay: 0
        });
    }
            else {
                resetDate();
            }

        return;
    };

    function resetDate(){
        $(".js-details").velocity("slideUp", {
            duration: 50,
            delay: 0
        });
    };

    // Makisu list
    // The `enabled` flag will be `false` if CSS 3D isn't available
    if ( $.fn.makisu.enabled ) {
        var $maki = $( '.maki' );

        // Create Makisus
        $maki.makisu({
            selector: 'dd',
            overlap: 0.6,
            speed: 0.85
        });

        // Toggle on click
        // $( '.js-list-title' ).on( 'click', function() {
        //     $(this).parent().makisu( 'toggle' );
        // });

        // Disable all links
        $( '.demo a' ).click( function( event ) {
            event.preventDefault();
        });

    }
});
