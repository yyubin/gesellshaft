"use client";

import { useState } from 'react';
import { attackTypeImages, skillAttributeImages, gradeImages, coinImages, skillBorders } from '@/utils/imageUtils';
import SkillCard from '@/components/persona/SkillCard';

const ImageToggleButton = ({ label, imageUrl, currentImageUrl, onClick }) => {
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

export default function PersonaDetail({ persona }) {
    const [activeTab, setActiveTab] = useState('skills');
    const [currentImage, setCurrentImage] = useState(persona?.imageInfo?.imageUrlAC);

    if (!persona) {
        return <p className="text-gray-400">인격 정보를 불러오는 데 실패했습니다.</p>;
    }

    const getSkillStats = (skill) => {
        return skill.statsBySync.find(s => s.syncLevel === 'SYNC_4');
    };

    const getGradeImage = (grade) => {
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

    const handleImageChange = (imageUrl) => {
        setCurrentImage(imageUrl);
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col md:flex-row">
            {/* 왼쪽: 이미지 섹션 */}
            <div className="flex-shrink-0 w-full md:w-1/3 p-4 bg-gray-900 rounded-lg mr-6 mb-6 md:mb-0">
                {persona.imageInfo && (
                    <div className="flex flex-col items-center">
                        <img
                            src={currentImage}
                            alt={persona.name}
                            className="w-full max-w-sm rounded-xl mb-4 object-contain border-2 border-gray-700"
                        />
                        <div className="flex flex-wrap justify-center gap-2">
                            <ImageToggleButton label="AC" imageUrl={persona.imageInfo.imageUrlAC} currentImageUrl={currentImage} onClick={handleImageChange} />
                            <ImageToggleButton label="A" imageUrl={persona.imageInfo.imageUrlA} currentImageUrl={currentImage} onClick={handleImageChange} />
                            <ImageToggleButton label="B" imageUrl={persona.imageInfo.imageUrlB} currentImageUrl={currentImage} onClick={handleImageChange} />
                            <ImageToggleButton label="BC" imageUrl={persona.imageInfo.imageUrlBC} currentImageUrl={currentImage} onClick={handleImageChange} />
                            <ImageToggleButton label="SD" imageUrl={persona.imageInfo.imageUrlSD} currentImageUrl={currentImage} onClick={handleImageChange} />
                        </div>
                    </div>
                )}
                <div className="mt-6 text-center">
                    <img src={getGradeImage(persona.grade)} alt={persona.grade} className="w-8 h-12 mx-auto mb-2" />
                    <h2 className="text-3xl font-bold">{persona.name}</h2>
                    <p className="text-gray-400">소속 {persona.affiliation?.name}</p>
                </div>
            </div>

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
                            {persona.skills?.map(skill => (
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
        </div>
    );
}