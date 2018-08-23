!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_FilterForm=__webpack_require__(15),_FilterForm2=_interopRequireDefault(_FilterForm),_Tabs=__webpack_require__(11),_uploadForm=__webpack_require__(30),_uploadForm2=_interopRequireDefault(_uploadForm),_columnFormatter=__webpack_require__(31),_columnFormatter2=_interopRequireDefault(_columnFormatter),MediaIndex=function(_React$Component){function MediaIndex(props){_classCallCheck(this,MediaIndex);var _this=_possibleConstructorReturn(this,(MediaIndex.__proto__||Object.getPrototypeOf(MediaIndex)).call(this,props));return loris.hiddenHeaders=["Cand ID","Session ID","Hide File","File Type"],_this.state={isLoaded:!1,filter:{}},_this.fetchData=_this.fetchData.bind(_this),_this.updateFilter=_this.updateFilter.bind(_this),_this.resetFilters=_this.resetFilters.bind(_this),_this}return _inherits(MediaIndex,_React$Component),_createClass(MediaIndex,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){$.ajax(this.props.DataURL,{method:"GET",dataType:"json",success:function(data){this.setState({Data:data,isLoaded:!0})}.bind(this),error:function(_error){console.error(_error)}})}},{key:"updateFilter",value:function(filter){this.setState({filter:filter})}},{key:"resetFilters",value:function(){this.refs.mediaFilter.clearFilter()}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var uploadTab=void 0,tabList=[{id:"browse",label:"Browse"}];return loris.userHasPermission("media_write")&&(tabList.push({id:"upload",label:"Upload"}),uploadTab=React.createElement(_Tabs.TabPane,{TabId:tabList[1].id},React.createElement(_uploadForm2.default,{DataURL:loris.BaseURL+"/media/ajax/FileUpload.php?action=getData",action:loris.BaseURL+"/media/ajax/FileUpload.php?action=upload",maxUploadSize:this.state.Data.maxUploadSize}))),React.createElement(_Tabs.Tabs,{tabs:tabList,defaultTab:"browse",updateURL:!0},React.createElement(_Tabs.TabPane,{TabId:tabList[0].id},React.createElement(_FilterForm2.default,{Module:"media",name:"media_filter",id:"media_filter_form",ref:"mediaFilter",columns:3,formElements:this.state.Data.form,onUpdate:this.updateFilter,filter:this.state.filter},React.createElement("br",null),React.createElement(ButtonElement,{label:"Clear Filters",type:"reset",onUserInput:this.resetFilters})),React.createElement(StaticDataTable,{Data:this.state.Data.Data,Headers:this.state.Data.Headers,Filter:this.state.filter,getFormattedCell:_columnFormatter2.default,freezeColumn:"File Name"})),uploadTab)}}]),MediaIndex}(React.Component);$(function(){var mediaIndex=React.createElement("div",{className:"page-media"},React.createElement(MediaIndex,{DataURL:loris.BaseURL+"/media/?format=json"}));ReactDOM.render(mediaIndex,document.getElementById("lorisworkspace"))})},4:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Panel=function(_React$Component){function Panel(props){_classCallCheck(this,Panel);var _this=_possibleConstructorReturn(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this,props));return _this.state={collapsed:_this.props.initCollapsed},_this.panelClass=_this.props.initCollapsed?"panel-collapse collapse":"panel-collapse collapse in",_this.toggleCollapsed=_this.toggleCollapsed.bind(_this),_this}return _inherits(Panel,_React$Component),_createClass(Panel,[{key:"toggleCollapsed",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var glyphClass=this.state.collapsed?"glyphicon pull-right glyphicon-chevron-down":"glyphicon pull-right glyphicon-chevron-up",panelHeading=this.props.title?React.createElement("div",{className:"panel-heading",onClick:this.toggleCollapsed,"data-toggle":"collapse","data-target":"#"+this.props.id,style:{cursor:"pointer"}},this.props.title,React.createElement("span",{className:glyphClass})):"";return React.createElement("div",{className:"panel panel-primary"},panelHeading,React.createElement("div",{id:this.props.id,className:this.panelClass,role:"tabpanel"},React.createElement("div",{className:"panel-body",style:_extends({},this.props.style,{height:this.props.height})},this.props.children)))}}]),Panel}(React.Component);Panel.propTypes={id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string,style:React.PropTypes.object},Panel.defaultProps={initCollapsed:!1,id:"default-panel",height:"100%",style:{}},exports.default=Panel},11:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Tabs=function(_React$Component){function Tabs(props){_classCallCheck(this,Tabs);var _this=_possibleConstructorReturn(this,(Tabs.__proto__||Object.getPrototypeOf(Tabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this.props.updateURL&&hash?activeTab=hash.substr(1):_this.props.defaultTab?activeTab=_this.props.defaultTab:_this.props.tabs.length>0&&(activeTab=_this.props.tabs[0].id),_this.state={activeTab:activeTab},_this.handleClick=_this.handleClick.bind(_this),_this.getTabs=_this.getTabs.bind(_this),_this.getTabPanes=_this.getTabPanes.bind(_this),_this}return _inherits(Tabs,_React$Component),_createClass(Tabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("ul",{className:"nav nav-tabs",role:"tablist",style:tabStyle},tabs),React.createElement("div",{className:"tab-content"},tabPanes))}}]),Tabs}(React.Component);Tabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},Tabs.defaultProps={onTabChange:function(){},updateURL:!0};var VerticalTabs=function(_React$Component2){function VerticalTabs(props){_classCallCheck(this,VerticalTabs);var _this2=_possibleConstructorReturn(this,(VerticalTabs.__proto__||Object.getPrototypeOf(VerticalTabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this2.props.updateURL&&hash?activeTab=hash.substr(1):_this2.props.defaultTab?activeTab=_this2.props.defaultTab:_this2.props.tabs.length>0&&(activeTab=_this2.props.tabs[0].id),_this2.state={activeTab:activeTab},_this2.handleClick=_this2.handleClick.bind(_this2),_this2.getTabs=_this2.getTabs.bind(_this2),_this2.getTabPanes=_this2.getTabPanes.bind(_this2),_this2}return _inherits(VerticalTabs,_React$Component2),_createClass(VerticalTabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("div",{className:"tabbable col-md-3 col-sm-3"},React.createElement("ul",{className:"nav nav-pills nav-stacked",role:"tablist",style:tabStyle},tabs)),React.createElement("div",{className:"tab-content col-md-9 col-sm-9"},tabPanes))}}]),VerticalTabs}(React.Component);VerticalTabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},VerticalTabs.defaultProps={onTabChange:function(){},updateURL:!0};var TabPane=function(_React$Component3){function TabPane(){return _classCallCheck(this,TabPane),_possibleConstructorReturn(this,(TabPane.__proto__||Object.getPrototypeOf(TabPane)).apply(this,arguments))}return _inherits(TabPane,_React$Component3),_createClass(TabPane,[{key:"render",value:function(){var classList="tab-pane",title=void 0;return this.props.TabId===this.props.activeTab&&(classList+=" active"),this.props.Title&&(title=React.createElement("h1",null,this.props.Title)),React.createElement("div",{role:"tabpanel",className:classList,id:this.props.TabId},title,this.props.children)}}]),TabPane}(React.Component);TabPane.propTypes={TabId:React.PropTypes.string.isRequired,Title:React.PropTypes.string,activeTab:React.PropTypes.string},exports.Tabs=Tabs,exports.VerticalTabs=VerticalTabs,exports.TabPane=TabPane},15:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(4),_Panel2=_interopRequireDefault(_Panel),FilterForm=function(_React$Component){function FilterForm(props){_classCallCheck(this,FilterForm);var _this=_possibleConstructorReturn(this,(FilterForm.__proto__||Object.getPrototypeOf(FilterForm)).call(this,props));return _this.clearFilter=_this.clearFilter.bind(_this),_this.getFormChildren=_this.getFormChildren.bind(_this),_this.setFilter=_this.setFilter.bind(_this),_this.onElementUpdate=_this.onElementUpdate.bind(_this),_this.queryString=QueryString.get(),_this}return _inherits(FilterForm,_React$Component),_createClass(FilterForm,[{key:"componentDidMount",value:function(){var filter={},queryString=this.queryString;Object.keys(queryString).forEach(function(key){var filterKey="candidateID"===key?"candID":key;filter[filterKey]={value:queryString[key],exactMatch:!1}}),this.props.onUpdate(filter)}},{key:"clearFilter",value:function(){this.queryString=QueryString.clear(this.props.Module),this.props.onUpdate({})}},{key:"getFormChildren",value:function(){var formChildren=[];return React.Children.forEach(this.props.children,function(child,key){if(React.isValidElement(child)&&"function"==typeof child.type&&child.props.onUserInput){var callbackFunc=child.props.onUserInput,callbackName=callbackFunc.name,elementName=child.type.displayName,queryFieldName="candID"===child.props.name?"candidateID":child.props.name,filterValue=this.queryString[queryFieldName];"onUserInput"===callbackName&&(callbackFunc="ButtonElement"===elementName&&"reset"===child.props.type?this.clearFilter:this.onElementUpdate.bind(null,elementName)),formChildren.push(React.cloneElement(child,{onUserInput:callbackFunc,value:filterValue?filterValue:"",key:key})),this.setFilter(elementName,child.props.name,filterValue)}else formChildren.push(React.cloneElement(child,{key:key}))}.bind(this)),formChildren}},{key:"setFilter",value:function(type,key,value){var filter={};return this.props.filter&&(filter=JSON.parse(JSON.stringify(this.props.filter))),key&&(filter[key]={},value?filter[key].value=Object.keys(value).length>0?value:"":filter[key].value="",filter[key].exactMatch="SelectElement"===type||"select"===type),filter&&key&&""===value&&delete filter[key],filter}},{key:"onElementUpdate",value:function(type,fieldName,fieldValue){if("string"==typeof fieldName&&("string"==typeof fieldValue||"object"===("undefined"==typeof fieldValue?"undefined":_typeof(fieldValue)))){var queryFieldName="candID"===fieldName?"candidateID":fieldName;this.queryString=QueryString.set(this.queryString,queryFieldName,fieldValue);var filter=this.setFilter(type,fieldName,fieldValue);this.props.onUpdate(filter)}}},{key:"render",value:function(){var formChildren=this.getFormChildren(),formElements=this.props.formElements;return formElements&&Object.keys(formElements).forEach(function(fieldName){var queryFieldName="candID"===fieldName?"candidateID":fieldName;formElements[fieldName].onUserInput=this.onElementUpdate.bind(null,formElements[fieldName].type),formElements[fieldName].value=this.queryString[queryFieldName]}.bind(this)),React.createElement(_Panel2.default,{id:this.props.id,height:this.props.height,title:this.props.title},React.createElement(FormElement,this.props,formChildren))}}]),FilterForm}(React.Component);FilterForm.defaultProps={id:"selection-filter",height:"100%",title:"Selection Filter",onUpdate:function(){console.warn("onUpdate() callback is not set!")}},FilterForm.propTypes={Module:React.PropTypes.string.isRequired,filter:React.PropTypes.object.isRequired,id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string,onUpdate:React.PropTypes.func},exports.default=FilterForm},25:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),ProgressBar=function(_React$Component){function ProgressBar(){return _classCallCheck(this,ProgressBar),_possibleConstructorReturn(this,(ProgressBar.__proto__||Object.getPrototypeOf(ProgressBar)).apply(this,arguments))}return _inherits(ProgressBar,_React$Component),_createClass(ProgressBar,[{key:"render",value:function(){var progressStyle={display:this.props.value<0?"none":"block",backgroundColor:"#d3d3d3",height:"30px",position:"relative"},labelStyle={position:"absolute",top:0,left:0,zIndex:1e3,width:"100%",color:"#fff",textAlign:"center",lineHeight:"30px",fontWeight:"600"};return React.createElement("div",{className:"progress",style:progressStyle},React.createElement("div",{className:"progress-bar progress-bar-striped active",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":this.props.value,style:{width:this.props.value+"%"}}),React.createElement("span",{style:labelStyle},this.props.value,"%"))}}]),ProgressBar}(React.Component);ProgressBar.propTypes={value:React.PropTypes.number},ProgressBar.defaultProps={value:0},exports.default=ProgressBar},30:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_ProgressBar=__webpack_require__(25),_ProgressBar2=_interopRequireDefault(_ProgressBar),MediaUploadForm=function(_React$Component){function MediaUploadForm(props){_classCallCheck(this,MediaUploadForm);var _this=_possibleConstructorReturn(this,(MediaUploadForm.__proto__||Object.getPrototypeOf(MediaUploadForm)).call(this,props));return _this.state={Data:{},formData:{},uploadResult:null,errorMessage:null,isLoaded:!1,loadedData:0,uploadProgress:-1},_this.getValidFileName=_this.getValidFileName.bind(_this),_this.handleSubmit=_this.handleSubmit.bind(_this),_this.isValidFileName=_this.isValidFileName.bind(_this),_this.isValidForm=_this.isValidForm.bind(_this),_this.setFormData=_this.setFormData.bind(_this),_this.uploadFile=_this.uploadFile.bind(_this),_this}return _inherits(MediaUploadForm,_React$Component),_createClass(MediaUploadForm,[{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){self.setState({Data:data,isLoaded:!0})},error:function(data,errorCode,errorMsg){console.error(data,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"render",value:function(){if(void 0!==this.state.error)return React.createElement("div",{className:"alert alert-danger text-center"},React.createElement("strong",null,this.state.error));if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var helpText=React.createElement("span",null,"File name must begin with ",React.createElement("b",null,"[PSCID]_[Visit Label]_[Instrument]"),React.createElement("br",null),"For example, for candidate ",React.createElement("i",null,"ABC123"),", visit ",React.createElement("i",null,"V1")," for",React.createElement("i",null,"Body Mass Index")," the file name should be prefixed by:",React.createElement("b",null," ABC123_V1_Body_Mass_Index"),React.createElement("br",null),"File cannot exceed ",this.props.maxUploadSize);return React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-8 col-lg-7"},React.createElement(FormElement,{name:"mediaUpload",fileUpload:!0,onSubmit:this.handleSubmit,ref:"form"},React.createElement("h3",null,"Upload a media file"),React.createElement("br",null),React.createElement(StaticElement,{label:"Note",text:helpText}),React.createElement(SelectElement,{name:"pscid",label:"PSCID",options:this.state.Data.candidates,onUserInput:this.setFormData,ref:"pscid",hasError:!1,required:!0,value:this.state.formData.pscid}),React.createElement(SelectElement,{name:"visitLabel",label:"Visit Label",options:this.state.Data.visits,onUserInput:this.setFormData,ref:"visitLabel",required:!0,value:this.state.formData.visitLabel}),React.createElement(SearchableDropdown,{name:"forSite",label:"Site",placeHolder:"Search for site",options:this.state.Data.sites,strictSearch:!0,onUserInput:this.setFormData,ref:"forSite",required:!0,value:this.state.formData.forSite}),React.createElement(SelectElement,{name:"instrument",label:"Instrument",options:this.state.Data.instruments,onUserInput:this.setFormData,ref:"instrument",value:this.state.formData.instrument}),React.createElement(DateElement,{name:"dateTaken",label:"Date of Administration",minYear:"2000",maxYear:"2017",onUserInput:this.setFormData,ref:"dateTaken",value:this.state.formData.dateTaken}),React.createElement(TextareaElement,{name:"comments",label:"Comments",onUserInput:this.setFormData,ref:"comments",value:this.state.formData.comments}),React.createElement(SelectElement,{name:"language",label:"Document's Language",options:this.state.Data.language,onUserInput:this.setFormData,ref:"language",required:!1,value:this.state.formData.language}),React.createElement(FileElement,{name:"file",id:"mediaUploadEl",onUserInput:this.setFormData,ref:"file",label:"File to upload",required:!0,value:this.state.formData.file}),React.createElement(ButtonElement,{label:"Upload File"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-9 col-sm-offset-3"},React.createElement(_ProgressBar2.default,{value:this.state.uploadProgress}))))))}},{key:"getValidFileName",value:function(pscid,visitLabel,instrument){var fileName=pscid+"_"+visitLabel;return instrument&&(fileName+="_"+instrument),fileName}},{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,formRefs=this.refs,mediaFiles=this.state.Data.mediaFiles?this.state.Data.mediaFiles:[];if(this.isValidForm(formRefs,formData)){var instrument=formData.instrument?formData.instrument:null,fileName=formData.file?formData.file.name.replace(/\s+/g,"_"):null,requiredFileName=this.getValidFileName(formData.pscid,formData.visitLabel,instrument);if(!this.isValidFileName(requiredFileName,fileName))return void swal("Invalid file name!","File name should begin with: "+requiredFileName,"error");var isDuplicate=mediaFiles.indexOf(fileName);isDuplicate>=0?swal({title:"Are you sure?",text:"A file with this name already exists!\n Would you like to override existing file?",type:"warning",showCancelButton:!0,confirmButtonText:"Yes, I am sure!",cancelButtonText:"No, cancel it!"},function(isConfirm){isConfirm?this.uploadFile():swal("Cancelled","Your imaginary file is safe :)","error")}.bind(this)):this.uploadFile()}}},{key:"uploadFile",value:function(){var formData=this.state.formData,formObj=new FormData;for(var key in formData)""!==formData[key]&&formObj.append(key,formData[key]);$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,xhr:function(){var xhr=new window.XMLHttpRequest;return xhr.upload.addEventListener("progress",function(evt){if(evt.lengthComputable){var percentage=Math.round(evt.loaded/evt.total*100);this.setState({uploadProgress:percentage})}}.bind(this),!1),xhr}.bind(this),success:function(){var mediaFiles=JSON.parse(JSON.stringify(this.state.Data.mediaFiles));mediaFiles.push(formData.file.name);var event=new CustomEvent("update-datatable");window.dispatchEvent(event),this.setState({mediaFiles:mediaFiles,formData:{},uploadProgress:-1}),swal("Upload Successful!","","success")}.bind(this),error:function(err){console.error(err);var msg=err.responseJSON?err.responseJSON.message:"Upload error!";this.setState({errorMessage:msg,uploadProgress:-1}),swal(msg,"","error")}.bind(this)})}},{key:"isValidFileName",value:function(requiredFileName,fileName){return null!==fileName&&null!==requiredFileName&&0===fileName.indexOf(requiredFileName)}},{key:"isValidForm",value:function isValidForm(formRefs,formData){var isValidForm=!0,requiredFields={pscid:null,visitLabel:null,file:null};return Object.keys(requiredFields).map(function(field){formData[field]?requiredFields[field]=formData[field]:formRefs[field]&&(formRefs[field].props.hasError=!0,isValidForm=!1)}),this.forceUpdate(),isValidForm}},{key:"setFormData",value:function(formElement,value){var visitLabel=this.state.formData.visitLabel,pscid=this.state.formData.pscid;"pscid"===formElement&&""!==value&&(this.state.Data.visits=this.state.Data.sessionData[value].visits,this.state.Data.sites=this.state.Data.sessionData[value].sites,visitLabel?this.state.Data.instruments=this.state.Data.sessionData[value].instruments[visitLabel]:this.state.Data.instruments=this.state.Data.sessionData[value].instruments.all),"visitLabel"===formElement&&""!==value&&pscid&&(this.state.Data.instruments=this.state.Data.sessionData[pscid].instruments[value]);var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}}]),MediaUploadForm}(React.Component);MediaUploadForm.propTypes={DataURL:React.PropTypes.string.isRequired,action:React.PropTypes.string.isRequired},exports.default=MediaUploadForm},31:function(module,exports){"use strict";function formatColumn(column,cell,rowData,rowHeaders){if(loris.hiddenHeaders.indexOf(column)>-1)return null;var row={};rowHeaders.forEach(function(header,index){row[header]=rowData[index]},this);var classes=[];"1"===row["Hide File"]&&classes.push("bg-danger"),classes=classes.join(" ");var hasWritePermission=loris.userHasPermission("media_write");
if("File Name"===column&&hasWritePermission===!0){var downloadURL=loris.BaseURL+"/media/ajax/FileDownload.php?File="+encodeURIComponent(row["File Name"]);return React.createElement("td",{className:classes},React.createElement("a",{href:downloadURL,target:"_blank",download:row["File Name"]},cell))}if("Visit Label"===column&&null!==row["Cand ID"]&&row["Session ID"]){var sessionURL=loris.BaseURL+"/instrument_list/?candID="+row["Cand ID"]+"&sessionID="+row["Session ID"];return React.createElement("td",{className:classes},React.createElement("a",{href:sessionURL},cell))}if("Edit Metadata"===column){var editURL=loris.BaseURL+"/media/edit/?id="+row["Edit Metadata"];return React.createElement("td",{className:classes},React.createElement("a",{href:editURL},"Edit"))}return React.createElement("td",{className:classes},cell)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=formatColumn}});
//# sourceMappingURL=mediaIndex.js.map