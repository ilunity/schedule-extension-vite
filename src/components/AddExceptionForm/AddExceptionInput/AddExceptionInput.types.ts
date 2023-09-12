import {FieldType} from "~/components/AddExceptionForm/AddExceptionForm.types";

export interface AddExceptionInputProps {
    onChange?: (exception: FieldType['exception']) => void;
    value?: FieldType['exception'];
}
