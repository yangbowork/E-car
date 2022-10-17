<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getImgUrl, callPhone } from '@/utils/index';

  const route = useRoute();
  const router = useRouter();

  // 0:待审批, 1: 审批成功 2: 已驳回
  const state = ref(0);

  state.value = route.query.state as any;

  const reapply = () => {
    router.push('/info');
  };
</script>

<template>
  <div class="result">
    <!-- 0 递交申请 -->
    <div class="state" v-if="state == 0">
      <img :src="getImgUrl('success.png')" alt="" />
      <div class="title">您已成功申请免费开通浦发银行E汽融产品，请耐心等待审批结果~</div>
      <div class="info">如您有任何疑问，请咨询：<span class="call-phone" @click="callPhone('13564952504')">13564952504</span> </div>
    </div>

    <!-- 1 申请成功 -->
    <div class="state" v-if="state == 1">
      <img :src="getImgUrl('success.png')" alt="" />
      <div class="title">审批通过</div>
      <div class="info">如您有任何疑问，请咨询：<span class="call-phone" @click="callPhone('13564952504')">13564952504</span> </div>
    </div>

    <!-- 2 申请驳回 -->
    <div class="state" v-if="state == 2">
      <img :src="getImgUrl('fail.png')" alt="" />
      <div class="title">非常抱歉，您的免费开通浦发银行E汽融产品申请已被驳回~</div>
      <div class="info">如您有任何疑问，请咨询：<span class="call-phone" @click="callPhone('13564952504')">13564952504</span> </div>
      <van-button plain type="primary" @click="reapply"> 重新申请 </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .result {
    margin-top: 110px;
    .state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;

      img {
        width: 60px;
        margin-bottom: 18px;
      }

      .title {
        max-width: 314px;
        height: 48px;
        margin-bottom: 16px;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
      }

      .info {
        margin-bottom: 60px;
        color: rgba(114, 125, 139, 1);
        font-size: 13px;

        .call-phone {
          color: #2d74f3;
          cursor: pointer;
          text-decoration: underline;
        }
      }

      .van-button {
        width: 100%;
      }
    }
  }
</style>
