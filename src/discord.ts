import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from './types'
import fs from 'fs'
import options from './options'
import { writeObjectToFile } from './utils'

const sentNews = JSON.parse(fs.readFileSync(options.paths.sentNews, 'utf8'))
async function wasSentBefore (news: News): Promise<boolean> {
  return (sentNews.md5.includes(news.md5))
}

async function setAsSent (news: News): Promise<void> {
  await sentNews.md5.push(news.md5)
}

export default async function sendNewsByWebhook (newsGroup: News[], webhookURL: string): Promise<void> {
  for (const news of newsGroup) {
    if (!await wasSentBefore(news)) {
      const webhookClient = new WebhookClient({
        url: webhookURL
      })

      const embed = new MessageEmbed()
        .setTitle(news.title)
        .setDescription(news.content)
        .setURL(options.defaultURL)
        .setFooter(news.dateModified)
        .setThumbnail(news.image)

      webhookClient.send({
        embeds: [embed]
      })

      setAsSent(news)
    }
  }

  writeObjectToFile(options.paths.sentNews, sentNews)
}
