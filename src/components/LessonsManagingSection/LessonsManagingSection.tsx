import React from 'react';
import {LessonsManagingSectionProps} from './LessonsManagingSection.types';
import {DeleteGroupsBtn} from "~/components/DeleteGroupsBtn";
import {ResetGroupsBtn} from "~/components/ResetGroupsBtn";
import {Space} from "antd";
import {ExceptionsSection} from "~/components/LessonsManagingSection/ExceptionsSection";

export const LessonsManagingSection: React.FC<LessonsManagingSectionProps> = ({...exceptionsProps}) => {
    return (
        <>
            <Space.Compact block>
                <DeleteGroupsBtn/>
                <ResetGroupsBtn/>
            </Space.Compact>
            <ExceptionsSection {...exceptionsProps}/>
        </>
    );
};
