import { BiBook, BiCodeAlt, BiMoviePlay, BiMusic } from "react-icons/bi";
import { FaGamepad, } from "react-icons/fa";
import { IoMdFootball } from "react-icons/io";
import { GiKatana } from "react-icons/gi";

export const sidebar_themes = [
    {
        label: 'Gaming',
        href: '/communities/gaming',
        Icon: FaGamepad
    },
    {
        label: 'Movies',
        href: '/communities/movies',
        Icon: BiMoviePlay
    },
    {
        label: 'IT & Dev',
        href: '/communities/dev',
        Icon: BiCodeAlt
    },
    {
        label: 'Sports',
        href: '/communities/sports',
        Icon: IoMdFootball
    },
    {
        label: 'Music',
        href: '/communities/music',
        Icon: BiMusic
    },
    {
        label: 'Anime & Manga',
        href: '/communities/anime',
        Icon: GiKatana 
    },
    {
        label: 'Books',
        href: '/communities/books',
        Icon: BiBook 
    },
]

export const post_themes = [
    {
        label: 'Gaming',
        value: 'gaming'
    },
    {
        label: 'Movies',
        value: 'movies'
    },
    {
        label: 'IT & Dev',
        value: 'dev'
    },
    {
        label: 'Sports',
        value: 'sports'
    },
    {
        label: 'Music',
        value: 'music'
    },
    {
        label: 'Anime & Manga',
        value: 'animeandmanga'
    },
    {
        label: 'Books',
        value: 'books'
    },
]