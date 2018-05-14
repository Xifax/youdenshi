<template>

  <div class="parser container">

    <!-- Sentence grid with intermittent colors -->
    <div class="level">
      <div class="section sentence">
        <div class="element" v-for="e in elements"
             v-bind:style="{ color: e.color }"
             v-bind:class="{ minor: e.minor }"
             @mouseover="showInfo(e)">
          {{ e.word.surface_form }}
        </div>
      </div>
    </div>

    <!-- Display element info obtained from semantic tree -->
    <div class="level info" v-if="info">
      <table class="table is-bordered is-narrow">
        <thead>
        <tr>
          <th>Form</th>
          <!-- combines all pos details -->
          <th>Pos</th>
          <th>Conjugated type</th>
          <th>Conjugated form</th>
          <th>Basic form</th>
          <!-- roughly equivalent to pronunciation -->
          <th>Reading</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ info.surface_form }}</td>
          <td>{{ info.pos }}</td>
          <td>{{ info.conjugated_type }}</td>
          <td>{{ info.conjugated_form }}</td>
          <td>{{ info.basic_form }}</td>
          <td>{{ info.reading }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
  import {tokenize} from 'kuromojin'
  import {clipboard} from 'electron'
  import {_} from 'lodash'

  // Roughly correct JCK unicode range
  const japanese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/
  export default {
    name: 'parser',
    data () {
      return {
        // style data
        palette: [
          '#82d4bb',
          '#e56399',
          '#336699',
          '#e08dac',
          '#9bc53d',
          '#fa7921',
          '#e55934',
          '#f25f5c',
          '#457b9d',
          '#2a9d8f',
          '#264653',
          '#50514f'
        ],
        // semantic data
        excluded: [
          // japanese punctuation
          '「',
          '」',
          '。',
          '！',
          '？',
          '、',
          '…',
          '『',
          '』',
          // western punctuation
          '.',
          ',',
          '?',
          '-',
          ':'
          // todo: japanese particles ('no', 'wo', 'wa' and so on)
        ],
        // parsed data
        elements: [],
        info: null
      }
    },
    mounted () {
      console.log('Parser component is working!')
      // clipboard.writeText('「刀の投擲の練習？」「すっぽ抜けただけです」 ')
      clipboard.writeText(`私などは憂鬱性であったらしい。 憂鬱の方は妙に日本が恋しくなり日本が世界一番だといい出す癖がある。 躁狂性の方は反対に日本の悪口をいって心を養う。
小出楢重『めでたき風景』より引用`)
      setTimeout(this.checkClipboard, 1000)
    },
    methods: {
      checkClipboard () {
        setTimeout(this.checkClipboard, 1000)
        let selection = clipboard.readText('selection')
        // Process only new clipboard content
        if (this.oldSelection === selection) {
          return
        }
        this.oldSelection = selection

        if (selection.match(japanese)) {
          tokenize(selection).then(results => {
            // DEBUG ONLY, check how often this section is called
            console.log('Tokenizing...')
            // Rest parsed elements
            this.elements.length = 0
            // Fill elements with separate Japanese words and such
            for (let word of results) {
              let isMinor = this.isMinor(word)
              this.elements.push({
                word: word,
                minor: isMinor,
                // Also generate color for this word
                color: isMinor ? 'gray' : this.nextRandomColor()
              })
            }
          })
        }
      },
      showInfo (e) {
        this.info = e.word
      },
      // Utility methods
      isMinor (e) {
        return _.includes(this.excluded, e.surface_form)
      },
      nextRandomColor () {
        return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
      },
      nextDefinedColor () {
        return _.sample(this.palette)
      }
    }
  }
</script>

<style scoped lang="scss">

  .sentence {
  }

  .element {
    font-size: 2.2em;
    float: left;
  }

  .element:hover {
    cursor: pointer;
    background: lightcyan;
  }

  // minor elements should not be hoverable
  .minor {
    pointer-events: none;
  }

  .info {
  }

</style>