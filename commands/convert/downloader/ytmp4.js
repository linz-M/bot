const ytdl = require("ytdl-core")

async function yt(url) {
    let info = await ytdl.getInfo(url);
	let format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
	return format

}

module.exports = {
	name: "ytmp4",
	param: "<url>",
	cmd: ["ytmp4","ytv"],
	category: "downloader",
	desc: "download video from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		data = await yt(text)
          let link = data[0].url
          info = await ytdl.getInfo(text);
          let title = info.videoDetails.title;
          let description = info.videoDetails.description;

		if (link == undefined) return m.reply("Cannot find download url!");
		try{
			await conn.sendMessage(m.from, { document: { url: link }, mimetype: "video/mp4", fileName: title }, { quoted: m});
		}catch{
			const down = await scrapp.y1s('mp4', await scrapp.expandUrl(text))
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 150 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(down.dlink)}`)
			await conn.sendMessage(m.from, { document: { url: down.dlink }, mimetype: "video/mp4", fileName: down.title }, {quoted: m})
		}
	},
};
