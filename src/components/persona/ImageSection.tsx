'use client';

import React, {useMemo, useState} from 'react';
import { Modal, Image, Box, Group, Text } from '@mantine/core';
import { PersonaDto, GradeType } from '@/types/persona';
import { gradeImages } from '@/utils/imageUtils';
import StatsSection from './StatsSection';

interface ImageToggleButtonProps {
    label: string;
    imageUrl: string | null;
    currentImageUrl: string | undefined;
    onClick: (url: string) => void;
}

interface ImageSectionProps {
    persona: PersonaDto;
    level: number; // ADDED
    setLevel: (level: number) => void; // ADDED
}

const ImageToggleButton: React.FC<ImageToggleButtonProps> = ({
                                                                 label,
                                                                 imageUrl,
                                                                 currentImageUrl,
                                                                 onClick,
                                                             }) => {
    const disabled = !imageUrl;

    return (
        <button
            onClick={() => imageUrl && onClick(imageUrl)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                currentImageUrl === imageUrl
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

interface ImageSectionProps {
    persona: PersonaDto;
}

const ImageSection: React.FC<ImageSectionProps> = ({ persona, level, setLevel }) => {
    const sortedImages = useMemo(() => {
        const arr = [...(persona.images || [])];
        arr.sort((a, b) => {
            if (a.primary && !b.primary) return -1;
            if (!a.primary && b.primary) return 1;
            if (a.priority !== b.priority) return a.priority - b.priority;
            return a.type.localeCompare(b.type);
        });
        return arr;
    }, [persona.images]);

    const defaultImage = useMemo(() => {
        const primary = sortedImages.find(i => i.primary)?.url;
        if (primary) return primary;
        const ac = sortedImages.find(i => i.type === 'AC')?.url;
        if (ac) return ac;
        return sortedImages[0]?.url;
    }, [sortedImages]);

    const [currentImage, setCurrentImage] = useState<string | undefined>(defaultImage);
    const [opened, setOpened] = useState(false);

    const gradeSrc = (() => {
        switch (persona.grade) {
            case 'ONE':
                return gradeImages.grade_1;
            case 'TWO':
                return gradeImages.grade_2;
            case 'THREE':
                return gradeImages.grade_3;
            default:
                return null;
        }
    })();

    return (
        <div className="flex-shrink-0 w-full md:w-1/3 p-4 bg-gray-300 dark:bg-gray-900 rounded-lg mr-6 mb-6 md:mb-0">
            {sortedImages.length > 0 && (
                <div className="flex flex-col items-center">
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt={persona.name}
                            className="w-full max-w-sm rounded-xl mb-4 object-contain border-2 border-gray-700 cursor-pointer"
                            onClick={() => setOpened(true)}
                        />
                    )}
                    <div className="flex flex-wrap justify-center gap-2">
                        {sortedImages.map(img => (
                            <ImageToggleButton
                                key={`${img.type}-${img.priority}-${img.url}`}
                                label={img.type}
                                imageUrl={img.url}
                                currentImageUrl={currentImage}
                                onClick={setCurrentImage}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ─────────────── 인적 사항 ─────────────── */}
            <div className="mt-6 text-center">
                {gradeSrc && <img src={gradeSrc} alt={persona.grade} className="w-8 h-12 mx-auto mb-2" />}
                <h2 className="text-3xl font-bold">{persona.name}</h2>
                <p className="dark:text-gray-400">소속 {persona.affiliation?.name}</p>
            </div>

            <StatsSection persona={persona} level={level} setLevel={setLevel} />

            {/* ─────────────── 확대 모달 ─────────────── */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                withCloseButton={true}
                closeButtonProps={{
                    size: 'md',
                    style: { color: '#fff', opacity: 0.9 },
                }}
                fullScreen
                padding={0}
                size="auto"
                centered
                overlayProps={{ color: '#000', opacity: 0.75, blur: 1 }}
            >
                {currentImage && (
                    <Box
                        className="w-full h-full flex items-center justify-center bg-black"
                        onClick={() => setOpened(false)}
                    >
                        {/* 90 vh 제한으로 과도한 확대 방지 */}
                        <Image
                            src={currentImage}
                            alt={persona.name}
                            fit="contain"
                            maw="90vw"
                            mih="0"
                            style={{ maxHeight: '90vh' }}
                        />
                    </Box>
                )}
            </Modal>
        </div>
    );
};

export default ImageSection;
