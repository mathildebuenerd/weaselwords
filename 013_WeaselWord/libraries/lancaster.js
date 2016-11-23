RiTa.stem_Lancaster = (function() {

  function accept(token) {

    return (token.match(/^[aeiou]/)) ?
      (token.length > 1) : (token.length > 2 && token.match(/[aeiouy]/));
  }

  // take a token, look up the applicable rule and do the stem
  function applyRules(token, intact) {

    var section = token.substr(-1),
      rules = ruleTable[section],
      input = token;

    if (rules) {

      for (var i = 0; i < rules.length; i++) {

        // only apply intact rules to intact tokens
        if ((intact || !rules[i].intact) && token.substr(0 - rules[i].pattern.length) == rules[i].pattern) {

          // hack off only as much as the rule indicates
          var result = token.substr(0, token.length - rules[i].size);

          // if the rules wants us to apply an appendage do so
          if (rules[i].appendage) {
            result += rules[i].appendage;
          }

          if (accept(result)) {

            token = result;

            // see what the rules wants to do next
            if (rules[i].continuation) {

              // this rule thinks there still might be stem left. keep at it.
              // since we've applied a change we'll pass false in for intact
              return applyRules(result, false);

            } else {

              // the rule thinks we're done stemming. drop out.
              return result;
            }
          }
        }
      }
    }
    // else // warn('No stemming rules (LancasterImpl) found for: '+input);

    return token;
  }

  var ruleTable = { // indexed by last character of word

    "a": [{
      "continuation": false,
      "intact": true,
      "pattern": "ia",
      "size": "2"
    }, {
      "continuation": false,
      "intact": true,
      "pattern": "a",
      "size": "1"
    }],
    "b": [{
      "continuation": false,
      "intact": false,
      "pattern": "bb",
      "size": "1"
    }],
    "c": [{
      "appendage": "s",
      "continuation": false,
      "intact": false,
      "pattern": "ytic",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ic",
      "size": "2"
    }, {
      "appendage": "t",
      "continuation": true,
      "intact": false,
      "pattern": "nc",
      "size": "1"
    }],
    "d": [{
      "continuation": false,
      "intact": false,
      "pattern": "dd",
      "size": "1"
    }, {
      "appendage": "y",
      "continuation": true,
      "intact": false,
      "pattern": "ied",
      "size": "3"
    }, {
      "appendage": "s",
      "continuation": false,
      "intact": false,
      "pattern": "ceed",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "eed",
      "size": "1"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ed",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "hood",
      "size": "4"
    }],
    "e": [{
      "continuation": true,
      "intact": false,
      "pattern": "e",
      "size": "1"
    }],
    "f": [{
      "appendage": "v",
      "continuation": false,
      "intact": false,
      "pattern": "lief",
      "size": "1"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "if",
      "size": "2"
    }],
    "g": [{
      "continuation": true,
      "intact": false,
      "pattern": "ing",
      "size": "3"
    }, {
      "appendage": "y",
      "continuation": false,
      "intact": false,
      "pattern": "iag",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ag",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "gg",
      "size": "1"
    }],
    "h": [{
      "continuation": false,
      "intact": true,
      "pattern": "th",
      "size": "2"
    }, {
      "appendage": "c",
      "continuation": false,
      "intact": false,
      "pattern": "guish",
      "size": "5"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ish",
      "size": "3"
    }],
    "i": [{
      "continuation": false,
      "intact": true,
      "pattern": "i",
      "size": "1"
    }, {
      "appendage": "y",
      "continuation": true,
      "intact": false,
      "pattern": "i",
      "size": "1"
    }],
    "j": [{
      "appendage": "d",
      "continuation": false,
      "intact": false,
      "pattern": "ij",
      "size": "1"
    }, {
      "appendage": "s",
      "continuation": false,
      "intact": false,
      "pattern": "fuj",
      "size": "1"
    }, {
      "appendage": "d",
      "continuation": false,
      "intact": false,
      "pattern": "uj",
      "size": "1"
    }, {
      "appendage": "d",
      "continuation": false,
      "intact": false,
      "pattern": "oj",
      "size": "1"
    }, {
      "appendage": "r",
      "continuation": false,
      "intact": false,
      "pattern": "hej",
      "size": "1"
    }, {
      "appendage": "t",
      "continuation": false,
      "intact": false,
      "pattern": "verj",
      "size": "1"
    }, {
      "appendage": "t",
      "continuation": false,
      "intact": false,
      "pattern": "misj",
      "size": "2"
    }, {
      "appendage": "d",
      "continuation": false,
      "intact": false,
      "pattern": "nj",
      "size": "1"
    }, {
      "appendage": "s",
      "continuation": false,
      "intact": false,
      "pattern": "j",
      "size": "1"
    }],
    "l": [{
      "continuation": false,
      "intact": false,
      "pattern": "ifiabl",
      "size": "6"
    }, {
      "appendage": "y",
      "continuation": false,
      "intact": false,
      "pattern": "iabl",
      "size": "4"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "abl",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ibl",
      "size": "3"
    }, {
      "appendage": "l",
      "continuation": true,
      "intact": false,
      "pattern": "bil",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "cl",
      "size": "1"
    }, {
      "appendage": "y",
      "continuation": false,
      "intact": false,
      "pattern": "iful",
      "size": "4"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ful",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ul",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ial",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ual",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "al",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ll",
      "size": "1"
    }],
    "m": [{
      "continuation": false,
      "intact": false,
      "pattern": "ium",
      "size": "3"
    }, {
      "continuation": false,
      "intact": true,
      "pattern": "um",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ism",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "mm",
      "size": "1"
    }],
    "n": [{
      "appendage": "j",
      "continuation": true,
      "intact": false,
      "pattern": "sion",
      "size": "4"
    }, {
      "appendage": "c",
      "continuation": false,
      "intact": false,
      "pattern": "xion",
      "size": "4"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ion",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ian",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "an",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "een",
      "size": "0"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "en",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "nn",
      "size": "1"
    }],
    "p": [{
      "continuation": true,
      "intact": false,
      "pattern": "ship",
      "size": "4"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "pp",
      "size": "1"
    }],
    "r": [{
      "continuation": true,
      "intact": false,
      "pattern": "er",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ear",
      "size": "0"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ar",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "or",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ur",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "rr",
      "size": "1"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "tr",
      "size": "1"
    }, {
      "appendage": "y",
      "continuation": true,
      "intact": false,
      "pattern": "ier",
      "size": "3"
    }],
    "s": [{
      "appendage": "y",
      "continuation": true,
      "intact": false,
      "pattern": "ies",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "sis",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "is",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ness",
      "size": "4"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ss",
      "size": "0"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ous",
      "size": "3"
    }, {
      "continuation": false,
      "intact": true,
      "pattern": "us",
      "size": "2"
    }, {
      "continuation": true,
      "intact": true,
      "pattern": "s",
      "size": "1"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "s",
      "size": "0"
    }],
    "t": [{
      "appendage": "y",
      "continuation": false,
      "intact": false,
      "pattern": "plicat",
      "size": "4"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "at",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ment",
      "size": "4"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ent",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ant",
      "size": "3"
    }, {
      "appendage": "b",
      "continuation": false,
      "intact": false,
      "pattern": "ript",
      "size": "2"
    }, {
      "appendage": "b",
      "continuation": false,
      "intact": false,
      "pattern": "orpt",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "duct",
      "size": "1"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "sumpt",
      "size": "2"
    }, {
      "appendage": "i",
      "continuation": false,
      "intact": false,
      "pattern": "cept",
      "size": "2"
    }, {
      "appendage": "v",
      "continuation": false,
      "intact": false,
      "pattern": "olut",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "sist",
      "size": "0"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ist",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "tt",
      "size": "1"
    }],
    "u": [{
      "continuation": false,
      "intact": false,
      "pattern": "iqu",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ogu",
      "size": "1"
    }],
    "v": [{
      "appendage": "j",
      "continuation": true,
      "intact": false,
      "pattern": "siv",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "eiv",
      "size": "0"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "iv",
      "size": "2"
    }],
    "y": [{
      "continuation": true,
      "intact": false,
      "pattern": "bly",
      "size": "1"
    }, {
      "appendage": "y",
      "continuation": true,
      "intact": false,
      "pattern": "ily",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ply",
      "size": "0"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ly",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ogy",
      "size": "1"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "phy",
      "size": "1"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "omy",
      "size": "1"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "opy",
      "size": "1"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ity",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ety",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "lty",
      "size": "2"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "istry",
      "size": "5"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ary",
      "size": "3"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "ory",
      "size": "3"
    }, {
      "continuation": false,
      "intact": false,
      "pattern": "ify",
      "size": "3"
    }, {
      "appendage": "t",
      "continuation": true,
      "intact": false,
      "pattern": "ncy",
      "size": "2"
    }, {
      "continuation": true,
      "intact": false,
      "pattern": "acy",
      "size": "3"
    }],
    "z": [{
      "continuation": true,
      "intact": false,
      "pattern": "iz",
      "size": "2"
    }, {
      "appendage": "s",
      "continuation": false,
      "intact": false,
      "pattern": "yz",
      "size": "1"
    }]
  };

  return function(token) {

    return applyRules(token.toLowerCase(), true);
  };

})();