'use client';

import { coinImages } from '@/utils/imageUtils';

type Props = {
    image?: string;
    coinCount?: number;
    name: string;
};

export default function SkillIcon({ image, coinCount = 0, name }: Props) {
    return (
        <div className="relative shrink-0">
            {image && (
                <img
                    src={image}
                    alt={name}
                    className="w-[64px] h-[64px] object-cover p-1"
                />
            )}
            {coinCount > 0 && (
                <div className="absolute top-0 right-0 flex gap-[1px] p-[2px]">
                    {Array.from({ length: coinCount }).map((_, i) => (
                        <img key={i} src={coinImages.coin} className="w-4 h-4" alt="coin" />
                    ))}
                </div>
            )}
        </div>
    );
}
