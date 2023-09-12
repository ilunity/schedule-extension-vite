import {IGroup} from "~/utils/storage";

export interface GroupSectionProps {
    myGroup: IGroup | null;
    url: string;
    updateGroup: () => void;
}
