<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { Ref } from 'vue';
  import { isEmpty } from '@/utils/index';
  import { applyData, commitApply } from '@/api/info';
  import SelfUploader from '@/components/SelfUploader/index.vue';

  const router = useRouter();
  const loading = ref(false);

  const form: Ref<any> = ref({
    businessLicense: [],
    legalIdCard: [],
    operatorIdCard: [],
    licensePermit: [],
    dealerName: '',
    contactPerson: '',
    contactPhone: '',
  });

  const uploadFileDictionary = '/e-car-finance/info';

  onMounted(() => {
    getData();
  });

  const isEmptyStrToArr = (val) => {
    return isEmpty(val) ? [] : [val];
  };

  const isEmptyArrToStr = (arr) => {
    return Array.isArray(arr) ? (arr.length > 0 ? arr[0] : '') : '';
  };

  // 获取数据
  const getData = async () => {
    await applyData().then((res: any) => {
      res = res.data;
      form.value.businessLicense = isEmptyStrToArr(res.businessLicense);
      form.value.legalIdCard = isEmptyStrToArr(res.legalIdCard);
      form.value.operatorIdCard = isEmptyStrToArr(res.operatorIdCard);
      form.value.licensePermit = isEmptyStrToArr(res.licensePermit);
      form.value.dealerName = res.dealerName;
      form.value.contactPerson = res.contactPerson;
      form.value.contactPhone = res.contactPhone;
    });
  };

  const submitForm = () => {
    if (form.value.businessLicense.length === 0) {
      ElMessage({
        message: '请上传营业执照~',
        type: 'error',
      });
      return;
    }
    if (form.value.legalIdCard.length === 0) {
      ElMessage({
        message: '请上传法定代表人身份证~',
        type: 'error',
      });
      return;
    }
    if (form.value.operatorIdCard.length === 0) {
      ElMessage({
        message: '请上传经办人身份证~',
        type: 'error',
      });
      return;
    }
    if (form.value.licensePermit.length === 0) {
      ElMessage({
        message: '请上传开户许可证~',
        type: 'error',
      });
      return;
    }
    loading.value = true;
    const params = {
      businessLicense: isEmptyArrToStr(form.value.businessLicense),
      legalIdCard: isEmptyArrToStr(form.value.legalIdCard),
      operatorIdCard: isEmptyArrToStr(form.value.operatorIdCard),
      licensePermit: isEmptyArrToStr(form.value.licensePermit),
      dealerName: form.value.dealerName,
      contactPerson: form.value.contactPerson,
      contactPhone: form.value.contactPhone,
    };
    commitApply(params)
      .then((res: any) => {
        if (res.code == 200) {
          router.push({ path: '/result', query: { state: 0 } });
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const onUpload = (key, val) => {
    console.log('onUpload');
    console.log(key, val);
    form[key] = val;
    console.log(form[key]);
  };
</script>

<template>
  <div class="info">
    <div class="foreword"> 诚挚欢迎各位申请浦发银行E汽融产品~因涉及授信审批环节，请大家仔细填写并确认以下信息。 </div>
    <van-form label-width="100%" @submit="submitForm">
      <div class="card">
        <van-field label="营业执照">
          <template #input>
            <!-- <self-uploader
              v-model="form.businessLicense"
              :uploadPosition="uploadFileDictionary"
              @onUpload="onUpload"
              :max-count="1"
              key="businessLicense"
            /> -->
            <self-uploader
              :modelValue="form.businessLicense"
              @update:modelValue="(newVal) => (form.businessLicense = newVal)"
              :uploadPosition="uploadFileDictionary"
              @onUpload="(val) => onUpload('businessLicense', val)"
              :max-count="1"
              key="businessLicense"
            />
          </template>
        </van-field>

        <van-field label="法定代表人身份证">
          <template #input>
            <self-uploader
              v-model="form.legalIdCard"
              :uploadPosition="uploadFileDictionary"
              @onUpload="onUpload"
              :max-count="1"
              key="legalIdCard"
            />
          </template>
        </van-field>

        <van-field label="经办人身份证">
          <template #input>
            <self-uploader
              v-model="form.operatorIdCard"
              :uploadPosition="uploadFileDictionary"
              @onUpload="onUpload"
              :max-count="1"
              key="operatorIdCard"
            />
          </template>
        </van-field>

        <van-field label="开户许可证">
          <template #input>
            <self-uploader
              v-model="form.licensePermit"
              :uploadPosition="uploadFileDictionary"
              @onUpload="onUpload"
              :max-count="1"
              key="licensePermit"
            />
          </template>
        </van-field>
      </div>

      <div class="card">
        <van-field
          v-model="form.dealerName"
          label="公司名称"
          placeholder="请填写公司名称"
          :rules="[{ required: true, message: '请填写公司名称' }]"
        />

        <van-field
          v-model="form.contactPerson"
          label="联系人"
          placeholder="请填写联系人"
          :rules="[{ required: true, message: '请填写联系人' }]"
        />

        <van-field
          v-model="form.contactPhone"
          label="联系方式"
          placeholder="请填写联系方式"
          :rules="[{ required: true, message: '请填写联系方式' }]"
        />
      </div>
      <div class="footer">
        <van-button round block type="primary" :loading="loading" native-type="submit"> 确认提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    background-color: #f8f8f8;

    .foreword {
      margin: 12px 9px 10px;
      padding: 10px;
      font-weight: 500;
      font-size: 13px;
      color: #577095;
      text-align: justify;
      line-height: 25px;
      border: 0.5px solid #7497ff;
      border-radius: 5px;
    }

    .van-cell:after {
      border: none;
    }

    .van-field {
      flex-direction: column;

      .van-field__label label {
        color: red;
      }
      :deep(.van-field__label label:after) {
        margin-right: 2px;
        color: var(--van-field-required-mark-color);
        content: '*';
      }
    }

    .footer {
      padding: 10px 20px;
      text-align: center;
      background-color: #ffffff;

      .van-button {
        width: 100%;
        height: 45px;
        color: #ffffff;
        font-size: 16px !important;
      }
    }
  }
</style>
