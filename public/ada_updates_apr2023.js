var frogs = false;
var triggerCnt = 1;
jQuery("#root").bind("DOMSubtreeModified", function() {
        
    if(jQuery('#root').hasClass('live')){
        frogs = true;
        
       // console.log('frogs is true'); 
    } else {
        frogs = false;        
       // console.log('frogs is false'); 
    }
   
    if(!frogs && triggerCnt === 1){
       // console.log('frogs is false and triggered #'+triggerCnt+' times'); 
        setTimeout(
            function(){jQuery(function(){
                dynamicUpdating(); 
            });
        }, 5000); //5 second delay
        triggerCnt++;
    }
    jQuery('#root').find('a[href]').each(function(){
        jQuery(this).on('click', function(){
            triggerCnt = 1;
            jQuery('#root').removeClass('live');
        });
        jQuery(this).on('keydown', function(e){
            if(e.key === 'Enter' || e.keyCode === '13' || e.which === '13'){
                triggerCnt = 1;
                jQuery('#root').removeClass('live');
            }
        });
    });  
    jQuery('#root').find('button:not(disabled):not(.disabled)').each(function(){
        jQuery(this).on('click', function(){
            triggerCnt = 1;
            jQuery('#root').removeClass('live');
        });
        jQuery(this).on('keydown', function(e){
            if(e.key === 'Enter' || e.keyCode === '13' || e.which === '13'){
                triggerCnt = 1;
                jQuery('#root').removeClass('live');
            }
        });
    });     
});

/* as content is dynamic we need to update it when the page load/changes 
waitForAddedNode({
    id: 'root',
    parent: document.querySelector('body'),
    recursive: false,
    done: function(el) {
        console.log(el);        
    }
});*/

