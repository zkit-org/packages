import path from 'path';
import jet from 'fs-jetpack';

const getPath = (url) => {
    // const path = new URL(url, import.meta.url,).toString().replace('file://', '');
    return path.resolve(process.cwd(), url);
}

const dataLoader = (config) => {
    const {langDir, variablePath} = config;
    // vars
    const varsData = {};
    const vars = jet.read(variablePath, 'json');
    Object.keys(vars).forEach((lang) => {
        if(!varsData[lang]) varsData[lang] = {};
        Object.assign(varsData[lang], vars[lang]);
    })
    // all
    const allJSON = [];
    allJSON.push(...jet.find(langDir, { matching: ['*.json', '!variable.json', '!special.json'] }));
    const maps = varsData;
    const langDoc = {};
    allJSON.forEach((filePath) => {
        const json = jet.read(filePath, 'json');
        const lang = filePath.substring(filePath.length - 10, filePath.length - 5)
        if (path.basename(filePath).split('-').pop() === 'Tdoc.json') {
            langDoc[lang] = json[lang];
        }
        if (maps[lang]) { // 翻译存在再进行合并
            maps[lang] = Object.assign(maps[lang], json[lang]);
        }
    });
    Reflect.ownKeys(maps).forEach((lang) => {
        Object.assign(maps[lang] || {}, langDoc[lang] || {});
    });
    return maps;
}
const langData = dataLoader({
    langDir: getPath('../../packages/i18n-data/lang'),
    variablePath: getPath('../../packages/i18n-data/lang/variable.json')
});

export default langData;
