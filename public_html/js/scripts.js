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
        $(document).on('click', 'nav li', function(e) {
            var top = $(this).position().top,
                height = $(this).outerHeight();
            $pointer.stop().animate({
                'top' : top,
                'height': height
            }, 500);
        });
//        $(document).on('mouseenter', 'nav li', function(e) {
//            var top = $(this).position().top,
//                height = $(this).outerHeight();
//            $pointer.stop().animate({
//                'top' : top,
//                'height': height
//            }, 500);
//        });
//        $(document).on('mouseleave', 'nav', function(e) {
//            $pointer.stop().animate({
//                'top': $active_punkt.position().top,
//                'height': $active_punkt.outerHeight()
//            }, 500);
//        });
    } 
    
    function l_tooltip(target_items, name) {
        $(target_items).each(function(i) {        
            $("body").append("<div class='" + name + "' id='" + name + i + "'>" + $(this).attr('title') + "</div>");        
            var tooltip = $("#" + name + i);
            var screen = [];
            var size = [];
            if ($(this).attr("title") != "" && $(this).attr("title") != "undefined") {
                $(this).removeAttr("title").mouseenter(function() {  
                    tooltip.stop().fadeIn(150);
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
                    kmouse.pageY < screen.vertical ? tooltip.css({top: kmouse.pageY + 14}) : tooltip.css({top: kmouse.pageY - 14 - size.height});
                }).mouseleave(function() {          
                    tooltip.stop().fadeOut(50);
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
    
    function checkInputEmpty(input){
        if( input.hasClass('no-empty') ) input.removeClass('no-empty');
        if (input.val() !== "" && (input.attr('type') == 'text' || input.attr('type') == 'password')) {
            input.addClass('no-empty');
        }
    }
    $(document).on('change', 'input', function(e) {
        var self = $(this);
        checkInputEmpty(self);
    });
    
   
    function staticPopup(){
        $(document).on('click', '.popup-open', function(e) {
            if( $('.popup.open').size() > 0 ) closePopUp();
            var name = $(this).attr('data-popup'),
                $popup = $('#' + name);
            if( !$popup.hasClass('inline-view') ){
                $popup.css({'display': 'block'});
            }else{
                $popup.css({'display': 'inline-block'});
            }  
            $(this).addClass('active');
            $popup.css({
                'opacity': 1
            }).stop().addClass('open').animate({
                'maxHeight': 1000,
                'maxWidth': 1000
            }, 200);
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
            $(document).on('click', '.popup .edited-clear', closePopUp);
            return false;
        });
        function closePopUp(){
            var $popup = $('.popup.open');
            $('.popup-open.active').removeClass('active');
            $popup.stop().animate({
                'opacity': 0,
                'maxHeight': 0,
                'maxWidth': 0
            }, 100, function(){
                $popup.removeClass('open')
                        .css({
                            'display': 'none',
                            'maxHeight': 0,
                            'maxWidth': 0
                        });
            });
        }
    }
    
    function changeName($button) {
        $button.addClass('hidden');
        var $name = $(".profile_header_name > span");
        var old_val = $name.text();
        $name.replaceWith("<input type='text' value='" + old_val + "' data-old='" + old_val + "' />");
        var $input = $(".profile_header_name > input");
        checkInputEmpty($input);
        $input.wrap('<span class="form-group"></span>');
        var $input_wrap = $input.parent('.form-group');
        $input_wrap.append('<label class="form-group_label">Name</label><i class="edited-save"></i><i class="edited-clear"></i>');
        $input.focus();
//        $input.on('blur', changeNameSave);
        $input_wrap.on('click', '.edited-save', changeNameSave);
        $input_wrap.on('click', '.edited-clear', canselSave);
        $(document).on('keydown', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    changeNameSave();
                }
            });
        function changeNameSave(){
            $button.removeClass('hidden');
            $input_wrap.replaceWith("<span>" + $input.val() + "</span>");
            $input.unbind('keydown');
        }
        function canselSave(){
            $button.removeClass('hidden');
            $input_wrap.replaceWith("<span>" + $input.data('old') + "</span>");
            $input.unbind('keydown');
        }
    }
    $(document).on('click', '.ico_change-name', function(){ changeName($(this)); });
    
    //Аккордион
    function accordeon(self){
        var acc_block = self.parent('.js-accordeon'),
            acc_body = acc_block.children('.js-accordeon_body');
        if( self.hasClass('away-parent') ){
            acc_block = self.parents('.js-accordeon');
            acc_body = acc_block.find('.js-accordeon_body');
        }
        if( self.parents('.company_locations_city').size() > 0 ){
            if( self.hasClass('from-smap') ){
                self.removeClass('from-smap')
            }else{
                acc_block.find('.company_show-map').addClass('from-accordeon').click();
            }
        }
        var list = acc_body.children().get();
        if( !self.hasClass('active') ){
            $.each($(list), function (i, el) {
                setTimeout(function() {
                    $(el).css({'display': 'table-cell'}).stop().animate({
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
        $this.toggleClass('active');
        var check = false;
        if( $this.hasClass('active') ) check = true;
        $checkList.find('[type="checkbox"]').each(function(){
            $(this).prop('checked', check);
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
        },350);
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
        $popup.children().css({'opacity': 0});
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
                }, 50)
                .animate({
                    'top': new_coord.top,
                    'left': new_coord.left,
                    'width': new_coord.right - new_coord.left,
                    'height': new_coord.bottom - new_coord.top
                }, 300,function(){
                    $popup.children().animate({'opacity': 1},50);
                });
        $popup.find('select').each(function(){
            select($("select"));
        });
        $(document).off("mouseenter", '[data-type="week"] td');
        $(document).off("mouseleave", '[data-type="week"] td');

        function closeShift(){
            $popup.fadeOut(100, function(){
                $popup.remove();
            });
            $td.animate({
                    'height': td_heihgt
                }, 100);
            $(document).on("mouseenter", '[data-type="week"] td', function(){ actionCell( $(this) ); } );
            $(document).on("mouseleave", '[data-type="week"] td', function(){ revertCell( $(this) ); } );
            return false;
        }
        $(document).on('click', '.edit-work_close', function(){
            closeShift();
            return false;
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
    
    $(document).on('click', '.add-shift, .edit-shift', function(){ 
        var $el = $(this);
        addShift( $el ); 
        setTimeout( revertCell( $el.parents('td') ), 200 );
    });
    
    function select(el){
        if( el.hasClass('select-color') ){
            function formatColor(option) {
                c('color');
                if (!option.id) {
                    return option.text;
                }
                var $state = $(
                        '<span class="select2-results__option_color ' + option.element.value + '">' + option.text + '</span>'
                        );
                return $state;
            }
            ;

            $(".select-color").select2({
                templateResult: formatColor,
                templateSelection: formatColor,
                minimumResultsForSearch: 15
            });
        }else{
            el.select2({
                minimumResultsForSearch: 15
            }); 
        }
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
    
    function actionCell(cell){
//        if( cell.parents('.schedule_vacancy').size() > 0 ) return false;
        if( !cell.children().size() > 0 ){
            cell.append('<button class="wave add-shift"></button>');
        }else{
            cell.children().addClass('hidden');
            cell.append('<button class="wave add-shift"></button><button class="wave edit-shift"></button><button class="wave remove-shift"></button>');
        }
        var cell_styling = {
            "text-align": "center",
            "vertical-align": "middle",
            "background": "#03a9f4"
        };
        cell.css(cell_styling);
    }
    function revertCell(cell){
        var cell_styling = {
            "text-align": "",
            "vertical-align": "",
            "background": ""
        }
        cell.css(cell_styling);
        cell.find('.add-shift, .edit-shift, .remove-shift').remove();
        cell.find('.hidden').removeClass('hidden');
    }
    $(document).on('mouseenter', '[data-type="week"] td', function(){
        actionCell( $(this) );
    });
    $(document).on('mouseleave', '[data-type="week"] td', function(){
        revertCell( $(this) );
    });
    
    function removeCell(cell){
        c('remove');
        cell.children().remove();
        var cell_styling = {
            "text-align": "left",
            "vertical-align": "top",
            "background": ""
        }
        cell.css(cell_styling).removeClass();
    }
    $(document).on('click', '.remove-shift', function() {
        removeCell($(this).parents('td'));
    });

    //Maps
    function addMap(el, mapOptions, offses) {
        var map;
        function init() {
            var mapElement = el[0];
            map = new google.maps.Map(mapElement, mapOptions);
            setMarkers(map, offses);
        }

        var markers = [];
        function setMarkers(map, locations) {
            var image = new google.maps.MarkerImage('img/pointer.png',
                    new google.maps.Size(20, 28));
            for (var i = 0; i < locations.length; i++) {
                var office = locations[i];
                var myLatLng = new google.maps.LatLng(office[1], office[2]);
                markers[i] = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    title: office[0],
                    zIndex: office[3]
                });
                google.maps.event.addListener(markers[i], 'click', function(innerKey) {
                    return function() {
                        c(markers[innerKey].getPosition().lng().toFixed(5));
                        var lat = markers[innerKey].getPosition().lat().toFixed(6),
                                lng = markers[innerKey].getPosition().lng().toFixed(6);
                        var $address = $('[data-lat*="' + lat + '"][data-lng*="' + lng + '"]');
                        $address.parents('ul').find('.company_locations_child_address.active').removeClass('active');
                        $address.addClass('active');
                    };
                }(i));
            }
        }
        init();

        var $location = el.parents('tbody');
        $($location).on('click', '.company_locations_child_address', function() {
            c('mapppps');
            var lat = $(this).attr("data-lat"),
                    lng = $(this).attr("data-lng");
            var laLatLng = new google.maps.LatLng(lat, lng);
            map.panTo(laLatLng);
            $(this).parents('ul').find('.company_locations_child_address.active').removeClass('active');
            $(this).addClass('active');
        });

    }
    ;

    $(document).on('click', '.company_show-map', function() {
        var $el = $(this).parent('.company_map-wrapper').find('.company_map');
        
        //acc_block.find('.company_show-map').addClass('from-accordeon').click();
        if( $(this).hasClass('from-accordeon') ){
            $(this).removeClass('from-accordeon')
        }else{
            $(this).parents('tbody').find('.js-accordeon_head').addClass('from-smap').click();
        }
        
        if( !$(this).hasClass('active') ){
            $(this).addClass('active');
            if( !$el.hasClass('map-create') ) {
                $el.addClass('map-create').slideDown(100, function() {
                    var mapOptions = {
                        zoom: 16,
                        scrollwheel: false,
                        center: new google.maps.LatLng(53.945550, 27.682683)
                    };

                    var offses = [
                        ['Office colorado', 53.945550, 27.682683, 1],
                        ['Office east', 53.945132, 27.689475, 1],
                        ['General office', 53.945932, 27.689115, 1]
                    ];
                    addMap($el, mapOptions, offses);
                });
            }else{
                $el.slideDown(100);
            }
        }else{
            $(this).removeClass('active');
            $el.slideUp(50);
        }
        return false;
    });
    
    $(document).on('click', '.company_locations_child_action .ico_remove-gray', function() {
        var $remove = $(this),
            popup = '<span class="remove-popup"><button class="close_remove-popup"></button><span>Are you sure?</span><button class="ok_remove-popup"></button></span>';
        $remove.addClass('active').after( popup );
        var $popup = $remove.next('.remove-popup');
        function canselPopup(){
            $remove.removeClass('active');
            $popup.fadeOut(200, function(){ $popup.remove(); });
        }
        $popup.on('click', '.close_remove-popup', function(){
            canselPopup();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) canselPopup();
        });
        $popup.on('click', '.ok_remove-popup', function(){
            $remove.parents('li').remove();
        });
    });
    
    function renameLocation( $button ) {
        var $location = $button.parents('.company_locations_city'),
            $name = $location.find('em'),
            placeholder = $name.data('placeholder');
        $location.find('.company_locations_city_counter').addClass('hidden');
        $name.replaceWith("<input type='text' value='" + $name.text() + "' />");
        var $input = $location.find("input");
        $input.wrap('<div class="form-group"></div>');
        var $inp_wrap = $input.parent('.form-group');
        checkInputEmpty($input);
        $input.after("<label class='form-group_label'>" + placeholder + "</label>");
        $inp_wrap.append('<i class="edited-save"></i><i class="edited-clear"></i>');
        $input.focus();
//        $input.on('blur', renameLocationSave);
        $inp_wrap.on('click', '.edited-save', renameLocationSave);
        $(document).on('keydown', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    renameLocationSave();
                }
            });
        function renameLocationSave(){
            $input.next("label").remove();
            $inp_wrap.replaceWith("<em>" + $input.val() + "</em>");
            $location.find('.company_locations_city_counter').removeClass('hidden');
            $input.unbind('keydown');
        }
    }
    $(document).on('click', '.company_locations_city .ico_change-gray', function(){
        renameLocation( $(this) );
    });
    
    function renameAddress( $button ) {
        var $address = $button.parents('li'),
            $name = $address.find('em'),
            placeholder = $name.data('placeholder');
        $address.find('.ico_small-pointer').addClass('hidden');
        var old_val = $name.text();
        $name.replaceWith("<input type='text' value='" + old_val + "' data-old='" + old_val + "' />");
        var $input = $address.find("input");
        $input.wrap('<div class="form-group smaller"></div>');
        var $inp_wrap = $input.parent('.form-group');
        checkInputEmpty($input);
        $input.after("<label class='form-group_label'>" + placeholder + "</label>");
        $inp_wrap.append('<i class="edited-save"></i><i class="edited-clear"></i>');
        $input.focus();
//        $input.on('blur', renameAddressSave);
        $inp_wrap.on('click', '.edited-save', renameAddressSave);
        $inp_wrap.on('click', '.edited-clear', canselSave);
        $(document).on('keydown', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    renameAddressSave();
                }
            });
        function renameAddressSave(){
            $input.next("label").remove();
            $inp_wrap.replaceWith("<em data-placeholder='Address'>" + $input.val() + "</em>");
            $address.find('.ico_small-pointer').removeClass('hidden');
            $input.unbind('keydown');
        }
        function canselSave(){
            $input.next("label").remove();
            $inp_wrap.replaceWith("<em data-placeholder='Address'>" + $input.data('old') + "</em>");
            $address.find('.ico_small-pointer').removeClass('hidden');
            $input.unbind('keydown');
        }
    }
    $(document).on('click', '.company_locations_child_action .ico_edit-gray', function(){
        renameAddress( $(this) );
    });
    
    function positionEdit( $button ) {
        var select_html = '<div class="company_position_color_select">\
                        <label>Select Color</label>\
                            <div class="select-wrapper">\
                                <select class="select-color" aria-hidden="true">\
                                    <option value="color-0e8db0">&nbsp;</option>\
                                    <option value="color-1c72a3">&nbsp;</option>\
                                    <option value="color-0e6f76">&nbsp;</option>\
                                    <option value="color-147063">&nbsp;</option>\
                                    <option value="color-3da081">&nbsp;</option>\
                                    <option value="color-ed7425">&nbsp;</option>\
                                    <option value="color-e84a1d">&nbsp;</option>\
                                    <option value="color-8e410d">&nbsp;</option>\
                                    <option value="color-8e3db8">&nbsp;</option>\
                                    <option value="color-e16764">&nbsp;</option>\
                                </select>\
                            </div>\
                        </div>';
        var $position = $button.parents('tr'),
            $name = $position.find('.company_position_name');
        $position.find('.ico_remove-gray, .company_position_edit').addClass('hidden');
        var old_val = $name.text();
        $name.replaceWith("<input type='text' value='" + old_val + "' data-old='" + old_val + "' />");
        var $input = $position.find("input[type='text']");
        $input.wrap('<div class="form-group smaller"></div>');
        var $input_wrap = $input.parent('.form-group');
        checkInputEmpty($input);
        $input.after('<label>Position</label><i class="edited-save"></i><i class="edited-clear"></i>');
        var $color = $position.find('.company_position_color'),
            color = $color.attr('data-color');
        $color.hide().after( select_html );
        var $select = $position.find('select');
        $select.find('[value=' + color + ']').attr('selected','selected');
        select($select);
        $(document).on('click', '.company_positions .edited-save', positionEditSave);
        $(document).on('click', '.company_positions .edited-clear', positionCanselSave);
        $input.focus();
        function positionEditSave(){
            $position.find('.ico_remove-gray, .company_position_edit').removeClass('hidden');
            //$input.next("label").remove();
            $input_wrap.replaceWith("<span class='company_position_name'>" + $input.val() + "</span>");
            color = $select.val();
            $color.removeClassWild("color-*").addClass(color).attr('data-color', color).show().nextAll('div').remove();
        }
        function positionCanselSave(){
            $position.find('.ico_remove-gray, .company_position_edit').removeClass('hidden');
            $input_wrap.replaceWith("<span class='company_position_name'>" + $input.data('old') + "</span>");
            color = $select.val();
            $color.removeClassWild("color-*").addClass(color).attr('data-color', color).show().nextAll('div').remove();
        }
    }
    $(document).on('click', '.company_position_edit', function(){
        positionEdit( $(this) );
    });
    
    $(document).on('click', '.company_position_remove', function() {
        var $remove = $(this),
            popup = '<span class="remove-popup"><button class="close_remove-popup"></button><span>Are you sure?</span><button class="ok_remove-popup"></button></span>';
        $remove.addClass('active').after( popup );
        var $popup = $remove.next('.remove-popup');
        function canselPopup(){
            $remove.removeClass('active');
            $popup.fadeOut(50, function(){ $popup.remove(); });
        }
        $popup.on('click', '.close_remove-popup', function(){
            canselPopup();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) canselPopup();
        });
        $popup.on('click', '.ok_remove-popup', function(){
            $remove.parents('tr').remove();
        });
    });
    
    $(document).on('change', '.check-all_checkboxes', function(){
        var $this = $(this),
            $checkList = $this.parents('.check-all_checkboxes_parent'),
            $checkboxes = $checkList.find('tbody [type="checkbox"]');
        if( $this.prop('checked') ){
            $checkboxes.each(function(){
                $(this).prop('checked', true);
            });
        }else{
            $checkboxes.each(function(){
                $(this).prop('checked', false);
            });
            $checkboxes.unbind('change');
        }
        $checkboxes.on('change', function(){
            if( $checkList.find('[type="checkbox"]:not(:checked)') && $this.prop('checked') ){
                $this.prop('checked', false);
            }
        });
        
    });
    
    $(document).on('click', '.js-tabs_head > *', function(){
        if( !$(this).hasClass('active') ){
            var $tab_head = $(this),
                $tab_wrapper = $tab_head.parents('.js-tabs'),
                tab_type = $tab_head.attr('data-tab');
            $tab_wrapper.find('.js-tabs_head > .active').removeClass('active');
            $tab_head.addClass('active');
            $tab_wrapper.find('.js-tabs_body.active').removeClass('active');
            $tab_wrapper.find('.js-tabs_body[data-tab="' + tab_type + '"]').addClass('active');
        }
        return false;
    });
    
    function empoloyeAvailible( trigger ){
        var $line = trigger.parents('tr').next();
        if( !trigger.hasClass('active') ){
            trigger.addClass('active');
            $line.find('.inner-info[data-type="employees_schedule"]').stop().slideDown(200);
        }else{
            trigger.removeClass('active');
            $line.find('.inner-info[data-type="employees_schedule"]').stop().slideUp(50);
        }
        return false;
    };
    $(document).on('click', '.company_employees_schedule_open', function(){ empoloyeAvailible( $(this) ); });
    
    function empoloyeSchedule( trigger ){
        var $line = trigger.parents('tr').next();
        if( !trigger.hasClass('active') ){
            trigger.addClass('active');
            $line.find('.inner-info[data-type="employees_capability"]').stop().slideDown(200);
        }else{
            trigger.removeClass('active');
            $line.find('.inner-info[data-type="employees_capability"]').stop().slideUp(50);
        }
        return false;
    };
    $(document).on('click', '.company_employees_available_open', function(){ empoloyeSchedule( $(this) ); });
    
    function empoloyeEdit( trigger ){
        var $line = trigger.parents('tr').next();
//        if( !trigger.hasClass('active') ){
//            trigger.addClass('active');
//            $line.find('.inner-info[data-type="employees_profile"]').stop().slideDown(200);
//        }else{
//            trigger.removeClass('active');
//            $line.find('.inner-info[data-type="employees_profile"]').stop().slideUp(50);
//        }
        trigger.addClass('hidden').after('<i class="edited-save company_employees_save"></i>');
        $line.find('.inner-info[data-type="employees_profile"]').stop().slideDown(200);
        $(document).on('click', '.employees_profile_close', function(){
            $(this).parents('tr').prev().find('.company_employees_edit').removeClass('hidden').next('.company_employees_save').remove();
            $(this).parents('.inner-info').stop().slideUp(50);
            $('.employees_profile_close').unbind('click');
            return false;
        });
        $(document).on('click', '.company_employees_save', function(){
            $(this).prev('.company_employees_edit').removeClass('hidden');
            $(this).parents('tr').next().find('.inner-info[data-type="employees_profile"]').stop().slideUp(50);
            $(this).remove();
            $('.company_employees_save').unbind('click');
            return false;
        });
        return false;
    };
    $(document).on('click', '.company_employees_edit', function(){ empoloyeEdit( $(this) ); });
    
    function duplicateInput(input){
        var $wrapper = input.parents('.duplicate-wrapper');
        var $clone = $wrapper.clone().addClass('clone');
        $clone.find('input').val('');
        cloockpiker($clone.find('input'));
        $wrapper.after( $clone );
        
    }
    $(document).on('change, blur', '.duplicate', function(){
        var input = $(this);
        var complete = true;
        input.parents('.duplicate-wrapper').find('.duplicate').each(function(){
            if ($(this).val() == "") complete = false;
        });
        if(complete) duplicateInput(input);
    });
    
    function addAvailibly($field){
        var $block = $field.next('.add-availabily');
        if( $block.hasClass('active') ){
            hideAddAvailibly();
        }else{
            $block.stop().slideDown().addClass('active');
        }
        $(document).on('click', '.add-availabily.active .button-ok', function() {
            hideAddAvailibly();
            $(document).unbind('click', '.add-availabily.active .button-ok');
            return false;
        });
    }
    function hideAddAvailibly(){
        var $block = $('.add-availabily.active');
        $block.stop().slideUp().removeClass('active');
    }
    $(document).on('click', '.availabily-wrapper', function(){ 
        addAvailibly($(this));
    });
    
    function cloockpiker( $input ){
        $input.clockpicker({
                donetext: '<i></i>'
//                init: function() {
//                    console.log("colorpicker initiated");
//                },
//                beforeShow: function() {
//                    console.log("before show");
//                },
//                afterShow: function() {
//                    console.log("after show");
//                },
//                beforeHide: function() {
//                    console.log("before hide");
//                },
//                afterHide: function() {
//                    console.log("after hide");
//                }
//                beforeHourSelect: function() {
//                    console.log("before hour selected");
//                },
//                afterHourSelect: function() {
//                    console.log("after hour selected");
//                },
//                beforeDone: function() {
//                    console.log("before done");
//                },
//                afterDone: function() {
//                    console.log("after done");
//                }
            });
    }
    
    function addingRow( $table ){
        c('11111');
        var $first_line = $table.find('.added-row').first();
        if( $first_line.find('select').size() > 0 ) $first_line.find('select').select2("destroy");
        var $clone = $first_line.clone();
        $first_line.before($clone);
        $clone.css({
            'display': 'table-row'
        });
        var $select = $clone.find('select');
        select($select);
    }
    function addingRowRemove( $row ){
        $row.remove();
    }
    $(document).on('click', '.add-row', function(){
        addingRow( $('.added-table') );
        return false;
    });
    $(document).on('click', '.adder-row_remove', function(){
        addingRowRemove( $(this).parents('.added-row') );
        return false;
    });
            
    
    $(document).ready(function() {
        //Move pointer navigate
        $("nav").size() > 0 ? navigate() : false;
        
        //Custom title
        l_tooltip("[title]", "tooltip");
        
        //Input check empty
        focusInput();
        
        //Input check empty
        $('input').each(function(){
            checkInputEmpty($(this));
        });
        
        staticPopup();
        
        $("select").each(function(){
            select( $(this) );
        });
        
//        Waves.attach('.input_wrapper');
//        Waves.attach('.js-accordeon_head');
        Waves.attach('.wave');
        Waves.init();
        
        if( $('.schedule_toggle-view_rail').size() > 0 ) scheduleToggle();
        
        if( $('.timepicker').size() > 0 ){
            cloockpiker($('.timepicker'));
        }
        if( $('.loading').size() > 0) {
            preloader = new $.materialPreloader({
                position: 'top',
                height: '5px',
                col_1: '#12668e',
                col_2: '#2678a0',
                col_3: '#3d9ac7',
                col_4: '#03a9f4',
                fadeIn: 200,
                fadeOut: 200
            });
            preloader.on();
        }
        
    });
    
    $(window).load(function() {
        if( $(".menu_wrapper").size() > 0 ) $(".menu_wrapper").mCustomScrollbar();
    });

})(this);

(function($) {
    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})(jQuery);

(function($) {
    
})(jQuery);

