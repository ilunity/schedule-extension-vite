import React from 'react';
import {ExceptionsSectionProps} from './ExceptionsSection.types';
import {AddExceptionForm} from "~/components/AddExceptionForm";
import {ExceptionsContainer} from "~/components/ExceptionsContainer";

export const ExceptionsSection: React.FC<ExceptionsSectionProps> = ({exceptions, update}) => {
    return (
        <>
            <AddExceptionForm onSuccess={update}/>
            <ExceptionsContainer exceptions={exceptions || []} update={update}/>
        </>
    );
};
