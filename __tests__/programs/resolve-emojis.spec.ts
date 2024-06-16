import { resolveEmojis } from "../../src/programs/polls.js";

describe("resolveEmojis", () => {
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
