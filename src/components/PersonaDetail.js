"use client";

import { useState } from 'react';
import { attackTypeImages, skillAttributeImages } from '@/utils/imageUtils';

const SkillIcon = ({ attribute, type }) => {
    const attributeImageUrl = skillAttributeImages[attribute] || skillAttributeImages.NONE;
    const typeImageUrl = (type && attackTypeImages[type]) || (type && defenseTypeImages[type]); // defenseType 이미지가 있다면 추가

    return (
        <div className="relative w-12 h-12 flex-shrink-0">
            {/* 속성 이미지 (배경) */}
            <img
                src={attributeImageUrl}
                alt={attribute}
                className="w-full h-full object-cover rounded-full"
            />
            {/* 타입 이미지 (겹쳐서 올림) */}
            {typeImageUrl && (
                <img
                    src={typeImageUrl}
                    alt={type}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default function PersonaDetail({ persona }) {
    const [activeTab, setActiveTab] = useState('skills');

    if (!persona) {
        return <p className="text-gray-400">인격 정보를 불러오는 데 실패했습니다.</p>;
    }

    // 임시로 Sync 4 스탯을 가져오는 함수
    const getSkillStats = (skill) => {
        return skill.statsBySync.find(s => s.syncLevel === 'SYNC_4');
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center mb-6">
                {/* Persona 이미지 (데이터에 ImageInfo가 있다면 사용) */}
                {persona.imageInfo?.imageUrlAC && (
                    <img src={persona.imageInfo.imageUrlAC} alt={persona.name} className="w-24 h-24 rounded-full mr-4 object-cover" />
                )}
                <div>
                    <h2 className="text-3xl font-bold">{persona.name}</h2>
                    <p className="text-gray-400">{persona.affiliation?.name} | {persona.grade} 등급</p>
                    <p className="text-gray-400">수감자: {persona.prisoner?.name}</p>
                </div>
            </div>

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
                    className={`px-4 py-2 font-semibold ${activeTab === 'mentality' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('mentality')}
                >
                    정신력
                </button>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="tab-content">
                {activeTab === 'skills' && (
                    <div className="space-y-6">
                        {persona.skills?.map(skill => {
                            const stats = getSkillStats(skill);
                            const skillType = skill.attackType || skill.defenseType;
                            return (
                                <div key={skill.id} className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                                    <SkillIcon attribute={skill.skillAttribute} type={skillType} />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{skill.name}</h4>
                                        <div className="flex items-center text-sm text-gray-400 space-x-2">
                                            <span>속성: {skill.skillAttribute}</span>
                                            <span>|</span>
                                            <span>타입: {skillType}</span>
                                            {stats && (
                                                <>
                                                    <span>|</span>
                                                    <span>위력: {stats.basePower}+{stats.coinPower}</span>
                                                    <span>(코인 {stats.coinCount}개)</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {persona.skills?.length === 0 && <p className="text-gray-400">스킬 정보가 없습니다.</p>}
                    </div>
                )}

                {activeTab === 'passives' && (
                    <div className="space-y-6">
                        {persona.passiveInfo && (
                            <>
                                <div className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                                    <SkillIcon attribute={persona.passiveInfo.normalPassiveAttribute} />
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
                                    <SkillIcon attribute={persona.passiveInfo.supportPassiveAttribute} />
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

                {activeTab === 'mentality' && (
                    <div className="p-4 rounded-lg bg-gray-700">
                        <h4 className="font-bold text-lg mb-2">정신력</h4>
                        <p className="text-gray-300 text-sm">
                            현재 정신력: {persona.mentality}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
