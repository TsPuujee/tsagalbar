<template>
  <div class="container">
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      flex-dir="column"
      justify-content="center"
    >
      <CHeading as="h4" size="md" text-align="center" mb="4" mt="4">
        Дорнын зурхай
      </CHeading>
      <CFlex justify="center" direction="column" align="center">
        <CFlex justify="center" direction="column" align="center">
          <DatePicker :date="pickerDate" :option="option" @change="changeDate" />
        </CFlex>
        <CStack>
          <CBox justify="center" direction="column" align="center">
            <img style="width: 150px; height: 150px" :src="require('../assets/' + (res.jil_animal_number + 1) + '.png')">
            <span class="text-style">{{ res.jaran + '-р жаран' }}</span>
            <span class="text-style">{{ res.jil_cycle_name + ' хэмээх ' + res.jil + ' жил' }}</span>
          </CBox>
          <CBox justify="center" direction="column" align="center">
            <img style="width: 150px; height: 150px" :src="require('../assets/' + (res.sar_animal_number + 1) + '.png')">
            <span class="text-style">{{ res.sar_menge + ' мэнгэтэй' }}</span>
            <span class="text-style">{{ res.sar }}</span>
            <span class="text-style">{{ res.sar_jil + ' сар' }}</span>
          </CBox>
          <CBox justify="center" direction="column" align="center">
            <img style="width: 150px; height: 150px" :src="require('../assets/' + (res.odor_animal_number + 1) + '.png')">
            <span class="text-style">{{ 'Билгийн тооллийн ' + res.odor_bilgiin_toolol }}</span>
            <span class="text-style">{{ res.odor_suudal + ' суудалтай' }}</span>
            <span class="text-style">{{ res.odor_menge + ' мэнгэтэй' }}</span>
            <span class="text-style">{{ res.odor_animal + ' өдөр' }}</span>
          </CBox>
        </CStack>
        <CStack is-inline>
          <CIconButton
            mr="3"
            mt="4"
            :icon="'chevron-left'"
            :aria-label="`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } mode`"
            @click="$router.push('/')"
          />
          <CIconButton
            mr="3"
            mt="4"
            :icon="colorMode === 'light' ? 'moon' : 'sun'"
            :aria-label="`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } mode`"
            @click="toggleColorMode"
          />
        </CStack>
      </CFlex>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CStack,
  CBox,
  CIconButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'
import dayjs from 'dayjs'
import DatePicker from 'vue-datepicker'
import lunarDate from './lunarDate.js'
export default {
  name: 'App',
  components: {
    CStack,
    CBox,
    CIconButton,
    CFlex,
    DatePicker,
    CHeading
  },
  inject: ['$toggleColorMode', '$chakraColorMode'],
  data () {
    return {
      option: {
        type: 'day',
        week: ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'],
        month: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арваннэгдүгээр сар', 'Арванхоёрдугаар сар'],
        format: 'YYYY-MM-DD',
        placeholder: 'Өдрөө сонгоно уу',
        inputStyle: {
          display: 'inline-block',
          padding: '6px',
          'line-height': '22px',
          'font-size': '16px',
          border: '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          color: '#2d3748'
        },
        color: {
          header: '#2d3748',
          headerText: '#e7e9ed'
        },
        buttons: {
          ok: 'Сонгох',
          cancel: 'Буцах'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      date: dayjs().format('YYYY-MM-DD'),
      pickerDate: {
        time: dayjs().format('YYYY-MM-DD')
      },
      year: 2000,
      month: 1,
      day: 1,
      res: {},
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
      title: 'Дорнын зурхай',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Тухайн өдрийн мэнгэ, суудал, жилийг монгол зурхайн аргаар тооцоолно'
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
          content: 'Дорнын зурхай'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Тухайн өдрийн мэнгэ, суудал, жилийг монгол зурхайн аргаар тооцоолно'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://i.imgur.com/Ctrc7XY.jpg'
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
          content: 'Тухайн өдрийн мэнгэ, суудал, жилийг монгол зурхайн аргаар тооцоолно'
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
    if (this.colorMode !== 'dark') {
      this.toggleColorMode()
    }
    this.changeYear()
  },
  methods: {
    changeDate () {
      this.date = this.pickerDate.time
      this.changeYear()
    },
    changeYear () {
      if (this.year > 1000 && this.year < 9999) {
        this.year = parseInt(dayjs(this.date).format('YYYY'))
        this.month = parseInt(dayjs(this.date).format('MM'))
        this.day = parseInt(dayjs(this.date).format('DD'))
        this.res = lunarDate(this.year, this.month, this.day)
      } else {
        this.$toast({
          title: 'Анхааруулга.',
          description: 'Та буруу он оруулсан байна.',
          status: 'warning',
          duration: 2000,
          isClosable: true
        })
      }
    }
  }
}
</script>
