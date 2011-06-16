window.fleck =
  pluralRules: [
    [new RegExp('(m)an$', 'gi'),                 '$1en']
    [new RegExp('(pe)rson$', 'gi'),              '$1ople']
    [new RegExp('(child)$', 'gi'),               '$1ren']
    [new RegExp('^(ox)$', 'gi'),                 '$1en']
    [new RegExp('(ax|test)is$', 'gi'),           '$1es']
    [new RegExp('(octop|vir)us$', 'gi'),         '$1i']
    [new RegExp('(alias|status)$', 'gi'),        '$1es']
    [new RegExp('(bu)s$', 'gi'),                 '$1ses']
    [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes']
    [new RegExp('([ti])um$', 'gi'),              '$1a']
    [new RegExp('sis$', 'gi'),                   'ses']
    [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves']
    [new RegExp('(hive)$', 'gi'),                '$1s']
    [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies']
    [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices']
    [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es']
    [new RegExp('([m|l])ouse$', 'gi'),           '$1ice']
    [new RegExp('(quiz)$', 'gi'),                '$1zes']
    [new RegExp('s$', 'gi'),                     's']
    [new RegExp('$', 'gi'),                      's']
  ]
  singularRules: [
    [new RegExp('(m)en$', 'gi'),                                                       '$1an']
    [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson']
    [new RegExp('(child)ren$', 'gi'),                                                  '$1']
    [new RegExp('([ti])a$', 'gi'),                                                     '$1um']
    [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis']
    [new RegExp('(hive)s$', 'gi'),                                                     '$1']
    [new RegExp('(tive)s$', 'gi'),                                                     '$1']
    [new RegExp('(curve)s$', 'gi'),                                                    '$1']
    [new RegExp('([lr])ves$', 'gi'),                                                   '$1f']
    [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe']
    [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y']
    [new RegExp('(s)eries$', 'gi'),                                                    '$1eries']
    [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie']
    [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1']
    [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse']
    [new RegExp('(bus)es$', 'gi'),                                                     '$1']
    [new RegExp('(o)es$', 'gi'),                                                       '$1']
    [new RegExp('(shoe)s$', 'gi'),                                                     '$1']
    [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is']
    [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us']
    [new RegExp('(alias|status)es$', 'gi'),                                            '$1']
    [new RegExp('^(ox)en', 'gi'),                                                      '$1']
    [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex']
    [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix']
    [new RegExp('(quiz)zes$', 'gi'),                                                   '$1']
    [new RegExp('s$', 'gi'),                                                           '']
  ]
  uncountableWords: [
    'equipment'
    'information'
    'rice'
    'money'
    'species'
    'series'
    'fish'
    'sheep'
    'moose'
    'deer'
    'news'
  ]

  inflect: (str, inflections...) ->
    return str unless inflections

    for inflect in inflections
      str = this[inflect](str)
    return str

  capitalize: (str) ->
    str[0].toUpperCase() + str[1..-1].toLowerCase()

  camelize: (str, upper) ->
    return @upperCamelize(str) if upper
    str.replace(/-+(.)?/g, (match, chr) -> return chr.toUpperCase() if chr?)

  upperCamelize: (str) -> @camelize(@capitalize(str))

  dasherize: (str) -> str.replace(/\s|_/g, '-')

  ordinalize: (str) ->
    return str + 'th' if (parseInt(str, 10) % 100) in [11, 12, 13]

    switch parseInt(str, 10) % 10
      when 1 then str + 'st'
      when 2 then str + 'nd'
      when 3 then str + 'rd'
      else str + 'th'

  lizer: (rules, uncountable) ->
    (str) ->
      return str if str in uncountable

      for rule in rules
        return str.replace(rule[0], rule[1]) if str.match(rule[0])

  pluralize: (str) -> @lizer(@pluralRules, @uncountableWords)(str)

  singularize: (str) -> @lizer(@singularRules, @uncountableWords)(str)

  strip: (str) -> str.replace(/^\s+/, '').replace(/\s+$/, '')

  underscore: (str) ->
    str.replace(/::/g, '/')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/-/g, '_')
      .toLowerCase()
