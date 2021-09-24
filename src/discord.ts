import md5 from 'md5'
import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from './types'
import fs from 'fs'
import options from './options'

const sentNews: {md5: string[]} = JSON.parse(fs.readFileSync(options.paths.sentNews, 'utf-8'))

async function getNewsChecksum (entry: News): Promise<string> {
  return md5(entry.title + entry.dateModified)
}

async function isAlreadySent (checksum: string): Promise<boolean> {
  return sentNews.md5.includes(checksum)
}

async function prepareMessage (entry: News): Promise<MessageEmbed> {
  const embed = new MessageEmbed()
    .setTitle(entry.title)
    .setDescription(entry.content)
    .setURL(options.defaultURL)
    .setFooter(entry.dateModified)
    .setColor('#457dd9')

  if (entry.image !== options.defaultImage) {
    embed.setImage(entry.image)
  }

  return embed
}

async function updateSentNews (md5: string): Promise<void> {
  sentNews.md5.push(md5)
  fs.writeFileSync(options.paths.sentNews, JSON.stringify(sentNews, null, 2), 'utf8')
}

export default async function sendNewsByWebhook (news: News[], webhookURL: string): Promise<void> {
  const webhookClient = new WebhookClient({
    url: webhookURL
  })

  for (const entry of news) {
    const checksum = await getNewsChecksum(entry)
    if (!await isAlreadySent(checksum)) {
      await prepareMessage(entry)
        .then(async message => await webhookClient.send({
          embeds: [message]
        }))

      await updateSentNews(checksum)
    }
  }
}
