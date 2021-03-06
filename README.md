# youdenshi

> Lightweight GUI parser for japanese clipboard text

Should monitor clipboard for japanese characters 
and parse the contents into colorful representation with 
the option to lookup some info for resulting sentence elements via mouse-over.

Tentative workflow should look something like this:

- copy large chunk of japanese text
- parse sentence into structural elements highlighted by color 
- ignore common particles and punctuation
- lookup unknown words
- save some of those to db
- export resulting items for further study (Anki or similar)

#### Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
yarn dev

# build electron application for production
yarn build

# run unit & end-to-end tests
yarn test

# lint all JS/Vue component files in `src/`
yarn lint
```

### Usage

Dev version will automatically copy test sentence for debug purposes.
You may try to copy some kind of japanese word, sentence or text. 
For example:

> 私などは憂鬱性であったらしい。
憂鬱の方は妙に日本が恋しくなり日本が世界一番だといい出す癖がある。
躁狂性の方は反対に日本の悪口をいって心を養う。
小出楢重『めでたき風景』より引用


### Roadmap

- more Electron goodness: tray, menus and such
- add persistence: store items in db and so on
- export session/items to csv/Anki compatible format
- try different APIs for looking up data on the fly (jisho/tangorin/yourei/kotobank)
- lookup elements from local sqlite DB, without additional web queries
- import similar kanji data from Odyssey or similar DB
- rearrange UI using popups, shrink vertical space
- smart autosize based on window position
- fix fontawesome
- change color palette for parsed words

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
