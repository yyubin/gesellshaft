// src/components/persona/ResistanceDisplay.tsx
'use client';

import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import { ResistanceInfoDto } from '@/types/persona';
import ResistanceItem from './ResistanceItem';
import { attackTypeImages } from '@/utils/imageUtils';

interface ResistanceDisplayProps {
    resistanceInfo: ResistanceInfoDto;
}

const ResistanceDisplay: React.FC<ResistanceDisplayProps> = ({ resistanceInfo }) => {
    return (
        <Box className="w-full">
            <Text size="lg" mb="md">
                저항 정보
            </Text>
            <Flex justify="center" gap="xl">
                <ResistanceItem
                    attackType="참격"
                    resistanceType={resistanceInfo.slashResistance}
                    imageSrc={attackTypeImages.SLASH}
                />
                <ResistanceItem
                    attackType="관통"
                    resistanceType={resistanceInfo.penetrationResistance}
                    imageSrc={attackTypeImages.PIERCE}
                />
                <ResistanceItem
                    attackType="타격"
                    resistanceType={resistanceInfo.bluntResistance}
                    imageSrc={attackTypeImages.BLUNT}
                />
            </Flex>
        </Box>
    );
};

export default ResistanceDisplay;