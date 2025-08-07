// src/components/persona/ResistanceItem.tsx
'use client';

import React from 'react';
import { Flex, Text } from '@mantine/core';
import { resistanceLabels } from '@/utils/resistanceUtils';
import { ResistanceType } from '@/types/persona';

interface ResistanceItemProps {
    attackType: string;
    resistanceType: ResistanceType;
    imageSrc: string;
}

const ResistanceItem: React.FC<ResistanceItemProps> = ({ attackType, resistanceType, imageSrc }) => {
    return (
        <Flex direction="column" align="center" gap="xs">
            <img src={imageSrc} alt={attackType} className="w-10 h-10 object-contain" />
            <Text size="m" color="dimmed" fw={700}>
                {resistanceLabels[resistanceType]}
            </Text>
        </Flex>
    );
};

export default ResistanceItem;