import {IException} from "~/utils/storage";

export interface ExceptionsSectionProps {
    exceptions: IException[];
    update: () => void;
}
