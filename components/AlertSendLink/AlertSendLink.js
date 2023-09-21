import { Alert, Snackbar } from "@mui/material"
import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { openAlert, handleCloseAlert } from '../../store/alert';

const AlertSendLink = ({openAlert, handleCloseAlert}) => {

    return (
        <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            onClose={handleCloseAlert}
            message="Note archived"
        >
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%', fontSize: "14px" }}>
                All is set! Sit tight and wait for the result.
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = createStructuredSelector({
    openAlert
})

const mapDispatchToProps = dispatch => ({
    handleCloseAlert: bindActionCreators(handleCloseAlert, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertSendLink); 