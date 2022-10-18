<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { getImgUrl } from '@/utils/index';
  import { applyStatus } from '@/api/index';

  const router = useRouter();

  applyStatus().then((res) => {
    console.log((res as any).data);
    console.log((res as any)?.data?.state);

    if ((res as any)?.data?.state !== undefined && (res as any).data.state !== 20) {
      router.push({ path: '/result', query: { state: (res as any).data.state } });
    }
  });

  const nextPage = () => {
    router.push('/info');
  };
</script>

<template>
  <div class="index container">
    <div class="inner">
      <div class="title">最高可申请额度(元)</div>
      <img class="money" :src="getImgUrl('home-money.png')" alt="" />
      <div class="tip">服务费日息万2-2.5，加盟商可享最高优惠</div>
      <van-button round block type="primary" @click="nextPage"> 立即申请 </van-button>
    </div>
  </div>
</template>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background: url('@/assets/img/home-bg.png') no-repeat;
    background-size: 100%;
    overflow: hidden;
    background-color: #f7f8fa;

    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 384px 12px 0;
      padding: 24px 28px 34px;
      background: #ffffff;
      border-radius: 4px;

      .title {
        margin-bottom: 18px;
        font-size: 16px;
        color: #2b303e;
      }

      .money {
        margin-bottom: 12px;
        width: 200px;
      }

      .tip {
        margin-top: 12px;
        margin-bottom: 40px;
        font-size: 15px;
        color: #7c818c;
      }

      .van-button {
        height: 55px !important;
        font-weight: 600;
        font-size: 19px !important;
      }
    }
  }
</style>
