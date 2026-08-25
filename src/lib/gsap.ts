"use client";

/**
 * Single place where GSAP plugins get registered.
 *
 * `useGSAP` is registered as a plugin so GSAP knows to route its
 * context cleanup through React — that is what stops animations from
 * stacking up across Fast Refresh and route changes.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Shared easing so every reveal on the page shares one personality. */
export const EASE = "expo.out";

export { gsap, ScrollTrigger, useGSAP };
