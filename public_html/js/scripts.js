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
    
    //Аккордион
    function accordeon(self){
        var acc_block = self.parent('.js-accordeon'),
            acc_body = acc_block.children('.js-accordeon_body');
        var list = acc_body.children().get();
        if( !self.hasClass('active') ){
            $.each($(list), function (i, el) {
                setTimeout(function() {
                    $(el).css({'display': 'block'}).stop().animate({
                        'max-height': 10000,
                        'opacity': 1
                    }, 350);
                }, 30 + (i * 150));
            });
            acc_block.addClass('active');
            acc_body.addClass('active');
            self.addClass('active');
        }else{
            $.each($(list.reverse()), function (i, el) {
                setTimeout(function() {
                    $(el).stop().animate({
                        'max-height': 0,
                        'opacity': 0
                    }, 200, function(){ $(el).css({'display': 'none'}) });
                }, 10 + (i * 100));
            });
            acc_block.removeClass('active');
            acc_body.removeClass('active');
            self.removeClass('active');
        }
        return false;
    };
    
    $(document).on('click', '.city-filtr-inside', function(e){
        var $this = $(this);
        $('.city-filtr-inside.current').removeClass('current');
        $this.addClass('current').find("[type='radio']").prop({'checked': true}).change();
    });
    
    $(document).on('change', '.city-filtr-inside [type="radio"]', function(e){
        var $this = $(this),
            check = $this.prop('checked'),
            $checkboxes = $this.parents('.city-filtr-inside').parent('.js-accordeon').find("[type='checkbox']");
        if ( check ) {
            $checkboxes.prop({'checked': true});
            $('.city-filtr-inside:not(.current)').parent('.js-accordeon').find("[type='checkbox']").prop({'checked': false});
        }else{
            $checkboxes.prop({'checked': false});
        }
    });
    
    $(document).on('click', '.js-accordeon_head', function(e){
        if ($(e.target).closest( $(".no-action") ).length == 0) {
            accordeon( $(this) );
        }
    });
    
    $(document).on('click', '.check-all', function(e){
        var $this = $(this),
            $checkList = $this.parents('.check-list');
        $checkList.find('[type="checkbox"]').each(function(){
            $(this).prop('checked', true);
        });
    });
    
    $(document).on('click', '.menu-toggle', function(e){
        $(this).toggleClass('active');
        $(".menu").toggleClass('active');
    });
    
    function addShift(el){
        var heightPopup = 345;
        var $td = el.parents('td');
        var td_heihgt = $td.height();
        $td.animate({
            'height': heightPopup
        },600);
        var $first_td = el.parents('tr').find('td');
        var $last_td = el.parents('tr').find('td').last();
        var new_coord = [];
        new_coord.top = $first_td.position().top,
        new_coord.left = $first_td.position().left,
        new_coord.right = $last_td.position().left + $last_td.outerWidth(true),
        new_coord.bottom = new_coord.top + heightPopup;
        var $curr_td = el.parents('td');
        var old_coord = [];
        old_coord.top = $curr_td.position().top,
        old_coord.left = $curr_td.position().left,
        old_coord.right = $curr_td.position().left + $curr_td.outerWidth(true),
        old_coord.bottom = old_coord.top + $curr_td.outerHeight(true);
        var $tamplate = $(".edit-work");
        $tamplate.find('select').each(function(){
            $(this).select2('destroy');
        });
        var $popup = $tamplate.clone();
        $popup.appendTo($curr_td)
                .removeClass("template")
                .css({
                    'top': old_coord.top,
                    'left': old_coord.left,
                    'width': old_coord.right - old_coord.left,
                    'height': old_coord.bottom - old_coord.top
                })
                .animate({
                    'opacity': 1
                }, 200)
                .animate({
                    'top': new_coord.top,
                    'left': new_coord.left,
                    'width': new_coord.right - new_coord.left,
                    'height': new_coord.bottom - new_coord.top
                }, 600,function(){
                    
                });
        $popup.find('select').each(function(){
            select($("select"));
        });
        function closeShift(){
            $popup.fadeOut(200, function(){
                $popup.remove();
            });
            $td.animate({
                    'height': td_heihgt
                }, 200);
            return false;
        }
        $(document).on('click', '.edit-work_close', function(){
            closeShift();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) closeShift();
        });
        function resizeShift(){
            new_coord.right = $last_td.position().left + $last_td.outerWidth(true);
            old_coord.right = $curr_td.position().left + $curr_td.outerWidth(true);
            $popup.animate({
                    'width': new_coord.right - new_coord.left
                }, 50);
        }
        $(window).resize(function() {
            resizeShift();
        }).resize();
    }
    
    $(document).on('click', '.add-shift', function(){ addShift($(this)); });
    
    function select(el){
        el.select2({
                minimumResultsForSearch: 15
            }); 
    }
    
    function scheduleToggle(){
        $('.schedule_toggle-view_rail').slider({
            min: 1,
            max: 2,
            range: "min",
            value: 1,
            slide: function(event, ui) {
                $('.schedule_toggle-view span').removeClass('active');
                switch (ui.value) {
                    case 1:
                        $('.schedule_toggle-view .pull-left').addClass('active');
                        toggleCalendar('week');
                        break;
                    case 2:
                        $('.schedule_toggle-view .pull-right').addClass('active');
                        toggleCalendar('day');
                        break;
                    default:
                        return false;
                }
            }
        }); 
    }
    function toggleCalendar(type){
        switch (type) {
                    case "day":
                        $('.schedule_wrapper[data-type="week"]').fadeOut(100, function(){
                            $('.schedule_wrapper[data-type="day"]').fadeIn(300);
                        });
                        break;
                    case 'week':
                        $('.schedule_wrapper[data-type="day"]').fadeOut(100, function(){
                            $('.schedule_wrapper[data-type="week"]').fadeIn(300);
                        });
                        break;
                    default:
                        return false;
                }
    }
    
    $(document).on('click', '.schedule_toggle-view span', function() {
            $('.schedule_toggle-view span').removeClass('active');
            $(this).addClass('active');
            var type = $(this).attr('data-type'),
                $slider = $('.schedule_toggle-view_rail');
            switch (type) {
                case "day":
                    $slider.slider("value", 2);
                    break;
                case "week":
                    $slider.slider("value", 1);
                    break;
                default:
                    return false;
            }
            toggleCalendar( type );
        });
    
    
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
            select( $(this) );
        });
        
        Waves.attach('.input_wrapper');
        Waves.attach('.js-accordeon_head');
        Waves.attach('.wave');
        Waves.init();
        
        if( $('.schedule_toggle-view_rail').size() > 0 ) scheduleToggle();
        
        
        
    });
    
    $(window).load(function() {
        $(".menu_wrapper").mCustomScrollbar();
    });

})(this);

