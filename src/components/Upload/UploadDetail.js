import React, {useState} from "react";
import "./Upload.css";
import {Snackbar, TextField, CardMedia, CardContent, Card, Button, Skeleton, Alert, LinearProgress} from "@material-ui/core"

/**
 * UploadDetail renders upload details
 * @param props requires title, avatarImg, description, setTitle, setAvatarImg, setDescription
 * @returns {JSX.Element}
 * @constructor
 */
export default function UploadDetail(props) {
    const avatarRef = React.createRef();
    const {title, totalChunkNum, avatarImg, fileMD5, loading, computedChunkNum, description, setTitle, setAvatarImg, setDescription} = props

    let cardBody;
    if (avatarImg === "") {
        cardBody = (
            <Skeleton
                animation="wave"
                variant="rectangular"
                style={{maxWidth: 345}}
                width="100%"
                height={200}
            />
        );
    } else {
        cardBody = <CardMedia style={{height: 200}} image={avatarImg} title=""/>;
    }

    const [alertDisplayed, setAlertDisplayed] = useState(false)

    return (
        <div className="DetailContainer">
            <h2>Video Infomation</h2>
            <p>Packaging progress</p>
            <LinearProgress variant="determinate" value={computedChunkNum / totalChunkNum * 100}/>
            <p>Cover</p>
            <Card elevation={7} style={{maxWidth: 345, maxHeight: 500}}>
                {cardBody}
                <CardContent style={{alignItems: "center"}}>
                    <form>
                        <input
                            type="file"
                            name="myImage"
                            hidden={true}
                            ref={avatarRef}
                            accept="image/*"
                            onChange={e => {
                                let reader = new FileReader();
                                if (e.target.files[0] == null) {
                                    return;
                                }
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onload = () => setAvatarImg(reader.result);
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => avatarRef.current.click()}
                            disabled={loading}
                        >
                            Upload Cover
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <TextField
                className="TextInputs"
                required
                id="outlined-required"
                label="Title"
                placeholder="video title"
                value={title}
                disabled={loading}
                onChange={e => setTitle(e.target.value)}
            />

            <TextField
                className="TextInputs"
                id="outlined-multiline-static"
                label="Introduction"
                multiline
                rows={4}
                value={description}
                placeholder="Write an introduction for your video"
                disabled={loading}
                onChange={e => setDescription(e.target.value)}
            />

            <Snackbar
                open={totalChunkNum === computedChunkNum && fileMD5 !== "" && !alertDisplayed}
                onClose={() => setAlertDisplayed(true)}
                key={"snackbar"}
                autoHideDuration={3000}
            >
                <Alert severity="success">Chunks are computed successfully!</Alert>
            </Snackbar>

        </div>
    );
}
