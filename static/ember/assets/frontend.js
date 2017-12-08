"use strict";



define('frontend/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.JSONAPIAdapter.extend({
		namespace: 'api'
	});
});
define('frontend/adapters/google', ['exports', 'ember-simple-auth/mixins/data-adapter-mixin', 'ember-data'], function (exports, _dataAdapterMixin, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.RESTAdapter.extend(_dataAdapterMixin.default, {
		authorizer: 'authorizer:google',
		host: 'https://googleapis/com'
	});
});
define('frontend/adapters/student', ['exports', 'frontend/adapters/google'], function (exports, _google) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _google.default.extend({
		namespace: 'oauth2/v1',
		pathForType: function pathForType() {
			return 'userinfo';
		}
	});
});
define('frontend/app', ['exports', 'frontend/resolver', 'ember-load-initializers', 'frontend/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  // Ember.MODEL_FACTORY_INJECTIONS = true;

  App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('frontend/authenticators/torii', ['exports', 'ember-simple-auth/authenticators/torii', 'frontend/config/environment'], function (exports, _torii, _environment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var $ = Ember.$,
	    RSVP = Ember.RSVP,
	    service = Ember.inject.service;
	exports.default = _torii.default.extend({
		torii: service('torii'),
		authenticate: function authenticate(provider, options) {
			return this.get('torii').open(provider, options).then(function (authResponse) {
				return new RSVP.Promise(function (resolve, reject) {
					return $.ajax(_environment.default.domainURL + '/api/session/', {
						type: 'POST',
						data: {
							'code': authResponse.authorizationCode,
							'redirect_uri': authResponse.redirectUri,
							'type': 'googleapi',
							'client_id': _environment.default.torii.providers['google-oauth2'].apiKey
						},
						success: resolve,
						error: reject
					});
				});
			});
		}
	});
});
define('frontend/authorizers/google', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _oauth2Bearer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _oauth2Bearer.default.extend();
});
define('frontend/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _bsAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
});
define('frontend/components/bs-accordion/item', ['exports', 'ember-bootstrap/components/bs-accordion/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('frontend/components/bs-accordion/item/body', ['exports', 'ember-bootstrap/components/bs-accordion/item/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('frontend/components/bs-accordion/item/title', ['exports', 'ember-bootstrap/components/bs-accordion/item/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('frontend/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _bsAlert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
});
define('frontend/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _bsButtonGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
});
define('frontend/components/bs-button-group/button', ['exports', 'ember-bootstrap/components/bs-button-group/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('frontend/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _bsButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
});
define('frontend/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _bsCollapse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
});
define('frontend/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _bsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
});
define('frontend/components/bs-dropdown/button', ['exports', 'ember-bootstrap/components/bs-dropdown/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('frontend/components/bs-dropdown/menu', ['exports', 'ember-bootstrap/components/bs-dropdown/menu'], function (exports, _menu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
});
define('frontend/components/bs-dropdown/menu/divider', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/divider'], function (exports, _divider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
});
define('frontend/components/bs-dropdown/menu/item', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('frontend/components/bs-dropdown/menu/link-to', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('frontend/components/bs-dropdown/toggle', ['exports', 'ember-bootstrap/components/bs-dropdown/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('frontend/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _bsForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
});
define('frontend/components/bs-form/element', ['exports', 'ember-bootstrap/components/bs-form/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('frontend/components/bs-form/element/control', ['exports', 'ember-bootstrap/components/bs-form/element/control'], function (exports, _control) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
});
define('frontend/components/bs-form/element/control/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/control/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('frontend/components/bs-form/element/control/input', ['exports', 'ember-bootstrap/components/bs-form/element/control/input'], function (exports, _input) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
});
define('frontend/components/bs-form/element/control/textarea', ['exports', 'ember-bootstrap/components/bs-form/element/control/textarea'], function (exports, _textarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
});
define('frontend/components/bs-form/element/errors', ['exports', 'ember-bootstrap/components/bs-form/element/errors'], function (exports, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
});
define('frontend/components/bs-form/element/feedback-icon', ['exports', 'ember-bootstrap/components/bs-form/element/feedback-icon'], function (exports, _feedbackIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
});
define('frontend/components/bs-form/element/help-text', ['exports', 'ember-bootstrap/components/bs-form/element/help-text'], function (exports, _helpText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
});
define('frontend/components/bs-form/element/label', ['exports', 'ember-bootstrap/components/bs-form/element/label'], function (exports, _label) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
});
define('frontend/components/bs-form/element/layout/horizontal', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal'], function (exports, _horizontal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
});
define('frontend/components/bs-form/element/layout/horizontal/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('frontend/components/bs-form/element/layout/inline', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline'], function (exports, _inline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
define('frontend/components/bs-form/element/layout/inline/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('frontend/components/bs-form/element/layout/vertical', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical'], function (exports, _vertical) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
});
define('frontend/components/bs-form/element/layout/vertical/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('frontend/components/bs-form/group', ['exports', 'ember-bootstrap/components/bs-form/group'], function (exports, _group) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _group.default;
    }
  });
});
define('frontend/components/bs-modal-simple', ['exports', 'ember-bootstrap/components/bs-modal-simple'], function (exports, _bsModalSimple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
});
define('frontend/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _bsModal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
});
define('frontend/components/bs-modal/body', ['exports', 'ember-bootstrap/components/bs-modal/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('frontend/components/bs-modal/dialog', ['exports', 'ember-bootstrap/components/bs-modal/dialog'], function (exports, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
define('frontend/components/bs-modal/footer', ['exports', 'ember-bootstrap/components/bs-modal/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
define('frontend/components/bs-modal/header', ['exports', 'ember-bootstrap/components/bs-modal/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
define('frontend/components/bs-modal/header/close', ['exports', 'ember-bootstrap/components/bs-modal/header/close'], function (exports, _close) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
});
define('frontend/components/bs-modal/header/title', ['exports', 'ember-bootstrap/components/bs-modal/header/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('frontend/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _bsNav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
});
define('frontend/components/bs-nav/item', ['exports', 'ember-bootstrap/components/bs-nav/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('frontend/components/bs-nav/link-to', ['exports', 'ember-bootstrap/components/bs-nav/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('frontend/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _bsNavbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
});
define('frontend/components/bs-navbar/content', ['exports', 'ember-bootstrap/components/bs-navbar/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('frontend/components/bs-navbar/link-to', ['exports', 'ember-bootstrap/components/bs-navbar/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('frontend/components/bs-navbar/nav', ['exports', 'ember-bootstrap/components/bs-navbar/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
define('frontend/components/bs-navbar/toggle', ['exports', 'ember-bootstrap/components/bs-navbar/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('frontend/components/bs-popover', ['exports', 'ember-bootstrap/components/bs-popover'], function (exports, _bsPopover) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
});
define('frontend/components/bs-popover/element', ['exports', 'ember-bootstrap/components/bs-popover/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('frontend/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _bsProgress) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
});
define('frontend/components/bs-progress/bar', ['exports', 'ember-bootstrap/components/bs-progress/bar'], function (exports, _bar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
});
define('frontend/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _bsTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
});
define('frontend/components/bs-tab/pane', ['exports', 'ember-bootstrap/components/bs-tab/pane'], function (exports, _pane) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
});
define('frontend/components/bs-tooltip', ['exports', 'ember-bootstrap/components/bs-tooltip'], function (exports, _bsTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
});
define('frontend/components/bs-tooltip/element', ['exports', 'ember-bootstrap/components/bs-tooltip/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('frontend/components/ember-popper', ['exports', 'ember-popper/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define('frontend/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('frontend/components/nav-bar', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Component = Ember.Component;
	exports.default = Component.extend({
		authManager: Ember.inject.service('auth-manager'),

		actions: {
			logout: function logout() {
				this.get('authManager').logout();
			},

			reload: function reload() {
				//this.reload();
			}
		}
	});
});
define('frontend/components/page-footer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({});
});
define('frontend/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiIframePlaceholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _toriiIframePlaceholder.default;
});
define('frontend/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('frontend/components/x-option', ['exports', 'emberx-select/components/x-option'], function (exports, _xOption) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _xOption.default;
});
define('frontend/components/x-select', ['exports', 'emberx-select/components/x-select'], function (exports, _xSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _xSelect.default;
});
define('frontend/controllers/login', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Controller = Ember.Controller,
	    service = Ember.inject.service;
	exports.default = Controller.extend({
		auth: service('auth-manager'),
		session: service('session'),

		actions: {
			login: function login() {
				this.get('auth').login();
			},
			logout: function logout() {
				this.get('auth').logout();
			},
			googleAuth: function googleAuth() {
				var auth = this;
				var session = auth.get('session');
				session.authenticate('authenticator:torii', 'google-oauth2').then(function () {
					auth.store.queryRecord('student', {}).then(function (student) {
						console.log(student);
						session.set('currentUser', student);
					});
				});
			}
		}
	});
});
define('frontend/controllers/register', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Controller = Ember.Controller;
    var alias = Ember.computed.alias;
    exports.default = Controller.extend({
        content: alias('model'),
        routing: Ember.inject.service('-routing'),
        confirmpassword: '',
        validationErrorMsg: "",
        showError: false,

        //client-side validators
        usernameChanged: Ember.observer('content.user.username', function () {
            var user = this.get('content').user;
            if (user.get('username') === undefined) {
                this.set('usernameclasses', null);
                this.set('usernameIcon', 'chevron-left');
            } else if (!/^[a-z0-9]+$/i.test(user.get('username'))) {
                this.set('usernameerror', 'Username must contain only alphanumeric characters');
                this.set('usernameclasses', 'has-error');
                this.set('usernameIcon', 'remove');
            } else {
                this.set('usernameerror', null);
                this.set('usernameclasses', 'has-success');
                this.set('usernameIcon', 'ok');
            }
        }),
        emailChanged: Ember.observer('content.user.email', function () {
            var user = this.get('content').user;

            var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (user.get('email') === undefined) {
                this.set('emailclasses', null);
                this.set('emailIcon', 'chevron-left');
            } else if (!re.test(user.get('email'))) {
                this.set('emailerror', 'Enter a valid email');
                this.set('emailclasses', 'has-error');
                this.set('emailIcon', 'remove');
            } else {
                this.set('emailclasses', 'has-success');
                this.set('emailIcon', 'ok');
            }
        }),
        passwordChanged: Ember.observer('content.user.password', function () {
            var user = this.get('content').user;
            if (user.get('password') === undefined || user.get('password') === '') {
                this.set('passwordclasses', null);
                this.set('passwordIcon', 'chevron-left');
            } else if (user.get('password').length < 8) {
                this.set('passwordclasses', 'has-error');
                this.set('passwordIcon', 'remove');
            } else {
                this.set('passwordclasses', 'has-success');
                this.set('passwordIcon', 'ok');
            }
        }),
        passwordConfirmChanged: Ember.observer('content.user.confirmpassword', function () {
            var user = this.get('content').user;
            if (user.get('confirmpassword') === undefined || user.get('confirmpassword') === '') {
                this.set('confirmpasswordclasses', null);
                this.set('confirmpasswordIcon', 'chevron-left');
            } else if (user.get('password') !== user.get('confirmpassword')) {
                this.set('confirmpasswordclasses', 'has-error');
                this.set('confirmpasswordIcon', 'remove');
            } else {
                this.set('confirmpasswordclasses', 'has-success');
                this.set('confirmpasswordIcon', 'ok');
            }
        }),

        //actions
        actions: {
            register: function register() {
                var route = this;
                route.set('validationErrorMsg', '');
                console.log(route.get('content'));
                var user = route.get('content').user;
                //console.log(gender);

                //probably want to do some additional validation here
                if (user.get('password') === route.get('confirmpassword')) {
                    var requestdata = {
                        'username': user.get("username"),
                        'password': user.get('password'),
                        'email': user.get('email')
                    };
                    if (!user.get('password') === '') {
                        Ember.$.post('../api/register/', requestdata, function (response) {
                            var errMsg = '';
                            if (response.data.status === "error") {
                                if (response.data.username) {
                                    errMsg = response.data.username;
                                } else if (response.data.email) {
                                    errMsg = response.data.email;
                                } else {
                                    errMsg = "An unknown error occured. Please try again";
                                }
                                route.set('validationErrorMsg', errMsg);
                            } else {
                                //success
                                route.set('success', true);
                                //could forward the user to another page (like home)
                                //t.transitionTo('login');
                                route.get('routing').transitionTo('login');
                            }
                        });
                    } else {
                        route.set('validationErrorMsg', 'Please enter a password');
                    }
                } else {
                    route.set('validationErrorMsg', 'Passwords don\'t match');
                }
            }

        }
    });
});
define('frontend/helpers/app-version', ['exports', 'frontend/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('frontend/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _bsContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
});
define('frontend/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _bsEq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function () {
      return _bsEq.eq;
    }
  });
});
define('frontend/helpers/equal', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.equal = equal;
	var helper = Ember.Helper.helper;
	function equal(params /*, hash*/) {
		return params.reduce(function (a, b) {
			return a === b;
		});
	}

	exports.default = helper(equal);
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('frontend/initializers/auth-manager', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    // application.inject('route', 'foo', 'service:foo');
    application.inject('route', 'auth', 'service:auth-manager');
    application.inject('component', 'auth', 'service:auth-manager');
    application.inject('controller', 'auth', 'service:auth-manager');
  }

  exports.default = {
    name: 'auth-manager',
    initialize: initialize
  };
});
define('frontend/initializers/constants', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.initialize = initialize;
	function initialize(application) {
		application.inject('route', 'constants', 'service:constants');
		application.inject('controller', 'constants', 'service:constants');
		application.inject('model', 'constants', 'service:constants');
	}

	exports.default = {
		name: 'constants',
		initialize: initialize
	};
});
define('frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('frontend/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('frontend/initializers/ember-simple-auth', ['exports', 'frontend/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _environment, _configuration, _setupSession, _setupSessionService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _environment.default['ember-simple-auth'] || {};
      config.baseURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
    }
  };
});
define('frontend/initializers/export-application-global', ['exports', 'frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('frontend/initializers/initialize-torii-callback', ['exports', 'frontend/config/environment', 'torii/redirect-handler'], function (exports, _environment, _redirectHandler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      if (_environment.default.torii && _environment.default.torii.disableRedirectInitializer) {
        return;
      }
      application.deferReadiness();
      _redirectHandler.default.handle(window).catch(function () {
        application.advanceReadiness();
      });
    }
  };
});
define('frontend/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _session, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _configuration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _session.default)(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('frontend/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'frontend/config/environment'], function (exports, _torii, _configuration, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _configuration.configure)(_environment.default.torii || {});
      (0, _torii.default)(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports.default = initializer;
});
define('frontend/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/load-bootstrap-config', ['exports', 'frontend/config/environment', 'ember-bootstrap/config'], function (exports, _environment, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    _config.default.load(_environment.default['ember-bootstrap'] || {});
  }

  exports.default = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('frontend/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('frontend/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _setupSessionRestoration.default)(instance);
    }
  };
});
define('frontend/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/compat/get-router-instance', 'torii/compat/get-router-lib', 'torii/router-dsl-ext'], function (exports, _routing, _configuration, _getRouterInstance, _getRouterLib) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _configuration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = (0, _getRouterInstance.default)(applicationInstance);
      var setupRoutes = function setupRoutes() {
        var routerLib = (0, _getRouterLib.default)(router);
        var authenticatedRoutes = routerLib.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _routing.default)(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('frontend/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _containerUtils, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _configuration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _containerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('frontend/models/student', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Model = _emberData.default.Model,
	    attr = _emberData.default.attr;
	exports.default = Model.extend({});
});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.Model.extend({
		// profile: DS.belongsTo('profile'),
		// groups: DS.hasMany('group'),
		username: _emberData.default.attr(),
		email: _emberData.default.attr()
		// password: DS.attr(),
	});
});
define('frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('frontend/router', ['exports', 'frontend/config/environment'], function (exports, _environment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var EmberRouter = Ember.Router;


    var Router = EmberRouter.extend({
        location: _environment.default.locationType,
        rootURL: _environment.default.routerRootURL
    });

    Router.map(function () {
        this.route('login', { path: '/login' });
        this.route('register', { path: '/register' });
        this.route('index', { path: '/' });
    });

    exports.default = Router;
});
define('frontend/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend();
});
define('frontend/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('frontend/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('frontend/routes/register', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Route = Ember.Route;
	var RSVP = Ember.RSVP;
	exports.default = Route.extend({
		model: function model() {
			return RSVP.hash({
				user: this.store.createRecord('user')
			});
		}
	});
});
define('frontend/serializers/student', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.JSONSerializer.extend({});
});
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('frontend/services/auth-manager', ['exports', 'frontend/config/environment'], function (exports, _environment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Service = Ember.Service;
	exports.default = Service.extend({
		store: Ember.inject.service('store'),
		routing: Ember.inject.service('-routing'),

		//field vars
		username: '',
		password: '',
		remember: false,
		errorMsg: '',

		//stored data
		user: null,
		profile: null,
		isLoggedIn: false,
		routeLoggedIn: false,
		login: function login() {
			console.log('Logging in:');

			//retrieve field data
			var username = this.get('username');
			var password = this.get('password');
			var remember = this.get('remember');

			var data = {
				'username': username,
				'password': password,
				'type': 'regular'
			};
			var auth = this;

			//make api request
			Ember.$.post(_environment.default.domainURL + '/api/session/', data, function (response) {
				if (response.data.isauthenticated) {
					//success
					auth.set('user', auth.get('store').findRecord('user', response.data.userid));
					console.log(auth.get('user'));
					auth.set('isLoggedIn', true);

					if (remember) {
						//save username and pass to local storage
						localStorage.setItem('remember', true);
						localStorage.setItem('username', auth.get('username'));
						localStorage.setItem('password', auth.get('password'));
					} else {
						localStorage.removeItem('remember');
						localStorage.removeItem('username');
						localStorage.removeItem('password');
					}
					auth.set('password', '');
					// Change per user role! 
					// if(auth.profile.roles.admin) {
					// 	auth.get('routing').transitionTo('admin');
					// } else {
					// 	auth.get('routing').transitionTo('subject');
					// }

					auth.get('routing').transitionTo('index');

					console.log('Login POST Request to ../api/session/ was successful.');
				} else {
					//errors
					console.log('Login POST Request to ../api/session/ was unsuccessful.');
					auth.set('errorMsg', response.data.message);
				}
			});
		},
		logout: function logout() {
			console.log('Logging out');
			var auth = this;
			Ember.$.ajax({ url: _environment.default.domainURL + '/api/session/', type: 'DELETE' }).then(function (response) {
				console.log('Logout DELETE Request to ../api/session/ was successful:' + response);
				auth.set('isLoggedIn', false);
				auth.set('errorMsg', '');
				auth.set('username', '');
				auth.set('user', null);
				//auth.set('profile', null);

				if (localStorage.remember) {
					auth.set('remember', localStorage.remember);
					auth.set('username', localStorage.username);
					auth.set('password', localStorage.password);
				}
				auth.get('routing').transitionTo('login');
			});
		},
		/**
  	called whenever the application loads to initialize any stored session/local variables
  **/
		init: function init() {
			this._super();
			var auth = this;

			//handle session and local variable loading
			this.set('remember', localStorage.remember);

			console.log("this: " + _environment.default.domainURL);

			if (auth.get('remember')) {
				auth.set('username', localStorage.username);
				auth.set('password', localStorage.password);
			}

			//check to see if the user is logged into the API
			Ember.$.get(_environment.default.domainURL + '/api/session/', function (response) {
				if (response.data.isauthenticated) {
					//success
					console.log('The user: \'' + response.data.username + '\' is currently logged in.');
					auth.set('user', auth.get('store').findRecord('user', response.data.userid));
					auth.set('isLoggedIn', true);
				} else {
					//errors
					console.log('The user is not currently logged in.');
				}
			});
		},

		routeRestriction: function routeRestriction(transition, transitionURL) {
			var route = this;
			if (!route.get('routeLoggedIn')) {
				var trans = transition.abort();
				Ember.$.get(_environment.default.domainURL + '/api/session/', function (response) {
					if (response.data.isauthenticated) {
						route.set('routeLoggedIn', true);
						trans.retry();
					} else {
						route.get('routing').transitionTo(transitionURL);
					}
				});
			}
		}

	});
});
define("frontend/services/constants", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var month_names = [];
	month_names[month_names.length] = "Jan";
	month_names[month_names.length] = "Feb";
	month_names[month_names.length] = "Mar";
	month_names[month_names.length] = "Apr";
	month_names[month_names.length] = "May";
	month_names[month_names.length] = "Jun";
	month_names[month_names.length] = "Jul";
	month_names[month_names.length] = "Aug";
	month_names[month_names.length] = "Sep";
	month_names[month_names.length] = "Oct";
	month_names[month_names.length] = "Nov";
	month_names[month_names.length] = "Dec";

	exports.default = Ember.Service.extend({
		debug: true,
		genders: ['Male', 'Female', 'Other'],
		educationLevels: ['some highschool', 'highschool', 'some college(2 years or less)', 'bachelor\'s degree', 'graduate degree'],
		states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],

		month_names: month_names,
		secsToStr: function secsToStr(seconds) {
			//Helper function for creating Gmail/FB/Twitter style time strings of the form tt <unit>(s) ago, where unit = <year||day||hour||minutes||seconds>.
			var numberEnding = function numberEnding(number) {
				return number > 1 ? 's ' : ' ';
			};
			var years = Math.floor(seconds / 31536000);
			var days = Math.floor(seconds % 31536000 / 86400);
			var hours = Math.floor(seconds % 31536000 % 86400 / 3600);
			var mins = Math.floor(seconds % 31536000 % 86400 % 3600 / 60);
			var secs = Math.floor(seconds % 31536000 % 86400 % 3600 % 60);
			if (years > 0) {
				return years + " year" + numberEnding(years) + " ago";
			} else if (days > 0) {
				return days + " day" + numberEnding(days) + " ago";
			} else if (hours > 0) {
				return hours + " hour" + numberEnding(hours) + " ago";
			} else if (mins > 0) {
				return mins + " minute" + numberEnding(mins) + " ago";
			} else if (secs > 0) {
				return secs + " second" + numberEnding(secs) + " ago";
			} else if (secs === 0) {
				return "Just Now";
			}
		}
	});
});
define('frontend/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define('frontend/services/popup', ['exports', 'torii/services/popup'], function (exports, _popup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popup.default;
    }
  });
});
define('frontend/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('frontend/services/torii-session', ['exports', 'torii/services/torii-session'], function (exports, _toriiSession) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toriiSession.default;
    }
  });
});
define('frontend/services/torii', ['exports', 'torii/services/torii'], function (exports, _torii) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _torii.default;
    }
  });
});
define('frontend/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("frontend/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BB0/1qzE", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t\\t\"],[1,[18,\"nav-bar\"],false],[0,\"\\n\\t\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t\\t\"],[1,[18,\"outlet\"],false],[0,\"\\n\\t\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t\\t\"],[1,[18,\"page-footer\"],false],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});
define('frontend/templates/components/ember-popper', ['exports', 'ember-popper/templates/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define("frontend/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eOLIlNYQ", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"nav\"],[9,\"class\",\"navbar navbar-default\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n    \"],[2,\" Brand and toggle get grouped for better mobile display \"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"navbar-toggle collapsed\"],[9,\"data-toggle\",\"collapse\"],[9,\"data-target\",\"#bs-example-navbar-collapse-1\"],[9,\"aria-expanded\",\"false\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[0,\"Toggle navigation\"],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],null,{\"statements\":[[6,\"a\"],[9,\"class\",\"navbar-brand\"],[9,\"href\",\"#\"],[7],[0,\"Student App\"],[8]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[2,\" Collect the nav links, forms, and other content for toggling \"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"collapse navbar-collapse\"],[9,\"id\",\"bs-example-navbar-collapse-1\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n      \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"auth\",\"isLoggedIn\"]]],null,{\"statements\":[[0,\"        \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav pull-right\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"dropdown\"],[7],[0,\"\\n            \"],[6,\"a\"],[9,\"class\",\"dropdown-toggle\"],[9,\"data-toggle\",\"dropdown\"],[9,\"href\",\"#\"],[7],[1,[20,[\"auth\",\"user\",\"username\"]],false],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"caret\"],[7],[8],[8],[0,\"\\n            \"],[6,\"ul\"],[9,\"class\",\"dropdown-menu\"],[7],[0,\"\\n              \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#\"],[3,\"action\",[[19,0,[]],\"logout\"]],[7],[6,\"i\"],[9,\"class\",\"glyphicon glyphicon-off\"],[7],[8],[0,\"  Log out\"],[8],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav pull-right\"],[7],[0,\"\\n          \"],[4,\"link-to\",[\"login\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Login\"],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[8],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[8],[2,\" /.container-fluid \"],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/components/nav-bar.hbs" } });
});
define("frontend/templates/components/page-footer", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LTHNe6Oz", "block": "{\"symbols\":[],\"statements\":[[6,\"footer\"],[7],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"copyrights\"],[7],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-xs-4 col-xs-offset-4\"],[7],[0,\"\\n\\t\\t\\tStudent App © 2017, All Rights Reserved\\n\\t\\t\"],[8],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/components/page-footer.hbs" } });
});
define('frontend/templates/components/x-select', ['exports', 'emberx-select/templates/components/x-select'], function (exports, _xSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xSelect.default;
    }
  });
});
define("frontend/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "J8fvzLJJ", "block": "{\"symbols\":[\"group\"],\"statements\":[[4,\"if\",[[20,[\"auth\",\"isLoggedIn\"]]],null,{\"statements\":[[4,\"each\",[[20,[\"auth\",\"user\",\"groups\"]]],null,{\"statements\":[[0,\"\\t\\tthis is the group: \"],[1,[19,1,[\"name\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/index.hbs" } });
});
define("frontend/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GAEZu60X", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container\"],[9,\"style\",\"margin-top:40px\"],[7],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\"],[0,\"\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-sm-6 col-md-4 col-md-offset-4 login-box shadow-2\"],[7],[0,\"\\n\\t\\t\\t\"],[6,\"form\"],[7],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"login-img-wrapper\"],[7],[0,\"\\n\"],[0,\"\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"row login-box\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-sm-12 col-md-10 col-md-offset-1\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"auth\",\"errorMsg\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"alert alert-danger\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[6,\"p\"],[9,\"style\",\"text-align: center;\"],[7],[0,\"Incorrect username/password\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"input-group\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[6,\"span\"],[9,\"class\",\"input-group-addon\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[6,\"i\"],[9,\"class\",\"glyphicon glyphicon-user\"],[7],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[1,[25,\"input\",null,[[\"type\",\"class\",\"value\",\"enter\",\"placeholder\",\"autofocus\"],[\"text\",\"input-sm form-control\",[20,[\"auth\",\"username\"]],\"login\",\"Username\",\"autofocus\"]]],false],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"input-group\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[6,\"span\"],[9,\"class\",\"input-group-addon\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[6,\"i\"],[9,\"class\",\"glyphicon glyphicon-lock\"],[7],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[1,[25,\"input\",null,[[\"type\",\"class\",\"value\",\"enter\",\"placeholder\"],[\"password\",\"input-sm form-control\",[20,[\"auth\",\"password\"]],\"login\",\"Password\"]]],false],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"input-group rememberlogin\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[6,\"label\"],[9,\"class\",\"checkbox\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[1,[25,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[20,[\"auth\",\"remember\"]]]]],false],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tRemember me\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-lg btn-primary btn-block\"],[9,\"value\",\"Sign in\"],[3,\"action\",[[19,0,[]],\"login\"]],[7],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\tNeed an account? \"],[4,\"link-to\",[\"register\"],null,{\"statements\":[[0,\"Register Now.\"]],\"parameters\":[]},null],[0,\"\\n\\n\\t\\t\\t\\t\\t\\t\"],[6,\"a\"],[9,\"href\",\"\"],[3,\"action\",[[19,0,[]],\"googleAuth\"]],[7],[0,\"Google Login\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"if\",[[20,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"\\t\"],[1,[20,[\"session\",\"currentUser\",\"name\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/login.hbs" } });
});
define("frontend/templates/register", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "OcZRvV5d", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container\"],[9,\"style\",\"margin-top:40px; margin-bottom:40px\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-6 col-md-6 col-md-offset-3 well\"],[7],[0,\"\\n            \"],[6,\"form\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n                    \"],[6,\"h4\"],[9,\"class\",\"text-center\"],[7],[0,\"Account Registration\"],[8],[0,\"\\n                \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"validationErrorMsg\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"alert alert-danger\"],[7],[0,\"\\n                        \"],[6,\"p\"],[9,\"style\",\"text-align: center;\"],[7],[1,[18,\"validationErrorMsg\"],false],[8],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[2,\" username and email row \"],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"row reg-form-row\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"col-md-6\"],[7],[0,\"\\n                        \"],[6,\"p\"],[9,\"class\",\"reg-label\"],[7],[0,\"Username\"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"col-md-6\"],[7],[0,\"\\n                        \"],[6,\"p\"],[9,\"class\",\"reg-label\"],[7],[0,\"Email\"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                \"],[8],[0,\"\\n                 \"],[6,\"div\"],[9,\"class\",\"row reg-form-row\"],[7],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",[26,[\"col-md-6 \",[18,\"usernameclasses\"]]]],[7],[0,\"\\n                        \"],[6,\"div\"],[9,\"class\",\"form-group has-feedback\"],[7],[0,\"\\n                            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"enter\",\"placeholder\"],[\"text\",[20,[\"content\",\"user\",\"username\"]],\"form-control\",\"register\",\"Username\"]]],false],[0,\"\\n                            \"],[6,\"i\"],[10,\"class\",[26,[\"glyphicon glyphicon-\",[18,\"usernameIcon\"],\" form-control-feedback \"]]],[7],[8],[0,\"\\n                        \"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",[26,[\"col-md-6 \",[18,\"emailclasses\"]]]],[7],[0,\"\\n                        \"],[6,\"div\"],[9,\"class\",\"form-group has-feedback\"],[7],[0,\"\\n                            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"enter\",\"placeholder\"],[\"text\",[20,[\"content\",\"user\",\"email\"]],\"form-control\",\"register\",\"Email\"]]],false],[0,\"\\n                            \"],[6,\"i\"],[10,\"class\",[26,[\"glyphicon glyphicon-\",[18,\"emailIcon\"],\" form-control-feedback \"]]],[7],[8],[0,\"\\n                        \"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                \"],[8],[0,\"\\n\\n                \"],[2,\" password row \"],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"row reg-form-row\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"col-md-6\"],[7],[0,\"\\n                        \"],[6,\"p\"],[9,\"class\",\"reg-label\"],[7],[0,\"Password\"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"col-md-6\"],[7],[0,\"\\n                        \"],[6,\"p\"],[9,\"class\",\"reg-label\"],[7],[0,\"Confirm Password\"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                \"],[8],[0,\"\\n                 \"],[6,\"div\"],[9,\"class\",\"row reg-form-row\"],[7],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",[26,[\"col-md-6 \",[18,\"passwordclasses\"]]]],[7],[0,\"\\n                        \"],[6,\"div\"],[9,\"class\",\"form-group has-feedback\"],[7],[0,\"\\n                            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"enter\",\"placeholder\"],[\"password\",[20,[\"content\",\"user\",\"password\"]],\"form-control\",\"register\",\"Password\"]]],false],[0,\"\\n                            \"],[6,\"i\"],[10,\"class\",[26,[\"glyphicon glyphicon-\",[18,\"passwordIcon\"],\" form-control-feedback \"]]],[7],[8],[0,\"\\n                        \"],[8],[0,\"\\n                   \"],[8],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",[26,[\"col-md-6 \",[18,\"confirmpasswordclasses\"]]]],[7],[0,\"\\n                        \"],[6,\"div\"],[9,\"class\",\"form-group has-feedback\"],[7],[0,\"\\n                            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"enter\",\"placeholder\"],[\"password\",[20,[\"confirmpassword\"]],\"form-control\",\"register\",\"Confirm Password\"]]],false],[0,\"\\n                            \"],[6,\"i\"],[10,\"class\",[26,[\"glyphicon glyphicon-\",[18,\"confirmpasswordIcon\"],\" form-control-feedback \"]]],[7],[8],[0,\"                                  \\n                        \"],[8],[0,\"                              \\n                    \"],[8],[0,\"\\n                \"],[8],[0,\"\\n                \\n                \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"col-sm-12\"],[7],[0,\"\\n                        \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"btn btn-block btn-success\"],[3,\"action\",[[19,0,[]],\"register\"]],[7],[0,\"Sign Up\"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/register.hbs" } });
});


define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+10dc87b7"});
}
//# sourceMappingURL=frontend.map
