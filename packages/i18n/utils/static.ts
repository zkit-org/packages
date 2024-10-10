import path from 'path';
import unescapeJs from 'unescape-js';
import gulp from 'gulp';
import jet from 'fs-jetpack';
import chalk from "chalk";
import replace from "gulp-replace";

const dirVars = {
    i18nDir: path.resolve(process.cwd(), 'i18n'),
    buildDir: path.resolve(process.cwd(), 'out')
};

let base = 'en-us';
let staticDir = 'assets';
let data: any = {};
let supports: string[] = [];

function langKeyHandler(gulpInstance: any, lang: string) {
    const currLangObj = data[lang];
    return gulpInstance
        .pipe(replace(/(?:{|%7B)#(((?!({|%7B)#).)*?)#(}|%7D):for\((.*?)\)/g, (res) => {
            const result = unescapeJs(res);
            return result.replace(/{#(.*?)#}:for\((.*?)\)/g, (_, $1, $2) => {
                return currLangObj[`${$1}:for(${$2})`] || $1;
            })
        }))
        .pipe(replace(/(?:{|%7B)#(.*?)#(}|%7D)/g, (res, tar) => {
            const uKey = unescapeJs(tar);
            return currLangObj[uKey] || tar;
        }))
        .pipe(replace(/%7B\/#LANG#}/g, lang))
        .pipe(replace(/{\/#LANG#}/g, lang))
        .pipe(replace(/\/_next\//g, (res, tar) => {
            return '/' + staticDir + '/' + lang + '/';
        }));
}

function buildFileHandler() {
    const nextStaticDir = path.resolve(dirVars.buildDir, '_next');
    const jobs = supports.map((lang) => {
        return new Promise((resolve) => {
            // 处理HTML
            const targetDir = path.resolve(dirVars.i18nDir, lang);
            langKeyHandler(gulp.src(['**/*'], {
                cwd: path.resolve(dirVars.buildDir, lang)
            }), lang)
                .pipe(gulp.dest(targetDir))
                .on('end', () => {
                    if (lang === base) {
                        jet.copy(targetDir, dirVars.i18nDir, {
                            matching: ['**/*.html', '**/*.txt'],
                            overwrite: true
                        });
                    }
                    console.log(chalk.green(`${lang} done`), chalk.red(`${lang === base ? '[base]' : ''}`));
                    resolve(null);
                });
            // 处理静态资源
            const assetsDir = path.resolve(dirVars.i18nDir, staticDir + '/' + lang);
            langKeyHandler(gulp.src(['**/*.js','**/*.css'], {
                cwd: nextStaticDir
            }), lang).pipe(gulp.dest(assetsDir))
            jet.copy(nextStaticDir, assetsDir, {
                matching: ['**/media/**/*',],
                overwrite: true
            });
        });
    });
    return Promise.all(jobs);
}

function staticFileHandler() {
    jet.copy(dirVars.buildDir, dirVars.i18nDir, {
        matching: ['*.ico', "*.png", "site.webmanifest", 'assets/**/*',],
        overwrite: true
    });
    jet.remove(path.resolve(dirVars.i18nDir, '_next'));
}

export type BuildConfig = {
    base?: string;
    supports?: string[];
    staticDir?: string;
    data?: any;
}

const init = (config: BuildConfig) => {
    base = config.base || 'en-us';
    supports = config.supports || ['en-us'];
    staticDir = config['staticDir'] || 'assets';
    const defaultData: any = {};
    supports.forEach((key) => {
        defaultData[key] = {};
    })
    data = config.data || defaultData;
}

const build = async (config: BuildConfig) => {
    init(config);
    jet.remove(dirVars.i18nDir);
    staticFileHandler();
    await buildFileHandler();
    console.log(chalk.yellow('all done'));
}

export default build;
