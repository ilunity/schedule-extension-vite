import {Popup} from "~/components/Popup";
import React, {useEffect, useState} from "react";

const App: React.FC = () => {
    const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);


    useEffect(() => {
        const queryUrl = async () => {
            let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            setCurrentUrl(tab.url);
        }

        queryUrl();
    }, []);

    return (
        <main>
            {currentUrl && <Popup url={currentUrl}/>}
        </main>
    );
}

export default App;
