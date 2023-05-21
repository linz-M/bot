const { default: axios } = require('axios');
const cheerio = require('cheerio');

module.exports = {
	name: 'hsr',
	param: '<name>',
	cmd: ['hsr', 'hsr-info','honkai-star-rail'],
	category: 'information',
	query: true,
	async handler(m, {
		conn,
		text
	}) {
		var q = text
		await m.reply(response.wait)
		if (text === "list") {
			let chara = [];
			for (let color of await getCharaList()) {
				chara.push(({
					title: `${color.name.replace(/\s+/g, "_")}`,
					rowId: `#hsr ${color.name}`
				}));
			}
			const sections = [{
				title: "</Hello World>",
				rows: chara
			}]
			const listMessage = {
				text: `*List of HSR Characters*`,
				footer: "choose what you want",
				title: "Honkai: Star Rail",
				buttonText: "search",
				sections
			}
			await conn.sendMessage(m.from, listMessage, {
				quoted: m
			})
		} else if (!q === "list") {
			try {
				ddb = await getDetail(q.toLowerCase().replace(/\s/g, "-"))
				thumbnya = await getCharaList().find(x => x.name === q.toLowerCase().replace(/\s/g, "-")).img;
				stri_skil = ""
				for (let color of ddb.skills) {
					stri_skil += `*- Name :* ${color.name}\n`
					stri_skil += `*- Desc :* ${color.desc}\n\n`
				}
				stri_elem = ""
				for (let color of ddb.traces) {
					stri_elem += `*- Name :* ${color.name}\n`
					stri_elem += `*- Desc :* ${color.desc}\n`
					stri_elem += `*- Minor :* ${color.minor}\n\n`
				}
				EidolonSkills = ""
				for (let color of ddb.EidolonSkills) {
					EidolonSkills += `*- Name :* ${color.name}\n`
					EidolonSkills += `*- Desc :* ${color.desc}\n\n`
				}
				teksnya = `
*❐About*
*• Name :* ${ddb.name}.
*• Tier :* ${ddb.tier}
*• Rarity :* ${ddb.rarity}
*• Element :* ${ddb.element}
*• Path :* ${ddb.path}
*• Affiliation :* ${ddb.affiliation}


*❐Stats*
*-Max*
*• HP :* _${ddb.stats.max.hpLvl80}_
*• ATK :* _${ddb.stats.max.atkLvl80}_
*• DEF :* _${ddb.stats.max.defLvl80}_
*• SPD :* _${ddb.stats.max.spdLvl80}_

*-Min*
*• HP :* _${ddb.stats.min.hpLvl1}_
*• ATK :* _${ddb.stats.min.atkLvl1}_
*• DEF :* _${ddb.stats.min.defLvl1}_
*• SPD :* _${ddb.stats.min.spdLvl1}_

*❐Skills*
${stri_skil}


*❐Traces*
${stri_elem}


*${dbb.floating_minor}*

*❐Eidolon*
${EidolonSkills}
`
                let randomIndex = Math.floor(Math.random() * thumbimg.length);
		        let randomImage = thumbimg[randomIndex];
				await conn.sendMessage(m.from, {image : {url: ddb.img}, caption: teksnya}, {quoted: m, adreply: {
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




async function getDetail(qu) {
  const response = await axios.get('https://gachax.com/honkai-star-rail/character/' + qu + '/');
  const $ = cheerio.load(response.data);

  const name = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(1) > div > h1").text().replace(/ {2,}/g, ' ');
  const tier = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(2) > div").text().trim().replace(/ {2,}/g, ' ');
  const rarity = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(3) > span").text().trim().replace(/ {2,}/g, ' ');
  const element = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(4) > div > span").text().trim().replace(/ {2,}/g, ' ');
  const path = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(5) > div > span").text().trim().replace(/ {2,}/g, ' ');
  const affiliation = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(6) > span").text().trim().replace(/ {2,}/g, ' ');

  const hpLvl80 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(2)").text().trim().replace(/ {2,}/g, ' ');
  const atkLvl80 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(4)").text().trim().replace(/ {2,}/g, ' ');
  const devLvl80 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(6)").text().trim().replace(/ {2,}/g, ' ');
  const spdLvl80 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(8)").text().trim().replace(/ {2,}/g, ' ');

  const hpLvl1 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(2)").text().trim().replace(/ {2,}/g, ' ');
  const atkLvl1 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(4)").text().trim().replace(/ {2,}/g, ' ');
  const devLvl1 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(6)").text().trim().replace(/ {2,}/g, ' ');
  const spdLvl1 = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(8)").text().trim().replace(/ {2,}/g, ' ');

  const img = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center > div > img").attr('src');

  const skillElements = Array.from($("#app > div > section:nth-child(3) > div > div > div.page-box.mt-20 > div"));
  const skills = skillElements.map((el, index) => ({
    name: $(el).find("div.skill-title.center-mobile").text().trim(),
    desc: $(el).find("div.description > p").text().trim()
  }));

  const traceElements = Array.from($("#app > div > section:nth-child(4) > div > div > div.mt-10 > div > div"));
  const traces = traceElements.map((el, index) => ({
    name: $(el).find("div.skill-title.center-mobile").text().trim(),
    desc: $(el).find("div.description > p").text().trim(),
    minor: $(el).find("div.panel.mt-5").text().trim().replace(/(\s{2,})/g, '\n')
  }));

  const floating_minor = $("#app > div > section:nth-child(5) > div.wrapper.pure-g > div > div.mt-30 > div").text().trim().replace(/(\s{2,})/g, '\n')

  const eidolonElements = Array.from($("#app > div > section:nth-child(6) > div > div > div.page-box.mt-20 > div"));
  const EidolonSkills = eidolonElements.map((el, index) => ({
    name: $(el).find("div.skill-title.center-mobile").text().trim(),
    desc: $(el).find("div.description > p").text().trim()
  }));

  return {
    name,
    tier,
    rarity,
    element,
    path,
    affiliation,
    stats: {
      max: {
        hpLvl80: hpLvl80 || '',
        atkLvl80: atkLvl80 || '',
        devLvl80: devLvl80 || '',
        spdLvl80: spdLvl80 || '',
      },
      min: {
        hpLvl1: hpLvl1 || '',
        atkLvl1: atkLvl1 || '',
        devLvl1: devLvl1 || '',
        spdLvl1: spdLvl1 || '',
      }
    },
    img,
    skills,
    traces,
    floating_minor,
    EidolonSkills
  };
}


async function getCharaList() {
let html = (await axios.get("https://gachax.com/honkai-star-rail/characters/")).data
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