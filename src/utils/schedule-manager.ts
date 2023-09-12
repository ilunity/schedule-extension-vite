import {IException, IGroup, storage} from "~/utils/storage";
import {chooseGroupPageUrl, scheduleGroupPageUrl} from "~/utils/consts";

export const deleteSubgroupsSchedule = (exceptions: IException[]) => {
    if (exceptions.length === 0) {
        return [];
    }

    let lessons = Array.from(document.querySelectorAll('.lesson-group')) as HTMLElement[];

    exceptions.map(extension => {
        lessons = lessons.filter(elem => elem.textContent?.includes(extension));
    });

    lessons.forEach(groupElem => {
        const parent = groupElem.parentElement;

        if (parent) {
            parent.style.opacity = '0.3';
        }
    });
}

export const resetSubgroupSchedule = async (exceptions: IException[]) => {
    if (exceptions.length === 0) {
        return;
    }

    let lessons = Array.from(document.querySelectorAll('.lesson-group')) as HTMLElement[];

    exceptions.map(extension => {
        lessons = lessons.filter(elem => elem.textContent?.includes(extension));
    });

    lessons.forEach(groupElem => {
        const parent = groupElem.parentElement;

        if (parent) {
            parent.style.opacity = '1';
        }
    });
}

export const saveGroup = async (url: string): Promise<boolean> => {
    const groupId = url.match(/(?<=group\/).*(?=\?name)/);
    const groupName = url.match(/(?<=name=)\d*(?=#endDate)/);

    if (groupId && groupName) {
        await storage.setGroup({id: `${groupId}`, name: `${groupName}`});
        return true;
    }

    return false;
}

export const removeGroup = () => storage.resetGroup();

export const openSchedule = async (group?: IGroup) => {
    if (group) {
        const {id, name} = group;
        chrome.tabs.create({
            active: true,
            url: `${scheduleGroupPageUrl}/${id}?name=${name}`,
        });

        return;
    }

    chrome.tabs.create({
        active: true,
        url: chooseGroupPageUrl,
    })
}
