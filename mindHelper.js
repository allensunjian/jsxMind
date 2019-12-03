(function ($w) {
  var _name = 'MindHelper',

    _version = 'v1.0.0',

    _author = 'Allen.sun',

    _github = 'https://github.com/allensunjian',

    _email = 'Allen_sun_js@hotmail.com';

  var helper = function (opts) {
    this.globalOpts = opts.globalOpts;
    this.container = this.globalOpts.container ;
    this.view = opts.view;
    this.layout = opts.layout;
    this.shortcut = opts.shortcut;
    this.menu = opts.menu;
    this.profileOpts = opts.profileOpts;
    this.data = opts.data;
    this.tirrgerList = opts.tirrgerList;
    this.register_on = opts.register_on || function () { };
    this._option = {};
    this.init_helper();
  }
  helper.onEvents = {};
  helper.on = function (name, fn) {
    helper.onEvents[name] = fn;
  }
  helper.prototype = {
    _options_rules: function (type) {
      var _this = this;
      var rules = {
        must: function (key ,val) {
          if (!val) _this.logger('error', 'options [' + key+'] can not be empty')
        }
      }
      return rules[type]
    },
    init_helper: function () {
      this._formatOpts(this.opts);
      this.register_on();
      this.get_tirrger();
      this._get_jm();
      if (!isNaN(this.globalOpts.direction)) {
        jsMind.handle_layout = this.globalOpts.direction
      }
    },
    get_tirrger: function () {
      var ts = this.tirrgerList;
      if (!ts || !ts.length > 0) return;
      var tirrger = jsMind.register_triggerEvent;
      this.register_tirrger(tirrger, ts);
    },
    register_tirrger: function (tirrger, ts) {
      ts.forEach(function (ts_o) {
        if (helper.onEvents[ts_o.name]) {
          tirrger(ts_o.name, ts_o.type, helper.onEvents[ts_o.name])
        }
      }.bind(this))
    },
    register_on: function () {
      if (typeof this.register_on == 'function') {
        this.register_on();
      } else {
        this.logger('error', 'register_on must be a function')
      }
    },
    _get_jm: function () {
      var mind = new $w.jsMind(this._option);
      helper.mind = mind;
      mind.show(this.data)
    },
    _formatOpts: function () {
      Object.keys(this.globalOpts).forEach(function (key) {
        this._option[key] = this.globalOpts[key]
      }.bind(this));
      this.view &&( this._option.view = this.view);
      this.layout && (this._option.layout = this.layout);
      this.shortcut && (this._option.shortcut = this.shortcut);
      this.menu && (this._option.menu = this.menu);
      this.profileOpts && (this._option.profileOpts = this.profileOpts);
      this._checkOpts(this);
    },
    _checkOpts: function (o) {
      var checkObj = {
        container: 'must',
        data: 'must'
      };
      Object.keys(checkObj).forEach(function (k) {
        if (checkObj[k]) this._options_rules(checkObj[k])(k, o[k]);
      }.bind(this))
    },
    _create_fn: function () {
      return function () { }
    },
    logger: function (type, msg) {
      console[type](msg)
    },
    showAll: function () {
      helper.mind.expand_all();
    },
    hideAll: function () {
      helper.mind.collapse_all();
    },
    getMindData: function () {
      return helper.mind.get_data();
    },
    screenShot: function () {
      if (!helper.mind.screenshot) {
        this.logger('error','screenshot must import screenshot.js')
      }
      helper.mind.screenshot.shootDownload()
    },
    searchNode: function (id) {
      return helper.mind.get_node(id);
    },
    getSelectedNode: function () {
      return helper.mind.get_selected_node();
    },
    selectNode: function (id) {
      return helper.mind.select_node(id);
    },
    hideNode: function (id) {
      var node = this.selectNode(id);
      helper.mind.expand_node(node);
    },
    showNode: function (id) {
      var node = this.selectNode(id);
      helper.mind.collapse_node(node);
    },
  }
  $w[_name] = helper;
})(typeof window !== 'undefined' ? window : global)