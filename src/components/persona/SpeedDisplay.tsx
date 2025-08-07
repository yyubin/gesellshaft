'use client';

import React from 'react';
import { Box, Group, RangeSlider, Text } from '@mantine/core';
import { SpeedInfoDto } from '@/types/persona';

interface SpeedDisplayProps {
    speedInfo: SpeedInfoDto;
}

const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ speedInfo }) => {
    return (
        <Box className="w-full pb-5">
            <Group mb="xs">
                <h4 className="font-bold text-lg mb-2">체력 정보</h4>
            </Group>

            <RangeSlider
                value={[speedInfo.minSpeed, speedInfo.maxSpeed]}
                min={1} // 최소 속도 범위
                max={15} // 최대 속도 범위 (게임에 따라 조정 필요) // TODO: 물어보기;
                step={1}
                disabled
                label={(value) => `${value}`}
                marks={[
                    { value: speedInfo.minSpeed, label: `최소 ${speedInfo.minSpeed}` },
                    { value: speedInfo.maxSpeed, label: `최대 ${speedInfo.maxSpeed}` }
                ]}
            />
        </Box>
    );
};

export default SpeedDisplay;