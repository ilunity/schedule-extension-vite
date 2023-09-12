import pkg from "../package.json";
import ManifestPermissions = chrome.runtime.ManifestPermissions;

const manifest = {
    action: {
        default_icon: {
            16: "icons/calendar16.png",
            32: "icons/calendar32.png",
            64: "icons/calendar64.png",
            128: "icons/calendar128.png",
        },
        default_popup: "src/entries/popup/index.html",
    },
    background: {
        service_worker: "src/entries/background/main.ts",
    },
    permissions: ["tabs", "activeTab", "scripting", "storage"] as ManifestPermissions[],
    host_permissions: ["https://intime.tsu.ru/*"],
    icons: {
        16: "icons/calendar16.png",
        32: "icons/calendar32.png",
        64: "icons/calendar64.png",
        128: "icons/calendar128.png",
    },
};

export function getManifest(): chrome.runtime.ManifestV3 {
    return {
        author: pkg.author,
        description: pkg.description,
        name: pkg.displayName ?? pkg.name,
        version: pkg.version,
        manifest_version: 3,
        ...manifest,
    };
}
