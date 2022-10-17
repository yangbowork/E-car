<script setup>
  import { ref, unref, watch } from 'vue';
  import 'vant/es/image-preview/style';
  import { ImagePreview } from 'vant';
  import 'vant/es/toast/style';
  import { Toast } from 'vant';
  import { useUserStore } from '@/store/modules/userStore';
  import useUploadStore from '@/store/modules/uploadStore';

  const userStore = useUserStore();
  const uploadStore = useUploadStore();

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    // 图片最大大小，以kb为单位
    maxCount: {
      type: Number,
      default: Infinity,
    },
    // 图片最大数量
    maxSize: {
      type: Number,
      default: Infinity,
    },
    uploadPosition: {
      type: String,
      required: true,
    },
    placeholderText: {
      type: String,
      default: '点击上传图片',
    },
  });

  const { modelValue } = toRefs(props);
  console.log('modelValue');
  console.log(modelValue.value);

  // const pictList = ref([]);
  // watch(
  //   () => props.modelValue,
  //   (newProps) => {
  //     console.log('更新了', newProps);
  //     modelValue = newProps;
  //   },
  // );

  // const pictList = computed(() => {
  //   console.log('更新了', props.modelValue);
  //   return props.modelValue;
  // });

  const uploadIcon = ref();

  const emit = defineEmits(['update:modelValue', 'onUpload']);

  onMounted(() => {
    uploadStore.isGetCosInfo();
    window.takePictureCallBack = takePictureCallBack;
  });

  const setModelValue = (value) => {
    console.log('setModelValue');
    console.log(value);
    // emit('update:modelValue', value);
    emit('onUpload', value);
  };

  // 预览图片
  const preViewImage = (index) => {
    ImagePreview({
      images: modelValue.value,
      startPosition: index,
    });
  };

  // 删除图片
  const clearPic = (index) => {
    console.log('clearPic');
    const arr = modelValue.value;
    arr.splice(index, 1);
    console.log(modelValue.value);
    console.log(arr);
    setModelValue(arr);
  };

  const chooseType = () => {
    // 客户端交互 获取权限
    if (userStore.isIOS) {
      // 通过校验后，主动触发 input 的 click 事件
      uploadIcon.value.removeAttribute('capture');
      uploadIcon.value.click();
    } else {
      showShare.value = true;
    }
  };

  const showShare = ref(false);
  const onSelect = (name) => {
    switch (name) {
      case '相机':
        appPhotograph();
        break;
      case '相册':
        // takePictureCallBack(
        //   'https://huangniu-1251117131.cos.ap-shanghai.myqcloud.com/storeLive/20221017/1665985490397_8d83b6278865dc5593e055.jpg',
        // );
        openImageChooserActivity();
        break;
    }
    showShare.value = false;
  };

  // 安卓
  // 打开摄像头
  const appPhotograph = () => {
    console.log('takePicture');
    window.call.takePicture();
  };

  // 打开相册
  const openImageChooserActivity = () => {
    console.log('openImageChooserActivity');
    window.call.openImageChooserActivity();
  };

  // 获取图片
  const takePictureCallBack = (url) => {
    console.log('takePictureCallBack', url);
    console.log(modelValue.value);
    console.log(props);
    console.log(url);
    addImage(url);
  };

  // IOS
  const uploadImg = async (e) => {
    // 检查是否有文件被选中
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }

    // 检查文件是否过大
    const file = files[0];
    if (file.size / 1024 > props.maxSize) {
      Toast(`文件大小不能超过 ${props.maxSize}kb`);
      return;
    }

    // 判断文件类型：必须是图片才处理
    if (!/^image\//.test(file.type)) {
      Toast(`请上传图片`);
      // 不是图片的话，清除数据
      uploadIcon.value.value = '';
      return;
    }

    await uploadStore.cosUploadFile(props.uploadPosition, file, 1, (currentFile) => {
      const url = currentFile.url;
      addImage(url);
    });
  };

  // 添加图片
  const addImage = (url) => {
    console.log('addImage');
    let arr = modelValue.value;
    console.log(modelValue.value);
    console.log(url);
    // arr.push(url);
    // console.log(arr.length);
    // setModelValue(arr);
    // emit('onUpload');
  };
</script>

<template>
  <div class="upload-wrap">
    <slot name="upload">
      <div class="upload-item">
        <template v-if="modelValue.length > 0">
          <div class="pic" v-for="(value, index) in modelValue" :key="'img' + index">
            <van-icon class="close" @click.stop="clearPic(index)" name="cross" />
            <img :src="value" @click="preViewImage(index)" alt="" />
          </div>
        </template>
        <div class="photo" @click.stop="chooseType" v-if="modelValue.length < props.maxCount">
          <van-icon name="photograph" />
          <div class="info">{{ props.placeholderText }}</div>
        </div>
      </div>
    </slot>
    <input
      id="uploadIcon"
      ref="uploadIcon"
      @change="uploadImg($event)"
      type="file"
      accept="image/*"
      style="display: none"
      capture="camera"
    />
  </div>
  <van-overlay :show="showShare" @click="showShare = false">
    <div class="wrapper" @click.stop>
      <div class="options">
        <div class="item" @click.stop="onSelect('相机')">
          <div class="title">打开相机拍摄</div>
          <img src="@/assets/img/photo.png" alt="" />
        </div>
        <div class="item" @click.stop="onSelect('相册')">
          <div>从手机相册中选取</div>
          <img src="@/assets/img/photo-album.png" alt="" />
        </div>
      </div>
      <div class="cancel" @click="showShare = false">取消</div>
    </div>
  </van-overlay>
</template>

<style lang="scss" scoped>
  .upload-wrap {
    width: 100%;

    .photo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 180px;
      border: 1px dashed #bec2cc;
      border-radius: 5px;

      .van-icon-photograph {
        font-size: 50px;
        color: #bec2cc;
      }
      .info {
        margin-top: 6px;
        font-size: 16px;
        color: #bec2cc;
      }
    }

    .pic {
      position: relative;
      height: 180px;

      .close {
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 10px;
        color: #bec2cc;
        font-size: 20px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .pic + .pic {
      margin-top: 10px;
    }

    .pic + .photo {
      margin-top: 10px;
    }
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    .options {
      margin: 0 20px;
      background-color: #fff;
      border-radius: 5px;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 55px;
        .title {
          font-size: 14px;
          color: #162641;
        }
        img {
          width: 30px;
        }
      }

      .item + .item {
        border-top: 1px solid #f0f0f0;
      }
    }
    .cancel {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin: 10px 20px 20px;
      color: #2662f0;
      background-color: #fff;
      border-radius: 5px;
    }
  }
</style>
