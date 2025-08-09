'use client';

import { Badge, Box, Group, Image, Text } from '@mantine/core';
import {PersonaPassiveDto, SkillAttributeType, SyncLevel} from '@/types/persona';
import { skillAttributeImages } from '@/utils/imageUtils';
import { attributeLabels } from '@/utils/attributeUtils';

type Props = {
    passive: PersonaPassiveDto;
};

const invLabel = (t?: string | null) => (t === 'HOLD' ? '보유' : t === 'RESONATE' ? '공명' : '-');

const attrIcon = (attr?: SkillAttributeType) =>
    (attr && skillAttributeImages[attr]) || skillAttributeImages.NONE;

export default function PassiveCard({ passive }: Props) {
    const attr = passive.activation?.attribute;
    const icon = attrIcon(attr);
    const attrLabel = attributeLabels[passive.activation?.attribute ?? 'NONE'];

    return (
        <Box className="bg-gray-300 dark:bg-gray-700 rounded-lg p-4">
            <Group justify="space-between" align="center" mb="xs">
                <Group gap="sm" align="center">
                    <Image src={icon} alt={`${attr}`} w={28} h={28} radius="sm" />
                    <Text fw={700} fz="lg">{passive.name}</Text>
                    <Badge color={passive.kind === 'NORMAL' ? 'blue' : 'grape'} variant="filled">
                        {passive.kind === 'NORMAL' ? '기본 패시브' : '서포트 패시브'}
                    </Badge>
                </Group>
                {passive.activation && (
                    <Group gap="xs">
                        <Badge variant="light">{invLabel(passive.activation.invocationType)}</Badge>
                        <Badge variant="light">{attrLabel}</Badge>
                        <Badge variant="light">필요 수량 {passive.activation?.count}</Badge>
                    </Group>
                )}
            </Group>

            {passive.originalText && (
                <div>{passive.originalText}</div>
            )}
        </Box>
    );
}
