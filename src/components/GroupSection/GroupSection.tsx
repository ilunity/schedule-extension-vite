import React from 'react';
import {GroupSectionProps} from './GroupSection.types';
import {MyGroup} from "~/components/MyGroup";
import {Button, Space} from "antd";
import {scheduleGroupPageUrl} from "~/utils/consts";
import {openSchedule, saveGroup} from "~/utils/schedule-manager";

export const GroupSection: React.FC<GroupSectionProps> = (
    {
        myGroup,
        updateGroup,
        url,
    }) => {
    const isScheduleTab = url.includes(scheduleGroupPageUrl);

    return (
        <Space
            direction={'vertical'}
            style={{width: '100%'}}
        >
            <MyGroup myGroup={myGroup || null} update={updateGroup}/>
            {isScheduleTab && (
                <Button
                    type={'primary'}
                    block
                    onClick={async () => {
                        const success = await saveGroup(url);
                        if (success) {
                            updateGroup();
                        }
                    }}
                >
                    Сохранить текущую группу
                </Button>
            )}
            {!isScheduleTab && (
                <Button
                    type={'primary'}
                    block
                    onClick={() => openSchedule(myGroup || undefined)}
                >
                    Открыть расписание
                </Button>
            )}
        </Space>
    );
};
