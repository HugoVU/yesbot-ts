import { resolveEmojis } from "../../src/programs/polls.js";
import { resolveEmojisCoverage } from "../../src/programs/polls.js";
import { afterEach } from "vitest";

describe("resolveEmojis", () => {
    afterEach(() => {
        const resolveEmojisCoverageSum = resolveEmojisCoverage.reduce((sum, x) => sum + x);
        console.log("Branch coverage on resolveEmojis after test run: " + ((resolveEmojisCoverageSum / (resolveEmojisCoverage.length) * 100).toPrecision(3) + "%"));
    });

    it("Returns an array of emojis if they are present", () => {
        const lines = ["👀", "🇫", "👀"];
        const client = {} as any;
        expect(resolveEmojis(lines, client)).toEqual(["👀", "🇫", "👀"]);
    });

    it("Returns an array Emoji letters of the letters", () => {
        const lines = ["A", "C"];
        const client = {} as any;
        expect(resolveEmojis(lines, client)).toEqual(["🇦", "🇨"]);
    });

    it("Returns an array of default emojis if no emojis are present", () => {
        const lines = ["What is up"];
        const client = {} as any;
        expect(resolveEmojis(lines, client)).toEqual(["🇦", "🅱️"]);
    });
});
