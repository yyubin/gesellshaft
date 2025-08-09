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
        return <p className="text-gray-400">인격 정보를 불러오는 데 실패했습니다.</p>;
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col md:flex-row">
            {/* 왼쪽: 이미지 섹션 */}
            {/* CHANGED: level과 setLevel을 props로 전달 */}
            <ImageSection persona={persona} level={level} setLevel={setLevel} />

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
                        className={`px-4 py-2 font-semibold ${activeTab === 'mentalities' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
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
                    >
                    </Switch>
                </div>

                {/* 탭 콘텐츠 */}
                <div className="tab-content">
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
                        <div className="space-y-6"></div>
                    )}

                    {/* REMOVED: 'stats' 탭 콘텐츠 전체 제거 */}
                </div>
            </div>
        </div>
    );
};

export default PersonaDetail;