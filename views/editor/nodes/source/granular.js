var mercury = require('mercury')
var h = require('micro-css/h')(mercury.h)
var Header = require('../header.js')

var Range = require('../../params/range.js')
var ModRange = require('../../params/mod-range.js')
var Select = require('../../params/select.js')
var ToggleButton = require('../../params/toggle-button.js')
var SampleTrimmer = require('../../params/sample-trimmer.js')
var SampleChooser = require('../../params/sample-chooser.js')

var QueryParam = require('loop-drop-setup/query-param')

var modeChoices = [
  ['Loop', 'loop'],
  ['Oneshot', 'oneshot']
]

module.exports = function(node){
  var data = node()

  var sync = QueryParam(node, 'sync')
  var isSyncing = sync.read()

  return h('SourceNode -granular', [

    Header(node, h('span', [
      h('strong', 'Granular:'), ' ',
      h('span', getSampleName(data.buffer) || 'none')
    ])),

    h('ParamList', [

      SampleChooser(node),

      Select(QueryParam(node, 'mode'), { 
        options: modeChoices,
        defaultValue: 'loop'
      }),

      ToggleButton(sync, {
        title: 'BPM Sync'
      }),

      Range(QueryParam(node, 'duration'), {
        title: 'duration',
        defaultValue: 1,
        format: isSyncing ? 'beat' : 'ms',
        flex: true
      }),

      Range(QueryParam(node, 'rate'), {
        title: 'rate',
        defaultValue: 16,
        format: 'ratio32',
        flex: true
      }),

      ModRange(QueryParam(node, 'amp'), {
        title: 'amp',
        format: 'dB',
        defaultValue: 1,
        flex: true
      }),

      ModRange(QueryParam(node, 'transpose'), {
        title: 'transpose',
        format: 'semitone',
        flex: true
      }),

      Range(QueryParam(node, 'attack'), {
        title: 'attack',
        format: 'ratio',
        defaultValue: 0.1,
        flex: true
      }),

      Range(QueryParam(node, 'hold'), {
        title: 'hold',
        format: 'ratio',
        defaultValue: 1,
        flex: true
      }),

      Range(QueryParam(node, 'release'), {
        title: 'release',
        format: 'ratio',
        defaultValue: 0.1,
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