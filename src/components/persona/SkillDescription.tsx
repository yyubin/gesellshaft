import React from 'react';

type Props = {
    texts: string[];
    title: string;
};

const SkillDescription: React.FC<Props> = ({ texts, title }) => {
    if (!texts || texts.length === 0) {
        return null;
    }

    const renderTextWithHighlights = (text: string) => {
        const parts = text.split(/(\[.*?])/g);

        return parts.map((part, index) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                return (
                    <span key={index} className="text-red-700 font-bold">
                        {part}
                    </span>
                );
            } else {
                // 일반 텍스트는 기존 색상으로 렌더링
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <div className="p-3 dark:bg-gray-800 rounded-lg">
            <h5 className="text-sm font-semibold dark:text-gray-200">{title}</h5>
            <ul className="list-disc list-inside mt-1 space-y-1 text-sm dark:text-gray-400">
                {texts.map((text, index) => (
                    <li key={index}>{renderTextWithHighlights(text)}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillDescription;