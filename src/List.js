import React, {Component} from 'react';
import sanitizeHtml from 'sanitize-html-react';
import './List.css';

const uniformList = {allowedTags: [ 'p', 'a', 'ul', 'ol',
    'li', 'strike', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
    'img'],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src' ]
  },
  allowedSchemes: [ 'data', 'mailto' ],
};

class List extends Component {

  render() {
    const listItems = this.props.notes.map(
        (note) => {
          const incipit = note.text.slice(0, 300);
          const cleanHtml = sanitizeHtml(incipit, uniformList);
          // console.log(cleanHtml);
          return <article key={note.id.toString()} dangerouslySetInnerHTML={{ __html: cleanHtml }}
                          className={note.id === this.props.selectedNoteId ? 'selected' : ''}
                       onClick={this.props.handleSelect.bind(this, note.id)}></article>
        }
    );
    return (
        <div className="list">
          {listItems}
        </div>
    );
  };

}

export default List;
