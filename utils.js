module.exports = {
    /** 
	 * Generate our dashboard HTML code
	 * @param {object} config - The node's config instance
	 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
	 */
    HTML: function(config, ledStyle) { 
        return String.raw`
            <ul class="statistics">
                <li class="statistics-time">{{msg.time}}</li>
                <li class='statistics-item'>
                    <label>总数量</label>
                    <span class="statistics-value">{{msg.total}}</span>
                </li>
                <li class='statistics-item' ng-repeat="item in msg.items">
                    <label>{{item.name}}</label>
                    <span class="statistics-value">{{item.value}}</span>
                    <span class="statistics-status" ng-class="{'normal': item.status, 'warning': !item.status}"></span>
                </li>
                <li class="statistics-button"><md-button ng-click="mark(msg.id)">异常标定</md-button></li>
            </ul> 
            <style>
                .statistics {
                    margin-top: 32px;
                    position: relative;
                    list-style: none;
                    border: 1px solid #d9d9d9;
                    border-radius: 3px;
                    padding: 4px 12px;
                    background-color: #fafafa;
                }
                .statistics-time {
                    position: absolute;
                    right: 0;
                    top: -30px;
                    padding: 3px 8px;
                    font-size: 12px;
                    border: 1px solid #d9d9d9;
                    border-radius: 3px;
                    background-color: #fafafa;
                    line-height: 14px;
                    box-shadow: 0 0 3px rgba(0,0,0,.2);
                }
                .statistics-item {
                    margin: 8px 0;
                    font-size: 12px;
                }
                .statistics-item > label {
                    display: inline-block;
                    width: 48px;
                }
                .statistics-value {
                    display: inline-block;
                    line-height: 20px;
                    width: 60px;
                    border: 4px double #ddd;
                    border-radius: 4px;
                    text-align: center;
                    background-color: #fff;
                }
                .statistics-status {
                    margin-left: 4px;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #eee;
                }
                .statistics-status.normal {
                    background-color: green;
                }
                .statistics-status.warning {
                    background-color: red;
                }
                .statistics-button {
                    font-size: 12px;
                    text-align: center;
                }
                .statistics-button > button {
                    margin-bottom: 8px!important;
                    min-height: 30px!important;
                    padding-left: 12px!important;
                    padding-right: 12px!important;
                    background-color: rgb(24, 144, 255)!important;
                    color: #fff;
                }
            </style>   
        `;
	},
	
	/** 
	 * Check for that we have a config instance and that our config instance has a group selected, otherwise report an error
	 * @param {object} config - The config instance
	 * @param {object} node - The node to report the error on
	 * @returns {boolean} `false` if we encounter an error, otherwise `true`
	 */
	checkConfig: function(config, node) {
        if (!config) {
			// TODO: have to think further if it makes sense to separate these out, it isn't clear what the user can do if they encounter this besides use the explicit error to more clearly debug the code
            node.error(RED._("ui_statistics.error.no-config"));
            return false;
        }
        if (!config.hasOwnProperty("group")) {
            node.error(RED._("ui_statistics.error.no-group"));
            return false;
        }
        return true;
    },
    
	initController: function($scope) {
        $scope.mark = function(id) {
            $scope.send({payload: id})
        }
	}
};