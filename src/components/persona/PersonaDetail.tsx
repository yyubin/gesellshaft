// src/components/persona/PersonaDetail.tsx
"use client";

import React, { useState } from 'react';
import {
    PersonaDto, SyncLevel,
} from '@/types/persona';
import ImageSection from './ImageSection';
import PassiveList from './passive/PassiveList';
import SkillList from './skill/SkillList';
import { Switch } from '@mantine/core';
import { MAX_LEVEL } from "@/utils/constants";

interface PersonaDetailProps {
    persona: PersonaDto;
}

const PersonaDetail: React.FC<PersonaDetailProps> = ({ persona }) => {
    const [activeTab, setActiveTab] = useState<'skills' | 'passives' | 'mentalities'>('skills');
    const [level, setLevel] = useState<number>(MAX_LEVEL);
    const [syncLevel, setSyncLevel] = useState<SyncLevel>('SYNC_4');

    const syncSwitchToggle = (() => {
        syncLevel === 'SYNC_4' ? setSyncLevel('SYNC_3') : setSyncLevel('SYNC_4')
    })

    if (!persona) {
        // 다크 모드 지원: 텍스트 색상 변경
        return <p className="text-gray-500 dark:text-gray-400">인격 정보를 불러오는 데 실패했습니다.</p>;
    }

    return (
        // 다크 모드 지원: 배경색 변경
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-xl p-4 md:p-6 flex flex-col md:flex-row">
            <ImageSection persona={persona} level={level} setLevel={setLevel} />

            {/* 오른쪽: 탭 콘텐츠 섹션 */}
            <div className="flex-1 mt-6 md:mt-0">
                {/* 탭 네비게이션 */}
                <div className="flex border-b border-gray-500 dark:border-gray-100 mb-6">
                    <button
                        className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                            activeTab === 'skills'
                                ? 'text-blue-600 dark:text-white border-b-2 border-blue-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab('skills')}
                    >
                        스킬
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                            activeTab === 'passives'
                                ? 'text-blue-600 dark:text-white border-b-2 border-blue-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab('passives')}
                    >
                        패시브
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold transition-colors duration-200 ${
                            activeTab === 'mentalities'
                                ? 'text-blue-600 dark:text-white border-b-2 border-blue-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab('mentalities')}
                    >
                        정신력
                    </button>
                </div>

                {/* 동기화 레벨 선택 UI 추가 */}
                <div className="mb-4">
                    <Switch
                        size="lg"
                        defaultChecked
                        onClick={syncSwitchToggle}
                        onLabel="동기화 4"
                        offLabel="동기화 3"
                    />
                </div>

                {/* 탭 콘텐츠 */}
                <div className="tab-content">
                    {/*
                      SkillList, PassiveList와 같은 하위 컴포넌트들도
                      내부적으로 다크모드를 지원하도록 스타일 수정이 필요할 수 있습니다.
                    */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            <SkillList skills={persona.skills} syncLevel={syncLevel} />
                        </div>
                    )}

                    {activeTab === 'passives' && (
                        <div className="space-y-6">
                            <PassiveList passives={persona.passives} syncLevel={syncLevel} />
                        </div>
                    )}

                    {activeTab === 'mentalities' && (
                        <div className="space-y-6">
                            {/* 정신력 관련 콘텐츠 */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonaDetail;