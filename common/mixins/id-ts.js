module.exports = function (Model, options) {
	var app = require('../../server/server');
	//console.log(Model);
	console.log("Model Name ..." + Model.sharedClass.name);

	Model.observe('before save', function (ctx, next) {
		console.log("Inside Mixins Observer ..." + Model.sharedClass.name + "ctx.isNewInstance=" + ctx.isNewInstance);
		if (ctx.isNewInstance) {
			var modelInstance = ctx.instance;
			modelInstance.CreatedOn = Date.now();
			modelInstance.ModifiedOn = Date.now();
			modelInstance.CreatedByName = modelInstance.ModifiedBy;
			var Sequence = app.models.Sequence;
			Sequence.getSequence(Model.sharedClass.name,
				function (currSeq) {
					console.log("Mixins Sequence = " + currSeq)
					modelInstance.Id = currSeq;
					next();

				});
		} else {
			console.log("Mixin - update currentInstance" + ctx.currentInstance);
			var modelInstance = ctx.currentInstance;
			if (modelInstance == null) {
				console.log("Mixin - update data");
				modelInstance = ctx.data;
			}
			if (modelInstance == null) {
				modelInstance = ctx.instance;
			}
			//console.log(modelInstance);
			modelInstance.ModifiedOn = Date.now();
			console.log("Mixin - coming after setting modified_on");
			next();
		}

	});


}
