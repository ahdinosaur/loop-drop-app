var mercury = require('mercury')
var h = require('micro-css/h')(mercury.h)
var Header = require('../header.js')

var Range = require('../../params/range.js')
var ModRange = require('../../params/mod-range.js')
var Select = require('../../params/select.js')
var SampleTrimmer = require('../../params/sample-trimmer.js')
var SampleChooser = require('../../params/sample-chooser.js')

var QueryParam = require('loop-drop-setup/query-param')

var modeChoices = [
  ['Oneshot', 'oneshot'],
  ['Hold', 'hold'],
  ['Loop', 'loop'],
  ['Release', 'release']
]

module.exports = function(node){
  var data = node()


  return h('SourceNode -sample', [

    Header(node, h('span', [
      h('strong', 'Sample:'), ' ',
      h('span', getSampleName(data.buffer) || 'none')
    ])),

    h('ParamList', [

      SampleChooser(node),

      Select(QueryParam(node, 'mode'), { 
        options: modeChoices 
      }),

      ModRange(QueryParam(node, 'amp'), {
        title: 'amp',
        defaultValue: 1,
        format: 'dB',
        flex: true
      }),

      ModRange(QueryParam(node, 'transpose'), {
        title: 'transpose',
        format: 'semitone',
        flex: true
      }),

      ModRange(QueryParam(node, 'tune'), {
        title: 'tune',
        format: 'cents',
        flex: true
      })

    ]),

    SampleTrimmer(node)

  ])
}

function getSampleName(data){
  var src = data && data.src
  if (typeof src === 'string'){
    return src.replace(/^\.\//, '')
  }
}