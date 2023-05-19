const axios = require("axios");
const cheerio = require("cheerio");

async function hentai() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/'+page)
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            resolve(hasil)
        })
    })
}


module.exports = {
	name: "hentai",
	cmd: ["hentai","hentaivid","sfm"],
	category: "weebs",
	desc: "Get random video from https://sfmcompile.club",
	async handler(m, { conn }) {
	  await m.reply(response.wait);
	  var info = await hentai()
      video = info[Math.floor(Math.random()*info.length)];
      let text = `
RANDOM HENTAI

⭔ Title: ${video.title}
⭔ Category : ${video.category}
⭔ Link : _${video.link}_
`
		await conn.sendMessage(m.from,{ video: { url: video.video_1 }, caption: text},{ quoted: m });
	},
};


