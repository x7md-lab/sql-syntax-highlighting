import { minimalSetup, EditorView } from 'codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorState, Compartment } from '@codemirror/state';
import { autocompletion } from '@codemirror/autocomplete';
const languageConf = new Compartment();

new EditorView({
  doc: 'select ',
  extensions: [minimalSetup, languageConf.of(sql()), autocompletion({})],
  parent: document.querySelector('#app'),
});
