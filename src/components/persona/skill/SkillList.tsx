'use client';

import SkillCard from './SkillCard';
import { SkillDto, SyncLevel } from '@/types/persona';

type Props = {
    skills?: SkillDto[];
    syncLevel: SyncLevel;
};

export default function SkillList({ skills, syncLevel }: Props) {
    if (!skills || skills.length === 0) {
        return <p className="text-gray-400">스킬 정보가 없습니다.</p>;
    }
    return (
        <div className="space-y-6">
            {skills.map(s => (
                <SkillCard key={s.id} skill={s} syncLevel={syncLevel} />
            ))}
        </div>
    );
}
