"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  manGIFs,
  firstGIFs,
  introGIFs,
  IManGIF,
  blurbGIFs,
  IFlyGIF,
  flyGIFs,
  angerGIFs,
} from "../public/gifData/gifData";

interface Props {
  loading: boolean;
}

type Mode = "intro" | "idle" | "fly";

const SPEAK_LENGTH = 3000; // ms per text frame

// ----------------------- Helpers (module scope) -----------------------

function byName(name: string): IManGIF {
  const g = manGIFs.find(function (m) {
    return m.name === name;
  });
  if (!g) throw new Error("GIF not found: " + name);
  return g;
}

function preload(srcs: string[]) {
  for (var i = 0; i < srcs.length; i++) {
    var img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = srcs[i];
  }
}

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>(function (resolve) {
    var t = setTimeout(resolve, ms);

    function onAbort() {
      clearTimeout(t);
      resolve();                     // <- no reject on abort
    }

    if (signal.aborted) {
      onAbort();
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
  });
}


function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function ensureDecoded(src: string, signal: AbortSignal): Promise<void> {
  return new Promise<void>(function (resolve) {
    if (signal.aborted) {            // <- resolve, don’t reject
      resolve();
      return;
    }

    var img: any = new Image();
    function onAbort() {
      resolve();                     // <- resolve on abort
    }
    signal.addEventListener("abort", onAbort, { once: true });

    img.decoding = "async";
    img.loading = "eager";

    img.onload = function () {
      signal.removeEventListener("abort", onAbort);
      resolve();
    };
    img.onerror = function () {
      signal.removeEventListener("abort", onAbort);
      resolve();
    };

    img.src = src;

    if (typeof img.decode === "function") {
      img
        .decode()
        .catch(function () { /* ignore */ })
        .finally(function () {
          signal.removeEventListener("abort", onAbort);
          resolve();
        });
    }
  });
}

type ImgRef = { current: HTMLImageElement | null };

function absoluteURL(path: string): string {
  var a = document.createElement("a");
  a.href = path;
  return a.href;
}

function setSpeakingDom(textRef: ImgRef, value: boolean): void {
  var el = textRef.current;
  if (!el) return;
  el.className = value ? "is-Speaking" : "isNot-Speaking";
  el.style.visibility = value ? "visible" : "hidden";
}

function setTextSrc(textRef: ImgRef, src: string): void {
  var el = textRef.current;
  if (!el) return;
  var desired = absoluteURL(src);
  if (el.src !== desired) {
    el.src = src;
  }
}

function setGifSrc(gifRef: ImgRef, src: string): void {
  var el = gifRef.current;
  if (!el) return;
  var desired = absoluteURL(src);
  if (el.src !== desired) {
    el.src = src;
  }
}

// Force a GIF to restart by reassigning the same src.
function restartGif(gifRef: ImgRef, src: string): void {
  var el = gifRef.current;
  if (!el) return;
  el.src = src;
}

// Decode → set <gifRef>.src → wait duration
async function showGIF(
  name: string,
  signal: AbortSignal,
  gifRef: ImgRef
): Promise<IManGIF> {
  var g = byName(name);
  await ensureDecoded(g.src, signal);
  setGifSrc(gifRef, g.src);
  await sleep(g.length, signal);
  return g;
}

// fly helpers
function shuffleFlyCopy(): IFlyGIF[] {
  var arr = flyGIFs.slice();
  for (var j = arr.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = arr[j];
    arr[j] = arr[k];
    arr[k] = tmp;
  }
  return arr;
}
function pickFlySequence(): IFlyGIF[] {
  var arr = shuffleFlyCopy();
  return [arr[0], arr[1], arr[2]];
}
async function showFlyClip(
  clip: IFlyGIF,
  signal: AbortSignal,
  gifRef: ImgRef
): Promise<void> {
  await ensureDecoded(clip.src, signal);
  setGifSrc(gifRef, clip.src);
  await sleep(clip.length, signal);
}

// shuffle order builder
function buildShuffledOrder(length: number): number[] {
  var arr: number[] = [];
  for (var i = 0; i < length; i++) arr.push(i);
  for (var j = arr.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = arr[j];
    arr[j] = arr[k];
    arr[k] = tmp;
  }
  return arr;
}

// ----------------------- Component -----------------------

