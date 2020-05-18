import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html-react';
import commonmark from 'commonmark';
import "./Detail.css";

const semanticOnly = {
  allowedTags: [ 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
    'img', 'del', 'ins', 'kbd', 'q', 'samp', 'sub', 'sup', 'var'],
  disallowedTagsMode: 'discard',
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src', 'srcset', 'alt' ]
  },
  allowedSchemes: [ 'http', 'https', 'ftp', 'data' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  transformTags: {
    'h1': 'h2',
    'strong': 'b',
    'em': 'i',
    'header': 'div',
    'footer': 'div',
    'main': 'div',
    'section': 'div',
    'article': 'div',
    'aside': 'div',
  },
  nonTextTags: [ 'style', 'script', 'textarea', 'noscript', 'nav' ],
  allowProtocolRelative: false,
  parser: {
    lowerCaseTags: true,
    lowerCaseAttributeNames: true,
  }
};
// TODO: allow SVG tags

class Detail extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {};
    this.markdownReader = new commonmark.Parser({smart: true});
    this.markdownWriter = new commonmark.HtmlRenderer({softbreak: "<br />"});
  }

  handleChange = evt => {
    this.props.handleEdit(this.props.note.id, evt.target.value, evt);
  };

  pasteSemanticOnly = evt => {
    // console.log("pasteSemanticOnly types:", evt.clipboardData.types);

    evt.clipboardData.types.some(type => {
      if (type === 'text/html' || type === 'text/plain') {
        evt.preventDefault();
        let html = evt.clipboardData.getData(type);
        // console.log("clipboard data:", type, html);
        if ('text/plain' === type && /s/.test(html)) {
          const parsed = this.markdownReader.parse(html);
          html = this.markdownWriter.render(parsed);
        }
        html = sanitizeHtml(html, semanticOnly);
        document.execCommand('insertHTML', false, html);
        return true;
      } else  {   // use default handling for images, etc.
        // console.log("clipboard data:", type);
        return false;
      }
      // TODO: convert text/rtf to HTML
      // TODO: extract image alt text and append
    });
  };

  render() {
    let content;
    if (this.props.note) {
      content =
          (<ContentEditable
              innerRef={this.contentEditable}
              html={this.props.note.text} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              onPaste={this.pasteSemanticOnly}
              tagName='article' // Use a custom HTML tag (uses a div by default)
          />);
    } else {
      content =
          (<div>
            <div className="advice">No details</div>
          </div>);
    }
    return content;
  }
}

export default Detail;
