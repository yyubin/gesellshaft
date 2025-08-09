'use client';

import React from 'react';
import { Box, Group, Progress, Text } from '@mantine/core';
import { HealthInfoDto } from '@/types/persona';

interface HealthBarProps {
    level: number;
    healthInfo: HealthInfoDto;
}

const HealthBar: React.FC<HealthBarProps> = ({ level, healthInfo }) => {
    // 레벨당 최대 체력 계산
    const maxHealth = healthInfo.baseHealth + (healthInfo.growthRate * level);

    /** 흐트러짐 절대값(HP 지점) → 0.5 단위 반올림 */
    const disturbed1 = Math.round((healthInfo.disturbed1 / 100) * maxHealth);
    const disturbed2 = Math.round((healthInfo.disturbed2 / 100) * maxHealth);
    const disturbed3 = Math.round((healthInfo.disturbed3 / 100) * maxHealth);

    return (
        <Box className="w-full">
            <Group mb="xs">
                <Text size="sm" color="dimmed">
                    최대 체력: {maxHealth.toFixed(0)}
                </Text>
                <Text size="sm" color="dimmed">
                    레벨: {level}
                </Text>
            </Group>

            <div className="relative">
                <Progress
                    value={100} // 현재 체력은 표시하지 않으므로 100%로 고정
                    color="green"
                    size="xl"
                    radius="sm"
                />

                {/* 흐트러짐 선 시각화 */}
                {/* 흐트러짐 1선 */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10"
                    style={{ left: `${healthInfo.disturbed1}%` }}
                />
                {/* 흐트러짐 2선 */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                    style={{ left: `${healthInfo.disturbed2}%` }}
                />
                {/* 흐트러짐 3선 */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-700 z-10"
                    style={{ left: `${healthInfo.disturbed3}%` }}
                />
            </div>

            <Group mt="md">
                <Text size="xs" color="dimmed" className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 mr-1" />
                    {disturbed1} ({healthInfo.disturbed1}%)
                </Text>
                <Text size="xs" color="dimmed" className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1" />
                    {disturbed2} ({healthInfo.disturbed2}%)
                </Text>
                <Text size="xs" color="dimmed" className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-700 mr-1" />
                    {disturbed3} ({healthInfo.disturbed3}%)
                </Text>
            </Group>

            {/* ──────────────── 안내 문구 ──────────────── */}
            <Text size="xs" mt="xs" c="dimmed">
                ※ 체력 값은 소수점 이하를 반올림했기 때문에 실제 계산값과 최대 ±0.5 차이가 있을 수 있습니다.
            </Text>
        </Box>
    );
};

export default HealthBar;