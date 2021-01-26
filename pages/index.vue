<template>
  <div class="container">
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
    >
      <CHeading text-align="center" mb="4">
        Монгол цагаан сар тооцоолуур
      </CHeading>
      <CFlex justify="center" direction="column" align="center">
        <CFlex justify="center" direction="column" align="center">
          <c-input-group size="md">
            <c-input
              v-model="year"
              pr="4.5rem"
              placeholder="Оноо оруулна уу"
            />
            <c-input-right-element width="4.5rem">
              <c-button @click="changeYear">
                ok
              </c-button>
            </c-input-right-element>
          </c-input-group>
        </CFlex>
        <img style="width: 150px; height: 150px" :src="nowImage" fit="cover">
        <span class="text-style">Жил: {{ res.Жил }}</span>
        <span class="text-style">Жаран: {{ res.Жаран }}</span>
        <span class="text-style">Жилийн мэнгэ: {{ res.Жилийн_мэнгэ }}</span>
        <span class="text-style">Шинийн нэгэн: {{ res.Шинийн_нэгэн }}</span>
        <span class="text-style">Өдрийн өнгө: {{ res.Өдрийн_өнгө }}</span>
        <span class="text-style">Өдрийн мэнгэ: {{ res.Өдрийн_мэнгэ }}</span>
        <span class="text-style">Суудал: {{ res.Суудал }}</span>
        <span class="text-style">Битүүний сар: {{ res.Битүүний_сар }}</span>
        <CIconButton
          mr="3"
          mt="4"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          @click="toggleColorMode"
        />
      </CFlex>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CInput,
  CIconButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'
import calculateNewYear from './helper.js'
export default {
  name: 'App',
  components: {
    CBox,
    CInput,
    CIconButton,
    CFlex,
    CHeading
  },
  inject: ['$toggleColorMode', '$chakraColorMode'],
  data () {
    return {
      year: 2021,
      res: {},
      nowImage: '',
      mouseImg: 'https://content.ikon.mn/ikon/dv/mur/1.png',
      cowImg: 'https://content.ikon.mn/ikon/dv/mur/2.png',
      tigerImg: 'https://content.ikon.mn/ikon/dv/mur/3.png',
      rabbitImg: 'https://content.ikon.mn/ikon/dv/mur/4.png',
      dragonImg: 'https://content.ikon.mn/ikon/dv/mur/5.png',
      snakeImg: 'https://content.ikon.mn/ikon/dv/mur/6.png',
      horseImg: 'https://content.ikon.mn/ikon/dv/mur/7.png',
      sheepImg: 'https://content.ikon.mn/ikon/dv/mur/8.png',
      monkeyImg: 'https://content.ikon.mn/ikon/dv/mur/9.png',
      chickenImg: 'https://content.ikon.mn/ikon/dv/mur/10.png',
      dogImg: 'https://content.ikon.mn/ikon/dv/mur/11.png',
      pigImg: 'https://content.ikon.mn/ikon/dv/mur/12.png',
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  head () {
    return {
      title: 'Монгол цагаан сар тооцоолуур',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Монгол цагаан сар тооцоолуур'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://tsagalbar.vercel.app'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Монгол цагаан сар тооцоолуур'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Монгол цагаан сар тооцоолуур'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://content.ikon.mn/ikon/dv/mur/2.png'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://tsagalbar.vercel.app'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Монгол цагаан сар тооцоолуур'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Монгол цагаан сар тооцоолуур'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://tsagalbar.vercel.app'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
  },
  created () {
    this.changeYear()
    this.toggleColorMode()
  },
  methods: {
    changeYear () {
      this.res = calculateNewYear(this.year)
      const salgasanJil = this.res.Жил.split(' ')
      if (salgasanJil[1] === 'хулгана') {
        this.nowImage = this.mouseImg
      } else if (salgasanJil[1] === 'үхэр') {
        this.nowImage = this.cowImg
      } else if (salgasanJil[1] === 'бар') {
        this.nowImage = this.tigerImg
      } else if (salgasanJil[1] === 'туулай') {
        this.nowImage = this.rabbitImg
      } else if (salgasanJil[1] === 'луу') {
        this.nowImage = this.dragonImg
      } else if (salgasanJil[1] === 'могой') {
        this.nowImage = this.snakeImg
      } else if (salgasanJil[1] === 'морь') {
        this.nowImage = this.horseImg
      } else if (salgasanJil[1] === 'хонь') {
        this.nowImage = this.sheepImg
      } else if (salgasanJil[1] === 'бич') {
        this.nowImage = this.monkeyImg
      } else if (salgasanJil[1] === 'тахиа') {
        this.nowImage = this.chickenImg
      } else if (salgasanJil[1] === 'нохой') {
        this.nowImage = this.dogImg
      } else if (salgasanJil[1] === 'гахай') {
        this.nowImage = this.pigImg
      }
    }
  }
}
</script>
