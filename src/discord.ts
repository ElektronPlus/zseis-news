import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from './types'
import fs from 'fs'
import { PATHS } from './options'

const sentToDiscord = JSON.parse(fs.readFileSync(PATHS.sentToDiscord, 'utf8'))

async function wasSentBefore(news: News): Promise<boolean> {
  return (!sentToDiscord.md5.includes(news.md5))
}

async function setAsSent(news: News): Promise<void> {
  sentToDiscord.md5.push(news.md5)
}

export default async function sendNewsByWebhook (newsList: News[], webhook: string): Promise<void> {
  for (const news of newsList) {
    if (!wasSentBefore(news)) {
      const webhookClient = new WebhookClient({
        url: webhook
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
  
      setAsSent(news)
    }
  }
}

fs.writeFileSync(PATHS.sentToDiscord, JSON.stringify(sentToDiscord, null, 2))