'use client';

import { Stack, Text } from '@mantine/core';
import {PersonaPassiveDto, SyncLevel} from '@/types/persona';
import PassiveCard from './PassiveCard';

type Props = {
    passives?: PersonaPassiveDto[];
    syncLevel: SyncLevel;
};

export default function PassiveList({ passives, syncLevel }: Props) {
    if (!passives || passives.length === 0) {
        return <Text c="gray.4">패시브 정보가 없습니다.</Text>;
    }

    // syncLevel에 따라 패시브 필터링 로직 변경
    const filteredPassives = passives.filter(p =>
        (p.syncLevel || 'SYNC_3') === syncLevel
    );

    if (filteredPassives.length === 0) {
        return <Text c="gray.4">해당 동기화 레벨의 패시브 정보가 없습니다.</Text>
    }

    return (
        <Stack gap="md">
            {filteredPassives.map((p) => (
                <PassiveCard key={p.id} passive={p} />
            ))}
        </Stack>
    );
}
