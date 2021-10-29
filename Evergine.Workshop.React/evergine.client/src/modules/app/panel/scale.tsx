import React, { memo} from 'react';
import { EntityInfo, entityStore} from '@stores/entity-store';
import { changeObjectProperties } from '@evergine/evergine-api';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { ChangeEvent } from 'react';


const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });


type ScaleProps = {
    entityInfo: EntityInfo | undefined
};

const Scale = memo(
    ({
        entityInfo
    }: ScaleProps) => {

        const classes = useStyles();
        const setEntityInfo = entityStore((s) => s.setEntityInfo);
        const handleChange = (event: ChangeEvent<{}>, value:number | number[]) => {
            if (entityInfo != null) {
                const entityProperties = (({ color, scaleFactor, entityName }) => ({ color, scaleFactor, entityName }))(entityInfo);
                entityProperties.scaleFactor = value;
                setEntityInfo(entityProperties);
                changeObjectProperties(entityProperties);
            }
        };

        return (
            <div className={classes.root}>
                <Typography gutterBottom>Scale</Typography>
                <Slider
                    id="typeinp"
                    min={0} 
                    max={5}
                    marks
                    value = {entityInfo ? entityInfo.scaleFactor: 1}
                    defaultValue={entityInfo ? entityInfo.scaleFactor: 1}
                    onChange={handleChange}
                    step={1} />
            </div>
        )
    });

export { Scale }