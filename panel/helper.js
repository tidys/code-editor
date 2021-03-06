'use strict';

const Fs = require('fs');
const Path = require('path');
const LangTools = ace.require('ace/ext/language_tools');

var projectRoot = Path.join(Editor.projectInfo.path, 'assets');

function disableCompleter(editor, completer) {
  for (var i in editor.completers) {
    var value = editor.completers[i];
    if (value === completer) {
      editor.completers.splice(i, 1);
      return;
    }
   }
}

function enableCompleter(editor, completer) {
  for (var i in editor.completers) {
    var value = editor.completers[i];
    if (value === completer)
        return;
  }
  editor.completers.push(completer); 
}

function enalbeKeyWordCompleter() {
  enableCompleter(LangTools.keyWordCompleter);
}

function disableKeyWordCompleter() {
   disableCompleter(LangTools.keyWordCompleter);
}

function disableSnippetCompleter() {
  disableCompleter(LangTools.snippetCompleter);
}

function enableSnippetCompleter() {
  enableCompleter(LangTools.sinppetCompleter);
}

function findFileInDirectory(directory, fileName) {
  var files = Fs.readdirSync(directory);
  for (var i in files) {
    var file = Path.join(directory, files[i]);
    var stat = Fs.statSync(file);
    if (stat.isFile() && (files[i] === fileName))
        return file;

    if (stat.isDirectory()) {
      var newDirectory = Path.join(directory, files[i]);
      var ret = findFileInDirectory(newDirectory, fileName);
      if (ret)
        return ret;
    }
  }

  // can not find the file
  return null;
}

// find js file with the file name in root directory
// in fireball, file name is unique through the project
exports.findFile = function(fileName) {
  return findFileInDirectory(projectRoot, fileName);
}

// enable keyWordCompleter and snippetCompleter
exports.enableSystemCompleters = function(editor) {
  enableCompleter(editor, LangTools.keyWordCompleter);
  enableCompleter(editor, LangTools.snippetCompleter);
  enableCompleter(editor, LangTools.textCompleter);
}

// disable keyWordCompleter and sinppetCompleter
exports.disableSystemCompleters = function(editor) {
  disableCompleter(editor, LangTools.keyWordCompleter);
  disableCompleter(editor, LangTools.snippetCompleter);
  disableCompleter(editor, LangTools.textCompleter);
}
