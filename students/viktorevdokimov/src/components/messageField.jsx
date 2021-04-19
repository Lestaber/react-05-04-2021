import React from 'react';
import Message from './message';
import '../styles/styles.css';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

export default class MessageField extends React.Component {
    constructor(props) {
        super(props);
        // создадим ref в поле `textInput` для хранения DOM-элемента
        this.textInput = React.createRef();
    }

    state = {
        messages: [
           {
                text: "Привет!",
                sender: "bot"
            },
            {
                text: "Как дела?",
                sender: "bot"
            } 
        ],
        input: '',
        
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.messages.length < this.state.messages.length &&
            this.state.messages[this.state.messages.length - 1].sender === 'user'
            ) {
            setTimeout(() =>
                this.setState({ 
                    messages: [ ...this.state.messages, { text: 'Не приставай ко мне, я робот!', sender: 'bot' } ] 
                }), 1000);  
        }  
    }

    handleClick = (message) => {
        this.setState({ 
            messages: [ ...this.state.messages, { text: message, sender: 'user' } ], input: '' 
        });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event, message) => {
        if (event.keyCode === 13) { // Enter
            this.handleClick(message);
        }
     };

    render() {
       const messageElements = this.state.messages.map(({text, sender}, index) => (
           <Message key={ index } text={ text } sender={ sender }/>));

       return <div className="messageFieldWrap">
           <div className="message-field">
               { messageElements }
           </div>
            <div style={ { width: '100%', display: 'flex' } }>
               <TextField
                   name="input"
                   fullWidth={ true }
                   hintText="Введите сообщение"
                   style={ { fontSize: '22px' } }
                   onChange={ this.handleChange }
                   value={ this.state.input }
                   onKeyUp={ (event) => this.handleKeyUp(event, this.state.input) }
               />
               <FloatingActionButton onClick={ () => this.handleClick(this.state.input) }>
                   <SendIcon />
               </FloatingActionButton>
           </div>

       </div>
   }
}
