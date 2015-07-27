	window.lpManager = {
		id_gen : null,
		options : null,
		disposable_email_domains : null,
		required_passes : {
			"email" : 4,
			"text" : 1,
			"phone" : 2,
			"submit" : 1
		},
		init : function(options)
		{
			this.id_gen = Date.now();

			this.options = options;

			this.doLanguageOverrides();

			this.loadFonts();

			this.enhanceFields();

			if(this.options.enable_disposables_check)
				this.loadDisposableEmailDomains();

			var self = this;
			jQuery("div[leadbox-form]").each(function()
			{
				var host = jQuery(this);

				self.render(host);

				self.resizeObjects(host);

				host.find("button.lp-object").click(self.saveDetails);

				jQuery(window).resize(function(){
					self.resizeObjects(host);
				});
			});
		},

		loadFonts : function () 
		{
			var families = this.options.google_fonts.split(",");
			for(var i=0; i < families.length; i++)
				families[i] = families[i].replace(/^\s*'?(.*?)'?\s*$/g,'$1');

			WebFontConfig = {
				google : {
					families: families
				}
			};
			var wf = document.createElement('script');
			wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
				'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			wf.type = 'text/javascript';
			wf.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(wf, s);
		},

		/* fix language fields with requested settings */
		doLanguageOverrides : function()
		{
			for(var prop in this.options.languageOverrides)
				this.langTable[this.options.language][prop] = this.options.languageOverrides[prop];
		},

		lang : function(msg)
		{
			return this.langTable[this.options.language][msg];
		},

		/* give fields ids and type related attributes */
		enhanceFields : function() 
		{
			//adding the submit button as something that is also required to pass (a click would do)
			this.options.fields.push({
				passes : 0,
				status : 'not_ready',
				id : 'submit_button',
				type : 'submit'
			});

			for(var i=0; i < this.options.fields.length-1; i++)
			{
				var field = this.options.fields[i];
				field.id = 'field_' + this.id_gen++;
				this.resetField(field.id);
				if(field.type == 'hidden')
					field.status = 'ready';
			}
		},

		findField : function(id)
		{
			for(var i=0; i<this.options.fields.length; i++)
				if(id == this.options.fields[i].id)
					return this.options.fields[i];
			return null;
		},

		resetField : function(fieldId)
		{
			var field = this.findField(fieldId);
			field.passes = 0;
			field.status = 'not_ready';
			if(field.id != 'submit_button' && field.type != 'hidden')
			{
				this.clearNotification(field.id);
				//if we reset a field, submit should be clicked again.

				this.resetField('submit_button');
			}
		},

		clearNotification : function(fieldId)
		{
			jQuery("#"+fieldId).siblings('.lp-suggest').remove();
			jQuery("#"+fieldId).removeClass('lp-error lp-pass lp-suggest');
		},

		fieldPass : function(fieldId)
		{
			var field = this.findField(fieldId);
			if(field.status == 'failed')
				return;
			field.passes++;
			if(field.passes < this.required_passes[field.type])
				return;

			field.status = 'ready';
			if(field.id != 'submit_button')
				this.showFieldPass(fieldId);
			this.doSubmit();
		},

		showFieldPass : function(fieldId)
		{
	    	this.clearNotification(fieldId);
	    	var self = jQuery("#"+fieldId);
	    	if(self.val().trim().length > 0)
		   		self.after(self,"<span class='lp-suggest lp-pass'>"+ this.lang("looks_good") + "</span>");
		},

		showFieldSuggestion : function(fieldId,suggestion)
		{
	      this.clearNotification(fieldId);
	      var self = jQuery('#'+fieldId);
	      jQuery(self).after(self,"<span class='lp-suggest'>"+ suggestion + "</span>");
		},

		showFieldError : function(fieldId,msg)
		{
	    	this.clearNotification(fieldId);
	    	var self = jQuery('#'+fieldId);
			self.addClass("lp-error");
			if(msg)
				self.after(self,"<span class='lp-suggest lp-error'>"+ this.lang(msg) +"</span>");
		},

		/* render fields and handle styles */
		render : function(host)
		{
			//render fields
			var formText = "<form class='lp-container "+this.options.layout+"' style='direction:"+this.options.direction+"'>";
			formText += "<div class='thanku-pop'>"+this.options.thanku_html+"</div>";
			for(var i=0; i < this.options.fields.length; i++)
			{
				var field = this.options.fields[i];
				
				if(field.id == 'submit_button')
					continue;
				
				switch(field.type)
				{
					case 'hidden':
						formText += "<input type='hidden' id='"+field.id+"' name='"+field.name+"' value='"+field.value+"'>";
						continue;
					case 'multiline':
						formText += "<div class='lp-row multiline'><label for='"+field.id+"' class='lp-label'>"+field.label+"</label><textarea id='"+field.id+"' class='lp-object lp-input "+(field.required ? "required" :"")+"' name='"+field.name+"' lp-validate='"+field.type+"' placeholder='"+field.label+"'></textarea></div>";
						break;
					case 'checkbox':
						formText += "<div class='lp-row'><input id='"+field.id+"' type='checkbox' "+(field.value.length > 0 ? "checked" : "")+" class='lp-object lp-input "+(field.required ? "required" :"")+"' name='"+field.name+"' lp-validate='"+field.type+"' />&nbsp;"+field.label+"</div>";
						break;					
					default:
						formText += "<div class='lp-row'><label for='"+field.id+"' class='lp-label'>"+field.label+"</label><input id='"+field.id+"' type='"+field.type+"' class='lp-object lp-input "+(field.required ? "required" :"")+"' name='"+field.name+"' lp-validate='"+field.type+"' placeholder='"+field.label+"' /></div>";
						break;
				}
			}

			formText += "<div class='lp-row'><button class='lp-object'>"+this.lang('save')+"</button></div></form>";

			//render styles
			host.append("<style>\n"+
				"form.lp-container { border-radius:"+this.options.border_radius+"px; padding:4px; position:relative; background-color: "+this.options.background+";font-family:"+this.options.google_fonts+", 'Sans Serif';}\n" + 
				"form.lp-container * { font-family:"+this.options.google_fonts+", 'Sans Serif';}\n" +
				"div.thanku-pop { width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: "+this.options.background+"; display: none; z-index: 100;}\n" +
				".lp-row { color:"+this.options.color+";position:relative; margin:8px 10px; padding-bottom:12px; display: "+ (this.options.layout == 'horizontal' ? "inline-" : "") +"block; }\n" +
				".lp-row.multiline { padding-bottom:0; }\n" +
				"form.horizontal .lp-row { vertical-align:top; margin:0 6px; min-width:140px;}\n" +
				"form.horizontal button.lp-object { margin-top:"+(this.options.show_labels? "16" : "0")+"px;}\n" +
				".lp-object { font-size:18px; line-height:24px; padding:4px; margin:0; border:solid 0px gray; color:"+this.options.input.text_color+";background-color:"+this.options.input.background+"; border-radius:"+this.options.border_radius+"px;outline:0;}\n" +
				".lp-label { font-size:12px; line-height:16px; margin:0; display:"+ (this.options.show_labels ? "block" : "none") +"; }\n" +
				".lp-suggest { position: absolute; bottom:0px; font-size:12px; line-height:12px; color:orange;"+(this.options.direction =='rtl' ? 'right' : 'left')+":0px; }"+
				".lp-suggest.lp-pass { color: green; }" +
				".lp-suggest.lp-error { color: #AF0000; }" +
				"textarea.lp-input { resize:none; line-height:18px; height:54px; margin-bottom:8px; font-size:14px; }" +
				".lp-input.lp-error { background-color:#FFECEF; background-repeat:no-repeat;background-position:"+(this.options.direction =='rtl' ? '1' : '98')+".5% center;}\n"+
				(this.options.direction == 'rtl' ?
				 ".lp-input.lp-error { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcGFTMSpcjydQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAcUlEQVQ4y+3SywmFQBBE0TuDOZhVmYQrk3gahmAUlZIro9CNPMSVMA0qWMumOdCfJKkBRqCmLAvQ5iCM3ZhyEPZH85Uu28l2utKbCc4HlidJWt8/8q1/+PgdzpHgDHTVqdjbHqJGLsaOYAgGgKRf5FU2OS0d+SsoTpYAAAAASUVORK5CYII=');}\n" :
				 ".lp-input.lp-error { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcHCxsmdyVBdQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAf0lEQVQ4y2P08/PzYWBgmMPAwCDOQBl4ycDAkM5EJcMYoGbMZKKSYXBDmYhRtWnTJsZNmzYxEqOWiYHKYNRAygGjn5/f/6Hv5QFNhzQJw8fUNjCLmoYyUmqAn59fPQMDQwOMz0ypgTdv3jyorq7OwMDA4EAVA9ENZaZW2MEMBQBZ4SD8U6/0DAAAAABJRU5ErkJggg==');}\n"
				 ) +
				"button.lp-object { margin-top:10px;cursor:pointer; color:"+this.options.submit.text_color+";background-color:"+this.options.submit.background+";}\n"+
				"button.lp-object:active { background-color:"+this.ColorLuminance(this.options.submit.background,-0.05)+";}\n"+
				"button.lp-object.waiting { background-color:"+this.ColorLuminance(this.options.submit.background,-0.2)+";}\n"+
				"</style>");

			host.append(formText);

			//clear errors on focus
			var self = this;
			host.find(".lp-input").focus(function(){
				self.resetField(this.id);
			});

			host.find(".lp-input").blur(function(){
				self.doValidations(this.id);
			});

			host.find(".lp-input").change(function(){
				self.resetField(this.id);
			});
		},

		resizeObjects : function(host)
		{
			var hostWidth = host.width() - 20; //row margins
			var inputWidth = Math.min(this.options.input.max_width,hostWidth);
			var inputWidth = Math.max(100,inputWidth);

			var buttonWidth = Math.min(250,inputWidth);
			buttonWidth = Math.max(100,buttonWidth);

			jQuery(".lp-input:not([type='checkbox'])").width(inputWidth);

			jQuery(".lp-container button").width(buttonWidth);

		},

		loadDisposableEmailDomains : function()
		{
			var self = this;
			jQuery.getJSON("https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json",function(data){
				self.disposable_email_domains = data;
			}).error(function(){
				//do nothing.
			});
		},

		doValidations : function(fieldId) {
			field = lpManager.findField(fieldId);

			lpManager.resetField(fieldId);

			var self = jQuery("#"+fieldId);
			var val = self.val().trim();

			if(field.required)
			{
				if(val.length == 0 || (field.type == 'checkbox' && !self.is(":checked")))
				{
					field.status = 'failed';
					lpManager.showFieldError(fieldId,"mandatory_field");
					return;
				}
				else
					lpManager.fieldPass(field.id);
			}
			else
				lpManager.fieldPass(field.id);

			switch(field.type)
			{
				case 'email':
					lpManager.doEmailValidations(field,val);
					break;
				case 'phone':
					lpManager.doPhoneValidations(field,val);
					break;
			}
		},

		doPhoneValidations : function(field,val)
		{
			var phoneRE = /^\+?[\d\. \-\(\)]{7,}$/g;
			var nakedPhone = val.replace(/\D/g, '');
			if(val.length > 0 && (!phoneRE.test(val) || nakedPhone.length < 7 || nakedPhone.length > 12))
			{
				lpManager.showFieldError(field.id,"wrong_phone_format");
				field.status = 'failed';
				return;
			}
			else
				lpManager.fieldPass(field.id);
		},

		doEmailValidations : function(field,val)
		{
			//regular expression check
			var emailRE = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/ig;
			if(val.length > 0 && !emailRE.test(val))
			{
				field.status = 'failed';
				this.showFieldError(field.id,"invalid_email_address");
				return;
			}
			else
				this.fieldPass(field.id);

			//disposable email domain check
			var domain =val.substr(val.indexOf("@") + 1).trim();
			if(val.length > 0 && this.options.enable_disposables_check && this.disposable_email_domains && this.disposable_email_domains.indexOf(domain) >= 0)
			{
				field.status = 'failed';
				this.showFieldError(field.id,"invalid_email_address");
				return;
			}
			else
				this.fieldPass(field.id);

			var self = this;
			if(val.length > 0 && window.run_validator && this.options.enable_validator)
			{
				run_validator(val,
				{
					api_key : self.options.mailgun_key,
					success : function(data)
					{ 
						if(data.is_valid)
						{
							self.fieldPass(field.id);
							if(data.did_you_mean)
								self.showFieldSuggestion(field.id,self.lang("did_you_mean")+" <b>"+data.did_you_mean +"</b>");
						}
						else
						{
							self.showFieldError(field.id,'invalid_email_address');
							field.status = 'failed';
						}
					},
					error : function(data)
					{
						//we ignore errors/exceptions - no test.
						self.fieldPass(field.id);
					}
				});
			}
			else
				this.fieldPass(field.id);

			//only if mailgun is not already on it, this is not part of the pass/fail mechanism.
			if(!this.options.enable_validator && this.options.enable_suggestions && window.Mailcheck)
			{
				jQuery("#"+field.id).mailcheck({
				    suggested: function(element, suggestion) {
				      self.showFieldSuggestion(element[0].id,self.lang("did_you_mean")+" "+suggestion.address + "<b>@" + suggestion.domain + "</b>")
				    },
				    empty: function(element) {
				    }
				});
			}
		},

		//saveDetails is passing the submit button. if all else passed, the lead iwll finally be sent by doSubmit
		saveDetails : function(e)
		{
			e.preventDefault();

			if(lpManager.isSaving())
				return false;
	
			lpManager.showSaving();

			for(var i =0; i<lpManager.options.fields.length;i++)
			{
				var field = lpManager.options.fields[i];
				if(field.status == 'not_ready' && field.id != 'submit_button' && field.type != 'hidden')
					lpManager.doValidations(field.id);
			}

			lpManager.fieldPass('submit_button');

			return false;
		},

		doSubmit : function()
		{
			for(var i =0; i < this.options.fields.length; i++)
				if(this.options.fields[i].status != 'ready')
				{
					lpManager.releaseSaving();
					return;
				}

			var data = {};
			for(var i =0; i<lpManager.options.fields.length;i++)
			{
				var field = lpManager.options.fields[i];
				if(field.id == 'submit_button')
					continue;
				else if(field.type == 'checkbox')
					data[field.name] = $("#"+field.id).is(":checked");
				else
					data[field.name] = $("#"+field.id).val();
			}

			lpManager.options.callback(data);

			for(var i=0;i<this.options.fields.length; i++)
				if(this.options.fields[i].type != 'hidden')
					this.options.fields[i].status = 'not_ready';

			lpManager.releaseSaving();

			console.log("form submitted successfully");
		},

		isSaving : function()
		{
			return jQuery("button.lp-object").hasClass("waiting");
		},

		showSaving : function()
		{
			jQuery("button.lp-object").addClass("waiting");
		},

		releaseSaving : function()
		{
			jQuery("button.lp-object").removeClass("waiting");
		},

		ColorLuminance : function(hex, lum) 
		{
			// validate hex string
			hex = String(hex).replace(/[^0-9a-f]/gi, '');
			if (hex.length < 6) {
				hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
			}
			lum = lum || 0;

			// convert to decimal and change luminosity
			var rgb = "#", c, i;
			for (i = 0; i < 3; i++) {
				c = parseInt(hex.substr(i*2,2), 16);
				c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
				rgb += ("00"+c).substr(c.length);
			}

			return rgb;
		},

		langTable : {
			english : {
				did_you_mean : "Did you mean",
				invalid_email_address : "Invalid email address",
				wrong_phone_format : "Wrong phone format",
				looks_good : "Looks good",
				mandatory_field : "This field is required",
				save : "save",
			},
			hebrew : {
				did_you_mean : "האם התכוונת ל",
				invalid_email_address : "כתובת המייל אינה תקינה",
				wrong_phone_format : "מספר טלפון בפורמט שגוי",
				looks_good : "תקין",
				mandatory_field : "זהו שדה חובה",
				save : "שמור"
			}
		},
	};