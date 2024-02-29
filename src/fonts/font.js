import { Roboto } from "next/font/google";
import { Oswald } from "next/font/google";
import { Kdam_Thmor_Pro } from "next/font/google";

export const robotoFont = Roboto({
    weight: ['400','700'],
    style: ['normal','italic'],
    subsets:['latin'],
    display:'swap',
})

export const oswaldFont = Oswald({
    weight: ['400'],
    subsets:['latin'],
    display:'swap',
})

export const Kdam_Thmor_ProFont  = Kdam_Thmor_Pro({
    weight: ['400'],
    subsets:['latin'],
    display:'swap',
})