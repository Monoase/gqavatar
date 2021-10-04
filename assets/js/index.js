const upload = document.querySelector('#upload');
const preview = document.querySelector('#preview');
const hongqi = document.querySelector('.hongqi');
const background = document.querySelector('.background');

const previewContainer = document.querySelector('#preview-container');

// 缩放尺寸
const scale = 5;

function getSuffix(str) {
  const reg = /(.+)\.(\w+)$/;
  const match = str.match(reg);
  if (match) {
    return [match[1], match[2]];
  }
  return null;
}

function handlerFileUpload(e) {
  const { width, height } = hongqi;
  background.style.setProperty('display', 'block');
  const fileList = this.files;

  preview.src = URL.createObjectURL(fileList[0]);
  // 宽度以红旗为准
  preview.width = width / scale;
  background.style.setProperty('width', `${width / scale}px`);
  preview.onload = () => {
    // 高度以实际的头像为准
    background.style.setProperty('height', `${preview.height}px`);

    // 生成图片
    const img = document.createElement('img');
    domtoimage.toPng(previewContainer, {
      quality: 1,
      height: preview.height,
      width: preview.width,
    }).then((url) => {
      // img.src = URL.createObjectURL(url);
      img.src = url;
      previewContainer.removeChild(preview);
      previewContainer.removeChild(background);
      previewContainer.appendChild(img);
      const [filename, suffix] = getSuffix(fileList[0].name);
      // window.saveAs(url, `${filename}_${Date.now()}.${suffix}`);
      const btn = document.createElement('a');
      btn.href = url;
      btn.download = `${filename}_${Date.now()}.${suffix}`;
      btn.click();

    });
  }
}

upload.addEventListener('change', handlerFileUpload);
