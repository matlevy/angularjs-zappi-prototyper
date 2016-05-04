define(['./module'], function (mmr) {

	mmr.factory('MMROptionsModel',["$http", "MediaObjectService", function($http, MediaObjectService) {

		 var model = {
	 		getOptions: function(){
	 			var r = {}

	 			r.package_sizes = [
	 				{ key: "Rectangular Landscape", value: { items: [], label: "rectangular" }, selectedImageClass: "zappi-icon_rect_landscape-mwb", imageClass: "zappi-icon_rect_landscape" },
	 				{ key: "Angular Bottles", value: { items: [], label: "angular" }, selectedImageClass: "zappi-icon_angled_bottles-mwb", imageClass: "zappi-icon_angled_bottles" },
	 				{ key: "Rectangular Portrait", value: { items: [], label: "rectangular-portrait" }, selectedImageClass: "zappi-icon_rect_portrait-mwb", imageClass: "zappi-icon_rect_portrait" },
	 				{ key: "Rounded Bottles", value: { items: [], label: "rounded-bottles" }, selectedImageClass: "zappi-icon_round_bottles-mwb", imageClass: "zappi-icon_round_bottles" },
	 				{ key: "Rectangular Thin", value: { items: [], label: "rectangular-thin" }, selectedImageClass: "zappi-icon_rect_landscape_thin-mwb", imageClass: "zappi-icon_rect_landscape_thin" },
	 				{ key: "Cans & Jars", value: { items: [], label: "cans-and-jars" }, selectedImageClass: "zappi-icon_cans-mwb", imageClass: "zappi-icon_cans" },
	 				{ key: "Tubs & Others", value: { items: [], label: "tubs-and-others" }, selectedImageClass: "zappi-icon_tubs_and_others-mwb", imageClass: "zappi-icon_tubs_and_others" },
	 				{ key: "Custom", value: { items: [], label: "empty" }, selectedImageClass: "zappi-icon_menu-mwb", imageClass: "zappi-icon_menu" },
	 			]

	 			for( var i=0; i<20; i++ ){
					var mo = MediaObjectService.factory.createMediaObject( null, "" );
					mo.thumbnail = "/assets/images/prototyping/pack-images/angular-" + (i+1) + ".jpg";
					mo.state = "uploaded";
					mo.meta.type = 'image';
					r.package_sizes[1].value.items.push(mo);
				}

				for( var i=0; i<20; i++ ){
					var mo = MediaObjectService.factory.createMediaObject( null, "" );
					mo.thumbnail = "/assets/images/prototyping/pack-images/rectangular-" + (i+1) + ".jpg";
					mo.state = "uploaded";
					mo.meta.type = 'image';
					r.package_sizes[0].value.items.push(mo);
				}

	 			r.stages = [
					{ key: "Draft", value: "draft" },
					{ key: "Finished", value: "finished" }
				]

				r.categories = [
					{ key: "FMCG", value: "fmcg", questions: [
						{ text: "Complete the following sentence.", sentence: "I ___ this brand regularly.", answers: [
							{ key: "Use", value: "Use" },
							{ key: "Buy", value: "Buy" },
							{ key: "Eat", value: "Eat" },
							{ key: "Drink", value: "Drink" },
							{ key: "Visit", value: "Visit" }
						]}
					] },
					{ key: "Long-term Purchase", value: "longterm", questions: [
						{ text: "Complete the following sentence.", sentence: "I currently ___ this brand.", answers: [
							{ key: "Use", value: "Use" },
							{ key: "Have", value: "Have" }
						]},
						{ text: "Complete the following sentence.", sentence: "If you you were going to ___ a product", answers: [
							{ key: "Buy", value: "Buy" },
							{ key: "Get", value: "Get" }
						]},
					] },
					{ key: "Services", value: "services", questions:[
						{ text: "Complete the following sentence.", sentence: "I currently ___ this brand.", answers: [
							{ key: "Use", value: "Use" },
							{ key: "Have", value: "Have" }
						]},
						{ text: "Complete the following sentence.", sentence: "If you you were going to ___ a product.", answers: [
							{ key: "Use", value: "Use" },
							{ key: "Visit", value: "Visit" },
							{ key: "Subscribe", value: "Subscribe" },
							{ key: "Takeout", value: "Takeout" },
							{ key: "Open", value: "Open" }
						]},
					] }
				]

				r.element_examples = [
					{ key: "Color", value: "Color", is_custom: false },
					{ key: "Logo", value: "Logo", is_custom: false },
					{ key: "Tagline", value: "Tagline", is_custom: false }
				]

				r.media_upload_types = [
					{ key: "Video", value: "video" },
					{ key: "Display", value: "display" }
				]

				r.media_position_types = [
					{ key: "Desktop Survey", value: "desktop", permitted_upload_type: ['video', 'display'] },
					{ key: "Mobile Survey", value: "mobile", permitted_upload_type: ['video', 'display'] },
					{ key: "Facebook Context", value: "facebook", permitted_upload_type: ['video', 'display'] },
					{ key: "Youtube Context", value: "youtube", permitted_upload_type: ['video'] }
				]

				r.advert_types = [
					{ key: "Right Column", value: "rightcol", permitted_context: ['display.facebook'] },
					{ key: "News Feed", value: "newsfeed", permitted_context: ['display.facebook'] },
					{ key: "Newsfeed Click To Play", value: "newsfeedclick", permitted_context: ['video.facebook'] },
					{ key: "Newsfeed Autoplay", value: "newsfeedauto", permitted_context: ['video.facebook'] },
					{ key: "Other", value: "other", permitted_context: ['display.desktop'] },
					{ key: "Banner (468x60)", value: "banner", permitted_context: ['display.desktop'] },
					{ key: "Button (120x90)", value: "button", permitted_context: ['display.desktop'] },
					{ key: "Half-Banner (234x60)", value: "halfbanner", permitted_context: ['display.desktop'] },
					{ key: "Large Rectangle/Square (336x280)", value: "largerectangle", permitted_context: ['display.desktop'] },
					{ key: "Medium Rectangle (300x250)", value: "mediumrectangle", permitted_context: ['display.desktop'] },
					{ key: "Pop Up (250x250)", value: "popup", permitted_context: ['display.desktop'] },
					{ key: "Small Rectangle (180x150)", value: "smallrectangle", permitted_context: ['display.desktop'] },
					{ key: "Skyscraper (120x600)", value: "skyscraper", permitted_context: ['display.desktop'] },
					{ key: "Super Banner (728x90)", value: "superbanner", permitted_context: ['display.desktop'] },
					{ key: "Tower/Vertical Banner (240x400)", value: "tower", permitted_context: ['display.desktop'] },
					{ key: "Wide Skyscraper (160x600)", value: "wideskyscraper", permitted_context: ['display.desktop'] },
				]

				r.advert_features = [
					{ key: "Interactivity", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Children", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Product shot", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Expandable", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Brand logo", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Celebrity", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Adults", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Message throughout", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Coupon/Voucher", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Animals", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] },
					{ key: "Message partially", value: "banner", permitted_context: ['display.desktop','display.mobile','video.desktop','video.mobile'] }
				]

				r.categories = [
					{ key: "Accountancy", value: "Accountancy" },
					{ key: "Aerospace, Aviation", value: "Aerospace, Aviation" },
					{ key: "Agriculture, Fishing, Forestry", value: "Agriculture, Fishing, Forestry" },
					{ key: "Apparel, Accessories", value: "Apparel, Accessories" },
					{ key: "Automotive", value: "Automotive" },
					{ key: "Banking & Finance", value: "Banking & Finance" },
					{ key: "Catering & Hospitality", value: "Catering & Hospitality" },
					{ key: "Construction", value: "Construction" },
					{ key: "Customer Service & Call Centre", value: "Customer Service & Call Centre" },
					{ key: "Design", value: "Design" },
					{ key: "Education", value: "Education" },
					{ key: "Electronics", value: "Electronics" },
					{ key: "Engineering & Manufacturing", value: "Engineering & Manufacturing" },
					{ key: "Fashion, Art & Design", value: "Fashion, Art & Design" },
					{ key: "Food & Drink Manufacturing", value: "Food & Drink Manufacturing" },
					{ key: "Health, Nursing", value: "Health, Nursing" },
					{ key: "Human Resources", value: "Human Resources" },
					{ key: "Insurance", value: "Insurance" },
					{ key: "IT", value: "IT" },
					{ key: "Legal", value: "Legal" },
					{ key: "Management", value: "Management" },
					{ key: "Marketing, Advertising, PR", value: "Marketing, Advertising, PR" },
					{ key: "Media, New media, Creative", value: "Media, New media, Creative" },
					{ key: "Not for profit, Charities", value: "Not for profit, Charities" },
					{ key: "Oil, Gas, Alternative Energy", value: "Oil, Gas, Alternative Energy" },
					{ key: "Property", value: "Property" },
					{ key: "Public sector & Services", value: "Public sector & Services" },
					{ key: "Publishing", value: "Publishing" },
					{ key: "Purchasing & Supply Chain", value: "Purchasing & Supply Chain" },
					{ key: "Recruitment", value: "Recruitment" },
					{ key: "Retail", value: "Retail" },
					{ key: "Sales", value: "Sales" },
					{ key: "Science", value: "Science" },
					{ key: "Secretaries, PAs and Administration", value: "Secretaries, PAs and Administration" },
					{ key: "Social Services", value: "Social Services" },
					{ key: "Sports & Lifestyle", value: "Sports & Lifestyle" },
					{ key: "Telecommunications", value: "Telecommunications" },
					{ key: "Transport, Logistics", value: "Transport, Logistics" },
					{ key: "Travel, Leisure and Tourism", value: "Travel, Leisure and Tourism" },
					{ key: "Other", value: "Other" }
				]

				r.predefined_words = [
					{ key: "Accessible", value: "Accessible", is_custom: false },
					{ key: "Cheap", value: "Cheap", is_custom: false },
					{ key: "Convenient", value: "Convenient", is_custom: false },
					{ key: "Elegant", value: "Elegant", is_custom: false },
					{ key: "Feminine", value: "Feminine", is_custom: false },
					{ key: "Funny", value: "Funny", is_custom: false },
					{ key: "High tech", value: "High tech", is_custom: false },
					{ key: "Masculine", value: "Masculine", is_custom: false },
					{ key: "Sexy", value: "Sexy", is_custom: false },
					{ key: "Sweet", value: "Sweet", is_custom: false },
					{ key: "Uncool", value: "Uncool", is_custom: false },
					{ key: "Aspirational", value: "Aspirational", is_custom: false },
					{ key: "Clever", value: "Clever", is_custom: false },
					{ key: "Cool", value: "Cool", is_custom: false },
					{ key: "Embarrassing", value: "Embarrassing", is_custom: false },
					{ key: "For people like me", value: "For people like me", is_custom: false },
					{ key: "Great service", value: "Great service", is_custom: false },
					{ key: "Innovative", value: "Innovative", is_custom: false },
					{ key: "Modern", value: "Modern", is_custom: false },
					{ key: "Simple", value: "Simple", is_custom: false },
					{ key: "Tasteful", value: "Tasteful", is_custom: false },
					{ key: "Unique", value: "Unique", is_custom: false },
					{ key: "Authentic", value: "Authentic", is_custom: false },
					{ key: "Complicated", value: "Complicated", is_custom: false },
					{ key: "Easy to understand", value: "Easy to understand", is_custom: false },
					{ key: "Engaging", value: "Engaging", is_custom: false },
					{ key: "Friendly", value: "Friendly", is_custom: false },
					{ key: "Great tasting", value: "Great tasting", is_custom: false },
					{ key: "Inspirational", value: "Inspirational", is_custom: false },
					{ key: "Refreshing", value: "Refreshing", is_custom: false },
					{ key: "Sleek", value: "Sleek", is_custom: false },
					{ key: "Thoughtful", value: "Thoughtful", is_custom: false },
					{ key: "Youthful", value: "Youthful", is_custom: false },
					{ key: "Boring", value: "Boring", is_custom: false },
					{ key: "Confusing", value: "Confusing", is_custom: false },
					{ key: "Easy to use", value: "Easy to use", is_custom: false },
					{ key: "Environmentally friendly", value: "Environmentally friendly", is_custom: false },
					{ key: "Fun", value: "Fun", is_custom: false },
					{ key: "Great Value", value: "Great Value", is_custom: false },
					{ key: "Luxurious", value: "Luxurious", is_custom: false },
					{ key: "Relaxing", value: "Relaxing", is_custom: false },
					{ key: "Stylish", value: "Stylish", is_custom: false },
					{ key: "Top quality", value: "Top quality", is_custom: false }
				]

				r.affinity = [
					{ key: "change your behaviour", value:"change_behaviour" },
					{ key: "donate to the organisation", value:"donate" },
					{ key: "purchase the product", value:"purchase" },
					{ key: "subscribe to the brand", value:"subscribe" },
					{ key: "consider the brand", value:"consider" },
					{ key: "join the brand", value:"join" },
					{ key: "read about the brand", value:"read" },
					{ key: "use the brand", value:"use" },
				]

				return r
	 		}
	 	}

	 	return model;
	 }]);

});