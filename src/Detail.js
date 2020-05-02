import React, {Component} from 'react';
import "./Detail.css";

class Detail extends Component {

  render() {
    let content;
    if (this.props.note) {
      content =
          (<div dangerouslySetInnerHTML={{ __html: this.props.note.text }} contentEditable="true">
          </div>);
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
