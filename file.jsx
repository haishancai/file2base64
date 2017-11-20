 export default {
  file2DataUrl:function(file, cb) {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        cb.call(this, reader.result);
      });
      reader.readAsDataURL(file);
    }
  },
  compressBase64:function(dataurl,file,cb){
    let me = this;
    let maxsize = 1000;
    let orientation = null;
    try{
      EXIF.getData(file, function() {
          orientation = EXIF.getTag(file, 'Orientation');
      });
    }catch(e){}
    let img = new Image();
    let canvas = document.createElement('canvas');;
    img.onload = function() {
      let degree = 0,
          width, height;
      let imageWidth = this.width;
      let imageHeight = this.height;
      let offsetX = 0;
      let offsetY = 0;
      let maxSide = Math.max(imageWidth, imageHeight);
      if (maxSide > maxsize) {
          let minSide = Math.min(imageWidth, imageHeight);
          minSide = minSide / maxSide * maxsize;
          maxSide = maxsize;
          if (imageWidth > imageHeight) {
              imageWidth = maxSide;
              imageHeight = minSide;
          } else {
              imageWidth = minSide;
              imageHeight = maxSide;
          }
      }
      canvas.width = width = imageWidth;
      canvas.height = height = imageHeight;
      let context = canvas.getContext('2d');
      if(orientation){
        switch (orientation) {
            //iphone横屏拍摄，此时home键在左侧
            case 3:
                degree = 180;
                imageWidth = -width;
                imageHeight = -height;
                break;
                //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
            case 6:
                canvas.width = height;
                canvas.height = width;
                degree = 90;
                imageWidth = width;
                imageHeight = -height;
                break;
                //iphone竖屏拍摄，此时home键在上方
            case 8:
                canvas.width = height;
                canvas.height = width;
                degree = 270;
                imageWidth = -width;
                imageHeight = height;
                break;
        }
      }
      //使用canvas旋转校正
      context.rotate(degree * Math.PI / 180);
      context.clearRect(0, 0, imageWidth, imageHeight);

      context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);

      let base64 = canvas.toDataURL('image/jpeg', 1);
      cb.call(me,base64);   
            
    };
    img.src = dataurl;
  },
  file2base64:function(file,cb){
    this.file2DataUrl(file, (dataurl) => {
      this.compressBase64(dataurl,file, base64 => {
        cb.call(this,base64);
      });
      
    });
  }
}