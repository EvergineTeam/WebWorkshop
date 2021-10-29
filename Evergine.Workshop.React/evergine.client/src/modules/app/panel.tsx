import { entityStore } from '@stores/entity-store';
import { ColorPicker } from '@modules/app/panel/color';
import { Scale } from '@modules/app/panel/scale';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    grid: {
      background: 'whitesmoke',
    },
    item: {
        padding: '10px'
    }
  }));


const Panel = () => {

    const entityInfo = entityStore((s) => s.entity);
    const classes = useStyles();


    return (
        <Grid container item className ={classes.grid} xs={3} direction="column" justifyContent="flex-start" alignItems="center">
            <Grid className = {classes.item} item>
                <Typography variant="h5">Action Panel</Typography>
            </Grid>
            <Grid className = {classes.item}  item>
                <Card>
                <CardContent>
                    <Typography variant="h6">Selected entity: <b>{entityInfo ? entityInfo.entityName : "None"}</b></Typography>
                </CardContent>
                </Card>
            </Grid>
            <Grid className = {classes.item}  item>
                <ColorPicker entityInfo={entityInfo} />
            </Grid>
            <Grid className = {classes.item} item>
                <Scale entityInfo={entityInfo} />
            </Grid>
        </Grid>
    )
}

export { Panel }