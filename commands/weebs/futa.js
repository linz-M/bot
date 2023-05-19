const Booru = require("booru")

module.exports = {
	name: "futa",
	cmd: ["futa","futanari"],
	category: "weebs",
	desc: "get futanari nsfw from danbooru",
	async handler(m, { conn, text }) {
		await m.reply(response.wait);
		rans = ['futa_with_female','futa_with_male']
        genr =  rans[Math.floor(Math.random() * rans.length)]
		let posts = await Booru.search('dan', [genr], { limit: 350, random: false })
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

