import {storage} from "~/utils/storage";
import {deleteSubgroupsSchedule, resetSubgroupSchedule} from "~/utils/schedule-manager";
import {scheduleGroupPageUrl} from "~/utils/consts";

class ChromeScript {
    async handleScheduleDelete() {
        let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        const exceptions = await storage.getExceptions();

        if (tab.id && tab.url?.includes(scheduleGroupPageUrl)) {
            await chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: deleteSubgroupsSchedule,
                args: [exceptions],
            });

            await storage.setHiddenExceptions(exceptions);
        }
    }

    async handleResetHiddenLessons() {
        let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        const exceptions = await storage.getHiddenExceptions();

        if (tab.id && tab.url?.includes(scheduleGroupPageUrl)) {
            await chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: resetSubgroupSchedule,
                args: [exceptions],
            });

            await storage.resetHiddenExceptions();
        }
    }
}

export const chromeScript = new ChromeScript();
