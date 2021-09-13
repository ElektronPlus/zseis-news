import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from './types';

export async function sendWebhookMessage (news: News) {
  const webhookClient = new WebhookClient({
    url: 'secret'
  })

  const embed = new MessageEmbed()
    .setTitle(news.title)
    .setDescription(news.content)
    .setURL('https://zseis.zgora.pl')
    .setFooter(news.dateModified)
    .setThumbnail(news.image)

  webhookClient.send({
    embeds: [embed]
  })
}
