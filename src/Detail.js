import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable'
import "./Detail.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {};
  }

  handleChange = evt => {
    this.props.handleEdit(this.props.note.id, evt.target.value, evt);
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
              tagName='article' // Use a custom HTML tag (uses a div by default)
          />);
    } else {
      content =
          (<div>
            <div className="advice">This is the detail area.</div>;
          </div>);
    }
    return content;
  }
}

export default Detail;
