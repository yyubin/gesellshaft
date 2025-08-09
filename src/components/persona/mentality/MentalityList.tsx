'use client';

import { Stack, Text } from '@mantine/core';
import {PersonaPassiveDto, SyncLevel} from '@/types/persona';

type Props = {
    passives?: PersonaPassiveDto[];
    syncLevel: SyncLevel;
};

export default function PassiveList({ passives, syncLevel }: Props) {
    if (!passives || passives.length === 0) {
        return <Text c="gray.4">패시브 정보가 없습니다.</Text>;
    }

    const filteredPassives = passives.filter(p =>
        (p.syncLevel || 'SYNC_3') === syncLevel
    );

    if (filteredPassives.length === 0) {
        return <Text c="gray.4">해당 동기화 레벨의 패시브 정보가 없습니다.</Text>
    }

    return (
        <Stack gap="md">
        </Stack>
    );
}
