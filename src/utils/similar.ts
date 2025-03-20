/**
 * 相似度对比
 * @param s 文本1
 * @param t 文本2
 * @returns {string|number|*} 百分数前的数值，最大100. 比如 ：90.32
 */
function similar(s: string, t: string): number {
    if (!s || !t) {
        return 0;
    }
    if (s === t) {
        return 100;
    }
    const l = s.length > t.length ? s.length : t.length;
    const n = s.length;
    const m = t.length;
    const d: number[][] = [];
    const min = (a: number, b: number, c: number): number => {
        return a < b ? (a < c ? a : c) : b < c ? b : c;
    };
    let i: number, j: number, si: string, tj: string, cost: number;
    if (n === 0) return m;
    if (m === 0) return n;
    for (i = 0; i <= n; i++) {
        d[i] = [];
        d[i][0] = i;
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j;
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1);
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1);
            if (si === tj) {
                cost = 0;
            } else {
                cost = 1;
            }
            d[i][j] = min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + cost
            );
        }
    }
    const res = (1 - d[n][m] / l) * 100;
    return res;
}
/**
 * 相似度对比,从大到小
 * @param text 匹配文本
 * @param text1 文本1
 * @param text2 文本2
 * @returns {number} 相似度对比,从大到小
 */
export function similarSort(
    text: string,
    text1: string,
    text2: string
): number {
    return similar(text, text2) - similar(text, text1);
}
