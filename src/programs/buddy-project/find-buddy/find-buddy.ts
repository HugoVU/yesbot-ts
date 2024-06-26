import { ChatInputCommandInteraction } from "discord.js";
import { BuddyProjectStatus } from "../../../__generated__/types.js";
import { ChatNames } from "../../../collections/chat-names.js";
import {
  Command,
  CommandHandler,
  DiscordEvent,
  HandlerRejectedReason,
} from "../../../event-distribution/index.js";
import { BuddyProjectError, commonMessages } from "../constants.js";
import { BuddyProjectService } from "../services/buddy-project.service.js";

@Command({
  event: DiscordEvent.SLASH_COMMAND,
  root: "buddy-project",
  subCommand: "find-buddy",
  description: "Pings the buddy of the author",
  errors: {
    ...commonMessages,
    [HandlerRejectedReason.MISSING_ROLE]:
      commonMessages[BuddyProjectError.NOT_SIGNED_UP],
  },
})
class FindBuddyCommand extends CommandHandler<DiscordEvent.SLASH_COMMAND> {
  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    const { member, guild } = interaction;
    if (!member || !guild) return;

    const { buddy, status } = await new BuddyProjectService().getBuddy(
      member.user.id
    );

    if (status === BuddyProjectStatus.NotSignedUp) {
      throw new Error(BuddyProjectError.NOT_SIGNED_UP);
    }

    if (!buddy) {
      throw new Error(BuddyProjectError.NOT_MATCHED);
    }

    const { userId: buddyId } = buddy;

    const buddyMember = await guild.members.fetch(buddyId);
    const tag = `${buddyMember.user.username}#${buddyMember.user.discriminator}`;
    const infoChannel = guild.channels.cache.find(
      (c) => c.name === ChatNames.BUDDY_PROJECT_INFO
    );

    await interaction.reply({
      content: `Hey, your buddy is <@${buddyId}> (${tag})! If that just shows some symbols and numbers, head here to find out how to fix that: ${infoChannel}.
If that doesn't help either, you can use the </buddy-project rescue:${interaction.commandId}> command.`,
      ephemeral: true,
    });
  }
}
