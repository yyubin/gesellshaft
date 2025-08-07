'use client';

import React from 'react';
import {
    attackTypeImages,
    defenseTypeImages,
    skillAttributeImages,
    coinImages,
} from '@/utils/imageUtils';

import {
    SkillDto,
    SkillStatsBySyncDto,
    SyncLevel,
    SkillEffectDto,
    SkillCoinEffectDto,
} from '@/types/persona';

import SkillDescription from '@/components/persona/SkillDescription';

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

    if (!stats) {
        return null;
    }

    // DTO에서 originalText만 추출
    const skillEffectTexts = stats.skillEffects?.map(effect => effect.originalText);
    const skillCoinEffectTexts = stats.skillCoinEffects?.map(effect => effect.originalText);

    /** ────────── 렌더링 ────────── */
    return (
        <div className="relative flex items-center p-3 bg-gray-700 rounded-lg w-[540px]">
            {/* ------- 스킬 아이콘 영역 ------- */}
            <div className="relative shrink-0">
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
                        위력&nbsp;{stats.basePower}+{stats.coinPower} &nbsp;|&nbsp; 최대 위력&nbsp;{stats.coinCount * stats.coinPower + stats.basePower}
                    </p>
                )}
            </div>
            <div className="ml-6 flex flex-col gap-2">
                <SkillDescription texts={skillEffectTexts} title="스킬 효과" />
                <SkillDescription texts={skillCoinEffectTexts} title="코인 효과" />
            </div>
        </div>
    );
};

export default SkillCard;
