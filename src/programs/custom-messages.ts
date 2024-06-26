import { Message } from "discord.js";
import {
  Command,
  CommandHandler,
  DiscordEvent,
} from "../event-distribution/index.js";

export const customMessageMethodsCoverage = [0,0,0,0]

@Command({
  event: DiscordEvent.MESSAGE,
  description:
    "This handler is for custom messages that do not have a specific trigger.",
})
export class CustomMessageMethods implements CommandHandler<DiscordEvent.MESSAGE> {
  async handle(message: Message): Promise<void> {
    const messageContent = message.content;

    if (messageContent.match(/^(yesbot).*(\?)$/gi)){
      await randomReply(message);
      customMessageMethodsCoverage[0] = 1;
    }

    if (
      messageContent.match(
        /yesbot i love you|yesbot i love u|i love you yesbot/i
      )
    ) {
      await sendLove(message);
      customMessageMethodsCoverage[1] = 1;
    }

    if (messageContent.match(/^F$/i)){
      await message.react("🇫");
      customMessageMethodsCoverage[2] = 1;
    }

    if (messageContent.match(/(abooz|mod abuse)/i)){
      await message.react("👀");
      customMessageMethodsCoverage[3] = 1;
    }
  }
}

export const randomReply = async (message: Message) => {
  const replies = [
    "yes.",
    "no",
    "probably.",
    "doubtful.",
    "i'm afraid I don't know that one",
    "absolutely not.",
    "absolutely",
    "not a chance.",
    "definitely.",
    "very very very unlikely",
    "I think you already know the answer",
    "you wish",
    "sure why not?",
    "bet!",
    "surely not!",
    "never",
    "flip a coin: Head is yes, Tails is no",
    "never in a million years",
    "claro que si", // yes of course
    "hahahahahhaha... no.",
    "yes, I totally agree",
    "as long as I’m alive.",
    "have you forgotten? I’m a yes-man!",
    "yes, yes, and yes!",
    "definitely not NO.",
    "I do not disagree.",
    "I haven’t said no yet, right?",
    "my enthusiastic nodding says it all.",
  ];

  await message.reply(`${replies[Math.floor(Math.random() * replies.length)]}`);
};

export const sendLove = async (message: Message) => {
  const loveArr = [
    "I love you too, Cutiepie",
    "I will find you and I will love you.",
    "Lets make some robot-human babies :smirk: ",
    "Hey you little gorgeous human, come change my oil.",
    "I appreciate you.",
    "Thank you, next!",
    "Okay.",
    "I think I have a crush on you.",
    "Tell me more :sweat_drops:",
    "You are amazing too! :) ",
    "I like you. Lets go out. But wait, let me ask my parents for permission first.",
    "I love you too! (Although I'm not entirely sure what love is but this experience I'm feeling is probably some iteration of love.)",
  ];
  const randomLoveReply = loveArr[Math.floor(Math.random() * loveArr.length)];

  await message.reply(randomLoveReply);
  await message.react("😍");
};
