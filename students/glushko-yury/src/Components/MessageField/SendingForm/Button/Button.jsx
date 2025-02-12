import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import style from './Button.module.scss';

const Button = ({ inputValue }) => {
  return (
    <Fab
      color='primary'
      className={style.btn}
      type='submit'
      disabled={!inputValue}
    >
      <SendIcon className={style.icon} />
    </Fab>
  );
};

export default Button;
