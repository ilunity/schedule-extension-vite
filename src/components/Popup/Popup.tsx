import React from "react";
import {Divider, Space} from "antd";
import {storage} from "~/utils/storage";
import {useLoadFromStorage} from "~/utils/hooks/useLoadFromStorage";
import {PopupProps} from "~/components/Popup/Popup.types";
import {GroupSection} from "~/components/GroupSection";
import {LessonsManagingSection} from "~/components/LessonsManagingSection";
import {scheduleGroupPageUrl} from "~/utils/consts";

export const Popup: React.FC<PopupProps> = ({url}) => {
    const {
        state: {data: exceptions},
        update: updateExceptions,
    } = useLoadFromStorage({func: storage.getExceptions});

    const {
        state: {data: myGroup},
        update: updateMyGroup,
    } = useLoadFromStorage({func: storage.getGroup});

    const isScheduleTab = url.includes(scheduleGroupPageUrl);

    return (
        <Space
            direction={'vertical'}
            style={{width: '100%'}}
        >
            <GroupSection myGroup={myGroup || null} url={url} updateGroup={updateMyGroup}/>
            {isScheduleTab &&
                <>
                    <Divider style={{margin: '5px'}}/>
                    <LessonsManagingSection
                        exceptions={exceptions || []}
                        update={updateExceptions}
                    />
                </>
            }
        </Space>
    );
}
