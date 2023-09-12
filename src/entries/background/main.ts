import {chromeScript} from "~/utils/chrome-script";

chrome.tabs.onUpdated.addListener(chromeScript.handleScheduleDelete);
