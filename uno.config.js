import {defineConfig, presetAttributify, presetIcons, presetUno} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons(),
        presetAttributify()
    ],
    rules: [
        [/^width-(\d+)$/, ([, d]) => ({'width': `${Number(d)}px`})],
        ['flex-c-c', {display: "flex", "justify-content": "center", "align-items": "center"}],
        ['flex-sb-c', {display: "flex", "justify-content": "space-between", "align-items": "center"}],
        ['flex-aic', {display: "flex", "align-items": "center"}],
        ['flex-jcsb', {display: "flex", "justify-content": "space-between"}],
        [/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({"font-size": `${d}px`})],
        [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({"line-height": `${d}`})],
        [/^m-(\d+)$/, ([, d]) => ({margin: `${Number(d)}px`})],
        [/^mt-(\d+)$/, ([, d]) => ({"margin-top": `${Number(d)}px`})],
        [/^mb-(\d+)$/, ([, d]) => ({"margin-bottom": `${Number(d)}px`})],
        [/^ml-(\d+)$/, ([, d]) => ({"margin-left": `${Number(d)}px`})],
        [/^mr-(\d+)$/, ([, d]) => ({"margin-right": `${Number(d)}px`})],
        [/^mlr-(\d+)$/, ([, d]) => ({margin: `0 ${Number(d)}px`})],
        [/^mtb-(\d+)$/, ([, d]) => ({margin: `${Number(d)}px 0`})],
        [/^mrl-(\d+)$/, ([, d]) => ({margin: `0 ${Number(d)}px`})],
        [/^mbt-(\d+)$/, ([, d]) => ({margin: `${Number(d)}px 0`})],
        [/^p-(\d+)$/, ([, d]) => ({padding: `${Number(d)}px`})],
        [/^pt-(\d+)$/, ([, d]) => ({"padding-top": `${Number(d)}px`})],
        [/^pb-(\d+)$/, ([, d]) => ({"padding-bottom": `${Number(d)}px`})],
        [/^pl-(\d+)$/, ([, d]) => ({"padding-left": `${Number(d)}px`})],
        [/^pr-(\d+)$/, ([, d]) => ({"padding-right": `${Number(d)}px`})],
        [/^plr-(\d+)$/, ([, d]) => ({padding: `0 ${Number(d)}px`})],
        [/^ptb-(\d+)$/, ([, d]) => ({padding: `${Number(d)}px 0`})],
        [/^prl-(\d+)$/, ([, d]) => ({padding: `0 ${Number(d)}px`})],
        [/^pbt-(\d+)$/, ([, d]) => ({padding: `${Number(d)}px 0`})],
        [/^font-(\d+)$/, ([, d]) => ({'font-size': `${Number(d)}px`})],

    ]
    // ...UnoCSS选项
})
