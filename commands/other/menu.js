const fs = require("fs");
const prettyms = require('pretty-ms')
const { showhit } = require("../../database/hit");
const imgurl = 'https://telegra.ph/file/ebc48df922d9636da0702.jpg'

module.exports = {
	name: "menu",
	cmd: ["menu"],
	ignored: true,
	async handler(m, { conn, prefix}) {
		const cmd = [];
		Object.values(attr.commands)
			.filter((cm) => !cm.disabled && !cm.ignored)
			.map((cm) => {
        		if(Array.isArray(cm.name)){
          			for(let i=0; i<cm.name.length; i++){
            			cmd.push({
							name: `${cm.name[i]}${cm.param ? ` ${cm.param}` : ""}`,
							cmd: [cm.cmd.find(y => y == cm.name[i])],
							param: cm.param ? cm.param : false,
							tag: cm.category ? cm.category : "Uncategorized",
							desc: cm.desc ? cm.desc : '-'
						});
          			}
        		}
        		else{
					cmd.push({
						name: `${cm.name}${cm.param ? ` ${cm.param}` : ""}`,
						cmd: cm.cmd,
						param: cm.param ? cm.param : false,
						tag: cm.category ? cm.category : "Uncategorized",
						desc: cm.desc ? cm.desc : '-'
					});
        		}
			});
		let d = new Date(new Date() + 3600000);
		let date = d.toLocaleDateString("id", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		const hit = Object.values(await showhit()).map((ht) => ht.total);
		const thit = await eval(hit.join(" + "));
		const map_tag = cmd.map((mek) => mek.tag);
		const sort_tag = await map_tag.sort();
		const tag_data = new Set(sort_tag);
		const tags = [...tag_data];
		//let menu = `${config.botname}\n\n`
		let menu = `${m.user.jadibot ? await conn.getName(await decodeJid(conn.user.id)) : config.botname}\n\n`
		menu += `*About Bot*\n`
		menu += `${shp} Library : Baileys-MD\n`;
		menu += `${shp} Runtime  : ${m.user.jadibot ? await prettyms(Date.now() - conn.user.uptime, {verbose: true}) : await tool.toTimer(process.uptime())}\n`;
		menu += `${shp} Command Total : ${cmd.length}\n`;
		menu += `${shp} Hit Total : ${thit}\n`;
		menu += `${shp} Prefix : [ ${prefix} ]\n`;
		menu += `${shp} Date : ${date}\n\n`;
		menu += `Hello ${await conn.getName(m.sender)} Here my command list\n`;
		let numtag = 1
		for (let tag of tags) {
			menu += `\n*❐ ${tag.toUpperCase()}*\n`;
			const filt_cmd = cmd.filter((mek) => mek.tag == tag);
			const map_cmd = await filt_cmd.map((mek) => mek.name);
			const sort = await map_cmd.sort(function (a, b) {
				return a.length - b.length;
			});
			for (let j = 0; j < sort.length; j++) {
				menu += `◪ ${prefix}${sort[j]}\n`;
			}
			numtag++
		}
		let randomIndex = Math.floor(Math.random() * thumbimg.length);
		let randomImage = thumbimg[randomIndex];
		await conn.sendMessage(m.from, {text : menu}, {withTag: true, quoted: m, adreply: {
        img: randomImage,
        title: "(⁠つ⁠≧⁠▽⁠≦⁠)⁠つ Momoi",
        body: "By LemonT",
        url: "https://bluearchive.fandom.com/wiki/Blue_Archive_Wiki"
        }
      })
	},
};
