import { makeStyles } from '@material-ui/core/styles';
import { borderBottom } from '@mui/system';

export const videoStyles = makeStyles((theme) => ({
  video: {
    // borderBottom: '1px solid black',
    width: '100%',
    height: 'auto',
    // width: '550px',
    // height: '412px',
    // [theme.breakpoints.down('xs')]: {
    //   width: '300px',
    //   height: '225px',
    // },
  },
  avatar: {
    // borderBottom: '1px solid black',
    height: '412px',
    [theme.breakpoints.down('xs')]: {
      height: '225px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    border: '2px solid black',
    padding: '10px',
    margin: '10px',
  },
}));
