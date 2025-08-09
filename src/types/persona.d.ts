export type GradeType = 'ONE' | 'TWO' | 'THREE';
export type ResistanceType = 'NORMAL' | 'WEAK' | 'FATAL' | 'RESIST';
export type SeasonType = 'NORMAL' | 'SEASON_NORMAL' | 'SEASON_EVENT' | 'WALPURGISNACHT';
export type MainAffiliationCategory = 'ASSOCIATION' | 'FINGER' | 'NONE';
export type SkillAttributeType = 'WRATH' | 'LUST' | 'SLOTH' | 'GREED' | 'PRIDE' | 'ENVY' | 'GLOOM' | 'NONE';
export type InvocationType = 'HOLD' | 'RESONATE';
export type SkillCategoryType = 'ATTACK' | 'DEFENSE';
export type AttackType = 'SLASH' | 'PIERCE' | 'BLUNT';
export type DefenseType = 'COUNTER' | 'EVADE' | 'GUARD';
export type SyncLevel = 'SYNC_3' | 'SYNC_4';
export type SkillKeywordType = 'BURN' | 'BLEED' | 'TREMOR' | 'RUPTURE' | 'SINKING' | 'BREATH' | 'CHARGE' | 'NONE';
export type PersonaImageType = 'A' | 'B' | 'AC' | 'BC' | 'SD';
export type PassiveKind = 'NORMAL' | 'SUPPORT';

export interface PrisonerDto {
    id: number;
    name: string;
    name_en: string;
}

export interface ResistanceInfoDto {
    slashResistance: ResistanceType;
    penetrationResistance: ResistanceType;
    bluntResistance: ResistanceType;
}

export interface SpeedInfoDto {
    minSpeed: number;
    maxSpeed: number;
}

export interface PersonaImageDto {
    type: PersonaImageType;
    url: string;
    priority: number;
    primary: boolean;
}

export interface HealthInfoDto {
    baseHealth: number;
    growthRate: number;
    disturbed1: number;
    disturbed2: number;
    disturbed3: number;
}

export interface SeasonInfoDto {
    seasonType: SeasonType;
    number: number;
}

export interface SubAffiliationDto {
    id: number;
    name: string;
    mainCategory: MainAffiliationCategory;
}

export interface PassiveActivationRequirementDto {
    attribute: SkillAttributeType;
    invocationType: InvocationType;
    count: number;
}

export interface PersonaPassiveDto {
    id: number;
    kind: PassiveKind;
    name: string;
    activation?: PassiveActivationRequirementDto | null;
    originalText?: string | null;
    syncLevel?: SyncLevel | 'SYNC_3';
}

export interface SkillEffectDto {
    originalText: string;
}

export interface SkillCoinEffectDto {
    originalText: string;
}

export interface SkillStatsBySyncDto {
    syncLevel: SyncLevel;
    basePower: number;
    coinPower: number;
    coinCount: number;
    weight: number;
    level: number;
    skillEffects: SkillEffectDto[];
    skillCoinEffects: SkillCoinEffectDto[];
}

export interface SkillDto {
    id: number;
    name: string;
    skillAttribute: SkillAttributeType;
    skillCategory: SkillCategoryType;
    skillQuantity: number;
    attackType: AttackType;
    defenseType: DefenseType;
    personaId: number;
    skillImage: string;
    statsBySync: SkillStatsBySyncDto[];
    keyword: SkillKeywordType;
}

export interface PersonaDto {
    id: number;
    name: string;
    name_en: string;
    prisoner: PrisonerDto;
    grade: GradeType;
    resistanceInfo: ResistanceInfoDto;
    speedInfo: SpeedInfoDto;
    healthInfo: HealthInfoDto;
    seasonInfo: SeasonInfoDto;
    defenseLevel: number;
    mentality: number;
    affiliation: SubAffiliationDto;
    passives: PersonaPassiveDto[];
    images: PersonaImageDto[];
    skills: SkillDto[];
    releaseDate: string;
}