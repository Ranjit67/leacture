import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={8} variant="filled" {...props} />;
}



export default function CustomizedSnackbars(props) {
 

  return (
    <div >
      
      <Snackbar open={props.toastControle.bolean}>
        <Alert  severity={props.toastControle.type}>
          {props.toastControle.massage}
        </Alert>
      </Snackbar>
      
    </div>
  );
}
