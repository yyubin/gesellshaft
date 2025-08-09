'use client';

type Props = {
    iconSrc: string;
    value: number | string;
    alt: string;
    subLabel?: string;
};

export default function StatusItem({ iconSrc, value, alt, subLabel }: Props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={iconSrc}
                alt={alt}
                width={20}
                height={20}
                className="block"
            />
            <div className="text-gray-100 text-medium font-semibold mt-1">{value}</div>
            {subLabel && <div className="text-gray-400 text-xs mt-0.5">{subLabel}</div>}
        </div>
    );
}