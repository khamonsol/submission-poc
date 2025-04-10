import { atom } from "jotai";

export const isoOptionsAtom = atom(["CAISO", "ERCOT", "MISO", "PJMISO", "NEISO", "NYISO"]);
export const selectedIsoAtom = atom('');
