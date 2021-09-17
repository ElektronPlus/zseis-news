import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from './types'
import fs from 'fs'
import options from './options'
import { writeObjectToFile } from './utils'

const sentToDiscord = JSON.parse(fs.readFileSync(options.PATHS.sentToDiscord, 'utf8'))
async function wasSentBefore (news: News): Promise<boolean> {
  return (sentToDiscord.md5.includes(news.md5))
}

async function setAsSent (news: News): Promise<void> {
  await sentToDiscord.md5.push(news.md5)
}

export default async function sendNewsByWebhook (newsList: News[], webhook: string): Promise<void> {
  process.env.WEBHOOK_URL = process.env.WEBHOOK_URL || webhook

  for (const news of newsList) {
    if (!await wasSentBefore(news)) {
      const webhookClient = new WebhookClient({
        url: process.env.WEBHOOK_URL
      })

      const embed = new MessageEmbed()
        .setTitle(news.title)
        .setDescription(news.content)
        .setURL(options.HOSTNAME)
        .setFooter(news.dateModified)
        .setThumbnail(news.image)

      webhookClient.send({
        embeds: [embed]
      })

      setAsSent(news)
    }
  }

  writeObjectToFile(options.PATHS.sentToDiscord, sentToDiscord)
}
