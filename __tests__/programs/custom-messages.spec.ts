import { Message } from 'discord.js';
import { CustomMessageMethods, customMessageMethodsCoverage} from "../../src/programs/custom-messages.js";

const createMessage = (content:String) => ({
    content,
    reply: vi.fn().mockResolvedValue(undefined),
    react: vi.fn().mockResolvedValue(undefined),
    }as unknown as Message);

describe('CustomMessageMethods', () => {

    afterEach(() => {
        const CoverageSum = customMessageMethodsCoverage.reduce((sum, x) => sum + x);
        console.log("Branch coverage on custom-message after test run: " + ((CoverageSum / (customMessageMethodsCoverage.length) * 100).toPrecision(4) + "%"));
    });

    it('reply with a random message when content matches yesbot and ends with a ?', async () => {
        const message = createMessage('yesbot, are you there?');
        const customMessageHandler = new CustomMessageMethods()
        await customMessageHandler.handle(message);

        expect(message.reply).toHaveBeenCalled();
    });

    it('send love reply and react with heart when content matches love expressions', async () => {
        const message = createMessage('yesbot i love you');
        const resourceHandler = new CustomMessageMethods()

        await resourceHandler.handle(message);

        expect(message.reply).toHaveBeenCalled();
        expect(message.react).toHaveBeenCalledWith('😍');
    });

    it('react with 🇫 "F"', async () => {
        const message = createMessage('F');
        const resourceHandler = new CustomMessageMethods()

        await resourceHandler.handle(message);

        expect(message.react).toHaveBeenCalledWith('🇫');
    });

    it('react with 👀 when content matches mod abuse phrases', async () => {
        const message = createMessage('mod abuse');
        const customMessageHandler = new CustomMessageMethods();
        await customMessageHandler.handle(message);

        expect(message.react).toHaveBeenCalledWith('👀');
    });

    it('should not trigger any actions for unrelated messages', async () => {
        const message = createMessage('hello');

        const customMessageHandler = new CustomMessageMethods();
        await customMessageHandler.handle(message);

        expect(message.reply).not.toHaveBeenCalled();
        expect(message.react).not.toHaveBeenCalled();
    });
});