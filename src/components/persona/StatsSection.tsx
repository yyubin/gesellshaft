'use client';

import React from 'react';
import { PersonaDto } from '@/types/persona';
import { Slider, Text, Box } from '@mantine/core';
import HealthBar from './HealthBar';
import { MAX_LEVEL } from '@/utils/constants';
import { attackTypeImages, statusImages } from '@/utils/imageUtils';
import StatusItem from './StatusItem';
import ResistanceItem from './ResistanceItem';

interface StatsSectionProps {
    persona: PersonaDto;
    level: number;
    setLevel: (level: number) => void;
}

const StatsSection: React.FC<StatsSectionProps> = ({ persona, level, setLevel }) => {
    // 체력 정보가 없는 경우를 대비한 Null-safe 처리
    const health = persona.healthInfo ? Math.round(persona.healthInfo.baseHealth + (persona.healthInfo.growthRate * level)) : 0;
    const speed = persona.speedInfo ? `${persona.speedInfo.minSpeed} - ${persona.speedInfo.maxSpeed}` : 'N/A';

    return (
        <div className="space-y-6 mt-6">
            <Box className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg pb-6">
                <div className="dark:text-gray-400 pb-2">레벨 조절</div>
                <Box className="pl-2 pr-2">
                    <Slider
                        value={level}
                        onChange={setLevel}
                        min={1}
                        max={MAX_LEVEL}
                        step={1}
                        marks={[{ value: 1, label: '1' }, { value: MAX_LEVEL, label: `${MAX_LEVEL}` }]}
                        label={(value) => `Lv. ${value}`}
                        color="blue"
                    />
                </Box>
            </Box>

            {persona.healthInfo && (
                <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">체력 정보</h4>
                    <HealthBar level={level} healthInfo={persona.healthInfo} />
                </div>
            )}

            {/* --- CHANGED START --- */}
            <div className="bg-gray-400 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold text-lg">스테이터스</h4>
                <div className="grid grid-cols-3 gap-y-4 gap-x-2 mt-3">
                    {/* 1행 */}
                    <StatusItem
                        iconSrc={statusImages.HEALTH}
                        alt="Health"
                        value={health}
                        subLabel="최대 체력"
                    />
                    <StatusItem
                        iconSrc={statusImages.GUARD}
                        alt="Guard"
                        value={MAX_LEVEL + persona.defenseLevel}
                        subLabel="방어 레벨"
                    />
                    <StatusItem
                        iconSrc={statusImages.SPEED}
                        alt="Speed"
                        value={speed}
                        subLabel="속도"
                    />

                    {/* 2행 */}
                    <ResistanceItem
                        attackType="참격"
                        resistanceType={persona.resistanceInfo.slashResistance}
                        imageSrc={attackTypeImages.SLASH}
                    />
                    <ResistanceItem
                        attackType="관통"
                        resistanceType={persona.resistanceInfo.penetrationResistance}
                        imageSrc={attackTypeImages.PIERCE}
                    />
                    <ResistanceItem
                        attackType="타격"
                        resistanceType={persona.resistanceInfo.bluntResistance}
                        imageSrc={attackTypeImages.BLUNT}
                    />
                </div>
            </div>
            {/* --- CHANGED END --- */}
        </div>
    );
};

export default StatsSection;