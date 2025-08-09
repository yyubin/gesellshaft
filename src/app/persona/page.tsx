"use client";

import {useState, useEffect} from 'react';
import Layout from "@/components/Layout";
import { getPersonasByPrisonerId } from "@/services/personaService";
import { PersonaDto } from '@/types/persona';
import PersonaDetail from '@/components/persona/PersonaDetail';

const prisoners = [
    { id: 1, name: '이상', name_en: 'Yisang', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_1.webp' },
    { id: 2, name: '파우스트', name_en: 'Faust', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_2.webp' },
    { id: 3, name: '돈키호테', name_en: 'DonQuixote', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_3.webp' },
    { id: 4, name: '료슈', name_en: 'RyoShu', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_4.webp' },
    { id: 5, name: '뫼르소', name_en: 'Meursault', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_5.webp' },
    { id: 6, name: '홍루', name_en: 'Hongru', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_6.webp' },
    { id: 7, name: '히스클리프', name_en: 'Heathcliff', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_7.webp' },
    { id: 8, name: '이스마엘', name_en: 'Ishmael', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_8.webp' },
    { id: 9, name: '로쟈', name_en: 'Rodya', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_9.webp' },
    { id: 10, name: '싱클레어', name_en: 'Sinclair', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_10.webp' },
    { id: 11, name: '오티스', name_en: 'Outis', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_11.webp' },
    { id: 12, name: '그레고르', name_en: 'Gregor', imageUrl: 'https://gesellschaft.s3.ap-northeast-2.amazonaws.com/icon/character/cid_12.webp' },
];

export default function PersonaPage() {
    const [selectedPrisonerId, setSelectedPrisonerId] = useState<number | null>(1);
    const [personas, setPersonas] = useState<PersonaDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPersona, setSelectedPersona] = useState<PersonaDto | null>(null);

    useEffect(() => {
        if (selectedPrisonerId) {
            const fetchPersonas = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await getPersonasByPrisonerId(selectedPrisonerId);
                    setPersonas(data);
                    if (data.length > 0) {
                        // 기본 인격 또는 첫 번째 인격을 기본 선택
                        const defaultPersona = data[0];
                        setSelectedPersona(defaultPersona);
                    } else {
                        setSelectedPersona(null);
                    }
                } catch (err) {
                    setError('인격 정보를 불러오는 데 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            };
            fetchPersonas();
        }
    }, [selectedPrisonerId]);

    // 로딩, 에러, 데이터 없음을 표시하는 UI 컴포넌트
    const StatusDisplay = () => {
        if (loading) return <p className="text-center text-blue-600 dark:text-blue-400">데이터를 불러오는 중...</p>;
        if (error) return <p className="text-center text-red-600 dark:text-red-400">에러: {error}</p>;
        if (personas.length === 0) return <p className="text-center text-gray-500 dark:text-gray-400">선택된 수감자의 인격 정보가 없습니다.</p>;
        return null;
    }

    return (
        <Layout>
            <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

                {/* --- 데스크톱용 사이드바 --- */}
                <aside className="hidden md:block w-1/4 lg:w-1/5 p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">수감자 목록</h2>
                    <div className="space-y-2">
                        {prisoners.map(prisoner => (
                            <div
                                key={prisoner.id}
                                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors duration-200 
                                            ${selectedPrisonerId === prisoner.id ? 'bg-gray-200 dark:bg-gray-700 ring-2 ring-blue-500' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                onClick={() => setSelectedPrisonerId(prisoner.id)}
                            >
                                <img
                                    src={prisoner.imageUrl}
                                    alt={prisoner.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <span className="font-semibold text-lg">{prisoner.name}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                <div className="flex-1 flex flex-col">
                    {/* --- 모바일용 상단 수감자 목록 --- */}
                    <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-3">수감자</h2>
                        <div className="flex overflow-x-auto space-x-4 pb-2">
                            {prisoners.map(prisoner => (
                                <div key={prisoner.id} className="flex-shrink-0" onClick={() => setSelectedPrisonerId(prisoner.id)}>
                                    <img
                                        src={prisoner.imageUrl}
                                        alt={prisoner.name}
                                        className={`w-16 h-16 rounded-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105
                                                    ${selectedPrisonerId === prisoner.id ? 'ring-4 ring-blue-500' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- 메인 콘텐츠 --- */}
                    <main className="flex-1 p-4 md:p-8">
                        <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl min-h-[500px]">
                            {loading || error || personas.length === 0 ? (
                                <div className="flex justify-center items-center h-full min-h-[400px]">
                                    <StatusDisplay />
                                </div>
                            ) : (
                                <>
                                    {/* 인격 목록 */}
                                    <div className="flex overflow-x-auto space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
                                        {personas.map(persona => (
                                            <div
                                                key={persona.id}
                                                className={`relative flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-200
                                                            ${selectedPersona?.id === persona.id ? 'ring-4 ring-blue-500 scale-105' : 'hover:scale-105'}`}
                                                onClick={() => setSelectedPersona(persona)}
                                            >
                                                <img src={persona.images?.find(i => i.type === 'AC')?.url || ''} alt={persona.name} className="w-full h-full object-cover" />
                                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-semibold">
                                                    {persona.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 인격 상세 정보 컴포넌트 */}
                                    {selectedPersona && <PersonaDetail persona={selectedPersona} />}
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
}