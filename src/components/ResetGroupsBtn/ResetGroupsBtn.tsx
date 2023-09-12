import React from 'react';
import {ReloadOutlined} from "@ant-design/icons";
import {Button, Tooltip} from "antd";
import {chromeScript} from "~/utils/chrome-script";

export const ResetGroupsBtn: React.FC = () => {
    return (
        <Tooltip title={'Вернуть расписание'}>
            <Button
                icon={<ReloadOutlined/>}
                onClick={chromeScript.handleResetHiddenLessons}
            />
        </Tooltip>
    );
};
