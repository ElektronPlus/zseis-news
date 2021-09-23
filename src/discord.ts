import md5 from "md5";
import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from "./types";
import fs from 'fs'
import options from './options'

const sentNews: {md5: string[]} = JSON.parse(fs.readFileSync(options.paths.sentNews, 'utf-8'))

async function getNewsChecksum(entry: News) {
  return md5(entry.title + entry.dateModified)
}

async function isAlreadySent(checksum: string) {
  return sentNews.md5.includes(checksum)
}

async function prepareMessage(entry: News): Promise<MessageEmbed> {
  let embed = new MessageEmbed()
    .setTitle(entry.title)
    .setDescription(entry.content)
    .setURL(options.defaultURL)
    .setFooter(entry.dateModified)
    .setColor('#457dd9')

  if (entry.image != 'https://zseis.zgora.pl/gfx/logo_zseis.gif') {
    embed.setImage(entry.image)
  }

  return embed
}

async function updateSentNews(md5: string) {
  sentNews.md5.push(md5)
  fs.writeFileSync(options.paths.sentNews, JSON.stringify(sentNews, null, 2), 'utf8')
}

export default async function sendNewsByWebhook(news: News[], webhookURL: string) {
  const webhookClient = new WebhookClient({
    url: webhookURL
  })

  for (const entry of news) {
    const checksum = await getNewsChecksum(entry)
    if (await isAlreadySent(checksum) == false) {
      prepareMessage(entry)
        .then(message => webhookClient.send({
            embeds: [message]
        }))

      updateSentNews(checksum)
    }
  }
}