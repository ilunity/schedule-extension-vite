import React from 'react';
import {AddExceptionInputProps} from './AddExceptionInput.types';
import {Button, Input, Tooltip} from "antd";
import {PlusOutlined} from '@ant-design/icons';

export const AddExceptionInput: React.FC<AddExceptionInputProps> = ({value, onChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }

    return (
        <Input.Group compact>
            <Input
                value={value}
                onChange={handleChange}
                style={{width: 'calc(100% - 32px)'}}
                placeholder={'932001 (1-2)'}
            />
            <Tooltip title={'Добавить'}>
                <Button
                    style={{width: '32px'}}
                    htmlType={'submit'}
                    type={'primary'}
                    icon={<PlusOutlined/>}
                />
            </Tooltip>
        </Input.Group>
    );
};
