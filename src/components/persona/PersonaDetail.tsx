// src/components/persona/PersonaDetail.tsx
"use client";

import React, { useState } from 'react';
import {
    attackTypeImages,
    defenseTypeImages,
    skillAttributeImages,
    gradeImages,
} from '@/utils/imageUtils';
import SkillCard from '@/components/persona/SkillCard';
import {
    PersonaDto,
    SkillDto,
    SyncLevel,
    GradeType,
} from '@/types/persona';
import ImageSection from './ImageSection';
import HealthBar from './HealthBar';
import SpeedDisplay from './SpeedDisplay';
import ResistanceDisplay from './ResistanceDisplay';
import { Slider, Text, Box } from '@mantine/core';
import { MAX_LEVEL } from "@/utils/constants";

// 기존의 ImageToggleButton 컴포넌트
interface ImageToggleButtonProps {
    label: string;
    imageUrl: string;
    currentImageUrl: string;
    onClick: (url: string) => void;
}

const ImageToggleButton: React.FC<ImageToggleButtonProps> = ({ label, imageUrl, currentImageUrl, onClick }) => {
    return (
        <button
            onClick={() => onClick(imageUrl)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                currentImageUrl === imageUrl ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );
};

// PersonaDetail 컴포넌트 props 인터페이스
interface PersonaDetailProps {
    persona: PersonaDto;
}

const PersonaDetail: React.FC<PersonaDetailProps> = ({ persona }) => {
    // 탭 상태에 'stats'를 추가
    const [activeTab, setActiveTab] = useState<'skills' | 'passives' | 'stats'>('skills');
    const [currentImage, setCurrentImage] = useState<string | undefined>(persona?.imageInfo?.imageUrlAC);

    const [level, setLevel] = useState<number>(MAX_LEVEL);

    if (!persona) {
        return <p className="text-gray-400">인격 정보를 불러오는 데 실패했습니다.</p>;
    }

    const getGradeImage = (grade: GradeType): string | null => {
        switch (grade) {
            case 'ONE':
                return gradeImages.grade_1;
            case 'TWO':
                return gradeImages.grade_2;
            case 'THREE':
                return gradeImages.grade_3;
            default:
                return null;
        }
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col md:flex-row">
            {/* 왼쪽: 이미지 섹션 */}
            <ImageSection persona={persona} />

            {/* 오른쪽: 탭 콘텐츠 섹션 */}
            <div className="flex-1">
                {/* 탭 네비게이션 */}
                <div className="flex border-b border-gray-700 mb-6">
                    <button
                        className={`px-4 py-2 font-semibold ${activeTab === 'skills' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('skills')}
                    >
                        스킬
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold ${activeTab === 'passives' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('passives')}
                    >
                        패시브
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold ${activeTab === 'stats' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('stats')}
                    >
                        스탯
                    </button>
                </div>

                {/* 탭 콘텐츠 */}
                <div className="tab-content">
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            {persona.skills?.map((skill: SkillDto) => (
                                <SkillCard key={skill.id} skill={skill} syncLevel={'SYNC_4'} />
                            ))}
                            {persona.skills?.length === 0 && <p className="text-gray-400">스킬 정보가 없습니다.</p>}
                        </div>
                    )}

                    {activeTab === 'passives' && (
                        <div className="space-y-6">
                            {persona.passiveInfo && (
                                <>
                                    <div className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg">
                                                {persona.passiveInfo.normalPassiveName}
                                                <span className="ml-2 text-sm font-normal text-gray-400">
                                                    ({persona.passiveInfo.normalPassiveInvocationType === 'HOLD' ? '보유' : '공명'})
                                                </span>
                                            </h4>
                                            <p className="text-gray-300 text-sm">
                                                속성: {persona.passiveInfo.normalPassiveAttribute}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg">
                                                {persona.passiveInfo.supportPassiveName}
                                                <span className="ml-2 text-sm font-normal text-gray-400">
                                                    ({persona.passiveInfo.supportPassiveInvocationType === 'HOLD' ? '보유' : '공명'})
                                                </span>
                                            </h4>
                                            <p className="text-gray-300 text-sm">
                                                속성: {persona.passiveInfo.supportPassiveAttribute}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                            {!persona.passiveInfo && <p className="text-gray-400">패시브 정보가 없습니다.</p>}
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div className="space-y-6">
                            {/* 레벨 조절 슬라이더 추가 */}
                            <Box className="bg-gray-700 p-4 rounded-lg pb-6">
                                <Text size="sm" color="dimmed" mb="xs">레벨 조절</Text>
                                <Box className="pl-2 pr-2">
                                    <Slider
                                        value={level}
                                        onChange={setLevel}
                                        min={1}
                                        max={MAX_LEVEL}
                                        step={1}
                                        marks={[
                                            { value: 1, label: '1' },
                                            { value: MAX_LEVEL, label: `${MAX_LEVEL}` }
                                        ]}
                                        label={(value) => `Lv. ${value}`}
                                        color="blue"
                                    />
                                </Box>
                            </Box>

                            {persona.healthInfo && (
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-bold text-lg mb-2">체력 정보</h4>
                                    <HealthBar level={level} healthInfo={persona.healthInfo} />
                                </div>
                            )}

                            {/* 속도 정보 */}
                            {persona.speedInfo && (
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <SpeedDisplay speedInfo={persona.speedInfo} />
                                </div>
                            )}

                            {/* 저항 정보 */}
                            {persona.resistanceInfo && (
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <ResistanceDisplay resistanceInfo={persona.resistanceInfo} />
                                </div>
                            )}

                            {/* 기타 스탯 */}
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-bold text-lg">기타 스탯</h4>
                                <p className="text-gray-300 text-sm mt-2">방어 레벨: {persona.defenseLevel}</p>
                                <p className="text-gray-300 text-sm">정신력: {persona.mentality}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonaDetail;