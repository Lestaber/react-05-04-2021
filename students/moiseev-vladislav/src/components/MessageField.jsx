import React from "react";
import Message from "./Message.jsx";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import PropTypes from "prop-types";

export default class MessageField extends React.Component {
  static propTypes = {
    chatId: PropTypes.string,
    messages: PropTypes.array,
    sendMessage: PropTypes.func,
  };

  state = {
    input: "",
  };

  constructor(props) {
    super(props);
    this.messageFieldRef = React.createRef();
  }

  handleButtonKeyUp = ({ keyCode }) => {
    const { input } = this.state;
    if (keyCode === 13 && input !== "") {
      this.handleSendMessage(input, "me");
    }
  };

  handleChangeInput = ({ target: { value } }) => {
    this.setState({
      input: value,
    });
  };

  handleSendMessage = (text, sender) => {
    const { chatId, sendMessage } = this.props;
    sendMessage(chatId, text, sender);
    this.setState({
      input: "",
    });
  };

  componentDidUpdate() {
    const { scrollHeight, clientHeight } = this.messageFieldRef.current;
    this.messageFieldRef.current.scrollTop = scrollHeight - clientHeight;
  }

  render() {
    const { messages } = this.props;
    const { input } = this.state;

    const messageElements = messages.map(({ sender, text }, index) => (
      <Message key={index} key={index} sender={sender} text={text} />
    ));

    return (
      <div className="field-wrapper">
        <div ref={this.messageFieldRef} className="message-field">
          {messageElements}
        </div>
        <div className="actions">
          <TextField
            placeholder="Введите сообщение"
            value={input}
            type="text"
            onChange={this.handleChangeInput}
            onKeyUp={this.handleButtonKeyUp}
            autoFocus
            fullWidth
          />
          <Fab
            color="primary"
            disabled={input === ""}
            onClick={() => this.handleSendMessage(input, "me")}
          >
            <SendIcon />
          </Fab>
        </div>
      </div>
    );
  }
}
