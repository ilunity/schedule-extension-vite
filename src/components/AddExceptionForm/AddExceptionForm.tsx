import React from 'react';
import {AddExceptionFormProps, FieldType} from './AddExceptionForm.types';
import {Form, Typography} from "antd";
import {AddExceptionInput} from "~/components/AddExceptionForm/AddExceptionInput";
import {storage} from "~/utils/storage";

export const AddExceptionForm: React.FC<AddExceptionFormProps> = ({onSuccess}) => {
    const [form] = Form.useForm();

    const submitForm = async ({exception}: FieldType) => {
        await storage.addException(exception)
        onSuccess();
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name={'basic'}
            initialValues={{remember: true}}
            onFinish={submitForm}
            autoComplete={'off'}
            style={{marginBottom: '8px'}}
        >
            <Typography.Title level={5}>
                Добавить исключение
            </Typography.Title>
            <Form.Item<FieldType>
                style={{marginBottom: '0px'}}
                name={'exception'}
                rules={[{required: true}]}
            >
                <AddExceptionInput/>
            </Form.Item>
        </Form>
    );
};
