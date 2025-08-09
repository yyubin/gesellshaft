'use client';

import { attackTypeImages, defenseTypeImages, skillAttributeImages } from '@/utils/imageUtils';
import { SkillDto } from '@/types/persona';

type Props = {
    skill: SkillDto;
};

export default function SkillHeader({ skill }: Props) {
    const attributeImg = skillAttributeImages[skill.skillAttribute] || skillAttributeImages.NONE;
    const typeImg =
        skill.skillCategory === 'ATTACK'
            ? attackTypeImages[skill.attackType]
            : defenseTypeImages[skill.defenseType];

    return (
        <div className="flex items-center gap-1">
            <h4 className="text-base font-bold text-white">{skill.name}</h4>
            <img src={attributeImg} className="w-5 h-5" alt={skill.skillAttribute} />
            {typeImg && (
                <img
                    src={typeImg}
                    className="w-5 h-5"
                    alt={(skill.attackType ?? skill.defenseType) as string}
                />
            )}
        </div>
    );
}
