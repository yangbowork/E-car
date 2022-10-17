<script setup>
  import useUploadStore from '@/store/modules/uploadStore';
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    // 内框大小
    width: {
      type: String,
      default: 'calc(100vw - 44px)',
    },
    // 图片最多上传数量
    maxCount: {
      type: Number,
      default: Infinity,
    },
    // 图片最大大小，以kb为单位
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

  const emit = defineEmits(['update:modelValue', 'afterRead', 'clickUpload', 'clickPreview']);

  const uploadStore = useUploadStore();

  // IOS调用

  // 图片超出大小后回调
  const onOversize = (file) => {
    console.log(file);
    Toast(`文件大小不能超过 ${maxCount}kb`);
  };

  // 文件读取完成后的回调函数
  const afterRead = async (file) => {
    console.log(file);
    let fileObject = {};
    await uploadStore.cosUploadFile(props.uploadPosition, file, 1, (currentFile) => {
      fileObject = currentFile;
    });
    console.log(fileObject);

    emit('afterRead', fileObject);
  };
  // 点击上传区域时触发
  const clickUpload = () => {
    emit('clickUpload');
  };
  // 点击预览图时触发
  const clickPreview = () => {
    emit('clickPreview');
  };
</script>

<template>
  <div class="van-upload">
    <van-uploader
      :modelValue="modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
      :max-count="props.maxCount"
      :max-size="props.maxSize * 1024"
      @oversize="onOversize"
      :after-read="afterRead"
      @click-upload="clickUpload"
      @click-preview="clickPreview"
      :disabled="modelValue.length >= 1"
    >
      <div class="photo" :style="`width:${width}`">
        <van-icon name="photograph" />
        <div class="info">{{ props.placeholderText }}</div>
      </div>
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
  .photo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // width: calc(100vw - 50px);
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
</style>
