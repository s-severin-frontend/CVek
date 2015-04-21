function c(obj) {
    console.log(obj);
}

(function() {
    

    function navigate() {
        var $pointer = $('.nav_pointer'),
            $active_punkt = $('nav li.active');
        $pointer
                .css({
                    'top': $active_punkt.position().top,
                    'height': $active_punkt.outerHeight(),
                    'left': 0,
                    'opacity': 0
                })
                .animate({
                    'opacity': 1
                }, 500);
        $(document).on('mouseenter', 'nav li', function(e) {
            var top = $(this).position().top,
                height = $(this).outerHeight();
            $pointer.stop().animate({
                'top' : top,
                'height': height
            }, 500);
        });
        $(document).on('mouseleave', 'nav', function(e) {
            $pointer.stop().animate({
                'top': $active_punkt.position().top,
                'height': $active_punkt.outerHeight()
            }, 500);
        });
    } 
    
    function l_tooltip(target_items, name) {
        $(target_items).each(function(i) {        
            $("body").append("<div class='" + name + "' id='" + name + i + "'>" + $(this).attr('title') + "</div>");        
            var tooltip = $("#" + name + i);
            var screen = [];
            var size = [];
            if ($(this).attr("title") != "" && $(this).attr("title") != "undefined") {
                $(this).removeAttr("title").mouseenter(function() {                
                    tooltip.css({
                        opacity: 1,
                        display: "block"    
                    }).stop().animate({
                        'maxHeight': 1000,
                        'maxWidth': 1000
                    }, 300)        
                }).mousemove(function(kmouse) {                
                    screen = {
                        'horizontal': $(window).width() / 2,
                        'vertical': $(window).height() / 2
                    };
                    size = {
                        'width': tooltip.outerWidth(),
                        'height': tooltip.outerHeight()
                    };
                    kmouse.pageX < screen.horizontal ? tooltip.css({left: kmouse.pageX + 15}) : tooltip.css({left: kmouse.pageX - 15 - size.width});
                    kmouse.pageY < screen.vertical ? tooltip.css({top: kmouse.pageY + 15}) : tooltip.css({top: kmouse.pageY - 15 - size.height});
                }).mouseleave(function() {          
                    tooltip.stop().animate({
                        'maxHeight': 0,
                        'maxWidth': 0
                    }, 100, function() {
                        tooltip.css({
                            'display': 'none'
                        });
                    })   
                });        
            }    
        });
    }
    
    function focusInput(){
        $(document).on('focus', 'input', function(e) {
            var self = $(this);
            self.parents('.input_wrapper').addClass('focus');
        });
        $(document).on('blur', 'input', function(e) {
            var self = $(this);
            self.parents('.input_wrapper').removeClass('focus');
        });
    }
    
    function checkInputEmpty(){
        $(document).on('change', 'input', function(e) {
            var self = $(this);
            self.removeClass('no-empty');
            if( self.val() !== "" && ( self.attr('type') == 'text' || self.attr('type') == 'password' ) ){
                self.addClass('no-empty');
            }
        });
    }
    
    function staticPopup(){
        $(document).on('click', '.popup-open', function(e) {
            var name = $(this).attr('data-popup'),
                $popup = $('#' + name);
            $popup.css({
                'display': 'block',
                'opacity': 1
            }).stop().addClass('open').animate({
                'maxHeight': 1000,
                'maxWidth': 1000
            }, 400);
            $(document).bind('click.myEvent', function(e) {
                if ($(e.target).closest( $popup ).length == 0) {
                    closePopUp();
                    $(document).unbind('click.myEvent');
                }
            });
            $(document).on('keydown', function(e) {
                if (e.keyCode === 27) {
                    e.preventDefault();
                    closePopUp();
                    $(document).unbind('keydown');
                }
            });
        });
        function closePopUp(){
            var $popup = $('.popup.open');
            $popup.stop().animate({
                'opacity': 0
            }, 300, function(){
                $popup.removeClass('open')
                        .css({
                            'display': 'block',
                            'maxHeight': 0,
                'maxWidth': 0
                        });
            });
        }
    }
    
    function changeName() {
        var $name = $(".profile_header_name > span");
        $name.replaceWith("<input type='text' value='" + $name.text() + "' />");
        var $input = $(".profile_header_name > input");
        $input.focus();
        $input.on('blur', changeNameSave);
        $(document).on('keydown', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    changeNameSave();
                }
            });
        function changeNameSave(){
            $input.replaceWith("<span>" + $input.val() + "</span>");
            $input.unbind('keydown');
        }
    }
    $(document).on('click', '.ico_change-name', changeName);
    
    
    $(document).ready(function() {
        //Move pointer navigate
        $("nav").size() > 0 ? navigate() : false;
        
        //Custom title
        l_tooltip("[title]", "tooltip");
        
        //Input check empty
        focusInput();
        
        //Input check empty
        checkInputEmpty();
        
        staticPopup();
        
        $("select").each(function(){
            $(this).select2({
                minimumResultsForSearch: 15
            });
        });
        
        
    });

})(this);

