const { Pixiv } = require("@ibaraki-douji/pixivts")
const pixiv = new Pixiv()

async function pixivDl(query) {
var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var t = 'www.google.com';
if (query.match(regex)) {
if (!query.startsWith('https:\/\/www.pixiv')) console.log('invalid')
query = query.replace(/\D/g, '')
let res = await pixiv.getIllustByID(query).catch(() => null)
if (!res) throw `ID "${query}" not found :/`
let media = []
for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
return {
artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
}
} else {
let res = await pixiv.getIllustsByTag(query)
if (!res.length) throw `Tag's "${query}" not found :/`
res = res[~~(Math.random() * res.length)].id
res = await pixiv.getIllustByID(res)
let media = []
for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
return {
artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
}
}
}

module.exports = {
	name: "pixiv",
	param: "<url>",
	cmd: ["pixiv","pixivdl"],
	category: "weebs",
	desc: "download image from pixiv",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		res = await pixivDl(text)
		for (let i = 0; i < res.media.length; i++) {
        	let captions = i == 0 ? `${res.caption}\n\n*By:* ${res.artist}\n*Tags:* ${res.tags.join(', ')}` : ''
            await conn.sendFileFromUrl(m.from, res.media[i], {caption: captions}, {quoted: m})
            }
	},
};
