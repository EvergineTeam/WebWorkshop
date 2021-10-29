import { SketchPicker, ColorResult } from 'react-color';
import React, { memo } from 'react';
import { changeObjectProperties } from '@evergine/evergine-api';
import { EntityInfo, entityStore } from '@stores/entity-store';
import Typography from '@material-ui/core/Typography';


type ColorProps = {
    entityInfo: EntityInfo | undefined
};

const ColorPicker = memo(
    ({
        entityInfo
    }: ColorProps) => {

        const defaultColor = "#fff";
        const setEntityInfo = entityStore((s) => s.setEntityInfo);

        const handleChangeComplete = (color: ColorResult) => {
            if (entityInfo != null) {
                entityInfo.color = color.hex;
                changeObjectProperties(entityInfo);
                setEntityInfo(entityInfo);
            }
        };

        return (
            <div>
                <Typography gutterBottom>Color selection</Typography>
                <SketchPicker color={entityInfo ? entityInfo.color : defaultColor} onChangeComplete={handleChangeComplete} />
            </div>
        )
    });

export { ColorPicker }