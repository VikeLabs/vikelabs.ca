// https://stackoverflow.com/a/21648508
export function hexToRgbA(hex: string, alpha: number) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + alpha + ")";
  }
  throw new Error("Bad Hex");
}

// https://stackoverflow.com/a/62640342
export const colorShade = (col: string, amt: number) => {
  col = col.replace(/^#/, "");
  if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  let [r, g, b] = col.match(/.{2}/g);
  [r, g, b] = [
    String(parseInt(r, 16) + amt),
    String(parseInt(g, 16) + amt),
    String(parseInt(b, 16) + amt),
  ];

  r = Math.max(Math.min(255, Number(r)), 0).toString(16);
  g = Math.max(Math.min(255, Number(g)), 0).toString(16);
  b = Math.max(Math.min(255, Number(b)), 0).toString(16);

  const rr = (r.length < 2 ? "0" : "") + r;
  const gg = (g.length < 2 ? "0" : "") + g;
  const bb = (b.length < 2 ? "0" : "") + b;

  return `#${rr}${gg}${bb}`;
};
