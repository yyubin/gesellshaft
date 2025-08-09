'use client';

import { SkillDto, SyncLevel, SkillStatsBySyncDto } from '@/types/persona';
import SkillIcon from './SkillIcon';
import SkillHeader from './SkillHeader';
import SkillStatsRow from './SkillStatsRow';
import SkillEffects from './SkillEffects';

type Props = {
    skill: SkillDto;
    syncLevel: SyncLevel;
};

export default function SkillCard({ skill, syncLevel }: Props) {
    const stats = skill.statsBySync.find(s => s.syncLevel === syncLevel) as SkillStatsBySyncDto | undefined;
    if (!stats) return null;

    return (
        <div className="relative flex items-center p-3 bg-gray-700 rounded-lg">
            <SkillIcon image={skill.skillImage} coinCount={stats.coinCount} name={skill.name} />
            <div className="ml-4 flex flex-col">
                <SkillHeader skill={skill} />
                <SkillStatsRow stats={stats} />
            </div>
            <SkillEffects skillEffects={stats.skillEffects} coinEffects={stats.skillCoinEffects} />
        </div>
    );
}
