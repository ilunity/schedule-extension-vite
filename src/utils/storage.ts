enum STORAGE_KEYS {
    GROUP = 'GROUP',
    EXCEPTIONS = 'EXCEPTIONS',
    HIDDEN_EXCEPTIONS = 'HIDDEN_EXCEPTIONS'
}

export interface IGroup {
    id: string;
    name: string;
}

export type IException = string;

export interface StorageReturn {
    [STORAGE_KEYS.EXCEPTIONS]: IException[];
    [STORAGE_KEYS.GROUP]: IGroup;
    [STORAGE_KEYS.HIDDEN_EXCEPTIONS]: IException[];
}

enum STORAGE_TYPES {
    LOCAL = 'LOCAL',
    SESSION = 'SESSION'
}

class Storage {
    async setItem(key: STORAGE_KEYS, value: any, storageType: `${STORAGE_TYPES}` = STORAGE_TYPES.LOCAL) {
        const valueJSON = JSON.stringify(value);

        const storage =
            storageType === STORAGE_TYPES.LOCAL
                ? chrome.storage.local
                : chrome.storage.session;

        await storage.set({[key]: valueJSON});
    }

    async getItem<KeyType extends keyof StorageReturn>(key: KeyType, storageType: `${STORAGE_TYPES}` = STORAGE_TYPES.LOCAL): Promise<StorageReturn[KeyType] | null> {
        const storage =
            storageType === STORAGE_TYPES.LOCAL
                ? chrome.storage.local
                : chrome.storage.session;

        const storageData = await storage.get([key]);

        const itemJSON = storageData?.[key];

        if (!itemJSON) {
            return null;
        }

        const result = JSON.parse(itemJSON);

        return result;
    }

    async removeItem(key: STORAGE_KEYS, storageType: `${STORAGE_TYPES}` = STORAGE_TYPES.LOCAL) {
        const storage =
            storageType === STORAGE_TYPES.LOCAL
                ? chrome.storage.local
                : chrome.storage.session;

        await storage.remove([key]);
    }

    async setGroup(group: IGroup) {
        await this.setItem(STORAGE_KEYS.GROUP, group)
    }

    async resetGroup() {
        await this.removeItem(STORAGE_KEYS.GROUP);
    }

    async getGroup(): Promise<IGroup | null> {
        const group = await this.getItem(STORAGE_KEYS.GROUP);
        return group;
    }

    async addException(exception: IException) {
        const currentExceptions = await this.getExceptions();

        if (!exception) {
            return currentExceptions;
        }

        if (currentExceptions.includes(exception)) {
            return currentExceptions;
        }

        const newExceptions = [...currentExceptions, exception];

        await this.setItem(STORAGE_KEYS.EXCEPTIONS, newExceptions);

        return newExceptions;
    }

    async getExceptions() {
        const currentExceptions = await this.getItem(STORAGE_KEYS.EXCEPTIONS);
        const result = currentExceptions ? currentExceptions : [];
        return result;
    }

    async deleteException(deletedException: IException): Promise<IException[]> {
        const exceptions = await this.getExceptions();

        if (!exceptions.includes(deletedException)) {
            return exceptions;
        }

        const deletedExceptionIndex = exceptions.findIndex(exception => exception === deletedException);
        exceptions.splice(deletedExceptionIndex, 1);

        await this.setItem(STORAGE_KEYS.EXCEPTIONS, exceptions);

        return exceptions;
    }

    async setHiddenExceptions(exceptions: IException[]) {
        await this.setItem(STORAGE_KEYS.HIDDEN_EXCEPTIONS, exceptions, STORAGE_TYPES.SESSION);
    }

    async getHiddenExceptions(): Promise<IException[]> {
        const exceptions = await this.getItem(STORAGE_KEYS.HIDDEN_EXCEPTIONS, STORAGE_TYPES.SESSION)
        const result = exceptions ? exceptions : [];
        return result;
    }

    async resetHiddenExceptions() {
        await this.setItem(STORAGE_KEYS.HIDDEN_EXCEPTIONS, [], STORAGE_TYPES.SESSION);
    }
}

export const storage = new Storage();
