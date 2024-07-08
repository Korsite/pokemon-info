import {Fab, Fade, useScrollTrigger} from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from "@mui/material/Button";
import {useAnimation} from "../hooks/useAnimation.jsx";
import {memo} from "react";

export function ScrollTop(props) {
    const {window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
    const {button1, setTemporaryAnimation} = useAnimation({
        button1: 'animate__animated animate__fadeOutDown',
    })

    return (
        <>
            <Fade in={trigger}>
                <Box
                    sx={{position: 'fixed', bottom: 16, right: 16}}
                >
                    <Button
                        variant="contained"
                        startIcon={<KeyboardArrowUpIcon/>}
                        onClick={(e) => {
                            handleClick(e)
                            setTemporaryAnimation(e)
                        }}
                        name='button1'
                        className={button1}
                    >
                        Top scroll
                    </Button>
                </Box>
            </Fade>
        </>

    );
}