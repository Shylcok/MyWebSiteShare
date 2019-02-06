（功能（全球，工厂）{
    typeof exports === 'object' && typeof module！==
    'undefined'？module.exports = factory（）：
    typeof define === 'function' && define.amd？define（工厂）：
    global.moment = factory（）
}（this，function（）{
    'use strict';

    var hookCallback;

    function utils_hooks__hooks（）{
        return hookCallback.apply（null，arguments）;
    }

    //这样做是为了注册用moment（）调用的方法
    //不创建循环依赖项。
    function setHookCallback（callback）{
        hookCallback = callback;
    }

    function isArray（input）{
        return Object.prototype.toString.call（input）===
        '[object Array]';
    }

    function isDate（input）{
        返回输入instanceof
        Date || Object.prototype.toString.call（input）===
        '[object Date]';
    }

    功能图（arr，fn）{
        var res = []，i;
        for（
        i = 0;
        i < arr.length;
        ++i）{
            res.push（fn（arr [i]，i））;
        }
        返回资源;
    }

    function hasOwnProp（a，b）{
        return Object.prototype.hasOwnProperty.call（a，b）;
    }

    function extend（a，b）{
        for（
        var i
    in
        b）{
            if（
            hasOwnProp（b，i））{
                a [i] = b [i];
            }
        }

        if（
        hasOwnProp（b，'toString'））{
            a.toString = b.toString;
        }

        if（
        hasOwnProp（b，'valueOf'））{
            a.valueOf = b.valueOf;
        }

        返回;
    }

    function create_utc__createUTC（input，format，locale，strict）{
        return createLocalOrUTC（input，format，locale，strict，true）.
        utc（）;
    }

    function defaultParsingFlags（）{
        //我们需要深度克隆这个对象。
        返回
        {
            空的：假的，
            unusedTokens：[]，
            unusedInput：[]，
            溢出：-2，
            charsLeftOver：0，
            nullInput：false，
            invalidMonth：null，
            invalidFormat：false，
            userInvalidated：false，
            iso：false
        }
        ;
    }

    function getParsingFlags（m）{
        if（
        m._pf == null）{
            m._pf = defaultParsingFlags（）;
        }
        return m._pf;
    }

    function valid__isValid（m）{
        if（
        m._isValid == null）{
            var flags = getParsingFlags（m）;
            m._isValid =！isNaN（m._d.getTime（））&&
            flags.overflow < 0 &&
                ！flags.empty &&
                ！flags.invalidMonth &&
                ！flags.invalidWeekday &&
                ！flags.nullInput &&
                ！flags.invalidFormat &&
                ！flags.userInvalidated;

            if（
            m._strict）{
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid（flags）{
        var m = create_utc__createUTC（NaN）;
        if（
        flags！= null）{
            extend（getParsingFlags（m），flags）;
        }
        其他
        {
            getParsingFlags（m）.
            userInvalidated = true;
        }

        返回m;
    }

    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig（to，from）{
        var i，prop，val;

        if（
        typeof from._isAMomentObject！==
        'undefined'）{
            to._isAMomentObject = from._isAMomentObject;
        }
        if（
        typeof from._i！==
        'undefined'）{
            to._i = from._i;
        }
        if（
        typeof from._f！==
        'undefined'）{
            to._f = from._f;
        }
        if（
        typeof from._l！==
        'undefined'）{
            to._l = from._l;
        }
        if（
        typeof from._strict！==
        'undefined'）{
            to._strict = from._strict;
        }
        if（
        typeof from._tzm！==
        'undefined'）{
            to._tzm = from._tzm;
        }
        if（
        typeof from._isUTC！==
        'undefined'）{
            to._isUTC = from._isUTC;
        }
        if（
        typeof from._offset！==
        'undefined'）{
            to._offset = from._offset;
        }
        if（
        typeof from._pf！==
        'undefined'）{
            to._pf = getParsingFlags（from）;
        }
        if（
        typeof from._locale！==
        'undefined'）{
            to._locale = from._locale;
        }

        if（
        momentProperties.length > 0）{
            for（
            i in momentProperties）{
                prop = momentProperties [i];
                val = 来自[prop];
                if（
                typeof val！==
                'undefined'）{
                    到[prop] = val;
                }
            }
        }

        还给;
    }

    var updateInProgress = false;

    // Moment原型对象
    function Moment（config）{
        copyConfig（this，config）;
        this._d = new Date（config._d！= null？config._d.getTime（）：NaN）;
        //防止无限循环，以防updateOffset创建新时刻
        //对象
        if（
        updateInProgress === false）{
            updateInProgress = true;
            utils_hooks__hooks.updateOffset（本）;
            updateInProgress = false;
        }
    }

    function isMoment（obj）{
        返回obj instanceof Moment || （obj！= null && obj._isAMomentObject！= null）;
    }

    function absFloor（number）{
        if（
        number < 0）{
            返回Math.ceil（数字）;
        }
    else
        {
            返回Math.floor（数字）;
        }
    }

    function toInt（argumentForCoercion）{
        var coercedNumber = +argumentForCoercion，
            value = 0;

        if（
        coercedNumber！==
        0 && isFinite（coercedNumber））{
            value = absFloor（coercedNumber）;
        }

        回报值;
    }

    function compareArrays（array1，array2，dontConvert）{
        var len = Math.min（array1.length，array2.length），
            lengthDiff = Math.abs（array1.length - array2.length），
            diffs = 0，
            一世;
        for（
        i = 0;
        i < len;
        i++）{
            if（（dontConvert && array1 [i]！==
            array2 [i]）||
        （！dontConvert && toInt（array1 [i]）！==
            toInt（array2 [i]）））{
                diff文件++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale（）{
    }

    var locales = {};
    var globalLocale;

    function normalizeLocale（key）{
        返回键？key.toLowerCase（）。replace（'_'，' - '）：key;
    }

    //从数组中选择语言环境
    //尝试['en-au'，'en-gb']为'en-au'，'en-gb'，'en'，就像在列表中搜索每个
    //从最具体到最少的子字符串，但如果它是比当前根更具体的变体，则移动到下一个数组项
    function chooseLocale（names）{
        var i = 0，j，next，locale，split;

        while（
        i < names.length）{
            split = normalizeLocale（names [i]）。split（' - '）;
            j = split.length;
            next = normalizeLocale（names [i + 1]）;
            下一个 = 下一个？next.split（' - '）：null;
            而（j > 0）{
                locale = loadLocale（split.slice（0，j）.
                join（' - '））;
                if（
                locale）{
                    返回区域;
                }
                if（
                next && next.length > = j && compareArrays（split，next，true）>
                = j - 1）{
                    //下一个数组项比这个更浅的子字符串更好
                    打破;
                }
                j--;
            }
            我++;
        }
        return null;
    }

    function loadLocale（name）{
        var oldLocale = null;
        // TODO：找到一种更好的方法来注册和加载Node中的所有语言环境
        if（！locales [name] && typeof module！==
        'undefined' &&
        module && module.exports）{
            尝试
            {
                oldLocale = globalLocale._abbr;
                require（'./ locale /' + name）;
                //因为defineLocale当前也设置了全局语言环境，我们
                //想要为延迟加载的语言环境撤消
                locale_locales__getSetGlobalLocale（oldLocale）;
            }
        catch（e）{
            }
        }
        return locales [name];
    }

    //此函数将加载语言环境，然后设置全局语言环境。如果
    //没有传入参数，它只返回当前的全局
    //语言环境键。
    function locale_locales__getSetGlobalLocale（key，values）{
        var数据;
        if（
        key）{
            if（
            typeof values === 'undefined'）{
                data = locale_locales__getLocale（key）;
            }
            其他
            {
                data = defineLocale（key，values）;
            }

            if（
            data）{
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale（name，values）{
        if（
        values！==
        null）{
            values.abbr = name;
            locales [name] = locales [name] || 新的Locale（）;
            区域设置[名称].SET（值）;

            //现在向后compat：也设置语言环境
            locale_locales__getSetGlobalLocale（名称）;

            return locales [name];
        }
    else
        {
            //对测试很有用
            删除locales [name];
            return null;
        }
    }

    //返回区域设置数据
    function locale_locales__getLocale（key）{
        var locale;

        if（
        key && key._locale && key._locale._abbr）{
            key = key._locale._abbr;
        }

        if（！key）{
            return globalLocale;
        }

        if（！isArray（key））{
            //将其他一切都短路
            locale = loadLocale（key）;
            if（
            locale）{
                返回区域;
            }
            key = [key];
        }

        return chooseLocale（key）;
    }

    var aliases = {};

    function addUnitAlias（unit，shorthand）{
        var lowerCase = unit.toLowerCase（）;
        别名[lowerCase] = 别名[lowerCase + 's'] = 别名[简写] = 单位;
    }

    function normalizeUnits（units）{
        返回typeof单位 === '字符串'？别名[单位] || 别名[units.toLowerCase（）]：undefined;
    }

    function normalizeObjectUnits（inputObject）{
        var normalizedInput = {}，
            normalizedProp，
            支柱;

        for（
        propObject中的prop）{
            if（
            hasOwnProp（inputObject，prop））{
                normalizedProp = normalizeUnits（prop）;
                if（
                normalizedProp）{
                    normalizedInput [normalizedProp] = inputObject [prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet（unit，keepTime）{
        return函数（值）{
            if（
            value！= null）{
                get_set__set（this，unit，value）;
                utils_hooks__hooks.updateOffset（this，keepTime）;
                归还这个;
            }
        else
            {
                return get_set__get（this，unit）;
            }
        }
        ;
    }

    function get_set__get（mom，unit）{
        return mom._d ['get' +（mom._isUTC？'UTC'：''）+unit
    ]（）;
    }

    function get_set__set（mom，unit，value）{
        return mom._d ['set' +（mom._isUTC？'UTC'：''）+unit
    ]（value）;
    }

    // MOMENTS

    function getSet（units，value）{
        var unit;
        if（
        typeof units === 'object'）{
            for（
            单位为单位）{
                this.set（单位，单位[单位]）;
            }
        }
    else
        {
            units = normalizeUnits（units）;
            if（
            typeof this [units] === 'function'）{
            返回此[单位]（值）;
        }
        }
        归还这个;
    }

    function zeroFill（number，targetLength，forceSign）{
        var absNumber = '' + Math.abs（number），
            zerosToFill = targetLength - absNumber.length，
            sign = number > = 0;
        return（sign？（forceSign？'+'：''）：' - '）+
            Math.pow（10，Math.max（0，zerosToFill））。toString（）。substr（1）+absNumber;
    }

    var formattingTokens = /（\ [[^ \ [* * \]）|（\\）？（Mo | MM？M？M？| Do | DDDo | DD？D？D？| ddd？d？| do？ | W〔O | W] | W [ø| W] | Q | YYYYYY | YYYYY | YYYY | YY | GG（GGG？）|？GG（GGG？）|？E | E | A | A | HH ？| HH |毫米| SS | S {1,9} | X | X | ZZ | ZZ |）/
    克？？？？。

    var localFormattingTokens = /（\ [[^ \ [* * \]）|（\\）？（LTS | LT | LL？L？L？| l {1,4}）/ g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    //令牌：'M'
    //填充：['MM'，2]
    //序数：'Mo'
    //回调：function（）{this.month（）+ 1}
    function addFormatToken（token，padded，ordinal，callback）{
        var func = callback;
        if（
        typeof callback === 'string'）{
            func = function（）{
                返回此[callback]（）;
            }
            ;
        }
        if（
        token）{
            formatTokenFunctions [token] = func;
        }
        if（
        padded）{
            formatTokenFunctions [padded [0]] = function（）{
                return zeroFill（func.apply（this，arguments），padded [1]，padded [2]）;
            }
            ;
        }
        if（
        序数）{
            formatTokenFunctions [ordinal] = function（）{
                return this.localeData（）。ordinal（func.apply（this，arguments），token）;
            }
            ;
        }
    }

    function removeFormattingTokens（input）{
        if（
        input.match（/ \ [[\ s \ S] /））{
            return input.replace（/ ^ \ [| \ _] $ /
            g，''）;
        }
        return input.replace（/ \\ /
        g，''）;
    }

    function makeFormatFunction（format）{
        var array = format.match（formattingTokens），i，length;

        for（
        i = 0，length = array.length;
        i < length;
        i++）{
            if（
            formatTokenFunctions [array [i]]）{
                array [i] = formatTokenFunctions [array [i]];
            }
        else
            {
                array [i] = removeFormattingTokens（array [i]）;
            }
        }

        return函数（妈妈）{
            var output = '';
            for（
            i = 0;
            i < length;
            i++）{
                output + = array [i]
                instanceof函数？array [i].call（mom，format）：array [i];
            }
            返回输出;
        }
        ;
    }

    //使用本机日期对象格式化日期
    function formatMoment（m，format）{
        if（！m.isValid（））{
            return m.localeData（）。invalidDate（）;
        }

        format = expandFormat（format，m.localeData（））;
        formatFunctions [format] = formatFunctions [format] || makeFormatFunction（格式）;

        return formatFunctions [format]（m）;
    }

    function expandFormat（format，locale）{
        var i = 5;

        function replaceLongDateFormatTokens（input）{
            return locale.longDateFormat（input）||
            输入;
        }

        localFormattingTokens.lastIndex = 0;
        while（
        i > = 0 && localFormattingTokens.test（format））{
            format = format.replace（localFormattingTokens，replaceLongDateFormatTokens）;
            localFormattingTokens.lastIndex = 0;
            我 - = 1;
        }

        返回格式;
    }

    var match1 = / \ d /; // 0  -  9
    var match2 = / \ d \ d /; // 00  -  99
    var match3 = / \ d {3} /; // 000  -  999
    var match4 = / \ d {4} /; // 0000  -  9999
    var match6 = / [+  - ]？\ d {6} /; // -999999  -  999999
    var match1to2 = / \ d \ d？/; // 0  -  99
    var match1to3 = / \ d {1,3} /; // 0  -  999
    var match1to4 = / \ d {1,4} /; // 0  -  9999
    var match1to6 = / [+  - ]？\ d {1,6} /; // -999999  -  999999

    var matchUnsigned = / \ d + /; // 0  -  inf
    var matchSigned = / [+  - ]？\ d + /; // -inf  -  inf

    var matchOffset = / Z | [+  - ] \ d \ d：？\ d \ d /
    gi; // +00：00 -00：00 +0000 -0000或Z.

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    //任何单词（或两个）字符或数字，包括阿拉伯语中的两个/三个单词月。
    var matchWord = / [0-9] * ['az \ u00A0- \ u05FF \ u0700- \ uD7FF \ uF900- \ uFDCF \ uFDF0- \ uFFEF] + | [\ u0600- \ u06FF \ /] +（\ s * ？[\ u0600- \ u06FF] +）{1,2} /
    I;

    var regexes = {};

    function isFunction（sth）{
        // https://github.com/moment/moment/issues/2325
        返回typeof
        sth === 'function' &&
        Object.prototype.toString.call（sth）===
        '[object Function]';
    }


    function addRegexToken（token，regex，strictRegex）{
        正则表达式[token] = isFunction（正则表达式）？正则表达式：function（isStrict）{
            return（isStrict && strictRegex）？strictRegex：正则表达式;
        }
        ;
    }

    function getParseRegexForToken（token，config）{
        if（！hasOwnProp（regexes，token））{
            返回新的RegExp（unescapeFormat（token））;
        }

        return regexes [token]（config._strict，config._locale）;
    }

    //代码来自http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat（s）{
        return s.replace（'\\'，''）。renplace（/ \\（\ [）| \\（\ _））| \ [（[^ \] \ [] *）\] | \\（。 ）/
        g，功能（匹配，p1，p2，p3，p4）{
            返回p1 || p2 || p3 || P4;
        }）。replace（/ [ -  \ / \\ ^ $ * + ?.（）| [\] {}] /
        g，'\\ $＆'）;
    }

    var tokens = {};

    function addParseToken（token，callback）{
        var i，func = callback;
        if（
        typeof token === 'string'）{
            token = [token];
        }
        if（
        typeof callback === 'number'）{
            func = function（input，array）{
                array [callback] = toInt（input）;
            }
            ;
        }
        for（
        i = 0;
        i < token.length;
        i++）{
            令牌[token [i]] = func;
        }
    }

    function addWeekParseToken（token，callback）{
        addParseToken（标记，函数（输入，数组，配置，标记）{
            config._w = config._w || {};
            回调（input，config._w，config，token）;
        }）;
    }

    function addTimeToArrayFromToken（token，input，config）{
        if（
        input！= null && hasOwnProp（tokens，token））{
            令牌[token]（输入，配置，配置，令牌）;
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;

    function daysInMonth（年，月）{
        返回新日期（Date.UTC（年，月 + 1, 0））。getUTCDate（）;
    }

    //格式化

    addFormatToken（'M'，['MM'，2
]，'Mo'，function（）{
        return this.month（）+1;
    }）;

    addFormatToken（'MMM'，0, 0，function（format）{
        return this.localeData（）。monthsShort（this，format）;
    }）;

    addFormatToken（'MMMM'，0, 0，function（format）{
        return this.localeData（）。months（this，format）;
    }）;

    // ALIASES

    addUnitAlias（'month'，'M'）;

    // PARSING

    addRegexToken（'M'，match1to2）;
    addRegexToken（'MM'，match1to2，match2）;
    addRegexToken（'MMM'，matchWord）;
    addRegexToken（'MMMM'，matchWord）;

    addParseToken（['M'，'MM'
]，function（input，array）{
        array [MONTH] = toInt（输入） -1;
    }）;

    addParseToken（['MMM'，'MMMM'
]，函数（输入，数组，配置，令牌）{
        var month = config._locale.monthsParse（input，token，config._strict）;
        //如果我们没有找到月份名称，请将日期标记为无效。
        if（
        month！= null）{
            array [MONTH] = 月;
        }
    else
        {
            getParsingFlags（config）.
            invalidMonth = input;
        }
    }）;

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split（'_'）;

    function localeMonths（m）{
        return this._months [m.month（）]
        ;
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split（'_'）;

    function localeMonthsShort（m）{
        return this._monthsShort [m.month（）]
        ;
    }

    function localeMonthsParse（monthName，format，strict）{
        var i，妈妈，正则表达式;

        if（！this._monthsParse）{
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for（
        i = 0;
        i < 12;
        i++）{
            //如果我们还没有它，请制作正则表达式
            mom = create_utc__createUTC（[2000，i
        ]）;
            if（
            strict &&！this._longMonthsParse [i]）{
                this._longMonthsParse [i] = new RegExp（'^' + this.months（mom，''）。renplace（'。'，''）+'$'，'i'）;
                this._shortMonthsParse [i] = new RegExp（'^' + this.monthsShort（mom，''）。renplace（'。'，''）+'$'，'i'）;
            }
            if（！strict &&！this._monthsParse [i]）{
                regex = '^' + this.months（mom，''）+'| ^' + this.monthsShort（mom，''）;
                this._monthsParse [i] = 新的RegExp（regex.replace（'。'，''），'i'）;
            }
            //测试正则表达式
            if（
            strict && format === 'MMMM' && this._longMonthsParse [i].test（monthName））{
                回归我;
            }
        else
            if（
            strict && format === 'MMM' && this._shortMonthsParse [i].test（monthName））{
                回归我;
            }
        else
            if（！strict && this._monthsParse [i].test（monthName））{
                回归我;
            }
        }
    }

    // MOMENTS

    function setMonth（mom，value）{
        var dayOfMonth;

        // TODO：把它移出这里！
        if（
        typeof value === 'string'）{
            value = mom.localeData（）。monthsParse（value）;
            // TODO：另一个无声的失败？
            if（
            typeof value！==
            'number'）{
                回来妈妈;
            }
        }

        dayOfMonth = Math.min（mom.date（），daysInMonth（mom.year（），value））;
        mom._d ['set' +（mom._isUTC？'UTC'：''）+'Month'
    ]（value，dayOfMonth）;
        回来妈妈;
    }

    function getSetMonth（value）{
        if（
        value！= null）{
            setMonth（this，value）;
            utils_hooks__hooks.updateOffset（this，true）;
            归还这个;
        }
    else
        {
            return get_set__get（this，'Month'）;
        }
    }

    function getDaysInMonth（）{
        return daysInMonth（this.year（），this.month（））;
    }

    function checkOverflow（m）{
        var溢出;
        var a = m._a;

        if（
        a && getParsingFlags（m）.
        overflow === -2）{
            溢出 =
                a [MONTH] < 0 || 一个月[11]？月：
                a [日期] < 1 || a [DATE] > daysInMonth（[年]，[月]）？日期：
                a [HOUR] < 0 || a [HOUR] > 24 || （a [HOUR] === 24 &&（a [MINUTE]！==
            0 || a [SECOND]！==
            0 || a [MILLISECOND]！==
            0））？小时：
                a [分钟] < 0 || a [分钟] > 59？分钟：
                a [SECOND] < 0 || a [SECOND] > 59？第二：
                a [MILLISECOND] < 0 || a [MILLISECOND] > 999？MILLISECOND：
                -1;

            if（
            getParsingFlags（m）.
            _
            overflowDayOfYear &&（overflow < YEAR || overflow > DATE））{
                overflow = DATE;
            }

            getParsingFlags（m）.
            overflow = overflow;
        }

        返回m;
    }

    function warn（msg）{
        if（
        utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console！==
        'undefined' && console.warn）{
            console.warn（'弃用警告：' + msg）;
        }
    }

    function deprecate（msg，fn）{
        var firstTime = true;

        return extend（function（）{
            if（
            firstTime）{
                警告（msg + '\ n' +（new Error（））。stack）;
                firstTime = false;
            }
            return fn.apply（this，arguments）;
        }，fn）;
    }

    var deprecations = {};

    function deprecateSimple（name，msg）{
        if（！deprecations [name]）{
            警告（MSG）;
            deprecations [name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    var from_string__isoRegex = / ^ \ s *（？：[+  - ] \ d {6} | \ d {4}） - （？：（\ d \ d- \ d \ d）|（W ​​\ d \ d $ ）|（W ​​\ d \ d- \ d）|（\ d \ d \ d））（（T |）（\ d \ d（：\ d \ d（：\ d \ d（\。\ d +）） ？）））（[\ + \  - ] \ d \ d（:: \ d \ d）| \ S * Z））$ /？？？？？？？？;

    var isoDates = [
        ['YYYYYY-MM-DD'，/ [+  - ] \ d {6}  -  \ d {2}  -  \ d {2} /
]，
        ['YYYY-MM-DD'，/ \ d {4}  -  \ d {2}  -  \ d {2} /
]，
        ['GGGG- [W] WW-E'，/ \ d {4} -W \ d {2}  -  \ d /
]，
        ['GGGG- [W] WW'，/ \ d {4} -W \ d {2} /
]，
        ['YYYY-DDD'，/ \ d {4}  -  \ d {3} /
]
]。

    // iso时间格式和正则表达式
    var isoTimes = [
        ['HH：mm：ss.SSSS'，/（T |）\ d \ d：\ d \ d：\ d \ d \。\ d + /
]，
        ['HH：mm：ss'，/（T |）\ d \ d：\ d \ d：\ d \ d /
]，
        ['HH：mm'，/（T |）\ d \ d：\ d \ d /
]，
        ['HH'，/（T |）\ d \ d /
]
]。

    var aspNetJsonRegex = / ^ \ /？Date \（（\  - ？\ d +）/ i;

    //来自iso格式的日期
    function configFromISO（config）{
        var i，l，
            string = config._i，
            match = from_string__isoRegex.exec（string）;

        if（
        match）{
            getParsingFlags（config）.
            iso = true;
            for（
            i = 0，l = isoDates.length;
            i < l;
            i++）{
                if（
                isoDates [i] [1].exec（string））{
                    config._f = isoDates [i] [0];
                    打破;
                }
            }
            for（
            i = 0，l = isoTimes.length;
            i < l;
            i++）{
                if（
                isoTimes [i] [1].exec（string））{
                    // match [6]应为'T'或空格
                    config._f + =（匹配[6] || ''）+isoTimes [i] [0];
                    打破;
                }
            }
            if（
            string.match（matchOffset））{
                config._f + = 'Z';
            }
            configFromStringAndFormat（配置）;
        }
    else
        {
            config._isValid = false;
        }
    }

    //来自iso格式或后备日期
    function configFromString（config）{
        var matched = aspNetJsonRegex.exec（config._i）;

        if（
        matched！==
        null）{
            config._d = 新日期（+匹配[1]）;
            返回;
        }

        configFromISO（配置）;
        if（
        config._isValid === false）{
            删除config._isValid;
            utils_hooks__hooks.createFromInputFallback（配置）;
        }
    }

    utils_hooks__hooks.createFromInputFallback = 弃用（
        '时刻建设回到了日期。这是' +
        '气馁，并将在即将到来的专业' +
        '发布。请参考' +
        'https://github.com/moment/moment/issues/1407了解更多信息。'，
        function（config）{
        config._d = new Date（config._i +（config._useUTC？'UTC'：''））;
    }
    ）;

    function createDate（y，m，d，h，M，s，ms）{
        //不能只用apply（）来创建日期：
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date（y，m，d，h，M，s，ms）;

        //日期构造函数不接受<1970年
        if（
        y < 1970）{
            date.setFullYear（Y）;
        }
        归期;
    }

    function createUTCDate（y）{
        var date = new Date（Date.UTC.apply（null，arguments））;
        if（
        y < 1970）{
            date.setUTCFullYear（Y）;
        }
        归期;
    }

    addFormatToken（0，['YY'，2
]，0，function（）{
        return this.year（）％100;
    }）;

    addFormatToken（0，['YYYY'，4
]，0，'year'）;
    addFormatToken（0，['YYYYY'，5
]，0，'year'）;
    addFormatToken（0，['YYYYYY'，6，true
]，0，'year'）;

    // ALIASES

    addUnitAlias（'year'，'y'）;

    // PARSING

    addRegexToken（'Y'，matchSigned）;
    addRegexToken（'YY'，match1to2，match2）;
    addRegexToken（'YYYY'，match1to4，match4）;
    addRegexToken（'YYYYY'，match1to6，match6）;
    addRegexToken（'YYYYYY'，match1to6，match6）;

    addParseToken（['YYYYY'，'YYYYYY'
]，YEAR）;
    addParseToken（'YYYY'，function（input，array）{
        array [YEAR] = input.length === 2？utils_hooks__hooks.parseTwoDigitYear（输入）：toInt（输入）;
    }）;
    addParseToken（'YY'，function（input，array）{
        array [YEAR] = utils_hooks__hooks.parseTwoDigitYear（input）;
    }）;

    //帮助

    function daysInYear（year）{
        return isLeapYear（year）？366：365;
    }

    function isLeapYear（year）{
        返回（年％4 === 0 && 年％100！==
        0）||
        年％400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function（input）{
        return toInt（input）+（toInt（input）>
        68？1900：2000）;
    }
    ;

    // MOMENTS

    var getSetYear = makeGetSet（'FullYear'，false）;

    function getIsLeapYear（）{
        return isLeapYear（this.year（））;
    }

    addFormatToken（'w'，['ww'，2
]，'wo'，'week'）;
    addFormatToken（'W'，['WW'，2
]，'Wo'，'isoWeek'）;

    // ALIASES

    addUnitAlias（'week'，'w'）;
    addUnitAlias（'isoWeek'，'W'）;

    // PARSING

    addRegexToken（'w'，match1to2）;
    addRegexToken（'ww'，match1to2，match2）;
    addRegexToken（'W'，match1to2）;
    addRegexToken（'WW'，match1to2，match2）;

    addWeekParseToken（['w'，'ww'，'W'，'WW'
]，function（input，week，config，token）{
        周[token.substr（0, 1）]
        = toInt（输入）;
    }）;

    //帮助

    // firstDayOfWeek 0 = sun，6 = sat
    //开始一周的星期几
    //（通常是星期日或星期一）
    // firstDayOfWeekOfYear 0 = sun，6 = sat
    //第一周是包含第一周的周
    //一周的这一天
    //（例如，ISO周使用星期四（4））
    function weekOfYear（mom，firstDayOfWeek，firstDayOfWeekOfYear）{
        var end = firstDayOfWeekOfYear - firstDayOfWeek，
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day（），
            adjustedMoment;


        if（
        daysToDayOfWeek > end）{
            daysToDayOfWeek - = 7;
        }

        if（
        daysToDayOfWeek < end - 7）{
            daysToDayOfWeek + = 7;
        }

        adjustedMoment = local__createLocal（mom）.
        add（daysToDayOfWeek，'d'）;
        返回
        {
            周：Math.ceil（adjustedMoment.dayOfYear（）/ 7），
            年：adjustMoment.year（）
        }
        ;
    }

    // LOCALES

    function localeWe​​ek（mom）{
        return weekOfYear（mom，this._week.dow，this._week.doy）.
        week;
    }

    var defaultLocaleWe​​ek = {
        道：0，//星期日是一周的第一天。
    doy：6 //包含1月1日的一周是一年中的第一周。
}
    ;

    function localeFirstDayOfWeek（）{
        返回this._week.dow;
    }

    function localeFirstDayOfYear（）{
        返回this._week.doy;
    }

    // MOMENTS

    function getSetWeek（input）{
        var week = this.localeData（）。week（this）;
        return input == null？周：this.add（（输入 - 周）*
        7，'d'）;
    }

    function getSetISOWeek（input）{
        var week = weekOfYear（this，1, 4）.
        week;
        return input == null？周：this.add（（输入 - 周）*
        7，'d'）;
    }

    addFormatToken（'DDD'，['DDDD'，3
]，'DDDo'，'dayOfYear'）;

    // ALIASES

    addUnitAlias（'dayOfYear'，'DDD'）;

    // PARSING

    addRegexToken（'DDD'，match1to3）;
    addRegexToken（'DDDD'，match3）;
    addParseToken（['DDD'，'DDDD'
]，function（input，array，config）{
        config._dayOfYear = toInt（输入）;
    }）;

    //帮助

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks（年，周，工作日，firstDayOfWeekOfYear，firstDayOfWeek）{
        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear，janX = createUTCDate（year，0, 1 + week1Jan），d = janX.getUTCDay（），dayOfYear;
        if（
        d < firstDayOfWeek）{
            d + = 7;
        }

        工作日 = 工作日！= null？1 * 工作日：firstDayOfWeek;

        dayOfYear = 1 + week1Jan + 7 *（week - 1） -d + 工作日;

        返回
        {
            年：dayOfYear > 0？年：年 - 1，
            dayOfYear：dayOfYear > 0？dayOfYear：daysInYear（year - 1）+dayOfYear
        }
        ;
    }

    // MOMENTS

    function getSetDayOfYear（input）{
        var dayOfYear = Math.round（（this.clone（）。startOf（'day'） -this.clone（）。startOf（'year'））/ 864e5）+ 1;
        return input == null？dayOfYear：this.add（（input - dayOfYear），'d'）;
    }

    //选择第一个定义的两个或三个参数。
    函数默认值（a，b，c）{
        if（
        a！= null）{
            返回;
        }
        if（
        b！= null）{
            返回b;
        }
        返回c;
    }

    function currentDateArray（config）{
        var now = new Date（）;
        if（
        config._useUTC）{
            return [now.getUTCFullYear（），now.getUTCMonth（），now.getUTCDate（）]
            ;
        }
        return [now.getFullYear（），now.getMonth（），now.getDate（）]
        ;
    }

    //将数组转换为日期。
    //数组应该反映下面的参数
    //注意：过去一年中的所有值都是可选的，并且默认为可能的最低值。
    // [年，月，日，小时，分钟，秒，毫秒]
    function configFromArray（config）{
        var i，date，input = []，currentDate，yearToUse;

        if（
        config._d）{
            返回;
        }

        currentDate = currentDateArray（config）;

        //从星期和工作日计算一年中的某一天
        if（
        config._w && config._a [DATE] == null && config._a [MONTH] == null）{
            dayOfYearFromWeekInfo（配置）;
        }

        //如果设置了一年中的某一天，请确定它是什么
        if（
        config._dayOfYear）{
            yearToUse = defaults（config._a [YEAR]，currentDate [YEAR]）;

            if（
            config._dayOfYear > daysInYear（yearToUse））{
                getParsingFlags（config）.
                _
                overflowDayOfYear = true;
            }

            date = createUTCDate（yearToUse，0，config._dayOfYear）;
            config._a [MONTH] = date.getUTCMonth（）;
            config._a [DATE] = date.getUTCDate（）;
        }

        //默认为当前日期。
        // *如果没有给出年，月，日，则默认为今天
        // *如果给出了月份，则默认月份和年份
        // *如果给出月份，则默认仅为年份
        // *如果给出年份，不要默认任何东西
        for（
        i = 0;
        i < 3 && config._a [i] == null;
        ++i）{
            config._a [i] = input [i] = currentDate [i];
        }

        //将任何未默认的内容归零，包括时间
        for（
        ;i < 7;
        i++）{
            config._a [i] = input [i] =（config._a [i] == null）？（i === 2？1：0）：config._a [i];
        }

        //检查24：00：00.000
        if（
        config._a [HOUR] === 24 &&
        config._a [MINUTE] === 0 &&
        config._a [SECOND] === 0 &&
        config._a [MILLISECOND] === 0）{
            config._nextDay = true;
            config._a [HOUR] = 0;
        }

        config._d =（config._useUTC？createUTCDate：createDate）.
        apply（null，input）;
        //从输入中应用时区偏移量。实际的utcOffset可以更改
        //使用parseZone。
        if（
        config._tzm！= null）{
            config._d.setUTCMinutes（config._d.getUTCMinutes（） -config._tzm）;
        }

        if（
        config._nextDay）{
            config._a [HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo（config）{
        var w，weekYear，week，weekday，dow，doy，temp;

        w = config._w;
        if（
        w.GG！= null || wW！= null || wE！= null）{
            dow = 1;
            doy = 4;

            // TODO：我们需要采用当前的isoWeekYear，但这取决于
            //我们现在如何解释（本地，utc，固定偏移）。所以创造
            //现在版本的当前配置（取本地/ utc /偏移标志，和
            //立即创建）。
            weekYear = defaults（w.GG，config._a [YEAR]，weekOfYear（local__createLocal（），1, 4）.
            year）;
            week = 默认值（wW，1）;
            weekday = defaults（wE，1）;
        }
    else
        {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults（w.gg，config._a [YEAR]，weekOfYear（local__createLocal（），dow，doy）.
            year）;
            week = 默认值（ww，1）;

            if（
            wd！= null）{
            //工作日 - 下周将考虑低日数
            工作日 = wd;
            if（
            weekday < dow）{
                本周++;
            }
        }
        else
            if（
            we！= null）{
            //当地工作日 - 计算从一周开始算起
            工作日 = 我们 + dow;
        }
        else
            {
                //默认开始一周
                工作日 = dow;
            }
        }
        temp = dayOfYearFromWeeks（weekYear，week，weekday，doy，dow）;

        config._a [YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    utils_hooks__hooks.ISO_8601 = function（）{
    }
    ;

    //来自字符串和格式字符串的日期
    function configFromStringAndFormat（config）{
        // TODO：将其移动到创建流程的另一部分以防止循环deps
        if（
        config._f === utils_hooks__hooks.ISO_8601）{
            configFromISO（配置）;
            返回;
        }

        config._a = [];
        getParsingFlags（config）.
        empty = true;

        //这个数组用于生成一个Date，可以使用`new Date`或`Date.UTC`
        var string = '' + config._i，
            i，parsedInput，tokens，token，skipped，
            stringLength = string.length，
            totalParsedInputLength = 0;

        tokens = expandFormat（config._f，config._locale）.
        match（formattingTokens）||
        [];

        for（
        i = 0;
        i < tokens.length;
        i++）{
            token = tokens [i];
            parsedInput =（string.match（getParseRegexForToken（token，config））||
            []）[0];
            if（
            parsedInput）{
                skipped = string.substr（0，string.indexOf（parsedInput））;
                if（
                skipped.length > 0）{
                    getParsingFlags（配置）.
                    unusedInput.push（跳过）;
                }
                string = string.slice（string.indexOf（parsedInput）+parsedInput.length）;
                totalParsedInputLength + = parsedInput.length;
            }
            //如果它不是已知令牌，则不解析
            if（
            formatTokenFunctions [token]）{
                if（
                parsedInput）{
                    getParsingFlags（config）.
                    empty = false;
                }
                其他
                {
                    getParsingFlags（配置）.
                    unusedTokens.push（令牌）;
                }
                addTimeToArrayFromToken（token，parsedInput，config）;
            }
        else
            if（
            config._strict &&！parsedInput）{
                getParsingFlags（配置）.
                unusedTokens.push（令牌）;
            }
        }

        //将剩余的未解析的输入长度添加到字符串中
        getParsingFlags（config）.
        charsLeftOver = stringLength - totalParsedInputLength;
        if（
        string.length > 0）{
            getParsingFlags（配置）.
            unusedInput.push（字符串）;
        }

        //如果小时<= 12，则清除_12h标志
        if（
        getParsingFlags（config）.
        bigHour === true &&
        config._a [HOUR] <= 12 &&
        config._a [HOUR] > 0）{
            getParsingFlags（config）.
            bigHour = undefined;
        }
        //处理meridiem
        config._a [HOUR] = meridiemFixWrap（config._locale，config._a [HOUR]，config._meridiem）;

        configFromArray（配置）;
        checkOverflow（配置）;
    }


    function meridiemFixWrap（locale，hour，meridiem）{
        var isPm;

        if（
        meridiem == null）{
            // 没事做
            返回时间;
        }
        if（
        locale.meridiemHour！= null）{
            return locale.meridiemHour（hour，meridiem）;
        }
    else
        if（
        locale.isPM！= null）{
            // 倒退
            isPm = locale.isPM（meridiem）;
            if（
            isPm && hour < 12）{
                小时 + = 12;
            }
            if（！isPm && hour === 12）{
                小时 = 0;
            }
            返回时间;
        }
    else
        {
            //这不应该发生
            返回时间;
        }
    }

    function configFromStringAndArray（config）{
        var tempConfig，
            bestMoment，

            scoreToBeat，
            一世，
            currentScore;

        if（
        config._f.length === 0）{
            getParsingFlags（config）.
            invalidFormat = true;
            config._d = 新日期（NaN）;
            返回;
        }

        for（
        i = 0;
        i < config._f.length;
        i++）{
            currentScore = 0;
            tempConfig = copyConfig（{
            }，config）;
            if（
            config._useUTC！= null）{
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f [i];
            configFromStringAndFormat（tempConfig）;

            if（！valid__isValid（tempConfig））{
                继续;
            }

            //如果有任何未解析的输入，则为该格式添加惩罚
            currentScore + = getParsingFlags（tempConfig）.
            charsLeftOver;

            //或代币
            currentScore + = getParsingFlags（tempConfig）.
            unusedTokens.length * 10;

            getParsingFlags（tempConfig）.
            score = currentScore;

            if（
            scoreToBeat == null || currentScore < scoreToBeat）{
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend（config，bestMoment || tempConfig）;
    }

    function configFromObject（config）{
        if（
        config._d）{
            返回;
        }

        var i = normalizeObjectUnits（config._i）;
        config._a = [i.year，i.month，i.day || i.date，i.hour，i.minute，i.second，i.millisecond
    ]
        ;

        configFromArray（配置）;
    }

    function createFromConfig（config）{
        var res = new Moment（checkOverflow（prepareConfig（config）））;
        if（
        res._nextDay）{
            //在DST周围添加足够聪明
            res.add（1，'d'）;
            res._nextDay = undefined;
        }

        返回资源;
    }

    function prepareConfig（config）{
        var input = config._i，
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale（config._l）;

        if（
        input === null ||（format === undefined && input === ''））{
            return valid__createInvalid（{
                nullInput：true
            }）;
        }

        if（
        typeof input === 'string'）{
            config._i = input = config._locale.preparse（input）;
        }

        if（
        isMoment（input））{
            返回新时刻（checkOverflow（输入））;
        }
    else
        if（
        isArray（format））{
            configFromStringAndArray（配置）;
        }
    else
        if（
        format）{
            configFromStringAndFormat（配置）;
        }
    else
        if（
        isDate（input））{
            config._d = 输入;
        }
    else
        {
            configFromInput（配置）;
        }

        return config;
    }

    function configFromInput（config）{
        var input = config._i;
        if（
        input === undefined）{
            config._d = new Date（）;
        }
    else
        if（
        isDate（input））{
            config._d = 新日期（+输入）;
        }
    else
        if（
        typeof input === 'string'）{
            configFromString（配置）;
        }
    else
        if（
        isArray（input））{
            config._a = map（input.slice（0），function（obj）{
                return parseInt（obj，10）;
            }）;
            configFromArray（配置）;
        }
    else
        if（
        typeof（input）===
        'object'）{
            configFromObject（配置）;
        }
    else
        if（
        typeof（input）===
        'number'）{
            //从毫秒开始
            config._d = new Date（输入）;
        }
    else
        {
            utils_hooks__hooks.createFromInputFallback（配置）;
        }
    }

    function createLocalOrUTC（input，format，locale，strict，isUTC）{
        var c = {};

        if（
        typeof（locale）===
        'boolean'）{
            strict = locale;
            locale = undefined;
        }
        //对象构造必须以这种方式完成。
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = 输入;
        c._f = 格式;
        c._strict = strict;

        return createFromConfig（c）;
    }

    function local__createLocal（input，format，locale，strict）{
        return createLocalOrUTC（input，format，locale，strict，false）;
    }

    var prototypeMin = deprecate（
         'moment（）。min已弃用，请改用moment.min。https://github.com/moment/moment/issues/1548' ，
         function（）{
        var other = local__createLocal.apply（null，arguments）;
        返回其他 < this？这个：其他;
    }
     ）;

    var prototypeMax = deprecate（
        'moment（）。max已弃用，请改用moment.max。https://github.com/moment/moment/issues/1548' ，
        function（）{
        var other = local__createLocal.apply（null，arguments）;
        返回其他 > 这个？这个：其他;
    }
    ）;

    //从片刻中选择片刻，以便m [fn]（其他）对所有人都适用
    //其他 这依赖于函数fn是可传递的。
    //
    //时刻应该是一个时刻对象数组或一个数组，其中
    //第一个元素是一个矩形对象的数组。
    function pickBy（fn，moments）{
        var res，i;
        if（
        moments.length === 1 && isArray（moments [0]））{
            时刻 = 时刻[0];
        }
        if（！moments.length）{
            return local__createLocal（）;
        }
        res = moment [0];
        for（
        i = 1;
        i < moments.length;
        ++i）{
            if（！moments [i].isValid（）||
            moments [i] [fn]（res））{
                res = moment [i];
            }
        }
        返回资源;
    }

    // TODO：使用[] .sort代替？
    function min（）{
        var args = [].slice.call（arguments，0）;

        return pickBy（'isBefore'，args）;
    }

    function max（）{
        var args = [].slice.call（arguments，0）;

        return pickBy（'isAfter'，args）;
    }

    function持续时间（持续时间）{
        var normalizedInput = normalizeObjectUnits（duration），
            years = normalizedInput.year || 0，
            quarters = normalizedInput.quarter || 0，
            months = normalizedInput.month || 0，
            周 = normalizedInput.week || 0，
            days = normalizedInput.day || 0，
            hours = normalizedInput.hour || 0，
            minutes = normalizedInput.minute || 0，
            seconds = normalizedInput.second || 0，
            毫秒 = normalizedInput.millisecond || 0;

        // dateAddRemove的表示
        this._milliseconds = +毫秒 +
            秒 * 1e3 + // 1000
            分钟 * 6e4 + // 1000 * 60
            小时 * 36e5; // 1000 * 60 * 60
        //因为dateAddRemove将24小时视为与a不同
        //当我在DST工作时，我们需要单独存储它们
        this._days = +天 +
            周 * 7;
        //在不知情的情况下翻译几个月是不可能的
        //你正在谈论几个月，所以我们必须存储
        //它分开
        this._months = +months +
            宿舍 * 3 +
            年 * 12;

        this._data = {};

        this._locale = locale_locales__getLocale（）;

        this._bubble（）;
    }

    function isDuration（obj）{
        return obj instanceof Duration;
    }

    function offset（token，separator）{
        addFormatToken（token，0, 0，function（）{
            var offset = this.utcOffset（）;
            var sign = '+';
            if（
            offset < 0）{
                offset = -offset;
                sign = ' - ';
            }
            return sign + zeroFill（~~（offset / 60），2）+separator + zeroFill（~~（offset）％60, 2）;
        }）;
    }

    offset（'Z'，'：'）;
    offset（'ZZ'，''）;

    // PARSING

    addRegexToken（'Z'，matchOffset）;
    addRegexToken（'ZZ'，matchOffset）;
    addParseToken（['Z'，'ZZ'
]，function（input，array，config）{
        config._useUTC = true;
        config._tzm = offsetFromString（输入）;
    }）;

    //帮助

    // timezone chunker
    //'+10：00'> ['10'，'00']
    //'-1530'> [' -  15'，'30']
    var chunkOffset = /（[\ + \  - ] | \ d \ d）/
    gi;

    function offsetFromString（string）{
        var matches =（（string || ''）。match（matchOffset）||
        []）;
        var chunk = matches [matches.length - 1] || [];
        var parts =（chunk + ''）。match（chunkOffset）||
        [' - '，0, 0
    ]
        ;
        var minutes = +（parts [1] * 60）+toInt（parts [2]）;

        返回部分[0] === '+'？分钟： -分钟;
    }

    //从输入返回片刻，即本地/ utc / zone等效于model。
    function cloneWithOffset（input，model）{
        var res，diff;
        if（
        model._isUTC）{
            res = model.clone（）;
            diff =（isMoment（input）||
            isDate（input）？+input：+local__createLocal（input）） - （+res）;
            //使用低级api，因为这个fn是低级api。
            res._d.setTime（+res._d + diff）;
            utils_hooks__hooks.updateOffset（res，false）;
            返回资源;
        }
    else
        {
            return local__createLocal（input）.
            local（）;
        }
    }

    function getDateOffset（m）{
        //在Firefox.24上日期#getTimezoneOffset返回一个浮点。
        // https://github.com/moment/moment/pull/1871
        return -Math.round（m._d.getTimezoneOffset（）/ 15）* 15;
    }

    // HOOKS

    //每当片刻发生变异时都会调用此函数。
    //旨在使偏移量与时区保持同步。
    utils_hooks__hooks.updateOffset = function（）{
    }
    ;

    // MOMENTS

    // keepLo​​calTime = true表示只更改时区，而不是
    //影响当地时间。所以5:31:26 +0300  -  [utcOffset（2，true）]  - >
    // 5:31:26 +0200 5:31:26可能不存在偏移量
    // +0200，所以我们根据需要调整时间，使其有效。
    //
    //保持时间实际增加/减少（一小时）
    //来自实际表示的时间。这就是我们调用updateOffset的原因
    //第二次 如果它希望我们再次改变偏移量
    // _changeInProgress == true case，那么我们必须调整，因为
    //在给定的时区内没有这样的时间。
    function getSetOffset（input，keepLo​​calTime）{
        var offset = this._offset || 0，
            localAdjust;
        if（
        input！= null）{
            if（
            typeof input === 'string'）{
                input = offsetFromString（input）;
            }
            if（
            Math.abs（input）<
            16）{
                input = input * 60;
            }
            if（！this._isUTC && keepLo​​calTime）{
                localAdjust = getDateOffset（this）;
            }
            this._offset = 输入;
            this._isUTC = true;
            if（
            localAdjust！= null）{
                this.add（localAdjust，'m'）;
            }
            if（
            offset！==
            input）{
                if（！keepLo​​calTime || this._changeInProgress）{
                    add_subtract__addSubtract（this，create__createDuration（input - offset，'m'），1，false）;
                }
            else
                if（！this._changeInProgress）{
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset（this，true）;
                    this._changeInProgress = null;
                }
            }
            归还这个;
        }
    else
        {
            返回this._isUTC？offset：getDateOffset（this）;
        }
    }

    function getSetZone（input，keepLo​​calTime）{
        if（
        input！= null）{
            if（
            typeof input！==
            'string'）{
                input = -input;
            }

            this.utcOffset（input，keepLo​​calTime）;

            归还这个;
        }
    else
        {
            return -this.utcOffset（）;
        }
    }

    function setOffsetToUTC（keepLo​​calTime）{
        return this.utcOffset（0，keepLo​​calTime）;
    }

    function setOffsetToLocal（keepLo​​calTime）{
        if（
        this._isUTC）{
            this.utcOffset（0，keepLo​​calTime）;
            this._isUTC = false;

            if（
            keepLo​​calTime）{
                this.subtract（getDateOffset（this），'m'）;
            }
        }
        归还这个;
    }

    function setOffsetToParsedOffset（）{
        if（
        this._tzm）{
            this.utcOffset（this._tzm）;
        }
    else
        if（
        typeof this._i === 'string'）{
            this.utcOffset（offsetFromString（this._i））;
        }
        归还这个;
    }

    function hasAlignedHourOffset（input）{
        输入 = 输入？local__createLocal（input）.
        utcOffset（）：0;

        return（this.utcOffset（） -input）％60 === 0;
    }

    function isDaylightSavingTime（）{
        回来（
            this.utcOffset（）>
        this.clone（）。month（0）.
        utcOffset（）||
        this.utcOffset（）>
        this.clone（）。month（5）.
        utcOffset（）
    ）;
    }

    function isDaylightSavingTimeShifted（）{
        if（
        typeof this._isDSTShifted！==
        'undefined'）{
            返回this._isDSTShifted;
        }

        var c = {};

        copyConfig（c，this）;
        c = prepareConfig（c）;

        if（
        c._a）{
            var other = c._isUTC？create_utc__createUTC（c._a）：local__createLocal（c._a）;
            this._isDSTShifted = this.isValid（）&&
            compareArrays（c._a，other.toArray（））>
            0;
        }
    else
        {
            this._isDSTShifted = false;
        }

        返回this._isDSTShifted;
    }

    function isLocal（）{
        return！this._isUTC;
    }

    function isUtcOffset（）{
        返回this._isUTC;
    }

    function isUtc（）{
        返回this._isUTC && this._offset === 0;
    }

    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3}） ？）/？;

    //来自http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    //稍微符合4.4.3.2 2004规范，但允许在任何地方使用小数
    var create__isoRegex = / ^（ - ）？P（？:(？：（[0-9，。] *）Y）？（？:( [0-9，。] *）M）？（？:( [ 0-9，*）d）（？：T（：（[0-9，] *）。ΔH）？（？：（[0-9，] *）M）（？：？ ？（[0-9，*）S））|（[0-9。] *）W）$ /;

    function create__createDuration（input，key）{
        var duration = 输入，
        //与regexp匹配是昂贵的，按需执行
        match = null，
            标志，
            RET，
            diffRes;

        if（
        isDuration（input））{
            duration = {
                ms：input._milliseconds，
                d：input._days，
                M：input._months
        }
            ;
        }
    else
        if（
        typeof input === 'number'）{
            duration = {};
            if（
            key）{
                持续时间[key] = 输入;
            }
        else
            {
                duration.milliseconds = 输入;
            }
        }
    else
        if（
        !!（match = aspNetRegex.exec（input）））{
            sign =（匹配[1] === ' - '）？-1：1;
            duration = {
                y：0，
                d：toInt（匹配[DATE]）*
            符号，
                h：toInt（匹配[HOUR]）*
            符号，
                m：toInt（匹配[MINUTE]）*
            符号，
                s：toInt（匹配[SECOND]）*
            符号，
                ms：toInt（匹配[MILLISECOND]）*
            符号
        }
            ;
        }
    else
        if（
        !!（match = create__isoRegex.exec（input）））{
            sign =（匹配[1] === ' - '）？-1：1;
            duration = {
                y：parseIso（匹配[2]，符号），
                M：parseIso（匹配[3]，符号），
                d：parseIso（匹配[4]，符号），
                h：parseIso（匹配[5]，符号），
                m：parseIso（匹配[6]，符号），
                s：parseIso（匹配[7]，符号），
                w：parseIso（匹配[8]，符号）
        }
            ;
        }
    else
        if（
        duration == null）{//检查null或undefined
            duration = {};
        }
    else
        if（
        typeof duration === 'object' &&（'from' in duration || 'to' in duration））{
            diffRes = momentsDifference（local__createLocal（duration.from），local__createLocal（duration.to））;

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new持续时间（持续时间）;

        if（
        isDuration（input）&&
        hasOwnProp（input，'_locale'））{
            ret._locale = input._locale;
        }

        返回;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso（inp，sign）{
        //我们通常会使用~~ inp，但不幸的是它也是
        //将浮点数转换为整数。
        // inp可能是未定义的，所以要小心调用replace。
        var res = inp && parseFloat（inp.replace（'，'，'。'））;
        //在我们的时候申请签名
        return（isNaN（res）？0：res）*
        sign;
    }

    function positiveMomentsDifference（base，other）{
        var res = {毫秒：0，月：0
    }
        ;

        res.months = other.month（） -base.month（）+
            （other.year（） -base.year（））*
        12;
        if（
        base.clone（）。add（res.months，'M'）。isAfter（other））{
            --res.months;
        }

        res.milliseconds = +other - +（base.clone（）。add（res.months，'M'））;

        返回资源;
    }

    function momentsDifference（base，other）{
        var res;
        other = cloneWithOffset（other，base）;
        if（
        base.isBefore（other））{
            res = positiveMomentsDifference（base，other）;
        }
    else
        {
            res = positiveMomentsDifference（other，base）;
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        返回资源;
    }

    function createAdder（direction，name）{
        return函数（val，period）{
            var dur，tmp;
            //反转参数，但抱怨它
            if（
            句号！==
            null &&！isNaN（+句号））{
                deprecateSimple（name，'moment（）。' + name + '（句号，数字）不推荐使用。请使用moment（）。' + name + '（number，period）。'）;
                tmp = val;
                val = 期间;
                period = tmp;
            }

            val = typeof val === 'string'？+val：val;
            dur = create__createDuration（val，period）;
            add_subtract__addSubtract（this，dur，direction）;
            归还这个;
        }
        ;
    }

    function add_subtract__addSubtract（mom，duration，isAdding，updateOffset）{
        var milliseconds = duration._milliseconds，
            天 = duration._days，
            months = duration._months;
        updateOffset = updateOffset == null？true：updateOffset;

        if（
        毫秒）{
            mom._d.setTime（+mom._d + milliseconds * isAdding）;
        }
        if（
        days）{
            get_set__set（mom，'Date'，get_set__get（mom，'Date'）+days * isAdding）;
        }
        if（
        个月）{
            setMonth（mom，get_set__get（mom，'Month'）+months * isAdding）;
        }
        if（
        updateOffset）{
            utils_hooks__hooks.updateOffset（妈妈，天 || 个月）;
        }
    }

    var add_subtract__add = createAdder（1，'add'）;
    var add_subtract__subtract = createAdder（-1，'subtract'）;

    function moment_calendar__calendar（time，formats）{
        //我们想比较今天的开始，与此相比。
        //今天开始取决于我们是否是本地/ utc /偏移量。
        var now = time || local__createLocal（）
            sod = cloneWithOffset（现在，这个）.
        startOf（'day'），
            diff = this.diff（sod，'days'，true），
            format = diff < -6？'sameElse'：
                diff < -1？'上个星期' ：
                差异 < 0？'最后一天' ：
                差异 < 1？'同一天' ：
                差异 < 2？'明天' ：
                差异 < 7？'nextWeek'：'sameElse';
        return this.format（formats && formats [format] || this.localeData（）。calendar（format，this，local__createLocal（now）））;
    }

    function clone（）{
        返回新的时刻（这）;
    }

    function isAfter（input，units）{
        var inputMs;
        units = normalizeUnits（typeof units！==
        'undefined'？units：'millisecond'）;
        if（
        units === 'millisecond'）{
            input = isMoment（输入）？输入：local__createLocal（输入）;
            return +this > +input;
        }
    else
        {
            inputMs = isMoment（输入）？+输入：+local__createLocal（输入）;
            return inputMs < +this.clone（）。startOf（units）;
        }
    }

    function isBefore（input，units）{
        var inputMs;
        units = normalizeUnits（typeof units！==
        'undefined'？units：'millisecond'）;
        if（
        units === 'millisecond'）{
            input = isMoment（输入）？输入：local__createLocal（输入）;
            return +this < +input;
        }
    else
        {
            inputMs = isMoment（输入）？+输入：+local__createLocal（输入）;
            return +this.clone（）。endOf（units）<
            inputMs;
        }
    }

    function isBetween（from，to，units）{
        返回this.isAfter（from，units）&&
        this.isBefore（to，units）;
    }

    function isSame（input，units）{
        var inputMs;
        units = normalizeUnits（units || 'millisecond'）;
        if（
        units === 'millisecond'）{
            input = isMoment（输入）？输入：local__createLocal（输入）;
            return +this === +input;
        }
    else
        {
            inputMs = +local__createLocal（input）;
            return +（this.clone（）。startOf（units））<
            = inputMs && inputMs <= +（this.clone（）。endOf（units））;
        }
    }

    function diff（input，units，asFloat）{
        var that = cloneWithOffset（input，this），
            zoneDelta =（that.utcOffset（） -this.utcOffset（））*
        6e4，
            三角洲，输出;

        units = normalizeUnits（units）;

        if（
        单位 === '年' || 单位 === '月' || 单位 === '季'）{
            output = monthDiff（this，that）;
            if（
            units === 'quarter'）{
                output = output / 3;
            }
        else
            if（
            units === 'year'）{
                output = output / 12;
            }
        }
    else
        {
            delta = this - that;
            输出 = 单位 === '秒'？delta / 1e3：// 1000
            单位 === '分钟'？delta / 6e4：// 1000 * 60
            单位 === '小时'？delta / 36e5：// 1000 * 60 * 60
            单位 === '天'？（delta - zoneDelta）/ 864e5：/
            / 1000 * 60 * 60 * 24，否定dst
            单位 === '周'？（delta - zoneDelta）/ 6048e5：/
            / 1000 * 60 * 60 * 24 * 7，否定dst
            三角洲;
        }
        返回asFloat？输出：absFloor（输出）;
    }

    function monthDiff（a，b）{
        //几个月的差异
        var wholeMonthDiff =（（b.year（） -a.year（））*
        12）+（b.month（） -a.month（）），
        // b在（锚点 -  1个月，锚点+ 1个月）
        anchor = a.clone（）。add（wholeMonthDiff，'months'），
            锚2，调整;

        if（
        b - anchor < 0）{
            anchor2 = a.clone（）。add（wholeMonthDiff - 1，'months'）;
            //整个月都是线性的
            adjust =（b - anchor）/（anchor  -  anchor2）;
        }
    else
        {
            anchor2 = a.clone（）。add（wholeMonthDiff + 1，'months'）;
            //整个月都是线性的
            adjust =（b - anchor）/（anchor2  -  anchor）;
        }

        return - （wholeMonthDiff + adjust）;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH：mm：ssZ';

    function toString（）{
        return this.clone（）。locale（'en'）。format（'ddd MMM DD YYYY HH：mm：ss [GMT] ZZ'）;
    }

    function moment_format__toISOString（）{
        var m = this.clone（）。utc（）;
        if（
        0 < m.year（）&&
        m.year（）<
        = 9999）{
            if（
            'function' === typeof Date.prototype.toISOString）{
                //本机实现速度提高约50倍，我们可以使用它
                return this.toDate（）。toISOString（）;
            }
        else
            {
                return formatMoment（m，'YYYY-MM-DD [T] HH：mm：ss.SSS [Z]'）;
            }
        }
    else
        {
            return formatMoment（m，'YYYYYY-MM-DD [T] HH：mm：ss.SSS [Z]'）;
        }
    }

    function moment_format__format（inputString）{
        var output = formatMoment（this，inputString || utils_hooks__hooks.defaultFormat）;
        return this.localeData（）。postformat（output）;
    }

    函数from（time，withoutSuffix）{
        if（！this.isValid（））{
            return this.localeData（）。invalidDate（）;
        }
        return create__createDuration（{
            to：this，from：time
        }）。locale（this.locale（））。humanize（！withoutSuffix）;
    }

    函数fromNow（withoutSuffix）{
        return this.from（local__createLocal（），withoutSuffix）;
    }

    function to（time，withoutSuffix）{
        if（！this.isValid（））{
            return this.localeData（）。invalidDate（）;
        }
        return create__createDuration（{
            from：this，to：time
        }）。locale（this.locale（））。humanize（！withoutSuffix）;
    }

    function toNow（withoutSuffix）{
        return this.to（local__createLocal（），withoutSuffix）;
    }

    function locale（key）{
        var newLocaleData;

        if（
        key === undefined）{
            return this._locale._abbr;
        }
    else
        {
            newLocaleData = locale_locales__getLocale（key）;
            if（
            newLocaleData！= null）{
            this._locale = newLocaleData;
        }
            归还这个;
        }
    }

    var lang = deprecate（
        'moment（）。lang（）已弃用。相反，使用moment（）。localeData（）来获取语言配置。使用moment（）。locale（）来改变语言。'，
        function（key）{
        if（
        key === undefined）{
            return this.localeData（）;
        }
    else
        {
            return this.locale（key）;
        }
    }
    ）;

    function localeData（）{
        返回this._locale;
    }

    function startOf（units）{
        units = normalizeUnits（units）;
        //以下开关故意省略break关键字
        //利用案件中的堕落
        开关（单位）{
            案例
            '年'：
            this.month（0）;
            / *通过* /
            案例
            '季'：
        案例
            '月'：
            this.date（1）;
            / *通过* /
            案例
            '周'：
        案例
            'isoWeek'：
        案例
            '天'：
            this.hours（0）;
            / *通过* /
            案例
            '小时'：
            this.minutes（0）;
            / *通过* /
            案例
            '分钟'：
            this.seconds（0）;
            / *通过* /
            案件
            '第二'：
            this.milliseconds（0）;
        }

        //周是一个特例
        if（
        units === 'week'）{
            这个.weekday（0）;
        }
        if（
        units === 'isoWeek'）{
            this.isoWeekday（1）;
        }

        //季度也很特别
        if（
        units === 'quarter'）{
            this.month（Math.floor（this.month（）/ 3）* 3）;
        }

        归还这个;
    }

    function endOf（units）{
        units = normalizeUnits（units）;
        if（
        units === undefined || units === 'millisecond'）{
            归还这个;
        }
        return this.startOf（units）.
        add（1，（units === 'isoWeek'？'week'：units））。subtract（1，'ms'）;
    }

    function to_type__valueOf（）{
        return +this._d - （（this._offset || 0）*
        60000）;
    }

    function unix（）{
        返回Math.floor（+this / 1000）;
    }

    function toDate（）{
        返回this._offset？新日期（+this）：this._d;
    }

    function toArray（）{
        var m = this;
        return [m.year（），m.month（），m.date（），m.hour（），m.minute（），m.second（），m.millisecond（）]
        ;
    }

    function toObject（）{
        var m = this;
        返回
        {
            年：m.year（），
            月：m.month（），
            date：m.date（），
            小时：m.hours（），
            分钟：m.minutes（），
            秒：m.seconds（），
            毫秒：m.milliseconds（）
        }
        ;
    }

    function moment_valid__isValid（）{
        return valid__isValid（this）;
    }

    function parsingFlags（）{
        return extend（{
        }，getParsingFlags（this））;
    }

    function invalidAt（）{
        return getParsingFlags（this）.
        overflow;
    }

    addFormatToken（0，['gg'，2
]，0，function（）{
        return this.weekYear（）％100;
    }）;

    addFormatToken（0，['GG'，2
]，0，function（）{
        return this.isoWeekYear（）％100;
    }）;

    function addWeekYearFormatToken（token，getter）{
        addFormatToken（0，[token，token.length
    ]，0，getter）;
    }

    addWeekYearFormatToken（'gggg'，'weekYear'）;
    addWeekYearFormatToken（'ggggg'，'weekYear'）;
    addWeekYearFormatToken（'GGGG'，'isoWeekYear'）;
    addWeekYearFormatToken（'GGGGG'，'isoWeekYear'）;

    // ALIASES

    addUnitAlias（'weekYear'，'gg'）;
    addUnitAlias（'isoWeekYear'，'GG'）;

    // PARSING

    addRegexToken（'G'，matchSigned）;
    addRegexToken（'g'，matchSigned）;
    addRegexToken（'GG'，match1to2，match2）;
    addRegexToken（'gg'，match1to2，match2）;
    addRegexToken（'GGGG'，match1to4，match4）;
    addRegexToken（'gggg'，match1to4，match4）;
    addRegexToken（'GGGGG'，match1to6，match6）;
    addRegexToken（'ggggg'，match1to6，match6）;

    addWeekParseToken（['gggg'，'ggggg'，'GGGG'，'GGGGG'
]，函数（输入，周，配置，令牌）{
        周[token.substr（0, 2）]
        = toInt（输入）;
    }）;

    addWeekParseToken（['gg'，'GG'
]，function（input，week，config，token）{
        week [token] = utils_hooks__hooks.parseTwoDigitYear（输入）;
    }）;

    //帮助

    function weekInYear（year，dow，doy）{
        return weekOfYear（local__createLocal（[year，11, 31 + dow - doy
    ]），dow，doy）.
        week;
    }

    // MOMENTS

    function getSetWeekYear（input）{
        var year = weekOfYear（this，this.localeData（）.
        _
        week.dow，this.localeData（）.
        _
        week.doy）.
        year;
        return input == null？year：this.add（（输入 - 年份），'y'）;
    }

    function getSetISOWeekYear（input）{
        var year = weekOfYear（this，1, 4）.
        year;
        return input == null？year：this.add（（输入 - 年份），'y'）;
    }

    function getISOWeeksInYear（）{
        return weeksInYear（this.year（），1, 4）;
    }

    function getWeeksInYear（）{
        var weekInfo = this.localeData（）.
        _
        week;
        return weeksInYear（this.year（），weekInfo.dow，weekInfo.doy）;
    }

    addFormatToken（'Q'，0, 0，'quarter'）;

    // ALIASES

    addUnitAlias（'quarter'，'Q'）;

    // PARSING

    addRegexToken（'Q'，match1）;
    addParseToken（'Q'，function（input，array）{
        array [MONTH] =（toInt（输入） -1）*
        3;
    }）;

    // MOMENTS

    function getSetQuarter（input）{
        return input == null？Math.ceil（（this.month（）+1）/ 3）：this.month（（input  -  1）* 3 + this.month（）％3）;
    }

    addFormatToken（'D'，['DD'，2
]，'Do'，'date'）;

    // ALIASES

    addUnitAlias（'date'，'D'）;

    // PARSING

    addRegexToken（'D'，match1to2）;
    addRegexToken（'DD'，match1to2，match2）;
    addRegexToken（'Do'，function（isStrict，locale）{
        返回是严格的吗？locale._ordinalParse：locale._ordinalParseLenient;
    }）;

    addParseToken（['D'，'DD'
]，DATE）;
    addParseToken（'Do'，function（input，array）{
        array [DATE] = toInt（input.match（match1to2）[0]，10）;
    }）;

    // MOMENTS

    var getSetDayOfMonth = makeGetSet（'Date'，true）;

    addFormatToken（'d'，0，'do'，'day'）;

    addFormatToken（'dd'，0, 0，function（format）{
        return this.localeData（）。weekdaysMin（this，format）;
    }）;

    addFormatToken（'ddd'，0, 0，function（format）{
        return this.localeData（）。weekdaysShort（this，format）;
    }）;

    addFormatToken（'dddd'，0, 0，function（format）{
        return this.localeData（）。weekdays（this，format）;
    }）;

    addFormatToken（'e'，0, 0，'weekday'）;
    addFormatToken（'E'，0, 0，'isoWeekday'）;

    // ALIASES

    addUnitAlias（'day'，'d'）;
    addUnitAlias（'weekday'，'e'）;
    addUnitAlias（'isoWeekday'，'E'）;

    // PARSING

    addRegexToken（'d'，match1to2）;
    addRegexToken（'e'，match1to2）;
    addRegexToken（'E'，match1to2）;
    addRegexToken（'dd'，matchWord）;
    addRegexToken（'ddd'，matchWord）;
    addRegexToken（'dddd'，matchWord）;

    addWeekParseToken（['dd'，'ddd'，'dddd'
]，function（input，week，config）{
        var weekday = config._locale.weekdaysParse（input）;
        //如果我们没有获得工作日名称，请将日期标记为无效
        if（
        weekday！= null）{
            week.d = 工作日;
        }
    else
        {
            getParsingFlags（config）.
            invalidWeekday = input;
        }
    }）;

    addWeekParseToken（['d'，'e'，'E'
]，function（input，week，config，token）{
        周[token] = toInt（输入）;
    }）;

    //帮助

    function parseWeekday（input，locale）{
        if（
        typeof input！==
        'string'）{
            返回输入;
        }

        if（！isNaN（input））{
            return parseInt（input，10）;
        }

        input = locale.weekdaysParse（input）;
        if（
        typeof input === 'number'）{
            返回输入;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWe​​ekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split（'_'）;

    function localeWe​​ekdays（m）{
        返回this._weekdays [m.day（）]
        ;
    }

    var defaultLocaleWe​​ekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split（'_'）;

    function localeWe​​ekdaysShort（m）{
        return this._weekdaysShort [m.day（）]
        ;
    }

    var defaultLocaleWe​​ekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split（'_'）;

    function localeWe​​ekdaysMin（m）{
        返回this._weekdaysMin [m.day（）]
        ;
    }

    function localeWe​​ekdaysParse（weekdayName）{
        var i，妈妈，正则表达式;

        this._weekdaysParse = this._weekdaysParse || [];

        for（
        i = 0;
        i < 7;
        i++）{
            //如果我们还没有它，请制作正则表达式
            if（！this._weekdaysParse [i]）{
                mom = local__createLocal（[2000, 1]）。day（i）;
                regex = '^' + this.weekdays（妈妈，''）+'| ^' + this.weekdaysShort（妈妈，''）+'| ^' + this.weekdaysMin（妈妈，''）;
                this._weekdaysParse [i] = new RegExp（regex.replace（'。'，''），'i'）;
            }
            //测试正则表达式
            if（
            this._weekdaysParse [i].test（weekdayName））{
                回归我;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek（input）{
        var day = this._isUTC？this._d.getUTCDay（）：this._d.getDay（）;
        if（
        input！= null）{
            input = parseWeekday（input，this.localeData（））;
            返回this.add（输入 - 天，'d'）;
        }
    else
        {
            返回日;
        }
    }

    function getSetLocaleDayOfWeek（input）{
        var weekday =（this.day（）+7 - this.localeData（）.
        _
        week.dow）％7;
        return input == null？工作日：this.add（输入 - 工作日，'d'）;
    }

    function getSetISODayOfWeek（input）{
        //表现与时刻#day相同，除了
        //作为一个getter，返回7而不是0（1-7范围而不是0-6）
        //作为一个制定者，星期日应该属于前一周。
        return input == null？this.day（）||
        7：this.day（this.day（）％7？输入：输入 - 7）;
    }

    addFormatToken（'H'，['HH'，2
]，0，'hour'）;
    addFormatToken（'h'，['hh'，2
]，0，function（）{
        返回this.hours（）％12 || 12;
    }）;

    function meridiem（token，lowercase）{
        addFormatToken（token，0, 0，function（）{
            return this.localeData（）。meridiem（this.hours（），this.minutes（），lowercase）;
        }）;
    }

    meridiem（'a'，true）;
    meridiem（'A'，false）;

    // ALIASES

    addUnitAlias（'hour'，'h'）;

    // PARSING

    function matchMeridiem（isStrict，locale）{
        return locale._meridiemParse;
    }

    addRegexToken（'a'，matchMeridiem）;
    addRegexToken（'A'，matchMeridiem）;
    addRegexToken（'H'，match1to2）;
    addRegexToken（'h'，match1to2）;
    addRegexToken（'HH'，match1to2，match2）;
    addRegexToken（'hh'，match1to2，match2）;

    addParseToken（['H'，'HH'
]，HOUR）;
    addParseToken（['a'，'A'
]，function（input，array，config）{
        config._isPm = config._locale.isPM（输入）;
        config._meridiem = 输入;
    }）;
    addParseToken（['h'，'hh'
]，function（input，array，config）{
        array [HOUR] = toInt（输入）;
        getParsingFlags（config）.
        bigHour = true;
    }）;

    // LOCALES

    function localeIsPM（input）{
        // IE8 Quirks Mode和IE7标准模式不允许访问数组之类的字符串
        //使用charAt应该更兼容。
        return（（input + ''）。toLowerCase（）。charAt（0）===
        'p'）;
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

    function localeMeridiem（hours，minutes，isLower）{
        if（
        小时 > 11）{
            返回更低？'pm'：'PM';
        }
    else
        {
            返回更低？'am'：'AM';
        }
    }


    // MOMENTS

    //设置小时应该保留时间，因为用户明确
    //指定他想要的小时。所以试图保持同一小时（在
    //一个新的时区）是有道理的。不会增加/减少小时数
    //这条规则
    var getSetHour = makeGetSet（'Hours'，true）;

    addFormatToken（'m'，['mm'，2
]，0，'minute'）;

    // ALIASES

    addUnitAlias（'分钟'，'m'）;

    // PARSING

    addRegexToken（'m'，match1to2）;
    addRegexToken（'mm'，match1to2，match2）;
    addParseToken（['m'，'mm'
]，MINUTE）;

    // MOMENTS

    var getSetMinute = makeGetSet（'Minutes'，false）;

    addFormatToken（'s'，['ss'，2
]，0，'second'）;

    // ALIASES

    addUnitAlias（'second'，'s'）;

    // PARSING

    addRegexToken（'s'，match1to2）;
    addRegexToken（'ss'，match1to2，match2）;
    addParseToken（['s'，'ss'
]，SECOND）;

    // MOMENTS

    var getSetSecond = makeGetSet（'Seconds'，false）;

    addFormatToken（'S'，0, 0，function（）{
        return ~~（this.millisecond（）/ 100）;
    }）;

    addFormatToken（0，['SS'，2
]，0，function（）{
        return ~~（this.millisecond（）/ 10）;
    }）;

    addFormatToken（0，['SSS'，3
]，0，'毫秒'）;
    addFormatToken（0，['SSSS'，4
]，0，function（）{
        return this.millisecond（）*
        10;
    }）;
    addFormatToken（0，['SSSSS'，5
]，0，function（）{
        return this.millisecond（）*
        100;
    }）;
    addFormatToken（0，['SSSSSS'，6
]，0，function（）{
        return this.millisecond（）*
        1000;
    }）;
    addFormatToken（0，['SSSSSSS'，7
]，0，function（）{
        return this.millisecond（）*
        10000;
    }）;
    addFormatToken（0，['SSSSSSSS'，8
]，0，function（）{
        return this.millisecond（）*
        100000;
    }）;
    addFormatToken（0，['SSSSSSSSS'，9
]，0，function（）{
        return this.millisecond（）*
        1000000;
    }）;


    // ALIASES

    addUnitAlias（'millisecond'，'ms'）;

    // PARSING

    addRegexToken（'S'，match1to3，match1）;
    addRegexToken（'SS'，match1to3，match2）;
    addRegexToken（'SSS'，match1to3，match3）;

    var token;
    for（
    token = 'SSSS';
    token.length <= 9;
    token + = 'S'）{
        addRegexToken（token，matchUnsigned）;
    }

    function parseMs（input，array）{
        array [MILLISECOND] = toInt（（'0。' + input）*
        1000）;
    }

    for（
    token = 'S';
    token.length <= 9;
    token + = 'S'）{
        addParseToken（token，parseMs）;
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet（'Milliseconds'，false）;

    addFormatToken（'z'，0, 0，'zoneAbbr'）;
    addFormatToken（'zz'，0, 0，'zoneName'）;

    // MOMENTS

    function getZoneAbbr（）{
        返回this._isUTC？'世界标准时间' ： '';
    }

    function getZoneName（）{
        返回this._isUTC？'协调世界时'：'';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add = add_subtract__add;
    momentPrototype__proto.calendar = moment_calendar__calendar;
    momentPrototype__proto.clone = clone;
    momentPrototype__proto.diff = diff;
    momentPrototype__proto.endOf = endOf;
    momentPrototype__proto.format = moment_format__format;
    momentPrototype__proto.from = from;
    momentPrototype__proto.fromNow = fromNow;
    momentPrototype__proto.to = to;
    momentPrototype__proto.toNow = toNow;
    momentPrototype__proto.get = getSet;
    momentPrototype__proto.invalidAt = invalidAt;
    momentPrototype__proto.isAfter = isAfter;
    momentPrototype__proto.isBefore = isBefore;
    momentPrototype__proto.isBetween = isBetween;
    momentPrototype__proto.isSame = isSame;
    momentPrototype__proto.isValid = moment_valid__isValid;
    momentPrototype__proto.lang = lang;
    momentPrototype__proto.locale = locale;
    momentPrototype__proto.localeData = localeData;
    momentPrototype__proto.max = prototypeMax;
    momentPrototype__proto.min = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set = getSet;
    momentPrototype__proto.startOf = startOf;
    momentPrototype__proto.subtract = add_subtract__subtract;
    momentPrototype__proto.toArray = toArray;
    momentPrototype__proto.toObject = toObject;
    momentPrototype__proto.toDate = toDate;
    momentPrototype__proto.toISOString = moment_format__toISOString;
    momentPrototype__proto.toJSON = moment_format__toISOString;
    momentPrototype__proto.toString = toString;
    momentPrototype__proto.unix = unix;
    momentPrototype__proto.valueOf = to_type__valueOf;

    // 年
    momentPrototype__proto.year = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    //周年
    momentPrototype__proto.weekYear = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // 25美分硬币
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    //月
    momentPrototype__proto.month = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    //周
    momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek;
    momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek;
    momentPrototype__proto.weeksInYear = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // 天
    momentPrototype__proto.date = getSetDayOfMonth;
    momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek;
    momentPrototype__proto.weekday = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear = getSetDayOfYear;

    //小时
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    //分钟
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    //第二个
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    //毫秒
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    //偏移
    momentPrototype__proto.utcOffset = getSetOffset;
    momentPrototype__proto.utc = setOffsetToUTC;
    momentPrototype__proto.local = setOffsetToLocal;
    momentPrototype__proto.parseZone = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal = isLocal;
    momentPrototype__proto.isUtcOffset = isUtcOffset;
    momentPrototype__proto.isUtc = isUtc;
    momentPrototype__proto.isUTC = isUtc;

    // 时区
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    //弃变
    momentPrototype__proto.dates = deprecate（不推荐使用日期访问者。改为使用日期。'，getSetDayOfMonth）;
    momentPrototype__proto.months = deprecate（不推荐使用月份访问者。使用月份代替
    '，getSetMonth）;
    momentPrototype__proto.years = deprecate（'年份访问者已被弃用。使用年份代替'，getSetYear）;
    momentPrototype__proto.zone = 弃用（'moment（）。不推荐使用zone，使用moment（）。utcOffset而不是.https：//github.com/moment/moment/issues/1779'，getSetZone）;

    var momentPrototype = momentPrototype__proto;

    function moment_moment__createUnix（input）{
        return local__createLocal（input * 1000）;
    }

    function moment_moment__createInZone（）{
        return local__createLocal.apply（null，arguments）.
        parseZone（）;
    }

    var defaultCalendar = {
        sameDay：'[今天在LT]，
    nextDay：'[明天在LT]，
    nextWeek：'dddd [at] LT'，
        lastDay：'[昨天在LT]，
    lastWeek：'[Last] dddd [at] LT'，
        sameElse：'L'
}
    ;

    function locale_calendar__calendar（key，mom，now）{
        var output = this._calendar [key];
        return typeof output === 'function'？output.call（mom，now）：output;
    }

    var defaultLongDateFormat = {
        LTS：'h：mm：ss A'，
        LT：'h：mm A'，
        L：'MM / DD / YYYY'，
        LL：'MMMM D，YYYY'，
        LLL：'MMMM D，YYYY h：mm A'，
        LLLL：'dddd，MMMM D，YYYY h：mm A'
}
    ;

    function longDateFormat（key）{
        var format = this._longDateFormat [key]，
            formatUpper = this._longDateFormat [key.toUpperCase（）]
        ;

        if（
        format ||！formatUpper）{
            返回格式;
        }

        this._longDateFormat [key] = formatUpper.replace（/ MMMM | MM | DD | dddd /
        g，function（val）{
            return val.slice（1）;
        }）;

        return this._longDateFormat [key];
    }

    var defaultInvalidDate = '日期无效';

    function invalidDate（）{
        return this._invalidDate;
    }

    var defaultOrdinal = '％d';
    var defaultOrdinalParse = / \ d {1,2} /;

    function ordinal（number）{
        return this._ordinal.replace（'％d'，number）;
    }

    function preParsePostFormat（string）{
        返回字符串;
    }

    var defaultRelativeTime = {
        未来：'在％s'，
        过去：'％s ago'，
        s：'几秒钟'，
        m：'一分钟'，
        mm：'％d分钟'，
        h：'一小时'，
......：'％d小时'，
        d：'一天'，
        dd：'％d天'，
        M：'一个月'，
        MM：'％d个月'，
        y：'一年'，
        yy：'％d年'
}
    ;

    function relative__relativeTime（number，withoutSuffix，string，isFuture）{
        var output = this._relativeTime [string];
        return（typeof output === 'function'）？
            输出（number，withoutSuffix，string，isFuture）：
            output.replace（/％d /
        i，number）;
    }

    function pastFuture（diff，output）{
        var format = this._relativeTime [diff > 0？'未来'：'过去'
    ]
        ;
        返回typeof格式 === '函数'？format（输出）：format.replace（/％s /
        i，output）;
    }

    function locale_set__set（config）{
        var prop，i;
        for（
        i in config）{
            prop = config [i];
            if（
            typeof prop === 'function'）{
                这[i] = 道具;
            }
        else
            {
                这个['_' + i] = 道具;
            }
        }
        // Lenient序数解析只接受一个数字
        //数字+（可能）来自_ordinalParseLenient的东西。
        this._ordinalParseLenient = new RegExp（this._ordinalParse.source + '|' +（/\d{1,2}/
    )
.
source）;
}

var prototype__proto = Locale.prototype;

prototype__proto._calendar = defaultCalendar;
prototype__proto.calendar = locale_calendar__calendar;
prototype__proto._longDateFormat = defaultLongDateFormat;
prototype__proto.longDateFormat = longDateFormat;
prototype__proto._invalidDate = defaultInvalidDate;
prototype__proto.invalidDate = invalidDate;
prototype__proto._ordinal = defaultOrdinal;
prototype__proto.ordinal = ordinal;
prototype__proto._ordinalParse = defaultOrdinalParse;
prototype__proto.preparse = preParsePostFormat;
prototype__proto.postformat = preParsePostFormat;
prototype__proto._relativeTime = defaultRelativeTime;
prototype__proto.relativeTime = relative__relativeTime;
prototype__proto.pastFuture = pastFuture;
prototype__proto.set = locale_set__set;

//月
prototype__proto.months = localeMonths;
prototype__proto._months = defaultLocaleMonths;
prototype__proto.monthsShort = localeMonthsShort;
prototype__proto._monthsShort = defaultLocaleMonthsShort;
prototype__proto.monthsParse = localeMonthsParse;

//周
prototype__proto.week = localeWe​​ek;
prototype__proto._week = defaultLocaleWe​​ek;
prototype__proto.firstDayOfYear = localeFirstDayOfYear;
prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

//星期几
prototype__proto.weekdays = localeWe​​ekdays;
prototype__proto._weekdays = defaultLocaleWe​​ekdays;
prototype__proto.weekdaysMin = localeWe​​ekdaysMin;
prototype__proto._weekdaysMin = defaultLocaleWe​​ekdaysMin;
prototype__proto.weekdaysShort = localeWe​​ekdaysShort;
prototype__proto._weekdaysShort = defaultLocaleWe​​ekdaysShort;
prototype__proto.weekdaysParse = localeWe​​ekdaysParse;

// 小时
prototype__proto.isPM = localeIsPM;
prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
prototype__proto.meridiem = localeMeridiem;

function lists__get（format，index，field，setter）{
    var locale = locale_locales__getLocale（）;
    var utc = create_utc__createUTC（）。set（setter，index）;
    return locale [field]（utc，format）;
}

函数列表（格式，索引，字段，计数，设置器）{
    if（
    typeof format === 'number'）{
        index = format;
        format = undefined;
    }

    format = format || '';

    if（
    index！= null）{
        return lists__get（format，index，field，setter）;
    }

    var i;
    var out = [];
    for（
    i = 0;
    i < count;
    i++）{
        out [i] = lists__get（format，i，field，setter）;
    }
    退出;
}

function lists__listMonths（format，index）{
    返回列表（格式，索引，'月'，12，'月'）;
}

function lists__listMonthsShort（format，index）{
    返回列表（格式，索引，'monthsShort'，12，'month'）;
}

function lists__listWeekdays（format，index）{
    返回列表（格式，索引，'工作日'，7，'天'）;
}

function lists__listWeekdaysShort（format，index）{
    返回列表（格式，索引，'weekdaysShort'，7，'day'）;
}

function lists__listWeekdaysMin（format，index）{
    返回列表（格式，索引，'weekdaysMin'，7，'day'）;
}

locale_locales__getSetGlobalLocale（'en'，{
    ordinalParse：/ \ d {1,2}（th | st | nd | rd）/，
        序数：函数（数字）{
        var b = 数字％10，
                output =（toInt（number％100 / 10）===
        1）？'th'：
    （b === 1）？'st'：
    （b === 2）？'nd'：
    （b === 3）？'rd'：'th';
        返回号 + 输出;
    }
}）;

//副作用导入
utils_hooks__hooks.lang = deprecate（'moment.lang已弃用。请改用moment.locale。'，locale_locales__getSetGlobalLocale）;
utils_hooks__hooks.langData = deprecate（'moment.langData已弃用。请改用moment.localeData。'，locale_locales__getLocale）;

var mathAbs = Math.abs;

function duration_abs__abs（）{
    var data = this._data;

    this._milliseconds = mathAbs（this._milliseconds）;
    this._days = mathAbs（this._days）;
    this._months = mathAbs（this._months）;

    data.milliseconds = mathAbs（data.milliseconds）;
    data.seconds = mathAbs（data.seconds）;
    data.minutes = mathAbs（data.minutes）;
    data.hours = mathAbs（data.hours）;
    data.months = mathAbs（data.months）;
    data.years = mathAbs（data.years）;

    归还这个;
}

function duration_add_subtract__addSubtract（持续时间，输入，值，方向）{
    var other = create__createDuration（input，value）;

    duration._milliseconds + = direction * other._milliseconds;
    duration._days + = direction * other._days;
    duration._months + = direction * other._months;

    return duration._bubble（）;
}

//仅支持2.0样式的添加（1，'s'）或添加（持续时间）
function duration_add_subtract__add（input，value）{
    return duration_add_subtract__addSubtract（this，input，value，1）;
}

//仅支持2.0样式减法（1，'s'）或减去（持续时间）
function duration_add_subtract__subtract（input，value）{
    return duration_add_subtract__addSubtract（this，input，value，-1）;
}

function absCeil（number）{
    if（
    number < 0）{
        返回Math.floor（数字）;
    }
else
    {
        返回Math.ceil（数字）;
    }
}

function bubble（）{
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds，minutes，hours，years，monthsFromDays;

    //如果我们混合了正面和负面的价值，那么首先要降温
    //检查：https：//github.com/moment/moment/issues/2166
    if（！（（毫秒 > = 0 && 天 > = 0 && 月 > = 0）||
（毫秒 <= 0 && 天 <= 0 && 个月 <= 0）））{
        毫秒 + = absCeil（monthsToDays（月）+天）*
        864e5;
        天 = 0;
        months = 0;
    }

    //以下代码冒泡值，请参阅测试
    //这意味着什么的例子。
    data.milliseconds = 毫秒％1000;

    seconds = absFloor（毫秒 / 1000）;
    data.seconds = 秒％60;

    minutes = absFloor（seconds / 60）;
    data.minutes = 分钟％60;

    小时 = absFloor（分钟 / 60）;
    data.hours = 小时％24;

    天 + = absFloor（小时 / 24）;

    //将天数转换为月份
    monthsFromDays = absFloor（daysToMonths（days））;
    月 + = monthsFromDays;
    days - = absCeil（monthsToDays（monthsFromDays））;

    // 12个月 - > 1年
    年 = absFloor（月 / 12）;
    月％= 12;

    data.days = 天;
    data.months = months;
    data.years = 年;

    归还这个;
}

function daysToMonths（days）{
    // 400年有146097天（考虑到闰年规则）
    // 400年有12个月=== 4800
    返回日 * 4800 / 146097;
}

function monthsToDays（月）{
    // daysToMonths的反向
    返回月份 * 146097 / 4800;
}

作为（单位）{
    变种天;
    var月;
    var milliseconds = this._milliseconds;

    units = normalizeUnits（units）;

    if（
    units === 'month' || units === 'year'）{
        days = this._days + milliseconds / 864e5;
        months = this._months + daysToMonths（days）;
        返回单位 === '月'？月：月 / 12;
    }
else
    {
        //由于浮点数学错误而单独处理毫秒数（问题＃1867）
        days = this._days + Math.round（monthsToDays（this._months））;
        开关（单位）{
    case
        'week'：返回天数 / 7 + 毫秒 / 6048e5;
    case
        'day'：return days + milliseconds / 864e5;
        案例
        '小时'：返回天数 * 24 + 毫秒 / 36e5;
        案例
        '分钟'：返回天数 * 1440 + 毫秒 / 6e4;
    case
        'second'：返回天数 * 86400 + 毫秒 / 1000;
        // Math.floor可以防止浮点数学错误
    case
        'millisecond'：返回Math.floor（天 * 864e5）+毫秒;
        默认：抛出新错误（'未知单位' + 单位）;
    }
    }
}

// TODO：使用this.as（'ms'）？
function duration_as__valueOf（）{
    回来（
            this._milliseconds +
            this._days * 864e5 +
            （this._months％12）*
    2592e6 +
    toInt（this._months / 12）*
    31536e6
        ）;
}

function makeAs（别名）{
    return function（）{
        return this.as（别名）;
    }
    ;
}

var asMilliseconds = makeAs（'ms'）;
var asSeconds = makeAs（'s'）;
var asMinutes = makeAs（'m'）;
var asHours = makeAs（'h'）;
var asDays = makeAs（'d'）;
var asWeeks = makeAs（'w'）;
var asMonths = makeAs（'M'）;
var asYears = makeAs（'y'）;

function duration_get__get（units）{
    units = normalizeUnits（units）;
    返回此[units + 's']（）;
}

function makeGetter（name）{
    return function（）{
        return this._data [name];
    }
    ;
}

var milliseconds = makeGetter（'milliseconds'）;
var seconds = makeGetter（'seconds'）;
var minutes = makeGetter（'minutes'）;
var hours = makeGetter（'hours'）;
var days = makeGetter（'days'）;
var duration_get__months = makeGetter（'months'）;
var years = makeGetter（'years'）;

function weeks（）{
    return absFloor（this.days（）/ 7）;
}

var round = Math.round;
var thresholds = {
    s：45，//秒到分钟
m：45，//分钟到小时
h：22，//小时
d：26，//天到月
M：11 //月到一年
}
;

// moment.fn.from，moment.fn.fromNow和moment.duration.fn.humanize的辅助函数
function substituteTimeAgo（string，number，withoutSuffix，isFuture，locale）{
    return locale.relativeTime（number || 1，!!withoutSuffix，string，isFuture）;
}

function duration_humanize__relativeTime（posNegDuration，withoutSuffix，locale）{
    var duration = create__createDuration（posNegDuration）.
    abs（）;
    var seconds = round（duration.as（'s'））;
    var minutes = round（duration.as（'m'））;
    var hours = round（duration.as（'h'））;
    var days = round（duration.as（'d'））;
    var months = round（duration.as（'M'））;
    var years = round（duration.as（'y'））;

    var a = seconds < thresholds.s && ['s'，seconds
] ||
    分钟 === 1 && ['m'] ||
    分钟 < thresholds.m && ['mm'，分钟
] ||
    小时 === 1 && ['h'] ||
    小时 < thresholds.h && ['hh'，小时
] ||
    天 === 1 && ['d'] ||
    天 < thresholds.d && ['dd'，天
] ||
    月 === 1 && ['M'] ||
    月 < thresholds.M && ['MM'，月份
] ||
    年 === 1 && ['y'] || ['yy'，年
]
    ;

    a [2] = withoutSuffix;
    a [3] = +posNegDuration > 0;
    a [4] = locale;
    return substituteTimeAgo.apply（null，a）;
}

//此函数允许您设置相对时间字符串的阈值
function duration_humanize__getSetRelativeTimeThreshold（threshold，limit）{
    if（
    thresholds [threshold] === undefined）{
        返回false;
    }
    if（
    limit === undefined）{
        返回阈值[threshold];
    }
    阈值[threshold] = limit;
    返回true;
}

function humanize（withSuffix）{
    var locale = this.localeData（）;
    var output = duration_humanize__relativeTime（this，！withSuffix，locale）;

    if（
    withSuffix）{
        output = locale.pastFuture（+this，output）;
    }

    return locale.postformat（output）;
}

var iso_string__abs = Math.abs;

function iso_string__toISOString（）{
    //对于ISO字符串，我们不使用正常的冒泡规则：
    // *毫秒冒泡直到它们变成小时
    // *天根本不泡
    // *几个月的泡沫，直到它们成为岁月
    //这是因为在小时和天之间没有无上下文转换
    //（想想时钟变化）
    //也不在天和月之间（每月28-31天）
    var seconds = iso_string__abs（this._milliseconds）/ 1000;
    var days = iso_string__abs（this._days）;
    var months = iso_string__abs（this._months）;
    var分钟，小时，年;

    // 3600秒 - > 60分钟 - > 1小时
    minutes = absFloor（seconds / 60）;
    小时 = absFloor（分钟 / 60）;
    秒％= 60;
    分钟％= 60;

    // 12个月 - > 1年
    年 = absFloor（月 / 12）;
    月％= 12;


    //灵感来自https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = 年;
    var M = 月;
    var D = 天;
    var h = 小时;
    var m = 分钟;
    var s = 秒;
    var total = this.asSeconds（）;

    if（！total）{
        //这与C＃（Noda）和python（isodate）相同......
        //但不是其他JS（goog.date）
        返回
        'P0D';
    }

    return（总 < 0？' - '：''）+
        'P' +
            （Y？Y + 'Y'：''）+
            （M？M + 'M'：''）+
            （D？D + 'D'：''）+
            （（h || m || s）？'T'：''）+
            （h？h + 'H'：''）+
            （m？m + 'M'：''）+
            （s？s + 'S'：''）;
}

var duration_prototype__proto = Duration.prototype;

duration_prototype__proto.abs = duration_abs__abs;
duration_prototype__proto.add = duration_add_subtract__add;
duration_prototype__proto.subtract = duration_add_subtract__subtract;
duration_prototype__proto.as = as;
duration_prototype__proto.asMilliseconds = asMilliseconds;
duration_prototype__proto.asSeconds = asSeconds;
duration_prototype__proto.asMinutes = asMinutes;
duration_prototype__proto.asHours = asHours;
duration_prototype__proto.asDays = asDays;
duration_prototype__proto.asWeeks = asWeeks;
duration_prototype__proto.asMonths = asMonths;
duration_prototype__proto.asYears = asYears;
duration_prototype__proto.valueOf = duration_as__valueOf;
duration_prototype__proto._bubble = bubble;
duration_prototype__proto.get = duration_get__get;
duration_prototype__proto.milliseconds = 毫秒;
duration_prototype__proto.seconds = 秒;
duration_prototype__proto.minutes = 分钟;
duration_prototype__proto.hours = 小时;
duration_prototype__proto.days = days;
duration_prototype__proto.weeks = 周;
duration_prototype__proto.months = duration_get__months;
duration_prototype__proto.years = years;
duration_prototype__proto.humanize = humanize;
duration_prototype__proto.toISOString = iso_string__toISOString;
duration_prototype__proto.toString = iso_string__toISOString;
duration_prototype__proto.toJSON = iso_string__toISOString;
duration_prototype__proto.locale = locale;
duration_prototype__proto.localeData = localeData;

//弃变
duration_prototype__proto.toIsoString = deprecate（不推荐使用
'toIsoString（）。请改用toISOString（）（注意大写）'，iso_string__toISOString）;
duration_prototype__proto.lang = lang;

//副作用导入

addFormatToken（'X'，0, 0，'unix'）;
addFormatToken（'x'，0, 0，'valueOf'）;

// PARSING

addRegexToken（'x'，matchSigned）;
addRegexToken（'X'，matchTimestamp）;
addParseToken（'X'，function（input，array，config）{
    config._d = new Date（parseFloat（input，10）*
    1000）;
}）;
addParseToken（'x'，function（input，array，config）{
    config._d = new Date（toInt（input））;
}）;

//副作用导入

;

//！moment.js
//！版本：2.10.6
//！作者：Tim Wood，Iskren Chernev，Moment.js贡献者
//！执照：麻省理工学院
//！momentjs.com

utils_hooks__hooks.version = '2.10.6';

setHookCallback（local__createLocal）;

utils_hooks__hooks.fn = momentPrototype;
utils_hooks__hooks.min = min;
utils_hooks__hooks.max = max;
utils_hooks__hooks.utc = create_utc__createUTC;
utils_hooks__hooks.unix = moment_moment__createUnix;
utils_hooks__hooks.months = lists__listMonths;
utils_hooks__hooks.isDate = isDate;
utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale;
utils_hooks__hooks.invalid = valid__createInvalid;
utils_hooks__hooks.duration = create__createDuration;
utils_hooks__hooks.isMoment = isMoment;
utils_hooks__hooks.weekdays = lists__listWeekdays;
utils_hooks__hooks.parseZone = moment_moment__createInZone;
utils_hooks__hooks.localeData = locale_locales__getLocale;
utils_hooks__hooks.isDuration = isDuration;
utils_hooks__hooks.monthsShort = lists__listMonthsShort;
utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin;
utils_hooks__hooks.defineLocale = defineLocale;
utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort;
utils_hooks__hooks.normalizeUnits = normalizeUnits;
utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

var _moment__default = utils_hooks__hooks;

//！moment.js语言环境配置
//！地区：南非荷兰语（af）
//！作者：Werner Mollentze：https：//github.com/wernerm

var af = _moment__default.defineLocale（'af'，{
    月：'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split（'_'），
        monthsShort：'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split（'_'），
        平日：'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split（'_'），
        weekdaysShort：'Son_Maa_Din_Woe_Don_Vry_Sat'.split（'_'），
        weekdaysMin：'So_Ma_Di_Wo_Do_Vr_Sa'.split（'_'），
        meridiemParse：/ vm | nm /
    i，
        isPM：function（input）{
        return /^nm$/i.test(input）;
    }，
        meridiem：function（hours，minutes，isLower）{
        if（
        小时 < 12）{
            返回更低？'vm'：'VM';
        }
    else
        {
            返回更低？'nm'：'NM';
        }
    }，
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd，D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Vandag om] LT'，
            nextDay：'[MÃ] om] LT'，
            nextWeek：'dddd [om] LT'，
            lastDay：'[Gister om] LT'，
            lastWeek：'[Laas] dddd [om] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'oor％s'，
            过去：'％s gelede'，
            s：'\'n paar sekondes'，
            m：'\'n minuut'，
            mm：'％d分钟'，
            h：'\'n uur'，
    ......：'％d ure'，
            d：'\'n dag'，
            dd：'％d dae'，
            M：'\'n maand'，
            MM：'％d maande'，
            y：'\'n jaar'，
            yy：'％d jaar'
    }，
        ordinalParse：/ \ d {1,2}（ste | de）/，
        序数：函数（数字）{
        返回数字 +（（数字 === 1 || 数字 === 8 || 数字 > = 20）？'ste'：'de'）; //感谢JorisRö¶ling：https：//github.com/jjupiter
    }，
        周：{
        道：1，// Maandag死于eeste dag van die周。
        doy：4 // Die week wat die 4d​​e Januarie bevat是eerste week van die jaar。
    }
}）;

//！moment.js语言环境配置
//！locale：摩洛哥阿拉伯语（ar-ma）
//！作者：ElFadili Yassine：https：//github.com/ElFadiliY
//！作者：Abdel Said：https：//github.com/abdelsaid

var ar_ma = _moment__default.defineLocale（'ar-ma'，{
    几个月：'ÙÙ†Ø§ÙŠØ±_Ù??Ø¨Ø±Ø§ÙŠØ±_Ù...Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ“_Ù...Ø§ÙŠÙÙÙÙÙÙÙÙÙÙ²ÙÙÙÙÙÙÙÙÙÙ²²ØØØØØØØØØØØØ Ø±£_O±ÙƒØªÙØ¨Ø†_U UU†OO±_Ø¯Ø¬Ù†OO±” .split（ '
    _
    '），
    monthsShort：'ÙŠ††Ø§ÙŠØ±_Ù??Ø¨Ø±Ø§ÙŠØ±_Ù...Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ“_Ù...Ø§ÙŠÙÙÙÙÙÙÙÙÙÙ²ÙÙÙÙÙÙÙÙÙÙ²ØØØØØØØØØØØØØ Ø±£_O±ÙƒØªÙØ¨Ø†_U UU†OO±_Ø¯Ø¬Ù†OO±” .split（ '
    _
    '），
    平日：'Ø§Ù“Ø£ØØ¯_Ø§Ù”Ø¥ØªÙ†ÙÙÙ†_Ø§Ù“Ø«Ù”Ø§Ø«Ø§Ø¡ØØ§Ù“Ø£Ø±Ø¨Ø¹Ø§Ø ¡_Ø§Ù“Ø®Ù......ÙŠØ³_Ø§Ù“Ø¬Ù...Ø¹Ø©_Ø§Ù“Ø³Ø¨Øª'.split（ '_'），
        工作日短暂：'ØØØØ¯ØØØªÙ†ÙÙÙ†ØÙÙÙØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ分裂（'
    _
    '），
    weekdaysMin：'Ø_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Ø§Ù“ÙŠÙÙ...Ø¹Ù”Ø‰Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            nextDay：'[ØºØ¯Ø§Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            nextWeek：'dddd [Ø¹Ù“Ù‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            lastDay：'[Ø£Ù......Ø³Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            lastWeek：'dddd [Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'Ù??ÙÙ％s'，
            过去：'Ù...Ù†Ø°％s'，
            s：'Ø«ÙØ§Ù†'，
            m：'Ø¯Ù，ÙŠÙ，Ø©'，
            mm：'％dØ¯Ù，Ø§Ø|Ù，'，
            h：'Ø³Ø§Ø¹Ø©'，
    ......：'％dØ³Ø§Ø¹Ø§Øª'，
            d：'ÙŠÙÙ......'，
            dd：'％dØ£ŠŠØ§Ù......'，
            M：'Ø'
        Ù‡Ø±'，
        MM：'％dØ£Ø'
        Ù‡Ø±'，
        y：'Ø³Ù†Ø©'，
            yy：'％dØ³Ù†ÙØ§Øª'
    }，
        周：{
        道：6，//星期六是一周的第一天。
        doy：12 //包含Jan 1的那一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：阿拉伯沙特阿拉伯（ar-sa）
//！作者：Suhail Alkowaileet：https：//github.com/xsoh

var ar_sa__symbolMap = {
    '1'：'Ù'，
        '2'：'Ù¢'，
        '3'：'Ù£'，
        '4'：'Ù¤'，
        '5'：'Ù¥'，
        '6'：'Ù|'，
        '7'：'Ù§'，
        '8'：'Ù¨'，
        '9'：'Ù©'，
        '0'：'Ù'
}，ar_sa__numberMap = {
    'Ù'：'1'，
        'Ù¢'：'2'，
        'Ù£'：'3'，
        'Ù¤'：'4'，
        'Ù¥'：'5'，
        'Ù|'：'6'，
        'Ù§'：'7'，
        'Ù'
'：'
8
'，
'Ù©'：'9'，
        'Ù'：'0'
}
;

var ar_sa = _moment__default.defineLocale（'ar-sa'，{
    几个月：'ÙÙ†Ø§ÙŠØ±_Ù??Ø¨Ø±Ø§ÙŠØ±_Ù...Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ“_Ù...Ø§ÙŠÙ_ÙŠÙÙ†ÙÙÙÙÙÙÙÙÙÙÙÙÙ£ØØØØØØØØØØØØØØ OO±£_O±ÙƒØªÙØ¨Ø†_U UU ??Ù... OO±_Ø¯ÙŠØ³Ù... OO±” .split（ '
    _
    '），
    monthsShort：'ÙŠÙ†Ø§ÙŠØ±_Ù??Ø¨Ø±Ø§ÙŠØ±_Ù...Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ“_Ù...Ø§ÙŠÙ_ÙŠÙÙ†ÙÙÙÙÙÙÙÙÙÙÙÙÙØØØØØØØØØØØØØØ OO±£_O±ÙƒØªÙØ¨Ø†_U UU ??Ù... OO±_Ø¯ÙŠØ³Ù... OO±” .split（ '
    _
    '），
    平日：'Ø§Ù“Ø£ØØ¯_Ø§Ù”Ø¥Ø«Ù†ÙÙÙ__ØÙÙ“Ø«Ù”Ø§Ø«Ø§Ø¡ØØ§Ù“Ø£Ø±Ø¨Ø¹Ø §Ø¡_Ø§Ù“Ø®Ù......ÙŠØ³_Ø§Ù“Ø¬Ù...Ø¹Ø©_Ø§Ù“Ø³Ø¨Øª'.split（ '_'），
        平日短小时间：'Ø£ØØ¯¯Ø¥Ø«Ù†ÙÙÙ†ØÙ“ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ '。分裂（'_'），
        weekdaysMin：'Ø_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        meridiemParse：/Øμ|Ù... /，
        isPM：function（input）{
        返回
        'Ù...' === 输入;
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 12）{
            返回
            'Øμ';
        }
    else
        {
            返回
            'Ù...';
        }
    }，
        日历：{
        sameDay：'[Ø§Ù“ÙŠÙÙ...Ø¹Ù”Ø‰Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            nextDay：'[ØºØ¯Ø§Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            nextWeek：'dddd [Ø¹Ù“Ù‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            lastDay：'[Ø£Ù......Ø³Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            lastWeek：'dddd [Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'Ù??ÙÙ％s'，
            过去：'Ù...Ù†Ø°％s'，
            s：'Ø«ÙØ§Ù†'，
            m：'Ø¯Ù，ÙŠÙ，Ø©'，
            mm：'％dØ¯Ù，Ø§Ø|Ù，'，
            h：'Ø³Ø§Ø¹Ø©'，
    ......：'％dØ³Ø§Ø¹Ø§Øª'，
            d：'ÙŠÙÙ......'，
            dd：'％dØ£ŠŠØ§Ù......'，
            M：'Ø'
        Ù‡Ø±'，
        MM：'％dØ£Ø'
        Ù‡Ø±'，
        y：'Ø³Ù†Ø©'，
            yy：'％dØ³Ù†ÙØ§Øª'
    }，
        preparse：function（string）{
        return string.replace（/ [Ù¡¢Ù£ÙÙ¥Ù|Ù§ÙÙÙ/] /
        g，函数（匹配）{
            return ar_sa__numberMap [match];
        }）。replace（/ØŒ/
        g，'，'）;
    }，
        postformat：function（string）{
        return string.replace（/ \ d /
        g，function（match）{
            return ar_sa__symbolMap [match];
        }）。replace（/，/
        g，'ØŒ'）;
    }，
        周：{
        道：6，//星期六是一周的第一天。
        doy：12 //包含Jan 1的那一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：突尼斯阿拉伯语（ar-tn）

var ar_tn = _moment__default.defineLocale（'ar-tn'，{
    几个月：'ØØØÙÙ†Ù??ÙŠÙÙ??ÙÙÙ??Ø±ÙŠÙÙ...Ø§Ø±Ø³_Ø£Ù??Ø±ÙŠÙ“_Ù...Ø§ÙŠ_Ø¬ÙØ§Ù†_ØÙÙÙÙÙÙÙ”ÙŠØ ©_O£ÙØª_Ø³Ø¨ØªÙ... OO±£_O±ÙƒØªÙØ¨Ø†_U UU ??Ù... OO±_Ø¯ÙŠØ³Ù... OO±” .split（ '
    _
    '），
    monthsShort：'ØØØÙÙ†Ù??ÙÙÙ?? ?? ??ØØØØØØØØØØØØØØØØØØØØØØØØØØØØ ©_O£ÙØª_Ø³Ø¨ØªÙ... OO±£_O±ÙƒØªÙØ¨Ø†_U UU ??Ù... OO±_Ø¯ÙŠØ³Ù... OO±” .split（ '
    _
    '），
    平日：'Ø§Ù“Ø£ØØ¯_Ø§Ù”Ø¥Ø«Ù†ÙÙÙ__ØÙÙ“Ø«Ù”Ø§Ø«Ø§Ø¡ØØ§Ù“Ø£Ø±Ø¨Ø¹Ø §Ø¡_Ø§Ù“Ø®Ù......ÙŠØ³_Ø§Ù“Ø¬Ù...Ø¹Ø©_Ø§Ù“Ø³Ø¨Øª'.split（ '_'），
        平日短小时间：'Ø£ØØ¯¯Ø¥Ø«Ù†ÙÙÙ†ØÙ“ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ '。分裂（'_'），
        weekdaysMin：'Ø_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Ø§Ù“ÙŠÙÙ...Ø¹Ù”Ø‰Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            nextDay：'[ØºØ¯Ø§Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            nextWeek：'dddd [Ø¹Ù“Ù‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            lastDay：'[Ø£Ù......Ø³Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            lastWeek：'dddd [Ø¹Ù“Ø‰Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'Ù??ÙÙ％s'，
            过去：'Ù...Ù†Ø°％s'，
            s：'Ø«ÙØ§Ù†'，
            m：'Ø¯Ù，ÙŠÙ，Ø©'，
            mm：'％dØ¯Ù，Ø§Ø|Ù，'，
            h：'Ø³Ø§Ø¹Ø©'，
    ......：'％dØ³Ø§Ø¹Ø§Øª'，
            d：'ÙŠÙÙ......'，
            dd：'％dØ£ŠŠØ§Ù......'，
            M：'Ø'
        Ù‡Ø±'，
        MM：'％dØ£Ø'
        Ù‡Ø±'，
        y：'Ø³Ù†Ø©'，
            yy：'％dØ³Ù†ÙØ§Øª'
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：阿拉伯语（ar）
//！作者：Abdel Said：https：//github.com/abdelsaid
//！工作日的月份变化：Ahmed Elkhatib
//！原生复数形式：forabi https://github.com/forabi

var ar__symbolMap = {
    '1'：'Ù'，
        '2'：'Ù¢'，
        '3'：'Ù£'，
        '4'：'Ù¤'，
        '5'：'Ù¥'，
        '6'：'Ù|'，
        '7'：'Ù§'，
        '8'：'Ù¨'，
        '9'：'Ù©'，
        '0'：'Ù'
}，ar
_numberMap = {
    'Ù'：'1'，
        'Ù¢'：'2'，
        'Ù£'：'3'，
        'Ù¤'：'4'，
        'Ù¥'：'5'，
        'Ù|'：'6'，
        'Ù§'：'7'，
        'Ù'
'：'
8
'，
'Ù©'：'9'，
        'Ù'：'0'
}，pluralForm = function（n）{
    返回n === 0？0：n === 1？1：n === 2？2：n％100 > = 3 && n％100 <= 10？3：n％100 > = 11？4：5;
}，plurals = {
    s：['Ø£Ù，ÙÙ...Ù†Ø«Ø§Ù†ÙŠØ©'，'Ø«Ø§Ù†ÙŠØ©§Ø§ØØ¯Ø©'，['Ø«Ø§Ù†ØŠØªØ §Ù†'，'Ø«Ø§Ù†ÙÙØÙÙÙÙ†'
'，'％dØ«ÙØ§Ù†'，'％dØ«Ø§Ù†ÙŠØ©'，'％dØ«Ø§Ù† USO©']，
m：['Ø£Ù，ÙÙ...Ø†Ø¯Ù，ÙŠÙ，Ø©'，'Ø¯Ù，ÙŠÙ，Ø©§Ø§ØØ¯Ø©'，['Ø¯Ù，ÙŠÙ，ØªØ §Ù†'，'Ø¯Ù，ÙŠÙ，ØªÙÙÙ†'
'，'％dØ¯Ù，Ø§Ø | Ù，'，'％dØ¯Ù，ÙŠÙ，Ø©'，'％dØ¯ Ù, ÙŠÙ, Ø©']，
h：['Ø£Ù，Ù......Ù†Ø³Ø§Ø¹Ø©'，'Ø³Ø§Ø¹Ø©§Ø§ØØ¯Ø©'，['Ø³Ø§Ø¹ØªØ§Ù†'，'Ø³Ø§ØØØªÙŠÙ†'
] ，'％dØ³Ø§Ø¹Ø§Øª'，'％dØ³Ø§Ø¹Ø©'，'％dØ³Ø§Ø¹Ø©'
]，
        d：['Ø£Ù，Ù“Ù...Ù†ÙÙÙÙ......'，'ÙŠÙÙ...ÙØ§ØØ¯'，['ÙÙŠÙÙ...Ø§Ù†'，'ÙŠÙÙ...ÙŠÙ†'
]，'％dØ£ ÙŠØ§Ù......'，'％dÙŠÙÙ...Ù<Ø§'，'％dÙŠÙÙ...'
]，
        M：['Ø£Ù，ÙÙ...Ù†Ø'Ù‡Ø±'，'
Ø
'Ù‡Ø±ÙØ§ØØ¯'，['Ø'Ù‡Ø±Ø§Ù†'，'
Ø
'Ù‡Ø±ÙŠÙ†'
'，'％dØ£Ø
'Ù‡Ø±'，'％dØ'
Ù‡Ø±Ø§'，'％dØ
'Ù‡Ø±'
]，
        y：['Ø£Ù，ÙÙ...Ù†Ø¹Ø§Ù...'，'Ø¹Ø§Ù...ÙØ§ØØ¯'，['Ø¹Ø§Ù...Ø§Ù†'，'Ø¹Ø§Ù...ÙŠÙ† '
'，'％dØ£Ø¹ÙØ§Ù
......
'，'％dØ¹Ø§ÙÙ
...
Ù < Ø§'，'％dØ¹Ø§Ù
...
']
}，pluralize = function（u）{
    return函数（number，withoutSuffix，string，isFuture）{
        var f = pluralForm（number），
                str = 复数[u] [复数形式（数字）]
        ;
        if（
        f === 2）{
            str = str [withoutSuffix？0：1
        ]
            ;
        }
        return str.replace（/％d /
        i，number）;
    }
    ;
}，ar__months = [
    'ÙƒØ§Ù†††Ø§Ù“Ø«Ø§Ù†ÙŠÙÙÙ†Ø§ÙŠØ±'，
        'Ø'
Ø¨Ø§Ø·Ù ?? Ø¨Ø±Ø§ÙŠØ±'，
'Ø¢Ø°Ø§Ø±Ù......Ø§Ø±Ø³'，
        '£†ÙŠØ³Ø§Ù†Ø£Ø¨Ø±ÙŠÙ“'，
        'Ø£ÙŠØ§Ø±Ù......Ø§ÙŠÙ'，
        'ØØ²ÙŠØ±Ø§Ù†ÙÙÙÙÙÙÙ'，
        'ØªÙ...ÙØ²ÙŠÙÙ“ÙŠÙ'，
        'Ø¢Ø¨Ø£ØºØ³ØØØ³'，
        'Ø£ÙŠÙ“ÙÙ”Ø³Ø¨ØªÙ......Ø¨Ø±'，
        'ØªØ'
Ø±ÙŠÙ†Ø§Ù“Ø£ÙÙ”Ø£ÙƒØªÙØ¨Ø±'，
'ØªØ'
Ø±ÙŠÙ†Ø§Ù“Ø«Ø§Ù†ÙÙÙ†Ù ?? Ù
......
Ø¨Ø±'，
'ÙƒØ§Ù†††Ø§Ù“Ø£ÙÙ”Ø¯ÙŠØ³Ù......Ø¨Ø±'
]。

    var ar = _moment__default.defineLocale（'ar'，{
    月：ar__months，
        monthsShort：ar__months，
        平日：'Ø§Ù“Ø£ØØ¯_Ø§Ù”Ø¥Ø«Ù†ÙÙÙ__ØÙÙ“Ø«Ù”Ø§Ø«Ø§Ø¡ØØ§Ù“Ø£Ø±Ø¨Ø¹Ø §Ø¡_Ø§Ù“Ø®Ù......ÙŠØ³_Ø§Ù“Ø¬Ù...Ø¹Ø©_Ø§Ù“Ø³Ø¨Øª'.split（ '_'），
        平日短小时间：'Ø£ØØ¯¯Ø¥Ø«Ù†ÙÙÙ†ØÙ“ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ '。分裂（'_'），
        weekdaysMin：'Ø_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'D / \ u200FM / \ u200FYYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        meridiemParse：/Øμ|Ù... /，
        isPM：function（input）{
        返回
        'Ù...' === 输入;
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 12）{
            返回
            'Øμ';
        }
    else
        {
            返回
            'Ù...';
        }
    }，
        日历：{
        sameDay：'[Ø§Ù“ÙŠÙÙ......Ø¹Ù†Ø¯Ø§Ù”Ø³Ø§Ø¹Ø©] LT'，
            nextDay：'[ØºØ¯Ù<Ø§Ø¹Ù†Ø¯Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            nextWeek：'dddd [Ø¹Ù†Ø¯Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            lastDay：'[Ø£Ù......Ø³Ø¹Ù†Ø¯Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            lastWeek：'dddd [ Ø¹Ù†Ø¯Ø§Ù“Ø³Ø§Ø¹Ø©] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'Ø¨Ø¹Ø¯％s'，
            过去：'Ù...Ù†Ø°％s'，
            s：pluralize（'s'），
            m：复数（'m'），
            mm：复数（'m'），
            h：复数（'h'），
            hh：复数（'h'），
            d：复数（'d'），
            dd：pluralize（'d'），
            M：复数（'M'），
            MM：复数（'M'），
            y：复数（'y'），
            yy：复数（'y'）
    }，
        preparse：function（string）{
        return string.replace（/ \ u200f /
        g，''）.
        replace（/ [Ù¡¢Ù£ÙÙ¥Ù|Ù§ÙÙÙ©Ù] /
        g，function（match）{
            return ar__numberMap [match];
        }）。replace（/ØŒ/
        g，'，'）;
    }，
        postformat：function（string）{
        return string.replace（/ \ d /
        g，function（match）{
            return ar__symbolMap [match];
        }）。replace（/，/
        g，'ØŒ'）;
    }，
        周：{
        道：6，//星期六是一周的第一天。
        doy：12 //包含Jan 1的那一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：阿塞拜疆（az）
//！作者：topchiyev：https：//github.com/topchiyev

var az__suffixes = {
    1：' -  ii'，
        5：'-inci'，
        8：'-inci'，
        70：'-inci'，
        80：'-inci'，
        2：' -  nci'，
        7：' -  nci'，
        20：' -  nci'，
        50：' -  nci'，
        3：'-Ã¼ncÃ¼'，
        4：' - Ã'
ncÃ¼'，
100：' - Ã'
ncÃ¼'，
6：' - ncÄ±'，
        9：' -  uncu'，
        10：' -  uncu'，
        30：' -  uncu'，
        60：' - 〜±ncÄ±'，
        90：' - 〜±ncÄ±'
}
;

var az = _moment__default.defineLocale（'az'，{
    月：'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split（'_'），
        monthsShort：'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split（'_'），
        平日：'Bazar_BazarertÉ™si_Ã‡É™ÅŸÉnbÉ™axÅ•amÄ±_É™ÅŸÉ™nbÉ™_CÃ¼mÉ™axÅŸamÄ±_CÃ¼mÉ™_ÅžÉ™nbÉ™'。split（'_'），
        weekdaysShort：'Baz_BzE_Ã‡Ax_Ã‡É™r_CAx_CÃ¼m_ÅžÉ™n'.split（'_'），
        weekdaysMin：'Bz_BE_Ã‡A_Ã‡É™_CA_CÃ¼_ÅžÉ™'。split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD.MM.YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd，D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[bugÃ¼nsaat] LT'，
            nextDay：'[sabah saat] LT'，
            nextWeek：'[gÉ™lé™nhÉ™ftÉ™] dddd [saat] LT'，
            lastDay：'[dÃ¼nÉ™n] LT'，
            lastWeek：'[keÃ§É™hÉ™ftÉ™] dddd [saat] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％s sonra'，
            过去：'％sÉ™vvÉ™l'，
            s：'birneÃ§É™saniyyÉ™'，
            m：'birdÉ™qiqÉ™'，
            mm：'％dÉ™qiqÉ™'，
            h：'bir saat'，
    ......：'％d saat'，
            d：'birgÃ¼n'，
            dd：'％dgÃ¼n'，
            M：'bir ay'，
            MM：'％d ay'，
            y：'bir il'，
            yy：'％d il'
    }，
        meridiemParse：/gecÉ™|sÉ™hÉ™r |gÃ¼ndÃ¼z|axÅŸam/，
        isPM：function（input）{
        return /^(gÃ¼ndÃ¼z|axÅŸam)$/.test(input）;
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 4）{
            return 'gecÉ™';
        }
    else
        if（
        hour < 12）{
            return 'sÉ™hÉ™r';
        }
    else
        if（
        hour < 17）{
            返回
            'gÃ¼ndÃ¼z';
        }
    else
        {
            返回
            'axÅŸam';
        }
    }，
        ordinalParse：/ \ d {1,2}  - （Ä±ncÄ±| inci | nci |Ã¼ncÃ¼|ncÄ±| uncu）/，
        序数：函数（数字）{
        if（
        number === 0）{//特殊情况为零
            返回号码 + '-Ä±ncÄ±';
        }
        var a = number％10，
                b = 数字％100 - a，
                c = 数字 > = 100？100：null;
        返回数 +（az__suffixes [a] || az__suffixes [b] || az__suffixes [c]）;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：白俄罗斯语（be）
//！作者：Dmitry Demidov：https：//github.com/demidov91
//！作者：Praleska：http：//praleska.pro/
//！作者：MenelionEllnsÃºle：https：//github.com/Oire

function be__plural（word，num）{
    var forms = word.split（'_'）;
    return num％10 === 1 && num％100！==
    11？形式[0]
:
    (num％10 > = 2 && num％10 <= 4 &&（num％100 < 10 || num％100 > = 20）？形式[1]：形式[2]）;
}

function be__relativeTimeWithPlural（number，withoutSuffix，key）{
    var format = {
        'mm'：没有Suffix？'Ñ...Ð²Ñ-Ð»Ñ-Ð½Ð°_Ñ...Ð²Ñ-Ð»Ñ-Ð½Ñ<_Ñ...Ð²Ñ-Ð»Ñ-Ð½'：'Ñ...Ð²Ñ-Ð»Ñ-Ð½Ñƒ_Ñ...Ð²Ñ-Ð»Ñ-Ð½Ñ <_N ...Ð²Ñ-d»N-Ð½' ，
            'hh'：没有松散？'Ð³Ð°Ð'
    Ð·Ñ - Ð½Ð°_Ð³Ð°Ð
    'Ð·Ñ-Ð½Ñ<_Ð³Ð°Ð'
    Ð·Ñ - Ð½'：'
    Ð³Ð°Ð
    'Ð·Ñ-Ð½Ñƒ_Ð³Ð°Ð'
    Ð·Ñ - Ð½Ñ < _Ð³Ð°Ð
    'Ð·N-Ð½' ，
            'dd'：'Ð'
    Ð·ÐμÐ½ÑŒ_Ð
    'Ð½Ñ-_Ð'
    Ð·Ñ
    'Ð½'，
            'MM'：'~~~~~~~~~~~~~~~
    'yy'：'Ð³Ð¾Ð'
    _Ð³Ð°Ð
    'Ñ<_Ð³Ð°Ð'
    Ð¾Ñž
    '
}
    ;
    if（
    key === 'm'）{
        返回withoutSuffix？'Ñ...Ð²Ñ-Ð»Ñ-Ð½Ð°'：'Ñ...Ð²Ñ-Ð»Ñ-Ð½Ñƒ';
    }
    否则if（key === 'h'）{
        返回withoutSuffix？'Ð³Ð°Ð'
        Ð·Ñ - Ð½Ð°'：'
        Ð³Ð°Ð
        'Ð·Ñ-Ð½Ñƒ';
    }
    其他
    {
        返回号码 + '' + be__plural（格式[键]，+号码）;
    }
}

function be__monthsCaseReplace（m，format）{
    var months = {
        'nominative'：'Ñ??Ñ，ÑÐ'
    Ð·ÐμÐ½ÑŒ_Ð»ÑŽÑ，Ñ < ÑÐ°ÐºÐ°Ð²Ñ - Ðº_ÐºÑÑ°°°°°°°ÑÑÑ
    2
    N€Ð²ÐμÐ½ÑŒ_Ð»N - Ð¿ÐμÐ½ÑŒ_Ð¶Ð½Ñ - Ð²ÐμÐ½ÑŒ_Ð²ÐμÑ€d°N ?? ÐμÐ½ÑŒ_ÐºÐ°N ?? Ñ, Ñ€Ñ < N‡Ð½Ñ - Ðº_Ð»N - N ?? Ñ, Ð°Ð¿Ð° Ð
    '_Ñ??Ð½ÐμÐ¶Ð°Ð½ÑŒ'.split（ '_'），
            '指责'：'Ñ??Ñ，ÑÐ'
    Ð·ÐμÐ½Ñ ?? _Ð»ÑŽÑ，Ð°Ð³Ð°_Ñ ?? Ð°ÐºÐ°Ð²Ñ - ÐºÐ°_ÐºÑ€Ð°Ñ°Ð°Ð²Ñ - ÐºÐ°_Ñ ，N€d°ÑžÐ½Ñ ?? _Ñ‡N
    10
    Ñ€Ð²ÐμÐ½Ñ ?? _
    d»N - Ð¿ÐμÐ½Ñ ?? _Ð¶Ð½Ñ - ÑžÐ½Ñ ?? _Ð²ÐμÑ€d°N ?? Ð½Ñ ?? _ÐºÐ°N值Σσn ，N€Ñ < N‡Ð½Ñ - ÐºÐ°_D»N - N ?? Ñ, Ð°Ð¿Ð°Ð
    'Ð°_n ??Ð½ÐμÐ¶Ð½Ñ??”。分割（ '
    _
    '）
}，
        nounCase =（/D[oD]?(\[[[\\\]]*\]|\s+)+MMMM?/
)
.
test(format）？
            '指责'：
            '主格';
return months [nounCase] [m.month（）]
;
}

function be__weekdaysCaseReplace（m，format）{
    var weekdays = {
        'nominative'：'Ð½Ñ??Ð'
    Ð·ÐμÐ»Ñ ?? _Ð¿Ð°Ð½Ñ ?? Ð
    'Ð·ÐμÐ»Ð°Ðº_Ð°ÑžÑ，Ð¾Ñ€Ð°Ðº_Ñ??ÐμÑ€Ð°Ð °_n‡d°N†Ð²ÐμÑ€_Ð¿Ñ??Ñ,Ð½Ñ-N†d°_n ??ÑƒÐ±Ð¾Ñ,Ð°” .split（ '
    _
    '），
    '指责'：'Ð½Ñ??Ð'
    Ð·ÐμÐ»ÑŽ_Ð¿Ð°Ð½Ñ ?? Ð
    'Ð·ÐμÐ»Ð°Ðº_Ð°ÑžÑ，Ð¾Ñ€Ð°Ðº_Ñ??ÐμÑ€Ð°Ð'
    Ñƒ_Ñ‡Ð° Ñ†Ð²ÐμÑ€_Ð¿Ñ ?? Ñ, Ð½Ñ - N†Ñƒ_Ñ ?? ÑƒÐ±Ð¾Ñ, Ñƒ
    '.split（ '
    _
    '）
}，
        nounCase =（/ \ [？[Ð'Ð²]？（？：Ð¼Ñ-Ð½ÑƒÐ»ÑƒÑÑ|Ð½Ð°Ñ??Ñ，ÑƒÐ¿Ð½ÑƒÑŽ）？？\]？dddd /）。test（格式）？
            '指责'：
            '主格';
    return weekdays [nounCase] [m.day（）]
    ;
}

var be = _moment__default.defineLocale（'be'，{
    月：be__monthsCaseReplace，
        monthsShort：'Ñ??Ñ，ÑƒÐ'
    _Ð»ÑŽÑ，_Ñ ?? Ð°Ðº_ÐºÑ€Ð ?? Ñ ?? Ñ，ÑÐ°Ð²ÑÑÑÑÑÐÐÐÑÑÑ
    €_ÐºÐ°N ?? Ñ, _Ð»N - N ?? Ñ, _Ñ ?? Ð½ÐμÐ¶'.split（ '
    _
    '），
    平日：be__weekdaysCaseReplace，
        weekdaysShort：'Ð½Ð'
    _Ð¿Ð½_Ð°Ñ，_Ñ ?? Ñ€_Ñ‡Ñ†_Ð¿Ñ，_Ñ ?? Ð±'.split（'
    _
    '），
    weekdaysMin：'Ð½Ð'
    _Ð¿Ð½_Ð°Ñ，_Ñ ?? Ñ€_Ñ‡Ñ†_Ð¿Ñ，_Ñ ?? Ð±'.split（'
    _
    '），
    longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD.MM.YYYY'，
            LL：'D MMMMYYYYÐ³。'，
            LLL：'D MMMMYYYYÐ³。，HH：mm'，
            LLLL：'dddd，D MMMMYYYYÐ³。，HH：mm'
    }，
        日历：{
        sameDay：'[Ð¡Ñ'
        Ð½Ð½Ñ ?? ?? Ñž
    ]
        LT
        '，
        nextDay：'[Ð-Ð°ÑžÑ，Ñ°Ñ°] LT'，
            lastDay：'[Ð£Ñ‡Ð¾Ñ€Ð°Ñž] LT'，
            nextWeek：function（）{
            返回
            '[Ð£] dddd [Ñž] LT';
        }，
            lastWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                案例3：
                案例5：
                案例6：
                    返回
                    '[Ð£Ð¼Ñ-Ð½ÑƒÐ»ÑƒÑŽ] dddd [Ñž] LT';
                    情况1：
                案例2：
                案例4：
                    返回
                    '[Ð£Ð¼Ñ-Ð½ÑƒÐ»Ñ<] dddd [Ñž] LT';
                }
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'Ð¿Ñ€Ð°Ð·％s'，
            过去：'％sÑ，Ð°Ð¼Ñƒ'，
            s：'Ð½ÐμÐºÐ°Ð»ÑŒÐºÑ-Ñ??ÐμÐºÑƒÐ½Ð'
        '，
        m：be__relativeTimeWithPlural，
            mm：be__relativeTimeWithPlural，
            h：be__relativeTimeWithPlural，
            hh：be__relativeTimeWithPlural，
            d：'Ð'
        Ð·ÐμÐ½ÑŒ
        '，
        dd：be__relativeTimeWithPlural，
            M：'Ð¼ÐμÑ??Ñ??Ñ†'，
            MM：be__relativeTimeWithPlural，
            y：'Ð³Ð¾Ð'
        '，
        yy：be__relativeTimeWithPlural
    }，
        meridiemParse：/Ð½Ð¾Ñ‡Ñ<|Ñ€Ð°Ð½Ñ-Ñ†Ñ<|Ð'Ð½Ñ?? |Ð²ÐμÑ‡Ð°Ñ€Ð°/，
        isPM：function（input）{
        return /^(Ð'Ð½Ñ??|Ð²ÐμÑ‡Ð°ÑÐÐ°)$/.test(input）;
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 4）{
            返回
            'Ð½Ð¾Ñ‡Ñ<';
        }
    else
        if（
        hour < 12）{
            返回
            'Ñ€Ð°Ð½Ñ-Ñ†Ñ<';
        }
    else
        if（
        hour < 17）{
            返回
            'Ð'
            Ð½Ñ ?? ';
        }
    else
        {
            返回
            'Ð²ÐμÑ‡Ð°Ð°'°';
        }
    }，
        ordinalParse：/ \ d {1,2}  - （Ñ-|Ñ<|Ð³Ð°）/，
        序数：函数（数字，句号）{
        开关（句号）{
            案例
            'M'：
            案例
            'd'：
            案例
            'DDD'：
            案例
            'w'：
            案例
            'W'：
                return（数字％10 === 2 || 数字％10 === 3）&&（数字％100！==
            12 && 数字％100！==
            13）？number + ' - Ñ-'：number + ' - Ñ<';
            案例
            'D'：
                返回号码 + ' - Ð³Ð°';
            默认：
                返回号码;
        }
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：保加利亚语（bg）
//！作者：Krasen Borisov：https：//github.com/kraz

var bg = _moment__default.defineLocale（'bg'，{
    月：“N
    10
    Ð½ÑƒÐ°N€D_N“ÐμÐ²Ñ€ÑƒÐ°N€Ð¸_Ð¼Ð°N€Ñ, _Ð°Ð¿Ñ€DD»_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»D_D°Ð²Ð³ÑƒÑ？ ？Ñ, _Ñ ?? ÐμÐ¿Ñ, ÐμÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ, Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐμÐ¼Ð²Ñ€Ð¸_Ð
    'ÐμÐºÐμÐ¼Ð²Ñ€Ð¸'.split（ '_'），
        monthsShort：“N ?? Ð½Ñ€_n“ÐμÐ²_Ð¼Ð°N€_D°Ð¿Ñ€_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»D_D°Ð²Ð³_Ñ ?? ÐμÐ¿_Ð¾ÐºÑ, _Ð½Ð¾Ðμ_Ð
    'ÐμÐº'.split（ '_'），
        平日：“Ð½ÐμÐ
    'ÐμÐ»N ?? _Ð¿Ð¾Ð½ÐμÐ'
    ÐμÐ»Ð½Ð¸Ðº_Ð²Ñ, Ð¾Ñ€Ð½Ð¸Ðº_Ñ？Ñ€N
    10°Ð
    'Ð‡_N€ÐμÑ,Ð²ÑŠÑÑ,ÑŠÐº_Ð¿ÐμÑ,ÑŠÐº_Ñ？ ？NSD±Ð¾Ñ,Ð°” .split（ '
    _
    '），
    weekdaysShort：'Ð½ÐμÐ'
    _Ð¿Ð¾Ð½_Ð²Ñ，Ð¾_Ñ ?? Ñ ?? Ñ‡ÐμÑ，_Ð¿ÐμÑ，_Ñ ?? ÑŠÐ±'.split（'
    _
    '），
    weekdaysMin：'Ð½Ð'
    _Ð¿Ð½_Ð²Ñ，_Ñ ?? Ñ€_Ñ‡Ñ，ÐÐÑ，_Ñ ?? Ð±'.split（'
    _
    '），
    longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'D.MM.YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY H：mm'，
            LLLL：'dddd，D MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：'[Ð“Ð½ÐμÑ?? Ð²] LT'，
            nextDay：'[Ð£Ñ，Ñμμ] LT'，
            nextWeek：'dddd [Ð²] LT'，
            最后一天：'[Ð'
        Ñ‡ÐμÑ€Ð°²2
    ]
        LT
        '，
        lastWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                案例3：
                案例6：
                    返回
                    '[Ð'
                    Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð°Ñ，Ð°]
                    dddd [Ð²]
                    LT
                    ';
                    情况1：
                案例2：
                案例4：
                案例5：
                    返回
                    '[Ð'
                    Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð¸Ñ ??
                ]
                    dddd [Ð²]
                    LT
                    ';
                }
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'Ñ??Ð»ÐμÐ'％s
        '，
        过去：'Ð¿Ñ€ÐμÐ'
        Ð¸％s
        '，
        s：'Ð½Ñ??ÐºÐ¾Ð»ÐºÐ¾Ñ??ÐμÐºÑƒÐ½Ð'
        Ð¸'，
        m：'Ð¼Ð¸Ð½ÑƒÑ，Ð°'，
            mm：'％dÐ¼Ð¸Ð½ÑƒÑ，Ð¸'，
            h：'Ñ‡Ð°Ñ??'，
            hh：'％dÑ‡°Ð??Ð°'，
            d：'Ð'
        ÐμÐ½'，
        dd：'％dÐ'
        Ð½Ð¸'，
        M：'Ð¼ÐμÑ??ÐμÑ†'，
            MM：'％dÐ¼ÐμÑ??ÐμÑ†Ð°'，
            y：'Ð³Ð¾Ð'
        Ð¸Ð½Ð°'，
        yy：'％dÐ³Ð¾Ð'
        Ð¸Ð½Ð¸'
    }，
        ordinalParse：/ \ d {1,2}  - （ÐμÐ²|ÐμÐ½|Ñ，Ð| |Ð²Ð¸|Ñ€Ð| |Ð¼Ð¸）/，
        序数：函数（数字）{
        var lastDigit = number％10，
                last2Digits = 数字％100;
        if（
        number === 0）{
            返回号码 + ' - ÐμÐ²';
        }
    else
        if（
        last2Digits === 0）{
            返回号码 + ' - ÐμÐ½';
        }
    else
        if（
        last2Digits > 10 && last2Digits < 20）{
            返回号码 + ' - Ñ，Ð¸';
        }
    else
        if（
        lastDigit === 1）{
            返回号码 + ' - ²²Ð¸';
        }
    else
        if（
        lastDigit === 2）{
            返回号码 + ' - €€Ð¸';
        }
    else
        if（
        lastDigit === 7 || lastDigit === 8）{
            返回号码 + '-Ð¼Ð¸';
        }
    else
        {
            返回号码 + ' - Ñ，Ð¸';
        }
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：孟加拉语（bn）
//！作者：Kaushik Gandhi：https：//github.com/kaushikgandhi

var bn__symbolMap = {
    '1'：'à§§'，
        '2'：'à§¨'，
        '3'：'à§©'，
        '4'：'à§ª'，
        '5'：'à§«'，
        '6'：'à§¬'，
        '7'：'à§'，
        '8'：'à§®'，
        '9'：'à§¯'，
        '0'：'à§|'
}，
    bn__numberMap = {
        'à§§'：'1'，
        'a2'，
        'à§©'：'3'，
        'à§ª'：'4'，
        'à§«'：'5'，
        'à§¬'：'6'，
        'à§'：'7'，
        'à§®'：'8'，
        'à§¯'：'9'，
        'à§|'：'0'
}
;

var bn = _moment__default.defineLocale（'bn'，{
    月：'à|œà|¾à|¨§§??à§Ÿà|¾à|°à§€_à|«à§‡à|à§??à§Ÿà|¾à|°à§€_à|® à|¾à|°Â§??à|š_à|??à|ªà§??à|°à|¿à|²_à|®à§‡_à|œà§??à|¨_à|œà§?? à|²à|¾à|‡_à|...à|-à|¾à|¸à§??à|Ÿ_à|¸à§‡à|ªà§??à|Ÿà§‡à|®à§？à| ¬à|°_à|...à|•Â§??à|Ÿà§<à|¬à|°_à|¨à|à§‡à|®à§??à|¬à|°_à|¡à |¿à|¸à§‡à|®à§??à|¬à|°” .split（ '
    _
    '），
    monthsShort：'à|œà|¾à|¨§§?? _à|«à§‡à|¬_à|®à|¾à|°à§??à|š_à| ??à|ªà|°_à|à §‡_à|œà§??à|¨_à|œà§??à|²_à|...à|-_à|¸à§‡à|ªà§??à|Ÿ_à|...à|•Â§??à |Ÿà§<_à|¨à|_à|¡à|¿à|¸à§‡à|®à§??”。分割（ '
    _
    '），
    平日：'à|°à||||||||||||||°_à||||| <à||||||||||| _ |||||||àà?? à|²à|¬à|¾à|°_à|¬à§??à|§à|¬à|¾à|°_à|¬à§ƒà|¹à|¸à§??à|ªà|¤à§？ ？à|¤à|¿à|¬à|¾à|°_à|¶à§??à|•Â§??à|°Â§??à|¬à|¾à|°_à|¶à|¨ à|¿à|¬à|¾à|°” .split（ '
    _
    '），
    weekdaysShort：'à|°à|¬à|¿_à|¸à§<à|®_à|®à|™à§??à|à|²_à|¬§§??à|§_à|¬à §ƒà|¹à|¸à§??à|ªà|¤à§??à|¤à|¿_à|¶à§??à|•Â§??à|°Â§?? _à|¶à |¨à|¿'.split（ '_'），
        weekdaysMin：'à|°à|¬àà|¸à|®_à|®à||à§??à|-àà|à§?? _à|¬§§??à|°à|¿ ¹_à|¶à§?? _à|¶à|¨à|¿'.split（ '_'），
        longDateFormat：{
        LT：'A h：mmà|¸à|®à§Ÿ'，
            LTS：'A h：mm：ssà|¸à|®à§Ÿ'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY，A h：mmà|¸à|®à§Ÿ'，
            LLLL：'dddd，D MMMM YYYY，A h：mmà|¸à|®à§Ÿ'
    }，
        日历：{
        sameDay：'[à|†à|œ] LT'，
            nextDay：'[à|†à|-à||||||||||||||||||||| LT'，
            nextWeek：'dddd，LT'，
            lastDay：'[à|-à|¤à|•à|||||²] LT'，
            lastWeek：'[à|-à|¤] dddd，LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％sà|ªà|°à§‡'，
            过去：'％sà|†à|-à§‡'，
            s：'à|•à| ??à|•à|¸à§‡à|•à§‡à|¨§§??à|'，
            m：'à| ??à|•à|®à|||| |||||||'，
            mm：'％dà|®à|||||||||||'，
            h：'à| ??à|•à|~à|¨§§??à|Ÿà|¾'，
            hh：'％dà|~à|¨§§??à|Ÿà||'，
            d：'à| ??à|•à||||||||'，
            dd：'％dà||||||||'，
            M：'à| ??à|•à|®à|||||'
        '，
        MM：'％dà|®à|||||'
        '，
        y：'à| ??à|à||||>à|°'，
            yy：'％dà|¬||>à|°'
    }，
        preparse：function（string）{
        return string.replace（/ [à§§à§¨§§©à§ªà§«à§àà§à§àà§àà§|] /
        g，function（match）{
            return bn__numberMap [match];
        }）;
    }，
        postformat：function（string）{
        return string.replace（/ \ d /
        g，function（match）{
            return bn__symbolMap [match];
        }）;
    }，
        meridiemParse：/à|°à|||||| ||||||•à|||||| |à|||||à|ª§§??à|°|à|||||||| Â§‡à|²|à|°à|¾à|¤/，
        isPM：function（input）{
        返回 / ^（'||||||||| |||||||| |||||||||||||||||||||||||||||||| （输入）;
    }，
    //孟加拉语是一种广泛使用的语言
    //在世界各地以不同的形式出现。
    //我刚刚使用了最常用的一个
    meridiem：function（hour，minute，isLower）{
        if（
        小时 < 4）{
            return 'à|°à|||||';
        }
    else
        if（
        hour < 10）{
            return 'à|¸à|•à|¾à|²';
        }
    else
        if（
        hour < 17）{
            return 'à|||| ??à|ª§§??à°';
        }
    else
        if（
        hour < 20）{
            return 'à|¬à|¿||•à§‡à|²';
        }
    else
        {
            return 'à|°à|||||';
        }
    }，
        周：{
        道：0，//星期日是一周的第一天。
        doy：6 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：tibetan（bo）
//！作者：Thupten N. Chakrishar：https：//github.com/vajradog

var bo__symbolMap = {
    '1'：'à¼'，
        '2'：'à¼¢'，
        '3'：'à££'，
        '4'：'à¼¤'，
        '5'：'à¼¥'，
        '6'：'à¼|'，
        '7'：'à¼§'，
        '8'：'à¼¨'，
        '9'：'à¼©'，
        '0'：'à¼'
}，
    bo__numberMap = {
        'à¼'：'1'，
        'à¼¢'：'2'，
        'à¼£'：'3'，
        'à¼¤'：'4'，
        'à¼¥'：'5'，
        'à¼|'：'6'，
        'à¼§'：'7'，
        'à¼¨'：'8'，
        'à¼©'：'9'，
        'à¼'：'0'
}
;

var bo = _moment__default.defineLocale（'bo'，{
    月：'à½Ÿà¾³à¼<à½-à¼<à½'
    à½“à¼<
    à½”à½¼_à½Ÿà¾³à¼<
    à½-à¼<
    à½，à½‰à½²à½|
    à¼<
    à½“_à½Ÿà¾³à¼<
    à½-à¼<
    à½，à½|
    à½'à½〜à¼<à½ “_à½Ÿà¾³à¼<å½-那张<å½-à½žà½²à¼<ä½” _à½Ÿà¾³à¼<å½-那张<ä½£Â¾” 那张<ä½” _à½Ÿà¾³à¼<å½-那张<à½'
    à¾²à½'à½,à¼<ä½” _à½Ÿà¾³à¼<å½-那张<å½ -à½'
    à½'à½“ 那张<ä½” _à½Ÿà¾³à¼<å½-那张<å½-å½¢à¾'
    à¾±à½'à¼<ä½” _à½Ÿà¾³à¼<å½-那张<à½'
    à½,
    à½'à¼<ä½” _à½Ÿà¾³à¼<å½ -à¼<å½-å½...à½'
    à¼<
    ä½” _à½Ÿà¾³à¼<
    å½-那张 < å½-å½...
    à½'à¼<à½,à½...à½²à½,à¼<ä½” _à½Ÿà¾³à¼<å½-那张<å½-å½...à½'
    à¼ <
    à½,
    à½‰à½²à½|
    à¼<
    ä½” ”。分割（ '_'），
        monthsShort：'à½Ÿà¾³à¼<à½-à¼<à½'
    à½“à¼<
    à½”à½¼_à½Ÿà¾³à¼<
    à½-à¼<
    à½，à½‰à½²à½|
    à¼<
    à½“_à½Ÿà¾³à¼<
    à½-à¼<
    à½，à½|
    à½'à½〜à¼<à½ “_à½Ÿà¾³à¼<å½-那张<å½-à½žà½²à¼<ä½” _à½Ÿà¾³à¼<å½-那张<ä½£Â¾” 那张<ä½” _à½Ÿà¾³à¼<å½-那张<à½'
    à¾²à½'à½,à¼<ä½” _à½Ÿà¾³à¼<å½-那张<å½ -à½'
    à½'à½“ 那张<ä½” _à½Ÿà¾³à¼<å½-那张<å½-å½¢à¾'
    à¾±à½'à¼<ä½” _à½Ÿà¾³à¼<å½-那张<à½'
    à½,
    à½'à¼<ä½” _à½Ÿà¾³à¼<å½ -à¼<å½-å½...à½'
    à¼<
    ä½” _à½Ÿà¾³à¼<
    å½-那张 < å½-å½...
    à½'à¼<à½,à½...à½²à½,à¼<ä½” _à½Ÿà¾³à¼<å½-那张<å½-å½...à½'
    à¼ <
    à½,
    à½‰à½²à½|
    à¼<
    ä½” ”。分割（ '_'），
        平日：'à½，à½Ÿààà¼<à½‰à½²à¼<à½~à¼<_à½，à½Ÿà½à¼<à½Ÿà¾³à¼<à½-à¼<_à½，à½Ÿà½à¼<à½〜à½²à½，à¼<à½'
    à½〜à½¢à¼<
    _à½，à½Ÿà½à¼ <
    à½£à¾·à½，à¼<
    à½“à¼<
    _à½，à½ààà¼<
    à½•à½'à½¢à¼<à½-à½'
    _à½，à½Ÿà½à¼<
    à½”à¼<
    à½|
    à½“à½|
    à¼<
    _à½，à½Ÿà½那张 < à½|
    à¾¤à½ºà½“ 那张 < ä½” 那张 <”。分割（ '_'），
        weekdaysShort：“å½‰à½²à¼<
    à½~à¼<
    _à½Ÿà¾³à¼<
    å½-那张 < _à½~à½²à½,
    à¼<
    à½'à½~à½¢那张<_à½£Â¾·à½,à¼<ä½” 那张<_à½•à½'
    à½¢那张 < ä½-à½'_à½” 那张<à½|à½„ à½|à¼<_à½|à¾¤à½ºà½“ 那张<ä½” 那张<”。分割（ '
    _
    '），
    weekdaysMin：“å½‰à½²à¼<
    à½~à¼<
    _à½Ÿà¾³à¼<
    å½-那张 < _à½~à½²à½,
    à¼<
    à½'à½~à½¢那张<_à½£Â¾·à½,à¼<ä½” 那张<_à½•à½'
    à½¢那张 < ä½-à½'_à½” 那张<à½|à½„ à½|à¼<_à½|à¾¤à½ºà½“ 那张<ä½” 那张<”。分割（ '
    _
    '），
    longDateFormat：{
        LT：'A h：mm'，
            LTS：'A h：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY，A h：mm'，
            LLLL：'dddd，D MMMM YYYY，A h：mm'
    }，
        日历：{
        sameDay：'[à½'
        à½²à¼<
        à½¢à½²à½“]
        LT
        '，
        nextDay：'[à½|à½“à¼<à½‰à½²à½”] LT'，
            nextWeek：'[à½-à½'
        à½'à½“à¼<à½•à¾²à½，à¼<à½¢à-à½ºà½|à¼<à½〜]，LT'，
            lastDay：'[à½??à¼<à½|à½“] LT'，
            lastWeek：'[à½-à½'
        à½'à½“à¼<à½•à¾²à½，à¼<à½〜à½??à½à¼<à½〜] dddd，LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％sà½£à¼<'，
            过去：'％sà½|à¾“à½”à¼<à½£'，
            s：'à½£à½〜à¼<à½|à½“'，
            m：'à½|à¾??à½¢à¼<à½〜à¼<à½，à½...à½²à½，'，
            mm：'％dà½|à¾??à½¢à¼<à½〜'，
            h：'à½†à½'
        à¼<
        à½šà½¼à½'à¼<à½，à½...à½²à½，'，
    ......：'％dà½†à½'
        à¼<
        à½šà½¼à½''，
            d：'à½‰à½²à½“à¼<à½，à½...à½²à½，'，
            dd：'％dà½‰à½²à½“à¼<'，
            M：'à½Ÿà¾³à¼<à½-à¼<à½，à½...à½²à½，'，
            MM：'％dà½Ÿà¾³à¼<à½-'，
            y：'à½£à½¼à¼<à½，à½...à½²à½，'，
            yy：'％dà½£à½¼'
    }，
        preparse：function（string）{
        return string.replace（/ [à¼¡à¼¢à¼£à¼¤à¼¥à¼|à¼§à¼|à¼©à¼] /
        g，function（match）{
            return bo__numberMap [match];
        }）;
    }，
        postformat：function（string）{
        return string.replace（/ \ d /
        g，function（match）{
            return bo__symbolMap [match];
        }）;
    }，
        meridiemParse：/à~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ à½~à½šà½“ 那张<à½~à½¼/，
        isPM：function（input）{
        返回 / ^（à½‰à½²à½"à¼<à½，'½'à½“||||'，'，½，½，½，½，½，½，½，½，½
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 4）{
            return 'à½~à½šà½“à¼<à½~à½¼';
        }
    else
        if（
        hour < 10）{
            return 'à½žà½¼à½，à½|à¼<à½€à½|';
        }
    else
        if（
        hour < 17）{
            返回
            'à½‰à½²à½“à¼<à½，à½'
            à½”';
        }
    else
        if（
        hour < 20）{
            return 'à½'
            à½，à½¼à½“à¼<
            à½'à½，';
        }
    else
        {
            return 'à½~à½šà½“à¼<à½~à½¼';
        }
    }，
        周：{
        道：0，//星期日是一周的第一天。
        doy：6 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：布列塔尼（br）
//！作者：Jean-Baptiste Le Duigou：https：//github.com/jbleduigou

function relativeTimeWithMutation（number，withoutSuffix，key）{
    var format = {
        'mm'：'munutenn'，
            'MM'：'miz'，
            'dd'：'devezh'
}
    ;
    返回号 + '' + 变异（格式[key]，数字）;
}

function specialMutationForYears（number）{
    switch
        （lastNumber（number））{
            情况1：
        案例3：
        案例4：
        案例5：
        案例9：
            返回号码 + 'bloaz';
            默认：
            返回号码 + 'vloaz';
        }
}

function lastNumber（number）{
    if（
    number > 9）{
        return lastNumber（number％10）;
    }
    返回号码;
}
函数变异（文本，数字）{
    if（
    number === 2）{
        return softMutation（text）;
    }
    返回文字;
}

function softMutation（text）{
    var mutationTable = {
        'm'：'v'，
            'b'：'v'，
            'd'：'z'
}
    ;
    if（
    mutationTable [text.charAt（0）] ===
    undefined）{
        返回文字;
    }
    return mutationTable [text.charAt（0）]
    +text.substring（1）;
}

var br = _moment__default.defineLocale（'br'，{
    月：'Genver_C \'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split（'_'），
        monthsShort：'Gen_C \'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split（'_'），
        平日：'Sul_Lun_Meurzh_Merc \'her_Yaou_Gwener_Sadorn'.split（'_'），
        weekdaysShort：'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split（'_'），
        weekdaysMin：'Su_Lu_Me_Mer_Ya_Gw_Sa'.split（'_'），
        longDateFormat：{
        LT：'h [e] mm A'，
            LTS：'h [e] mm：ss A'，
            L：'DD / MM / YYYY'，
            LL：'D [a viz] MMMM YYYY'，
            LLL：'D [a viz] MMMM YYYY h [e] mm A'，
            LLLL：'dddd，D [a viz] MMMM YYYY h [e] mm A'
    }，
        日历：{
        sameDay：'[Hiziv da] LT'，
            nextDay：'[Warc \'hoazh da] LT'，
            nextWeek：'dddd [da] LT'，
            lastDay：'[Dec \'h da] LT'，
            lastWeek：'dddd [paset da] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'a-benn％s'，
            过去：'％s \'zo'，
            s：'unnebeudsegondennoÃ'
        '，
        m：'ur vunutenn'，
            mm：relativeTimeWithMutation，
            h：'un eur'，
    ......：'％d eur'，
            d：'un devezh'，
            dd：relativeTimeWithMutation，
            M：'你的miz'，
            MM：relativeTimeWithMutation，
            y：'你的bloaz'，
            yy：specialMutationForYears
    }，
        ordinalParse：/ \ d {1,2}（aÃ| | vet）/，
        序数：函数（数字）{
        var output =（number === 1）？'aÃ±'：'兽医';
        返回号 + 输出;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：bosnian（bs）
//！作者：Nedim Cholich：https：//github.com/frontyard
//！基于（hr）的翻译BojanMarkoviÄ‡

function bs__translate（number，withoutSuffix，key）{
    var result = number + '';
    开关（键）{
    case
        'm'：
            返回withoutSuffix？'jedna minuta'：'jedne分钟';
        案例
        'mm'：
            if（
        number === 1）{
            结果 + = 'minuta';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = '分钟';
        }
    else
        {
            结果 + = 'minuta';
        }
        返回结果;
        案例
        'h'：
            返回withoutSuffix？'jedan sat'：'jednog sata';
        案件
        'hh'：
            if（
        number === 1）{
            结果 + = 'sat';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = 'sata';
        }
    else
        {
            结果 + = 'sati';
        }
        返回结果;
        案例
        'dd'：
            if（
        number === 1）{
            结果 + = 'dan';
        }
    else
        {
            结果 + = 'dana';
        }
        返回结果;
        案例
        'MM'：
            if（
        number === 1）{
            结果 + = 'mjesec';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = 'mjeseca';
        }
    else
        {
            结果 + = 'mjeseci';
        }
        返回结果;
        案例
        'yy'：
            if（
        number === 1）{
            结果 + = 'godina';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = 'godine';
        }
    else
        {
            结果 + = 'godina';
        }
        返回结果;
    }
}

var bs = _moment__default.defineLocale（'bs'，{
    月：'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split（'_'），
        monthsShort：'jan._feb._mar._apr._maj._jun._jul._aug ._sep._okt._nov._dec。'。split（'_'），
        平日：'nedjelja_ponedjeljak_utorak_srijeda_Ä?? etvrtak_petak_subota'.split（'_'），
        weekdaysShort：'ned._pon._uto._sri._Ä?? et._pet._sub。'。split（'_'），
        weekdaysMin：'ne_po_ut_sr_Ä?? e_pe_su'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD。MM。YYYY”，
        LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY H：mm'，
            LLLL：'dddd，D。MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：'[danas u] LT'，
            nextDay：'[sutra u] LT'，
            nextWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                    返回
                    '[u] [nedjelju] [u] LT';
                    案例3：
                    返回
                    '[u] [srijedu] [u] LT';
                    案例6：
                    返回
                    '[u] [subotu] [u] LT';
                    情况1：
                案例2：
                案例4：
                案例5：
                    返回
                    '[u] dddd [u] LT';
                }
        }，
            lastDay：'[ju？??你] LT'，
            lastWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                案例3：
                    返回
                    '[proÅ¡lu] dddd [u] LT';
                    案例6：
                    return '[proÅ¡le] [subote] [u] LT';
                    情况1：
                案例2：
                案例4：
                案例5：
                    返回
                    '[proÅ¡li] dddd [u] LT';
                }
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'za％s'，
            过去：'prije％s'，
            s：'par sekundi'，
            m：bs__translate，
            mm：bs__translate，
            h：bs__translate，
            hh：bs__translate，
            d：'dan'，
            dd：bs__translate，
            M：'mjesec'，
            MM：bs__translate，
            y：'godinu'，
            yy：bs__translate
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：加泰罗尼亚语（ca）
//！作者：Juan G. Hurtado：https：//github.com/juanghurtado

var ca = _moment__default.defineLocale（'ca'，{
    月：'gener_febrer_marÃ§_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split（'_'），
        monthsShort：'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des。'。split（'_'），
        平日：'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split（'_'），
        weekdaysShort：'dg._dl._dt._dc._dj._dv._ds。'。split（'_'），
        weekdaysMin：'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'LT：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY H：mm'，
            LLLL：'dddd D MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：function（）{
            return '[avui a' +（（this.hours（）！==
            1）？'les'：'la'）+'] LT';
        }，
            nextDay：function（）{
            return '[demÃa' +（（this.hours（）！==
            1）？'les'：'la'）+'] LT';
        }，
            nextWeek：function（）{
            return 'dddd [a' +（（this.hours（）！==
            1）？'les'：'la'）+'] LT';
        }，
            lastDay：function（）{
            返回
            '[ahir a' +（（this.hours（）！==
            1）？'les'：'la'）+'] LT';
        }，
            lastWeek：function（）{
            return '[el] dddd [passat a' +（（this.hours（）！==
            1）？'les'：'la'）+'] LT';
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'en％s'，
            过去：'fa％s'，
            s：'uns segons'，
            m：'un minut'，
            mm：'％d minuts'，
            h：'una hora'，
    ......：'％d hores'，
            d：'un dia'，
            dd：'％d死了'，
            M：'un mes'，
            MM：'％d mesos'，
            y：'un any'，
            yy：'％d anys'
    }，
        ordinalParse：/ \ d {1,2}（r | n | t |Ã| | a）/，
        序数：函数（数字，句号）{
        var output =（number === 1）？'r'：
    （号码 === 2）？'n'：
    （编号 === 3）？'r'：
    （编号 === 4）？'t'：'Ã'
        ';
        if（
        句号 === 'w' || 句号 === 'W'）{
            output = 'a';
        }
        返回号 + 输出;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：czech（cs）
//！作者：petrbela：https：//github.com/petrbela

var cs__months = 'leden_Ãºnor_bÅ™ezen_duben_kvÄ>ten_Ä??erven_Ä??ervenec_srpen_zÃ¡Å™Ã_Å™Ãjen_listopad_prosinec'.split（'_'），
        cs__monthsShort = 'led_Ãºno_bÅ™e_dub_kvÄ>_Ä??vn_Ä??vc_srp_zÃ¡Å™_Å™Ãj_lis_pro'.split（'_'）;

function cs__plural（n）{
    return（n > 1）&&（n < 5）&&（~~（n / 10）！==
    1）;
}

function cs__translate（number，withoutSuffix，key，isFuture）{
    var result = number + '';
    开关（键）{
    case
        's'：//几秒钟/几秒钟/几秒钟前
        return（withoutSuffix || isFuture）？'pÃ¡rsekund'：'pÃ¡rsekundami';
    case
        'm'：//一分钟/分钟/分钟前
        返回withoutSuffix？'minuta'
    :
        (isFuture？'minutu'：'minutou'）;
    case
        'mm'：// 9分钟/ 9分钟/ 9分钟前
        if（
        withoutSuffix || isFuture）{
            返回结果 +（cs__plural（number）？'minuty'：'minut'）;
        }
    else
        {
            返回结果 + 'minutami';
        }
        打破;
    case
        'h'：//一小时/一小时/一小时前
        返回withoutSuffix？'hodina'
    :
        (isFuture？'hodinu'：'hodinou'）;
        案例
        'hh'：// 9小时/ 9小时/ 9小时前
        if（
        withoutSuffix || isFuture）{
            返回结果 +（cs__plural（number）？'hodiny'：'hodin'）;
        }
    else
        {
            返回结果 + 'hodinami';
        }
        打破;
        案例
        'd'：//一天/一天/一天前
        return（withoutSuffix || isFuture）？'den'：'dnem';
        案例
        'dd'：// 9天/ 9天/ 9天前
        if（
        withoutSuffix || isFuture）{
            返回结果 +（cs__plural（number）？'dny'：'dnÃ'）;
        }
    else
        {
            返回结果 + 'dny';
        }
        打破;
        案例
        'M'：//一个月/一个月/一个月前
        return（withoutSuffix || isFuture）？'mÄ>sÃc'：'mÄ>sÃcem';
        案例
        'MM'：// 9个月/ 9个月/ 9个月前
        if（
        withoutSuffix || isFuture）{
            返回结果 +（cs__plural（number）？'mÄ>sÃce'：'mÄ>sÃcÅ¯'）;
        }
    else
        {
            返回结果 + 'mÄ>sÃci';
        }
        打破;
    case
        'y'：//一年/一年/一年前
        return（withoutSuffix || isFuture）？'rok'：'rokem';
    case
        'yy'：// 9年/ 9年/ 9年前
        if（
        withoutSuffix || isFuture）{
            返回结果 +（cs__plural（number）？'roky'：'let'）;
        }
    else
        {
            返回结果 + 'lety';
        }
        打破;
    }
}

var cs = _moment__default.defineLocale（'cs'，{
    月：cs__个月，
        monthsShort：cs__monthsShort，
        monthsParse :(function（months，monthsShort）{
        var i，_monthsParse = [];
        for（
        i = 0;
        i < 12;
        i++）{
            //使用自定义解析器来解决7月的问题（Ä?? ervenec）
            _monthsParse [i] = 新的RegExp（'^' + months [i] + '$ | ^' + monthsShort [i] + '$'，'i'）;
        }
        return _monthsParse;
    }（cs__months，cs__monthsShort）），
        平日：'nedÄ>le_pondÄ>lÃ_ÃºterÃ½terstÅ™eda_Ä??tvrtek_pÃ¡tek_sobota'.split（'_'），
        weekdaysShort：'ne_po_Ãºt_st_Ä??t_pÃ¡_so'.split（'_'），
        weekdaysMin：'ne_po_Ãºt_st_Ä??t_pÃ¡_so'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD.MM.YYYY'，
            LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY H：mm'，
            LLLL：'dddd D. MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：'[dnes v] LT'，
            nextDay：'[zÃtrav] LT'，
            nextWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                    返回
                    '[vnedÄ> li v] LT';
                    情况1：
                案例2：
                    返回
                    '[v] dddd [v] LT';
                    案例3：
                    返回
                    '[vestÅ™edu v] LT';
                    案例4：
                    返回
                    '[veÄ?? tvrtek v] LT';
                    案例5：
                    返回
                    '[vpÃ¡tekv] LT';
                    案例6：
                    返回
                    '[v sobotu v] LT';
                }
        }，
            lastDay：'[v？?? era v] LT'，
            lastWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                    返回
                    '[minulouneedÄ> li v] LT';
                    情况1：
                案例2：
                    返回
                    '[minulé] dddd [v] LT';
                    案例3：
                    返回
                    '[minuloustÅ™edu v] LT';
                    案例4：
                案例5：
                    返回
                    '[minulÃ½] dddd [v] LT';
                    案例6：
                    返回
                    '[minulou sobotu v] LT';
                }
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'za％s'，
            过去：'pÅ™ed％s'，
            s：cs__translate，
            m：cs__translate，
            mm：cs__translate，
            h：cs__translate，
            hh：cs__translate，
            d：cs__translate，
            dd：cs__translate，
            M：cs__translate，
            MM：cs__translate，
            y：cs__translate，
            yy：cs__translate
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：chuvash（cv）
//！作者：Anatoly Mironov：https：//github.com/mirontoli

var cv = _moment__default.defineLocale（'cv'，{
    几个月：'ÐºÓ'
    Ñ€Ð°Ñ‡ÐÐÐÐÐÐÑÑÑ¿Ð¿ÑƒÑ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó - Ñ€Ñ，Ð¼Ðμ_ÑƒÑ，Ó
    ''
    Ò«ÑƒÑ€Ð° _D°Ð²Ó
    'Ð½_ÑŽÐ¿Ð°_n‡Ó³Ðº_Ñ€d°ÑÑ,Ð°Ð²'.split（ '_'），
        monthsShort：'ÐºÓ'
    Ñ€_Ð½Ð°Ñ€_Ð¿ÑƒÑ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó - Ñ€_ÑƒÑ，Ó
    '_Ò«ÑƒÑ€_Ð°Ð²Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°Ñ'.split（ '_'），
        平日：“Ð²Ñ < N€N
    10
    d°N€Ð½Ð¸ÐºÑƒÐ½_Ñ, ÑƒÐ½Ñ, Ð¸ÐºÑƒÐ½_Ñ < Ñ, Ð»d°N€Ð¸ÐºÑƒÐ½_ÑŽÐ½ÐºÑƒÐ½_ÐºÓ - Ò«Ð½ÐμÑ€Ð½Ð¸ÐºÑƒÐ½_Ñ ?? Ñ€Ð½ÐμÐºÑƒÐ½_ÑÓ
    'Ð¼Ð °Ñ,ÐºÑƒÐ½'.split（ '_'），
        平日短暂：'Ð²Ñ<Ñ€Ñ，ÑƒÐ½_Ñ<Ñ，Ð»_ÑŽÐ½_ÐºÓ-Ò«_Ñ??Ñ€œ½_ÑÓ'
    Ð¼'.split（'
    _
    '），
    weekdaysMin：'Ð²Ñ€_Ñ，Ð½_Ñ<Ñ，_ÑŽÐ½_ÐºÒ«_Ñ??Ñ€ÑÐ¼'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD-MM-YYYY'，
            LL：'YYYY [Ò«ÑƒÐ»Ñ...Ð¸] MMMM [ÑƒÐ¹Ó'
        Ñ
    ...
        Ó - Ð½]
        D [-Ð¼Ó - ÑÓ -
    ]
        '，
        LLL：'YYYY [Ò«ÑƒÐ»Ñ...Ð¸] MMMM [ÑƒÐ¹Ó'
        Ñ
    ...
        Ó - Ð½]
        D [-Ð¼Ó - ÑÓ -
    ]，HH：mm
        '，
        LLLL：'dddd，YYYY [Ò«ÑƒÐ»Ñ...Ð¸] MMMM [ÑƒÐ¹Ó'
        Ñ
    ...
        Ó - Ð½]
        D [-Ð¼Ó - ÑÓ -
    ]，HH：mm
        '
    }，
        日历：{
        sameDay：'[ÐŸÐ°Ñ??Ð½] LT [Ñ??ÐμÑ...ÐμÑ，Ñμμ]'，
            nextDay：'[Ð«ÑÐ°Ð½] LT [Ñ??ÐμÑ...ÐμÑ，Ñμμ]'，
            lastDay：'[Ó-Ð½ÐμÑ€] LT [Ñ??ÐμÑ...ÐμÑ，Ñμμ]'，
            nextWeek：'[ÒªÐ¸Ñ，ÐμÑ??] dddd LT [Ñ??ÐμÑ...ÐμÑ，Ñμμ]'，
            lastWeek：'[Ð~Ñ€Ñ，Ð½Ó-] dddd LT [Ñ??ÐμÑ...ÐμÑ，Ñμμ]'，
            sameElse：'L'
    }，
        relativeTime：{
        future：function（output）{
            var affix = /Ñ??ÐμÑ...ÐμÑ,$/
            i.exec（output）？'Ñ€ÐμÐ½'：/renlƒƒÐ»$ /
            i.exec（输出）？'Ñ，Ð°Ð½'：'Ñ€Ð°Ð½';
            return output + affix;
        }，
            过去：'％sÐºÐ°Ñ??Ð»Ð»Ð°'，
            s：'Ð¿Ó-Ñ€-Ð¸Ðº“ÐμÐºÐºÑƒÐ½Ñ，'，
            m：'Ð¿Ó-Ñ€Ð¼Ð¸Ð½ÑƒÑ，'，
            mm：'％dÐ¼Ð¸Ð½ÑƒÑ，'，
            h：'Ð¿Ó-Ñ€ÐμÑ...ÐμÑ，'，
            hh：'％dÑ??ÐμÑ...ÐμÑ，'，
            d：'Ð¿Ó-Ñ€ÐƒƒÐ½'，
            dd：'％dÐºÑƒÐ½'，
            M：'Ð¿Ó-Ñ€Ñ¹Ð¹'
        'Ñ......'，
            MM：'％dÑƒÐ¹Ó'
        Ñ
    ......
        '，
        y：'Ð¿Ó-Ñ€«ÑƒÐ»'，
            yy：'％dÒ«ÑƒÐ»'
    }，
        ordinalParse：/ \ d {1,2}-Ð¼Ó-Ñ/，
        序数：'％d-Ð¼Ó-Ñ'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：威尔士语（cy）
//！作者：罗伯特艾伦

var cy = _moment__default.defineLocale（'cy'，{
    月：'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split（'_'），
        monthsShort：'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split（'_'），
        平日：'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split（'_'），
        weekdaysShort：'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split（'_'），
        weekdaysMin：'Su_Ll_Ma_Me_Ia_Gw_Sa'.split（'_'），
    //时间格式与en-gb相同
    longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd，D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Heddiw am] LT'，
            nextDay：'[Y​​fory am] LT'，
            nextWeek：'dddd [am] LT'，
            lastDay：'[Ddoe am] LT'，
            lastWeek：'dddd [diwethaf am] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'mewn％s'，
            过去：'％synÃ'
        l
        '，
        s：'ychydig eiliadau'，
            m：'munud'，
            mm：'％d munud'，
            h：'awr'，
    ......：'％d awr'，
            d：'diwrnod'，
            dd：'％d diwrnod'，
            M：'错'，
            MM：'％d mis'，
            y：'blwyddyn'，
            yy：'％d flynedd'
    }，
        ordinalParse：/ \ d {1,2}（fed | ain | af | il | ydd | ed | eg）/，
    //传统的序数 31以上的不常用于口语威尔士语
    序数：函数（数字）{
        var b = 数字，
                output = ''，
                lookup = [
                    ''，'af'，'il'，'ydd'，'ydd'，'ed'，'ed'，'ed'，'fed'，'fed'，'fed'，// 1af到10fed
        'eg'，'fed'，'eg'，'eg'，'fed'，'eg'，'eg'，'fed'，'eg'，'fed'// 11eg to 20fed
    ]。
            if（
        b > 20）{
            if（
            b === 40 || b === 50 || b === 60 || b === 80 || b === 100）{
                output = 'fed'; //不是30ain，70ain或90ain
            }
        else
            {
                output = 'ain';
            }
        }
    else
        if（
        b > 0）{
            output = lookup [b];
        }
        返回号 + 输出;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：丹麦语（da）
//！作者：Ulrik Nielsen：https：//github.com/mrbase

var da = _moment__default.defineLocale（'da'，{
    月：'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split（'_'），
        monthsShort：'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split（'_'），
        平日：'sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag​​_lÃ¸rdag'.split（'_'），
        weekdaysShort：'sÃ¸n_man_tir_ons_tor_fre_lÃ¸r'.split（'_'），
        weekdaysMin：'sÃ¸_ma_ti_on_to_fr_lÃ¸'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY HH：mm'，
            LLLL：'dddd [d。] D. MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[我dag kl。] LT'，
            nextDay：'[我morgen kl。] LT'，
            nextWeek：'dddd [kl。] LT'，
            lastDay：'[我g？r kl。] LT'，
            lastWeek：'[sidste] dddd [kl] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'om％s'，
            过去：'％s siden'，
            s：'fÃ¥sekunder'，
            m：'et minut'，
            mm：'％d minutter'，
            h：'时间'，
            hh：'％d timer'，
            d：'en dag'，
            dd：'％d dage'，
            M：'enmÃ¥ned'，
            MM：'％dmÃ¥neder'，
            y：'etÃ¥r'，
            yy：'％dÃ¥r'
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：奥地利德语（de-at）
//！作者：lluchs：https：//github.com/lluchs
//！作者：MenelionEllnsÃºle：https：//github.com/Oire
//！作者：Martin Groller：https：//github.com/MadMG

function de_at__processRelativeTime（number，withoutSuffix，key，isFuture）{
    var format = {
        'm'：['eine Minute'，'einer Minute'
]，
            'h'：['eine Stunde'，'einer Stunde'
]，
            'd'：['ein Tag'，'einem Tag'
]，
            'dd'：[数字 + 'Tage'，数字 + 'Tagen'
]，
            'M'：['ein Monat'，'einem Monat'
]，
            'MM'：[number + 'Monate'，number + 'Monaten'
]，
            'y'：['ein Jahr'，'einem Jahr'
]，
            'yy'：[数字 + 'Jahre'，数字 + 'Jahren'
]
}
    ;
    返回withoutSuffix？格式[key] [0]：格式[key] [1];
}

var de_at = _moment__default.defineLocale（'de-at'，{
    月：'JÃ¤nner_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split（'_'），
        monthsShort：'JÃ¤n._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez。'。split（'_'），
        平日：'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split（'_'），
        weekdaysShort：'So._Mo._Di._Mi._Do._Fr._Sa。'。split（'_'），
        weekdaysMin：'So_Mo_Di_Mi_Do_Fr_Sa'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD.MM.YYYY'，
            LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY HH：mm'，
            LLLL：'dddd，D。MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Heute um] LT [Uhr]'，
            sameElse：'L'，
            nextDay：'[Morgen um] LT [Uhr]'，
            nextWeek：'dddd [um] LT [Uhr]'，
            lastDay：'[Gestern um] LT [Uhr]'，
            lastWeek：'[letzten] dddd [um] LT [Uhr]'
    }，
        relativeTime：{
        未来：'在％s'，
            过去：'vor％s'，
            s：'ein paar Sekunden'，
            m：de_at__processRelativeTime，
            mm：'％d Minuten'，
            h：de_at__processRelativeTime，
    ......：'％d Stunden'，
            d：de_at__processRelativeTime，
            dd：de_at__processRelativeTime，
            M：de_at__processRelativeTime，
            MM：de_at__processRelativeTime，
            y：de_at__processRelativeTime，
            yy：de_at__processRelativeTime
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：德语（de）
//！作者：lluchs：https：//github.com/lluchs
//！作者：MenelionEllnsÃºle：https：//github.com/Oire

function de__processRelativeTime（number，withoutSuffix，key，isFuture）{
    var format = {
        'm'：['eine Minute'，'einer Minute'
]，
            'h'：['eine Stunde'，'einer Stunde'
]，
            'd'：['ein Tag'，'einem Tag'
]，
            'dd'：[数字 + 'Tage'，数字 + 'Tagen'
]，
            'M'：['ein Monat'，'einem Monat'
]，
            'MM'：[number + 'Monate'，number + 'Monaten'
]，
            'y'：['ein Jahr'，'einem Jahr'
]，
            'yy'：[数字 + 'Jahre'，数字 + 'Jahren'
]
}
    ;
    返回withoutSuffix？格式[key] [0]：格式[key] [1];
}

var de = _moment__default.defineLocale（'de'，{
    月：'Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split（'_'），
        monthsShort：'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez。'。split（'_'），
        平日：'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split（'_'），
        weekdaysShort：'So._Mo._Di._Mi._Do._Fr._Sa。'。split（'_'），
        weekdaysMin：'So_Mo_Di_Mi_Do_Fr_Sa'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD.MM.YYYY'，
            LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY HH：mm'，
            LLLL：'dddd，D。MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Heute um] LT [Uhr]'，
            sameElse：'L'，
            nextDay：'[Morgen um] LT [Uhr]'，
            nextWeek：'dddd [um] LT [Uhr]'，
            lastDay：'[Gestern um] LT [Uhr]'，
            lastWeek：'[letzten] dddd [um] LT [Uhr]'
    }，
        relativeTime：{
        未来：'在％s'，
            过去：'vor％s'，
            s：'ein paar Sekunden'，
            m：de__processRelativeTime，
            mm：'％d Minuten'，
            h：de__processRelativeTime，
    ......：'％d Stunden'，
            d：de__processRelativeTime，
            dd：de__processRelativeTime，
            M：de__processRelativeTime，
            MM：de__processRelativeTime，
            y：de__processRelativeTime，
            yy：de__processRelativeTime
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：现代希腊（el）
//！作者：Aggelos Karalias：https：//github.com/mehiel

var el = _moment__default.defineLocale（'el'，{
    monthsNominativeEl：“我™I±Î½Î¿Ï
...
    Î¬Ï ?? Î¹Î¿Ï, _Î | ÎμÎ²Ï ?? Î¿Ï
...
    Î¬Ï ?? Î¹Î¿Ï, _ÎœÎ¬Ï ?? 我“Î¹Î¿Ï, _Î “我€我？II»Î¹Î¿Ï, _ÎœÎ¬Î¹Î¿Ï, _Î™Î¿Ï ?? Î½Î¹Î¿Ï, _Î™Î¿Ï ?? 我»Î¹Î¿Ï, _Î
    'Ï？Î³Î ¿我......ÏƒÏ“Î¿Ï,_Î£ÎμÏ€I“ÎÎ¼Î²Ï??Î¹Î¿Ï,_ÎŸÎºÏ“ÏŽÎ²Ï??Î¹Î¿Ï,_Î??Î¿ÎÎ¼Î²Ï??Î¹Î¿Ï,_Î”ÎμÎºÎÎ¼Î²Ï？Î¹Î¿ I，”。分割（ '
    _
    '），
    monthsGenitiveEl：'Î™ÎÎÎÎÎÎÎÎÎ... ...Î??Î??Î??Î¿Ï...ÎÎÎÎ？Ï??ÎÎÏ...Î±Î??Î??Ï??Î??Î??Ï??Î ¯Î¿Ï..._Î'
    Ï€我？Î¹Î»Î¯Î¿Ï
...
    _ÎœÎ±I ?? Î¿Ï
......
    _I™Î¿Ï
...
    Î½Î¯Î¿Ï
......
    _I™Î¿Ï
...
    我»我¯Î¿Ï
...
    _Î
    'Ï...Î³Î¿Ï??ÏƒÏ“Î¿Ï...... _I£ÎμÏ€I“ÎμÎ¼Î²Ï??Î¯Î¿Ï..._ÎŸÎºÏ“我‰Î²Ï??Î¯Î¿Ï... _i？ ？Î¿ÎμÎ¼Î²Ï??Î¯Î¿Ï...... _I”ÎμÎºÎμÎ¼Î²Ï??Î¯Î¿Ï......” .split（ '
    _
    '），
    months：function（momentToFormat，format）{
        if（
        /D/.test(format.substring(0, format.indexOf（'MMMM'））））{//如果'MMMM'之前有一个天数
            return this._monthsGenitiveEl [momentToFormat.month（）]
            ;
        }
    else
        {
            return this._monthsNominativeEl [momentToFormat.month（）]
            ;
        }
    }，
        monthsShort：“我™I±Î½_Î | ÎμÎ²_ÎœÎ±I ?? _Î
    'Ï€我？_ÎœÎ±ÏŠ_Î™Î¿Ï...Î½_Î™Î¿Ï......我»_Î'
    Ï
...
    Î³_Î£ÎμÏ€_ÎŸÎºÏ“_i？ Î¿Îμ_Î”ÎμÎº
    '.split（ '
    _
    '），
    平日：“ISI
...
    我 ??±Î¹ÎÎºÎ®_Î”ÎμÏ
......
    我“二 ?? 我±_Î¤Ï ?? II“I·_Î¤ÎμÏ“Î¬Ï ?? 我“I·_iÎÎ¼Ï€
    Ï“Î·Î·ÎÎαÏαÎÎÎÎÎÎÎÎÏÎÎÎÎÎÎÎÎÎÎÎÎÎÎÏÏÎ”Î¿'.split（'
    _
    '），
    weekdaysShort：“ISI
...
    我 ?? _
    I”ÎμÏ
...
    _Î¤Ï ?? Î¹_Î¤ÎμÏ“_iÎμÎ¼_ÎÎ±I ?? _£ÎÎ±Î²'.split（ '
    _
    '），
    weekdaysMin：'ÎšÏ..._ÎÎÎÎÎÎÎÏ??_ÎÎÎμ_ÎÎμ_ÎαÎÎÎαÎ。.split（'
    _
    '），
    meridiem：function（hours，minutes，isLower）{
        if（
        小时 > 11）{
            返回更低？'Î¼Î¼'：'ÎœÎœ';
        }
    else
        {
            返回更低？'Ï€'
            ''
            'ÎÎœ';
        }
    }，
        isPM：function（input）{
        return（（input + ''）。toLowerCase（）[0] === 'Î¼'）;
    }，
        meridiemParse：/ [ÎÎœ] \。？Îœ？\。？/
    i，
        longDateFormat：{
        LT：'h：mm A'，
            LTS：'h：mm：ss A'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY h：mm A'，
            LLLL：'dddd，D MMMM YYYY h：mm A'
    }，
        calendarEl：{
        sameDay：'[Î£ÎÎÎÎÎÏ??Î{{}] LT'，
            nextDay：'[ÎÏ？Ï??Î¹Î¿{}] LT'，
            nextWeek：'dddd [{}] LT'，
            lastDay：'[Î§ÎÎÎÎÏÏ，{}] LT'，
            lastWeek：function（）{
            switch
                （this.day（））{
                    案例6：
                        返回
                    '[Ï“Ï¿Ï??ÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎdddd[{}] LT';
                    默认：
                        返回
                    '[Ï“Î·ÎÏÏ€Î??ÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎÎddddd [{}] LT';
                }
        }，
            sameElse：'L'
    }，
        日历：功能（键，妈妈）{
        var output = this._calendarEl [key]，
                hours = mom && mom.hours（）;
        if（
        typeof output === 'function'）{
            output = output.apply（mom）;
        }
        return output.replace（'{}'，（小时％12 === 1？'ÏƒÏ“Î·'：'ÏƒÏ”ÎÏÏ，'））;
    }，
        relativeTime：{
        未来：'ÏƒÎμ％s'，
            过去：'％sÏ€Ï??Î¹Î½'，
            s：'Î¯ÎÎÎαÎÎÎÎÎÏ...Ï“ÎμÏ??ÏŒÎ»ÎμÏ€Ï”Î'
        '，
        m：'ÎÎÎαÎÎÎÏÏ€Ï“ÏŒ'，
            mm：'％dÎÎÎÏÏ€Ï“Î¬'，
            h：'Î¼ÎÎÎÎÏÏÏαα'，
    ......：'％dÏÏÏÏÏÏ,,,,
        d：'Î¼ÎÎÎÎÎÎÎÏ??Î'
        '，
        dd：'％dÎÎÎÏ??ÎμÏ'
        '，
        M：'ÎÎÎααÏ，Î¼ÎÎÎÎÎÎÏ，'，
            MM：'％dÎÎÎÎÎÎÎÎÎÎ，'，
            y：'ÎÎÎααÏ，Ï‡Ï??ÏŒÎ½ÎÏÏ'，'，
        yy：'％dÏÏÏ??ÏŒÎ½ÎÎαα'
    }，
        ordinalParse：/ \ d {1,2}Î·/，
        序数：'％dÎ·'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：澳大利亚英语（en-au）

var en_au = _moment__default.defineLocale（'en-au'，{
    月：'January_February_March_April_May_June_July_August_September_October_November_December'.split（'_'），
        monthsShort：'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split（'_'），
        平日：'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split（'_'），
        weekdaysShort：'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split（'_'），
        weekdaysMin：'Su_Mo_Tu_We_Th_Fr_Sa'.split（'_'），
        longDateFormat：{
        LT：'h：mm A'，
            LTS：'h：mm：ss A'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY h：mm A'，
            LLLL：'dddd，D MMMM YYYY h：mm A'
    }，
        日历：{
        sameDay：'[今天在LT]，
        nextDay：'[明天在LT]，
        nextWeek：'dddd [at] LT'，
            lastDay：'[昨天在LT]，
        lastWeek：'[Last] dddd [at] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'在％s'，
            过去：'％s ago'，
            s：'几秒钟'，
            m：'一分钟'，
            mm：'％d分钟'，
            h：'一小时'，
    ......：'％d小时'，
            d：'一天'，
            dd：'％d天'，
            M：'一个月'，
            MM：'％d个月'，
            y：'一年'，
            yy：'％d年'
    }，
        ordinalParse：/ \ d {1,2}（st | nd | rd | th）/，
        序数：函数（数字）{
        var b = 数字％10，
                output =（~~（number％100 / 10）===
        1）？'th'：
    （b === 1）？'st'：
    （b === 2）？'nd'：
    （b === 3）？'rd'：'th';
        返回号 + 输出;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：加拿大英语（en-ca）
//！作者：Jonathan Abourbih：https：//github.com/jonbca

var en_ca = _moment__default.defineLocale（'en-ca'，{
    月：'January_February_March_April_May_June_July_August_September_October_November_December'.split（'_'），
        monthsShort：'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split（'_'），
        平日：'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split（'_'），
        weekdaysShort：'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split（'_'），
        weekdaysMin：'Su_Mo_Tu_We_Th_Fr_Sa'.split（'_'），
        longDateFormat：{
        LT：'h：mm A'，
            LTS：'h：mm：ss A'，
            L：'YYYY-MM-DD'，
            LL：'D MMMM，YYYY'，
            LLL：'D MMMM，YYYY h：mm A'，
            LLLL：'dddd，D MMMM，YYYY h：mm A'
    }，
        日历：{
        sameDay：'[今天在LT]，
        nextDay：'[明天在LT]，
        nextWeek：'dddd [at] LT'，
            lastDay：'[昨天在LT]，
        lastWeek：'[Last] dddd [at] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'在％s'，
            过去：'％s ago'，
            s：'几秒钟'，
            m：'一分钟'，
            mm：'％d分钟'，
            h：'一小时'，
    ......：'％d小时'，
            d：'一天'，
            dd：'％d天'，
            M：'一个月'，
            MM：'％d个月'，
            y：'一年'，
            yy：'％d年'
    }，
        ordinalParse：/ \ d {1,2}（st | nd | rd | th）/，
        序数：函数（数字）{
        var b = 数字％10，
                output =（~~（number％100 / 10）===
        1）？'th'：
    （b === 1）？'st'：
    （b === 2）？'nd'：
    （b === 3）？'rd'：'th';
        返回号 + 输出;
    }
}）;

//！moment.js语言环境配置
//！locale：英国英语（en-gb）
//！作者：Chris Gedrim：https：//github.com/chrisgedrim

var en_gb = _moment__default.defineLocale（'en-gb'，{
    月：'January_February_March_April_May_June_July_August_September_October_November_December'.split（'_'），
        monthsShort：'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split（'_'），
        平日：'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split（'_'），
        weekdaysShort：'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split（'_'），
        weekdaysMin：'Su_Mo_Tu_We_Th_Fr_Sa'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd，D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[今天在LT]，
        nextDay：'[明天在LT]，
        nextWeek：'dddd [at] LT'，
            lastDay：'[昨天在LT]，
        lastWeek：'[Last] dddd [at] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'在％s'，
            过去：'％s ago'，
            s：'几秒钟'，
            m：'一分钟'，
            mm：'％d分钟'，
            h：'一小时'，
    ......：'％d小时'，
            d：'一天'，
            dd：'％d天'，
            M：'一个月'，
            MM：'％d个月'，
            y：'一年'，
            yy：'％d年'
    }，
        ordinalParse：/ \ d {1,2}（st | nd | rd | th）/，
        序数：函数（数字）{
        var b = 数字％10，
                output =（~~（number％100 / 10）===
        1）？'th'：
    （b === 1）？'st'：
    （b === 2）？'nd'：
    （b === 3）？'rd'：'th';
        返回号 + 输出;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：esperanto（eo）
//！作者：Colin Dean：https：//github.com/colindean
//！komento：Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko。
//！Se ne，bonvolu korekti kaj avizi min por ke mi povas lerni！

var eo = _moment__default.defineLocale（'eo'，{
    月：'januaro_februaro_marto_aprilo_majo_junio_julio_aÅgusto_septembro_oktobro_novembro_decembro'.split（'_'），
        monthsShort：'jan_feb_mar_apr_maj_jun_jul_aÅg_sep_okt_nov_dec'.split（'_'），
        平日：'DimanÄ‰o_Lundo_Mardo_Merkredo_Ä'
    aÅdo_Vendredo_Sabato
    '.split（'
    _
    '），
    weekdaysShort：'Dim_Lun_Mard_Merk_Ä'
    aÅ_Ven_Sab
    '.split（'
    _
    '），
    weekdaysMin：'Di_Lu_Ma_Me_Ä'
    a_Ve_Sa
    '.split（'
    _
    '），
    longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'YYYY-MM-DD'，
            LL：'D [-an de] MMMM，YYYY'，
            LLL：'D [-an de] MMMM，YYYY HH：mm'，
            LLLL：'dddd，[la] D [-an de] MMMM，YYYY HH：mm'
    }，
        meridiemParse：/ [ap] \ .t \ .m /
    i，
        isPM：function（input）{
        return input.charAt（0）.
        toLowerCase（）===
        'p';
    }，
        meridiem：function（hours，minutes，isLower）{
        if（
        小时 > 11）{
            返回更低？'ptm'：'PTM';
        }
    else
        {
            返回更低？'atm'：'ATM';
        }
    }，
        日历：{
        sameDay：'[HodiaÅje] LT'，
            nextDay：'[MorgaÅje] LT'，
            nextWeek：'dddd [je] LT'，
            lastDay：'[HieraÅje] LT'，
            lastWeek：'[pasinta] dddd [je] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'je％s'，
            过去：'antaÅ％s'，
            s：'sekundoj'，
            m：'minuto'，
            mm：'％d minutoj'，
            h：'horo'，
    ......：'％d horoj'，
            d：'tago'，// ne'diurno'，Ä‰ar estas uzita por proksimumo
        dd：'％d tagoj'，
            M：'monato'，
            MM：'％d monatoj'，
            y：'jaro'，
            yy：'％d jaroj'
    }，
        ordinalParse：/ \ d {1,2} a /，
        序数：'％da'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：西班牙语（es）
//！作者：JulioNapurÃ：https：//github.com/julionc

var monthsShortDot = 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic。'。split（'_'），
        es__monthsShort = 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split（'_'）;

var es = _moment__default.defineLocale（'es'，{
    月：'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split（'_'），
        monthsShort：function（m，format）{
        if（
        /-MMM-/.test(format））{
            return es__monthsShort [m.month（）]
            ;
        }
    else
        {
            return monthsShortDot [m.month（）]
            ;
        }
    }，
        平日：'Domingo_Lunes_Martes_MiÃ©rcoles_Jueves_Viernes_SÃ¡bado'.split（'_'），
        weekdaysShort：'Dom._Lun._Mar._Mié._Jue._Vie._SÃ¡b。'。split（'_'），
        weekdaysMin：'Do_Lu_Ma_Mi_Ju_Vi_SÃ¡'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D [de] MMMM [de] YYYY'，
            LLL：'D [de] MMMM [de] YYYY H：mm'，
            LLLL：'dddd，D [de] MMMM [de] YYYY H：mm'
    }，
        日历：{
        sameDay：function（）{
            返回
            '[hoy a la' +（（this.hours（）！==
            1）？'s'：''）+'] LT';
        }，
            nextDay：function（）{
            返回
            '[mañaaa la' +（（this.hours（）！==
            1）？'s'：''）+'] LT';
        }，
            nextWeek：function（）{
            return 'dddd [a la' +（（this.hours（）！==
            1）？'s'：''）+'] LT';
        }，
            lastDay：function（）{
            返回
            '[ayer a la' +（（this.hours（）！==
            1）？'s'：''）+'] LT';
        }，
            lastWeek：function（）{
            返回
            '[el] dddd [pasado a la' +（（this.hours（）！==
            1）？'s'：''）+'] LT';
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'en％s'，
            过去：'hace％s'，
            s：'unos segundos'，
            m：'un minuto'，
            mm：'％d minutos'，
            h：'una hora'，
    ......：'％d horas'，
            d：'undÃa'，
            dd：'％días'，
            M：'un mes'，
            MM：'％d meses'，
            y：'unaÃ±o'，
            yy：'％daÃ±os'
    }，
        ordinalParse：/ \ d {1,2}Âº/，
        序数：'％dÂº'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：爱沙尼亚（et）
//！作者：Henry Kehlmann：https：//github.com/madhenry
//！改进：Illimar Tambek：https：//github.com/ragulka

function et__processRelativeTime（number，withoutSuffix，key，isFuture）{
    var format = {
        's'：['mÃμnesekundi'，'mÃμnisekund'，'paar sekundit'
]，
            'm'：['Ã¼heminuti'，'Ã¼ksminut'
]，
            'mm'：[number + 'minuti'，number + 'minutit'
]，
            'h'：['the tunni'，'tund aega'，'Ã¼ksund'
]，
            'hh'：[number + 'tunni'，number + 'tundi'
]，
            'd'：['Ã¼hepÃ¤eva'，'Ã¼kspÃ¤ev'
]，
            'M'：['kuu aja'，'kuu aega'，'Ã¼kskuu'
]，
            'MM'：[number + 'kuu'，number + 'kuud'
]，
            'y'：[''aasta'，'aasta'，'Ã¼ksastaasta
    '，
    'yy'：[数字 + 'aasta'，数字 + 'aastat'
]
}
    ;
    if（
    withoutSuffix）{
        返回格式[key] [2]？格式[key] [2]：格式[key] [1];
    }
    return isFuture？格式[key] [0]：格式[key] [1];
}

var et = _moment__default.defineLocale（'et'，{
    月：'jaanuar_veebruar_mÃ¤rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split（'_'），
        monthsShort：'jaan_veebr_mÃ¤rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split（'_'），
        平日：'pÃ¼hapÃ¤ev_esmaspÃ¤ev_teisipÃ¤ev_kolmapÃ¤ev_neljapÃ¤ev_reede_laupÃ¤ev'.split（'_'），
        weekdaysShort：'P_E_T_K_N_R_L'.split（'_'），
        weekdaysMin：'P_E_T_K_N_R_L'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD.MM.YYYY'，
            LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY H：mm'，
            LLLL：'dddd，D。MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：'[TÃ¤na，] LT'，
            nextDay：'[Homme，] LT'，
            nextWeek：'[JÃ¤rgmine] dddd LT'，
            lastDay：'[Eile，] LT'，
            lastWeek：'[Eelmine] dddd LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％spÃ¤rast'，
            过去：'％s tagasi'，
            s：et__processRelativeTime，
            m：et__processRelativeTime，
            mm：et__processRelativeTime，
            h：et__processRelativeTime，
            hh：et__processRelativeTime，
            d：et__processRelativeTime，
            dd：'％dpÃ¤eva'，
            M：et__processRelativeTime，
            MM：et__processRelativeTime，
            y：et__processRelativeTime，
            yy：et__processRelativeTime
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：euskara（欧盟）
//！作者：Eneko Illarramendi：https：//github.com/eillarra

var eu = _moment__default.defineLocale（'eu'，{
    月：'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split（'_'），
        monthsShort：'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr ._aza._abe。'。split（'_'），
        平日：'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split（'_'），
        weekdaysShort：'ig._al._ar._az._og._ol._lr。'。split（'_'），
        weekdaysMin：'ig_al_ar_az_og_ol_lr'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'YYYY-MM-DD'，
            LL：'YYYY [ko] MMMM [ren] D [a]'，
            LLL：'YYYY [ko] MMMM [ren] D [a] HH：mm'，
            LLLL：'dddd，YYYY [ko] MMMM [ren] D [a] HH：mm'，
            l：'YYYY-M-D'，
            ll：'YYYY [ko] MMM D [a]'，
            lll：'YYYY [ko] MMM D [a] HH：mm'，
            llll：'ddd，YYYY [ko] MMM D [a] HH：mm'
    }，
        日历：{
        sameDay：'[gaur] LT [etan]'，
            nextDay：'[bihar] LT [etan]'，
            nextWeek：'dddd LT [etan]'，
            lastDay：'[atzo] LT [etan]'，
            lastWeek：'[aurreko] dddd LT [etan]'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％s barru'，
            过去：'duela％s'，
            s：'segundo batzuk'，
            m：'minutu bat'，
            mm：'％d minutu'，
            h：'ordu bat'，
    ......：'％d ordu'，
            d：'egun bat'，
            dd：'％d egun'，
            M：'hilabete bat'，
            MM：'％d hilabete'，
            y：'urte bat'，
            yy：'％d urte'
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：波斯语（fa）
//！作者：Ebrahim Byagowi：https：//github.com/ebraminio

var fa__symbolMap = {
    '1'：'Û±'，
        '2'：'Û²'，
        '3'：'³³'，
        '4'：'Û'
'，
'5'：'Ûμ'，
        '6'：'Û¶'，
        '7'：'Û·'，
        '8'：'Û'
'，
'9'：'Û¹'，
        '0'：'Û°'
}，fa__numberMap = {
    'Û±'：'1'，
        'Û²'：'2'，
        '³³'：'3'，
        'Û'
'：'
4
'，
'Ûμ'：'5'，
        'Û¶'：'6'，
        'Û·'：'7'，
        'Û'
'：'
8
'，
'Û¹'：'9'，
        'Û°'：'0'
}
;

var fa = _moment__default.defineLocale（'fa'，{
    月：“Ú
    ~Ø§Ù†ÙÛŒÙ‡_U ??±UO‡ÛŒÙ
...
    _u±Ø§Ø¢Ø³_ØUO±ÛŒÙ“_U
...
    ü‡_Ú
    ~ÙØ | Ù†_Ú
    ~ÙØ | ÛŒÙ‡_Ø§ÙØª_Ø³Ù¾ØªØ§ Ù
...
    OO±_Ø§Ú©ØªØ¨Ø±_U†ÙØ§Ù
...
    OO±_Ø¯Ø³Ø§Ù
...
    OO±” .
    split（ '_'），
        monthsShort：“Ú
    ~Ø§Ù†ÙÛŒÙ‡_U ??±UO‡ÛŒÙ
...
    _u±Ø§Ø¢Ø³_ØUO±ÛŒÙ“_U
...
    ü‡_Ú
    ~ÙØ | Ù†_Ú
    ~ÙØ | ÛŒÙ‡_Ø§ÙØª_Ø³Ù¾ØªØ§ Ù
...
    OO±_Ø§Ú©ØªØ¨Ø±_U†ÙØ§Ù
...
    OO±_Ø¯Ø³Ø§Ù
...
    OO±” .
    split（ '_'），
        平日：'ÚŒÚ©\u200cØ'
    Ù†Ø¨Ù‡_Ø¯ÙØ
    'Ù†Ø¨Ù‡_Ø³Ù‡\u200cØ'
    Ù†Ø¨Ù‡‡‡‡Ø§Ø±Ø
    'Ù†Ø¨Ù ‡_Ù¾Ù†Ø¬\u200cØ'
    Ù†欧‡_Ø¬Ù
...
    Ø¹Ù‡_Ø
    'Ù†OU‡” .split（ '
    _
    '），
    weekdaysShort：“ÛŒÚ©\u200cØ
    'Ù†OU‡_Ø¯ÙØ'
    Ù†OU‡_Ø³Ù‡\u200cØ
    'Ù†OU‡_U†Ù‡Ø§Ø±Ø'
    Ù†OU ‡_Ù¾Ù†Ø¬\u200cØ
    'Ù†欧‡_Ø¬Ù...Ø¹Ù‡_Ø'
    Ù†OU‡” .
    split（ '_'），
        weekdaysMin：'_Œ_Ø¯_Ø³_Ú†_Ù¾_Ø¬_Ø'
    '.split（'
    _
    '），
    longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd，D MMMM YYYY HH：mm'
    }，
        meridiemParse：/Ù,Ø¨Ù“Ø§Ø²Ø¸Ù‡Ø±|ØØØØØØ§Ø²Ø¸Ù‡Ø±/，
        isPM：function（input）{
        返回 / Ø¨Ø¹Ø¯Ø§Ø²Ø¸Ù‡Ø±/ .test（输入）;
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 12）{
            返回
            'Ù，Ø¨“”Ø§Ø²Ø¸Ù‡Ø±';
        }
    else
        {
            返回
            'Ø¨Ø¹Ø¯Ø§Ø²Ø¸Ù‡Ø±';
        }
    }，
        日历：{
        sameDay：'[Ø§Ù...Ø±ÙØ²Ø³Ø§Ø¹Øª] LT'，
            nextDay：'[Ù??Ø±ØØØ§Ø³Ø§Ø¹Øª] LT'，
            nextWeek：'dddd [Ø³Ø§Ø¹Øª] LT'，
            lastDay：'[Ø¯ÛŒØ±ÙØ²Ø³Ø§Ø¹Øª] LT'，
            lastWeek：'dddd [Ù¾ÛŒØ'
    ]
        [Ø³Ø§Ø¹Øª
    ]
        LT
        '，
        sameElse：'L'
    }，
        relativeTime：{
        未来：'Ø¯Ø±％s'，
            过去：'％sÙ¾ÛŒØ'
        '，
        s：'Ú†††Ø¯ÛŒÙ†Ø«Ø§Ù†ÛÛÙ‡'，
            m：'ÛŒÚ©Ø¯Ù，ÛŒÙ，Ù'，
            mm：'％dØ¯Ù，ÛŒÙ，Ù'，
            h：'ÛŒÚ©Ø³Ø§Ø¹Øª'，
    ......：'％dØ³Ø§Ø¹Øª'，
            d：'ÛŒÚ©Ø±ÙØ²'，
            dd：'％dØ±ÙØ²'，
            M：'ÛŒÚ©Ù......Ø§Ù‡'，
            MM：'％dÙ...Ø§Ù‡'，
            y：'ÛŒÚ©Ø³Ø§Ù“'，
            yy：'％dØ³Ø§Ù“'
    }，
        preparse：function（string）{
        return string.replace（/ [Û°-Û¹] /
        g，function（match）{
            return fa__numberMap [match];
        }）。replace（/ØŒ/
        g，'，'）;
    }，
        postformat：function（string）{
        return string.replace（/ \ d /
        g，function（match）{
            return fa__symbolMap [match];
        }）。replace（/，/
        g，'ØŒ'）;
    }，
        ordinalParse：/ \ d {1,2}Ù... /，
        序数：'％dÙ......'，
        周：{
        道：6，//星期六是一周的第一天。
        doy：12 //包含Jan 1的那一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：芬兰语（fi）
//！作者：Tarmo Aidantausta：https：//github.com/bleadof

var numbersPast = 'nolla yksi kaksikolmeneljÃ¤viisikuusiseitsemÃ¤nkahdeksanyhdeksÃ¤n'.split（''），
        numbersFuture = [
            'nolla'，'yhden'，'kahden'，'kolmen'，'neljÃ¤n'，'viiden'，'kuuden'，
            numbersPast [7]，numbersPast [8]，numbersPast [9]
]。
    function fi__translate（number，withoutSuffix，key，isFuture）{
    var result = '';
    开关（键）{
        案件
        ''：
            return isFuture？'muutaman sekunnin'：'muutama sekunti';
    case
        'm'：
            return isFuture？'minuutin'：'minuutti';
        案例
        'mm'：
            result = isFuture？'minuutin'：'minuuttia';
        打破;
        案例
        'h'：
            return isFuture？'tunnin'：'tunti';
        案件
        'hh'：
            result = isFuture？'tunnin'：'tuntia';
        打破;
        案例
        'd'：
            return isFuture？'pÃ¤ivÃ¤n'：'pÃ¤ivÃ¤';
        案例
        'dd'：
            result = isFuture？'pÃ¤ivÃ¤n'：'pÃ¤ivÃ¤Ã¤';
        打破;
        案例
        'M'：
            return isFuture？'kuukauden'：'kuukausi';
        案例
        'MM'：
            result = isFuture？'kuukauden'：'kuukautta';
        打破;
        案例
        'y'：
            return isFuture？'vuoden'：'vuosi';
        案例
        'yy'：
            result = isFuture？'vuoden'：'vuotta';
        打破;
    }
    result = verbalNumber（number，isFuture）+'' + result;
    返回结果;
}

function verbalNumber（number，isFuture）{
    返回次数 < 10？（isFuture？numbersFuture [number]：numbersPast [number]）：number;
}

var fi = _moment__default.defineLocale（'fi'，{
    月：'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesÃ¤kuu_heinÃ¤kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split（'_'），
        monthsShort：'tammi_helmi_maalis_huhti_touko_kesÃ¤_heinÃ¤_elo_syys_loka_marras_joulu'.split（'_'），
        平日：'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split（'_'），
        weekdaysShort：'su_ma_ti_ke_to_pe_la'.split（'_'），
        weekdaysMin：'su_ma_ti_ke_to_pe_la'.split（'_'），
        longDateFormat：{
        LT：'HH.mm'，
            LTS：'HH.mm.ss'，
            L：'DD.MM.YYYY'，
            LL：'做MMMM [ta] YYYY'，
            LLL：'做MMMM [ta] YYYY，[klo] HH.mm'，
            LLLL：'dddd，做MMMM [ta] YYYY，[klo] HH.mm'，
            l：'DMYYYY'，
            ll：'MMM YYYY'，
            lll：'MMM YYYY，[klo] HH.mm'，
            llll：'ddd，MMM YYYY，[klo] HH.mm'
    }，
        日历：{
        sameDay：'[tÃ¤nÃ¤Ã¤n] [klo] LT'，
            nextDay：'[huomenna] [klo] LT'，
            nextWeek：'dddd [klo] LT'，
            lastDay：'[eilen] [klo] LT'，
            lastWeek：'[viime] dddd [na] [klo] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％spÃ¤Ã¤stÃ¤'，
            过去：'％s sitten'，
            s：fi__translate，
            m：fi__translate，
            mm：fi__translate，
            h：fi__translate，
            hh：fi__translate，
            d：fi__translate，
            dd：fi__translate，
            M：fi__translate，
            MM：fi__translate，
            y：fi__translate，
            yy：fi__translate
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：faroese（fo）
//！作者：Ragnar Johannesen：https：//github.com/ragnar123

var fo = _moment__default.defineLocale（'fo'，{
    月：'januar_februar_mars_aprÃl_mai_juni_juli_august_september_oktober_november_desember'.split（'_'），
        monthsShort：'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split（'_'），
        平日：'sunnudagur_mÃ¡nadagur_tÃ½sdagur_mikudagur_hÃ³sdagur_frÃggjadagur_leygardagur'.split（'_'），
        weekdaysShort：'sun_mÃ¡n_tÃ½s_mik_hÃ³s_frÃ_ley'.split（'_'），
        weekdaysMin：'su_mÃ¡_tÃ½_mi_hÃ³_fr_le'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D. MMMM，YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Ã?? dag kl。] LT'，
            nextDay：'[Ã?? morgin kl。] LT'，
            nextWeek：'dddd [kl。] LT'，
            lastDay：'[Ã?? gjÃ¡rkl。] LT'，
            lastWeek：'[sÃÃstu] dddd [kl] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'um％s'，
            过去：'％sÃÃ°ani'，
            s：'fÃ¡sekund'，
            m：'ein minutt'，
            mm：'％d minuttir'，
            h：'eintími'，
    ......：'％dtonM'，
            d：'ein dagur'，
            dd：'％d dagar'，
            M：'einmÃ¡naÃ°i'，
            MM：'％dmÃ¡naÃ°ir'，
            y：'eittÃ¡r'，
            yy：'％dÃ¡r'
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：加拿大法语（fr-ca）
//！作者：Jonathan Abourbih：https：//github.com/jonbca

var fr_ca = _moment__default.defineLocale（'fr-ca'，{
    月：'janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ>t_septembre_octobre_novembre_dÃ©cembre'.split（'_'），
        monthsShort：'janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ>t_sept._oct._nov._déc。'。split（'_'），
        平日：'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split（'_'），
        weekdaysShort：'dim._lun._mar._mer._jeu._ven._sam。'。split（'_'），
        weekdaysMin：'Di_Lu_Ma_Me_Je_Ve_Sa'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'YYYY-MM-DD'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Aujourd \'huiÃ] LT'，
            nextDay：'[DemainÃ] LT'，
            nextWeek：'dddd [Ã] LT'，
            lastDay：'[HierÃLT'
        '，
        lastWeek：'dddd [dernierÃ] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'dans％s'，
            过去：'il ya％s'，
            s：'quelques secondes'，
            m：'不分钟'，
            mm：'％d分钟'，
            h：'不健康'，
    ......：'％d heures'，
            d：'un jour'，
            dd：'％d jours'，
            M：'un mois'，
            MM：'％d mois'，
            y：'联合国'，
            yy：'％d ans'
    }，
        ordinalParse：/ \ d {1,2}（呃| e）/，
        序数：函数（数字）{
        返回号码 +（号码 === 1？'呃'：'e'）;
    }
}）;

//！moment.js语言环境配置
//！locale：french（fr）
//！作者：John Fischer：https：//github.com/jfroffice

var fr = _moment__default.defineLocale（'fr'，{
    月：'janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ>t_septembre_octobre_novembre_dÃ©cembre'.split（'_'），
        monthsShort：'janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ>t_sept._oct._nov._déc。'。split（'_'），
        平日：'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split（'_'），
        weekdaysShort：'dim._lun._mar._mer._jeu._ven._sam。'。split（'_'），
        weekdaysMin：'Di_Lu_Ma_Me_Je_Ve_Sa'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[Aujourd \'huiÃ] LT'，
            nextDay：'[DemainÃ] LT'，
            nextWeek：'dddd [Ã] LT'，
            lastDay：'[HierÃLT'
        '，
        lastWeek：'dddd [dernierÃ] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'dans％s'，
            过去：'il ya％s'，
            s：'quelques secondes'，
            m：'不分钟'，
            mm：'％d分钟'，
            h：'不健康'，
    ......：'％d heures'，
            d：'un jour'，
            dd：'％d jours'，
            M：'un mois'，
            MM：'％d mois'，
            y：'联合国'，
            yy：'％d ans'
    }，
        ordinalParse：/ \ d {1,2}（er |）/，
        序数：函数（数字）{
        返回号码 +（号码 === 1？'呃'：''）;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：弗里斯兰语（fy）
//！作者：Robin van der Vliet：https：//github.com/robin0van0der0v

var fy__monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des。'。split（'_'），
        fy__monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split（'_'）;

var fy = _moment__default.defineLocale（'fy'，{
    月：'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split（'_'），
        monthsShort：function（m，format）{
        if（
        /-MMM-/.test(format））{
            return fy__monthsShortWithoutDots [m.month（）]
            ;
        }
    else
        {
            return fy__monthsShortWithDots [m.month（）]
            ;
        }
    }，
        平日：'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split（'_'），
        weekdaysShort：'si._mo._ti._wo._to._fr._so。'。split（'_'），
        weekdaysMin：'Si_Mo_Ti_Wo_To_Fr_So'.split（'_'），
        longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD-MM-YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY HH：mm'，
            LLLL：'dddd D MMMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[hjoed om] LT'，
            nextDay：'[moarn om] LT'，
            nextWeek：'dddd [om] LT'，
            lastDay：'[juster om] LT'，
            lastWeek：'[Ã'
        frÃ»ne
    ]
        dddd [om]
        LT
        '，
        sameElse：'L'
    }，
        relativeTime：{
        未来：'oer％s'，
            过去：'％s lyn'，
            s：'在梨sekonden'，
            米：'ienminÃºt'，
            mm：'％d minuten'，
            h：'ien oere'，
    ......：'％d oeren'，
            d：'ien dei'，
            dd：'％d dagen'，
            M：'ien moanne'，
            MM：'％d moannen'，
            y：'ien jier'，
            yy：'％d jierren'
    }，
        ordinalParse：/ \ d {1,2}（ste | de）/，
        序数：函数（数字）{
        返回数字 +（（数字 === 1 || 数字 === 8 || 数字 > = 20）？'ste'：'de'）;
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：galician（gl）
//！作者：Juan G. Hurtado：https：//github.com/juanghurtado

var gl = _moment__default.defineLocale（'gl'，{
    月：'Xaneiro_Febreiro_Marzo_Abril_Maio_XuÃ±o_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro'.split（'_'），
        monthsShort：'Xan._Feb._Mar._Abr._Mai._XuÃ。._ Xul._Ago._Set._Out._Nov._Dec。'。split（'_'），
        平日：'Domingo_Luns_Martes_MÃ©rcores_Xoves_Venres_SÃ¡bado'.split（'_'），
        weekdaysShort：'Dom._Lun._Mar._MÃ©r._Xov._Ven._SÃ¡b。'。split（'_'），
        weekdaysMin：'Do_Lu_Ma_MÃ©_Xo_Ve_SÃ¡'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY H：mm'，
            LLLL：'dddd D MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：function（）{
            返回
            '[hoxe' +（（this.hours（）！==
            1）？'Ã'
            ''：'¡'）+'] LT';
        }，
            nextDay：function（）{
            返回
            '[maÃ±¡+ +（（this.hours（）！== 1）？'
            Ã
            ''
            '：'
            Ã
            ''）+'] LT';
        }，
            nextWeek：function（）{
            return 'dddd [' +（（this.hours（）！==
            1）？'Ã'
            ''：'a'）+'] LT';
        }，
            lastDay：function（）{
            return '[onte' +（（this.hours（）！==
            1）？'Ã'
            '：'
            a
            '）+'
        ]
            LT
            ';
        }，
            lastWeek：function（）{
            返回
            '[o] dddd [pasado' +（（this.hours（）！==
            1）？'Ã'
            ''：'a'）+'] LT';
        }，
            sameElse：'L'
    }，
        relativeTime：{
        future：function（str）{
            if（
            str === 'uns segundos'）{
                返回
                '修女segundos';
            }
            return 'en' + str;
        }，
            过去：'hai％s'，
            s：'uns segundos'，
            m：'un minuto'，
            mm：'％d minutos'，
            h：'unha hora'，
    ......：'％d horas'，
            d：'undÃa'，
            dd：'％días'，
            M：'un mes'，
            MM：'％d meses'，
            y：'un ano'，
            yy：'％d anos'
    }，
        ordinalParse：/ \ d {1,2}Âº/，
        序数：'％dÂº'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：希伯来语（他）
//！作者：Tomer Cohen：https：//github.com/tomer
//！作者：Moshe Simantov：https：//github.com/DevelopmentIL
//！作者：Tal Ater：https：//github.com/TalAter

var he = _moment__default.defineLocale（'he'，{
    月份：'×™××•×??×¨×¤×'×¬×××××××××××××××××××××××××××× ？×™_×™×•××™_×™×•×œ×™_×??×•×'×•×¡×〜×¡×¤×〜×ž×'×¨× ？×•×§×〜×•×'×¬××•×'×ž×'×¨×“×|×ž×'×¨'.split（'
    _
    '），
    monthsShort：'×™××•×³_×¤×'×¨×³_×ž×¨×¥_×??×¤×¨×³_×ž×??×™_×™×•××™_ ×™×•×œ×™_×??×•×'×³×××××××××××××× '。分裂（'_'），
        工作日：'×¨×??×©×•×_××××™_×©×™××××_×¨×'×™×¢×™_× - ×ž×™× ×™_×©×™×©×™_×©× '×ª'.split（' _'），
        平日短程：'×??×³_×'×³_×'×³_×“×³_×”×³_×•×³_×©×³'.split（'_'），
        weekdaysMin：'×?? _×'
    _×'_×“_×”_×•_×©.split（'
    _
    '），
    longDateFormat：{
        LT：'HH：mm'，
            LTS：'HH：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D [×'
    ]
        MMMM
        YYYY
        '，
        LLL：'D [×'
    ]
        MMMM
        YYYY
        HH：mm
        '，
        LLLL：'dddd，D [×'
    ]
        MMMM
        YYYY
        HH：mm
        '，
        l：'D / M / YYYY'，
            ll：'D MMM YYYY'，
            lll：'D MMM YYYY HH：mm'，
            llll：'ddd，D MMM YYYY HH：mm'
    }，
        日历：{
        sameDay：'[×“×™×•×?? × '
        Ö¾]
        LT
        '，
        nextDay：'[×ž× - ×¨×'
        Ö¾]
        LT
        '，
        nextWeek：'dddd [×'×©×¢×“]
        LT
        '，
        lastDay：'[×??×ª×ž×•×œ×'
        Ö¾]
        LT
        '，
        lastWeek：'[×'×™×•×??]
        dddd [×“×??× - ×¨×•×Ÿ×'×©×¢×”] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'×'×¢×•×“％s
        '，
        过去：'×œ×¤××™％s'，
            s：'×ž×¡×¤×¨××××™×•×ª'，
            m：'×“×§×”'，
            mm：'％d×“×§×•×ª'，
            h：'×©×¢×“'，
            hh：function（number）{
            if（
            number === 2）{
                返回
                '×©×¢×ª×™×™×??';
            }
            返回号码 + '×©×¢×•×ª';
        }，
            d：'×™×•×??'，
            dd：function（number）{
            if（
            number === 2）{
                返回
                '×™×•×ž×™×™×??';
            }
            返回号 + '×™×ž×™×??';
        }，
            M：'× - ×•×“×©'，
            MM：函数（数字）{
            if（
            number === 2）{
                返回
                '× - ×•×“×©×™×™×??';
            }
            返回数 + '× - ×•×“×©×™×??';
        }，
            y：'×©××'
        '，
        yy：function（number）{
            if（
            number === 2）{
                返回
                '×©××ª×™×™×??';
            }
        else
            if（
            number％10 === 0 && number！==
            10）{
                返回号码 + '×©××“';
            }
            返回号码 + '×©××™×??';
        }
    }
}）;

//！moment.js语言环境配置
//！locale：印地文（hi）
//！作者：Mayank Singhal：https：//github.com/mayanksinghal

var hi__symbolMap = {
    '1'：'à¥§'，
        '2'：'à¥¨'，
        '3'：'à¥©'，
        '4'：'à¥ª'，
        '5'：'à¥«'，
        '6'：'à¥¬'，
        '7'：'à¥'，
        '8'：'à¥®'，
        '9'：'à¥'，
        '0'：'à¥|'
}，
    hi__numberMap = {
        'à¥§'：'1'，
        'à¥¨'：'2'，
        'à¥©'：'3'，
        'à¥ª'：'4'，
        'à¥«'：'5'，
        'à¥¬'：'6'，
        'à¥'：'7'，
        'à¥®'：'8'，
        'à¥¯'：'9'，
        'à¥|'：'0'
}
;

var hi = _moment__default.defineLocale（'hi'，{
    月：'à¤œà¤¨à¤μà¤°à€€_à¤«à¤¼à¤°à¤μà¤°à¥¥_à¤®à¤¾à¤°à¥??à¤š_à¤...à ¤ªà¥??澶°A¥à¤²_à¤®à¤_à¤œà¥，à¤¨_à¤œà¥??à¤²à¤¾à¤_à¤...å¤-à¤¸à¥?? à¤¤_à¤¸à¤¿à¤¤à¤®à¥??à¤¬à¤°_à¤......澶•A¥??à¤Ÿà¥，à¤¬à¤°_à¤¨à ¤μà¤®à¥??à¤¬à¤°_à¤|à¤¿à¤¸à¤®à¥??à¤¬à¤°” .split（ '
    _
    '），
    monthsShort：'à¤œà¤¨._à¤«à¤¼à¤°._à¤®à¤¾à¤°à¥??à¤š_à¤...à¤ªà¥??à¤°à¥._¤ ®à¤_à¤œà¥，à¤¨_à¤œà¥??à¤²._à¤...澶-._à¤¸à¤¿à¤¤._à¤......澶•à¥??澶YA¥，._à¤¨à¤μ._à¤|à¤¿à¤¸。 '
    分裂（' _'），
        平日：'à¤°à¤μà¤¿à¤μà¤¾à¤°_à¤¸à¥<à¤®à¤μà¤¾à¤°_à¤®à¤，à¤-à¤²à¤μà¤¾à ¤°_à¤¬à¥??à¤§à¤μà¤¾à¤°_à¤-à¥??澶°A¥，à¤μà¤¾à¤°_à¤¶à¥??å¤•à ¥??å¤°à¤μà¤¾à¤°_à¤¶à¤¨à¤¿à¤μà¤¾à¤°” .split（ '
    _
    '），
    平日短暂：'à¤°à¤μà¤¿_à¤¸à¥<à¤®_à¤®à¤，à¤-à¤²_à¤¬à¥??à¤§_à¤-à¥??à¤ °A¥，_à¤¶à¥??澶•A¥??å¤°_à¤¶à¤¨à¤¿'.split（ '_'），
        weekdaysMin：'à¤°_à¤¸à¥<_à¤®à¤,_à¤¬à¥?? _à¤-à¥?? _à¤¶à¥?? _à¤¶'.split（'_'） ，
        longDateFormat：{
        LT：'A h：mmà¤¬à¤œà¥‡'，
            LTS：'A h：mm：ssà¤¬à¤œà¥‡'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY，A h：mmà¤¬à¤œà¥‡'，
            LLLL：'dddd，D MMMM YYYY，A h：mmà¤¬à¤œà¥‡'
    }，
        日历：{
        sameDay：'[à¤†à¤œ] LT'，
            nextDay：'[à¤•à¤²] LT'，
            nextWeek：'dddd，LT'，
            lastDay：'[à¤•à¤²] LT'，
            lastWeek：'[à¤ªà¤¿à¤>à¤²à¥‡] dddd，LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％sà¤®à¥‡à¤，'，
            过去：'％sà¤ªà¤¹à¤²à¥‡'，
            s：'à¤•à¥??à¤>à¤¹à¥à€•à¥??à¤·à££'，
            m：'à¤??à¤•à¤®à¤¿à¤¨à¤Ÿ'，
            mm：'％dà¤®à¤¿à¤¨à¤Ÿ'，
            h：'à¤??à¤•à¤〜¤¤，à¤Ÿà¤¾'，
    ......：'％dà¤~à¤，à¤Ÿà¥‡'，
            d：'à¤??à¤•à¤|à¤¿à¤¨'，
            dd：'％dà¤|à¤¿à¤¨'，
            M：'à¤??à¤•à¤®à¤¹à¥€à¨à¥‡'，
            MM：'％dà¤®à¤¹à¥€à¨à¥‡'，
            y：'à¤??à¤•à¤μà¤°à¥??à¤·'，
            yy：'％dà¤μà¤°à¥??à¤·'
    }，
        preparse：function（string）{
        return string.replace（/ [à¥§à¥¨à¥©à¥œà¥«à¥¬à¥à¥®à¥¯à¥|] /
        g，function（match）{
            return hi__numberMap [match];
        }）;
    }，
        postformat：function（string）{
        return string.replace（/ \ d /
        g，function（match）{
            return hi__symbolMap [match];
        }）;
    }，
    //经文的印地语符号在实践中非常模糊。虽然存在
    //一个'Pahar'的僵硬概念，它在现代印地语中并没有被严格地使用。
    meridiemParse：/à¤°à¤¾à¤¤|à¤¸à¥??à¤àà¹¹|à¤|à¥<à¤ªà¹¹¤°|à¤¶à¤¾à¤®/，
        meridiemHour：function（hour，meridiem）{
        if（
        小时 === 12）{
            小时 = 0;
        }
        if（
        meridiem === 'à¤°à¤¾à¤¤'）{
            返回时间 < 4？小时：小时 + 12;
        }
    else
        if（
        meridiem === 'à¤¸à¥??à¤¬à¤¹'）{
            返回时间;
        }
    else
        if（
        meridiem === 'à¤|à¥<à¤ªà¤¹à¤°'）{
            返回时间 > = 10？小时：小时 + 12;
        }
    else
        if（
        meridiem === 'à¤¶à¤¾à¤®'）{
            返回时间 + 12;
        }
    }，
        meridiem：function（hour，minute，isLower）{
        if（
        小时 < 4）{
            返回
            'à¤°à¤¾à¤¤';
        }
    else
        if（
        hour < 10）{
            返回
            'à¤¸à¥??à¤¬à¹¹';
        }
    else
        if（
        hour < 17）{
            return 'à¤|à¥<à¤ªà¤¹à¤°';
        }
    else
        if（
        hour < 20）{
            return 'à¤¶à¤¾à¤®';
        }
    else
        {
            返回
            'à¤°à¤¾à¤¤';
        }
    }，
        周：{
        道：0，//星期日是一周的第一天。
        doy：6 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：hrvatski（hr）
//！作者：BojanMarkoviÄ‡：https：//github.com/bmarkovic

function hr__translate（number，withoutSuffix，key）{
    var result = number + '';
    开关（键）{
    case
        'm'：
            返回withoutSuffix？'jedna minuta'：'jedne分钟';
        案例
        'mm'：
            if（
        number === 1）{
            结果 + = 'minuta';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = '分钟';
        }
    else
        {
            结果 + = 'minuta';
        }
        返回结果;
        案例
        'h'：
            返回withoutSuffix？'jedan sat'：'jednog sata';
        案件
        'hh'：
            if（
        number === 1）{
            结果 + = 'sat';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = 'sata';
        }
    else
        {
            结果 + = 'sati';
        }
        返回结果;
        案例
        'dd'：
            if（
        number === 1）{
            结果 + = 'dan';
        }
    else
        {
            结果 + = 'dana';
        }
        返回结果;
        案例
        'MM'：
            if（
        number === 1）{
            结果 + = 'mjesec';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = 'mjeseca';
        }
    else
        {
            结果 + = 'mjeseci';
        }
        返回结果;
        案例
        'yy'：
            if（
        number === 1）{
            结果 + = 'godina';
        }
    else
        if（
        number === 2 || number === 3 || number === 4）{
            结果 + = 'godine';
        }
    else
        {
            结果 + = 'godina';
        }
        返回结果;
    }
}

var hr = _moment__default.defineLocale（'hr'，{
    几个月：'sijeÄ??anj_veljaÄ??a_oÅ¾ujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split（'_'），
        monthsShort：'sij._velj._oÅ¾u._tra._svi._lip._srp._kol._ruj._lis._stu._pro。'。split（'_'），
        平日：'nedjelja_ponedjeljak_utorak_srijeda_Ä?? etvrtak_petak_subota'.split（'_'），
        weekdaysShort：'ned._pon._uto._sri._Ä?? et._pet._sub。'。split（'_'），
        weekdaysMin：'ne_po_ut_sr_Ä?? e_pe_su'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD。MM。YYYY”，
        LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY H：mm'，
            LLLL：'dddd，D。MMMM YYYY H：mm'
    }，
        日历：{
        sameDay：'[danas u] LT'，
            nextDay：'[sutra u] LT'，
            nextWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                    返回
                    '[u] [nedjelju] [u] LT';
                    案例3：
                    返回
                    '[u] [srijedu] [u] LT';
                    案例6：
                    返回
                    '[u] [subotu] [u] LT';
                    情况1：
                案例2：
                案例4：
                案例5：
                    返回
                    '[u] dddd [u] LT';
                }
        }，
            lastDay：'[ju？??你] LT'，
            lastWeek：function（）{
            switch
                （this.day（））{
                    案例0：
                案例3：
                    返回
                    '[proÅ¡lu] dddd [u] LT';
                    案例6：
                    return '[proÅ¡le] [subote] [u] LT';
                    情况1：
                案例2：
                案例4：
                案例5：
                    返回
                    '[proÅ¡li] dddd [u] LT';
                }
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'za％s'，
            过去：'prije％s'，
            s：'par sekundi'，
            m：hr__translate，
            mm：hr__translate，
            h：hr__translate，
            hh：hr__translate，
            d：'dan'，
            dd：hr__translate，
            M：'mjesec'，
            MM：hr__translate，
            y：'godinu'，
            yy：hr__translate
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：匈牙利语（hu）
//！作者：Adam Brunner：https：//github.com/adambrunner

var weekEndings = 'vasÃ¡rnaphÃ©tfÅ'
nkeddenszerdÃ¡ncsÃ¼tÃ¶rtÃ¶kÃ¶npÃ©nteken
szombaton
'.split（'
'）;

function hu__translate（number，withoutSuffix，key，isFuture）{
    var num = number，
            后缀;
    开关（键）{
        案件
        ''：
            return（isFuture || withoutSuffix）？'nÃ©hÃ¡nymÃ¡sodperc'：'nÃ©hÃ¡nymÃ¡sodperce';
    case
        'm'：
            返回
        'egy' +（isFuture || withoutSuffix？'perc'：'perce'）;
        案例
        'mm'：
            return num +（isFuture || withoutSuffix？'perc'：'perce'）;
        案例
        'h'：
            返回
        'egy' +（isFuture || withoutSuffix？'Ã³ra'：'Ã³rÃ¡ja'）;
        案件
        'hh'：
            return num +（isFuture || withoutSuffix？'Ã³ra'：'Ã³rÃ¡ja'）;
        案例
        'd'：
            返回
        'egy' +（isFuture || withoutSuffix？'nap'：'napja'）;
        案例
        'dd'：
            返回num +（isFuture || withoutSuffix？'nap'：'napja'）;
        案例
        'M'：
            返回
        'egy' +（isFuture || withoutSuffix？'hÃ³nap'：'hÃ³napja'）;
        案例
        'MM'：
            return num +（isFuture || withoutSuffix？'hÃ³nap'：'hÃ³napja'）;
        案例
        'y'：
            返回
        'egy' +（isFuture || withoutSuffix？'Ã©v'：'Ã¢ve'）;
        案例
        'yy'：
            return num +（isFuture || withoutSuffix？'Ã©v'：'Ã¢ve'）;
    }
    返回
    '';
}
函数周（isFuture）{
    return（isFuture？''：'[mÃºlt]'）+'[' + weekEndings [this.day（）]
    +'] LT [-kor]';
}

var hu = _moment__default.defineLocale（'hu'，{
    月：'januÃ¡r_februÃ¡r_mÃ¡rcius_Ã¡prilis_mÃ¡jus_jÃºnius_jÃºlius_augusztus_szeptember_oktÃ³ber_november_december'.split（'_'），
        monthsShort：'jan_feb_mÃ¡rc_Ã¡pr_mÃ¡j_jÃºn_jÃºl_aug_szept_okt_nov_dec'.split（'_'），
        平日：'vasÃ¡rnap_hÃ©tfÅ'
    _kedd_szerda_csÃ¼tÃ¶rtÃ¶k_pÃ©ntek_szombat
    '.split（'
    _
    '），
    weekdaysShort：'vas_hÃ©t_kedd_sze_csÃ¼t_pÃ©n_szo'.split（'_'），
        weekdaysMin：'v_h_k_sze_cs_p_szo'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'YYYY.MM.DD。'，
            LL：'YYYY。MMMM D.'，
            LLL：'YYYY。MMMM D. H：mm'，
            LLLL：'YYYY。MMMM D.，dddd H：mm'
    }，
        meridiemParse：/ de | du /
    i，
        isPM：function（input）{
        return input.charAt（1）.
        toLowerCase（）===
        'u';
    }，
        meridiem：function（hours，minutes，isLower）{
        if（
        小时 < 12）{
            return isLower === true？'de'：'DE';
        }
    else
        {
            return isLower === true？'du'：'DU';
        }
    }，
        日历：{
        sameDay：'[ma] LT [-kor]'，
            nextDay：'[holnap] LT [-kor]'，
            nextWeek：function（）{
            return week.call（this，true）;
        }，
            lastDay：'[tegnap] LT [-kor]'，
            lastWeek：function（）{
            return week.call（this，false）;
        }，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'％smÃºlva'，
            过去：'％s'，
            s：hu__translate，
            m：hu__translate，
            mm：hu__translate，
            h：hu__translate，
            hh：hu__translate，
            d：hu__translate，
            dd：hu__translate，
            M：hu__translate，
            MM：hu__translate，
            y：hu__translate，
            yy：hu__translate
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！地区：亚美尼亚语（hy-am）
//! author : Armendarabyan : https://github.com/armendarabyan

function hy_am__monthsCaseReplace(m, format) {
    var months = {
            'nominative': 'Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€_Õ´Õ¡Ö€Õ¿_Õ¡ÕºÖ€Õ«Õ¬_Õ´Õ¡ÕµÕ«Õ½_Õ°Õ¸Ö‚Õ¶Õ«Õ½_Õ°Õ¸Ö‚Õ¬Õ«Õ½_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€'.split('_'),
            'accusative': 'Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€Õ«_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€Õ«_Õ´Õ¡Ö€Õ¿Õ«_Õ¡ÕºÖ€Õ«Õ¬Õ«_Õ´Õ¡ÕµÕ«Õ½Õ«_Õ°Õ¸Ö‚Õ¶Õ«Õ½Õ«_Õ°Õ¸Ö‚Õ¬Õ«Õ½Õ«_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½Õ«_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
    return months[nounCase][m.month()];
}

function hy_am__monthsShortCaseReplace(m, format) {
    var monthsShort = 'Õ°Õ¶Õ¾_ÖƒÕ¿Ö€_Õ´Ö€Õ¿_Õ¡ÕºÖ€_Õ´ÕµÕ½_Õ°Õ¶Õ½_Õ°Õ¬Õ½_Ö…Õ£Õ½_Õ½ÕºÕ¿_Õ°Õ¯Õ¿_Õ¶Õ´Õ¢_Õ¤Õ¯Õ¿'.split('_');
    return monthsShort[m.month()];
}

function hy_am__weekdaysCaseReplace(m, format) {
    var weekdays = 'Õ¯Õ«Ö€Õ¡Õ¯Õ«_Õ¥Ö€Õ¯Õ¸Ö‚Õ·Õ¡Õ¢Õ©Õ«_Õ¥Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ¹Õ¸Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ°Õ«Õ¶Õ£Õ·Õ¡Õ¢Õ©Õ«_Õ¸Ö‚Ö€Õ¢Õ¡Õ©_Õ·Õ¡Õ¢Õ¡Õ©'.split('_');
    return weekdays[m.day()];
}

var hy_am = _moment__default.defineLocale('hy-am', {
    months: hy_am__monthsCaseReplace,
    monthsShort: hy_am__monthsShortCaseReplace,
    weekdays: hy_am__weekdaysCaseReplace,
    weekdaysShort: 'Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©'.split('_'),
    weekdaysMin: 'Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY Õ©.',
        LLL: 'D MMMM YYYY Õ©., HH:mm',
        LLLL: 'dddd, D MMMM YYYY Õ©., HH:mm'
    },
    calendar: {
        同一天：'[Õ¡ÕμÕ½Ö...Ö€] LT'，
            nextDay：'[Õ¾Õ¡²²¨] LT'，
            最后一天：'[Õ¥å¯¥Õ¯] LT'，
            nextWeek：function（）{
    LT
    ''
    返回
    'dddd [Ö...Ö€Õ¨Õ¡Õ'
    Õ¨]
    LT
    ';
}，
            lastWeek：function（）{
    LT
    ''
    返回
    '[Õ¡Õ¶Ö??Õ¡Õ®] dddd [Ö...Ö€ÕªÕÕ
}，
            sameElse：'L'
}，
        relativeTime：{
    未来：'％sÕ°Õ¥Õ¿'
    '，
    过去：'％sÕ¡Õ¼Õ»'，
            s：'Õ'
    ÕÕÕÕÕÕ
    m：'Ö€Õ¥'，
            mm：'％dÖ¸Õ¥'，
            h：'ÕªÕ'
    ''，
......：'％dÕªÕ'
    ''，
            d：'Ö...Ö€'，
            dd：'％dÖ...Ö€'，
            M：'Õ'
    Õ
    ''
    Õ½'，
    MM：'％dÕ'
    Õ
    ''
    Õ½'，
    y：'Õ¿Õ¡€«'，
            yy：'％dÕ¿Õ¡'««
}，
        meridiemParse: /Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡|Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡|ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡|Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶/,
            isPM
:

function (input) {
    return /^(ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡|Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶)$/.test(input);
}

,
meridiem : function (hour) {
    if (hour < 4) {
        return 'Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡';
    } else if (hour < 12) {
        return 'Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡';
    } else if (hour < 17) {
        return 'ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡';
    } else {
        return 'Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶';
    }
}
,
ordinalParse: /\d{1,2}|\d{1,2}-(Õ«Õ¶|Ö€Õ¤)/,
    ordinal
:

function (number, period) {
    switch (period) {
        case 'DDD':
        case 'w':
        case 'W':
        case 'DDDo':
            if (number === 1) {
                return number + '-Õ«Õ¶';
            }
            return number + '-Ö€Õ¤';
        default:
            return number;
    }
}

,
week : {
    dow : 1, // Monday is the first day of the week.
        doy
:
    7  // The week that contains Jan 1st is the first week of the year.
}
})
;

//! moment.js locale configuration
//! locale : Bahasa Indonesia (id)
//! author : Mohammad Satrio Utomo : https://github.com/tyok
//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

var id = _moment__default.defineLocale（'id'，{
    月：'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split（'_'），
        monthsShort：'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split（'_'），
        平日：'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split（'_'），
        weekdaysShort：'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split（'_'），
        weekdaysMin：'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split（'_'），
        longDateFormat：{
        LT：'HH.mm'，
            LTS：'HH.mm.ss'，
            L：'DD / MM / YYYY'，
            LL：'D MMMM YYYY'，
            LLL：'D MMMM YYYY [pukul] HH.mm'，
            LLLL：'dddd，D MMMM YYYY [pukul] HH.mm'
    }，
        meridiemParse：/ pagi | siang | sore | malam /，
        meridiemHour：function（hour，meridiem）{
        if（
        小时 === 12）{
            小时 = 0;
        }
        if（
        meridiem === 'pagi'）{
            返回时间;
        }
    else
        if（
        meridiem === 'siang'）{
            返回时间 > = 11？小时：小时 + 12;
        }
    else
        if（
        meridiem === 'sore' || meridiem === 'malam'）{
            返回时间 + 12;
        }
    }，
        meridiem：function（hours，minutes，isLower）{
        if（
        小时 < 11）{
            return 'pagi';
        }
    else
        if（
        hours < 15）{
            返回
            'siang';
        }
    else
        if（
        hours < 19）{
            回来
            '疼';
        }
    else
        {
            回归
            'malam';
        }
    }，
        日历：{
        sameDay：'[Hari ini pukul] LT'，
            nextDay：'[Besok pukul] LT'，
            nextWeek：'dddd [pukul] LT'，
            lastDay：'[Kemarin pukul] LT'，
            lastWeek：'dddd [lalu pukul] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'dalam％s'，
            过去：'％s yang lalu'，
            s：'beberapa detik'，
            m：'semenit'，
            mm：'％d menit'，
            h：'sejam'，
    ......：'％d jam'，
            d：'sehari'，
            dd：'％d hari'，
            M：'sebulan'，
            MM：'％d bulan'，
            y：'setahun'，
            yy：'％d tahun'
    }，
        周：{
        道：1，//星期一是一周的第一天。
        doy：7 //包含1月1日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：icelandic（is）
//！作者：HinrikÃ-rnSigurÃ°sson：https：//github.com/hinrik

function is__plural（n）{
    if（
    n％100 === 11）{
        返回true;
    }
else
    if（
    n％10 === 1）{
        返回false;
    }
    返回true;
}

function is__translate（number，withoutSuffix，key，isFuture）{
    var result = number + '';
    开关（键）{
        案件
        ''：
            返回withoutSuffix || isFuture？'nokkrarsek'
        ºur
        '：'
        nokkrumsekÃºndum
        ';
    case
        'm'：
            返回withoutSuffix？'mÃnÃºta'：'mÃnÃºtu';
        案例
        'mm'：
            if（
        is__plural（number））{
            返回结果 +（withoutSuffix || isFuture？'mÃnÃºtur'：'mÃnÃºtum'）;
        }
    else
        if（
        withoutSuffix）{
            返回结果 + 'mÃnÃºta';
        }
        返回结果 + 'mÃnÃºtu';
        案件
        'hh'：
            if（
        is__plural（number））{
            返回结果 +（withoutSuffix || isFuture？'klukkustundir'：'klukkustundum'）;
        }
        返回结果 + 'klukkustund';
        案例
        'd'：
            if（
        withoutSuffix）{
            返回
            'dagur';
        }
        return isFuture？'dag'：'degi';
        案例
        'dd'：
            if（
        is__plural（number））{
            if（
            withoutSuffix）{
                返回结果 + 'dagar';
            }
            返回结果 +（isFuture？'daga'：'dÃ¶gum'）;
        }
    else
        if（
        withoutSuffix）{
            返回结果 + 'dagur';
        }
        返回结果 +（isFuture？'dag'：'degi'）;
        案例
        'M'：
            if（
        withoutSuffix）{
            返回
            'mÃ¡nuÃ°ur';
        }
        return isFuture？'mÃ¡nuÃ°'：'mÃ¡nuÃ°i';
        案例
        'MM'：
            if（
        is__plural（number））{
            if（
            withoutSuffix）{
                返回结果 + 'mÃ¡nuÃ°ir';
            }
            返回结果 +（isFuture？'mÃ¡nuÃ°i'：'mÃ¡nuÃ°um'）;
        }
    else
        if（
        withoutSuffix）{
            返回结果 + 'mÃ¡nuÃ°ur';
        }
        返回结果 +（isFuture？'mÃ¡nuÃ°'：'mÃ¡nuÃ°i'）;
        案例
        'y'：
            返回withoutSuffix || isFuture？'Ã¡r'：'Ã¡ri';
        案例
        'yy'：
            if（
        is__plural（number））{
            返回结果 +（withoutSuffix || isFuture？'Ã¡r'：'Ã¡rum'）;
        }
        返回结果 +（withoutSuffix || isFuture？'Ã¡r'：'Ã¡ri'）;
    }
}

var is = _moment__default.defineLocale（'is'，{
    月：'janÃºar_febrÃºar_mars_aprÃl_maÃ_jÃºnÃ_jÃºlÃ_Ã¡gÃºst_september_oktÃ³ber_nÃ³vember_desember'.split（'_'），
        monthsShort：'jan_feb_mar_apr_maÃ_jÃºn_jÃºl_Ã¡gÃº_sep_okt_nÃ³v_des'.split（'_'），
        平日：'sunnudagur_mÃ¡nudagur_Ã¾riÃ°judagur_miÃ°vikudagur_fimmtudagur_fÃ¶studagur_laugardagur'.split（'_'），
        weekdaysShort：'sun_mÃ¡n_Ã¾ri_miÃ°_fim_fÃ¶s_lau'.split（'_'），
        weekdaysMin：'Su_MÃ¡_Ãžr_Mi_Fi_FÃ¶_La'.split（'_'），
        longDateFormat：{
        LT：'H：mm'，
            LTS：'H：mm：ss'，
            L：'DD / MM / YYYY'，
            LL：'D。MMMM YYYY'，
            LLL：'D。MMMM YYYY [kl。] H：mm'，
            LLLL：'dddd，D。MMMM YYYY [kl。] H：mm'
    }，
        日历：{
        sameDay：'[Ãdagkl。] LT'，
            nextDay：'[Ã¡morgunkl。] LT'，
            nextWeek：'dddd [kl。] LT'，
            lastDay：'[ÃgÃ| r kl。] LT'，
            lastWeek：'[sÃÃ°ast] dddd [kl。] LT'，
            sameElse：'L'
    }，
        relativeTime：{
        未来：'eftir％s'，
            过去：'fyrir％ssÃÃan an'，
            s：is__translate，
            m：is__translate，
            mm：is__translate，
            h：'klukkustund'，
    ......：is__translate，
            d：is__translate，
            dd：is__translate，
            M：is__translate，
            MM：is__translate，
            y：is__translate，
            yy：is__translate
    }，
        ordinalParse：/\d{1,2}\./,
        序数：'％d。'，
        周：{
        道：1，//星期一是一周的第一天。
        doy：4 //包含1月4日的一周是一年中的第一周。
    }
}）;

//！moment.js语言环境配置
//！locale：意大利语（it）
//！作者：Lorenzo：https：//github.com/aliem
//！作者：Mattia Larentis：https：//github.com/nostalgiaz

var it = _moment__default.defineLocale（'it'，{
    months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort
:
    'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays
:
    'Domenica_LunedÃ¬_MartedÃ¬_MercoledÃ¬_GiovedÃ¬_VenerdÃ¬_Sabato'.split('_'),
        weekdaysShort
:
    'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
        weekdaysMin
:
    'D_L_Ma_Me_G_V_S'.split('_'),
        longDateFormat
:
    {
        LT : 'HH:mm',
            LTS
    :
        'HH:mm:ss',
            L
    :
        'DD/MM/YYYY',
            LL
    :
        'D MMMM YYYY',
            LLL
    :
        'D MMMM YYYY HH:mm',
            LLLL
    :
        'dddd, D MMMM YYYY HH:mm'
    }
,
    calendar : {
        sameDay: '[Oggi alle] LT',
            nextDay
    :
        '[Domani alle] LT',
            nextWeek
    :
        'dddd [alle] LT',
            lastDay
    :
        '[Ieri alle] LT',
            lastWeek
    :

        function () {
            switch (this.day()) {
                case 0:
                    return '[la scorsa] dddd [alle] LT';
                default:
                    return '[lo scorso] dddd [alle] LT';
            }
        }

    ,
        sameElse: 'L'
    }
,
    relativeTime : {
        future : function (s) {
            return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
        }
    ,
        past : '%s fa',
            s
    :
        'alcuni secondi',
            m
    :
        'un minuto',
            mm
    :
        '%d minuti',
            h
    :
        'un\'ora',
            hh
    :
        '%d ore',
            d
    :
        'un giorno',
            dd
    :
        '%d giorni',
            M
    :
        'un mese',
            MM
    :
        '%d mesi',
            y
    :
        'un anno',
            yy
    :
        '%d anni'
    }
,
    ordinalParse : /\d{1,2}Âº/,
        ordinal
:
    '%dÂº',
        week
:
    {
        dow : 1, // Monday is the first day of the week.
            doy
    :
        4  // The week that contains Jan 4th is the first week of the year.
    }
}
)
;

//! moment.js locale configuration
//! locale : japanese (ja)
//! author : LI Long : https://github.com/baryon

var ja = _moment__default.defineLocale('ja', {
    months: '1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ'.split('_'),
    monthsShort: '1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ'.split('_'),
    weekdays: 'æ—¥æ›œæ—¥_æœˆæ›œæ—¥_ç«æ›œæ—¥_æ°´æ›œæ—¥_æœ¨æ›œæ—¥_é‡‘æ›œæ—¥_åœŸæ›œæ—¥'.split('_'),
    weekdaysShort: 'æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ'.split('_'),
    weekdaysMin: 'æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ'.split('_'),
    longDateFormat: {
        LT: 'Ahæ™‚måˆ†',
        LTS: 'Ahæ™‚måˆ†sç§’',
        L: 'YYYY/MM/DD',
        LL: 'YYYYå¹´MæœˆDæ—¥',
        LLL: 'YYYYå¹´MæœˆDæ—¥Ahæ™‚måˆ†',
        LLLL: 'YYYYå¹´MæœˆDæ—¥Ahæ™‚måˆ† dddd'
    },
    meridiemParse: /åˆå‰|åˆå¾Œ/i,
    isPM: function (input) {
        return input === 'åˆå¾Œ';
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 12) {
            return 'åˆå‰';
        } else {
            return 'åˆå¾Œ';
        }
    },
    calendar: {
        sameDay：'[ä»Šæ-¥] LT'，
            nextDay：'[æ〜Žæ-¥] LT'，
            nextWeek：'[æ??¥é€] dddd LT'，
            lastDay：'[æ〜æ-¥] LT'，
            lastWeek：'[‰‰??€] dddd LT'，
            sameElse：'L'
}，
        relativeTime：{
    未来：'％så¾Œ'，
            过去：'％så‰??'，
            s：'æ•°ç§'
    '，
    m：'1å'，
            mm：'％då†'，
            h：'1æ™，é-“'，
......：'％dæ™，é-“'，
            d：'1æ-¥'，
            dd：'％dæ-¥'，
            M：'1ãƒ¶æœ'，
            MM：'％dãƒ¶æœ'，
            y：'1å¹'
    '，
    yy：'％då¹'
    '
}
}）;

//！moment.js语言环境配置
//！地区：Boso Jowo（jv）
//！作者：Rony Lantip：https：//github.com/lantip
//！参考：http：//jv.wikipedia.org/wiki/Basa_Jawa

var jv = _moment__default.defineLocale('jv', {
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
    weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /enjing|siyang|sonten|ndalu/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'enjing') {
            return hour;
        } else if (meridiem === 'siyang') {
            返回时间 > = 11？小时：小时 + 12;
        } else if（
        meridiem === 'sonten' || meridiem === 'ndalu'）{
            返回时间 + 12;
        }
    }，
        meridiem：function（hours，minutes，isLower）{
    if（
    小时 < 11）{
        返回
        '享受';
    }
else
    if（
    hours < 15）{
        返回
        '泗阳';
    }
else
    if（
    hours < 19）{
        返回
        'sonten';
    }
else
    {
        返回
        'ndalu';
    }
}，
        日历：{
    sameDay：'[Dinten puniko pukul] LT'，
            nextDay：'[Mbenjang pukul] LT'，
            nextWeek：'dddd [pukul] LT'，
            lastDay：'[Kala wingi pukul] LT'，
            lastWeek：'dddd [kepengker pukul] LT'，
            sameElse：'L'
}，
        relativeTime：{
    未来：'赢得％s'，
            过去：'％s ingkang kepengker'，
            s：'sawetawis detik'，
            m：'setunggal menit'，
            mm：'％d menit'，
            h：'setunggal jam'，
......：'％d jam'，
            d：'sedinten'，
            dd：'％d dinten'，
            M：'sewulan'，
            MM：'％d wulan'，
            y：'setaun'，
            yy：'％d taun'
}，
        周：{
    道：1，//星期一是一周的第一天。
    doy：7 //包含1月1日的一周是一年中的第一周。
}
}）;

//！moment.js语言环境配置
//！地区：格鲁吉亚（ka）
//！作者：Irakli Janiashvili：https：//github.com/irakli-janiashvili

function ka__monthsCaseReplace（m，format）{
    var months = {
            'nominative': 'áƒ˜áƒáƒœáƒ•áƒáƒ áƒ˜_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ˜_áƒ›áƒáƒ áƒ¢áƒ˜_áƒáƒžáƒ áƒ˜áƒšáƒ˜_áƒ›áƒáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ˜_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ˜_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜'.split('_'),
            'accusative': 'áƒ˜áƒáƒœáƒ•áƒáƒ áƒ¡_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ¡_áƒ›áƒáƒ áƒ¢áƒ¡_áƒáƒžáƒ áƒ˜áƒšáƒ˜áƒ¡_áƒ›áƒáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ¡_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ¡_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ¡_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡'.split('_')
        },
        nounCase = (/D[oD] *MMMM?/).test(format) ?
            'accusative' :
            'nominative';
    return months[nounCase][m.month()];
}

function ka__weekdaysCaseReplace(m, format) {
    var weekdays = {
            'nominative': 'áƒ™áƒ•áƒ˜áƒ áƒ_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ˜_áƒ¨áƒáƒ‘áƒáƒ—áƒ˜'.split('_'),
            'accusative': 'áƒ™áƒ•áƒ˜áƒ áƒáƒ¡_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ¡_áƒ¨áƒáƒ‘áƒáƒ—áƒ¡'.split('_')
        },
        nounCase = (/(áƒ¬áƒ˜áƒœáƒ|áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’)/).test(format) ?
            'accusative' :
            'nominative';
    return weekdays[nounCase][m.day()];
}

var ka = _moment__default.defineLocale('ka', {
    months: ka__monthsCaseReplace,
    monthsShort: 'áƒ˜áƒáƒœ_áƒ—áƒ”áƒ‘_áƒ›áƒáƒ _áƒáƒžáƒ _áƒ›áƒáƒ˜_áƒ˜áƒ•áƒœ_áƒ˜áƒ•áƒš_áƒáƒ’áƒ•_áƒ¡áƒ”áƒ¥_áƒáƒ¥áƒ¢_áƒœáƒáƒ”_áƒ“áƒ”áƒ™'.split('_'),
    weekdays: ka__weekdaysCaseReplace,
    weekdaysShort: 'áƒ™áƒ•áƒ˜_áƒáƒ áƒ¨_áƒ¡áƒáƒ›_áƒáƒ—áƒ®_áƒ®áƒ£áƒ—_áƒžáƒáƒ _áƒ¨áƒáƒ‘'.split('_'),
    weekdaysMin: 'áƒ™áƒ•_áƒáƒ _áƒ¡áƒ_áƒáƒ—_áƒ®áƒ£_áƒžáƒ_áƒ¨áƒ'.split('_'),
    longDateFormat: {
        LT: 'h:mm A',
        LTS: 'h:mm:ss A',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY h:mm A',
        LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
        sameDay: '[áƒ“áƒ¦áƒ”áƒ¡] LT[-áƒ–áƒ”]',
        nextDay: '[áƒ®áƒ•áƒáƒš] LT[-áƒ–áƒ”]',
        lastDay: '[áƒ’áƒ£áƒ¨áƒ˜áƒœ] LT[-áƒ–áƒ”]',
        nextWeek: '[áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’] dddd LT[-áƒ–áƒ”]',
        lastWeek: '[áƒ¬áƒ˜áƒœáƒ] dddd LT-áƒ–áƒ”',
        sameElse: 'L'
    },
    relativeTime: {
        future: function (s) {
            return (/(áƒ¬áƒáƒ›áƒ˜|áƒ¬áƒ£áƒ—áƒ˜|áƒ¡áƒáƒáƒ—áƒ˜|áƒ¬áƒ”áƒšáƒ˜)/).test(s) ?
                s.replace(/áƒ˜$/, 'áƒ¨áƒ˜') :
                s + 'áƒ¨áƒ˜';
        },
        past: function (s) {
            if ((/(áƒ¬áƒáƒ›áƒ˜|áƒ¬áƒ£áƒ—áƒ˜|áƒ¡áƒáƒáƒ—áƒ˜|áƒ“áƒ¦áƒ”|áƒ—áƒ•áƒ”)/).test(s)) {
                return s.replace(/(áƒ˜|áƒ”)$/, 'áƒ˜áƒ¡ áƒ¬áƒ˜áƒœ');
            }
            if ((/áƒ¬áƒ”áƒšáƒ˜/).test(s)) {
                return s.replace(/áƒ¬áƒ”áƒšáƒ˜$/, 'áƒ¬áƒšáƒ˜áƒ¡ áƒ¬áƒ˜áƒœ');
            }
        },
        s: 'áƒ áƒáƒ›áƒ“áƒ”áƒœáƒ˜áƒ›áƒ” áƒ¬áƒáƒ›áƒ˜',
        m: 'áƒ¬áƒ£áƒ—áƒ˜',
        mm: '%d áƒ¬áƒ£áƒ—áƒ˜',
        h: 'áƒ¡áƒáƒáƒ—áƒ˜',
        hh: '%d áƒ¡áƒáƒáƒ—áƒ˜',
        d: 'áƒ“áƒ¦áƒ”',
        dd: '%d áƒ“áƒ¦áƒ”',
        M: 'áƒ—áƒ•áƒ”',
        MM: '%d áƒ—áƒ•áƒ”',
        y: 'áƒ¬áƒ”áƒšáƒ˜',
        yy: '%d áƒ¬áƒ”áƒšáƒ˜'
    },
    ordinalParse: /0|1-áƒšáƒ˜|áƒ›áƒ”-\d{1,2}|\d{1,2}-áƒ”/,
    ordinal: function (number) {
        if (number === 0) {
            return number;
        }
        if (number === 1) {
            return number + '-áƒšáƒ˜';
        }
        if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
            return 'áƒ›áƒ”-' + number;
        }
        return number + '-áƒ”';
    },
    week: {
        dow: 1,
        doy: 7
    }
});

//! moment.js locale configuration
//! locale : khmer (km)
//! author : Kruy Vanna : https://github.com/kruyvanna

var km = _moment__default.defineLocale('km', {
    months: 'áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž·áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼'.split('_'),
    monthsShort: 'áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž·áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼'.split('_'),
    weekdays: 'áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ'.split('_'),
    weekdaysShort: 'áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ'.split('_'),
    weekdaysMin: 'áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[ážáŸ’áž„áŸƒáž“áŸˆ áž˜áŸ‰áŸ„áž„] LT',
        nextDay: '[ážŸáŸ’áž¢áŸ‚áž€ áž˜áŸ‰áŸ„áž„] LT',
        nextWeek: 'dddd [áž˜áŸ‰áŸ„áž„] LT',
        lastDay: '[áž˜áŸ’ážŸáž·áž›áž˜áž·áž‰ áž˜áŸ‰áŸ„áž„] LT',
        lastWeek: 'dddd [ážŸáž”áŸ’ážáž¶áž áŸáž˜áž»áž“] [áž˜áŸ‰áŸ„áž„] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%sáž‘áŸ€áž',
        past: '%sáž˜áž»áž“',
        s: 'áž”áŸ‰áž»áž“áŸ’áž˜áž¶áž“ážœáž·áž“áž¶áž‘áž¸',
        m: 'áž˜áž½áž™áž“áž¶áž‘áž¸',
        mm: '%d áž“áž¶áž‘áž¸',
        h: 'áž˜áž½áž™áž˜áŸ‰áŸ„áž„',
        hh: '%d áž˜áŸ‰áŸ„áž„',
        d: 'áž˜áž½áž™ážáŸ’áž„áŸƒ',
        dd: '%d ážáŸ’áž„áŸƒ',
        M: 'áž˜áž½áž™ážáŸ‚',
        MM: '%d ážáŸ‚',
        y: 'áž˜áž½áž™áž†áŸ’áž“áž¶áŸ†',
        yy: '%d áž†áŸ’áž“áž¶áŸ†'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : korean (ko)
//!
//! authors
//!
//! - Kyungwook, Park : https://github.com/kyungw00k
//! - Jeeeyul Lee <jeeeyul@gmail.com>

var ko = _moment__default.defineLocale('ko', {
    months: '1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”'.split('_'),
    monthsShort: '1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”'.split('_'),
    weekdays: 'ì¼ìš”ì¼_ì›”ìš”ì¼_í™”ìš”ì¼_ìˆ˜ìš”ì¼_ëª©ìš”ì¼_ê¸ˆìš”ì¼_í† ìš”ì¼'.split('_'),
    weekdaysShort: 'ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† '.split('_'),
    weekdaysMin: 'ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† '.split('_'),
    longDateFormat: {
        LT: 'A hì‹œ më¶„',
        LTS: 'A hì‹œ më¶„ sì´ˆ',
        L: 'YYYY.MM.DD',
        LL: 'YYYYë…„ MMMM Dì¼',
        LLL: 'YYYYë…„ MMMM Dì¼ A hì‹œ më¶„',
        LLLL: 'YYYYë…„ MMMM Dì¼ dddd A hì‹œ më¶„'
    },
    calendar: {
        sameDay: 'ì˜¤ëŠ˜ LT',
        nextDay: 'ë‚´ì¼ LT',
        nextWeek: 'dddd LT',
        lastDay: 'ì–´ì œ LT',
        lastWeek: 'ì§€ë‚œì£¼ dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s í›„',
        past: '%s ì „',
        s: 'ëª‡ì´ˆ',
        ss: '%dì´ˆ',
        m: 'ì¼ë¶„',
        mm: '%dë¶„',
        h: 'í•œì‹œê°„',
        hh: '%dì‹œê°„',
        d: 'í•˜ë£¨',
        dd: '%dì¼',
        M: 'í•œë‹¬',
        MM: '%dë‹¬',
        y: 'ì¼ë…„',
        yy: '%dë…„'
    },
    ordinalParse: /\d{1,2}ì¼/,
    ordinal: '%dì¼',
    meridiemParse: /ì˜¤ì „|ì˜¤í›„/,
    isPM: function (token) {
        return token === 'ì˜¤í›„';
    },
    meridiem: function (hour, minute, isUpper) {
        return hour < 12 ? 'ì˜¤ì „' : 'ì˜¤í›„';
    }
});

//! moment.js locale configuration
//! locale : Luxembourgish (lb)
//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz

function lb__processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eng Minutt', 'enger Minutt'],
        'h': ['eng Stonn', 'enger Stonn'],
        'd': ['een Dag', 'engem Dag'],
        'M': ['ee Mount', 'engem Mount'],
        'y': ['ee Joer', 'engem Joer']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

function processFutureTime(string) {
    var number = string.substr(0, string.indexOf(' '));
    if (eifelerRegelAppliesToNumber(number)) {
        return 'a ' + string;
    }
    return 'an ' + string;
}

function processPastTime(string) {
    var number = string.substr(0, string.indexOf(' '));
    if (eifelerRegelAppliesToNumber(number)) {
        return 'viru ' + string;
    }
    return 'virun ' + string;
}

/**
 * Returns true if the word before the given number loses the '-n' ending.
 * e.g. 'an 10 Deeg' but 'a 5 Deeg'
 *
 * @param number {integer}
 * @returns {boolean}
 */
function eifelerRegelAppliesToNumber(number) {
    number = parseInt(number, 10);
    if (isNaN(number)) {
        return false;
    }
    if (number < 0) {
        // Negative Number --> always true
        return true;
    } else if (number < 10) {
        // Only 1 digit
        if (4 <= number && number <= 7) {
            return true;
        }
        return false;
    } else if (number < 100) {
        // 2 digits
        var lastDigit = number % 10, firstDigit = number / 10;
        if (lastDigit === 0) {
            return eifelerRegelAppliesToNumber(firstDigit);
        }
        return eifelerRegelAppliesToNumber(lastDigit);
    } else if (number < 10000) {
        // 3 or 4 digits --> recursively check first digit
        while (number >= 10) {
            number = number / 10;
        }
        return eifelerRegelAppliesToNumber(number);
    } else {
        // Anything larger than 4 digits: recursively check first n-3 digits
        number = number / 1000;
        return eifelerRegelAppliesToNumber(number);
    }
}

var lb = _moment__default.defineLocale('lb', {
    months: 'Januar_Februar_MÃ¤erz_AbrÃ«ll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    weekdays: 'Sonndeg_MÃ©indeg_DÃ«nschdeg_MÃ«ttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
    weekdaysShort: 'So._MÃ©._DÃ«._MÃ«._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_MÃ©_DÃ«_MÃ«_Do_Fr_Sa'.split('_'),
    longDateFormat: {
        LT: 'H:mm [Auer]',
        LTS: 'H:mm:ss [Auer]',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm [Auer]',
        LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
    },
    calendar: {
        sameDay: '[Haut um] LT',
        sameElse: 'L',
        nextDay: '[Muer um] LT',
        nextWeek: 'dddd [um] LT',
        lastDay: '[GÃ«schter um] LT',
        lastWeek: function () {
            // Different date string for 'DÃ«nschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
            switch (this.day()) {
                case 2:
                case 4:
                    return '[Leschten] dddd [um] LT';
                default:
                    return '[Leschte] dddd [um] LT';
            }
        }
    },
    relativeTime: {
        future: processFutureTime,
        past: processPastTime,
        s: 'e puer Sekonnen',
        m: lb__processRelativeTime,
        mm: '%d Minutten',
        h: lb__processRelativeTime,
        hh: '%d Stonnen',
        d: lb__processRelativeTime,
        dd: '%d Deeg',
        M: lb__processRelativeTime,
        MM: '%d MÃ©int',
        y: lb__processRelativeTime,
        yy: '%d Joer'
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Lithuanian (lt)
//! author : Mindaugas MozÅ«ras : https://github.com/mmozuras

var lt__units = {
        'm': 'minutÄ—_minutÄ—s_minutÄ™',
        'mm': 'minutÄ—s_minuÄiÅ³_minutes',
        'h': 'valanda_valandos_valandÄ…',
        'hh': 'valandos_valandÅ³_valandas',
        'd': 'diena_dienos_dienÄ…',
        'dd': 'dienos_dienÅ³_dienas',
        'M': 'mÄ—nuo_mÄ—nesio_mÄ—nesÄ¯',
        'MM': 'mÄ—nesiai_mÄ—nesiÅ³_mÄ—nesius',
        'y': 'metai_metÅ³_metus',
        'yy': 'metai_metÅ³_metus'
    },
    weekDays = 'sekmadienis_pirmadienis_antradienis_treÄiadienis_ketvirtadienis_penktadienis_Å¡eÅ¡tadienis'.split('_');

function translateSeconds(number, withoutSuffix, key, isFuture) {
    if (withoutSuffix) {
        return 'kelios sekundÄ—s';
    } else {
        return isFuture ? 'keliÅ³ sekundÅ¾iÅ³' : 'kelias sekundes';
    }
}

function lt__monthsCaseReplace(m, format) {
    var months = {
            'nominative': 'sausis_vasaris_kovas_balandis_geguÅ¾Ä—_birÅ¾elis_liepa_rugpjÅ«tis_rugsÄ—jis_spalis_lapkritis_gruodis'.split('_'),
            'accusative': 'sausio_vasario_kovo_balandÅ¾io_geguÅ¾Ä—s_birÅ¾elio_liepos_rugpjÅ«Äio_rugsÄ—jo_spalio_lapkriÄio_gruodÅ¾io'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
    return months[nounCase][m.month()];
}

function translateSingular(number, withoutSuffix, key, isFuture) {
    return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
}

function special(number) {
    return number % 10 === 0 || (number > 10 && number < 20);
}

function forms(key) {
    return lt__units[key].split('_');
}

function lt__translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    if (number === 1) {
        return result + translateSingular(number, withoutSuffix, key[0], isFuture);
    } else if (withoutSuffix) {
        return result + (special(number) ? forms(key)[1] : forms(key)[0]);
    } else {
        if (isFuture) {
            return result + forms(key)[1];
        } else {
            return result + (special(number) ? forms(key)[1] : forms(key)[2]);
        }
    }
}

function relativeWeekDay(moment, format) {
    var nominative = format.indexOf('dddd HH:mm') === -1,
        weekDay = weekDays[moment.day()];
    return nominative ? weekDay : weekDay.substring(0, weekDay.length - 2) + 'Ä¯';
}

var lt = _moment__default.defineLocale('lt', {
    months: lt__monthsCaseReplace,
    monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
    weekdays: relativeWeekDay,
    weekdaysShort: 'Sek_Pir_Ant_Tre_Ket_Pen_Å eÅ¡'.split('_'),
    weekdaysMin: 'S_P_A_T_K_Pn_Å '.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY [m.] MMMM D [d.]',
        LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
        l: 'YYYY-MM-DD',
        ll: 'YYYY [m.] MMMM D [d.]',
        lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
    },
    calendar: {
        sameDay: '[Å iandien] LT',
        nextDay: '[Rytoj] LT',
        nextWeek: 'dddd LT',
        lastDay: '[Vakar] LT',
        lastWeek: '[PraÄ—jusÄ¯] dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'po %s',
        past: 'prieÅ¡ %s',
        s: translateSeconds,
        m: translateSingular,
        mm: lt__translate,
        h: translateSingular,
        hh: lt__translate,
        d: translateSingular,
        dd: lt__translate,
        M: translateSingular,
        MM: lt__translate,
        y: translateSingular,
        yy: lt__translate
    },
    ordinalParse: /\d{1,2}-oji/,
    ordinal: function (number) {
        return number + '-oji';
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : latvian (lv)
//! author : Kristaps Karlsons : https://github.com/skakri
//! author : JÄnis Elmeris : https://github.com/JanisE

var lv__units = {
    'm': 'minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes'.split('_'),
    'mm': 'minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes'.split('_'),
    'h': 'stundas_stundÄm_stunda_stundas'.split('_'),
    'hh': 'stundas_stundÄm_stunda_stundas'.split('_'),
    'd': 'dienas_dienÄm_diena_dienas'.split('_'),
    'dd': 'dienas_dienÄm_diena_dienas'.split('_'),
    'M': 'mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i'.split('_'),
    'MM': 'mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i'.split('_'),
    'y': 'gada_gadiem_gads_gadi'.split('_'),
    'yy': 'gada_gadiem_gads_gadi'.split('_')
};

/**
 * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
 */
function lv__format(forms, number, withoutSuffix) {
    if (withoutSuffix) {
        // E.g. "21 minÅ«te", "3 minÅ«tes".
        return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
    } else {
        // E.g. "21 minÅ«tes" as in "pÄ“c 21 minÅ«tes".
        // E.g. "3 minÅ«tÄ“m" as in "pÄ“c 3 minÅ«tÄ“m".
        return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
    }
}

function lv__relativeTimeWithPlural(number, withoutSuffix, key) {
    return number + ' ' + lv__format(lv__units[key], number, withoutSuffix);
}

function relativeTimeWithSingular(number, withoutSuffix, key) {
    return lv__format(lv__units[key], number, withoutSuffix);
}

function relativeSeconds(number, withoutSuffix) {
    return withoutSuffix ? 'daÅ¾as sekundes' : 'daÅ¾Äm sekundÄ“m';
}

var lv = _moment__default.defineLocale('lv', {
    months: 'janvÄris_februÄris_marts_aprÄ«lis_maijs_jÅ«nijs_jÅ«lijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mai_jÅ«n_jÅ«l_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 'svÄ“tdiena_pirmdiena_otrdiena_treÅ¡diena_ceturtdiena_piektdiena_sestdiena'.split('_'),
    weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY.',
        LL: 'YYYY. [gada] D. MMMM',
        LLL: 'YYYY. [gada] D. MMMM, HH:mm',
        LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
    },
    calendar: {
        sameDay: '[Å odien pulksten] LT',
        nextDay: '[RÄ«t pulksten] LT',
        nextWeek: 'dddd [pulksten] LT',
        lastDay: '[Vakar pulksten] LT',
        lastWeek: '[PagÄjuÅ¡Ä] dddd [pulksten] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'pÄ“c %s',
        past: 'pirms %s',
        s: relativeSeconds,
        m: relativeTimeWithSingular,
        mm: lv__relativeTimeWithPlural,
        h: relativeTimeWithSingular,
        hh: lv__relativeTimeWithPlural,
        d: relativeTimeWithSingular,
        dd: lv__relativeTimeWithPlural,
        M: relativeTimeWithSingular,
        MM: lv__relativeTimeWithPlural,
        y: relativeTimeWithSingular,
        yy: lv__relativeTimeWithPlural
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Montenegrin (me)
//! author : Miodrag NikaÄ <miodrag@restartit.me> : https://github.com/miodragnikac

var me__translator = {
    words: { //Different grammatical cases
        m: ['jedan minut', 'jednog minuta'],
        mm: ['minut', 'minuta', 'minuta'],
        h: ['jedan sat', 'jednog sata'],
        hh: ['sat', 'sata', 'sati'],
        dd: ['dan', 'dana', 'dana'],
        MM: ['mjesec', 'mjeseca', 'mjeseci'],
        yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = me__translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + me__translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var me = _moment__default.defineLocale('me', {
    months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
    monthsShort: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
    weekdays: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'Äetvrtak', 'petak', 'subota'],
    weekdaysShort: ['ned.', 'pon.', 'uto.', 'sri.', 'Äet.', 'pet.', 'sub.'],
    weekdaysMin: ['ne', 'po', 'ut', 'sr', 'Äe', 'pe', 'su'],
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD. MM. YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danas u] LT',
        nextDay: '[sjutra u] LT',

        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay: '[juÄe u] LT',
        lastWeek: function () {
            var lastWeekDays = [
                '[proÅ¡le] [nedjelje] [u] LT',
                '[proÅ¡log] [ponedjeljka] [u] LT',
                '[proÅ¡log] [utorka] [u] LT',
                '[proÅ¡le] [srijede] [u] LT',
                '[proÅ¡log] [Äetvrtka] [u] LT',
                '[proÅ¡log] [petka] [u] LT',
                '[proÅ¡le] [subote] [u] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: 'prije %s',
        s: 'nekoliko sekundi',
        m: me__translator.translate,
        mm: me__translator.translate,
        h: me__translator.translate,
        hh: me__translator.translate,
        d: 'dan',
        dd: me__translator.translate,
        M: 'mjesec',
        MM: me__translator.translate,
        y: 'godinu',
        yy: me__translator.translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : macedonian (mk)
//! author : Borislav Mickov : https://github.com/B0k0

var mk = _moment__default.defineLocale('mk', {
    months: 'Ñ˜Ð°Ð½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½Ð¸_Ñ˜ÑƒÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸'.split('_'),
    monthsShort: 'Ñ˜Ð°Ð½_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº'.split('_'),
    weekdays: 'Ð½ÐµÐ´ÐµÐ»Ð°_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð¾Ðº_Ð¿ÐµÑ‚Ð¾Ðº_ÑÐ°Ð±Ð¾Ñ‚Ð°'.split('_'),
    weekdaysShort: 'Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ðµ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÐ°Ð±'.split('_'),
    weekdaysMin: 'Ð½e_Ð¿o_Ð²Ñ‚_ÑÑ€_Ñ‡Ðµ_Ð¿Ðµ_Ña'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'D.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[Ð”ÐµÐ½ÐµÑ Ð²Ð¾] LT',
        nextDay: '[Ð£Ñ‚Ñ€Ðµ Ð²Ð¾] LT',
        nextWeek: 'dddd [Ð²Ð¾] LT',
        lastDay: '[Ð’Ñ‡ÐµÑ€Ð° Ð²Ð¾] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[Ð’Ð¾ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð°Ñ‚Ð°] dddd [Ð²Ð¾] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[Ð’Ð¾ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð¸Ð¾Ñ‚] dddd [Ð²Ð¾] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'Ð¿Ð¾ÑÐ»Ðµ %s',
        past: 'Ð¿Ñ€ÐµÐ´ %s',
        s: 'Ð½ÐµÐºÐ¾Ð»ÐºÑƒ ÑÐµÐºÑƒÐ½Ð´Ð¸',
        m: 'Ð¼Ð¸Ð½ÑƒÑ‚Ð°',
        mm: '%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸',
        h: 'Ñ‡Ð°Ñ',
        hh: '%d Ñ‡Ð°ÑÐ°',
        d: 'Ð´ÐµÐ½',
        dd: '%d Ð´ÐµÐ½Ð°',
        M: 'Ð¼ÐµÑÐµÑ†',
        MM: '%d Ð¼ÐµÑÐµÑ†Ð¸',
        y: 'Ð³Ð¾Ð´Ð¸Ð½Ð°',
        yy: '%d Ð³Ð¾Ð´Ð¸Ð½Ð¸'
    },
    ordinalParse: /\d{1,2}-(ÐµÐ²|ÐµÐ½|Ñ‚Ð¸|Ð²Ð¸|Ñ€Ð¸|Ð¼Ð¸)/,
    ordinal: function (number) {
        var lastDigit = number % 10,
            last2Digits = number % 100;
        if (number === 0) {
            return number + '-ÐµÐ²';
        } else if (last2Digits === 0) {
            return number + '-ÐµÐ½';
        } else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-Ñ‚Ð¸';
        } else if (lastDigit === 1) {
            return number + '-Ð²Ð¸';
        } else if (lastDigit === 2) {
            return number + '-Ñ€Ð¸';
        } else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-Ð¼Ð¸';
        } else {
            return number + '-Ñ‚Ð¸';
        }
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : malayalam (ml)
//! author : Floyd Pink : https://github.com/floydpink

var ml = _moment__default.defineLocale('ml', {
    months: 'à´œà´¨àµà´µà´°à´¿_à´«àµ†à´¬àµà´°àµà´µà´°à´¿_à´®à´¾àµ¼à´šàµà´šàµ_à´à´ªàµà´°à´¿àµ½_à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ_à´“à´—à´¸àµà´±àµà´±àµ_à´¸àµ†à´ªàµà´±àµà´±à´‚à´¬àµ¼_à´’à´•àµà´Ÿàµ‹à´¬àµ¼_à´¨à´µà´‚à´¬àµ¼_à´¡à´¿à´¸à´‚à´¬àµ¼'.split('_'),
    monthsShort: 'à´œà´¨àµ._à´«àµ†à´¬àµà´°àµ._à´®à´¾àµ¼._à´à´ªàµà´°à´¿._à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ._à´“à´—._à´¸àµ†à´ªàµà´±àµà´±._à´’à´•àµà´Ÿàµ‹._à´¨à´µà´‚._à´¡à´¿à´¸à´‚.'.split('_'),
    weekdays: 'à´žà´¾à´¯à´±à´¾à´´àµà´š_à´¤à´¿à´™àµà´•à´³à´¾à´´àµà´š_à´šàµŠà´µàµà´µà´¾à´´àµà´š_à´¬àµà´§à´¨à´¾à´´àµà´š_à´µàµà´¯à´¾à´´à´¾à´´àµà´š_à´µàµ†à´³àµà´³à´¿à´¯à´¾à´´àµà´š_à´¶à´¨à´¿à´¯à´¾à´´àµà´š'.split('_'),
    weekdaysShort: 'à´žà´¾à´¯àµ¼_à´¤à´¿à´™àµà´•àµ¾_à´šàµŠà´µàµà´µ_à´¬àµà´§àµ»_à´µàµà´¯à´¾à´´à´‚_à´µàµ†à´³àµà´³à´¿_à´¶à´¨à´¿'.split('_'),
    weekdaysMin: 'à´žà´¾_à´¤à´¿_à´šàµŠ_à´¬àµ_à´µàµà´¯à´¾_à´µàµ†_à´¶'.split('_'),
    longDateFormat: {
        LT: 'A h:mm -à´¨àµ',
        LTS: 'A h:mm:ss -à´¨àµ',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm -à´¨àµ',
        LLLL: 'dddd, D MMMM YYYY, A h:mm -à´¨àµ'
    },
    calendar: {
        sameDay: '[à´‡à´¨àµà´¨àµ] LT',
        nextDay: '[à´¨à´¾à´³àµ†] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[à´‡à´¨àµà´¨à´²àµ†] LT',
        lastWeek: '[à´•à´´à´¿à´žàµà´ž] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s à´•à´´à´¿à´žàµà´žàµ',
        past: '%s à´®àµàµ»à´ªàµ',
        s: 'à´…àµ½à´ª à´¨à´¿à´®à´¿à´·à´™àµà´™àµ¾',
        m: 'à´’à´°àµ à´®à´¿à´¨à´¿à´±àµà´±àµ',
        mm: '%d à´®à´¿à´¨à´¿à´±àµà´±àµ',
        h: 'à´’à´°àµ à´®à´£à´¿à´•àµà´•àµ‚àµ¼',
        hh: '%d à´®à´£à´¿à´•àµà´•àµ‚àµ¼',
        d: 'à´’à´°àµ à´¦à´¿à´µà´¸à´‚',
        dd: '%d à´¦à´¿à´µà´¸à´‚',
        M: 'à´’à´°àµ à´®à´¾à´¸à´‚',
        MM: '%d à´®à´¾à´¸à´‚',
        y: 'à´’à´°àµ à´µàµ¼à´·à´‚',
        yy: '%d à´µàµ¼à´·à´‚'
    },
    meridiemParse: /à´°à´¾à´¤àµà´°à´¿|à´°à´¾à´µà´¿à´²àµ†|à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ|à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚|à´°à´¾à´¤àµà´°à´¿/i,
    isPM: function (input) {
        return /^(à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ|à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚|à´°à´¾à´¤àµà´°à´¿)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'à´°à´¾à´¤àµà´°à´¿';
        } else if (hour < 12) {
            return 'à´°à´¾à´µà´¿à´²àµ†';
        } else if (hour < 17) {
            return 'à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ';
        } else if (hour < 20) {
            return 'à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚';
        } else {
            return 'à´°à´¾à´¤àµà´°à´¿';
        }
    }
});

//! moment.js locale configuration
//! locale : Marathi (mr)
//! author : Harshad Kale : https://github.com/kalehv

var mr__symbolMap = {
        '1': 'à¥§',
        '2': 'à¥¨',
        '3': 'à¥©',
        '4': 'à¥ª',
        '5': 'à¥«',
        '6': 'à¥¬',
        '7': 'à¥­',
        '8': 'à¥®',
        '9': 'à¥¯',
        '0': 'à¥¦'
    },
    mr__numberMap = {
        'à¥§': '1',
        'à¥¨': '2',
        'à¥©': '3',
        'à¥ª': '4',
        'à¥«': '5',
        'à¥¬': '6',
        'à¥­': '7',
        'à¥®': '8',
        'à¥¯': '9',
        'à¥¦': '0'
    };

var mr = _moment__default.defineLocale('mr', {
    months: 'à¤œà¤¾à¤¨à¥‡à¤µà¤¾à¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤¾à¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤à¤ªà¥à¤°à¤¿à¤²_à¤®à¥‡_à¤œà¥‚à¤¨_à¤œà¥à¤²à¥ˆ_à¤‘à¤—à¤¸à¥à¤Ÿ_à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚à¤¬à¤°_à¤‘à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤‚à¤¬à¤°'.split('_'),
    monthsShort: 'à¤œà¤¾à¤¨à¥‡._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š._à¤à¤ªà¥à¤°à¤¿._à¤®à¥‡._à¤œà¥‚à¤¨._à¤œà¥à¤²à¥ˆ._à¤‘à¤—._à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚._à¤‘à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚._à¤¡à¤¿à¤¸à¥‡à¤‚.'.split('_'),
    weekdays: 'à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤³à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°'.split('_'),
    weekdaysShort: 'à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤³_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿'.split('_'),
    weekdaysMin: 'à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶'.split('_'),
    longDateFormat: {
        LT: 'A h:mm à¤µà¤¾à¤œà¤¤à¤¾',
        LTS: 'A h:mm:ss à¤µà¤¾à¤œà¤¤à¤¾',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾',
        LLLL: 'dddd, D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾'
    },
    calendar: {
        sameDay: '[à¤†à¤œ] LT',
        nextDay: '[à¤‰à¤¦à¥à¤¯à¤¾] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[à¤•à¤¾à¤²] LT',
        lastWeek: '[à¤®à¤¾à¤—à¥€à¤²] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s à¤¨à¤‚à¤¤à¤°',
        past: '%s à¤ªà¥‚à¤°à¥à¤µà¥€',
        s: 'à¤¸à¥‡à¤•à¤‚à¤¦',
        m: 'à¤à¤• à¤®à¤¿à¤¨à¤¿à¤Ÿ',
        mm: '%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡',
        h: 'à¤à¤• à¤¤à¤¾à¤¸',
        hh: '%d à¤¤à¤¾à¤¸',
        d: 'à¤à¤• à¤¦à¤¿à¤µà¤¸',
        dd: '%d à¤¦à¤¿à¤µà¤¸',
        M: 'à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾',
        MM: '%d à¤®à¤¹à¤¿à¤¨à¥‡',
        y: 'à¤à¤• à¤µà¤°à¥à¤·',
        yy: '%d à¤µà¤°à¥à¤·à¥‡'
    },
    preparse: function (string) {
        return string.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function (match) {
            return mr__numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return mr__symbolMap[match];
        });
    },
    meridiemParse: /à¤°à¤¾à¤¤à¥à¤°à¥€|à¤¸à¤•à¤¾à¤³à¥€|à¤¦à¥à¤ªà¤¾à¤°à¥€|à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'à¤°à¤¾à¤¤à¥à¤°à¥€') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'à¤¸à¤•à¤¾à¤³à¥€') {
            return hour;
        } else if (meridiem === 'à¤¦à¥à¤ªà¤¾à¤°à¥€') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€') {
            return hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'à¤°à¤¾à¤¤à¥à¤°à¥€';
        } else if (hour < 10) {
            return 'à¤¸à¤•à¤¾à¤³à¥€';
        } else if (hour < 17) {
            return 'à¤¦à¥à¤ªà¤¾à¤°à¥€';
        } else if (hour < 20) {
            return 'à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€';
        } else {
            return 'à¤°à¤¾à¤¤à¥à¤°à¥€';
        }
    },
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 6  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Bahasa Malaysia (ms-MY)
//! author : Weldan Jamili : https://github.com/weldan

var ms_my = _moment__default.defineLocale('ms-my', {
    months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'tengahari') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'petang' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem: function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar: {
        sameDay: '[Hari ini pukul] LT',
        nextDay: '[Esok pukul] LT',
        nextWeek: 'dddd [pukul] LT',
        lastDay: '[Kelmarin pukul] LT',
        lastWeek: 'dddd [lepas pukul] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dalam %s',
        past: '%s yang lepas',
        s: 'beberapa saat',
        m: 'seminit',
        mm: '%d minit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Bahasa Malaysia (ms-MY)
//! author : Weldan Jamili : https://github.com/weldan

var locale_ms = _moment__default.defineLocale('ms', {
    months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'tengahari') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'petang' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem: function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar: {
        sameDay: '[Hari ini pukul] LT',
        nextDay: '[Esok pukul] LT',
        nextWeek: 'dddd [pukul] LT',
        lastDay: '[Kelmarin pukul] LT',
        lastWeek: 'dddd [lepas pukul] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dalam %s',
        past: '%s yang lepas',
        s: 'beberapa saat',
        m: 'seminit',
        mm: '%d minit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Burmese (my)
//! author : Squar team, mysquar.com

var my__symbolMap = {
    '1': 'á',
    '2': 'á‚',
    '3': 'áƒ',
    '4': 'á„',
    '5': 'á…',
    '6': 'á†',
    '7': 'á‡',
    '8': 'áˆ',
    '9': 'á‰',
    '0': 'á€'
}, my__numberMap = {
    'á': '1',
    'á‚': '2',
    'áƒ': '3',
    'á„': '4',
    'á…': '5',
    'á†': '6',
    'á‡': '7',
    'áˆ': '8',
    'á‰': '9',
    'á€': '0'
};

var my = _moment__default.defineLocale('my', {
    months: 'á€‡á€”á€ºá€”á€á€«á€›á€®_á€–á€±á€–á€±á€¬á€ºá€á€«á€›á€®_á€™á€á€º_á€§á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€‡á€°á€œá€­á€¯á€„á€º_á€žá€¼á€‚á€¯á€á€º_á€…á€€á€ºá€á€„á€ºá€˜á€¬_á€¡á€±á€¬á€€á€ºá€á€­á€¯á€˜á€¬_á€”á€­á€¯á€á€„á€ºá€˜á€¬_á€’á€®á€‡á€„á€ºá€˜á€¬'.split('_'),
    monthsShort: 'á€‡á€”á€º_á€–á€±_á€™á€á€º_á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€œá€­á€¯á€„á€º_á€žá€¼_á€…á€€á€º_á€¡á€±á€¬á€€á€º_á€”á€­á€¯_á€’á€®'.split('_'),
    weekdays: 'á€á€”á€„á€ºá€¹á€‚á€”á€½á€±_á€á€”á€„á€ºá€¹á€œá€¬_á€¡á€„á€ºá€¹á€‚á€«_á€—á€¯á€’á€¹á€“á€Ÿá€°á€¸_á€€á€¼á€¬á€žá€•á€á€±á€¸_á€žá€±á€¬á€€á€¼á€¬_á€…á€”á€±'.split('_'),
    weekdaysShort: 'á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±'.split('_'),
    weekdaysMin: 'á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±'.split('_'),

    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[á€šá€”á€±.] LT [á€™á€¾á€¬]',
        nextDay: '[á€™á€”á€€á€ºá€–á€¼á€”á€º] LT [á€™á€¾á€¬]',
        nextWeek: 'dddd LT [á€™á€¾á€¬]',
        lastDay: '[á€™á€”á€±.á€€] LT [á€™á€¾á€¬]',
        lastWeek: '[á€•á€¼á€®á€¸á€á€²á€·á€žá€±á€¬] dddd LT [á€™á€¾á€¬]',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'á€œá€¬á€™á€Šá€ºá€· %s á€™á€¾á€¬',
        past: 'á€œá€½á€”á€ºá€á€²á€·á€žá€±á€¬ %s á€€',
        s: 'á€…á€€á€¹á€€á€”á€º.á€¡á€”á€Šá€ºá€¸á€„á€šá€º',
        m: 'á€á€…á€ºá€™á€­á€”á€…á€º',
        mm: '%d á€™á€­á€”á€…á€º',
        h: 'á€á€…á€ºá€”á€¬á€›á€®',
        hh: '%d á€”á€¬á€›á€®',
        d: 'á€á€…á€ºá€›á€€á€º',
        dd: '%d á€›á€€á€º',
        M: 'á€á€…á€ºá€œ',
        MM: '%d á€œ',
        y: 'á€á€…á€ºá€”á€¾á€…á€º',
        yy: '%d á€”á€¾á€…á€º'
    },
    preparse: function (string) {
        return string.replace(/[áá‚áƒá„á…á†á‡áˆá‰á€]/g, function (match) {
            return my__numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return my__symbolMap[match];
        });
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : norwegian bokmÃ¥l (nb)
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga

var nb = _moment__default.defineLocale('nb', {
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays: 'sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag'.split('_'),
    weekdaysShort: 'sÃ¸n_man_tirs_ons_tors_fre_lÃ¸r'.split('_'),
    weekdaysMin: 'sÃ¸_ma_ti_on_to_fr_lÃ¸'.split('_'),
    longDateFormat: {
        LT: 'H.mm',
        LTS: 'H.mm.ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY [kl.] H.mm',
        LLLL: 'dddd D. MMMM YYYY [kl.] H.mm'
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i gÃ¥r kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: 'for %s siden',
        s: 'noen sekunder',
        m: 'ett minutt',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dager',
        M: 'en mÃ¥ned',
        MM: '%d mÃ¥neder',
        y: 'ett Ã¥r',
        yy: '%d Ã¥r'
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : nepali/nepalese
//! author : suvash : https://github.com/suvash

var ne__symbolMap = {
        '1': 'à¥§',
        '2': 'à¥¨',
        '3': 'à¥©',
        '4': 'à¥ª',
        '5': 'à¥«',
        '6': 'à¥¬',
        '7': 'à¥­',
        '8': 'à¥®',
        '9': 'à¥¯',
        '0': 'à¥¦'
    },
    ne__numberMap = {
        'à¥§': '1',
        'à¥¨': '2',
        'à¥©': '3',
        'à¥ª': '4',
        'à¥«': '5',
        'à¥¬': '6',
        'à¥­': '7',
        'à¥®': '8',
        'à¥¯': '9',
        'à¥¦': '0'
    };

var ne = _moment__default.defineLocale('ne', {
    months: 'à¤œà¤¨à¤µà¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿à¤²_à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤·à¥à¤Ÿ_à¤¸à¥‡à¤ªà¥à¤Ÿà¥‡à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤­à¥‡à¤®à¥à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤®à¥à¤¬à¤°'.split('_'),
    monthsShort: 'à¤œà¤¨._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿._à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ._à¤…à¤—._à¤¸à¥‡à¤ªà¥à¤Ÿ._à¤…à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤­à¥‡._à¤¡à¤¿à¤¸à¥‡.'.split('_'),
    weekdays: 'à¤†à¤‡à¤¤à¤¬à¤¾à¤°_à¤¸à¥‹à¤®à¤¬à¤¾à¤°_à¤®à¤™à¥à¤—à¤²à¤¬à¤¾à¤°_à¤¬à¥à¤§à¤¬à¤¾à¤°_à¤¬à¤¿à¤¹à¤¿à¤¬à¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤¬à¤¾à¤°_à¤¶à¤¨à¤¿à¤¬à¤¾à¤°'.split('_'),
    weekdaysShort: 'à¤†à¤‡à¤¤._à¤¸à¥‹à¤®._à¤®à¤™à¥à¤—à¤²._à¤¬à¥à¤§._à¤¬à¤¿à¤¹à¤¿._à¤¶à¥à¤•à¥à¤°._à¤¶à¤¨à¤¿.'.split('_'),
    weekdaysMin: 'à¤†à¤‡._à¤¸à¥‹._à¤®à¤™à¥_à¤¬à¥._à¤¬à¤¿._à¤¶à¥._à¤¶.'.split('_'),
    longDateFormat: {
        LT: 'Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡',
        LTS: 'Aà¤•à¥‹ h:mm:ss à¤¬à¤œà¥‡',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡',
        LLLL: 'dddd, D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡'
    },
    preparse: function (string) {
        return string.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function (match) {
            return ne__numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return ne__symbolMap[match];
        });
    },
    meridiemParse: /à¤°à¤¾à¤¤à¥€|à¤¬à¤¿à¤¹à¤¾à¤¨|à¤¦à¤¿à¤‰à¤à¤¸à¥‹|à¤¬à¥‡à¤²à¥à¤•à¤¾|à¤¸à¤¾à¤à¤|à¤°à¤¾à¤¤à¥€/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'à¤°à¤¾à¤¤à¥€') {
            return hour < 3 ? hour : hour + 12;
        } else if (meridiem === 'à¤¬à¤¿à¤¹à¤¾à¤¨') {
            return hour;
        } else if (meridiem === 'à¤¦à¤¿à¤‰à¤à¤¸à¥‹') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'à¤¬à¥‡à¤²à¥à¤•à¤¾' || meridiem === 'à¤¸à¤¾à¤à¤') {
            return hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 3) {
            return 'à¤°à¤¾à¤¤à¥€';
        } else if (hour < 10) {
            return 'à¤¬à¤¿à¤¹à¤¾à¤¨';
        } else if (hour < 15) {
            return 'à¤¦à¤¿à¤‰à¤à¤¸à¥‹';
        } else if (hour < 18) {
            return 'à¤¬à¥‡à¤²à¥à¤•à¤¾';
        } else if (hour < 20) {
            return 'à¤¸à¤¾à¤à¤';
        } else {
            return 'à¤°à¤¾à¤¤à¥€';
        }
    },
    calendar: {
        sameDay: '[à¤†à¤œ] LT',
        nextDay: '[à¤­à¥‹à¤²à¥€] LT',
        nextWeek: '[à¤†à¤‰à¤à¤¦à¥‹] dddd[,] LT',
        lastDay: '[à¤¹à¤¿à¤œà¥‹] LT',
        lastWeek: '[à¤—à¤à¤•à¥‹] dddd[,] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%sà¤®à¤¾',
        past: '%s à¤…à¤—à¤¾à¤¡à¥€',
        s: 'à¤•à¥‡à¤¹à¥€ à¤¸à¤®à¤¯',
        m: 'à¤à¤• à¤®à¤¿à¤¨à¥‡à¤Ÿ',
        mm: '%d à¤®à¤¿à¤¨à¥‡à¤Ÿ',
        h: 'à¤à¤• à¤˜à¤£à¥à¤Ÿà¤¾',
        hh: '%d à¤˜à¤£à¥à¤Ÿà¤¾',
        d: 'à¤à¤• à¤¦à¤¿à¤¨',
        dd: '%d à¤¦à¤¿à¤¨',
        M: 'à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾',
        MM: '%d à¤®à¤¹à¤¿à¤¨à¤¾',
        y: 'à¤à¤• à¤¬à¤°à¥à¤·',
        yy: '%d à¤¬à¤°à¥à¤·'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : dutch (nl)
//! author : Joris RÃ¶ling : https://github.com/jjupiter

var nl__monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
    nl__monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

var nl = _moment__default.defineLocale('nl', {
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort: function (m, format) {
        if (/-MMM-/.test(format)) {
            return nl__monthsShortWithoutDots[m.month()];
        } else {
            return nl__monthsShortWithDots[m.month()];
        }
    },
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD-MM-YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        m: 'Ã©Ã©n minuut',
        mm: '%d minuten',
        h: 'Ã©Ã©n uur',
        hh: '%d uur',
        d: 'Ã©Ã©n dag',
        dd: '%d dagen',
        M: 'Ã©Ã©n maand',
        MM: '%d maanden',
        y: 'Ã©Ã©n jaar',
        yy: '%d jaar'
    },
    ordinalParse: /\d{1,2}(ste|de)/,
    ordinal: function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : norwegian nynorsk (nn)
//! author : https://github.com/mechuwind

var nn = _moment__default.defineLocale('nn', {
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays: 'sundag_mÃ¥ndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
    weekdaysShort: 'sun_mÃ¥n_tys_ons_tor_fre_lau'.split('_'),
    weekdaysMin: 'su_mÃ¥_ty_on_to_fr_lÃ¸'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[I dag klokka] LT',
        nextDay: '[I morgon klokka] LT',
        nextWeek: 'dddd [klokka] LT',
        lastDay: '[I gÃ¥r klokka] LT',
        lastWeek: '[FÃ¸regÃ¥ande] dddd [klokka] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: 'for %s sidan',
        s: 'nokre sekund',
        m: 'eit minutt',
        mm: '%d minutt',
        h: 'ein time',
        hh: '%d timar',
        d: 'ein dag',
        dd: '%d dagar',
        M: 'ein mÃ¥nad',
        MM: '%d mÃ¥nader',
        y: 'eit Ã¥r',
        yy: '%d Ã¥r'
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : polish (pl)
//! author : Rafal Hirsz : https://github.com/evoL

var monthsNominative = 'styczeÅ„_luty_marzec_kwiecieÅ„_maj_czerwiec_lipiec_sierpieÅ„_wrzesieÅ„_paÅºdziernik_listopad_grudzieÅ„'.split('_'),
    monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrzeÅ›nia_paÅºdziernika_listopada_grudnia'.split('_');

function pl__plural(n) {
    return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
}

function pl__translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'minuta' : 'minutÄ™';
        case 'mm':
            return result + (pl__plural(number) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix ? 'godzina' : 'godzinÄ™';
        case 'hh':
            return result + (pl__plural(number) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (pl__plural(number) ? 'miesiÄ…ce' : 'miesiÄ™cy');
        case 'yy':
            return result + (pl__plural(number) ? 'lata' : 'lat');
    }
}

var pl = _moment__default.defineLocale('pl', {
    months: function (momentToFormat, format) {
        if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
        } else if (/D MMMM/.test(format)) {
            return monthsSubjective[momentToFormat.month()];
        } else {
            return monthsNominative[momentToFormat.month()];
        }
    },
    monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paÅº_lis_gru'.split('_'),
    weekdays: 'niedziela_poniedziaÅ‚ek_wtorek_Å›roda_czwartek_piÄ…tek_sobota'.split('_'),
    weekdaysShort: 'nie_pon_wt_Å›r_czw_pt_sb'.split('_'),
    weekdaysMin: 'N_Pn_Wt_Åšr_Cz_Pt_So'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[DziÅ› o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek: '[W] dddd [o] LT',
        lastDay: '[Wczoraj o] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[W zeszÅ‚Ä… niedzielÄ™ o] LT';
                case 3:
                    return '[W zeszÅ‚Ä… Å›rodÄ™ o] LT';
                case 6:
                    return '[W zeszÅ‚Ä… sobotÄ™ o] LT';
                default:
                    return '[W zeszÅ‚y] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: '%s temu',
        s: 'kilka sekund',
        m: pl__translate,
        mm: pl__translate,
        h: pl__translate,
        hh: pl__translate,
        d: '1 dzieÅ„',
        dd: '%d dni',
        M: 'miesiÄ…c',
        MM: pl__translate,
        y: 'rok',
        yy: pl__translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : brazilian portuguese (pt-br)
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

var pt_br = _moment__default.defineLocale('pt-br', {
    months: 'Janeiro_Fevereiro_MarÃ§o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingo_Segunda-Feira_TerÃ§a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_SÃ¡bado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b'.split('_'),
    weekdaysMin: 'Dom_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡b'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [Ã s] HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [Ã s] HH:mm'
    },
    calendar: {
        sameDay: '[Hoje Ã s] LT',
        nextDay: '[AmanhÃ£ Ã s] LT',
        nextWeek: 'dddd [Ã s] LT',
        lastDay: '[Ontem Ã s] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Ãšltimo] dddd [Ã s] LT' : // Saturday + Sunday
                '[Ãšltima] dddd [Ã s] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'em %s',
        past: '%s atrÃ¡s',
        s: 'poucos segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mÃªs',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: '%dÂº'
});

//! moment.js locale configuration
//! locale : portuguese (pt)
//! author : Jefferson : https://github.com/jalex79

var pt = _moment__default.defineLocale('pt', {
    months: 'Janeiro_Fevereiro_MarÃ§o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingo_Segunda-Feira_TerÃ§a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_SÃ¡bado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b'.split('_'),
    weekdaysMin: 'Dom_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡b'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Hoje Ã s] LT',
        nextDay: '[AmanhÃ£ Ã s] LT',
        nextWeek: 'dddd [Ã s] LT',
        lastDay: '[Ontem Ã s] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Ãšltimo] dddd [Ã s] LT' : // Saturday + Sunday
                '[Ãšltima] dddd [Ã s] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'em %s',
        past: 'hÃ¡ %s',
        s: 'segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mÃªs',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
    },
    ordinalParse: /\d{1,2}Âº/,
    ordinal: '%dÂº',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : romanian (ro)
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly

function ro__relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
            'mm': 'minute',
            'hh': 'ore',
            'dd': 'zile',
            'MM': 'luni',
            'yy': 'ani'
        },
        separator = ' ';
    if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
        separator = ' de ';
    }
    return number + separator + format[key];
}

var ro = _moment__default.defineLocale('ro', {
    months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    weekdays: 'duminicÄƒ_luni_marÈ›i_miercuri_joi_vineri_sÃ¢mbÄƒtÄƒ'.split('_'),
    weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_SÃ¢m'.split('_'),
    weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_SÃ¢'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[azi la] LT',
        nextDay: '[mÃ¢ine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'peste %s',
        past: '%s Ã®n urmÄƒ',
        s: 'cÃ¢teva secunde',
        m: 'un minut',
        mm: ro__relativeTimeWithPlural,
        h: 'o orÄƒ',
        hh: ro__relativeTimeWithPlural,
        d: 'o zi',
        dd: ro__relativeTimeWithPlural,
        M: 'o lunÄƒ',
        MM: ro__relativeTimeWithPlural,
        y: 'un an',
        yy: ro__relativeTimeWithPlural
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion ElensÃºle : https://github.com/Oire

function ru__plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}

function ru__relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'Ð¼Ð¸Ð½ÑƒÑ‚Ð°_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚' : 'Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚',
        'hh': 'Ñ‡Ð°Ñ_Ñ‡Ð°ÑÐ°_Ñ‡Ð°ÑÐ¾Ð²',
        'dd': 'Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ_Ð´Ð½ÐµÐ¹',
        'MM': 'Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ð°_Ð¼ÐµÑÑÑ†ÐµÐ²',
        'yy': 'Ð³Ð¾Ð´_Ð³Ð¾Ð´Ð°_Ð»ÐµÑ‚'
    };
    if (key === 'm') {
        return withoutSuffix ? 'Ð¼Ð¸Ð½ÑƒÑ‚Ð°' : 'Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ';
    } else {
        return number + ' ' + ru__plural(format[key], +number);
    }
}

function ru__monthsCaseReplace(m, format) {
    var months = {
            'nominative': 'ÑÐ½Ð²Ð°Ñ€ÑŒ_Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»ÑŒ_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_Ð¾ÐºÑ‚ÑÐ±Ñ€ÑŒ_Ð½Ð¾ÑÐ±Ñ€ÑŒ_Ð´ÐµÐºÐ°Ð±Ñ€ÑŒ'.split('_'),
            'accusative': 'ÑÐ½Ð²Ð°Ñ€Ñ_Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ_Ð¼Ð°Ñ€Ñ‚Ð°_Ð°Ð¿Ñ€ÐµÐ»Ñ_Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³ÑƒÑÑ‚Ð°_ÑÐµÐ½Ñ‚ÑÐ±Ñ€Ñ_Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ_Ð½Ð¾ÑÐ±Ñ€Ñ_Ð´ÐµÐºÐ°Ð±Ñ€Ñ'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
    return months[nounCase][m.month()];
}

function ru__monthsShortCaseReplace(m, format) {
    var monthsShort = {
            'nominative': 'ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº'.split('_'),
            'accusative': 'ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
    return monthsShort[nounCase][m.month()];
}

function ru__weekdaysCaseReplace(m, format) {
    var weekdays = {
            'nominative': 'Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³_Ð¿ÑÑ‚Ð½Ð¸Ñ†Ð°_ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°'.split('_'),
            'accusative': 'Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³_Ð¿ÑÑ‚Ð½Ð¸Ñ†Ñƒ_ÑÑƒÐ±Ð±Ð¾Ñ‚Ñƒ'.split('_')
        },
        nounCase = (/\[ ?[Ð’Ð²] ?(?:Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ|ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ|ÑÑ‚Ñƒ)? ?\] ?dddd/).test(format) ?
            'accusative' :
            'nominative';
    return weekdays[nounCase][m.day()];
}

var ru = _moment__default.defineLocale('ru', {
    months: ru__monthsCaseReplace,
    monthsShort: ru__monthsShortCaseReplace,
    weekdays: ru__weekdaysCaseReplace,
    weekdaysShort: 'Ð²Ñ_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±'.split('_'),
    weekdaysMin: 'Ð²Ñ_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±'.split('_'),
    monthsParse: [/^ÑÐ½Ð²/i, /^Ñ„ÐµÐ²/i, /^Ð¼Ð°Ñ€/i, /^Ð°Ð¿Ñ€/i, /^Ð¼Ð°[Ð¹|Ñ]/i, /^Ð¸ÑŽÐ½/i, /^Ð¸ÑŽÐ»/i, /^Ð°Ð²Ð³/i, /^ÑÐµÐ½/i, /^Ð¾ÐºÑ‚/i, /^Ð½Ð¾Ñ/i, /^Ð´ÐµÐº/i],
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY Ð³.',
        LLL: 'D MMMM YYYY Ð³., HH:mm',
        LLLL: 'dddd, D MMMM YYYY Ð³., HH:mm'
    },
    calendar: {
        sameDay: '[Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ Ð²] LT',
        nextDay: '[Ð—Ð°Ð²Ñ‚Ñ€Ð° Ð²] LT',
        lastDay: '[Ð’Ñ‡ÐµÑ€Ð° Ð²] LT',
        nextWeek: function () {
            return this.day() === 2 ? '[Ð’Ð¾] dddd [Ð²] LT' : '[Ð’] dddd [Ð²] LT';
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ðµ] dddd [Ð²] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ñ‹Ð¹] dddd [Ð²] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ] dddd [Ð²] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Ð’Ð¾] dddd [Ð²] LT';
                } else {
                    return '[Ð’] dddd [Ð²] LT';
                }
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'Ñ‡ÐµÑ€ÐµÐ· %s',
        past: '%s Ð½Ð°Ð·Ð°Ð´',
        s: 'Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´',
        m: ru__relativeTimeWithPlural,
        mm: ru__relativeTimeWithPlural,
        h: 'Ñ‡Ð°Ñ',
        hh: ru__relativeTimeWithPlural,
        d: 'Ð´ÐµÐ½ÑŒ',
        dd: ru__relativeTimeWithPlural,
        M: 'Ð¼ÐµÑÑÑ†',
        MM: ru__relativeTimeWithPlural,
        y: 'Ð³Ð¾Ð´',
        yy: ru__relativeTimeWithPlural
    },
    meridiemParse: /Ð½Ð¾Ñ‡Ð¸|ÑƒÑ‚Ñ€Ð°|Ð´Ð½Ñ|Ð²ÐµÑ‡ÐµÑ€Ð°/i,
    isPM: function (input) {
        return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡ÐµÑ€Ð°)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'Ð½Ð¾Ñ‡Ð¸';
        } else if (hour < 12) {
            return 'ÑƒÑ‚Ñ€Ð°';
        } else if (hour < 17) {
            return 'Ð´Ð½Ñ';
        } else {
            return 'Ð²ÐµÑ‡ÐµÑ€Ð°';
        }
    },
    ordinalParse: /\d{1,2}-(Ð¹|Ð³Ð¾|Ñ)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-Ð¹';
            case 'D':
                return number + '-Ð³Ð¾';
            case 'w':
            case 'W':
                return number + '-Ñ';
            default:
                return number;
        }
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Sinhalese (si)
//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

var si = _moment__default.defineLocale('si', {
    months: 'à¶¢à¶±à·€à·à¶»à·’_à¶´à·™à¶¶à¶»à·€à·à¶»à·’_à¶¸à·à¶»à·Šà¶­à·”_à¶…à¶´à·Šâ€à¶»à·šà¶½à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·à·ƒà·Šà¶­à·”_à·ƒà·à¶´à·Šà¶­à·à¶¸à·Šà¶¶à¶»à·Š_à¶”à¶šà·Šà¶­à·à¶¶à¶»à·Š_à¶±à·œà·€à·à¶¸à·Šà¶¶à¶»à·Š_à¶¯à·™à·ƒà·à¶¸à·Šà¶¶à¶»à·Š'.split('_'),
    monthsShort: 'à¶¢à¶±_à¶´à·™à¶¶_à¶¸à·à¶»à·Š_à¶…à¶´à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·_à·ƒà·à¶´à·Š_à¶”à¶šà·Š_à¶±à·œà·€à·_à¶¯à·™à·ƒà·'.split('_'),
    weekdays: 'à¶‰à¶»à·’à¶¯à·_à·ƒà¶³à·”à¶¯à·_à¶…à¶Ÿà·„à¶»à·”à·€à·à¶¯à·_à¶¶à¶¯à·à¶¯à·_à¶¶à·Šâ€à¶»à·„à·ƒà·Šà¶´à¶­à·’à¶±à·Šà¶¯à·_à·ƒà·’à¶šà·”à¶»à·à¶¯à·_à·ƒà·™à¶±à·ƒà·”à¶»à·à¶¯à·'.split('_'),
    weekdaysShort: 'à¶‰à¶»à·’_à·ƒà¶³à·”_à¶…à¶Ÿ_à¶¶à¶¯à·_à¶¶à·Šâ€à¶»à·„_à·ƒà·’à¶šà·”_à·ƒà·™à¶±'.split('_'),
    weekdaysMin: 'à¶‰_à·ƒ_à¶…_à¶¶_à¶¶à·Šâ€à¶»_à·ƒà·’_à·ƒà·™'.split('_'),
    longDateFormat: {
        LT: 'a h:mm',
        LTS: 'a h:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY MMMM D',
        LLL: 'YYYY MMMM D, a h:mm',
        LLLL: 'YYYY MMMM D [à·€à·à¶±à·’] dddd, a h:mm:ss'
    },
    calendar: {
        sameDay: '[à¶…à¶¯] LT[à¶§]',
        nextDay: '[à·„à·™à¶§] LT[à¶§]',
        nextWeek: 'dddd LT[à¶§]',
        lastDay: '[à¶Šà¶ºà·š] LT[à¶§]',
        lastWeek: '[à¶´à·ƒà·”à¶œà·’à¶º] dddd LT[à¶§]',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%sà¶šà·’à¶±à·Š',
        past: '%sà¶šà¶§ à¶´à·™à¶»',
        s: 'à¶­à¶­à·Šà¶´à¶» à¶šà·’à·„à·’à¶´à¶º',
        m: 'à¶¸à·’à¶±à·’à¶­à·Šà¶­à·”à·€',
        mm: 'à¶¸à·’à¶±à·’à¶­à·Šà¶­à·” %d',
        h: 'à¶´à·à¶º',
        hh: 'à¶´à·à¶º %d',
        d: 'à¶¯à·’à¶±à¶º',
        dd: 'à¶¯à·’à¶± %d',
        M: 'à¶¸à·à·ƒà¶º',
        MM: 'à¶¸à·à·ƒ %d',
        y: 'à·€à·ƒà¶»',
        yy: 'à·€à·ƒà¶» %d'
    },
    ordinalParse: /\d{1,2} à·€à·à¶±à·’/,
    ordinal: function (number) {
        return number + ' à·€à·à¶±à·’';
    },
    meridiem: function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'à¶´.à·€.' : 'à¶´à·ƒà·Š à·€à¶»à·”';
        } else {
            return isLower ? 'à¶´à·™.à·€.' : 'à¶´à·™à¶» à·€à¶»à·”';
        }
    }
});

//! moment.js locale configuration
//! locale : slovak (sk)
//! author : Martin Minka : https://github.com/k2s
//! based on work of petrbela : https://github.com/petrbela

var sk__months = 'januÃ¡r_februÃ¡r_marec_aprÃ­l_mÃ¡j_jÃºn_jÃºl_august_september_oktÃ³ber_november_december'.split('_'),
    sk__monthsShort = 'jan_feb_mar_apr_mÃ¡j_jÃºn_jÃºl_aug_sep_okt_nov_dec'.split('_');

function sk__plural(n) {
    return (n > 1) && (n < 5);
}

function sk__translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pÃ¡r sekÃºnd' : 'pÃ¡r sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minÃºta' : (isFuture ? 'minÃºtu' : 'minÃºtou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (sk__plural(number) ? 'minÃºty' : 'minÃºt');
            } else {
                return result + 'minÃºtami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (sk__plural(number) ? 'hodiny' : 'hodÃ­n');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'deÅˆ' : 'dÅˆom';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (sk__plural(number) ? 'dni' : 'dnÃ­');
            } else {
                return result + 'dÅˆami';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (sk__plural(number) ? 'mesiace' : 'mesiacov');
            } else {
                return result + 'mesiacmi';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (sk__plural(number) ? 'roky' : 'rokov');
            } else {
                return result + 'rokmi';
            }
            break;
    }
}

var sk = _moment__default.defineLocale('sk', {
    months: sk__months,
    monthsShort: sk__monthsShort,
    monthsParse: (function (months, monthsShort) {
        var i, _monthsParse = [];
        for (i = 0; i < 12; i++) {
            // use custom parser to solve problem with July (Äervenec)
            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
        }
        return _monthsParse;
    }(sk__months, sk__monthsShort)),
    weekdays: 'nedeÄ¾a_pondelok_utorok_streda_Å¡tvrtok_piatok_sobota'.split('_'),
    weekdaysShort: 'ne_po_ut_st_Å¡t_pi_so'.split('_'),
    weekdaysMin: 'ne_po_ut_st_Å¡t_pi_so'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[dnes o] LT',
        nextDay: '[zajtra o] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[v nedeÄ¾u o] LT';
                case 1:
                case 2:
                    return '[v] dddd [o] LT';
                case 3:
                    return '[v stredu o] LT';
                case 4:
                    return '[vo Å¡tvrtok o] LT';
                case 5:
                    return '[v piatok o] LT';
                case 6:
                    return '[v sobotu o] LT';
            }
        },
        lastDay: '[vÄera o] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[minulÃº nedeÄ¾u o] LT';
                case 1:
                case 2:
                    return '[minulÃ½] dddd [o] LT';
                case 3:
                    return '[minulÃº stredu o] LT';
                case 4:
                case 5:
                    return '[minulÃ½] dddd [o] LT';
                case 6:
                    return '[minulÃº sobotu o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: 'pred %s',
        s: sk__translate,
        m: sk__translate,
        mm: sk__translate,
        h: sk__translate,
        hh: sk__translate,
        d: sk__translate,
        dd: sk__translate,
        M: sk__translate,
        MM: sk__translate,
        y: sk__translate,
        yy: sk__translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : slovenian (sl)
//! author : Robert SedovÅ¡ek : https://github.com/sedovsek

function sl__processRelativeTime(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
        case 'm':
            return withoutSuffix ? 'ena minuta' : 'eno minuto';
        case 'mm':
            if (number === 1) {
                result += withoutSuffix ? 'minuta' : 'minuto';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
            } else {
                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'ena ura' : 'eno uro';
        case 'hh':
            if (number === 1) {
                result += withoutSuffix ? 'ura' : 'uro';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'uri' : 'urama';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'ure' : 'urami';
            } else {
                result += withoutSuffix || isFuture ? 'ur' : 'urami';
            }
            return result;
        case 'd':
            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
        case 'dd':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
            } else {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
            }
            return result;
        case 'M':
            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
        case 'MM':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
            } else {
                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
            }
            return result;
        case 'y':
            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
        case 'yy':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'leto' : 'letom';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'leta' : 'leti';
            } else {
                result += withoutSuffix || isFuture ? 'let' : 'leti';
            }
            return result;
    }
}

var sl = _moment__default.defineLocale('sl', {
    months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
    weekdays: 'nedelja_ponedeljek_torek_sreda_Äetrtek_petek_sobota'.split('_'),
    weekdaysShort: 'ned._pon._tor._sre._Äet._pet._sob.'.split('_'),
    weekdaysMin: 'ne_po_to_sr_Äe_pe_so'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD. MM. YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danes ob] LT',
        nextDay: '[jutri ob] LT',

        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[v] [nedeljo] [ob] LT';
                case 3:
                    return '[v] [sredo] [ob] LT';
                case 6:
                    return '[v] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[v] dddd [ob] LT';
            }
        },
        lastDay: '[vÄeraj ob] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[prejÅ¡njo] [nedeljo] [ob] LT';
                case 3:
                    return '[prejÅ¡njo] [sredo] [ob] LT';
                case 6:
                    return '[prejÅ¡njo] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prejÅ¡nji] dddd [ob] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'Äez %s',
        past: 'pred %s',
        s: sl__processRelativeTime,
        m: sl__processRelativeTime,
        mm: sl__processRelativeTime,
        h: sl__processRelativeTime,
        hh: sl__processRelativeTime,
        d: sl__processRelativeTime,
        dd: sl__processRelativeTime,
        M: sl__processRelativeTime,
        MM: sl__processRelativeTime,
        y: sl__processRelativeTime,
        yy: sl__processRelativeTime
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Albanian (sq)
//! author : FlakÃ«rim Ismani : https://github.com/flakerimi
//! author: Menelion ElensÃºle: https://github.com/Oire (tests)
//! author : Oerd Cukalla : https://github.com/oerd (fixes)

var sq = _moment__default.defineLocale('sq', {
    months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_NÃ«ntor_Dhjetor'.split('_'),
    monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_NÃ«n_Dhj'.split('_'),
    weekdays: 'E Diel_E HÃ«nÃ«_E MartÃ«_E MÃ«rkurÃ«_E Enjte_E Premte_E ShtunÃ«'.split('_'),
    weekdaysShort: 'Die_HÃ«n_Mar_MÃ«r_Enj_Pre_Sht'.split('_'),
    weekdaysMin: 'D_H_Ma_MÃ«_E_P_Sh'.split('_'),
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Sot nÃ«] LT',
        nextDay: '[NesÃ«r nÃ«] LT',
        nextWeek: 'dddd [nÃ«] LT',
        lastDay: '[Dje nÃ«] LT',
        lastWeek: 'dddd [e kaluar nÃ«] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'nÃ« %s',
        past: '%s mÃ« parÃ«',
        s: 'disa sekonda',
        m: 'njÃ« minutÃ«',
        mm: '%d minuta',
        h: 'njÃ« orÃ«',
        hh: '%d orÃ«',
        d: 'njÃ« ditÃ«',
        dd: '%d ditÃ«',
        M: 'njÃ« muaj',
        MM: '%d muaj',
        y: 'njÃ« vit',
        yy: '%d vite'
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Serbian-cyrillic (sr-cyrl)
//! author : Milan JanaÄkoviÄ‡<milanjanackovic@gmail.com> : https://github.com/milan-j

var sr_cyrl__translator = {
    words: { //Different grammatical cases
        m: ['Ñ˜ÐµÐ´Ð°Ð½ Ð¼Ð¸Ð½ÑƒÑ‚', 'Ñ˜ÐµÐ´Ð½Ðµ Ð¼Ð¸Ð½ÑƒÑ‚Ðµ'],
        mm: ['Ð¼Ð¸Ð½ÑƒÑ‚', 'Ð¼Ð¸Ð½ÑƒÑ‚Ðµ', 'Ð¼Ð¸Ð½ÑƒÑ‚Ð°'],
        h: ['Ñ˜ÐµÐ´Ð°Ð½ ÑÐ°Ñ‚', 'Ñ˜ÐµÐ´Ð½Ð¾Ð³ ÑÐ°Ñ‚Ð°'],
        hh: ['ÑÐ°Ñ‚', 'ÑÐ°Ñ‚Ð°', 'ÑÐ°Ñ‚Ð¸'],
        dd: ['Ð´Ð°Ð½', 'Ð´Ð°Ð½Ð°', 'Ð´Ð°Ð½Ð°'],
        MM: ['Ð¼ÐµÑÐµÑ†', 'Ð¼ÐµÑÐµÑ†Ð°', 'Ð¼ÐµÑÐµÑ†Ð¸'],
        yy: ['Ð³Ð¾Ð´Ð¸Ð½Ð°', 'Ð³Ð¾Ð´Ð¸Ð½Ðµ', 'Ð³Ð¾Ð´Ð¸Ð½Ð°']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = sr_cyrl__translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + sr_cyrl__translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var sr_cyrl = _moment__default.defineLocale('sr-cyrl', {
    months: ['Ñ˜Ð°Ð½ÑƒÐ°Ñ€', 'Ñ„ÐµÐ±Ñ€ÑƒÐ°Ñ€', 'Ð¼Ð°Ñ€Ñ‚', 'Ð°Ð¿Ñ€Ð¸Ð»', 'Ð¼Ð°Ñ˜', 'Ñ˜ÑƒÐ½', 'Ñ˜ÑƒÐ»', 'Ð°Ð²Ð³ÑƒÑÑ‚', 'ÑÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€', 'Ð¾ÐºÑ‚Ð¾Ð±Ð°Ñ€', 'Ð½Ð¾Ð²ÐµÐ¼Ð±Ð°Ñ€', 'Ð´ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€'],
    monthsShort: ['Ñ˜Ð°Ð½.', 'Ñ„ÐµÐ±.', 'Ð¼Ð°Ñ€.', 'Ð°Ð¿Ñ€.', 'Ð¼Ð°Ñ˜', 'Ñ˜ÑƒÐ½', 'Ñ˜ÑƒÐ»', 'Ð°Ð²Ð³.', 'ÑÐµÐ¿.', 'Ð¾ÐºÑ‚.', 'Ð½Ð¾Ð².', 'Ð´ÐµÑ†.'],
    weekdays: ['Ð½ÐµÐ´ÐµÑ™Ð°', 'Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™Ð°Ðº', 'ÑƒÑ‚Ð¾Ñ€Ð°Ðº', 'ÑÑ€ÐµÐ´Ð°', 'Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð°Ðº', 'Ð¿ÐµÑ‚Ð°Ðº', 'ÑÑƒÐ±Ð¾Ñ‚Ð°'],
    weekdaysShort: ['Ð½ÐµÐ´.', 'Ð¿Ð¾Ð½.', 'ÑƒÑ‚Ð¾.', 'ÑÑ€Ðµ.', 'Ñ‡ÐµÑ‚.', 'Ð¿ÐµÑ‚.', 'ÑÑƒÐ±.'],
    weekdaysMin: ['Ð½Ðµ', 'Ð¿Ð¾', 'ÑƒÑ‚', 'ÑÑ€', 'Ñ‡Ðµ', 'Ð¿Ðµ', 'ÑÑƒ'],
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD. MM. YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[Ð´Ð°Ð½Ð°Ñ Ñƒ] LT',
        nextDay: '[ÑÑƒÑ‚Ñ€Ð° Ñƒ] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[Ñƒ] [Ð½ÐµÐ´ÐµÑ™Ñƒ] [Ñƒ] LT';
                case 3:
                    return '[Ñƒ] [ÑÑ€ÐµÐ´Ñƒ] [Ñƒ] LT';
                case 6:
                    return '[Ñƒ] [ÑÑƒÐ±Ð¾Ñ‚Ñƒ] [Ñƒ] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[Ñƒ] dddd [Ñƒ] LT';
            }
        },
        lastDay: '[Ñ˜ÑƒÑ‡Ðµ Ñƒ] LT',
        lastWeek: function () {
            var lastWeekDays = [
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [Ð½ÐµÐ´ÐµÑ™Ðµ] [Ñƒ] LT',
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™ÐºÐ°] [Ñƒ] LT',
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [ÑƒÑ‚Ð¾Ñ€ÐºÐ°] [Ñƒ] LT',
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑ€ÐµÐ´Ðµ] [Ñƒ] LT',
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚ÐºÐ°] [Ñƒ] LT',
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿ÐµÑ‚ÐºÐ°] [Ñƒ] LT',
                '[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑƒÐ±Ð¾Ñ‚Ðµ] [Ñƒ] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'Ð·Ð° %s',
        past: 'Ð¿Ñ€Ðµ %s',
        s: 'Ð½ÐµÐºÐ¾Ð»Ð¸ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸',
        m: sr_cyrl__translator.translate,
        mm: sr_cyrl__translator.translate,
        h: sr_cyrl__translator.translate,
        hh: sr_cyrl__translator.translate,
        d: 'Ð´Ð°Ð½',
        dd: sr_cyrl__translator.translate,
        M: 'Ð¼ÐµÑÐµÑ†',
        MM: sr_cyrl__translator.translate,
        y: 'Ð³Ð¾Ð´Ð¸Ð½Ñƒ',
        yy: sr_cyrl__translator.translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Serbian-latin (sr)
//! author : Milan JanaÄkoviÄ‡<milanjanackovic@gmail.com> : https://github.com/milan-j

var sr__translator = {
    words: { //Different grammatical cases
        m: ['jedan minut', 'jedne minute'],
        mm: ['minut', 'minute', 'minuta'],
        h: ['jedan sat', 'jednog sata'],
        hh: ['sat', 'sata', 'sati'],
        dd: ['dan', 'dana', 'dana'],
        MM: ['mesec', 'meseca', 'meseci'],
        yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = sr__translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + sr__translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var sr = _moment__default.defineLocale('sr', {
    months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
    monthsShort: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun', 'jul', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
    weekdays: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'Äetvrtak', 'petak', 'subota'],
    weekdaysShort: ['ned.', 'pon.', 'uto.', 'sre.', 'Äet.', 'pet.', 'sub.'],
    weekdaysMin: ['ne', 'po', 'ut', 'sr', 'Äe', 'pe', 'su'],
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD. MM. YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danas u] LT',
        nextDay: '[sutra u] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedelju] [u] LT';
                case 3:
                    return '[u] [sredu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay: '[juÄe u] LT',
        lastWeek: function () {
            var lastWeekDays = [
                '[proÅ¡le] [nedelje] [u] LT',
                '[proÅ¡log] [ponedeljka] [u] LT',
                '[proÅ¡log] [utorka] [u] LT',
                '[proÅ¡le] [srede] [u] LT',
                '[proÅ¡log] [Äetvrtka] [u] LT',
                '[proÅ¡log] [petka] [u] LT',
                '[proÅ¡le] [subote] [u] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: 'pre %s',
        s: 'nekoliko sekundi',
        m: sr__translator.translate,
        mm: sr__translator.translate,
        h: sr__translator.translate,
        hh: sr__translator.translate,
        d: 'dan',
        dd: sr__translator.translate,
        M: 'mesec',
        MM: sr__translator.translate,
        y: 'godinu',
        yy: sr__translator.translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : swedish (sv)
//! author : Jens Alm : https://github.com/ulmus

var sv = _moment__default.defineLocale('sv', {
    months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 'sÃ¶ndag_mÃ¥ndag_tisdag_onsdag_torsdag_fredag_lÃ¶rdag'.split('_'),
    weekdaysShort: 'sÃ¶n_mÃ¥n_tis_ons_tor_fre_lÃ¶r'.split('_'),
    weekdaysMin: 'sÃ¶_mÃ¥_ti_on_to_fr_lÃ¶'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[IgÃ¥r] LT',
        nextWeek: '[PÃ¥] dddd LT',
        lastWeek: '[I] dddd[s] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: 'fÃ¶r %s sedan',
        s: 'nÃ¥gra sekunder',
        m: 'en minut',
        mm: '%d minuter',
        h: 'en timme',
        hh: '%d timmar',
        d: 'en dag',
        dd: '%d dagar',
        M: 'en mÃ¥nad',
        MM: '%d mÃ¥nader',
        y: 'ett Ã¥r',
        yy: '%d Ã¥r'
    },
    ordinalParse: /\d{1,2}(e|a)/,
    ordinal: function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'e' :
                (b === 1) ? 'a' :
                    (b === 2) ? 'a' :
                        (b === 3) ? 'e' : 'e';
        return number + output;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : tamil (ta)
//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

var ta = _moment__default.defineLocale('ta', {
    months: 'à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯'.split('_'),
    monthsShort: 'à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯'.split('_'),
    weekdays: 'à®žà®¾à®¯à®¿à®±à¯à®±à¯à®•à¯à®•à®¿à®´à®®à¯ˆ_à®¤à®¿à®™à¯à®•à®Ÿà¯à®•à®¿à®´à®®à¯ˆ_à®šà¯†à®µà¯à®µà®¾à®¯à¯à®•à®¿à®´à®®à¯ˆ_à®ªà¯à®¤à®©à¯à®•à®¿à®´à®®à¯ˆ_à®µà®¿à®¯à®¾à®´à®•à¯à®•à®¿à®´à®®à¯ˆ_à®µà¯†à®³à¯à®³à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ_à®šà®©à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ'.split('_'),
    weekdaysShort: 'à®žà®¾à®¯à®¿à®±à¯_à®¤à®¿à®™à¯à®•à®³à¯_à®šà¯†à®µà¯à®µà®¾à®¯à¯_à®ªà¯à®¤à®©à¯_à®µà®¿à®¯à®¾à®´à®©à¯_à®µà¯†à®³à¯à®³à®¿_à®šà®©à®¿'.split('_'),
    weekdaysMin: 'à®žà®¾_à®¤à®¿_à®šà¯†_à®ªà¯_à®µà®¿_à®µà¯†_à®š'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, HH:mm',
        LLLL: 'dddd, D MMMM YYYY, HH:mm'
    },
    calendar: {
        sameDay: '[à®‡à®©à¯à®±à¯] LT',
        nextDay: '[à®¨à®¾à®³à¯ˆ] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[à®¨à¯‡à®±à¯à®±à¯] LT',
        lastWeek: '[à®•à®Ÿà®¨à¯à®¤ à®µà®¾à®°à®®à¯] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s à®‡à®²à¯',
        past: '%s à®®à¯à®©à¯',
        s: 'à®’à®°à¯ à®šà®¿à®² à®µà®¿à®¨à®¾à®Ÿà®¿à®•à®³à¯',
        m: 'à®’à®°à¯ à®¨à®¿à®®à®¿à®Ÿà®®à¯',
        mm: '%d à®¨à®¿à®®à®¿à®Ÿà®™à¯à®•à®³à¯',
        h: 'à®’à®°à¯ à®®à®£à®¿ à®¨à¯‡à®°à®®à¯',
        hh: '%d à®®à®£à®¿ à®¨à¯‡à®°à®®à¯',
        d: 'à®’à®°à¯ à®¨à®¾à®³à¯',
        dd: '%d à®¨à®¾à®Ÿà¯à®•à®³à¯',
        M: 'à®’à®°à¯ à®®à®¾à®¤à®®à¯',
        MM: '%d à®®à®¾à®¤à®™à¯à®•à®³à¯',
        y: 'à®’à®°à¯ à®µà®°à¯à®Ÿà®®à¯',
        yy: '%d à®†à®£à¯à®Ÿà¯à®•à®³à¯'
    },
    ordinalParse: /\d{1,2}à®µà®¤à¯/,
    ordinal: function (number) {
        return number + 'à®µà®¤à¯';
    },
    // refer http://ta.wikipedia.org/s/1er1
    meridiemParse: /à®¯à®¾à®®à®®à¯|à®µà¯ˆà®•à®±à¯ˆ|à®•à®¾à®²à¯ˆ|à®¨à®£à¯à®ªà®•à®²à¯|à®Žà®±à¯à®ªà®¾à®Ÿà¯|à®®à®¾à®²à¯ˆ/,
    meridiem: function (hour, minute, isLower) {
        if (hour < 2) {
            return ' à®¯à®¾à®®à®®à¯';
        } else if (hour < 6) {
            return ' à®µà¯ˆà®•à®±à¯ˆ';  // à®µà¯ˆà®•à®±à¯ˆ
        } else if (hour < 10) {
            return ' à®•à®¾à®²à¯ˆ'; // à®•à®¾à®²à¯ˆ
        } else if (hour < 14) {
            return ' à®¨à®£à¯à®ªà®•à®²à¯'; // à®¨à®£à¯à®ªà®•à®²à¯
        } else if (hour < 18) {
            return ' à®Žà®±à¯à®ªà®¾à®Ÿà¯'; // à®Žà®±à¯à®ªà®¾à®Ÿà¯
        } else if (hour < 22) {
            return ' à®®à®¾à®²à¯ˆ'; // à®®à®¾à®²à¯ˆ
        } else {
            return ' à®¯à®¾à®®à®®à¯';
        }
    },
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'à®¯à®¾à®®à®®à¯') {
            return hour < 2 ? hour : hour + 12;
        } else if (meridiem === 'à®µà¯ˆà®•à®±à¯ˆ' || meridiem === 'à®•à®¾à®²à¯ˆ') {
            return hour;
        } else if (meridiem === 'à®¨à®£à¯à®ªà®•à®²à¯') {
            return hour >= 10 ? hour : hour + 12;
        } else {
            return hour + 12;
        }
    },
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 6  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : thai (th)
//! author : Kridsada Thanabulpong : https://github.com/sirn

var th = _moment__default.defineLocale('th', {
    months: 'à¸¡à¸à¸£à¸²à¸„à¸¡_à¸à¸¸à¸¡à¸ à¸²à¸žà¸±à¸™à¸˜à¹Œ_à¸¡à¸µà¸™à¸²à¸„à¸¡_à¹€à¸¡à¸©à¸²à¸¢à¸™_à¸žà¸¤à¸©à¸ à¸²à¸„à¸¡_à¸¡à¸´à¸–à¸¸à¸™à¸²à¸¢à¸™_à¸à¸£à¸à¸Žà¸²à¸„à¸¡_à¸ªà¸´à¸‡à¸«à¸²à¸„à¸¡_à¸à¸±à¸™à¸¢à¸²à¸¢à¸™_à¸•à¸¸à¸¥à¸²à¸„à¸¡_à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²à¸¢à¸™_à¸˜à¸±à¸™à¸§à¸²à¸„à¸¡'.split('_'),
    monthsShort: 'à¸¡à¸à¸£à¸²_à¸à¸¸à¸¡à¸ à¸²_à¸¡à¸µà¸™à¸²_à¹€à¸¡à¸©à¸²_à¸žà¸¤à¸©à¸ à¸²_à¸¡à¸´à¸–à¸¸à¸™à¸²_à¸à¸£à¸à¸Žà¸²_à¸ªà¸´à¸‡à¸«à¸²_à¸à¸±à¸™à¸¢à¸²_à¸•à¸¸à¸¥à¸²_à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²_à¸˜à¸±à¸™à¸§à¸²'.split('_'),
    weekdays: 'à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ªà¸šà¸”à¸µ_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ'.split('_'),
    weekdaysShort: 'à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ª_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ'.split('_'), // yes, three characters difference
    weekdaysMin: 'à¸­à¸²._à¸ˆ._à¸­._à¸ž._à¸žà¸¤._à¸¨._à¸ª.'.split('_'),
    longDateFormat: {
        LT: 'H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ',
        LTS: 'H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ s à¸§à¸´à¸™à¸²à¸—à¸µ',
        L: 'YYYY/MM/DD',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY à¹€à¸§à¸¥à¸² H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ',
        LLLL: 'à¸§à¸±à¸™ddddà¸—à¸µà¹ˆ D MMMM YYYY à¹€à¸§à¸¥à¸² H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ'
    },
    meridiemParse: /à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡|à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡/,
    isPM: function (input) {
        return input === 'à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡';
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 12) {
            return 'à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡';
        } else {
            return 'à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡';
        }
    },
    calendar: {
        sameDay: '[à¸§à¸±à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT',
        nextDay: '[à¸žà¸£à¸¸à¹ˆà¸‡à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT',
        nextWeek: 'dddd[à¸«à¸™à¹‰à¸² à¹€à¸§à¸¥à¸²] LT',
        lastDay: '[à¹€à¸¡à¸·à¹ˆà¸­à¸§à¸²à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT',
        lastWeek: '[à¸§à¸±à¸™]dddd[à¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§ à¹€à¸§à¸¥à¸²] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'à¸­à¸µà¸ %s',
        past: '%sà¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§',
        s: 'à¹„à¸¡à¹ˆà¸à¸µà¹ˆà¸§à¸´à¸™à¸²à¸—à¸µ',
        m: '1 à¸™à¸²à¸—à¸µ',
        mm: '%d à¸™à¸²à¸—à¸µ',
        h: '1 à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡',
        hh: '%d à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡',
        d: '1 à¸§à¸±à¸™',
        dd: '%d à¸§à¸±à¸™',
        M: '1 à¹€à¸”à¸·à¸­à¸™',
        MM: '%d à¹€à¸”à¸·à¸­à¸™',
        y: '1 à¸›à¸µ',
        yy: '%d à¸›à¸µ'
    }
});

//! moment.js locale configuration
//! locale : Tagalog/Filipino (tl-ph)
//! author : Dan Hagman

var tl_ph = _moment__default.defineLocale('tl-ph', {
    months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
    monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
    weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
    weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
    weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'MM/D/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY HH:mm',
        LLLL: 'dddd, MMMM DD, YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Ngayon sa] LT',
        nextDay: '[Bukas sa] LT',
        nextWeek: 'dddd [sa] LT',
        lastDay: '[Kahapon sa] LT',
        lastWeek: 'dddd [huling linggo] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'sa loob ng %s',
        past: '%s ang nakalipas',
        s: 'ilang segundo',
        m: 'isang minuto',
        mm: '%d minuto',
        h: 'isang oras',
        hh: '%d oras',
        d: 'isang araw',
        dd: '%d araw',
        M: 'isang buwan',
        MM: '%d buwan',
        y: 'isang taon',
        yy: '%d taon'
    },
    ordinalParse: /\d{1,2}/,
    ordinal: function (number) {
        return number;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : turkish (tr)
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak YiÄŸit Kaya: https://github.com/BYK

var tr__suffixes = {
    1: '\'inci',
    5: '\'inci',
    8: '\'inci',
    70: '\'inci',
    80: '\'inci',
    2: '\'nci',
    7: '\'nci',
    20: '\'nci',
    50: '\'nci',
    3: '\'Ã¼ncÃ¼',
    4: '\'Ã¼ncÃ¼',
    100: '\'Ã¼ncÃ¼',
    6: '\'ncÄ±',
    9: '\'uncu',
    10: '\'uncu',
    30: '\'uncu',
    60: '\'Ä±ncÄ±',
    90: '\'Ä±ncÄ±'
};

var tr = _moment__default.defineLocale('tr', {
    months: 'Ocak_Åžubat_Mart_Nisan_MayÄ±s_Haziran_Temmuz_AÄŸustos_EylÃ¼l_Ekim_KasÄ±m_AralÄ±k'.split('_'),
    monthsShort: 'Oca_Åžub_Mar_Nis_May_Haz_Tem_AÄŸu_Eyl_Eki_Kas_Ara'.split('_'),
    weekdays: 'Pazar_Pazartesi_SalÄ±_Ã‡arÅŸamba_PerÅŸembe_Cuma_Cumartesi'.split('_'),
    weekdaysShort: 'Paz_Pts_Sal_Ã‡ar_Per_Cum_Cts'.split('_'),
    weekdaysMin: 'Pz_Pt_Sa_Ã‡a_Pe_Cu_Ct'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[bugÃ¼n saat] LT',
        nextDay: '[yarÄ±n saat] LT',
        nextWeek: '[haftaya] dddd [saat] LT',
        lastDay: '[dÃ¼n] LT',
        lastWeek: '[geÃ§en hafta] dddd [saat] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s sonra',
        past: '%s Ã¶nce',
        s: 'birkaÃ§ saniye',
        m: 'bir dakika',
        mm: '%d dakika',
        h: 'bir saat',
        hh: '%d saat',
        d: 'bir gÃ¼n',
        dd: '%d gÃ¼n',
        M: 'bir ay',
        MM: '%d ay',
        y: 'bir yÄ±l',
        yy: '%d yÄ±l'
    },
    ordinalParse: /\d{1,2}'(inci|nci|Ã¼ncÃ¼|ncÄ±|uncu|Ä±ncÄ±)/,
    ordinal: function (number) {
        if (number === 0) {  // special case for zero
            return number + '\'Ä±ncÄ±';
        }
        var a = number % 10,
            b = number % 100 - a,
            c = number >= 100 ? 100 : null;
        return number + (tr__suffixes[a] || tr__suffixes[b] || tr__suffixes[c]);
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : talossan (tzl)
//! author : Robin van der Vliet : https://github.com/robin0van0der0v with the help of IustÃ¬ Canun


var tzl = _moment__default.defineLocale('tzl', {
    months: 'Januar_Fevraglh_MarÃ§_AvrÃ¯u_Mai_GÃ¼n_Julia_Guscht_Setemvar_ListopÃ¤ts_Noemvar_Zecemvar'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Avr_Mai_GÃ¼n_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
    weekdays: 'SÃºladi_LÃºneÃ§i_Maitzi_MÃ¡rcuri_XhÃºadi_ViÃ©nerÃ§i_SÃ¡turi'.split('_'),
    weekdaysShort: 'SÃºl_LÃºn_Mai_MÃ¡r_XhÃº_ViÃ©_SÃ¡t'.split('_'),
    weekdaysMin: 'SÃº_LÃº_Ma_MÃ¡_Xh_Vi_SÃ¡'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'LT.ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM [dallas] YYYY',
        LLL: 'D. MMMM [dallas] YYYY LT',
        LLLL: 'dddd, [li] D. MMMM [dallas] YYYY LT'
    },
    meridiem: function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'd\'o' : 'D\'O';
        } else {
            return isLower ? 'd\'a' : 'D\'A';
        }
    },
    calendar: {
        sameDay: '[oxhi Ã ] LT',
        nextDay: '[demÃ  Ã ] LT',
        nextWeek: 'dddd [Ã ] LT',
        lastDay: '[ieiri Ã ] LT',
        lastWeek: '[sÃ¼r el] dddd [lasteu Ã ] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'osprei %s',
        past: 'ja%s',
        s: tzl__processRelativeTime,
        m: tzl__processRelativeTime,
        mm: tzl__processRelativeTime,
        h: tzl__processRelativeTime,
        hh: tzl__processRelativeTime,
        d: tzl__processRelativeTime,
        dd: tzl__processRelativeTime,
        M: tzl__processRelativeTime,
        MM: tzl__processRelativeTime,
        y: tzl__processRelativeTime,
        yy: tzl__processRelativeTime
    },
    ordinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

function tzl__processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's': ['viensas secunds', '\'iensas secunds'],
        'm': ['\'n mÃ­ut', '\'iens mÃ­ut'],
        'mm': [number + ' mÃ­uts', ' ' + number + ' mÃ­uts'],
        'h': ['\'n Ã¾ora', '\'iensa Ã¾ora'],
        'hh': [number + ' Ã¾oras', ' ' + number + ' Ã¾oras'],
        'd': ['\'n ziua', '\'iensa ziua'],
        'dd': [number + ' ziuas', ' ' + number + ' ziuas'],
        'M': ['\'n mes', '\'iens mes'],
        'MM': [number + ' mesen', ' ' + number + ' mesen'],
        'y': ['\'n ar', '\'iens ar'],
        'yy': [number + ' ars', ' ' + number + ' ars']
    };
    return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1].trim());
}

//! moment.js locale configuration
//! locale : Morocco Central Atlas TamaziÉ£t in Latin (tzm-latn)
//! author : Abdel Said : https://github.com/abdelsaid

var tzm_latn = _moment__default.defineLocale('tzm-latn', {
    months: 'innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir'.split('_'),
    monthsShort: 'innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir'.split('_'),
    weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas'.split('_'),
    weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas'.split('_'),
    weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[asdkh g] LT',
        nextDay: '[aska g] LT',
        nextWeek: 'dddd [g] LT',
        lastDay: '[assant g] LT',
        lastWeek: 'dddd [g] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dadkh s yan %s',
        past: 'yan %s',
        s: 'imik',
        m: 'minuá¸',
        mm: '%d minuá¸',
        h: 'saÉ›a',
        hh: '%d tassaÉ›in',
        d: 'ass',
        dd: '%d ossan',
        M: 'ayowr',
        MM: '%d iyyirn',
        y: 'asgas',
        yy: '%d isgasn'
    },
    week: {
        dow: 6, // Saturday is the first day of the week.
        doy: 12  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : Morocco Central Atlas TamaziÉ£t (tzm)
//! author : Abdel Said : https://github.com/abdelsaid

var tzm = _moment__default.defineLocale('tzm', {
    months: 'âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”'.split('_'),
    monthsShort: 'âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”'.split('_'),
    weekdays: 'â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™'.split('_'),
    weekdaysShort: 'â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™'.split('_'),
    weekdaysMin: 'â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[â´°âµ™â´·âµ… â´´] LT',
        nextDay: '[â´°âµ™â´½â´° â´´] LT',
        nextWeek: 'dddd [â´´] LT',
        lastDay: '[â´°âµšâ´°âµâµœ â´´] LT',
        lastWeek: 'dddd [â´´] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'â´·â´°â´·âµ… âµ™ âµ¢â´°âµ %s',
        past: 'âµ¢â´°âµ %s',
        s: 'âµ‰âµŽâµ‰â´½',
        m: 'âµŽâµ‰âµâµ“â´º',
        mm: '%d âµŽâµ‰âµâµ“â´º',
        h: 'âµ™â´°âµ„â´°',
        hh: '%d âµœâ´°âµ™âµ™â´°âµ„âµ‰âµ',
        d: 'â´°âµ™âµ™',
        dd: '%d oâµ™âµ™â´°âµ',
        M: 'â´°âµ¢oâµ“âµ”',
        MM: '%d âµ‰âµ¢âµ¢âµ‰âµ”âµ',
        y: 'â´°âµ™â´³â´°âµ™',
        yy: '%d âµ‰âµ™â´³â´°âµ™âµ'
    },
    week: {
        dow: 6, // Saturday is the first day of the week.
        doy: 12  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : ukrainian (uk)
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion ElensÃºle : https://github.com/Oire

function uk__plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}

function uk__relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': 'Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½',
        'hh': 'Ð³Ð¾Ð´Ð¸Ð½Ð°_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½',
        'dd': 'Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð½Ñ–Ð²',
        'MM': 'Ð¼Ñ–ÑÑÑ†ÑŒ_Ð¼Ñ–ÑÑÑ†Ñ–_Ð¼Ñ–ÑÑÑ†Ñ–Ð²',
        'yy': 'Ñ€Ñ–Ðº_Ñ€Ð¾ÐºÐ¸_Ñ€Ð¾ÐºÑ–Ð²'
    };
    if (key === 'm') {
        return withoutSuffix ? 'Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°' : 'Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ';
    } else if (key === 'h') {
        return withoutSuffix ? 'Ð³Ð¾Ð´Ð¸Ð½Ð°' : 'Ð³Ð¾Ð´Ð¸Ð½Ñƒ';
    } else {
        return number + ' ' + uk__plural(format[key], +number);
    }
}

function uk__monthsCaseReplace(m, format) {
    var months = {
            'nominative': 'ÑÑ–Ñ‡ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ð¸Ð¹_Ð±ÐµÑ€ÐµÐ·ÐµÐ½ÑŒ_ÐºÐ²Ñ–Ñ‚ÐµÐ½ÑŒ_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÐµÑ€Ð²ÐµÐ½ÑŒ_Ð»Ð¸Ð¿ÐµÐ½ÑŒ_ÑÐµÑ€Ð¿ÐµÐ½ÑŒ_Ð²ÐµÑ€ÐµÑÐµÐ½ÑŒ_Ð¶Ð¾Ð²Ñ‚ÐµÐ½ÑŒ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´_Ð³Ñ€ÑƒÐ´ÐµÐ½ÑŒ'.split('_'),
            'accusative': 'ÑÑ–Ñ‡Ð½Ñ_Ð»ÑŽÑ‚Ð¾Ð³Ð¾_Ð±ÐµÑ€ÐµÐ·Ð½Ñ_ÐºÐ²Ñ–Ñ‚Ð½Ñ_Ñ‚Ñ€Ð°Ð²Ð½Ñ_Ñ‡ÐµÑ€Ð²Ð½Ñ_Ð»Ð¸Ð¿Ð½Ñ_ÑÐµÑ€Ð¿Ð½Ñ_Ð²ÐµÑ€ÐµÑÐ½Ñ_Ð¶Ð¾Ð²Ñ‚Ð½Ñ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´Ð°_Ð³Ñ€ÑƒÐ´Ð½Ñ'.split('_')
        },
        nounCase = (/D[oD]? *MMMM?/).test(format) ?
            'accusative' :
            'nominative';
    return months[nounCase][m.month()];
}

function uk__weekdaysCaseReplace(m, format) {
    var weekdays = {
            'nominative': 'Ð½ÐµÐ´Ñ–Ð»Ñ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ_ÑÑƒÐ±Ð¾Ñ‚Ð°'.split('_'),
            'accusative': 'Ð½ÐµÐ´Ñ–Ð»ÑŽ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†ÑŽ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ'.split('_'),
            'genitive': 'Ð½ÐµÐ´Ñ–Ð»Ñ–_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»ÐºÐ°_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€ÐºÐ°_ÑÐµÑ€ÐµÐ´Ð¸_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³Ð°_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ–_ÑÑƒÐ±Ð¾Ñ‚Ð¸'.split('_')
        },
        nounCase = (/(\[[Ð’Ð²Ð£Ñƒ]\]) ?dddd/).test(format) ?
            'accusative' :
            ((/\[?(?:Ð¼Ð¸Ð½ÑƒÐ»Ð¾Ñ—|Ð½Ð°ÑÑ‚ÑƒÐ¿Ð½Ð¾Ñ—)? ?\] ?dddd/).test(format) ?
                'genitive' :
                'nominative');
    return weekdays[nounCase][m.day()];
}

function processHoursFunction(str) {
    return function () {
        return str + 'Ð¾' + (this.hours() === 11 ? 'Ð±' : '') + '] LT';
    };
}

var uk = _moment__default.defineLocale('uk', {
    months: uk__monthsCaseReplace,
    monthsShort: 'ÑÑ–Ñ‡_Ð»ÑŽÑ‚_Ð±ÐµÑ€_ÐºÐ²Ñ–Ñ‚_Ñ‚Ñ€Ð°Ð²_Ñ‡ÐµÑ€Ð²_Ð»Ð¸Ð¿_ÑÐµÑ€Ð¿_Ð²ÐµÑ€_Ð¶Ð¾Ð²Ñ‚_Ð»Ð¸ÑÑ‚_Ð³Ñ€ÑƒÐ´'.split('_'),
    weekdays: uk__weekdaysCaseReplace,
    weekdaysShort: 'Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±'.split('_'),
    weekdaysMin: 'Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY Ñ€.',
        LLL: 'D MMMM YYYY Ñ€., HH:mm',
        LLLL: 'dddd, D MMMM YYYY Ñ€., HH:mm'
    },
    calendar: {
        sameDay: processHoursFunction('[Ð¡ÑŒÐ¾Ð³Ð¾Ð´Ð½Ñ– '),
        nextDay: processHoursFunction('[Ð—Ð°Ð²Ñ‚Ñ€Ð° '),
        lastDay: processHoursFunction('[Ð’Ñ‡Ð¾Ñ€Ð° '),
        nextWeek: processHoursFunction('[Ð£] dddd ['),
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return processHoursFunction('[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ñ—] dddd [').call(this);
                case 1:
                case 2:
                case 4:
                    return processHoursFunction('[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ð³Ð¾] dddd [').call(this);
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'Ð·Ð° %s',
        past: '%s Ñ‚Ð¾Ð¼Ñƒ',
        s: 'Ð´ÐµÐºÑ–Ð»ÑŒÐºÐ° ÑÐµÐºÑƒÐ½Ð´',
        m: uk__relativeTimeWithPlural,
        mm: uk__relativeTimeWithPlural,
        h: 'Ð³Ð¾Ð´Ð¸Ð½Ñƒ',
        hh: uk__relativeTimeWithPlural,
        d: 'Ð´ÐµÐ½ÑŒ',
        dd: uk__relativeTimeWithPlural,
        M: 'Ð¼Ñ–ÑÑÑ†ÑŒ',
        MM: uk__relativeTimeWithPlural,
        y: 'Ñ€Ñ–Ðº',
        yy: uk__relativeTimeWithPlural
    },
    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
    meridiemParse: /Ð½Ð¾Ñ‡Ñ–|Ñ€Ð°Ð½ÐºÑƒ|Ð´Ð½Ñ|Ð²ÐµÑ‡Ð¾Ñ€Ð°/,
    isPM: function (input) {
        return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡Ð¾Ñ€Ð°)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'Ð½Ð¾Ñ‡Ñ–';
        } else if (hour < 12) {
            return 'Ñ€Ð°Ð½ÐºÑƒ';
        } else if (hour < 17) {
            return 'Ð´Ð½Ñ';
        } else {
            return 'Ð²ÐµÑ‡Ð¾Ñ€Ð°';
        }
    },
    ordinalParse: /\d{1,2}-(Ð¹|Ð³Ð¾)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return number + '-Ð¹';
            case 'D':
                return number + '-Ð³Ð¾';
            default:
                return number;
        }
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 1st is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : uzbek (uz)
//! author : Sardor Muminov : https://github.com/muminoff

var uz = _moment__default.defineLocale('uz', {
    months: 'ÑÐ½Ð²Ð°Ñ€ÑŒ_Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»ÑŒ_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_Ð¾ÐºÑ‚ÑÐ±Ñ€ÑŒ_Ð½Ð¾ÑÐ±Ñ€ÑŒ_Ð´ÐµÐºÐ°Ð±Ñ€ÑŒ'.split('_'),
    monthsShort: 'ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº'.split('_'),
    weekdays: 'Ð¯ÐºÑˆÐ°Ð½Ð±Ð°_Ð”ÑƒÑˆÐ°Ð½Ð±Ð°_Ð¡ÐµÑˆÐ°Ð½Ð±Ð°_Ð§Ð¾Ñ€ÑˆÐ°Ð½Ð±Ð°_ÐŸÐ°Ð¹ÑˆÐ°Ð½Ð±Ð°_Ð–ÑƒÐ¼Ð°_Ð¨Ð°Ð½Ð±Ð°'.split('_'),
    weekdaysShort: 'Ð¯ÐºÑˆ_Ð”ÑƒÑˆ_Ð¡ÐµÑˆ_Ð§Ð¾Ñ€_ÐŸÐ°Ð¹_Ð–ÑƒÐ¼_Ð¨Ð°Ð½'.split('_'),
    weekdaysMin: 'Ð¯Ðº_Ð”Ñƒ_Ð¡Ðµ_Ð§Ð¾_ÐŸÐ°_Ð–Ñƒ_Ð¨Ð°'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'D MMMM YYYY, dddd HH:mm'
    },
    calendar: {
        sameDay: '[Ð‘ÑƒÐ³ÑƒÐ½ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]',
        nextDay: '[Ð­Ñ€Ñ‚Ð°Ð³Ð°] LT [Ð´Ð°]',
        nextWeek: 'dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]',
        lastDay: '[ÐšÐµÑ‡Ð° ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]',
        lastWeek: '[Ð£Ñ‚Ð³Ð°Ð½] dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'Ð¯ÐºÐ¸Ð½ %s Ð¸Ñ‡Ð¸Ð´Ð°',
        past: 'Ð‘Ð¸Ñ€ Ð½ÐµÑ‡Ð° %s Ð¾Ð»Ð´Ð¸Ð½',
        s: 'Ñ„ÑƒÑ€ÑÐ°Ñ‚',
        m: 'Ð±Ð¸Ñ€ Ð´Ð°ÐºÐ¸ÐºÐ°',
        mm: '%d Ð´Ð°ÐºÐ¸ÐºÐ°',
        h: 'Ð±Ð¸Ñ€ ÑÐ¾Ð°Ñ‚',
        hh: '%d ÑÐ¾Ð°Ñ‚',
        d: 'Ð±Ð¸Ñ€ ÐºÑƒÐ½',
        dd: '%d ÐºÑƒÐ½',
        M: 'Ð±Ð¸Ñ€ Ð¾Ð¹',
        MM: '%d Ð¾Ð¹',
        y: 'Ð±Ð¸Ñ€ Ð¹Ð¸Ð»',
        yy: '%d Ð¹Ð¸Ð»'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : vietnamese (vi)
//! author : Bang Nguyen : https://github.com/bangnk

var vi = _moment__default.defineLocale('vi', {
    months: 'thÃ¡ng 1_thÃ¡ng 2_thÃ¡ng 3_thÃ¡ng 4_thÃ¡ng 5_thÃ¡ng 6_thÃ¡ng 7_thÃ¡ng 8_thÃ¡ng 9_thÃ¡ng 10_thÃ¡ng 11_thÃ¡ng 12'.split('_'),
    monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
    weekdays: 'chá»§ nháº­t_thá»© hai_thá»© ba_thá»© tÆ°_thá»© nÄƒm_thá»© sÃ¡u_thá»© báº£y'.split('_'),
    weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM [nÄƒm] YYYY',
        LLL: 'D MMMM [nÄƒm] YYYY HH:mm',
        LLLL: 'dddd, D MMMM [nÄƒm] YYYY HH:mm',
        l: 'DD/M/YYYY',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd, D MMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[HÃ´m nay lÃºc] LT',
        nextDay: '[NgÃ y mai lÃºc] LT',
        nextWeek: 'dddd [tuáº§n tá»›i lÃºc] LT',
        lastDay: '[HÃ´m qua lÃºc] LT',
        lastWeek: 'dddd [tuáº§n rá»“i lÃºc] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s tá»›i',
        past: '%s trÆ°á»›c',
        s: 'vÃ i giÃ¢y',
        m: 'má»™t phÃºt',
        mm: '%d phÃºt',
        h: 'má»™t giá»',
        hh: '%d giá»',
        d: 'má»™t ngÃ y',
        dd: '%d ngÃ y',
        M: 'má»™t thÃ¡ng',
        MM: '%d thÃ¡ng',
        y: 'má»™t nÄƒm',
        yy: '%d nÄƒm'
    },
    ordinalParse: /\d{1,2}/,
    ordinal: function (number) {
        return number;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : chinese (zh-cn)
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng

var zh_cn = _moment__default.defineLocale('zh-cn', {
    months: 'ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ'.split('_'),
    monthsShort: '1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ'.split('_'),
    weekdays: 'æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­'.split('_'),
    weekdaysShort: 'å‘¨æ—¥_å‘¨ä¸€_å‘¨äºŒ_å‘¨ä¸‰_å‘¨å››_å‘¨äº”_å‘¨å…­'.split('_'),
    weekdaysMin: 'æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­'.split('_'),
    longDateFormat: {
        LT: 'Ahç‚¹mmåˆ†',
        LTS: 'Ahç‚¹måˆ†sç§’',
        L: 'YYYY-MM-DD',
        LL: 'YYYYå¹´MMMDæ—¥',
        LLL: 'YYYYå¹´MMMDæ—¥Ahç‚¹mmåˆ†',
        LLLL: 'YYYYå¹´MMMDæ—¥ddddAhç‚¹mmåˆ†',
        l: 'YYYY-MM-DD',
        ll: 'YYYYå¹´MMMDæ—¥',
        lll: 'YYYYå¹´MMMDæ—¥Ahç‚¹mmåˆ†',
        llll: 'YYYYå¹´MMMDæ—¥ddddAhç‚¹mmåˆ†'
    },
    meridiemParse: /å‡Œæ™¨|æ—©ä¸Š|ä¸Šåˆ|ä¸­åˆ|ä¸‹åˆ|æ™šä¸Š/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'å‡Œæ™¨' || meridiem === 'æ—©ä¸Š' ||
            meridiem === 'ä¸Šåˆ') {
            return hour;
        } else if (meridiem === 'ä¸‹åˆ' || meridiem === 'æ™šä¸Š') {
            return hour + 12;
        } else {
            // 'ä¸­åˆ'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return 'å‡Œæ™¨';
        } else if (hm < 900) {
            return 'æ—©ä¸Š';
        } else if (hm < 1130) {
            return 'ä¸Šåˆ';
        } else if (hm < 1230) {
            return 'ä¸­åˆ';
        } else if (hm < 1800) {
            return 'ä¸‹åˆ';
        } else {
            return 'æ™šä¸Š';
        }
    },
    calendar: {
        sameDay: function () {
            return this.minutes() === 0 ? '[ä»Šå¤©]Ah[ç‚¹æ•´]' : '[ä»Šå¤©]LT';
        },
        nextDay: function () {
            return this.minutes() === 0 ? '[æ˜Žå¤©]Ah[ç‚¹æ•´]' : '[æ˜Žå¤©]LT';
        },
        lastDay: function () {
            return this.minutes() === 0 ? '[æ˜¨å¤©]Ah[ç‚¹æ•´]' : '[æ˜¨å¤©]LT';
        },
        nextWeek: function () {
            var startOfWeek, prefix;
            startOfWeek = _moment__default().startOf('week');
            prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[ä¸‹]' : '[æœ¬]';
            return this.minutes() === 0 ? prefix + 'dddAhç‚¹æ•´' : prefix + 'dddAhç‚¹mm';
        },
        lastWeek: function () {
            var startOfWeek, prefix;
            startOfWeek = _moment__default().startOf('week');
            prefix = this.unix() < startOfWeek.unix() ? '[ä¸Š]' : '[æœ¬]';
            return this.minutes() === 0 ? prefix + 'dddAhç‚¹æ•´' : prefix + 'dddAhç‚¹mm';
        },
        sameElse: 'LL'
    },
    ordinalParse: /\d{1,2}(æ—¥|æœˆ|å‘¨)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + 'æ—¥';
            case 'M':
                return number + 'æœˆ';
            case 'w':
            case 'W':
                return number + 'å‘¨';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%så†…',
        past: '%så‰',
        s: 'å‡ ç§’',
        m: '1 åˆ†é’Ÿ',
        mm: '%d åˆ†é’Ÿ',
        h: '1 å°æ—¶',
        hh: '%d å°æ—¶',
        d: '1 å¤©',
        dd: '%d å¤©',
        M: '1 ä¸ªæœˆ',
        MM: '%d ä¸ªæœˆ',
        y: '1 å¹´',
        yy: '%d å¹´'
    },
    week: {
        // GB/T 7408-1994ã€Šæ•°æ®å…ƒå’Œäº¤æ¢æ ¼å¼Â·ä¿¡æ¯äº¤æ¢Â·æ—¥æœŸå’Œæ—¶é—´è¡¨ç¤ºæ³•ã€‹ä¸ŽISO 8601:1988ç­‰æ•ˆ
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

//! moment.js locale configuration
//! locale : traditional chinese (zh-tw)
//! author : Ben : https://github.com/ben-lin

var zh_tw = _moment__default.defineLocale('zh-tw', {
    months: 'ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ'.split('_'),
    monthsShort: '1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ'.split('_'),
    weekdays: 'æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­'.split('_'),
    weekdaysShort: 'é€±æ—¥_é€±ä¸€_é€±äºŒ_é€±ä¸‰_é€±å››_é€±äº”_é€±å…­'.split('_'),
    weekdaysMin: 'æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­'.split('_'),
    longDateFormat: {
        LT: 'Ahé»žmmåˆ†',
        LTS: 'Ahé»žmåˆ†sç§’',
        L: 'YYYYå¹´MMMDæ—¥',
        LL: 'YYYYå¹´MMMDæ—¥',
        LLL: 'YYYYå¹´MMMDæ—¥Ahé»žmmåˆ†',
        LLLL: 'YYYYå¹´MMMDæ—¥ddddAhé»žmmåˆ†',
        l: 'YYYYå¹´MMMDæ—¥',
        ll: 'YYYYå¹´MMMDæ—¥',
        lll: 'YYYYå¹´MMMDæ—¥Ahé»žmmåˆ†',
        llll: 'YYYYå¹´MMMDæ—¥ddddAhé»žmmåˆ†'
    },
    meridiemParse: /æ—©ä¸Š|ä¸Šåˆ|ä¸­åˆ|ä¸‹åˆ|æ™šä¸Š/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'æ—©ä¸Š' || meridiem === 'ä¸Šåˆ') {
            return hour;
        } else if (meridiem === 'ä¸­åˆ') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'ä¸‹åˆ' || meridiem === 'æ™šä¸Š') {
            return hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 900) {
            return 'æ—©ä¸Š';
        } else if (hm < 1130) {
            return 'ä¸Šåˆ';
        } else if (hm < 1230) {
            return 'ä¸­åˆ';
        } else if (hm < 1800) {
            return 'ä¸‹åˆ';
        } else {
            return 'æ™šä¸Š';
        }
    },
    calendar: {
        sameDay: '[ä»Šå¤©]LT',
        nextDay: '[æ˜Žå¤©]LT',
        nextWeek: '[ä¸‹]ddddLT',
        lastDay: '[æ˜¨å¤©]LT',
        lastWeek: '[ä¸Š]ddddLT',
        sameElse: 'L'
    },
    ordinalParse: /\d{1,2}(æ—¥|æœˆ|é€±)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd' :
            case 'D' :
            case 'DDD' :
                return number + 'æ—¥';
            case 'M' :
                return number + 'æœˆ';
            case 'w' :
            case 'W' :
                return number + 'é€±';
            default :
                return number;
        }
    },
    relativeTime: {
        future: '%så…§',
        past: '%så‰',
        s: 'å¹¾ç§’',
        m: 'ä¸€åˆ†é˜',
        mm: '%dåˆ†é˜',
        h: 'ä¸€å°æ™‚',
        hh: '%då°æ™‚',
        d: 'ä¸€å¤©',
        dd: '%då¤©',
        M: 'ä¸€å€‹æœˆ',
        MM: '%då€‹æœˆ',
        y: 'ä¸€å¹´',
        yy: '%då¹´'
    }
});

var moment_with_locales = _moment__default;
moment_with_locales.locale('en');

return moment_with_locales;

}))
;