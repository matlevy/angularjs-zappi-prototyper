define(['./module'], function (creative_test) {

	creative_test.factory('CreativeTestOptionsModel',["$http", function($http) {

		 var model = {
	 		getOptions: function(){
	 			var r = {}

	 			r.stages = [
					{ key: "Concept", value: "concept", imageClass: 'zappi-icon_bulb', selectedImageClass: 'zappi-icon_bulb-' },
					{ key: "Draft", value: "draft", imageClass: 'zappi-icon_draft', selectedImageClass: 'zappi-icon_draft-' },
					{ key: "Finished", value: "finished", imageClass: 'zappi-icon_checklist', selectedImageClass: 'zappi-icon_checklist-' }
				]

				r.where = [
					{ key: "Print", value: "print", imageClass: 'zappi-icon_print', selectedImageClass: 'zappi-icon_print-' },
					{ key: "Online", value: "online", imageClass: 'zappi-icon_online_advert', selectedImageClass: 'zappi-icon_online_advert-' },
					{ key: "Outdoor", value: "outdoor", imageClass: 'zappi-icon_billboard', selectedImageClass : 'zappi-icon_draft-' }
				]

				r.industries = [
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