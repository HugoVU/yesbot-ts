import { ChatInputCommandInteraction, TextChannel } from 'discord.js';
import {resourcesCoverage,RESOURCES_SPANISH,RESOURCES_CODING} from "../../src/programs/resources.js";
import {Resources} from "../../src/programs/resources.js";
import {afterEach} from "vitest";
import {ChatNames} from "../../src/collections/chat-names.js";

const createMockInteraction = (channelName: string) => {
    const mockReply = vi.fn();
    const channel = { name: channelName } as TextChannel;
    const interaction = {channel, reply: mockReply} as unknown as ChatInputCommandInteraction;

    return { interaction, replyMock: mockReply };
};
describe("resources.handle", () => {
    afterEach(() => {
        const resourceCoverageSum = resourcesCoverage.reduce((sum, x) => sum + x);
        console.log("Branch coverage on resource after test run: " + ((resourceCoverageSum / (resourcesCoverage.length) * 100).toPrecision(3) + "%"));
    });

    it('reply with coding resources in the CODING channel', async () => {
        const { interaction, replyMock } = createMockInteraction(ChatNames.CODING);
        const resourcesHandler = new Resources();

        await resourcesHandler.handle(interaction);

        expect(replyMock).toHaveBeenCalledWith(RESOURCES_CODING);
    });

    it('reply with Spanish resources in the LEARNING_SPANISH channel', async () => {
        const { interaction, replyMock } = createMockInteraction(ChatNames.LEARNING_SPANISH);
        const resourcesHandler = new Resources();

        await resourcesHandler.handle(interaction);

        expect(replyMock).toHaveBeenCalledWith(RESOURCES_SPANISH);
    });

    it('reply with default message in an unknown channel', async () => {
        const { interaction, replyMock } = createMockInteraction('unknown-channel');
        const resourcesHandler = new Resources();

        await resourcesHandler.handle(interaction);

        expect(replyMock).toHaveBeenCalledWith({
            content: 'No resource exists for this channel.',
            ephemeral: true,
        });
    });
});