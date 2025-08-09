'use client';

import SkillDescription from '@/components/persona/SkillDescription';
import { SkillEffectDto, SkillCoinEffectDto } from '@/types/persona';

type Props = {
    skillEffects?: SkillEffectDto[];
    coinEffects?: SkillCoinEffectDto[];
};

export default function SkillEffects({ skillEffects, coinEffects }: Props) {
    const skillEffectTexts = skillEffects?.map(e => e.originalText) ?? [];
    const coinEffectTexts = coinEffects?.map(e => e.originalText) ?? [];
    return (
        <div className="ml-6 gap-2 flex flex-col">
            <SkillDescription texts={skillEffectTexts} title="스킬 효과" />
            <SkillDescription texts={coinEffectTexts} title="코인 효과" />
        </div>
    );
}
