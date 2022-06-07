export interface IManGIF {
    name: string;
    src: string;
    length: number;
    next: string[];
    looping: boolean;
    isSpeaking: boolean;
}

export const manGIFs = [
    {
        name: "idle",
        src: "/GIFs/00.gif",
        length: 625,
        next: ["idle_in"],
        looping: false,
        isSpeaking: false
    },
    {
        name: "idle_in",
        src: "/GIFs/01.gif",
        length: 1375,
        next: ["idle_headIn", "headScratch_in", "lipSyncIdle_in", "idle"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "idle_headIn",
        src: "/GIFs/02.gif",
        length: 875,
        next: ["idle_head"],
        looping: false,
        isSpeaking: false
    },
    {
        name: "idle_head",
        src: "/GIFs/03.gif",
        length: 1750,
        next: ["idle_headOut"],
        looping: true, 
        isSpeaking: false
    },
    {
        name: "idle_headOut",
        src: "/GIFs/04.gif",
        length: 458.333,
        next: ["headScratch_in", "lipSyncIdle_in", "idle"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "headScratch_in",
        src: "/GIFs/05.gif",
        length: 250,
        next: ["headScratch"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "headScratch",
        src: "/GIFs/06.gif",
        length: 416.666,
        next: ["headScratch_out"],
        looping: true,
        isSpeaking: false

    },
    {
        name: "headScratch_out",
        src: "/GIFs/07.gif",
        length: 250,
        next: ["idle_headIn", "idle"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "fly",
        src: "/GIFs/08.gif",
        length: 500,
        next: ["fly_in"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "fly_in",
        src: "/GIFs/09.gif",
        length: 625,
        next: ["fly_out"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "fly_out",
        src: "/GIFs/16.gif",
        length: 1666.666,
        next: ["anger_in"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "anger_in",
        src: "/GIFs/17.gif",
        length: 1166.666,
        next: ["anger_out"],
        looping: false,
        isSpeaking: true
    },
    {
        name: "anger_out",
        src: "/GIFs/18.gif",
        length: 166.666,
        next: ["idle_in"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "lipSyncIdle_in",
        src: "/GIFs/19.gif",
        length: 833.333,
        next: ["lipSyncIdle"],
        looping: false,
        isSpeaking: false

    },
    {
        name: "lipSyncIdle",
        src: "/GIFs/20.gif",
        length: 1875,
        next: ["lipSyncIdle_out"],
        looping: false,
        isSpeaking: true,
    },
    {
        name: "lipSyncIdle_out",
        src: "/GIFs/21.gif",
        length: 333.333,
        next: ["idle"],
        looping: false,
        isSpeaking: false

    },
];

export interface IFlyGIF {
    name: string;
    src: string;
    length: number;
}

export const flyGIFs = [
    {
        name: "fly_1",
        src: "/GIFs/10.gif",
        length: 1333.333,
    },
    {
        name: "fly_2",
        src: "/GIFs/11.gif",
        length: 1166.666,
    },
    {
        name: "fly_3",
        src: "/GIFs/12.gif",
        length: 1125,
    },
    {
        name: "fly_4",
        src: "/GIFs/13.gif",
        length: 1333.333,
    },
    {
        name: "fly_5",
        src: "/GIFs/14.gif",
        length: 1166.666,
    },
    {
        name: "fly_6",
        src: "/GIFs/15.gif",
        length: 1125,
    }
];

export const angerGIFs = [
    
    ["/GIFs/anger_00.gif"],
    ["/GIFs/anger_01.gif"],
    ["/GIFs/anger_02.gif"],
    ["/GIFs/anger_03.gif"],
    ["/GIFs/anger_04.gif"],
    ["/GIFs/anger_05.gif"],
    ["/GIFs/anger_06.gif"],
    ["/GIFs/anger_07.gif"],
    ["/GIFs/anger_08.gif"],
    ["/GIFs/anger_09a.gif", "/GIFs/anger_09b.gif"],
    ["/GIFs/anger_10.gif"],
    ["/GIFs/anger_11.gif"],
    ["/GIFs/anger_12.gif"],
    ["/GIFs/anger_13.gif"],
    ["/GIFs/anger_14.gif"],
    ["/GIFs/anger_15.gif"],
    
];

export const blurbGIFs = [

    ["/GIFs/blurb_00a.gif", "/GIFs/blurb_00b.gif"],
    ["/GIFs/blurb_01a.gif", "/GIFs/blurb_01b.gif"],
    ["/GIFs/blurb_02a.gif", "/GIFs/blurb_02b.gif"],
    ["/GIFs/blurb_03a.gif", "/GIFs/blurb_03b.gif"],
    ["/GIFs/blurb_04.gif"],
    ["/GIFs/blurb_05a.gif", "/GIFs/blurb_05b.gif", "/GIFs/blurb_05c.gif"],
    ["/GIFs/blurb_06a.gif", "/GIFs/blurb_06b.gif"],
    ["/GIFs/blurb_07.gif"],
    ["/GIFs/blurb_08a.gif", "/GIFs/blurb_08b.gif"],
    ["/GIFs/blurb_09.gif"],
    ["/GIFs/blurb_10a.gif", "/GIFs/blurb_10b.gif"],
    ["/GIFs/blurb_11.gif"],
    ["/GIFs/blurb_12a.gif", "/GIFs/blurb_12b.gif"],
    ["/GIFs/blurb_13a.gif", "/GIFs/blurb_13b.gif"],
    ["/GIFs/blurb_14a.gif", "/GIFs/blurb_14b.gif"],
    ["/GIFs/blurb_15.gif"],
    ["/GIFs/blurb_16a.gif", "/GIFs/blurb_16b.gif"],
    ["/GIFs/blurb_17a.gif", "/GIFs/blurb_17b.gif", "/GIFs/blurb_17c.gif"]

];

export const firstGIFs = [

  ["/GIFs/first_00.gif"],
  ["/GIFs/first_01.gif"],
  ["/GIFs/first_02.gif"],
  ["/GIFs/first_03.gif"],
    
];

export const introGIFs = [

    ["/GIFs/intro_00a.gif", "/GIFs/intro_00b.gif"],
    ["/GIFs/intro_01a.gif", "/GIFs/intro_01b.gif"],
    // ["/GIFs/intro_02.gif"],
    ["/GIFs/intro_03a.gif", "/GIFs/intro_03b.gif"],
    ["/GIFs/intro_04a.gif", "/GIFs/intro_04b.gif"],

];

