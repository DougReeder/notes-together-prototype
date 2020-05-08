import React, {Component} from 'react';
import sanitizeHtml from 'sanitize-html-react';
import './List.css';

const uniformList = {allowedTags: [ 'p', 'ul', 'ol',
    'li', 'strike', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
    'sub', 'sup'
    ],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src', 'srcset', 'alt' ]
  },
  allowedSchemes: [ 'data' ],
  transformTags: {
    'h1': 'div',
    'h2': 'div',
    'h3': 'div',
    'h4': 'div',
    'h5': 'div',
    'h6': 'div',
    'pre': 'div',
    'blockquote': 'div'
  }
};
// TODO: allow SVG tags

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
