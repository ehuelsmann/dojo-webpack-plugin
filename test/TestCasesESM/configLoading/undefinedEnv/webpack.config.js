var path = require("path");
var DojoWebpackPlugin = require("../../../../index");
module.exports = [
{
	entry: "./index",
	plugins: [
		new DojoWebpackPlugin({
			loaderConfig: function() {
				return Object.assign({}, require("./loaderConfig")(), {noConfigApi: 1, has:{'dojo-config-api':0}});
			},
			loader: path.join(__dirname, "../../../js-esm/noconfig/dojo/dojo.js")
		})
	]
}
];
