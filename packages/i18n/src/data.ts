import path from 'path';
import jet from 'fs-jetpack';

const getPath = (url: string) => {
    // const path = new URL(url, import.meta.url,).toString().replace('file://', '');
    return path.resolve(process.cwd(), url);
}

export type DataLoaderConfig = {
    langDir: string;
    variablePath: string;
}

export const dataLoader = (config: DataLoaderConfig) => {
    const {langDir, variablePath} = config;
    // vars
    const varsData: Record<string, any> = {};
    const vars = jet.read(variablePath, 'json');
    Object.keys(vars).forEach((lang) => {
        if(!varsData[lang]) varsData[lang] = {};
        Object.assign(varsData[lang], vars[lang]);
    })
    // all
    const allJSON = [];
    allJSON.push(...jet.find(langDir, { matching: ['*.json', '!variable.json', '!special.json'] }));
    const maps = varsData;
    const langDoc: Record<string, any> = {};
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
        Object.assign(maps[lang as string] || {}, langDoc[lang as string] || {});
    });
    return maps;
}
