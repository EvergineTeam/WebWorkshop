import { useWindowSize } from '@hooks/resize';
import { EvergineCanvas } from '@modules/app/evergine/canvas';
import { Panel } from '@modules/app/panel';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const EvergineApp = () => {

    const size = useWindowSize();
    return (
        <Container id='app' disableGutters={true} maxWidth={false}>
            <Grid container >
                <EvergineCanvas width={size.width *0.75} height={size.height} />
                <Panel />
            </Grid>
        </Container>
    )
}
export { EvergineApp }