import './style.css';
import { tags } from '@lezer/highlight';
import { minimalSetup, EditorView } from 'codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorState, Compartment } from '@codemirror/state';
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete';
import { keymap } from '@codemirror/view';

const languageConf = new Compartment();

const codemirrorView = new EditorView({
  doc: 'select ',
  extensions: [
    minimalSetup,
    keymap.of([{ key: 'Tab', run: acceptCompletion }]),
    languageConf.of(sql()),
    autocompletion({}),
  ],
  parent: document.querySelector('#code-text'),
});



const worker = new Worker('worker.sql-wasm.js');

const runButton = document.getElementById('run');
const codeOutput = document.getElementById('output');

worker.postMessage({
  id:1,
  action:"open",
});

worker.onmessage = () => {
  console.log('Database opened');
  runButton.disabled = false;
  worker.onmessage = (event) => {
    codeOutput.innerHTML = JSON.stringify(event.data); // The result of the query
  };
  runButton.addEventListener("click", ()=> {
    worker.postMessage({
      id: 2,
      action: "exec",
      sql: codemirrorView.state.doc.toString(),
    });
  })
};


