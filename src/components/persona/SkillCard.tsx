'use client';

import React from 'react';
import {
    attackTypeImages,
    defenseTypeImages,
    skillAttributeImages,
    coinImages,
    skillBorders
} from '@/utils/imageUtils';

import {
    SkillDto,
    SkillStatsBySyncDto,
    SyncLevel
} from '@/types/persona';

type Props = {
    skill: SkillDto;
    syncLevel: SyncLevel;
};

const SkillCard: React.FC<Props> = ({ skill, syncLevel }) => {
    const stats = skill.statsBySync.find(s => s.syncLevel === syncLevel) as SkillStatsBySyncDto | undefined;

    const attributeImg = skillAttributeImages[skill.skillAttribute] || skillAttributeImages.NONE;
    const typeImg =
        skill.skillCategory === 'ATTACK'
            ? attackTypeImages[skill.attackType]
            : defenseTypeImages[skill.defenseType];

    const borderKey = `${skill.skillAttribute.toLowerCase()}_${skill.skillQuantity}`;
    const borderImg = skillBorders[borderKey];

    /** ────────── 렌더링 ────────── */
    return (
        <div className="relative flex items-center p-3 bg-gray-700 rounded-lg w-[280px]">
            {/* ------- SVG 외곽선 ------- */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 100">
                <polyline points="170,50 490,50" stroke-width="5" stroke="#19839d" />
            </svg>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 100">
                <polyline points="20,120 450,120" stroke-width="5" stroke="#19839d" />
            </svg>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 100">
                <polyline points="450,120 520,0" stroke-width="5" stroke="#19839d" />
            </svg>

            {/* ------- 스킬 아이콘 영역 ------- */}
            <div className="relative shrink-0 pb-4">
                {/* 테두리 */}
                {borderImg && (
                    <img src={borderImg} alt="border" className="absolute inset-0 w-[64px] h-[64px]" />
                )}
                {/* 스킬 이미지 */}
                {stats?.skillImage && (
                    <img
                        src={stats.skillImage}
                        alt={skill.name}
                        className="w-[64px] h-[64px] object-cover p-1"
                    />
                )}
                {/* 코인 오버레이 */}
                {stats?.coinCount && stats.coinCount > 0 && (
                    <div className="absolute top-0 right-0 flex gap-[1px] p-[2px]">
                        {Array.from({ length: stats.coinCount }).map((_, i) => (
                            <img key={i} src={coinImages.coin} className="w-4 h-4" alt="coin" />
                        ))}
                    </div>
                )}
            </div>

            {/* ------- 텍스트 & 아이콘 ------- */}
            <div className="ml-4 flex flex-col">
                <div className="flex items-center gap-1">
                    <h4 className="text-base font-bold text-white">{skill.name}</h4>
                    {/* 속성 아이콘 */}
                    <img src={attributeImg} className="w-5 h-5" alt={skill.skillAttribute} />
                    {/* 타입 아이콘 */}
                    {typeImg && <img src={typeImg} className="w-5 h-5" alt={skill.attackType ?? skill.defenseType} />}
                </div>

                {stats && (
                    <p className="text-sm text-gray-300 mt-1">
                        위력&nbsp;{stats.basePower}+{stats.coinPower} &nbsp;|&nbsp; 코인&nbsp;{stats.coinCount}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SkillCard;
