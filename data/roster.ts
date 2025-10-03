import type { ReactNode } from 'react';
import { imageAssets } from './images';

export type ClassKey = 'crossfit' | 'bootcamp' | 'weightlifting' | 'hyrox' | 'threshold';
export type CoachKey = 'alex' | 'maria' | 'david' | 'emily' | 'frank' | 'chloe' | 'brian' | 'olivia' | 'marcus' | 'isabelle';

export interface Coach {
    id: CoachKey;
    name: string;
    specialtyKey: string;
    bioKey: string;
    image: string;
    avatarImage: string;
    classes: ClassKey[];
}

export interface ClassType {
    id: ClassKey;
    titleKey: string;
    descKey: string;
    image: string;
    coaches: CoachKey[];
}

export type ScheduleClassType = 'wod' | 'opengym' | 'community' | 'closed';

export interface ScheduleClassInfo {
  time: string;
  classId: ScheduleClassType;
  coachId: CoachKey | 'team' | null;
}

export const coachesData: Coach[] = [
  { id: 'alex', name: "Alex 'The Rep' Riley", specialtyKey: 'about.coach1Specialty', bioKey: 'about.coach1Bio', image: imageAssets.coachAlex, avatarImage: imageAssets.coachAvatarAlex, classes: ['crossfit', 'weightlifting'] },
  { id: 'maria', name: "Maria 'Cardio Queen' Sanchez", specialtyKey: 'about.coach2Specialty', bioKey: 'about.coach2Bio', image: imageAssets.coachMaria, avatarImage: imageAssets.coachAvatarMaria, classes: ['crossfit', 'bootcamp', 'threshold'] },
  { id: 'david', name: 'David "The Engine" Chen', specialtyKey: 'about.coach3Specialty', bioKey: 'about.coach3Bio', image: imageAssets.coachDavid, avatarImage: imageAssets.coachAvatarDavid, classes: ['hyrox', 'threshold'] },
  { id: 'emily', name: 'Emily "Guns" Johnson', specialtyKey: 'about.coach4Specialty', bioKey: 'about.coach4Bio', image: imageAssets.coachEmily, avatarImage: imageAssets.coachAvatarEmily, classes: ['bootcamp'] },
  { id: 'frank', name: 'Frank "The Tank" Kowalski', specialtyKey: 'about.coach5Specialty', bioKey: 'about.coach5Bio', image: imageAssets.coachFrank, avatarImage: imageAssets.coachAvatarFrank, classes: [] },
  { id: 'chloe', name: 'Chloe "Mobility" Kim', specialtyKey: 'about.coach6Specialty', bioKey: 'about.coach6Bio', image: imageAssets.coachChloe, avatarImage: imageAssets.coachAvatarChloe, classes: [] },
  { id: 'brian', name: 'Brian "Barbell" O\'Connell', specialtyKey: 'about.coach7Specialty', bioKey: 'about.coach7Bio', image: imageAssets.coachBrian, avatarImage: imageAssets.coachAvatarBrian, classes: ['crossfit', 'weightlifting'] },
  { id: 'olivia', name: 'Olivia "Pistol" Petrova', specialtyKey: 'about.coach8Specialty', bioKey: 'about.coach8Bio', image: imageAssets.coachOlivia, avatarImage: imageAssets.coachAvatarOlivia, classes: ['crossfit'] },
  { id: 'marcus', name: 'Marcus "Metcon" Washington', specialtyKey: 'about.coach9Specialty', bioKey: 'about.coach9Bio', image: imageAssets.coachMarcus, avatarImage: imageAssets.coachAvatarMarcus, classes: ['crossfit', 'hyrox'] },
  { id: 'isabelle', name: 'Isabelle "The Iron" Dubois', specialtyKey: 'about.coach10Specialty', bioKey: 'about.coach10Bio', image: imageAssets.coachIsabelle, avatarImage: imageAssets.coachAvatarIsabelle, classes: [] },
];

export const classesData: ClassType[] = [
    {
        id: 'crossfit',
        titleKey: 'classes.crossfit.title',
        descKey: 'classes.crossfit.desc',
        image: imageAssets.classCrossfit,
        coaches: ['alex', 'maria', 'brian', 'olivia', 'marcus']
    },
    {
        id: 'bootcamp',
        titleKey: 'classes.bootcamp.title',
        descKey: 'classes.bootcamp.desc',
        image: imageAssets.classBootcamp,
        coaches: ['maria', 'emily']
    },
    {
        id: 'weightlifting',
        titleKey: 'classes.weightlifting.title',
        descKey: 'classes.weightlifting.desc',
        image: imageAssets.classWeightlifting,
        coaches: ['alex', 'brian']
    },
    {
        id: 'hyrox',
        titleKey: 'classes.hyrox.title',
        descKey: 'classes.hyrox.desc',
        image: imageAssets.classHyrox,
        coaches: ['david', 'marcus']
    },
    {
        id: 'threshold',
        titleKey: 'classes.threshold.title',
        descKey: 'classes.threshold.desc',
        image: imageAssets.classThreshold,
        coaches: ['david', 'maria']
    }
];

