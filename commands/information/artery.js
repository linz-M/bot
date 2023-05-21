const { default: axios } = require('axios');
const cheerio = require('cheerio');

module.exports = {
    name: 'artery',
    param: '<name>',
    cmd: ['artery-info','artery'],
    category: 'information',
    query: true,
    async handler(m, {conn, text}){
    	q = text
    	await m.reply(response.wait)
    	if(text === "list") {
    	let chara = [];
		for (let color of await getCharaList()){chara.push(({title: `${color.name}`, rowId: `#artery ${color.name}`}))}
		const sections = [{title: "</Hello World>",rows: chara}]
		const listMessage = {
		  text: `*List of Artery Gear: Fusion Characters*`,
		  footer: "choose what you want",
		  title: "Artery Gear: Fusion",
		  buttonText: "search",
		  sections
		}
		await conn.sendMessage(m.from, listMessage, { quoted: m })
    	} else if(!q === "list") {
    	try {
		ddb = await getDetail(q.toLowerCase().replace(/\s/g, "-"))
		stri_skil = ""
		    for (let color of ddb.skill) {
		    stri_skil += `- *Name :* ${color.name}\n`
		    stri_skil += `- *Desc :* ${color.desc}\n\n`
		    }
		    rarit = ""
		    for (var i = 0; i < Number(ddb.rarity); i++) {
		    rarit += `${btg}`
		    }
		    
		teksnya = `
*# About*
*• Name :* ${ddb.name}.
*• Class :* ${ddb.class}
*• Summon :* ${ddb.summon}
*• Element :* ${ddb.element}
*• Rarity :* ${rarit}
*• Series Model :* ${ddb.series_model}


*# Stats*
*• Health :* _${ddb.stats.health}_
*• Attack :* _${ddb.stats.attack}_
*• Defense :* _${ddb.stats.defense}_
*• Speed :* _${ddb.stats.speed}_
*• Crit Rate :* _${ddb.stats.crit_rate}_
*• Crit Damage :* _${ddb.stats.crit_damage}_
*• Assisting Atk :* _${ddb.stats.assisting_atk}_
*• Accuracy :* _${ddb.stats.accuracy}_
*• Resistance:* _${ddb.stats.resistance}_



*# Skills*
${stri_skil}

*# Overview*
${ddb.overview}
`
		conn.sendMessage(m.from, { image: { url: ddb.image }, caption: teksnya }, { quoted: m })
		} catch (e) {
		m.reply(e)
		} 
        } else {
		let chara = [];
		for (let color of await getCharaList().name){chara.push(({title: `${color.name}`, rowId: `#artery ${color.name}`}))}
		const sections = [{title: "</Hello World>",rows: chara}]
		const listMessage = {
		  text: `*List of Artery Gear: Fusion Characters`,
		  footer: "choose what you want",
		  title: "Artery Gear: Fusion",
		  buttonText: "search",
		  sections
		}
		await conn.sendMessage(m.from, listMessage, { quoted: m })
        }
    }
}




async function getCharaList() {
let html = (await axios.get("https://gachax.com/artery-gear/characters/")).data
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



async function getDetail(qu){
const response = await axios.get('https://gachax.com/artery-gear/character/'+ qu + '/');
    const $ = cheerio.load(response.data);
    img = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > img").attr('src');
    hp = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(1)").text().split('HEALTH')[1].replace(/\s+/g,'').trim()
	atk = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(2)").text().split('ATTACK')[1].replace(/\s+/g,'').trim()
	def = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(3)").text().split('DEFENSE')[1].replace(/\s+/g,'').trim()
	speed = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(4)").text().split('SPEED')[1].replace(/\s+/g,'').trim()
	crit_rate = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(5)").text().split('CRIT RATE')[1].replace(/\s+/g,'').trim()
	crit_damage = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(6)").text().split('CRIT DAMAGE')[1].replace(/\s+/g,'').trim()
	asst_atk = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(7)").text().split('ASSISTING ATK')[1].replace(/\s+/g,'').trim()
	acc = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(8)").text().split('ACCURACY')[1].replace(/\s+/g,'').trim()
	res = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center.mmt-40 > div:nth-child(6) > div > div:nth-child(9)").text().split('RESISTANCE')[1].replace(/\s+/g,'').trim()
	nama = $("#app > div > section.chess-bg.pb-30 > div > div.pure-g.hide-md > div:nth-child(1) > h1").text().trim() + " (" + $("#app > div > section.chess-bg.pb-30 > div > div.pure-g.hide-md > div:nth-child(1) > div").text().trim() + ")"//.replace(/\s+/g,' ')
	rarity = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.mt-20.center-mobile > div > div:nth-child(1) > div").text().trim()
	Class = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.mt-20.center-mobile > div > div:nth-child(2) > div > span").text().trim()
	element = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.mt-20.center-mobile > div > div:nth-child(3) > span").text().trim()
	summon = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.mt-20.center-mobile > div > div:nth-child(4) > span").text().trim()
	series_model = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.mt-20.center-mobile > div > div:nth-child(5) > span").text().trim()
	const selectors = Array.from($("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.page-box > div"));
    let skills = [];
    for (let i = 0; i < selectors.length; i++) {
    skills.push({
    name: $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.page-box > div:nth-child(" + Number(i+1) + ") > div.pure-u-1.pure-u-md-4-5.pure-u-lg-7-8.text-left > div.skill-title.center-mobile").text().trim(),
    desc: $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.page-box > div:nth-child(" + Number(i+1) + ") > div.pure-u-1.pure-u-md-4-5.pure-u-lg-7-8.text-left > div:nth-child(3)").text()//.replace(/(<([^>]+)>)/ig,'').replace(/\n/g, " ");
    //        $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-left > div > div.page-box > div:nth-child(2) > div.pure-u-1.pure-u-md-4-5.pure-u-lg-7-8.text-left > div:nth-child(3) > p")
    })}
    
	overview = $("#app > div > section:nth-child(4) > div > div > div.pb-30 > p").text()
	pinal = {
    name: nama,
    image: img,
    class: Class,
    rarity: rarity,
    summon: summon,
    element: element,
    overview: overview,
    series_model: series_model,
    stats: {
    health: hp,
    attack: atk,
    defense: def,
    speed: speed,
    crit_rate: crit_rate,
    crit_damage: crit_damage,
    assisting_atk: asst_atk,
    accuracy: acc,
    resistance: res
    },
    skill: skills
    }
    return pinal
}