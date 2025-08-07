"use client";

import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { getPersonasByPrisonerId } from "@/services/personaService";
import { PersonaDto } from '@/types/persona';
import PersonaDetail from '@/components/persona/PersonaDetail';

const prisoners = [
    { id: 1, name: '이상', name_en: 'Yisang', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/1.png' },
    { id: 2, name: '파우스트', name_en: 'Faust', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/2.png' },
    { id: 3, name: '돈키호테', name_en: 'DonQuixote', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/3.png' },
    { id: 4, name: '료슈', name_en: 'RyoShu', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/4.png' },
    { id: 5, name: '뫼르소', name_en: 'Meursault', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/5.png' },
    { id: 6, name: '홍루', name_en: 'Hongru', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/6.png' },
    { id: 7, name: '히스클리프', name_en: 'Heathcliff', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/7.png' },
    { id: 8, name: '이스마엘', name_en: 'Ishmael', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/8.png' },
    { id: 9, name: '로쟈', name_en: 'Rodya', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/9.png' },
    { id: 10, name: '싱클레어', name_en: 'Sinclair', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/10.png' },
    { id: 11, name: '오티스', name_en: 'Outis', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/11.png' },
    { id: 12, name: '그레고르', name_en: 'Gregor', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/character/gallery/title/12.png' },
];

export default function PersonaPage() {
    const [selectedPrisonerId, setSelectedPrisonerId] = useState<number | null>(1);
    const [personas, setPersonas] = useState<PersonaDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPersona, setSelectedPersona] = useState<PersonaDto | null>(null);

    const selectedPrisoner = prisoners.find(p => p.id === selectedPrisonerId);

    useEffect(() => {
        if (selectedPrisonerId) {
            console.log("Fetching personas for prisoner ID:", selectedPrisonerId);
            const fetchPersonas = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await getPersonasByPrisonerId(selectedPrisonerId);
                    setPersonas(data);
                    if (data.length > 0) {
                        setSelectedPersona(data[0]);
                    } else {
                        setSelectedPersona(null);
                    }
                } catch (err) {
                    setError('인격 정보를 불러오는 데 실패했습니다.');
                    console.error("Error fetching personas:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchPersonas();
        }
    }, [selectedPrisonerId]);

    return (
        <Layout>
            <div className="flex w-full min-h-screen bg-gray-900 text-white">
                <aside className="w-1/4 p-4 border-r border-gray-700 bg-gray-800 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">수감자 목록</h2>
                    <div className="space-y-2">
                        {prisoners.map(prisoner => (
                            <div
                                key={prisoner.id}
                                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors duration-200 
                                            ${selectedPrisonerId === prisoner.id ? 'bg-gray-700 ring-2 ring-blue-500' : 'hover:bg-gray-700'}`}
                                onClick={() => setSelectedPrisonerId(prisoner.id)}
                            >
                                <img
                                    src={prisoner.imageUrl}
                                    alt={prisoner.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <span className="font-medium">{prisoner.name}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 p-8 bg-gray-900">
                    <h1 className="text-4xl font-bold mb-8">인격 갤러리</h1>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-xl min-h-[500px]">
                        {loading && <p className="text-center text-blue-400">데이터를 불러오는 중...</p>}
                        {error && <p className="text-center text-red-400">에러: {error}</p>}

                        {!loading && !error && (
                            <>
                                {/* 인격 목록 */}
                                <div className="flex overflow-x-auto space-x-4 pb-4 border-b border-gray-700 mb-6">
                                    {personas.length > 0 ? (
                                        personas.map(persona => (
                                            <div
                                                key={persona.id}
                                                className={`relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden shadow-md cursor-pointer
                                                            ${selectedPersona?.id === persona.id ? 'ring-4 ring-blue-500' : ''}`}
                                                onClick={() => setSelectedPersona(persona)}
                                            >
                                                <img src={persona.imageInfo.imageUrlA} alt={persona.name} className="w-full h-full object-cover" />
                                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white text-xs font-semibold">
                                                    {persona.name}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">선택된 수감자의 인격 정보가 없습니다.</p>
                                    )}
                                </div>

                                {/* 인격 상세 정보 컴포넌트 */}
                                {selectedPersona && <PersonaDetail persona={selectedPersona} />}
                            </>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
