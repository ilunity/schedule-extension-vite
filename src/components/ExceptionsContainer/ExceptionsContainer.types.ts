import {IException} from "~/utils/storage";

export interface ExceptionsContainerProps {
    exceptions: IException[];
    update: () => void;
}
