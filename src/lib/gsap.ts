import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** GSAP et son module de défilement, branchés une seule fois pour tout le site. */
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
