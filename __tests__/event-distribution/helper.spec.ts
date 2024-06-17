import { addToTree } from "../../src/event-distribution/helper.js";
import {
  HIOC,
  StringIndexedHIOCTree,
} from "../../src/event-distribution/types/hioc.js";
import { DiscordEvent } from "../../src/event-distribution/index.js";
import { ensureGuildMemberOrNull, ensureGuildMemberOrNullCoverage } from "../../src/event-distribution/helper.js";
import { Guild, GuildMember, GuildMemberFlagsBitField } from "discord.js";
import MockDiscord from "../mocks/index.js";

describe("ensureGuildMemberOrNull", () => {
  const mockDiscord = new MockDiscord;

  afterEach(() => {
    const ensureGuildMemberOrNullCoverageSum = ensureGuildMemberOrNullCoverage.reduce((sum, x) => sum + x);
    console.log("Branch coverage on ensureGuildMemberOrNull after test run: " + ((ensureGuildMemberOrNullCoverageSum / (ensureGuildMemberOrNullCoverage.length) * 100).toPrecision(3) + "%"));
  });

  it("Returns null if member is null", () => {
    const member = null;
    const client = {} as any;
    const guild = {} as any;

    expect(ensureGuildMemberOrNull(member, client, guild)).toBeNull();
  });

  it("Returns the member if it is a GuildMember", () => {
    const member = mockDiscord.getGuildMember();
    const client = {} as any;
    const guild = {} as any;
  
    expect(ensureGuildMemberOrNull(member, client, guild)).toEqual(member);
  });

  it("Throws an error if the member is not a GuildMember and guild is null", () => {
    const member = {} as GuildMember;
    const client = {} as any;
    const guild = null;

    expect(() => ensureGuildMemberOrNull(member, client, guild)).toThrowError(
      "Could not instantiate GuildMember from raw data; missing guild from button interaction"
    );
  });

  it("Returns a GuildMember if the member is not a GuildMember and guild is not null", () => {
    const member = {
      avatar: null,
      communicationDisabledUntilTimestamp: null,
      guild: {},
      joinedTimestamp: null,
      nickname: null,
      pending: null,
      premiumSinceTimestamp: null,
      flags: new GuildMemberFlagsBitField(0),
    } as unknown as GuildMember;
    const client = {} as any;
    const guild = {} as Guild;
    const guildMember = Reflect.construct(GuildMember, [client, member, guild]) as GuildMember;
    
    expect(ensureGuildMemberOrNull(member, client, guild)).toEqual(guildMember);
  });
});

describe("Event Distribution helper", () => {
  it("Adds a single key event to the tree", () => {
    const hioc = {} as HIOC<DiscordEvent.READY>;
    const tree = {} as StringIndexedHIOCTree<DiscordEvent.READY>;

    addToTree([""], hioc, tree);

    expect(tree[""]).toStrictEqual([hioc]);
  });

  it("Adds a two key event to the tree", () => {
    const hioc = {} as HIOC<DiscordEvent.REACTION_ADD>;
    const tree = {} as StringIndexedHIOCTree<DiscordEvent.REACTION_ADD>;

    addToTree(["first", "second"], hioc, tree);

    expect(tree).toMatchSnapshot();
  });

  it("Adds a three key event to the tree", () => {
    const hioc = {} as HIOC<DiscordEvent.MESSAGE>;
    const tree = {} as StringIndexedHIOCTree<DiscordEvent.MESSAGE>;

    addToTree(["channel", "trigger", "subTrigger"], hioc, tree);

    expect(tree).toMatchSnapshot();
  });

  it("Converts an existing array to an object", () => {
    const hioc = {} as HIOC<DiscordEvent.MESSAGE>;
    const tree = {} as StringIndexedHIOCTree<DiscordEvent.MESSAGE>;

    addToTree(["first"], hioc, tree);

    expect(tree["first"]).toStrictEqual([hioc]);

    addToTree(["first", "second"], hioc, tree);
    expect(Array.isArray(tree["first"])).toBe(false);

    const firstTree = tree[
      "first"
    ] as StringIndexedHIOCTree<DiscordEvent.MESSAGE>;

    expect(firstTree[""]).toBeTruthy();
    expect(firstTree["second"]).toBeTruthy();
  });

  it("Works with a bunch of combinations", () => {
    const hioc = {} as HIOC<DiscordEvent.MESSAGE>;
    const tree = {} as StringIndexedHIOCTree<DiscordEvent.MESSAGE>;

    addToTree(["first"], hioc, tree);
    addToTree(["second"], hioc, tree);
    addToTree(["third", "example", "sub"], hioc, tree);
    addToTree(["first", "second"], hioc, tree);
    addToTree(["first", "third"], hioc, tree);
    addToTree(["first", "third"], hioc, tree);

    expect(tree).toMatchSnapshot();
  });
});
