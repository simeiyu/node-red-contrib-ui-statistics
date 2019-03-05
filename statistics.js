module.exports = function(RED) {
	'use strict';
	var utils = require('./utils');

	/**
	 * Statistics Node construction function
	 * @param {object} config Node configuration object
	 */
    function StatisticsNode(config) {
        try {
			var ui = undefined; 
			if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }

            RED.nodes.createNode(this, config);                       

			var node = this;

			if (utils.checkConfig(config, node)) {
	            var done = ui.addWidget({                   
	                node: node,
                    width: config.width || 4,
                    height: config.height || 6,  
	                format: utils.HTML(config), 
	                group: config.group,  
	                templateScope: "local",
	                order: config.order,
                    emitOnlyNewValues: false,
                    forwardInputMessages: false,
                    storeFrontEndInputAsState: false,
                    // beforeEmit: utils.beforeEmit(node, RED),
                    beforeSend: function (msg, orig) {
                        // console.log('statistics - beforeSend -->', msg, orig)
                        if (orig) {
                            return orig.msg;
                        }
                    },
                    beforeEmit: function(msg, value) {
                        let total = 0;
                        value.data.forEach(function(item) {
                            total += item.value
                        })
                        return {msg: {items: value.data, time: value.time, id: value.id, total: total}}
                    },
	                initController: utils.initController
				});

				node.on("close", done);
			}		
        } catch(error) {
            console.log("While constructing LEDNode widget:", error);		
		}
    }

    RED.nodes.registerType("ui_statistics", StatisticsNode);
}
