const ytdl = require("ytdl-core")

async function yt(url) {
    let info = await ytdl.getInfo(url);
	let format = ytdl.filterFormats(info.formats, "audioonly");
	return format

}

module.exports = {
	name: "ytmp3",
	param: "<url>",
	cmd: ["ytmp3","yta"],
	category: "downloader",
	desc: "download audio from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		data = await yt(text)
          let link = data[0].url
          info = await ytdl.getInfo(text);
          let title = info.videoDetails.title;
          let description = info.videoDetails.description;
        
		const mdata = {
			title: title,
			album: "Lingz",
			artist: info.videoDetails.ownerChannelName ? info.videoDetails.ownerChannelName : await conn.getName(m.sender),
			image: {
				mime: 'image/png',
				type: {
					id: 3,
					name: 'front cover'
				},
				imageBuffer: await tool.getBuffer(info.videoDetails.thumbnail.thumbnails[0].url)
			}
		}
		if (link == undefined) return m.reply("Cannot find download url!");
		try{
			await conn.sendMessage(m.from,{ audio: { url: link }, mimetype: "audio/mpeg", musicMetadata: mdata},{ quoted: m });
		}catch{
			const down = await scrapp.y1s('mp3', await scrapp.expandUrl(text))
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 100 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(down.dlink)}`)
			await conn.sendMessage(m.from, {audio: {url: down.dlink}, mimetype: 'audio/mpeg', musicMetadata: mdata}, {quoted: m})
		}
		//await conn.sendFileFromUrl(m.from, link, {mimetype: 'audio/mpeg'}, {quoted: m})
	},
};