export default function MascotIntro({ loading }: Props) {
  const [mode, setMode] = useState<Mode>("intro");
  const gifRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLImageElement | null>(null);

  const INTRO_INDEX = useMemo(function () {
    return Math.floor(Math.random() * introGIFs.length);
  }, []);

  const INTRO_SCRIPT = useMemo(function () {
    var first = firstGIFs[INTRO_INDEX]?.[0] || firstGIFs[0][0];
    var a = introGIFs[INTRO_INDEX]?.[0] || introGIFs[0][0];
    var b = introGIFs[INTRO_INDEX]?.[1] || introGIFs[0][1];
    return [first, a, b];
  }, [INTRO_INDEX]);

  // shuffled orders
  const blurbOrderRef = useRef<number[]>([]);
  const blurbPtrRef = useRef(0);
  const angerOrderRef = useRef<number[]>([]);
  const angerPtrRef = useRef(0);

  function getNextBlurbFrames(): string[] {
    var order = blurbOrderRef.current;
    if (order.length === 0 || blurbPtrRef.current >= order.length) {
      blurbOrderRef.current = buildShuffledOrder(blurbGIFs.length);
      blurbPtrRef.current = 0;
      order = blurbOrderRef.current;
    }
    var idx = order[blurbPtrRef.current];
    blurbPtrRef.current = blurbPtrRef.current + 1;
    var frames: any = blurbGIFs[idx];
    return Array.isArray(frames) ? (frames as string[]) : [String(frames)];
  }

  function getNextAngerFrames(): string[] {
    var order = angerOrderRef.current;
    if (order.length === 0 || angerPtrRef.current >= order.length) {
      angerOrderRef.current = buildShuffledOrder(angerGIFs.length);
      angerPtrRef.current = 0;
      order = angerOrderRef.current;
    }
    var idx = order[angerPtrRef.current];
    angerPtrRef.current = angerPtrRef.current + 1;
    var frames: any = angerGIFs[idx];
    return Array.isArray(frames) ? (frames as string[]) : [String(frames)];
  }

  // preload on mount
  useEffect(function () {
    var all = []
      .concat(manGIFs.map(function (g) { return g.src; }))
      .concat(firstGIFs.flat())
      .concat(introGIFs.flat())
      .concat(blurbGIFs.flat())
      .concat(angerGIFs.flat())
      .concat(flyGIFs.map(function (f) { return f.src; }));
    preload(all as string[]);
  }, []);

  // initialize shuffle orders when ready
  useEffect(function () {
    if (loading) return;
    blurbOrderRef.current = buildShuffledOrder(blurbGIFs.length);
    blurbPtrRef.current = 0;
    angerOrderRef.current = buildShuffledOrder(angerGIFs.length);
    angerPtrRef.current = 0;
  }, [loading]);

  // orchestrator cancellation
  const abortRef = useRef<AbortController | null>(null);
  async function start(run: (signal: AbortSignal) => Promise<void>) {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    var ac = new AbortController();
    abortRef.current = ac;
    try {
      await run(ac.signal);
    } catch (err: any) {
      if (!err || err.message === "aborted") {
        // ignore
      } else {
        console.error(err);
      }
    }
  }

  // ----------- Intro flow -----------
  useEffect(function () {
    if (loading) return;

    start(async function (signal: AbortSignal) {
      await showGIF("idle_in", signal, gifRef);
      await showGIF("lipSyncIdle_in", signal, gifRef);

      var speaking = true;
      setSpeakingDom(textRef, true);

      const textP = (async function () {
        for (var i = 0; i < INTRO_SCRIPT.length; i++) {
          if (signal.aborted) return;
          setTextSrc(textRef, INTRO_SCRIPT[i]);
          await sleep(SPEAK_LENGTH, signal);
        }
        speaking = false;
        setSpeakingDom(textRef, false);
      })();

      var lip = byName("lipSyncIdle");
      await ensureDecoded(lip.src, signal);
      // Keep lip moving until text completes by restarting each cycle
      const lipLoop = (async function () {
        while (!signal.aborted && speaking) {
          restartGif(gifRef, lip.src);
          await sleep(lip.length, signal);
        }
      })();

      await lipLoop;
      await showGIF("lipSyncIdle_out", signal, gifRef);
      await textP;

      setMode("idle");
    });

    return function () {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [loading, INTRO_SCRIPT]);

  // ----------- Blurb speaking turn -----------
  async function runBlurb(signal: AbortSignal): Promise<void> {
    var frames = getNextBlurbFrames();

    await showGIF("lipSyncIdle_in", signal, gifRef);

    var speaking = true;
    setSpeakingDom(textRef, true);

    // start lip restarter
    var lip = byName("lipSyncIdle");
    await ensureDecoded(lip.src, signal);
    const lipLoop = (async function () {
      while (!signal.aborted && speaking) {
        restartGif(gifRef, lip.src);
        await sleep(lip.length, signal);
      }
    })();

    for (var i = 0; i < frames.length; i++) {
      if (signal.aborted) return;
      setTextSrc(textRef, frames[i]);
      await sleep(SPEAK_LENGTH, signal);
    }

    speaking = false;
    setSpeakingDom(textRef, false);
    await lipLoop;

    await showGIF("lipSyncIdle_out", signal, gifRef);
  }

  // ----------- Anger speaking turn -----------
async function runAnger(signal: AbortSignal): Promise<void> {
  var frames = getNextAngerFrames();

  // Show bubble immediately (first frame if present)
  setSpeakingDom(textRef, true);
  if (frames.length > 0) setTextSrc(textRef, frames[0]);

  // Display anger_in once, then loop it by restarting the same GIF
  var angerIn = byName("anger_in");
  await ensureDecoded(angerIn.src, signal);
  setGifSrc(gifRef, angerIn.src);

  // Keep anger_in "moving" until text finishes
  var speaking = true;
  const angerLoop = (async function () {
    while (!signal.aborted && speaking) {
      // let the current anger_in play fully…
      await sleep(angerIn.length, signal);
      if (signal.aborted || !speaking) break;
      // …then restart the same GIF to loop the motion
      restartGif(gifRef, angerIn.src);
    }
  })();

  // Advance remaining anger text frames (frame[0] already shown)
  for (var i = 1; i < frames.length; i++) {
    if (signal.aborted) return;
    setTextSrc(textRef, frames[i]);
    await sleep(SPEAK_LENGTH, signal);
  }
  // Single-frame case: still dwell for one speak interval
  if (frames.length === 1) {
    await sleep(SPEAK_LENGTH, signal);
  }

  // End together: stop loop, hide bubble, then anger_out
  speaking = false;
  await angerLoop;
  setSpeakingDom(textRef, false);

  await showGIF("anger_out", signal, gifRef);
}


  // ----------- Idle flow -----------
  useEffect(function () {
    if (loading) return;
    if (mode !== "idle") return;

    start(async function runIdle(signal: AbortSignal) {
      await showGIF("idle", signal, gifRef);

      while (!signal.aborted) {
        await showGIF("idle_in", signal, gifRef);

        // 0=head, 1=scratch, 2=blurb, 3=plain idle
        var branch = Math.floor(Math.random() * 4);

        if (branch === 0) {
          await showGIF("idle_headIn", signal, gifRef);
          var head = byName("idle_head");
          await ensureDecoded(head.src, signal);
          setGifSrc(gifRef, head.src);
          var loops = randInt(3, 5);
          await sleep(head.length * loops, signal);
          await showGIF("idle_headOut", signal, gifRef);
        } else if (branch === 1) {
          await showGIF("headScratch_in", signal, gifRef);
          var hs = byName("headScratch");
          await ensureDecoded(hs.src, signal);
          setGifSrc(gifRef, hs.src);
          var loops2 = randInt(3, 5);
          await sleep(hs.length * loops2, signal);
          await showGIF("headScratch_out", signal, gifRef);
        } else if (branch === 2) {
          await runBlurb(signal);
        } else {
          var idle2 = byName("idle");
          await ensureDecoded(idle2.src, signal);
          setGifSrc(gifRef, idle2.src);
          await sleep(idle2.length, signal);
        }
      }
    });

    return function () {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [loading, mode]);

  // ----------- Fly flow -----------
  const flyGuardRef = useRef(false);

  function onMascotClick() {
    if (flyGuardRef.current) return;
    flyGuardRef.current = true;
    setMode("fly");
  }

  useEffect(function () {
    if (loading) return;
    if (mode !== "fly") return;

    start(async function runFly(signal: AbortSignal) {
      setSpeakingDom(textRef, false);

      await showGIF("fly", signal, gifRef);
      await showGIF("fly_in", signal, gifRef);

      var seq = pickFlySequence();
      await showFlyClip(seq[0], signal, gifRef);
      await showFlyClip(seq[1], signal, gifRef);
      await showFlyClip(seq[2], signal, gifRef);

      await showGIF("fly_out", signal, gifRef);

      // Anger speech immediately after fly_out
      await runAnger(signal);

      flyGuardRef.current = false;
      setMode("idle");
    });

    return function () {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [loading, mode]);

  // ----------------------- Render -----------------------
  return (
    <div className="flex-container">
      <div className="l-mascot" onClick={onMascotClick}>
        <div className="text-Box">
          <img
            ref={textRef}
            src={firstGIFs[0][0]}
            className="isNot-Speaking"
            alt="mascot text"
            decoding="sync"
            loading="eager"
          />
        </div>
        <div className="gif-Man">
          <img
            ref={gifRef}
            src={manGIFs[0].src}
            alt="mascot"
            decoding="sync"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
