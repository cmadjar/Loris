!function(t){function e(n){if(a[n])return a[n].exports;var r=a[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var r=a(1),s=n(r);$(function(){var t=loris.BaseURL+"/data_integrity_flag/?format=json",e=React.createElement("div",{id:"page-data-integrity"},React.createElement(s.default,{Module:"data_integrity_flag",DataURL:t}));ReactDOM.render(e,document.getElementById("lorisworkspace"))})},function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var l=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),o=a(2),u=n(o),c=a(3),f=n(c),m=function(t){function e(t){r(this,e);var a=s(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return a.state={isLoaded:!1,filter:{},formData:{}},a.fetchData=a.fetchData.bind(a),a.updateFilter=a.updateFilter.bind(a),a}return i(e,t),l(e,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var t=this;$.getJSON(this.props.DataURL,function(e){loris.flagStatusList=e.flagStatusList,t.setState({Data:e,isLoaded:!0})}).error(function(t){console.error(t)})}},{key:"updateFilter",value:function(t){this.setState({filter:t})}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var t=[{id:"browse",label:"Browse"},{id:"setflag",label:"Update"}];return React.createElement(Tabs,{tabs:t,defaultTab:"browse",updateURL:!0},React.createElement(TabPane,{TabId:t[0].id},React.createElement(FilterForm,{Module:this.props.Module,name:"data_integrity_filter",id:"data_integrity_filter",columns:2,onUpdate:this.updateFilter,filter:this.state.filter},React.createElement(SelectElement,{name:"visitLabel",label:"Visit Label",options:this.state.Data.visits}),React.createElement(SelectElement,{name:"instrument",label:"Instrument",options:this.state.Data.instruments}),React.createElement(SelectElement,{name:"userID",label:"User",options:this.state.Data.users}),React.createElement(SelectElement,{name:"flagStatus",label:"Flag Status",options:this.state.Data.flagStatusList}),React.createElement(ButtonElement,{label:"Clear Filters",type:"reset"})),React.createElement(StaticDataTable,{Data:this.state.Data.Data,Headers:this.state.Data.Headers,Filter:this.state.filter,getFormattedCell:f.default})),React.createElement(TabPane,{TabId:t[1].id},React.createElement(u.default,{visits:this.state.Data.visits,instruments:this.state.Data.instruments,flagStatusList:this.state.Data.flagStatusList,updateData:this.fetchData})))}}]),e}(React.Component);e.default=m},function(t,e){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),i=function(t){function e(t){a(this,e);var r=n(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return r.state={formData:{}},r.setFormData=r.setFormData.bind(r),r.handleSubmit=r.handleSubmit.bind(r),r}return r(e,t),s(e,[{key:"setFormData",value:function(t,e){var a=JSON.parse(JSON.stringify(this.state.formData));a[t]=e,this.setState({formData:a})}},{key:"handleSubmit",value:function(t){t.preventDefault(),$.ajax({type:"POST",url:"/data_integrity_flag/",data:JSON.stringify(this.state.formData),cache:!1,contentType:!1,processData:!1,success:function(t){swal({title:"Success!",type:"success"}),this.props.updateData(),this.setState({formData:{}})}.bind(this),error:function(t){console.error(t),swal({title:"Error!",type:"error",content:t.statusText})}})}},{key:"render",value:function(){return React.createElement("div",{className:"col-md-8 col-lg-6"},React.createElement(FormElement,{name:"flag_form",onSubmit:this.handleSubmit},React.createElement("h3",{className:"text-center"},"Update Instrument Status"),React.createElement("br",null),React.createElement(SelectElement,{name:"visitLabel",label:"Visit Label",options:this.props.visits,onUserInput:this.setFormData,value:this.state.formData.visitLabel,required:!0}),React.createElement(SelectElement,{name:"instrument",label:"Instrument",options:this.props.instruments,onUserInput:this.setFormData,value:this.state.formData.instrument,required:!0}),React.createElement(DateElement,{name:"date",label:"Date",onUserInput:this.setFormData,value:this.state.formData.date,required:!0}),React.createElement(SelectElement,{name:"flagStatus",label:"Flag Status",options:this.props.flagStatusList,onUserInput:this.setFormData,value:this.state.formData.flagStatus,required:!0}),React.createElement(TextareaElement,{name:"comment",label:"Comment",onUserInput:this.setFormData,value:this.state.formData.comment}),React.createElement(ButtonElement,{label:"Update"})))}}]),e}(React.Component);i.propTypes={},i.defaultProps={},e.default=i},function(t,e){"use strict";function a(t,e,a,n){if(loris.hiddenHeaders.indexOf(t)>-1)return null;var r={};if(n.forEach(function(t,e){r[t]=a[e]},this),"Instrument"===t){var s=loris.BaseURL+"/data_team_helper/?visit_label="+r["Visit Label"]+"&instrument="+r.Instrument;return React.createElement("td",null,React.createElement("a",{href:s},e))}if("Flag Status"===t){var i=loris.flagStatusList;return Object.keys(i).length>0&&i[e]?React.createElement("td",null,i[e]):React.createElement("td",null,e)}return React.createElement("td",null,e)}Object.defineProperty(e,"__esModule",{value:!0}),loris.hiddenHeaders=[],e.default=a}]);
//# sourceMappingURL=index.js.map