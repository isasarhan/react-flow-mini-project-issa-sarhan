// store.ts
import { create } from "zustand";
import { createNodeSlice } from "./slices/node-slice";

export const useAppStore = create((set, get) => ({
    ...createNodeSlice(set, get),
}));