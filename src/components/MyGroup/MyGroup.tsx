import React from 'react';
import {MyGroupProps} from './MyGroup.types';
import {Tag, Tooltip, Typography} from "antd";
import {removeGroup} from "~/utils/schedule-manager";
import {CloseCircleOutlined} from "@ant-design/icons";

export const MyGroup: React.FC<MyGroupProps> = ({myGroup, update}) => {
    const handleRemoveGroup = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        await removeGroup();
        update();
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
            }}
        >
            <Typography.Title
                level={3}
                style={{
                    margin: 0,
                    lineHeight: '18px'
                }}
            >
                Моя группа:
            </Typography.Title>
            <Tooltip
                title={!myGroup && 'Перейдите на страницу с расписанием, чтобы можно было сохранить вашу группу'}
            >
                <Tag
                    color={'#2db7f5'}
                    style={{margin: 0}}
                    closeIcon={myGroup?.name && <CloseCircleOutlined/>}
                    onClose={handleRemoveGroup}
                >
                    {myGroup?.name || '?'}
                </Tag>
            </Tooltip>
        </div>
    );
};
