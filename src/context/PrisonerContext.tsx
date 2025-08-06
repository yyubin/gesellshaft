"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PrisonerContextType {
    selectedPrisonerId: number | null;
    setSelectedPrisonerId: React.Dispatch<React.SetStateAction<number | null>>;
}

const PrisonerContext = createContext<PrisonerContextType>({
    selectedPrisonerId: null,
    setSelectedPrisonerId: () => {}
});

interface PrisonerProviderProps {
    children: ReactNode;
}

export const PrisonerProvider = ({ children }: PrisonerProviderProps) => {
    const [selectedPrisonerId, setSelectedPrisonerId] = useState<number | null>(1);

    const value = {
        selectedPrisonerId,
        setSelectedPrisonerId,
    };

    return (
        <PrisonerContext.Provider value={value}>
            {children}
        </PrisonerContext.Provider>
    );
};


export const usePrisoner = () => {
    const context = useContext(PrisonerContext);
    if (!context) {
        throw new Error('usePrisoner must be used within a PrisonerProvider');
    }
    return context;
};