export const classDetailsMap: Record<ScheduleClassType, { nameKey: string, descKey: string }> = {
  wod: { nameKey: 'schedule.classWod', descKey: 'schedule.classWodDesc' },
  opengym: { nameKey: 'schedule.classOpenGym', descKey: 'schedule.classOpenGymDesc' },
  community: { nameKey: 'schedule.classCommunityWod', descKey: 'schedule.classCommunityWodDesc' },
  closed: { nameKey: 'schedule.closed', descKey: 'schedule.closedDesc' }
};

export const scheduleData: { dayKey: string, classes: ScheduleClassInfo[] }[] = [
  {
    dayKey: 'schedule.dayMonday',
    classes: [
      { time: '06:00 - 07:00', classId: 'wod', coachId: 'alex' },
      { time: '07:00 - 08:00', classId: 'wod', coachId: 'alex' },
      { time: '12:00 - 13:00', classId: 'wod', coachId: 'maria' },
      { time: '16:30 - 17:30', classId: 'wod', coachId: 'maria' },
      { time: '17:30 - 18:30', classId: 'wod', coachId: 'maria' },
      { time: '18:30 - 19:30', classId: 'wod', coachId: 'alex' },
    ],
  },
  {
    dayKey: 'schedule.dayTuesday',
    classes: [
      { time: '06:00 - 07:00', classId: 'wod', coachId: 'brian' },
      { time: '07:00 - 08:00', classId: 'wod', coachId: 'brian' },
      { time: '12:00 - 13:00', classId: 'wod', coachId: 'olivia' },
      { time: '16:30 - 17:30', classId: 'wod', coachId: 'marcus' },
      { time: '17:30 - 18:30', classId: 'wod', coachId: 'marcus' },
      { time: '18:30 - 19:30', classId: 'wod', coachId: 'david' },
    ],
  },
  {
    dayKey: 'schedule.dayWednesday',
    classes: [
      { time: '06:00 - 07:00', classId: 'wod', coachId: 'alex' },
      { time: '07:00 - 08:00', classId: 'wod', coachId: 'alex' },
      { time: '12:00 - 13:00', classId: 'wod', coachId: 'maria' },
      { time: '16:30 - 17:30', classId: 'wod', coachId: 'emily' },
      { time: '17:30 - 18:30', classId: 'wod', coachId: 'emily' },
      { time: '18:30 - 19:30', classId: 'wod', coachId: 'brian' },
    ],
  },
  {
    dayKey: 'schedule.dayThursday',
    classes: [
      { time: '06:00 - 07:00', classId: 'wod', coachId: 'olivia' },
      { time: '07:00 - 08:00', classId: 'wod', coachId: 'olivia' },
      { time: '12:00 - 13:00', classId: 'wod', coachId: 'david' },
      { time: '16:30 - 17:30', classId: 'wod', coachId: 'marcus' },
      { time: '17:30 - 18:30', classId: 'wod', coachId: 'marcus' },
      { time: '18:30 - 19:30', classId: 'wod', coachId: 'alex' },
    ],
  },
  {
    dayKey: 'schedule.dayFriday',
    classes: [
      { time: '06:00 - 07:00', classId: 'wod', coachId: 'maria' },
      { time: '07:00 - 08:00', classId: 'wod', coachId: 'maria' },
      { time: '12:00 - 13:00', classId: 'wod', coachId: 'brian' },
      { time: '16:30 - 17:30', classId: 'wod', coachId: 'emily' },
      { time: '17:30 - 18:30', classId: 'wod', coachId: 'alex' },
    ],
  },
  {
    dayKey: 'schedule.daySaturday',
    classes: [
      { time: '09:00 - 10:00', classId: 'community', coachId: 'team' },
      { time: '10:00 - 11:30', classId: 'opengym', coachId: null },
    ],
  },
  {
    dayKey: 'schedule.daySunday',
    classes: [
      { time: '', classId: 'closed', coachId: null }
    ],
  },
];


export const getCoachById = (id: CoachKey): Coach | undefined => coachesData.find(c => c.id === id);
export const getClassById = (id: ClassKey): ClassType | undefined => classesData.find(c => c.id === id);