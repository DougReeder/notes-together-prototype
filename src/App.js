import React, {Component} from 'react';
import {initCache, refreshCache, getNotesArr, storeNoteRemote} from "./Cache";
import List from './List';
import Detail from './Detail';
import {randomNote} from './fakeNote';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      selectedNoteId: null,
    };
    this.cacheChangedCallback = this.cacheChangedCallback.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  };

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    initCache(this.cacheChangedCallback);
  }

  synchronize() {
    refreshCache();
  }

  async cacheChangedCallback() {
    const notesArr = await getNotesArr();
    console.log("notesArr:", notesArr);
    if (notesArr.length === 0) {
      for (let i = -7 + Math.floor(Math.pow(15, 1 + Math.random() / 2)); i > 0; --i) {
        const note = randomNote();
        notesArr.push(note);
        const returnValue = await storeNoteRemote(note);
        console.log("fake note:", returnValue, note);
      }
    }
    const selectedNoteId = notesArr[Math.floor(Math.random() * notesArr.length)].id;
    await this.setStateAsync({notes: notesArr, selectedNoteId: selectedNoteId});
  }

  handleSelect(id, evt) {
    this.setState((oldState, props) => {
      return {selectedNoteId: id};
    });
  };

  handleEdit(id, newText, evt) {
    const modifiedNote = this.state.notes.find( note => note.id === id );
    modifiedNote.text = newText;
    this.forceUpdate();
  }

  render() {
    const selectedNote = this.state.notes.find( note => note.id === this.state.selectedNoteId);
    return (
        <div className="App panelContainer">
          <div className="panelMain">
            <header className="App-header">
              <button onClick={this.synchronize}>Sync</button>
            </header>
            <List notes={this.state.notes} selectedNoteId={this.state.selectedNoteId}
                  handleSelect={this.handleSelect}></List>
          </div>
          <div className="panelDetail">
            <Detail note={selectedNote} handleEdit={this.handleEdit}></Detail>
          </div>
        </div>
    );
  };
}

export default App;
