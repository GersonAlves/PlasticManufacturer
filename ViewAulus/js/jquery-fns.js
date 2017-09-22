$(function(){
	$('.blink').
        focus(function() {
            if(this.title==this.value) {
                this.value = '';
            }
        }).
        blur(function(){
            if(this.value=='') {
                this.value = this.title;
            }
        });

	$('.menu a.trigger').hover(
		function(){
			$(this).parent().find('.drop-down').show();
		},
		function(){}
	);
	
	$('.menu .drop-down').hover(
		function(){},
		function(){
			$(this).hide();	
		}
	);
	
	$('.panel-expander').each(function() {
		var container = $(this).parents('.panel:eq(0)').find('.panel-container');
		if ($(this).hasClass('panel-expanded')) {
			container.hide();
		} else {
			container.show();
		};
	});
	
	
	
	$('.panel-expander').click(function(){
		$(this).toggleClass('panel-expanded');
		$(this).parent().parent().find('.panel-container').slideToggle();
		return false;
	});
	
	$('a[rel*=facebox]').facebox();
	
	$('.color-match a.icon-edit').click(
		function(){
			var content = $(this).parents('tr:eq(0)').next('.selected-content');
			
			if (content.length) {
				content.toggle();		
			};
			
			return false;		
		}
	);
	
	$('.color-match tr').hover(function(){
			if( $(this).hasClass('selected-content') ) return;
			
			var tr = $(this);
			tr.addClass('selected');	
			
			var previous = tr.prev();
			if( !previous.is(':visible') ) {
				previous = previous.prev();
			}
			previous.addClass('before-selected');
		},function(){
			if( $(this).hasClass('selected-content') ) return;
			
			var tr = $(this);
			tr.removeClass('selected');	
			
			var previous = tr.prev();
			if( !previous.is(':visible') ) {
				previous = previous.prev();
			}
			previous.removeClass('before-selected');
		}	
	);
	

	$('.listing > ul > li > a').click(
		function(){
			$(this).toggleClass('active');		
			$(this).parent().find('.inner').slideToggle();
			return false;
		}
	);
	
	$('.tabs a').click(
		function() {
			var href = $(this).attr('href');
			
			$('.tabs a').removeClass('active');
			$(this).addClass('active');
			
			$('.tab').hide();
			$(href).show();
			
			return false;
		}
	);

})

//tabs function
$(function() {
	$('.tab-links li a').on('click', function(e)  {
		var currentAttrValue = $(this).attr('href');
	
		// Show/Hide Tabs
		$('.panel-container ' + currentAttrValue).show().siblings().hide();
	
		// Change/remove current tab to active
		$(this).parent('li').addClass('active').siblings().removeClass('active');
	
		e.preventDefault();
	});
	
});

// page init
jQuery(function(){
	initMobileNav();
});

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		hideOnClickOutside: true,
		menuActiveClass: 'active',
		menuOpener: '.menu-opener',
		menuDrop: '#navigation'
	});
}

/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {container: this}),
				instance = new MobileNav(params);
			$.data(this, 'MobileNav', instance);
		});
	};
}(jQuery));






$(document).ready(function() {
    $('.dataTable').DataTable( {
		//responsive: true,
        scrollX: true
	});
} );


(function($) {
	$.fn.menumaker = function(options) {  
	 var cssmenu = $(this), settings = $.extend({
	   format: "dropdown",
	   sticky: false
	 }, options);
	 return this.each(function() {
	   $(this).find(".nav-mobile").on('click', function(){
		 $(this).toggleClass('menu-opened');
		 var mainmenu = $(this).next('ul');
		 if (mainmenu.hasClass('open')) { 
		   mainmenu.slideToggle().removeClass('open');
		 }
		 else {
		   mainmenu.slideToggle().addClass('open');
		   if (settings.format === "dropdown") {
			 mainmenu.find('ul').show();
		   }
		 }
	   });
	   cssmenu.find('li ul').parent().addClass('has-sub');
	multiTg = function() {
		 cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
		 cssmenu.find('.submenu-button').on('click', function() {
		   $(this).toggleClass('submenu-opened');
		   if ($(this).siblings('ul').hasClass('open')) {
			 $(this).siblings('ul').removeClass('open').slideToggle();
		   }
		   else {
			 $(this).siblings('ul').addClass('open').slideToggle();
		   }
		 });
	   };
	   if (settings.format === 'multitoggle') multiTg();
	   else cssmenu.addClass('dropdown');
	   if (settings.sticky === true) cssmenu.css('position', 'fixed');
	resizeFix = function() {
	  var mediasize = 1000;
		 if ($( window ).width() > mediasize) {
		   cssmenu.find('ul').show();
		 }
		 if ($(window).width() <= mediasize) {
		   cssmenu.find('ul').hide().removeClass('open');
		 }
	   };
	   resizeFix();
	   return $(window).on('resize', resizeFix);
	 });
	  };
	})(jQuery);
	
	(function($){
	$(document).ready(function(){
	$("#cssmenu").menumaker({
	   format: "multitoggle"
	});
	});
	})(jQuery);


	
	jQuery(document).ready(function(){
        jQuery('.submenu').on('click', function(event) {        
			 jQuery('.sub').slideToggle('show');
        });
    });
	
