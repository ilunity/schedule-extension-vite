import {DependencyList, useEffect, useState} from "react";
import {storage} from "~/utils/storage";

export enum IStatusState {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
}

type  IReturnState<DataType> = {
    data: DataType | null;
    status: `${IStatusState.FULFILLED}`;
} | {
    data: undefined;
    status: `${IStatusState.PENDING}`;
}

interface UseLoadFromStorageOptions<DataType> {
    func: () => Promise<DataType>,
    deps?: DependencyList;
    condition?: boolean;
}

export interface UseLoadFromStorage<DataType> {
    state: IReturnState<DataType>
    update: () => void;
};

export const useLoadFromStorage = <DataType>(
    {
        func,
        deps = [],
        condition = true,
    }: UseLoadFromStorageOptions<DataType>
): UseLoadFromStorage<DataType> => {
    const [updateCounter, setUpdateCounter] = useState<number>(0);
    const update = () => setUpdateCounter(prevState => prevState + 1);

    const [state, setState] = useState<IReturnState<DataType>>({
        status: 'pending',
        data: undefined,
    });

    const funcWithContext = func.bind(storage);

    const request = async () => {
        setState({status: 'pending', data: undefined});

        const data = await funcWithContext();
        setState({status: 'fulfilled', data});
    };

    useEffect(() => {
        if (condition) {
            request();
        }
    }, deps);

    useEffect(() => {
        if (condition) {
            request();
        }
    }, [updateCounter]);

    return {
        state,
        update
    }
};