/* Need a way to check for changes to the id="root" done through react 
function waitForAddedNode(params) {
    new MutationObserver(function(mutations) {
        var el = document.getElementById(params.id);
        if (el) {
            this.disconnect();
            params.done(el);
        }
    }).observe(params.parent || document, {
        subtree: !!params.recursive || !params.parent,
        childList: true,
    });
}*/
/* Function for updates to page as it loads and/or changes */
function dynamicUpdating(){   
    /* update our Dom checker */
    jQuery('#root').addClass('live');
    /* Landmarks */
    /* nav it present */
    jQuery('header.dashboard-toolbar').find('.row').attr('role','navigation').attr('aria-label','Navigation Toolbar');

    /*main*/
     //fix main if not present // if bypass target not present
     var mainCnt = jQuery('main').length;
     var bypass = 0;
     if(mainCnt === 0){
         mainCnt = jQuery('[role="main"]').length;
     } else {
        jQuery('main').attr('id','main-content');
        bypass++;
     }

     var rwCnt = 0;
     jQuery('.row').each(function(){
        var parentClass = String(jQuery(this).parent().attr('class'));        
        if(parentClass.includes('dashboard')){
            //nothing
        } else {
            //check if it is the first one after dashboard toolbar
            if(rwCnt === 0 && mainCnt === 0){
                jQuery(this).attr('role','main');
                jQuery(this).attr('id','main-content');
                rwCnt++;
                mainCnt++;
                bypass++;
            }
        }
     });
     if(bypass === 0){
        jQuery('[role="main"]').attr('id','main-content');
        bypass++;
     }


    /* Discernible Text for Links */
    /* Fix logo link */
    jQuery('.brand-logo').each(function(){
      jQuery(this).append('<span class="sr-only">Logo Link</a>');
    });
    jQuery('.footer-logo').each(function(){
        jQuery(this).find('a[href').each(function(){
            jQuery(this).append('<span class="sr-only">Footer Logo Link</a>');
          });
      });
    /* Fix hover edit icons */
    jQuery('.hovertooltip').each(function(){
        jQuery(this).append('<span class="sr-only">Edit Link</span>');
    });
    /* Fix signup progress bar links */
    setTimeout(function(){
    var progressCnt = 1;
        jQuery('.wizardWidthWrap').find('a.progress-span').each(function(){
            jQuery(this).append('<span class="sr-only">Step #'+progressCnt+'</span>');
            progressCnt++;
        });
    }, 5000);

    /* tooltips should get keyboard only focus */
    jQuery('.Ec-Tooltip').each(function(){
        jQuery(this).find('span').attr('tabindex','0');
    });

    // check tabindexes are not greater than 0 
	jQuery('[tabindex]').each(function(){
		var tabindexVal = jQuery(this).attr('tabindex');
		if(tabindexVal > 0){
			jQuery(this).attr('tabindex','0');
		}
	});

    /* make sure focusable items get focus */
    jQuery('a').each(function(){
        var isDisabled = jQuery(this).attr('disabled');
        var isDisabledClass = jQuery(this).hasClass('disabled') ? true : false;

        if(!isDisabledClass && (!isDisabled || isDisabled === '')){
            jQuery(this).attr('tabindex','0');
        }
    });
    jQuery('button').each(function(){
        var isDisabled = jQuery(this).attr('disabled');
        var isDisabledClass = jQuery(this).hasClass('disabled') ? true : false;

        if(!isDisabledClass && (!isDisabled || isDisabled === '')){
            jQuery(this).attr('tabindex','0');
        }

    });
    jQuery('input[type="checkbox"]').each(function(){
        var isDisabled = jQuery(this).attr('disabled');
        var isDisabledClass = jQuery(this).hasClass('disabled') ? true : false;

        if(!isDisabledClass && (!isDisabled || isDisabled === '')){
            jQuery(this).attr('tabindex','0');
        }
    });
    jQuery('input[type="radio"]').each(function(){
        var isDisabled = jQuery(this).attr('disabled');
        var isDisabledClass = jQuery(this).hasClass('disabled') ? true : false;

        if(!isDisabledClass && (!isDisabled || isDisabled === '')){
            jQuery(this).attr('tabindex','0');
        }
    });
    jQuery('input[type="submit"]').each(function(){
        var isDisabled = jQuery(this).attr('disabled');
        var isDisabledClass = jQuery(this).hasClass('disabled') ? true : false;

        if(!isDisabledClass && (!isDisabled || isDisabled === '')){
            jQuery(this).attr('tabindex','0');
        }
    });
    jQuery('.table-responsive').each(function(){
        jQuery(this).attr('tabindex','0');
    });

    //fix images
    //begin updates to alternate text, title, and aria-label if needed only
    var imgCnt = 1;
    jQuery('img').each(function () {
        var curAlt = jQuery(this).attr('alt');
        var curTitle = jQuery(this).attr('title');
        var curAriaLbl = jQuery(this).attr('aria-label');
        var curImgPrnts = jQuery(this).parents().map(function () {
            return this.tagName;
        })
            .get()
            .join(', ');

        //no alt text or empty alt text or undefined
        if (!curAlt || curAlt === '' || curAlt === 'undefined') {
            jQuery(this).attr('alt', ''); //decorative	
            if (curImgPrnts.includes('A,') || curImgPrnts.includes(' A ')) {
                jQuery(this).attr('alt', 'Image link #' + imgCnt);
                if (!curTitle || curTitle === '' || curTitle === 'undefined') {

                   } else {
                       jQuery(this).attr('title', curTitle);
                   }
                if (!curAriaLbl || curAriaLbl === '' || curAriaLbl === 'undefined') {
                    if (!curTitle || curTitle === '' || curTitle === 'undefined') {

                   } else {
                       jQuery(this).attr('aria-label', curTitle);
                   }
                } else {
                    /*add it back in*/
                    jQuery(this).attr('aria-label', curAriaLbl);
                }
            } else {
                //if empty then should not contain title or aria-label
                jQuery(this).removeAttr('aria-label');
                jQuery(this).removeAttr('title');
            }

        } else {
            //alt present so we should leave alt alone
            jQuery(this).attr('alt', curAlt);
            //if title present add an aria-label as well
            if (!curTitle || curTitle === '' || curTitle === 'undefined') {

            }
            else {
                /*Add title back in*/
                jQuery(this).attr('title', curTitle);
                //first check to make sure it doesn't already have aria-label
                if (!curAriaLbl || curAriaLbl === '' || curAriaLbl === 'undefined') {
                    jQuery(this).attr('aria-label', curTitle);
                } else {
                    /*add it back in*/
                    jQuery(this).attr('aria-label', curAriaLbl);
                }
            }

        }
        imgCnt++;
    });
    //end updates to alternate text, title, and aria-label if needed only

    /* Fix roles/landmarks */
    /* Pagination is in a ul changing this to role navigation changes it from a "list" - we need to move this 
    to the parent */
    jQuery('ul.pagination').each(function(){
        jQuery(this).parent().attr('role','navigation').attr('aria-label','Pagination');
        jQuery(this).removeAttr('role').removeAttr('aria-label');
    });

    /* Fix Heading Levels */
    /* Step Wizard */
    jQuery('.stepsWrapSteps').find('h6').each(function(){
        jQuery(this).addClass('h6');
        var el = jQuery(this),
        html = el.html(),
        attrs = {
            "id": el.attr('id'),
            "class": el.attr('class'),
            "style": el.attr('style'),
            "data-element-id": el.attr('data-element-id'),
            "data-headingsmap-highlight": el.attr('data-headingsmap-highlight')
        };

        //console.log('Replacing ' + el.prop('tagName') + ', classes: ' + attrs.classes);
        el.replaceWith(jQuery('<h2></h2>').html(html).attr(attrs));
    });
    /* Signup */
    jQuery('.wizardHeading').find('h6').each(function(){
        jQuery(this).addClass('h6');
        var el = jQuery(this),
        html = el.html(),
        attrs = {
            "id": el.attr('id'),
            "class": el.attr('class'),
            "style": el.attr('style'),
            "data-element-id": el.attr('data-element-id'),
            "data-headingsmap-highlight": el.attr('data-headingsmap-highlight')
        };

        //console.log('Replacing ' + el.prop('tagName') + ', classes: ' + attrs.classes);
        el.replaceWith(jQuery('<h3></h3>').html(html).attr(attrs));
    });   
    /* myprofile-desc */
    jQuery('.myprofile-desc').find('h3').each(function(){
        jQuery(this).addClass('h3');
        var el = jQuery(this),
        html = el.html(),
        attrs = {
            "id": el.attr('id'),
            "class": el.attr('class'),
            "style": el.attr('style'),
            "data-element-id": el.attr('data-element-id'),
            "data-headingsmap-highlight": el.attr('data-headingsmap-highlight')
        };

        //console.log('Replacing ' + el.prop('tagName') + ', classes: ' + attrs.classes);
        el.replaceWith(jQuery('<h2></h2>').html(html).attr(attrs));
    }); 
    jQuery('.myprofile-desc').find('h6').each(function(){
        jQuery(this).addClass('h6');
        var el = jQuery(this),
        html = el.html(),
        attrs = {
            "id": el.attr('id'),
            "class": el.attr('class'),
            "style": el.attr('style'),
            "data-element-id": el.attr('data-element-id'),
            "data-headingsmap-highlight": el.attr('data-headingsmap-highlight')
        };

        //console.log('Replacing ' + el.prop('tagName') + ', classes: ' + attrs.classes);
        el.replaceWith(jQuery('<h3></h3>').html(html).attr(attrs));
    }); 

    /* Fix find advisor headings */
    jQuery('.advisors-display').find('h6').each(function(){
        jQuery(this).addClass('h6');
        var el = jQuery(this),
        html = el.html(),
        attrs = {
            "id": el.attr('id'),
            "class": el.attr('class'),
            "style": el.attr('style'),
            "data-element-id": el.attr('data-element-id'),
            "data-headingsmap-highlight": el.attr('data-headingsmap-highlight')
        };

        //console.log('Replacing ' + el.prop('tagName') + ', classes: ' + attrs.classes);
        el.replaceWith(jQuery('<h3></h3>').html(html).attr(attrs));
    }); 
    jQuery('.advisors-display-desc').find('h5').each(function(){
        jQuery(this).addClass('h6');
        var el = jQuery(this),
        html = el.html(),
        attrs = {
            "id": el.attr('id'),
            "class": el.attr('class'),
            "style": el.attr('style'),
            "data-element-id": el.attr('data-element-id'),
            "data-headingsmap-highlight": el.attr('data-headingsmap-highlight')
        };

        //console.log('Replacing ' + el.prop('tagName') + ', classes: ' + attrs.classes);
        el.replaceWith(jQuery('<h3></h3>').html(html).attr(attrs));
    }); 

    /* End Fix Heading Levels */

    /* fix keyboard only selection of checkboxes and radio butons */
    jQuery('input[type="checkbox"]').each(function(){
        jQuery(this).on('keydown', function(e){
            if(e.key === 'Enter' || e.keyCode === '13' || e.which === '13'){
                jQuery(this).attr('checked','checked');                
            }
        });
    });
    jQuery('input[type="checkbox"]').each(function(){
        var curItem = jQuery(this);
        curItem.parent().focusin(function(){
            jQuery(this).on('keydown', function(e){
                if(e.key === 'Enter' || e.keyCode === '13' || e.which === '13'){
                    curItem.attr('checked','checked');                
                }
            });
        });
    });
    jQuery('input[type="radio"]').each(function(){
        jQuery(this).on('keydown', function(e){
            if(e.key === 'Enter' || e.keyCode === '13' || e.which === '13'){
                jQuery(this).attr('checked','checked');                
            }
        });
    });

    /* End Fix Keyboard Only selection of checkboxes and radio buttons */

    /* fix missing for attribute on dropdowns */
    jQuery('.form-inputs-').each(function(){
        var missingFor1 = jQuery(this).find('#react-select-5-input').length;
        var missingFor2 = jQuery(this).find('#react-select-6-input').length;
        var missingFor3 = jQuery(this).find('#react-select-7-input').length;
        var missingFor4 = jQuery(this).find('[name="dream_companies_other"]').length;
        var missingFor5 = jQuery(this).find('#react-select-8-input').length;
        var missingFor6 = jQuery(this).find('#react-select-1-input').length;
        var missingFor7 = jQuery(this).find('#react-select-2-input').length;
        var missingFor8 = jQuery(this).find('#react-select-3-input').length;
        var missingFor9 = jQuery(this).find('#react-select-4-input').length;

        if(missingFor1 > 0){
            jQuery(this).find('label').attr('for','react-select-5-input');
        }
        if(missingFor2 > 0){
            jQuery(this).find('label').attr('for','react-select-6-input');
        }
        if(missingFor3 > 0){
            jQuery(this).find('label').attr('for','react-select-7-input');
        }
        if(missingFor4 > 0){
            jQuery(this).find('label').attr('for','dream_companies_other');
            jQuery(this).find('[name="dream_companies_other"]').attr('id','dream_companies_other');
        }
        if(missingFor5 > 0){
            jQuery(this).find('label').attr('for','react-select-8-input');
        }
        if(missingFor6 > 0){
            jQuery(this).find('label').attr('for','react-select-1-input');
        }
        if(missingFor7 > 0){
            jQuery(this).find('label').attr('for','react-select-2-input');
        }
        if(missingFor8 > 0){
            jQuery(this).find('label').attr('for','react-select-3-input');
        }
        if(missingFor9 > 0){
            jQuery(this).find('label').attr('for','react-select-4-input');
        }
    });
    /* Search filter missing labels */
    jQuery('form-inputs-search').each(function(){
        jQuery('#react-select-2-input').parent().prepend('<label class="sr-only" for="#react-select-2-input">'+jQuery('#react-select-2-placeholder').html()+'</label>');
        jQuery('#react-select-3-input').parent().prepend('<label class="sr-only" for="#react-select-3-input">'+jQuery('#react-select-3-placeholder').html()+'</label>');
        jQuery('#react-select-4-input').parent().prepend('<label class="sr-only" for="#react-select-4-input">'+jQuery('#react-select-4-placeholder').html()+'</label>');
        jQuery('#react-select-5-input').parent().prepend('<label class="sr-only" for="#react-select-5-input">'+jQuery('#react-select-5-placeholder').html()+'</label>');
    });

    /* Fix duplicate ids - divCricle contains id attributes not needed but duplicated from the continue button */
    jQuery('.divCricle').each(function(){
        jQuery(this).removeAttr('id');
    });
    /* Fix duplicate ids - multiple id=comment on textarea - use name to distinguish */
    var dupCommentCnt = 0;
    jQuery('textarea').each(function(){
        var txtrId = String(jQuery(this).attr('id'));
        if(txtrId.includes('comment')){
            jQuery(this).attr('data-id','comment_'+dupCommentCnt);
            jQuery(this).attr('id', jQuery(this).attr('name'));
            dupCommentCnt++;
        }
    });
    var dupSelectCnt = 0;
    jQuery('select').each(function(){
        var txtrId = String(jQuery(this).attr('id'));
        if(txtrId.includes('sel1')){
            jQuery(this).attr('data-id','sel1_'+dupSelectCnt);
            jQuery(this).attr('id', jQuery(this).attr('name'));
            dupSelectCnt++;
        }
    });
    var dupcheckCnt = 0;
    jQuery('input[type="checkbox"]').each(function(){
        var txtrId = String(jQuery(this).attr('id'));
        if(txtrId.includes('terms')){
            jQuery(this).attr('data-id','terms_'+dupcheckCnt);
            jQuery(this).attr('id', jQuery(this).attr('name'));
            dupcheckCnt++;
        }
    });

    /* Fix Selects needing accessible names */
    var selectNameTxt = '';
    var selectCnt = 1;
    jQuery('select').each(function(){
        selectNameTxt = String(jQuery(this).attr('aria-label'));
        if(!selectNameTxt || selectNameTxt === ''){
            jQuery(this).attr('aria-label','Select Dropdown #'+selectCnt);
            selectCnt++;
        }
    });
  }
 