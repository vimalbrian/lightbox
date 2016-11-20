/*
 * @author vimal.baltharaj
 * Responsive Lightbox plugin 1.0
 */

//Variables
var opacity_out = 1.0;
var opacity_over = 0.3;
var bg_color = '#444444';
var fadeIn_speed = 500;
var slideDown_speed = 300;

var image_href = "";
var image_title = "";
var image_total = 0;
var image_curr = 0;
var curr_elem = "";
var prev_width = $(window).width();
var prev_height = $(window).height();

(function($){
	//Begin lightbox
	$.fn.lightbox = function(){
		
		var this_sel = $(this);
		
		//Begin hover effects
        this_sel.find('a').hover(function(){
            this_sel.find('img').css({
                'opacity': opacity_over,
                'filter': 'alpha(opacity=' +opacity_over*100+ ')'
            });
            
            $(this).children().css({
                'opacity': opacity_out,
                'filter': 'alpha(opacity=' +opacity_out*100+ ')'
            });
            
        }, function(){
           this_sel.find('img').css({
                'opacity': opacity_out,
                'filter': opacity_out
            });
        });
		//End hover effects
		
		//Begin click event
		this_sel.find('a').click(function(e){
			e.preventDefault();
			
            curr_elem = $(this).parent();
            image_href = $(this).attr("href");
            image_title = $(this).attr("title");
            image_total = $(this).parent().parent().children().length;
            image_curr = $(this).parent().index() + 1;
			
            if ($('#lightbox').length > 0) {
                getImage();
            }
            else {
		//Initialize lightbox
                var lightbox = '<div id="lightbox">' + '<div id="lightbox_content">' + '<img id="lightbox_image" src="' + image_href + '" />' + '<div class="caption"><p><b>' + image_title + '</b></p><p class="img_num">Images ' + image_curr + " of " + image_total + "</p></div>" + "</div>" + '<div id="close_btn"><img src="assets/images/close_button.png"/></div><div id="prev_btn"><img src="assets/images/prev_btn.png"/></div><div id="next_btn"><img src="assets/images/next_btn.png"/></div><div id="lightbox_preloader"><img src="assets/images/preloader.gif"/></div>' + "</div>";
                
                $('#lightbox_content').hide();
                $('body').append(lightbox);
                
                preloader();
            }
			
		});
		//End click event
		
		$('body').on('click', '#lightbox_content, #lightbox_nav', function(){
			return(false);
        });
		
		//Previous image
        $('body').on('click', '#prev_btn', function(e){
        	e.stopPropagation();
            get_prev_img();
        });
		
        //Next image
        $('body').on('click', '#next_btn', function(e){
        	e.stopPropagation();
            get_next_img();
        });
		
		$('body').on('click', '#lightbox, #close_btn', function(){
            $('#lightbox').hide();
            $('#lightbox_preloader').hide();
            $('body').unbind('keydown');
        });
        
		//Keep the lightbox image in the middle of the screen even on window resize
        $(window).resize(function(){
			img_resizer();
            $('#lightbox_content').css('margin-top', ($(window).height() / 2) - ($('#lightbox_content').height() / 2) + 'px');
        });
	
	}
	//End lightbox
	
	//Begin preloader function
    function preloader(){
		//Show the preloader when the image is being loaded
		$('#lightbox_content').hide();
        $('#lightbox_preloader').show();
        $('#lightbox_content').css('background-color', '');
		
		//Begin image load function
        $('#lightbox_image').load(function(){
            //Loading...
        }, function(){
            //Complete!
			//Hide preloader after the image loads
            $('#lightbox_preloader').hide();
			
			img_resizer();
			
            $('#lightbox_content').css('background-color', bg_color);
            $('#lightbox_content').css('margin-top', ($(window).height() / 2) - ($('#lightbox_content').height() / 2) - 30 + 'px');
			
			$('#lightbox_content').fadeIn(fadeIn_speed, function(){
				$('#lightbox_content .caption').slideDown(slideDown_speed);
			});
        });
		//End image load function
		
		//Begin keyboard navigation
            $('body').bind('keydown', function(e){
                //Stop event bubbling
				$('#lightbox_preloader').hide();
                e.stopImmediatePropagation();
                
                if (e.which == 39) { //Right arrow
					get_next_img();
				}
				else if (e.which == 37) { //Left arrow
					get_prev_img();
				}
				else {
					//Do nothing
				}
            });
			//End keyboard navigation
    }
	//End preloader function
	
	//Get previous image
    function get_prev_img(){
        if (curr_elem.prev().length) {
            curr_elem = curr_elem.prev();
        }
        else {
            curr_elem = curr_elem.parent().children(':last-child');
        }
        getImage();
    }
	
    //Get next image
    function get_next_img(){
        if (curr_elem.next().length) {
            curr_elem = curr_elem.next();
        }
        else {
            curr_elem = curr_elem.parent().children(':first-child');
        }
        getImage();
    }
	
	//Get Image
    function getImage(){
		image_href = curr_elem.children().attr("href");
        image_title = curr_elem.children().attr("title");
        image_curr = curr_elem.index() + 1;
		
        $('#lightbox_content').html('<img id="lightbox_image" src="' + image_href + '" /></div><div class="caption"><p><b>' + image_title + '</b></p><p class="img_num">Images ' + image_curr + ' of ' + image_total + '</p></div>');
		$('#lightbox').fadeIn(fadeIn_speed);
        preloader();
    }
	
	//Image resizer
	function img_resizer(){
		/*$('#lightbox_content').width($(window).width()-50);
		
		if($('#lightbox_content').height()>$(window).height()){
			$('#lightbox_content').width($(window).height()-($('#lightbox_content').height()-$(window).height()));
		}*/
	}
})(jQuery);