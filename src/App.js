import React, {Component} from 'react';
import List from './List';
import Detail from './Detail';
import fakeNote from './fakeNote';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    let notes = [];
    for (let i=-7 + Math.floor(Math.pow(15,1+Math.random()/2)); i>0; --i) {
      notes.push(fakeNote());
    }
    this.state = {
      notes: notes,
      selectedNoteId: notes[Math.floor(Math.random()*notes.length)].id,
    };
    this.handleSelect = this.handleSelect.bind(this);
  };

  handleSelect(id, evt) {
    // console.log("App.selectNote:", id, index, evt);
    // console.log("App.selectNote:", evt.currentTarget);
    this.setState((oldState, props) => {
      return {selectedNoteId: id};
    });
  };

  render() {
    const selectedNote = this.state.notes.find( note => note.id === this.state.selectedNoteId);
    return (
        <div className="App panelContainer">
          <div className="panelMain">
            <header className="App-header">
              <h1>Notes Together</h1>
            </header>
            <List notes={this.state.notes} handleSelect={this.handleSelect}></List>
          </div>
          <div className="panelDetail">
            <Detail note={selectedNote}></Detail>
          </div>
        </div>
    );
  };
}

export default App;
