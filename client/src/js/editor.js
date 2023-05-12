import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in IndexedDB.
    // Fall back to header if nothing is stored in IndexedDB.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || header);
    });

    // Save the content of the editor in the IndexedDB whenever it changes
    this.editor.on('change', () => {
      putDb(this.editor.getValue());
    });
  }
}
