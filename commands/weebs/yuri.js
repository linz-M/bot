const Booru = require("booru")

module.exports = {
	name: "yuri",
	cmd: ["yuri"],
	category: "weebs",
	desc: "get yuri from danbooru",
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		let posts = await Booru.search('dan', ['yuri'], { limit: 350, random: false })
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