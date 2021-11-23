import { makeStyles } from '@material-ui/core/styles';

export const videoStyles = makeStyles((theme) => ({
  video: {
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
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));
