import { Alert, Snackbar } from "@mui/material"

const AlertSendLink = ({open, handleClose}) => {

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            onClose={handleClose}
            message="Note archived"
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                All is set! Your claim will be released soon. Usualy it takes up to 1 day.
            </Alert>
        </Snackbar>
    )
}

export default AlertSendLink; 