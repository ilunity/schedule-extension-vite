import React from 'react';
import {DeleteGroupsBtnProps} from './DeleteGroupsBtn.types';
import {Button} from "antd";
import {chromeScript} from "~/utils/chrome-script";

export const DeleteGroupsBtn: React.FC<DeleteGroupsBtnProps> = () => {
    return (
        <Button
            block
            type={'primary'}
            onClick={chromeScript.handleScheduleDelete}
        >
            Убрать лишнее
        </Button>
    );
};
