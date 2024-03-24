<template>
  <div>
    <video id="video" width="400" height="400" autoplay></video>
    <canvas id="canvas" style="display: none;"></canvas>
    <div v-if="responseData !== 'a'">
      <el-row>
        <el-col>
          id：
        </el-col>
        <el-col>
          {{ responseData.id }}
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          名称：
        </el-col>
        <el-col>
          {{ responseData.assetsName }}
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          描述：
        </el-col>
        <el-col>
          {{ responseData.assetsDesc }}
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          用途：
        </el-col>
        <el-col>
          {{ responseData.assetsUsage }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import jsQR from 'jsqr'
import axios from 'axios'

export default {
  name: 'QRScanner',
  mounted() {
    this.startCamera();
  },
  data()  {
   return {
    responseData: 'a'
   } 
  },
  methods: {
    startCamera() {
      //alert('start camera')
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          const video = document.getElementById('video');
          video.srcObject = stream;
          video.play();
          this.scanQRCode();
        })
        .catch(err => {
          console.error("Error accessing the camera", err);
        });
    },
    scanQRCode() {
      const canvas = document.getElementById('canvas');
      const video = document.getElementById('video');
      const ctx = canvas.getContext('2d');
      
      const scan = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          
          if (code) {
            //alert(`Found QR code: ${code.data}`);
            // 停止扫描
            clearInterval(scanInterval);
            // 可以在这里处理二维码内容
            video.pause(); // 可选：暂停视频流
        
        // 使用axios发送GET请求
        axios.get("/api/assetsItem/"+code.data)
          .then(response => {
            
            // 成功获取响应，处理json数据
            console.log(response.data);
            // 可以更新某个data属性，以在界面上显示信息
            this.responseData = response.data;
          })
          .catch(error => {
            alert(error)
            console.error("请求错误:", error);
          })
          } else {

             console.log('no qrcode')
          }
        }
      };
      
      // 每100毫秒扫描一次
      const scanInterval = setInterval(scan, 100);
    }
  }
}
</script>
