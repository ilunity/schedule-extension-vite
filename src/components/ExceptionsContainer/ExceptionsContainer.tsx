import React from 'react';
import {ExceptionsContainerProps} from './ExceptionsContainer.types';
import {Space, Tag} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IException, storage} from "~/utils/storage";

export const ExceptionsContainer: React.FC<ExceptionsContainerProps> = ({exceptions, update}) => {
    const deleteException = async (exception: IException) => {
        await storage.deleteException(exception);
        update();
    };

    return (
        <Space.Compact block>
            {exceptions.map(exception => (
                <Tag
                    closeIcon={<CloseCircleOutlined/>}
                    onClose={() => deleteException(exception)}
                >
                    {exception}
                </Tag>
            ))}
        </Space.Compact>
    );
};
