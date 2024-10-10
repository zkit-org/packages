import langData from './data.js';
const LANG = (process.env.UI_LANG || '').match(/^\w{2}-\w{2}$/) ? process.env.UI_LANG : 'en-us';
const loader = (source) => {
    return source.replace(/{#(.*?)#}:for\((.*?)\)/g, (_, $1, $2) => {
        return langData[LANG][`${$1}:for(${$2})`] || $1;
    }).replace(/{#(.*?)#}/g, (_, $1) => {
        let _str;
        switch ($1) {
            case 'LANG':
                _str = LANG;
                break;
            default:
                _str = langData[LANG][$1] || $1;
        }
        return _str;
    });
};

export default loader;
