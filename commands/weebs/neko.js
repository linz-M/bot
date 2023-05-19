const Booru = require("booru")

module.exports = {
	name: "neko",
	cmd: ["neko"],
	category: "weebs",
	desc: "get nekomimi nsfw from danbooru",
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		let posts = await Booru.search('dan', ['cat_girl'], { limit: 350, random: false })
		d = posts
		resu = []
		d.forEach(ggwp =>{
		ld = { url: `${ggwp.file_url}` }
		resu.push(ld)
		})
		random =  resu[Math.floor(Math.random() * resu.length)]
		await conn.sendMessage(m.from,{ image: { url: "https://external-content.duckduckgo.com/iu/?u=" + random.url }},{ quoted: m });
	},
};