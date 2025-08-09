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
        <div className="flex flex-col items-center justify-center">
            <img src={imageSrc} alt={attackType} className="w-8 h-8 object-contain" />
            <Text size="m" color="dark:dimmed" fw={500}>
                {resistanceLabels[resistanceType]}
            </Text>
        </div>
    );
};

export default ResistanceItem;