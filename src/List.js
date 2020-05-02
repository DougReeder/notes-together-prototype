import React, {Component} from 'react';
import './List.css';

class List extends Component {

  render() {
    const listItems = this.props.notes.map(
        (note) => <div key={note.id.toString()} dangerouslySetInnerHTML={{ __html: note.text }}
                       onClick={this.props.handleSelect.bind(this, note.id)}></div>
    );
    return (
        <div className="list">
          {listItems}
        </div>
    );
  };

}

export default List;
