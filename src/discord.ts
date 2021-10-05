import md5 from 'md5'
import { MessageEmbed, WebhookClient } from 'discord.js'
import { News } from './types'
import fs from 'fs'
import options from './options'

const sentNews: {md5: string[]} = JSON.parse(fs.readFileSync(options.paths.sentNews, 'utf-8'))

/** Get md5 of (title + dateModified) in order to create pseudo-id in order to identify a single entry. I couldn't find a way to scrape real id of the entry from the website. */
function getNewsChecksum (entry: News): string {
  return md5(entry.title + entry.dateModified)
}

/** Check if specific entry was already sent to Discord. If title or dateModified is going to be changed, the entry will be resent. */
function isAlreadySent (checksum: string): boolean {
  return sentNews.md5.includes(checksum)
}

/** Return pretty Discord Embed. */
function prepareMessage (entry: News): MessageEmbed {
  const description = entry.md ?? entry.content

  const embed = new MessageEmbed()
    .setTitle(entry.title)
    .setDescription(description)
    .setURL(options.defaultURL)
    .setFooter(entry.dateModified)
    .setColor('#457dd9')

  if (entry.image !== options.defaultImage) {
    embed.setImage(entry.image)
  }

  return embed
}

/** Write md5 to json */
function updateSentNews (md5: string): void {
  sentNews.md5.push(md5)
  fs.writeFileSync(options.paths.sentNews, JSON.stringify(sentNews, null, 2), 'utf8')
}

export default async function sendNewsByWebhook (news: News[], webhookURL: string): Promise<void> {
  const webhookClient = new WebhookClient({
    url: webhookURL
  })

  for (const entry of news) {
    const checksum = getNewsChecksum(entry)

    if (!isAlreadySent(checksum)) {
      webhookClient.send({
          embeds: [prepareMessage(entry)]
        })

      updateSentNews(checksum)
    }
  }
}
