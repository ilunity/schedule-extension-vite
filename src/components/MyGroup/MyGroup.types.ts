import {IGroup} from "~/utils/storage";

export interface MyGroupProps {
    myGroup: IGroup | null;
    update: () => void
}
