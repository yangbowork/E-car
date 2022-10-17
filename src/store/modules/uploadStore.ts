import { defineStore } from 'pinia';
import COS from 'cos-js-sdk-v5';
import { getTempCredential } from '@/api/upload-file';

const useUploadStore = defineStore('upload', {
  state: () => {
    return {
      // 腾讯云文件上传相关
      cos: {}, // 定义一个 cos 对象
      credentials: {}, // 腾讯云文件上传所需
      requestId: '',
      expiration: '',
      startTime: '',
      expiredTime: '',
      isGetToken: false,
    };
  },

  actions: {
    async isGetCosInfo() {
      // 重新获取腾讯云临时秘钥
      if (this.isGetToken) return;
      this.isGetToken = true;
      if (this.expiredTime === '' || Number(this.expiredTime) > Date.parse(new Date() as any)) {
        await this.getCosInfo();
      }
      this.isGetToken = false;
    },

    async getCosInfo() {
      const res = await getTempCredential();
      console.log('获取腾讯云文件上传所需相关信息', res);
      const { credentials, requestId, expiration, startTime, expiredTime } = (res as any).data;
      this.credentials = credentials;
      this.requestId = requestId;
      this.expiration = expiration;
      this.startTime = startTime;
      this.expiredTime = expiredTime;
      this.cos = new COS({
        getAuthorization: function (options, callback) {
          console.log('options', options);
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            XCosSecurityToken: credentials.sessionToken,
            StartTime: startTime,
            ExpiredTime: expiredTime,
          });
        },
      });
    },

    /**
     * 上传文件函数
     * fileDictionary 上传文件所在目录
     * file 上传文件
     * index 上传文件种类序号 'images', 'video', 'advantage', 'attention'
     */
    //  car-source
    async cosUploadFile(fileDictionary, file, index, callback) {
      // 是否需要重新获取密钥
      if (this.expiredTime === '' || Number(this.expiredTime) > Date.parse(new Date() as any)) {
        await this.getCosInfo();
      }
      const fileExt = file.type.split('/')[1];
      const filePath = ['images', 'video', 'advantage', 'attention'];
      console.log('文件后缀名', fileExt, `${filePath[index]}`);
      console.log(this.cos);
      (this.cos as any).putObject(
        {
          Bucket: 'suncars-1251117131', // 存储桶名称
          Region: 'ap-shanghai', // 地区
          Key: `${fileDictionary}/${new Date().getTime()}.${fileExt}`, // 图片名称
          Body: file,
          onHashProgress: function (progressData) {
            console.log('校验中', JSON.stringify(progressData));
          },
          onProgress: function (progressData) {
            console.log('上传中', JSON.stringify(progressData));
          },
        },
        function (err, data) {
          if (err) {
            console.log('文件上传失败', err);
            // this.error(file)
            return;
          }
          console.log('文件上传成功返回提示', data);
          const o = {
            name: '',
            url: '',
          };
          const findPath = `suncars-1251117131.cos.ap-shanghai.myqcloud.com/suncars-admin-uploads/car-source/${filePath[index]}/`;
          o.name = data.Location.replace(findPath, '');
          o.url = `https://${data.Location}`;
          callback(o);
        },
      );
    },
  },
});

export default useUploadStore;
