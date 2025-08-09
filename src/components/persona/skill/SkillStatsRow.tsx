'use client';

import { SkillStatsBySyncDto } from '@/types/persona';

type Props = {
    stats: SkillStatsBySyncDto;
};

export default function SkillStatsRow({ stats }: Props) {
    const maxPower = stats.basePower + stats.coinPower * stats.coinCount;
    return (
        <p className="text-sm dark:text-gray-300 mt-1">
            위력 {stats.basePower}+{stats.coinPower} &nbsp;|&nbsp; 최대 위력 {maxPower}
        </p>
    );
}
