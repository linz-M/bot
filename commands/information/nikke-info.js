const { default: axios } = require('axios');
const cheerio = require('cheerio');

module.exports = {
	name: 'nikke-info',
	param: '<name>',
	cmd: ['nikke-info', 'nikke'],
	category: 'information',
	query: true,
	async handler(m, {
		conn,
		text
	}) {
		q = text
		await m.reply(response.wait)
		if (text === "list") {
			let chara = [];
			for (let color of await getCharaList()) {
				chara.push(({
					title: `${color.name.replace(/\s+/g, "_")}`,
					rowId: `#nikke-info ${color.name}`
				}));
			}
			const sections = [{
				title: "</Hello World>",
				rows: chara
			}]
			const listMessage = {
				text: `*List of Nikke Characters*`,
				footer: "choose what you want",
				title: "Nikke Goddess of Victory",
				buttonText: "search",
				sections
			}
			await conn.sendMessage(m.from, listMessage, {
				quoted: m
			})
		} else if (!q === "list") {
			try {
				ddb = await getDetail(q.toLowerCase().replace(/\s/g, "-"))
				thumbnya = await getCharaList().find(x => x.name === q.toLowerCase()).img;
				stri_skil = ""
				for (let color of ddb.skill) {
					stri_skil += `- *${color.name}*\n`
				}

				teksnya = `
*About*
*• Name :* ${ddb.name}.
*• Weapon :* ${ddb.weapon}
*• Role :* ${ddb.role}
*• Element :* ${ddb.element}
*• Rarity :* ${ddb.rarity}
*• Faction :* ${ddb.faction}
*• Team Role :* ${ddb.team_role}


*Stats*
*Max*
*• HP :* _${ddb.max_stats.hp}_
*• ATK :* _${ddb.max_stats.atk}_
*• DEF :* _${ddb.max_stats.def}_

*Min*
*• HP :* _${ddb.min_stats.hp}_
*• ATK :* _${ddb.min_stats.atk}_
*• DEF :* _${ddb.min_stats.def}_

*Skills*
${stri_skil}

*Overview*
${ddb.overview}
`
                let randomIndex = Math.floor(Math.random() * thumbimg.length);
		        let randomImage = thumbimg[randomIndex];
				await conn.sendMessage(m.from, {image : {url: ddb.image}, caption: teksnya}, {quoted: m, adreply: {
		        img: randomImage,
		        title: "Momoi",
		        body: "By LemonT",
		        url: "https://bluearchive.fandom.com/wiki/Blue_Archive_Wiki"
		        }
		      })
			} catch (e) {
				m.reply(e)
			}

		} else {
			m.reply("*NOT-FOUND*")
		}
	}

};




async function getDetail(qu){
const response = await axios.get('https://gachax.com/nikke-gov/character/'+ qu + '/');
    const $ = cheerio.load(response.data);
    img = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center > div > img").attr('src');
    max_hp = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(2)").text().replace(/\s+/g,'').trim()
	max_atk = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(4)").text().replace(/\s+/g,'').trim()
	max_def = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(6)").text().replace(/\s+/g,'').trim()
	min_hp = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(2)").text().replace(/\s+/g,'').trim()
    min_atk = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(4)").text().replace(/\s+/g,'').trim()
    min_def = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(6)").text().replace(/\s+/g,'').trim()
	nama = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(1) > div > h1").text().replace(/\s+/g,' ')
	rarity = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(3) > div > img").attr('src').split('/img/')[1].split('.png')[0]
	role = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(4) > div > span").text()
	element = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(5) > div > span").text()
	weapon = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(7) > span > span").text()
	story = $("#app > div > section:nth-child(6) > div > div > div.pb-30 > div > div.pure-u-1.mt-20 > div").text() || null
	factions = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(8) > span").text().trim()
	team_roles = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(11) > span").text().trim()
	const selectors = Array.from($("#app > div > section:nth-child(5) > div > div > div.page-box.mt-20 > div"));
    let skills = [];
    for (let i = 0; i < selectors.length; i++) {
    skills.push({name: $("#app > div > section:nth-child(5) > div > div > div.page-box.mt-20 > div:nth-child(" + Number(i+1) + ") > div.pure-u-1.pure-u-md-4-5.pure-u-lg-7-8.text-left > div.skill-title.center-mobile").text().trim()})
    }
	overview = $("#app > div > section:nth-child(3) > div > div > div.pb-30 > p").text()
	pinal = {
    name: nama,
    image: img,
    weapon: weapon,
    rarity: rarity,
    role: role,
    element: element,
    overview: overview,
    faction: factions,
    team_role: team_roles,
    max_stats: {
    hp: max_hp,
    atk: max_atk,
    def: max_def
    },
    min_stats: {
    hp: min_hp,
    atk: min_atk,
    def: min_def
    },
    story: story,
    skill: skills
    }
    return pinal
}

async function getCharaList() {
let html = (await axios.get("https://gachax.com/nikke-gov/characters/")).data
let data = html.match(/var CHARACTERS = (.*);/)?.[1]

data = JSON.parse(data)
const transformedData = data.map(item => {
  return {
    img: item.icon,
    url: item.link,
    name: item.link.split('character/')[1].split('/')[0]
  };
});

return transformedData
}