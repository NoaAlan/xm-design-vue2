<template>
  <div class="" style="margin:0 -20px">
    <div class="demo-nav" style="">
      <div class="demo-nav__title">{{ title }}</div>
      <svg @click="handleBack" viewBox="0 0 1000 1000" class="demo-nav__back"><path fill="#969799" fill-rule="evenodd" d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z"></path></svg>
      <div v-if="isPc && dependClient" class="absolute r20 t20 cp" style="color: #3b8ff6" @click="showCode = true">扫码</div>
    </div>
    <div class="pt20">
      <slot />
    </div>
  </div>
</template>

<script>
import router from './router'

export default {
  props: {
    title: String,
    dependClient: Boolean
  },
  data (props) {
    const isPc = !/hwminiapp/.test(navigator.userAgent)
    const showCode = isPc && props.dependClient
    const codeUrl = ''

    return {
      isPc,
      showCode,
      codeUrl
    }
  },

  created () {
    if (this.showCode) {
      // QRCode.toDataURL(JSON.stringify({
      //   data: {
      //     url: location.href,
      //     appId: -10000
      //   },
      //   target: 'smallApp',
      //   isExperienceVersion: true
      // }))
      //   .then(url => {
      //     this.codeUrl = url
      //   })
    }
  },

  methods: {
    handleBack () {
      this.$router.push('/')
      // 通知 docs 也返回
      window.top.docsRouter && window.top.docsRouter.push('/')
    }
  }
}
</script>
