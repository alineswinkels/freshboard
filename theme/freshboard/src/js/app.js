var $ = jQuery = require('jquery');
require('velocity-animate');
require('./makisu.js');

$(document).ready(function(){
    // var $windowSize = $( window ).width();
    // console.log($windowSize);
    projectdefault();

    //check which projects are finished
    function projectdefault(){
        $(".item-project").each(function() {
            var percentage = parseInt($(this).data('value'));

            if (percentage > 100) {
                $(this).find(".item-view").addClass("finished");
            }
        });
    };

    // //reset timeline
    // function resetTimeline(){
    //     $(".item-open").each(function() {
    //         $(this).find(".timeline-filled, now").css('width','0');
    //         $(this).find(".week, timeline-filled").css("left","0");
    //     });
    //
    // };

    $(".js-items").each(function() {
        var $el = $(this),
            $items = $el.find(".js-item"),
            $infoBlocks = $el.find(".js-info-block"),
            $itemSection = $el.find(".item-section");

            var toWrap = $itemSection.data("target");

            if ($(window).width() > 768) {

                    for(var i = 0, l = $items.length; i < l; i += 4) {
                            $(toWrap).slice(i, i+4).wrapAll('<div class="item-wrap"></div>');
                        }

                }
                else {
                    for(var i = 0, l = $items.length; i < l; i += 1) {
                            $(toWrap).slice(i, i+1).wrapAll('<div class="item-wrap"></div>');
                        }
                    }

        if(!$items.length) {
            return;
        }

        $items.on( "click", function(e) {
            var $item = $(this),
                $infoBlock = $item.next(".js-info-block"),
                $itemData = $item.data();


                var target = $item.parentsUntil(".item-wrap");
                var height = null;

                //get height of infoblock
                calculateHeight($itemData.target);

                //close items and remove class active
                reset();

                //open new item
                if ($infoBlock.css("display") != "block") {
                    openItem();
                    placeTimestamps();
                    fillTimeline($infoBlock);
                }

                //scroll view
                scrollTo(target, 0);





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

                        $infoBlocks.find(".timeline-filled, now").css('width','0');
                        $infoBlocks.find(".week, timeline-filled").css("left","0");
                        projectdefault();

                        return;
                    };

                    function calculateHeight($el){
                        height = $($el).height();
                    };

                    function scrollTo(target, offset){
                        target.velocity("scroll", {
                            duration: 750,
                            offset: offset
                        });
                    };

                    //personal timeline
                    function placeTimestamps(){
                        var timelinePosition = $(".now").data("offset") + "%";

                        $infoBlock.find(".now").velocity({
                            width: timelinePosition
                        }, { duration: 1500 }, { delay: 500 });

                        $infoBlock.find( ".week" ).each(function() {
                            var $el = $(this),
                                elData = $el.data(),
                                percentage = elData.offset + '%';

                            $el.velocity({
                                left: percentage
                            }, { duration: 100 }, { delay: 100 });

                        });
                    };

                    function fillTimeline($infoBlock){
                        var timelines = $infoBlock.find(".timeline-filled");
                        var projecttime = $infoBlock.find(".timeline-filled-project");
                        var projectpercentage = parseInt(projecttime.data("value"));

                        $(timelines).each(function() {
                            var percentage = $(this).data('value') + '%';
                                var left = $(this).data('offset') + '%';
                                    $(this).velocity({
                                        width: percentage,
                                        left: left
                                    }, { duration: 500 }, { delay: 500 });
                        });

                        if ( projectpercentage > 100 ) {
                            $(projecttime).css("opacity",0.5);
                            $(timelines).each(function() {
                                $(this).css("opacity",0.5);
                            });
                        };

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
                        //close item and remove class active
                        reset();

                        e.preventDefault();
                        return;
                    });

                    e.preventDefault();
                    return;
            });


    });

    $(".scroll-js").on("click", function(e){
        //scroll to projects
        $(".section-projects").velocity("scroll", {
            duration: 750,
            offset: 0
        });
    });

    $(".item-link").on("click", function() {
        //open item
        var $target = $($(this).data("target"));

        $target.next(".js-info-block").hide();
        $target.trigger('click');

        return;
    });

    $(".timeline-filled").on("click", function() {
        //project or fase date details
        var $details = $(this).data("target");
        showDate($details);
    });

    function showDate($details){
        //show project or fase date details
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
        //close project or fase date details
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
