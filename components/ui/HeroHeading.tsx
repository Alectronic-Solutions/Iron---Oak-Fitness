/** The hero H1: the second line's oak gradient sweeps in right after the
 *  page's .animate-rise entrance finishes. Pure CSS (see .animate-clip in
 *  globals.css), so it renders on the server and respects reduced motion. */
export function HeroHeading() {
  return (
    <h1 className="mt-6 text-[3.5rem] uppercase leading-[0.9] text-bone min-[400px]:text-6xl sm:text-7xl md:text-6xl lg:text-8xl">
      Strength,
      <br />
      <span className="text-gradient-oak animate-clip inline-block">
        grounded.
      </span>
    </h1>
  );
}
