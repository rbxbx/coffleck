(function() {
  var __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  window.fleck = {
    pluralRules: [[new RegExp('(m)an$', 'gi'), '$1en'], [new RegExp('(pe)rson$', 'gi'), '$1ople'], [new RegExp('(child)$', 'gi'), '$1ren'], [new RegExp('^(ox)$', 'gi'), '$1en'], [new RegExp('(ax|test)is$', 'gi'), '$1es'], [new RegExp('(octop|vir)us$', 'gi'), '$1i'], [new RegExp('(alias|status)$', 'gi'), '$1es'], [new RegExp('(bu)s$', 'gi'), '$1ses'], [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'], [new RegExp('([ti])um$', 'gi'), '$1a'], [new RegExp('sis$', 'gi'), 'ses'], [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'), '$1$2ves'], [new RegExp('(hive)$', 'gi'), '$1s'], [new RegExp('([^aeiouy]|qu)y$', 'gi'), '$1ies'], [new RegExp('(matr|vert|ind)ix|ex$', 'gi'), '$1ices'], [new RegExp('(x|ch|ss|sh)$', 'gi'), '$1es'], [new RegExp('([m|l])ouse$', 'gi'), '$1ice'], [new RegExp('(quiz)$', 'gi'), '$1zes'], [new RegExp('s$', 'gi'), 's'], [new RegExp('$', 'gi'), 's']],
    singularRules: [[new RegExp('(m)en$', 'gi'), '$1an'], [new RegExp('(pe)ople$', 'gi'), '$1rson'], [new RegExp('(child)ren$', 'gi'), '$1'], [new RegExp('([ti])a$', 'gi'), '$1um'], [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$', 'gi'), '$1$2sis'], [new RegExp('(hive)s$', 'gi'), '$1'], [new RegExp('(tive)s$', 'gi'), '$1'], [new RegExp('(curve)s$', 'gi'), '$1'], [new RegExp('([lr])ves$', 'gi'), '$1f'], [new RegExp('([^fo])ves$', 'gi'), '$1fe'], [new RegExp('([^aeiouy]|qu)ies$', 'gi'), '$1y'], [new RegExp('(s)eries$', 'gi'), '$1eries'], [new RegExp('(m)ovies$', 'gi'), '$1ovie'], [new RegExp('(x|ch|ss|sh)es$', 'gi'), '$1'], [new RegExp('([m|l])ice$', 'gi'), '$1ouse'], [new RegExp('(bus)es$', 'gi'), '$1'], [new RegExp('(o)es$', 'gi'), '$1'], [new RegExp('(shoe)s$', 'gi'), '$1'], [new RegExp('(cris|ax|test)es$', 'gi'), '$1is'], [new RegExp('(octop|vir)i$', 'gi'), '$1us'], [new RegExp('(alias|status)es$', 'gi'), '$1'], [new RegExp('^(ox)en', 'gi'), '$1'], [new RegExp('(vert|ind)ices$', 'gi'), '$1ex'], [new RegExp('(matr)ices$', 'gi'), '$1ix'], [new RegExp('(quiz)zes$', 'gi'), '$1'], [new RegExp('s$', 'gi'), '']],
    uncountableWords: ['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'moose', 'deer', 'news'],
    inflect: function() {
      var inflect, inflections, str, _i, _len;
      str = arguments[0], inflections = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!inflections) {
        return str;
      }
      for (_i = 0, _len = inflections.length; _i < _len; _i++) {
        inflect = inflections[_i];
        str = this[inflect](str);
      }
      return str;
    },
    capitalize: function(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    },
    camelize: function(str, upper) {
      if (upper) {
        return this.upperCamelize(str);
      }
      return str.replace(/-+(.)?/g, function(match, chr) {
        if (chr != null) {
          return chr.toUpperCase();
        }
      });
    },
    upperCamelize: function(str) {
      return this.camelize(this.capitalize(str));
    },
    dasherize: function(str) {
      return str.replace(/\s|_/g, '-');
    },
    ordinalize: function(str) {
      var _ref;
      if ((_ref = parseInt(str, 10) % 100) === 11 || _ref === 12 || _ref === 13) {
        return str + 'th';
      }
      switch (parseInt(str, 10) % 10) {
        case 1:
          return str + 'st';
        case 2:
          return str + 'nd';
        case 3:
          return str + 'rd';
        default:
          return str + 'th';
      }
    },
    lizer: function(rules, uncountable) {
      return function(str) {
        var rule, _i, _len;
        if (__indexOf.call(uncountable, str) >= 0) {
          return str;
        }
        for (_i = 0, _len = rules.length; _i < _len; _i++) {
          rule = rules[_i];
          if (str.match(rule[0])) {
            return str.replace(rule[0], rule[1]);
          }
        }
      };
    },
    pluralize: function(str) {
      return this.lizer(this.pluralRules, this.uncountableWords)(str);
    },
    singularize: function(str) {
      return this.lizer(this.singularRules, this.uncountableWords)(str);
    },
    strip: function(str) {
      return str.replace(/^\s+/, '').replace(/\s+$/, '');
    },
    underscore: function(str) {
      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();
    }
  };
}).call(this);
